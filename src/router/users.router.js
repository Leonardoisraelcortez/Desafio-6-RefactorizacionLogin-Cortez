import { Router } from "express";
import { usersManager } from "../dao/managers/MongoDb/usersManager.js";
import { hashData, compareData } from "../utils.js";
import passport from "passport";
import { usersModel } from "../dao/db/models/users.model.js";

const router = Router();

router.post("/login", async (req, res) => {
const { email, password } = req.body;
const userDB = await usersManager.findByEmail(email);

if (!userDB) {
    return res.json({ error: "Este correo no existe" });
}

const isValidPassword = await compareData(password, userDB.password);

if (!isValidPassword) {
    return res.json({ error: "Contraseña incorrecta" });
}

req.session.email = email;
req.session.first_name = userDB.first_name;

if (email === "adminCoder@coder.com" && password === "leuz123") {
    req.session.isAdmin = true;
}

return res.redirect("/home");
});

router.post("/signup", async (req, res) => {
const { email, password } = req.body;

if (!email || !password) {
return res.status(400).json({ error: "El correo y la contraseña son campos obligatorios" });
}

try {
const hashedPassword = await hashData(password);
const createdUser = await usersManager.createOne({
    email,
    password: hashedPassword,
});

res.status(200).json({ message: "Usuario creado", createdUser });
} catch (error) {
res.status(500).json({ error });
}
});

router.get("/logout", (req, res) => {
console.log("Ruta de logout alcanzada");
req.session.destroy((err) => {
    if (err) {
        console.error("Error al cerrar la sesión:", err);
        return res.status(500).json({ error: "Error al cerrar la sesión" });
    }
    res.redirect("/");
});
});

router.get(
"/auth/github",
passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
"/github",
passport.authenticate("github", {
    failureRedirect: "/error",
}),
(req, res) => {
    req.session.user = req.user;
    res.redirect("/home");
}
);



router.get("/:idUser", async (req, res) => {
const { idUser } = req.params;

try {
const user = await usersManager.getById(idUser);
res.status(200).json({ message: "User found", user });
} catch (error) {
res.status(500).json({ error });
}
});


export default router;

