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
        res.status(200).json({
          message: "Success",
          data: {
            collection_ids: user_obj.rows[0].item_ids,
            message: "Success",
          },
        });
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Fail" });
  }
  // await client.shutdown();
});

//Getting collection object
router.post("/get_items", async (req, res) => {
  try {
    var { ids } = req.body;
    console.log(ids);
    await client.connect();
    await client
      .execute(
        `SELECT * FROM currency_keepers.items WHERE id in (${ids.join(", ")});`
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
router.post("/update", async (req, res) => {
  var user_obj = req.body.item;
  await client
    .execute(
      `UPDATE currency_keepers.collections SET name='${user_obj.name}' , description='${user_obj.description}' , image='${user_obj.image}' , creator='${user_obj.creator}' WHERE id = ${user_obj.id};`
    )
    .then((data) => {
      res.status(200).json({
        message: "Success",
      });
    });
});

router.delete("/delete", async (req, res) => {
  try {
    var { id } = req.body;
    await client.connect();
    await client
      .execute(`DELETE FROM currency_keepers.items WHERE id = ${id};`)
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
