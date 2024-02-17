const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan('dev'))

const data = [
    {
        id:1,
        nombre: "Hello Kitty",
        mes: "Noviembre",
        edad: 50
    },
    {
        id:2,
        nombre: "Keroppi",
        mes: "Julio",
        edad: 37
    },
    {
        id:3,
        nombre: "Kuromi",
        mes: "Octubre",
        edad: 19
    },
    {
        id:4,
        nombre: "Cinnamoroll",
        mes: "Julio",
        edad: 18
    }
]
app.get("/",(req,res)=>{
    res.send("Hola mundoo")
})
app.get("/data/all",(req,res)=>{
    res.status(200).json(data)
})
app.get("/data",(req,res)=>{
   const query_mes=req.query.mes
   const query_edad=req.query.edad
   if(query_mes&&query_edad){
        const filtro= data.filter(item=>item.mes==query_mes&&item.edad==query_edad)
        if(filtro.length>0){
            res.status(200).json(filtro)
        } else{
            res.status(404).json({message: "No encontrado."})
        } 
    }else{
        res.status(302).redirect("/data/all")
    }
})
app.get("/data/:id",(req,res)=>{
    const id_user =req.params.id
    const encontrado = data.find(item=>item.id==id_user)
    if(encontrado){
        res.status(200).json(encontrado)
    }
    else{
        res.status(404).json({message: "No encontradoo."})
    }
})

app.post("/data",(req,res)=>{
    const user_body=req.body
    data.push(user_body)
    res.status(201).json(data)
})

app.put("/data/:id",(req,res)=>{
    const user_body= req.body
    const param=req.params.id
    const encontrado=data.findIndex(item=>item.id==param)
    if(encontrado!=-1){
        data[encontrado]=user_body
        res.status(201).json(data)
    }else{
        res.status(404).json({message: "No encontradooo"})
    }
})

app.patch("/data/:id", (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    const index = data.findIndex(item => item.id == id);
    if (index !== -1) {
        data[index] = { ...data[index], ...newData };
        res.status(200).json(data[index]);
    } else {
        res.status(404).json({ message: "No encontradoooo" });
    }
});

app.delete("/data/:id", (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(item => item.id == id);
    if (index !== -1) {
        data.splice(index, 1);
        res.status(200).json({ message: "Elemento eliminado exitosamente" });
    } else {
        res.status(404).json({ message: "No encontradooooo" });
    }
});


app.listen(port,()=>{
    console.log("Servicio escuchando el puerto: ",port)
})