const mongoose = require("mongoose");

const analysisResultSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        index:true
    },

    resume:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Resume",
        required:true
    },

    analysisData:{

        overallScore:Number,

        summary:String,

        strengths:[String],

        weaknesses:[String],

        missingSkills:[String],

        suggestions:[String]

    },

    model:{
        type:String,
        default:"gemini-2.5-flash"
    },

    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"completed"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("AnalysisResult", analysisResultSchema);
