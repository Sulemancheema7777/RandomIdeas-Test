const path = require('path');
const express  =  require('express');
const ideasRouter = require('./routes/ideas.js');
require('dotenv').config();
const app = express();
const connectedDB = require('./config/db.js');
const cors = require('cors');

const port = process.env.PORT || 5000;




//middleware for specifying the static folder
app.use(express.static(path.join(__dirname,'public')));

// middleware so that when we submit data from form we can read it in the backend
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/',(req,res)=>{
    res.send('Hello to the Random Ideas Portal');
});

//middleware for cors
app.use(cors({
            origin:['http://localhost:5000','http://localhost:3000'],
            credentials:true
        }));

// middleware for routes
app.use('/api/ideas',ideasRouter);



app.listen(port,()=> console.log(`Server is listening on port ${port}`));