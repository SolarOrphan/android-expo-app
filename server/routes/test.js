const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");

async function Run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-currencykeepers.zip",
    },
    credentials: {
      username: "caCRCuZJNjOfUWkQirbjTBnx",
      password:
        "N1w+B4ohe+eHjkGn2Mhcj1gzDq-N5,No6eBfca1U0c.oBogkBvin0NCPLy23PZpY7OqqhE6F72KebZhB_d3qH5rnv5IW1B.LXn3HM7xK1T.UOrJWjPNxS.CxHZEL0.cK",
    },
  });
  await client.connect();
  try {
    await client
      .execute(
        `CREATE TABLE items(id uuid PRIMARY KEY, name text, description text) `
      )
      .then((data) => {
        console.log(data);
      });
  } catch (err) {
    console.log(err.message);
  }
  // await client.shutdown();
}

Run();
