import { Router} from "express";
import { usersManager } from "../dao/managers/MongoDb/usersManager.js";

const router = Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const userDB = await usersManager.findByEmail(email);
    if (!userDB) {
    return res.json({ error: "este correo no existe" });
    }
    req.session["email"] = email;
    req.session["first_name"] = userDB.first_name;
    if (email === "adminCoder@coder.com" && password === "leuz123") {
    req.session["isAdmin"] = true;
    }
    res.redirect("/home");
});

router.post("/signup", async (req, res) => {
    const createdUser = await usersManager.createOne(req.body);
    res.status(200).json({ message: "usuario creado", createdUser });
});

router.get("/logout", (req, res) => {
    console.log("Ruta de logout alcanzada");
    req.session.destroy((err) => {
        if (err) {
            console.error("Error al cerrar la sesión:", err);
        }
        res.redirect("/");
    });
});


export default router