const express = require("express")
const app = express()

app.get("/",()=>{
    res.json({
        msg: `welcome :)`
    })
})

app.get("/about",()=>{
    res.json({
        msg: `hello`
    })
})

app.get("/api/students",()=>{
    res.json([
        {
            id:1,
            name: `Manu`,
            course: `CSE`
        },
        {
            id:2,
            name:`Shivam`,
            course: `ECE`
        }
    ])
})