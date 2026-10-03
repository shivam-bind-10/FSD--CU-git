const express = require("express")
const app = express()

app.get("/",(req,res)=>{
    res.json({
        msg: `welcome :)`
    })
})

app.get("/about",(req,res)=>{
    res.json({
        msg: `hello`
    })
})

app.get("/api/students",(req,res)=>{
    res.json([
        {
            id:1,
            name: `Shivam sir`,
            course: `CSE`
        },
        {
            id:2,
            name:`Manu khan`,
            course: `ECE`
        }
    ])
})


app.listen(3000)