const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");

async function Run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "secure-connect-currencykeepers.zip",
    },
    credentials: {
      username: "MXXZdvDuqQPdQwTAJNrPxoTZ",
      password:
        "fnjNsrGATj-tiAJlUgvK.4g_5J1SX6ZCiWfwgDfj2tbhZdF7WKh+MSDjzv0t6q74TE_fAD.G0v1f1Au6zj.E3b_77JZr+A_PnCOp959tOKLdy+EWr+8CFLiyt4e3gRcH",
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
