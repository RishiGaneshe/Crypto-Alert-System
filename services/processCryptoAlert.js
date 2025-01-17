const { findTriggeredAlerts }= require('./findTriggeredAlert')
const MainAdmin= require('../models/MongoMainAdmin.js')
const { sendAlert }= require('../middlewares/sendEmail.js')

exports.processCryptoAlerts = async (allCryptos) => {
    try {
        const alertPromises = allCryptos.map(async (crypto) => {
            const { name, current_price } = crypto
    
            const triggeredAlerts = await findTriggeredAlerts(name, current_price)
    
            if (triggeredAlerts.length > 0) {
                console.log(`alerts triggered for ${name}`);

                for (const alert of triggeredAlerts) {
                    const { userId, targetPrice, condition } = alert;
                    const user = await MainAdmin.findById(userId);
                    const email= user.email;
                    await sendAlert( email, name, targetPrice, condition)
                }
    
                await Promise.all(
                      triggeredAlerts.map(async (alert) => {
                      alert.isActive = false
                      alert.notifiedAt = new Date()
                      await alert.save()
                    })
                )
            } else {
                console.log(`No alerts triggered for ${name}.`);
            }
        })
    
        await Promise.all(alertPromises);
        console.log('All alerts processed successfully.');

    } catch (error) {
       console.error('Error processing crypto alerts:', error);
    }
}