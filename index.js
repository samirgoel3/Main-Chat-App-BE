const express = require('express');
const app = express();
const port = process.env.PORT || 5000 ;



app.use('/', (req, res)=>{
    res.send('Hello , I am Chat App Back End')
})

app.listen(port, ()=>{
    console.log("*****---> App listening on port: "+port)
})