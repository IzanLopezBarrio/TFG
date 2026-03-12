let express = require("express");
let router = express.Router();

let LanguageService = require("../service/languageService.js")

router.get("/all", async function (req, res) {
    const results = await LanguageService.getIdiomas()
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
});

router.get("/all/:id", async function (req, res) {
    const results = await LanguageService.getIdioma(req.params.id)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
})

router.get("/niveles/:idioma", async function (req, res) {
    const results = await LanguageService.getNiveles(req.params.idioma)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
});

module.exports = router;