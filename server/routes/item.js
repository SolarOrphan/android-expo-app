const express = require("express");
const router = express.Router();
const Item = require("../models/item");
const Collection = require("../models/collection");

//Creating item
router.post("/", async (req, res) => {
  try {
    var { name, description, collection_id } = req.body;
    console.log( name, description, collection_id )
    Item.countDocuments({ name: name }).exec(async (err, count) => {
      if (count > 0) {
        res.status(200).json({ message: "item already exists" });
      } else {
        const create_item = new Item({
          name: name,
          description: description,
          image: "",
          creator: "",
          rating: "",
        });
        create_item.save();
        const collection = await Collection.findOne({
          _id: collection_id,
        }).exec();
          if (Array.isArray(collection.item_ids)) {
            collection.item_ids.push(create_item._id);
            collection.save();
            res.status(200).json({ message: "Success", data: collection.item_ids });
          }
      }
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: err.message });
  }
});

router.post("/get_items", async (req, res) => {
  try {
    var { item_ids } = req.body;
    const data = await Item.find({ _id: { $in: item_ids } }).exec();
    res.status(200).json({ message: "Success", data: data });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Getting item object
router.post("/get_one", async (req, res) => {
  try {
    var { _id } = req.body;
    const item = await Item.findOne({ _id: _id }).exec();
    if (item) res.status(200).json({ message: "Success", data: item });
    else res.status(200).json({ message: "Fail" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Updating item object
router.post("/update_item", async (req, res) => {
  try {
    var { _id, name, description, create_item, im } = req.body;
    const item = await Item.findOne({ _id: _id }).exec();
    item.name = name;
    item.description = description;
    item.creator = creater;
    item.image = image;
    item.rating = rating;
    item.save();
    if (item) res.status(200).json({ message: "Success", data: item });
    else res.status(200).json({ message: "Fail" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Deleting object
router.delete("/delete_item", async (req, res) => {
  try {
    var { _id } = req.body;
    const item = await Item.findOne({ _id: _id }).exec();
    item.remove();
    res.status(200).json({ message: "Success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
