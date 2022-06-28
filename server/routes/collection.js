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
//Creating collection
router.post("/", async (req, res) => {
  try {
    var { name, description } = req.body;
    await client.connect();
    // Execute a query
    await client
      .execute(
        `SELECT name FROM currency_keepers.collections WHERE name = '${name}' ALLOW FILTERING;`
      )
      .then((data) => {
        if (data.rowLength > 0) res.status(202).json({ message: "Exists" });
      });
    await client
      .execute(
        "INSERT INTO currency_keepers.collections(id, name, description, item_ids, ) VALUES(uuid(), '" +
          name +
          "', '" +
          description +
          "', " +
          [] +
          0 +
          ");"
      )
      .then((data) => {
        res.status(200).json({ message: "Success" });
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
    await client.shutdown();
});

//Getting collection object
router.get("/", async (req, res) => {
  try {
    await Collection.find().exec(async (err, data) => {
      if (data.length > 0)
        res.status(200).json({ message: "Success", data: data });
      else res.status(200).json({ message: "No Collections", data: [] });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/get_one", async (req, res) => {
  try {
    console.log(req.body);
    var { _id } = req.body;
    const collection = await Collection.findOne({ _id: _id }).exec();
    if (collection)
      res.status(200).json({ message: "Success", data: collection });
    else res.status(200).json({ message: "Fail" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Updating collection object
router.patch("/", (req, res) => {});

router.delete("/delete", async (req, res) => {
  try {
    console.log(req);
    var { _id } = req.body;
    const collection = await Collection.findOne({ _id: _id }).exec();
    collection.remove();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
