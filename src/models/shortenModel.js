const mongoose = require("mongoose")


const shortenSchema = new mongoose.Schema({

    urlCode:{
        type:String,
        trim:true,
        lowercase:true,
        unique:true
    },
    longUrl :{
        type:String,
        trim:true,
        required:true
    },
    shortUrl:{
        type:String,
        trim:true,
        unique:true
    }

},)


module.exports = mongoose.model("shortUrl", shortenSchema);