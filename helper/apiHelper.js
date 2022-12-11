const { expect } = require('chai');
const request = require('supertest')
const dotenv = require('dotenv').config()
const axios = require('axios')


class APIHelper{

    async POST(paylaod, flag ){
        let apiKey = (flag==true) ? process.env.API_KEY : ""
        console.log(`apiKey value: ${apiKey}`);
        return await request(process.env.API_URL)
        .post('/data/3.0/stations')
        .query({"appid":apiKey})
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(paylaod);
    }

    async GET(){
        let apiKey = process.env.API_KEY
        console.log(`apiKey value: ${apiKey}`);
        return await request(process.env.API_URL)
        .get('/data/3.0/stations')
        .query({"appid":apiKey})
        .set("Accept", "*/*")
    }

    async DEL(val){
        let apiKey = process.env.API_KEY
        console.log(`apiKey value: ${apiKey}`);
        let response = await request(process.env.API_URL)
        .del(`/data/3.0/stations/${val}`)
        .query({"appid":apiKey})
        .set("Content-Type", "application/json")
        console.log(`Tesing :${JSON.stringify(response)}`);
        return response
        
    }
}

module.exports = new APIHelper()