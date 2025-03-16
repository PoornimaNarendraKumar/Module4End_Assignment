const express=require('express');
const app=express()
const path = require('path');
const booksRouter = require('./routes/booksRoute');
app.use(express.json())

app.use('/books',booksRouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/index.html'))})

app.listen(5000,()=>{
    console.log("Server Started Successfully");
})