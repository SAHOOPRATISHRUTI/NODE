const express=require('express')
const cookieparser = require('cookie-parser')

const app=express();
app.use(cookieparser());

 
const port=4500;
app.get('/',(req,res)=>{
    res.end("Hello Cookieeee")
})

app.get('/set-cookie',(req,res)=>{
    // res.setHeader('set-cookie',"foo=bar");
    res.cookie('foo','bar'
        ,{
            // maxAge:5000,          //times in ms
            // expires:new Date('02 Aug 2024')
            // httpOnly:true                       //the client side can not view cookie
            // secure:true,      //it only secure in https
            domain:'example.com'  //to verify the domain name
        }
    )
    // res.cookie("fizz",'buzz')
    res.end('Cookies are set')
})

app.get('/get-cookie',(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})

app.get('/del-cookie',(req,res)=>{
    res.clearCookie('fizz')
    res.end('Cookie deleted')

})
app.listen(port,()=>{
    console.log(`Server Runing in port ${port}`);
})

