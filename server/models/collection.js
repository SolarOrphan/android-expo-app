const mongoose = require('mongoose')
const { Schema } = mongoose;

const Collection = new Schema({
    name : { type : String , default : "", required: true},
    description : { type : String , default : "", required: true},
    item_ids : {type : Array , default : [], required: true},
    date_added : { type : Date, default : Date.now, required: true}
});

module.exports = mongoose.model('Collection', Collection)