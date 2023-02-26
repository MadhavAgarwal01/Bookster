import jwt from "jsonwebtoken";
import createError from "../utils/error.js";

export const verifyToken = (req, res, next) => {

    console.log("VerifyToken Called!");

    const token = req.cookies.access_token;
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return next(createError(403, "Token is not valid!"));
        req.user = user;
        next();
    })
}

export const verifyUser = (req, res, next) => {

    console.log("VerifyUser Called!");

    verifyToken(req, res, () => {

        console.log("VerifyUser Callback function called!")

        if (req.user.id === req.params.id || req.user.isAdmin) {
            console.log("User verified!");
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};

export const verifyAdmin = (req, res, next) => {

    console.log("VerifyAdmin Called!");

    verifyToken(req, res, () => {

        console.log("VerifyAdmin Callback function called!")

        if (req.user.isAdmin) {
            next();
        } else {
            return next(createError(403, "You are not authorized!"));
        }
    });
};