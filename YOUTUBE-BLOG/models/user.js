const {mongoose, Schema}=require('mongoose')
const { createHmac,randomBytes} = require('node:crypto');//hashing password


const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    progileimgUrl:{
        type:String,
        default:"/public/images/default.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER"
    }

},{timestamps:true})

UserSchema.pre('save',function (next){
    const user=this;
    if(!user.isModified("password"))return;

const salt=randomBytes(16).toString(); //hashing password
const hashPassword=createHmac('sha256',salt)
                    .update(user.password)
                    .digest("hex");

    this.salt=salt;
    this.password=hashPassword                
})


const User=mongoose.model('User',UserSchema);

module.exports={
    User
}