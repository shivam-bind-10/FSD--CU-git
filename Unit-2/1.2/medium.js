const express = require("express")
const app = express()

const middleware = (req,res,next)=>{
   
    console.log("middleware executed")
    next()
}

app.use(middleware)

app.get("/",(req,res)=>{
    res.json({
        msg: `hello-shivam`
    })
})


app.listen(3000) 