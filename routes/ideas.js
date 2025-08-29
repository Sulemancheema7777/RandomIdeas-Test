const express  =  require('express');
router = express.Router();

const ideas = [
    {
        id:1,
        userName:'suleman cheema',
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

router.get('/',(req,res)=>{
    if(!ideas){
        return;
    }
    res.json({success:true,data:ideas});
});

router.get('/:id',(req,res)=>{

    const data = ideas.find((idea)=>idea.id === +req.params.id);

    if(!data){
        res.json({success:false,message:'Resource not Found'});
        return;
    }

    res.json({success:true,data:data});
});

router.post('/',(req,res)=>{

    const idea = {
        id:ideas.length + 1,
        userName:req.body.userName,
        title:req.body.title
    }
    ideas.push(idea);
    res.json({success:true,data:idea});
});

router.put('/:id',(req,res)=>{

    const data = ideas.find((idea)=>idea.id === +req.params.id);
    
    if(!data){
        res.json({success:false,message:'Resource not Found'});
        return;
    }

    data.userName = req.body.userName;
    data.title = req.body.title;

    res.json({success:true,data:data});
});

router.delete('/:id',(req,res)=>{

    const dataIndex = ideas.findIndex((idea)=>idea.id === +req.params.id);
    if(dataIndex < 0 ){
        res.json({success:false,message:'Resource not Found'});
        return;
    }

    ideas.splice(dataIndex,1);
    res.json({success:true,data:ideas});
});

module.exports = router;