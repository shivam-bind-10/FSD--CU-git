const fs = require("fs")
const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    fs.readFile("shivam.txt","utf-8",(err,data)=>{
        res.send(data)
        if(err){
            res.json({
                msg:err
            })
        }
    })
})

app.listen(4000)