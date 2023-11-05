import passport from "passport";
import { usersManager } from "./managers/usersManager.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { hashData, compareData } from "./utils.js";

passport.use(
"signup",
new LocalStrategy(
    {
    usernameField: "email",
    passReqToCallback: true,
    },
    async (req, email, password, done) => {
    try {
        const userDB = await usersManager.getByEmail(email);
        if (userDB) {
        return done(null, false);
        }
        const hashedPassword = await hashData(password);
        const createdUser = await usersManager.createOne({
        ...req.body,
        password: hashedPassword,
        });
        done(null, createdUser);
    } catch (error) {
        done(error);
    }
    }
)
);

passport.use(
"login",
new LocalStrategy(
    {
    usernameField: "email",
    },
    async (email, password, done) => {
    try {
        const userDB = await usersManager.getByEmail(email);
        if (!userDB) {
        return done(null, false);
        }
        const isValid = await compareData(password, userDB.password);
        if (!isValid) {
        return done(null, false);
        }
        done(null, userDB);
    } catch (error) {
        done(error);
    }
    }
)
);

passport.serializeUser(function (user, done) {
console.log("test");
done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
try {
    const user = await usersManager.getById(id);
    done(null, user);
} catch (error) {
    done(error);
}
});