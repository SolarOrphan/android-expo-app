const express = require("express");
const router = express.Router();
const Collection = require("../models/collection");

//Creating collection
router.post("/", (req, res) => {
  try {
    var { name, description } = req.body;
    Collection.countDocuments({ name: name }).exec(async (err, count) => {
      if (count > 0) {
        res.status(200).json({ message: "collection already exists" });
      } else {
        const create_item = new Collection({
          name: name,
          description: description,
          item_ids: [],
        });
        create_item.save();
        res.status(200).json({ message: "Success" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

//Getting collection object
router.get("/", async (req, res) => {
  try {
    await Collection.find().exec(async (err, data) => {
      if (data.length > 0)
        res.status(200).json({ message: "Success", data: data });
      else res.status(200).json({ message: "No Collections", data : [] });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/get_one", async (req, res) => {
  try {
    console.log(req.body)
    var { _id } = req.body;
    const collection = await Collection.findOne({ _id: _id }).exec();
    if (collection) res.status(200).json({ message: "Success", data:collection });
    else res.status(200).json({ message: "Fail" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Updating collection object
router.patch("/", (req, res) => {});

router.delete("/delete", async (req, res) => {
  try {
  console.log(req)
    var { _id } = req.body;
    const collection = await Collection.findOne({ _id: _id }).exec();
    collection.remove()
    res.status(200).json({ message: "Success"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
