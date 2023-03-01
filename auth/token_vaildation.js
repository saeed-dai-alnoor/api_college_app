const jwt = require('jsonwebtoken');


const checkToken = (req, res, next) => {
    let token = req.get('authorization');
    if (token) {
        token = token.slice(7);
        jwt.verify(token, 'private123', (err, _decodeed) => {
            if (err) {
                res.send({
                    success: 0,
                    message: 'Invaild token'
                });
            } else {
                next();
            }
        })
    } else {
        res.send({
            success: 0,
            message: 'Access denied! unauthorized user'
        });
    }
}
module.exports = checkToken;