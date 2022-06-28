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
    username ="Caydon"
    password ="Caydon"
    await client.execute(
      `SELECT * FROM currency_keepers.users WHERE username = '${username}' AND password = '${password}' ALLOW FILTERING;`
    ).then(data=>{
      if (data.rowLength > 0 ) console.log(data.rows[0].id.toString());
      else console.log(data);
    })
  } catch (err) {
    console.log(err.message );
}
await client.shutdown();
}

Run()