const express  =  require('express');
const ideasRouter = require('./routes/ideas');
const app = express();

const port = 5000;


app.get('/',(req,res)=>{
    res.send('Hello to the Random Ideas Portal');
});

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use('/api/ideas',ideasRouter);



app.listen(port,()=> console.log(`Server is listening on port ${port}`));