const express =require("express")
const app=express()
const bodyParse =require("body-parser");
//let sql;
const db=require("./functions")



app.use(bodyParse.urlencoded({ extended: false}))
app.use(bodyParse.json())
  
app.post("/test/:table",async(req,res)=>{
    const results =await db.create(req.params.table,req.body);
    res.status(201).json({dno: results})
})

app.get("/test/:table",async(req,res)=>{
    const table=await db.getAll(req.params.table);
    res.status(200).json({table});
})

app.patch("/test/:table",async(req,res)=>{
    const id=await db.update(req.params.table,req.body);
    res.status(200).json({dno:id.dno});
})

app.delete("/test/:table",async(req,res)=>{
    await db.deleted(req.params.table,req.body);
    res.status(200).json({success:true })
})


//app.get("/test", (req,res)=>{res.status(200).json({sucess:true})})

app.listen(3000, () => console.log('Server Started'))