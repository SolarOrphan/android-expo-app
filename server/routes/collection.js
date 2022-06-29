const express = require("express");
const router = express.Router();
const { Client } = require("cassandra-driver");
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
//Creating collection
router.post("/", async (req, res) => {
  try {
    var { name, description, id } = req.body;
    console.log(name, description, id);
    await client.connect();
    // Execute a query
    await client
      .execute(
        `SELECT name FROM currency_keepers.collections WHERE name = '${name}' ALLOW FILTERING;`
      )
      .then(async (data) => {
        if (data.rowLength > 0) {
          res.status(202).json({ message: "Exists" });
        } else {
          await client.execute(
            "INSERT INTO currency_keepers.collections(id, name, description, item_ids, goal) VALUES(uuid(), '" +
              name +
              "', '" +
              description +
              "', " +
              null +
              ", " +
              0 +
              ");"
          );
        }
      });
    const collection_obj = await client.execute(
      `SELECT * FROM currency_keepers.collections WHERE name = '${name}' ALLOW FILTERING;`
    );
    const user_obj = await client.execute(
      `SELECT * FROM currency_keepers.users WHERE id = ${id} ALLOW FILTERING;`
    );
    var collection_id = collection_obj.rows[0].id;
    collection_id = collection_id;
    await client
      .execute(
        `UPDATE currency_keepers.users SET collection_ids = collection_ids + [${collection_id}] WHERE id = ${user_obj.rows[0].id};`
      )
      .then((data) => {
        res.status(200).json({
          message: "Success",
          data: { collection_ids: user_obj.rows[0].collection_ids },
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
  // await client.shutdown();
});

//Getting collection object
router.post("/get_collections", async (req, res) => {
  try {
    var { ids } = req.body;
    await client.connect();
    await client
      .execute(
        `SELECT * FROM currency_keepers.collections WHERE id in (${ids.join(
          ", "
        )});`
      )
      .then((data) => {
        console.log(data);
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
      .execute(`SELECT * FROM currency_keepers.collections WHERE id = ${id};`)
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
      .execute(`DELETE  FROM currency_keepers.collections WHERE id = ${id};`)
      .then((data) => {
        res.status(200).json({ message: "Success" });
      });
  } catch (err) {
    console.log("Error");
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
