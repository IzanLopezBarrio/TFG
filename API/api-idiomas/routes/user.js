let express = require("express");
let router = express.Router();

let userService = require("../service/userService")

router.post("/login", async function (req, res) {
    const results = await userService.login(req.body.email, req.body.passwd)
    if (results.length == 0) {
        const error = {
            mensaje: "Usuario y/o contraseña incorrectos."
        }
        res.status(401).json(error)
    } else {
        res.json(results);
    }
});

router.post("/register", async function (req, res) {
    const check = await userService.login(req.body.email, req.body.passwd)
    if (check.length == 0) {
        const results = await userService.register(req.body.email, req.body.userName, req.body.passwd)
        if (results.length == 0) {
            const error = {
                mensaje: "Error al registrar un nuevo usuario."
            }
            res.status(500).json(error)
        } else {
            const done = {
                info: "Usuario registrado"
            }
            res.status(201).json(done)
        }
    } else {
        const error = {
            mensaje: "El correo ya está registrado."
        }
        res.status(401).json(error)
    }
});

module.exports = router;