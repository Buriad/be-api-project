const req = require("express/lib/request");
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const { model } = require("mongoose");
const config = process.env;
const verifyToken = (req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).json({
            success: false,
            message: "хэрэглэгчийн token оруулах шаардлагатай.",
        });
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch {
        (err) => {
            return res.status(401).json({
                success: false,
                message: "Хэрэглэгийн token буруу, эсвэл идэвхгүй байна",
            });
        };
    }
    return next();
};

module.exports = verifyToken;