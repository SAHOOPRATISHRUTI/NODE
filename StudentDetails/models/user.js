const mongoose = require("mongoose");
//Schema
const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        require:true
    },
    Age:{
        type:Number
    },
    Gender:{
        type:String
    },
    Email:{
        type:String,
        require:true,
        unique:true
    }
},
{timestamps:true}
)
//schemamodel
const Details=mongoose.model("Details",userSchema)

module.exports=Details;