const express = require("express")
const app = express()

app.use(express.json())

let nextStudentId = 3
const students = [
    {
        id: 1,
        name: "Manu",
        course: "CSE"
    },
    {
        id: 2,
        name: "Shivam",
        course: "ECE"
    }
]

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
    res.status(200).json(students)
})

app.get("/api/students/:id",(req,res)=>{
    const student = students.find((student) => student.id === Number(req.params.id))

    if (!student) {
        return res.status(404).json({ message: "Student not found" })
    }

    res.status(200).json(student)
})

app.post("/api/students",(req,res)=>{
    const student = {
        id: nextStudentId++,
        ...req.body
    }

    students.push(student)
    res.status(201).json(student)
})

app.put("/api/students/:id",(req,res)=>{
    const studentIndex = students.findIndex((student) => student.id === Number(req.params.id))

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" })
    }

    students[studentIndex] = {
        id: students[studentIndex].id,
        ...req.body
    }

    res.status(200).json(students[studentIndex])
})

app.delete("/api/students/:id",(req,res)=>{
    const studentIndex = students.findIndex((student) => student.id === Number(req.params.id))

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" })
    }

    const [deletedStudent] = students.splice(studentIndex, 1)
    res.status(200).json(deletedStudent)
})

app.listen(3000)