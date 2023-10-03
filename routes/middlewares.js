require("dotenv").config();
const jwt = require("jsonwebtoken");

function isUserLoggedIn(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).send('no-authorization-header');
        return;
    }

    const authHeaderVal = authHeader.split(" ");
    const tokenType = authHeaderVal[0];
    const tokenValue = authHeaderVal[1];

    if (tokenType == "Bearer") {
        const decoded = jwt.verify(tokenValue, process.env.secret);
        req.decoded = decoded;
        next();
        return;
    }

    res.status(401).send('not-authorized');
}

function isAdmin(req, res, next) {
    if (req.decoded.role == 'admin') {
        next();
    } else {
        res.status(403).send("action-not-allowed");
    }
}

module.exports = {isUserLoggedIn, isAdmin};