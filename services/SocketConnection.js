const { Server }= require('socket.io')
const { FetchAllCurrency }= require('./CryptoCurrencyData.js')
const { redisClient }= require('../services/RedisConnection.js')
const Redis_Key="crypto_data"
const Cache_Refresh_Interval = 40000             // 40 seconds



const refreshCache= async ()=>{
  try{
      await FetchAllCurrency()
      console.log("Cache refreshed successfully at:", new Date().toLocaleString())
  }catch(err){
      console.error("Error refreshing cache:", err.message)
  }
}


function startBackgroundCacheRefreshing() {
  console.log("Background cache refreshing started...")
  setInterval(refreshCache, Cache_Refresh_Interval)
}
startBackgroundCacheRefreshing()



exports.SockectConnectionFunc= async (io)=>{
    try{
        io.on('connection', (socket)=>{
            console.log('A user connected:', socket.id)

            socket.emit('welcome', { message: 'Welcome to the real-time cryptocurrency prices!' })

            socket.on('message', (data) => {
                console.log('Message from client:', data)
                socket.emit('message', { echo: data })
            })

            setInterval(async () => {
                try{
                    let cryptocurrencies;
                    const redisCache= await redisClient.get(Redis_Key)
                    if(redisCache){
                         cryptocurrencies= JSON.parse(redisCache)
                         console.log("Serving From Cache.")
                        
                    }else{
                         cryptocurrencies = await FetchAllCurrency()
                         console.log("Serving from API.")
                    }      
                io.emit('priceUpdate', cryptocurrencies) 
                }catch(err){
                    console.log(err)
                    console.error(err.message);
                }
              }, 20000)

              socket.on('disconnect', () => {
                console.log('A user disconnected:', socket.id)
              })
        })
    }catch(err){
        console.error("Error in socket connection function: "+err)
    }
}