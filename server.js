const express = require('express')
const app = express()
app.use(express.json());
const port=8081
const todos = ['js','react','html']

app.get("/todos",(req,res)=>{
    res.status(200).send(todos)
})

app.post("/todos", (req,res)=>{
    const newtodo = req.body.item;
    todos.push(newtodo);
    res.status(201).send({
        message : "task added successfully",
        value : newtodo
    })
})

app.delete("/todos",(req,res)=>{
    const taskToDelete = req.body.item;
    todos.find((item,i)=>{
        if(item===taskToDelete){
            todos.splice(i,1);
        }
    })
    res.status(202).send({
        message : "task deleted successfully",
        updated : todos
    })
})

app.all("/todos",(req,res)=>{
    res.status(501).send("page not found")
})

app.all("*",(req,res)=>{
    res.status(501).send("page not found")
})

app.listen(port, ()=>{
    console.log('server started on port 8081')
})