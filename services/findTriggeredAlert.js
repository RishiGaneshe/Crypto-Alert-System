const Alert= require('../models/Alert.js')

exports.findTriggeredAlerts= async (name, current_price )=>{
    try {
        const activeAlerts = await Alert.find({
          cryptocurrency: name,
          isActive: true, 
        });
    
        const triggeredAlerts = activeAlerts.filter((alert) => {
          if (alert.condition === 'above' && current_price > alert.targetPrice) {
            return true
          }
          if (alert.condition === 'below' && current_price < alert.targetPrice) {
            return true
          }
          return false
        })
        return triggeredAlerts

      } catch (error) {
        console.error('Error finding triggered alerts:', error);
        throw error;
      }
}