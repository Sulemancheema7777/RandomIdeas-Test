const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
 title:{
    type:String,
    required:[true, 'Please add a text field']
 },
 tag:{
    type:String
 },
 userName:{
    type:String
 },
 date:{
    type:Date,
    default: Date.now
 }
});

module.exports = mongoose.model('Idea',IdeaSchema);