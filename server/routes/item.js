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
    var { name, description, id } = req.body;
    console.log(name, description, id);
    await client.connect();
    // Execute a query
    await client
      .execute(
        `SELECT name FROM currency_keepers.items WHERE name = '${name}' ALLOW FILTERING;`
      )
      .then(async (data) => {
        if (data.rowLength > 0) {
          res.status(202).json({ message: "Exists" });
        } else {
          await client.execute(
            "INSERT INTO currency_keepers.items(id, name, description) VALUES(uuid(), '" +
              name +
              "', '" +
              description +
             "');"
          );
        }
      });
    const collection_obj = await client.execute(
      `SELECT * FROM currency_keepers.items WHERE name = '${name}' ALLOW FILTERING;`
    );
    const user_obj = await client.execute(
      `SELECT * FROM currency_keepers.collections WHERE id = ${id} ALLOW FILTERING;`
    );
    var collection_id = collection_obj.rows[0].id;
    collection_id = collection_id;
    await client
      .execute(
        `UPDATE currency_keepers.collections SET item_ids = item_ids + [${collection_id}] WHERE id = ${user_obj.rows[0].id};`
      )
      .then((data) => {
        res
          .status(200)
          .json({
            message: "Success",
            data: { collection_ids: user_obj.rows[0].item_ids },
          });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
  // await client.shutdown();
});

//Getting collection object
router.post("/get_items", async (req, res) => {
  try {
    var { ids } = req.body;
    console.log(ids)
    await client.connect();
    await client
      .execute(
        `SELECT * FROM currency_keepers.items WHERE id in (${ids.join(
          ", "
        )});`
      )
      .then((data) => {
        if (data.rowLength > 0 > 0)
          res.status(200).json({
            message: "Success",
            data: data.rows,
          });
        else res.status(202).json({ message: "Fail", data: [] });
      });
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/get_one", async (req, res) => {
  try {
    var { id } = req.body;
    await client.connect();
    await client
      .execute(`SELECT * FROM currency_keepers.items WHERE id = ${id};`)
      .then((data) => {
        if (data.rowLength > 0)
          res.status(200).json({
            message: "Success",
            data: data.rows[0],
          });
        else res.status(202).json({ message: "Fail", data: [] });
      });
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Updating collection object
router.patch("/", (req, res) => {});

router.delete("/delete", async (req, res) => {
  try {
    var { id } = req.body;
    await client.connect();
    await client
      .execute(`DELETE  FROM currency_keepers.items WHERE id = ${id};`)
      .then((data) => {
        res.status(200).json({ message: "Success"});
      });
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
