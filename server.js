const express  =  require('express');
const port = 5000;
const app = express();

const ideas = [
    {
        id:1,
        userName:'suleman',
        title:'title 1 here',
    },
    {
        id:2,
        userName:'suleman',
        title:'title 2 here',
    },
    {
        id:3,
        userName:'Hamza',
        title:'title 3 here',
    },
    {
        id:4,
        userName:'Ali',
        title:'title 4 here',
    }
]

app.get('/',(req,res)=>{
    res.send('Hello to the Random Ideas Portal');
});

app.get('/api/ideas',(req,res)=>{
    if(!ideas){
        return;
    }
    res.json({success:true,data:ideas});
});

app.get('/api/ideas/:id',(req,res)=>{

    const data = ideas.find((idea)=>idea.id === +req.params.id);

    if(!data){
        res.json({success:false,message:'Resource not Found'});
        return;
    }

    res.json({success:true,data:data});
});


app.listen(port,()=> console.log(`Server is listening on port ${port}`));