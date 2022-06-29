const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");

async function  Run(){
const client = new Client({
  cloud: {
    secureConnectBundle: "secure-connect-currencykeepers.zip",
  },
  credentials: {
    username: "BQjqAHeWRiPhqqIUtXviKqlN",
    password:
      "QTwway7i7z75MFZzFOo1lWMJF8p+DQ2G0Cj-J0vCC9bdSmh-FTE-2n9vnb16q.8he-6E0.pKsFUCC9I+pGkLjI,XwJpgBUbpL2-9K1tECdPIBgk56dC8CsFAmDQ3mNLw",
  },
  });
  await client.connect();
  try {
    await client.execute(
      `CREATE TABLE items(id uuid PRIMARY KEY, name text, description text) `
    ).then(data=>{
      console.log(data)
    })
  } catch (err) {
    console.log(err.message );
}
// await client.shutdown();
}

Run()