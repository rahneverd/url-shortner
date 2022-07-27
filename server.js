const express = require("express");
const mongoose = require("mongoose");
const ShortUrls = require("./models/shortUrls");
const app = express();

mongoose.connect("mongodb://localhost/urlShortner", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const shortUrls = await ShortUrls.find();
    res.render("index", { shortUrls });
})
app.post("/shortUrls", async (req, res) => {
    await ShortUrls.create({ full: req.body.fullUrl });

    res.redirect("/");
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrls.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) {return res.sendStatus(404)}

        shortUrl.clicks++;
        shortUrl.save();
        res.redirect(shortUrl.full);
})

app.listen(process.env.PORT || 3000)