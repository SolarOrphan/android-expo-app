const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");

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
      .then((data) => {
        if (data.rowLength > 0) res.status(202).json({ message: "Exists" });
      });
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
      .then((data) => {
        if (data.rowLength > 0)
          res
            .status(200)
            .json({ message: "Success", data: { id: data.rows[0].id } });
        else res.status(202).json({ message: "Fail" });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
