const express = require("express")
const app = express()

app.get("/home",(req,res)=>{
    res.send("hello-home")
})
app.get("/about",(req,res)=>{
res.json({
    msg: "hello-about"
})
})
app.get("/contact",(req,res)=>{
    res.send("hello-about")
})

app.listen(3000)