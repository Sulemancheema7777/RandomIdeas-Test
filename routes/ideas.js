const express  =  require('express');
router = express.Router();
const Idea =  require('../models/Idea.js');


router.get('/',async (req,res)=>{

    try{
        const ideas = await Idea.find();
        res.json({success:true,data:ideas});
    }
    catch(err){
        res.status(500).json({success:true,error:`${err} fix it`});
    }
    
});

router.get('/:id',async (req,res)=>{

    try {
        const idea = await Idea.findById(req.params.id);
        res.json({success:true,data:idea});    
    } catch (err) {
        res.status(500).json({success:true,error:`${err} fix it`});
    }
});

router.post('/',async (req,res)=>{

    const idea = new Idea({
        userName:req.body.userName,
        title:req.body.title,
        tag:req.body.tag
    });
    try{
        const savedIdea = await idea.save();
        res.json({success:true,data:savedIdea});
    }
    catch(err){
        res.status(500).json({success:true,error:`${err} fix it`});
    }

    
});

router.put('/:id',async (req,res)=>{

    try {
        const updatedIdea = await Idea.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    title:req.body.title,
                    tag:req.body.tag
                }
            },
            {new:true}
        );
        res.json({success:true,data:updatedIdea});

    } catch (err) {
        res.status(500).json({success:true,error:`${err} fix it`});
    }

});

router.delete('/:id',async (req,res)=>{

    try {
        await Idea.findByIdAndDelete(req.params.id);
        res.json({success:true,data:{}});
    } catch (err) {
        res.status(500).json({success:true,error:`${err} fix it`});
    }
});

module.exports = router;