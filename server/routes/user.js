const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");

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

//Creating user
router.post("/", async (req, res) => {
  try {
    var { username, password } = req.body;

    await client.connect();
    // Execute a query
    await client
      .execute(
        `SELECT username FROM currency_keepers.users WHERE username = '${username}' ALLOW FILTERING;`
      )
      .then(async (data) => {
        if (data.rowLength > 0) {
          res.status(200).json({ message: "Exists" });
        } else
          await client
            .execute(
              "INSERT INTO currency_keepers.users(id, username, password, collection_ids) VALUES(uuid(), '" +
                username +
                "', '" +
                password +
                "', " +
                null +
                ");"
            )
            .then((data) => {
              res.status(200).json({ message: "Success" });
            });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
  // await client.shutdown();
});

//Login
router.post("/login", async (req, res) => {
  try {
    var { username, password } = req.body;
    await client.connect();
    await client
    .execute(
      `SELECT * FROM currency_keepers.users WHERE username = '${username}' AND password = '${password}' ALLOW FILTERING;`
      )
      .then(async (data) => {
        if (data.rowLength > 0) {
          console.log(data.rowLength);

          res
            .status(200)
            .json({ message: "Success", data: { id: data.rows[0].id } });
        } else res.status(200).json({ message: "Fail" });
      });
  } catch (err) {
    res.status(500).json({ message: "Fail" });
  }
  // await client.shutdown();
});

router.post("/get_user", async (req, res) => {
  try {
    var { id } = req.body;
    await client.connect();
    await client
      .execute(
        `SELECT * FROM currency_keepers.users WHERE id = ${id} ALLOW FILTERING;`
      )
      .then((data) => {
        if (data.rowLength > 0)
          res
            .status(200)
            .json({ message: "Success", data: { user: data.rows[0] } });
        else res.status(200).json({ message: "Fail" });
      });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({ message: err.message });
  }
  // await client.shutdown();
});

//Updating user object
router.patch("/", (req, res) => {});

module.exports = router;
