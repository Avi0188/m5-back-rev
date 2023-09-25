const express=require("express")
const connection=require("./config/db")
const userRouter = require("./routes/user.route")
const employeeRouter = require("./routes/employee.route")
const app=express()
const cors=require("cors")

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/employees",employeeRouter)
app.listen(8000,async()=>{
    try {
        await connection
        console.log("server runnig at port 8000")
    } catch (error) {
        console.log("server failed to connect")
    }
})