const {Schema,model,ObjectId} = require("mongoose");
const History = new Schema({
    userId: {type:ObjectId, ref:'User'},
    username:{type:String,required:true},
    kind: {type:String,required:true},
    rightAnswers: {type:Number,required:true},
    totalAnswers: {type:Number,required:true},
    result: {type:Number,required:true},
    date:{type:String,required:true}
});

module.exports = model('History',History);