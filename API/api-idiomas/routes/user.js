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
        res.status(200).json(results);
    }
});

router.get("/downgrade/:email", async function (req, res) {
    const results = await userService.adminToUser(req.params.email)
    if (results.length == 0) {
        const error = {
            mensaje: "Usuario y/o contraseña incorrectos."
        }
        res.status(401).json(error)
    } else {
        res.status(200).json(results);
    }
});
router.get("/upgrade/:email", async function (req, res) {
    const results = await userService.userToAdmin(req.params.email)
    if (results.length == 0) {
        const error = {
            mensaje: "Usuario y/o contraseña incorrectos."
        }
        res.status(401).json(error)
    } else {
        res.status(200).json(results);
    }
});

router.get("/admin/allAD", async function (req, res) {
    const results = await userService.getEveryAdmin()
    if (results.length == 0) {
        const error = {
            mensaje: "No hay administradores (¿Que cojones?)."
        }
        res.status(404).json(error)
    } else {
        res.status(200).json(results);
    }
});
router.get("/admin/all", async function (req, res) {
    const results = await userService.getEveryone()
    if (results.length == 0) {
        const error = {
            mensaje: "No hay usuarios (What?)."
        }
        res.status(404).json(error)
    } else {
        res.status(200).json(results);
    }
});
router.post("/admin/check", async function (req, res) {
    const results = await userService.checkAdmin(req.body.email)
    if (results.length == 0) {
        const error = {
            mensaje: "No hay usuarios (What?)."
        }
        res.status(404).json(false)
    } else {
        res.status(200).json(true);
    }
});

router.delete("/unregister/:email", async function (req, res) {
    const results = await userService.remove(req.params.email)
    if (results.length == 0) {
        const error = {
            mensaje: "Usuario y/o contraseña incorrectos."
        }
        res.status(401).json(error)
    } else {
        res.status(204).json(true);
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

router.post("/register/admin", async function (req, res) {
    const check = await userService.login(req.body.email, req.body.passwd)
    if (check.length == 0) {
        const results = await userService.registerAdmin(req.body.email, req.body.userName, req.body.passwd)
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