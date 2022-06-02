const mongoose = require('mongoose')
const { Schema } = mongoose;

const Item = new Schema({
    name : { type : String , default : "",},
    description : { type : String , default : "", },
    date_added : { type : Date, default : Date.now},
    image : {type : String , default : ""},
    creator : {type : String , default : ""},
    rating : {type :String, default: ""}
});

module.exports = mongoose.model('Item', Item)