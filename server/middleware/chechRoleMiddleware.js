const jwt = require('jsonwebtoken');

module.exports = (role) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token){
                return res.status(401).json({message: "not auth"});
            }
            const {roles: userRoles} = jwt.verify(token, process.env.SECRET_KEY)
            let hasRole = false
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403).json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            return res.status(401).json({message: "Not auth 2"});
        }
    }
}