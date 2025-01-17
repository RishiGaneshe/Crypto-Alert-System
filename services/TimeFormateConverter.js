exports.ConvertTimeAndData= ( last_updated )=>{
    try{
        const utcTime = last_updated
        const date = new Date(utcTime);

        const offset = 0; // 5.5 hours in milliseconds
        const istDate = new Date(date.getTime() + offset)

        // Format IST Date
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }

        const formattedIST = istDate.toLocaleString('en-IN', options)
        return formattedIST;
    }catch(err){
        console.log(err)
    }
}