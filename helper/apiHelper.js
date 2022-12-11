const { expect } = require("chai");
const request = require("supertest");
const dotenv = require("dotenv").config();
const axios = require("axios");

let apiKey = process.env.API_KEY;

class APIHelper {
  async registerStation(paylaod, flag) {
    try {
      let apiKey = flag == true ? process.env.API_KEY : "";
      return await request(process.env.API_URL)
        .post("/data/3.0/stations")
        .query({ appid: apiKey })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .send(paylaod);
    } catch (error) {
      error.message = `Error while trying to register the station: ${error.message}`;
      throw error;
    }
  }

  async getListOfStations() {
    try {
      let apiKey = process.env.API_KEY;
      return await request(process.env.API_URL)
        .get("/data/3.0/stations")
        .query({ appid: apiKey })
        .set("Accept", "*/*");
    } catch (error) {
      error.message = `Error while trying to get the list of stations: ${error.message}`;
      throw error;
    }
  }

  async deleteStation(val) {
    try {
      let apiKey = process.env.API_KEY;
      await request(process.env.API_URL)
        .del(`/data/3.0/stations/${val}`)
        .query({ appid: apiKey })
        .set("Content-Type", "application/json");
    } catch (error) {
      error.message = `Error while trying to delete the station id: ${val}. ${error.message}`;
      throw error;
    }
  }
}

module.exports = new APIHelper();
