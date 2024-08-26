const express =require("express")
const app=express()
const bodyParse =require("body-parser");
//let sql;
const db=require("./functions")



app.use(bodyParse.urlencoded({ extended: false}))
app.use(bodyParse.json())
  
app.post("/test/:table",async(req,res)=>{
    try
    {
        const results =await db.create(req.params.table,req.body);
        res.status(201).json({status:201,success:true})
    }catch(err)
    {
        res.status(400).json({status:300, success:false,error: err.message})
    }
})

app.get("/test/:table",async(req,res)=>{
    try
    {
        const table=await db.getAll(req.params.table);
        res.status(200).json({status:200,sucess:true,table:table});
    }catch(err)
    {
        res.status(500).json({ status: 300, success: false, error: err.message });
    }
})

app.patch("/test/:table",async(req,res)=>{
    try
    {
        const id=await db.update(req.params.table,req.body);
        res.status(200).json({status:200,success:true,dno:id.dno});
    }catch(err)
    {
        res.status(500).json({ status: 300, success: false, error: err.message });
    }
})

app.delete("/test/:table",async(req,res)=>{
    try
    {
    await db.deleted(req.params.table,req.body);
    res.status(200).json({status: 200,success:true })
    }catch(err)
    {
        res.status(500).json({ status: 300, success: false, error: err.message });
    }
})


//app.get("/test", (req,res)=>{res.status(200).json({sucess:true})})

app.listen(3000, () => console.log('Server Started'))