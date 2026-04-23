let express = require("express");
let router = express.Router();

let TestService = require("../service/testService")

router.get("/:idioma", async function (req, res) {
    const results = await TestService.get(req.params.idioma)
    if (results.length == 0) {
        const error = {
            mensaje: "¡UPS! NO SE HAN ENCONTRADO TESTS EN ESTE IDIOMA!"
        }
        res.status(404).json(error)
    } else {
        res.json(results);
    }
});

router.get("/id/:id", async function (req, res) {
    const results = await TestService.getOne(req.params.id)
    if (results.length == 0) {
        const error = {
            mensaje: "No se ha encontrado el test solicitado."
        }
        res.status(404).json(error)
    } else {
        res.json(results);
    }
});

module.exports = router;