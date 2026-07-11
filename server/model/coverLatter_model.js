const mongoose = require("mongoose");

const coverLetterSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true
    },

    companyName:String,

    jobTitle:String,

    hiringManager:String,

    coverLetter:String,

    model:{
        type:String,
        default:"gemini-2.5-flash"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("CoverLetter",coverLetterSchema);