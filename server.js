const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { SockectConnectionFunc }= require('./services/SocketConnection.js')
const USERroute= require('./routes/user.routes.js')
const { redisClient }= require('./services/RedisConnection.js')
const cors= require('cors')
const path= require('path')
const { connectToMongoDB } = require('./services/connection.js')
const Routes2= require('./routes/post.routes.js')
const cookieParser= require('cookie-parser')

const DATABASE_URL='mongodb://localhost:27017/secondInterS' 


const app = express()
const PORT = 7000;
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'],
  },
});


async function connectDatabase(){
    try{
        await connectToMongoDB(DATABASE_URL)
        console.log('MongoDB connected.');
    }catch(err){
        console.log("Error in connecting database",err)
     }
  }
connectDatabase();


redisClient.on('error', (err) => console.error('Redis Client Error', err))

async function connectRedis(){
  try{
      await redisClient.connect()
      console.log("Redis Connected.")
  }catch(err){
      console.log(err)
  }
}
if (!redisClient.status || redisClient.status === 'end') {
    connectRedis();
}


app.set("view engine","ejs");                              
app.set("views",path.join(__dirname,'views'))

app.use(cors({
  origin: 'https://internship.studentshub.fun',
  credentials: true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))
app.use(express.urlencoded({ extended:false}))

SockectConnectionFunc(io)



app.use("/", USERroute)
app.use("/", Routes2)



server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
});
