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

module.exports = router;