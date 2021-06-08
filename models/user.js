const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    
    name: {
        type : String,
       // required : true
    },
    email: {
        type : String,
       // required : true
    },
    password: {
        type : String,
        //required : true
    },
    phone: {
        type : Number,
        //required : true
    },
    address: {
        type : String,
        //required : true
    },
    gender: {
        type : String,
        //required : true
    },
    dob: {
        type : String,
        //required : true
    }

})

module.exports = User = mongoose.model('users',UserSchema)