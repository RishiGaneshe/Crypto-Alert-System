const Redis= require('ioredis')
const {createClient}= require('@redis/client')

const RedisURL= 'redis://172.22.138.48:6379'



// exports.redisClient= new Redis(RedisURL)

exports.redisClient= createClient({
         'url':RedisURL
})
