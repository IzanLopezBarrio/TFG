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

router.get("/group/:user", async function (req, res) {
    const results = await ResultService.getAllFilter(req.params.user)
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

module.exports = router;