const express = require("express")
const app = express()

const middleware = (req,res,next)=>{
    // res.send("hello-middleware")
    console.log("middleware")
    next()
}

app.use(middleware)

app.get("/",(req,res)=>{
    res.json({
        msg: `hello-manu`
    })
})


app.listen(3000)