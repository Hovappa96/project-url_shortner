const shortenModel = require("../models/shortenModel")
const shortid = require("shortid")
const validUrl = require("valid-url")

const type = function (value) {
    if (typeof value === "undefined" || typeof value === null) return false
    if (typeof value === "string" && typeof value.trim().length === 0) return false
    return true
}


//1.Post Api
const createShortenUrl = async function (req, res) {
    try {
        let data = req.body;
        const { longUrl } = data

        //mandotary validation
        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "No Parameter Passed In RequestBody" })
        }
        if (!type(longUrl)) {
            return res.status(400).send({ status: false, msg: "Long Url is Required" })
        } 
        
        //unique validation
        let checkUrl = await shortenModel.findOne({ longUrl })

        if (checkUrl) {
            return res.status(400).send({ status: false, msg: "LongUrl is already Present" })
        }
        else {
            let baseUrl = "http://localhost:3000"

            //Generating Short Url Using shortId package
            const urlCode = shortid.generate(longUrl)
            const shortUrl = baseUrl + "/" + urlCode

            let saveData = new shortenModel({ longUrl, shortUrl, urlCode })
            await saveData.save();
            return res.status(201).send({ status: true, data: saveData })
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })

    }
}



//2.Get Api
const getUrlContent = async function (req, res) {
    try {
        let urlCode = req.params.urlCode;
        if (Object.keys(urlCode) == 0) {
            return res.status(400).send({ status: false, msg: "Please Provide UrlCode" })
        }

        let checkUrlCode = await shortenModel.findOne({ urlCode })
        if (!checkUrlCode) {
            return res.status(404).send({ status: false, msg: "No URL Found" })
        }
        else {
            return res.status(302).redirect(checkUrlCode.longUrl)
        }
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}


module.exports.createShortenUrl = createShortenUrl;
module.exports.getUrlContent = getUrlContent;