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

router.get("/user/:user", async function (req, res) {
    const results = await LanguageService.getIdiomasByUser(req.params.user)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
});

router.get("/user/:user/:id", async function (req, res) {
    const results = await LanguageService.checkIdiomasByUser(req.params.user, req.params.id)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
});

router.post("/user/add", async function (req, res) {
    const results = await LanguageService.addIdiomasToUser(req.body.user, req.body.idioma)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(201).json(results);
    }
});
router.delete("/user/remove", async function (req, res) {
    const results = await LanguageService.removeIdiomasFromUser(req.body.user, req.body.idioma)
    res.status(204).json(true);
});
router.delete("/user/remove/all/:user", async function (req, res) {
    const results = await LanguageService.removeAllFromUser(req.params.user)
    res.status(204).json(true);
});

router.get("/all/:id", async function (req, res) {
    const results = await LanguageService.getIdioma(req.params.id)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
})

router.delete("/niveles/:id", async function (req, res) {
    await LanguageService.removeAllTestFilter(req.params.id)
    await LanguageService.removeIdiomasFromEveryone(req.params.id)
    const results = await LanguageService.removeNivel(req.params.id)
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

router.post("/all", async function (req, res) {
    const results = await LanguageService.newIdioma(req.body.name, req.body.lv)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(200).json(results);
    }
});
module.exports = router;