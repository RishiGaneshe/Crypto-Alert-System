const axios = require('axios');
const { ConvertTimeAndData }= require('../services/TimeFormateConverter.js');
const { redisClient } = require('./RedisConnection.js');
const Redis_Key="crypto_data"
const { processCryptoAlerts }= require('./processCryptoAlert.js')



exports.FetchAllCurrency= async ()=>{
    try{
        const url = 'https://api.coingecko.com/api/v3/coins/markets'
        const params = {
            vs_currency: 'usd', 
            order: 'market_cap_desc', 
            per_page: 250, 
            page: 1, 
            sparkline: false 
        }

        // let allCryptos = []
        // const response = await axios.get(url, { params })
        // const cryptos = response.data

        // allCryptos = cryptos.map((crypto)=>({
        //     id: crypto.id,
        //     symbol: crypto.symbol,
        //     name: crypto.name,
        //     current_price: crypto.current_price,
        //     last_updated: ConvertTimeAndData(crypto.last_updated)
        // }))

            const allCryptos = [
            {
              id: 1,
              symbol: 'BTC',
              name: 'Bitcoin',
              current_price: 52000,
              last_updated: ConvertTimeAndData('2025-01-17T08:30:00Z'),
            },
            {
              id: 2,
              symbol: 'ETH',
              name: 'Ethereum',
              current_price: 3500,
              last_updated: ConvertTimeAndData('2025-01-17T08:35:00Z'),
            },
            {
              id: 3,
              symbol: 'XRP',
              name: 'Ripple',
              current_price: 1.25,
              last_updated: ConvertTimeAndData('2025-01-17T08:40:00Z'),
            },
            {
              id: 4,
              symbol: 'LTC',
              name: 'Litecoin',
              current_price: 200,
              last_updated: ConvertTimeAndData('2025-01-17T08:45:00Z'),
            },
            {
              id: 5,
              symbol: 'ADA',
              name: 'Cardano',
              current_price: 1.65,
              last_updated: ConvertTimeAndData('2025-01-17T08:50:00Z'),
            },
            {
              id: 6,
              symbol: 'DOT',
              name: 'Polkadot',
              current_price: 40,
              last_updated: ConvertTimeAndData('2025-01-17T08:55:00Z'),
            },
            {
              id: 7,
              symbol: 'BNB',
              name: 'Binance Coin',
              current_price: 380,
              last_updated: ConvertTimeAndData('2025-01-17T09:00:00Z'),
            },
            {
              id: 8,
              symbol: 'SOL',
              name: 'Solana',
              current_price: 150,
              last_updated: ConvertTimeAndData('2025-01-17T09:05:00Z'),
            },
            {
              id: 9,
              symbol: 'DOGE',
              name: 'Dogecoin',
              current_price: 0.25,
              last_updated: ConvertTimeAndData('2025-01-17T09:10:00Z'),
            },
            {
              id: 10,
              symbol: 'MATIC',
              name: 'Polygon',
              current_price: 2.50,
              last_updated: ConvertTimeAndData('2025-01-17T09:15:00Z'),
            }
          ];

        processCryptoAlerts(allCryptos);

        redisClient.set(Redis_Key, JSON.stringify(allCryptos), {
            EX: 45,   // seconds 
        })

        return allCryptos
    }catch(err){
        console.error('Error fetching cryptocurrencies:', err.message, err);
        throw new Error('Failed to fetch cryptocurrency data');
    }
}


