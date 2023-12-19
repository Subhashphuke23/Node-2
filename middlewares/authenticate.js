const jwt = require('jsonwebtoken');
const JWT_SECRET = "ashgasaksquw()ajsastsj7239299872uhiiro76327jbk?[]pouis";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ error: "Authorization failed. Token not provided." });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        console.log("err", err);
        res.status(401).json({ error: "Authorization failed. Invalid token." });
    }
};

module.exports = authenticate;
