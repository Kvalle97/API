const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
  const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No token provided.' });
        }
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken;
