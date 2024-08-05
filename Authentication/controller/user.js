const user=require('../model/user')

async function userSignup(req,res){
    const {name,email,password}=req.body;

    await user.create({
        name,
        email,
        password,
    });
    return res.render("home")
}

module.exports={
    userSignup
}