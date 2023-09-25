const {Router}=require("express")
const EmployeeModel = require("../models/employee.model")


const employeeRouter=Router()

employeeRouter.post("/add",async(req,res)=>{
    try {
        let employee=new EmployeeModel(req.body)
        await employee.save()
        return res.status(200).json("New employee added",employee)
    } catch (error) {
        res.status(500).json(error)
    }
})

employeeRouter.get("/",async(req,res)=>{
    const {department}=req.query||""
    const {sort}=req.query||"asc"
    const {order}=req.query||""
    const {search}=req.query||""

    const query={[sort]:order}
    const value=department?{department}:{}
    try {
        const emp=await EmployeeModel.find(value).sort(query)
        res.send({msg:emp})
        // return res.status(200).json(employee)
    } catch (error) {
        res.status(500).send(error)
    }
    
})

employeeRouter.patch("/edit/:id",async(req,res)=>{
    const {id}=req.params
    try {
        let updateEmployee=await EmployeeModel.findByIdAndUpdate(id,req.body,{new:true})
       if(!updateEmployee){
        return res.status(400).send("Employee not found")

       }
       
        return res.status(200).json("employee Updated",updateEmployee)
    } catch (error) {
        res.status(500).json(error)
    }
})

employeeRouter.delete("/delete/:id",async(req,res)=>{
    try {
        let deleteEmployee=await EmployeeModel.findByIdAndDelete(id)
       if(!deleteEmployee){
        return res.status(400).send("Employee not found")

       }
       
        return res.status(200).json("employee delete",deleteEmployee)
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports=employeeRouter