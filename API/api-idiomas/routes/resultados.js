let express = require("express");
let router = express.Router();

let ResultService = require("../service/resultService")

router.get("/:user", async function (req, res) {
    const results = await ResultService.getAll(req.params.user)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.json(results);
    }
});

router.delete("/:user", async function (req, res) {
    const results = await ResultService.removeAll(req.params.user)
    res.status(204).json(true)
});
router.delete("/filter/:user/:idioma", async function (req, res) {
    const results = await ResultService.removeAllFilter(req.params.user, req.params.idioma)
    res.status(204).json(true)
});

router.get("/idioma/:user/:id", async function (req, res) {
    const results = await ResultService.getAllByLang(req.params.user, req.params.id)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.json(results);
    }
});

router.get("/group/:user", async function (req, res) {
    const results = await ResultService.getAllFilter(req.params.user.toString())
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.json(results);
    }
});

router.get("/:user/:test", async function (req, res) {
    const results = await ResultService.getOne(req.params.user, req.params.test)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.json(results);
    }
});

router.post("/:user/:test", async function (req, res) {
    const results = await ResultService.firstTest(req.params.user, req.params.test, req.body.nota, req.body.cat)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.status(201).json(results);
    }
});

router.patch("/:user/:test", async function (req, res) {
    const results = await ResultService.redoneTest(req.params.user, req.params.test, req.body.nota)
    if (results.length == 0) {
        res.status(404).json(null)
    } else {
        res.json(results);
    }
});

module.exports = router;