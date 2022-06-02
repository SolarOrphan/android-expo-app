const mongoose = require('mongoose')
const { Schema } = mongoose;

const User = new Schema({
    username : { type : String , default : "", required: true},
    password : { type : String , default : "", required: true},
    collection_ids : {type : Array , default : [], required: true},
    date_added : { type : Date, default : Date.now, required: true}
});

module.exports = mongoose.model('User', User)