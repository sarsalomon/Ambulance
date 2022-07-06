const ApiError = require("../error/ApiError");
const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcrypt');
const model    = require('../module/module');

const generateJwt = (id, login, role, name) => {
    return token = jwt.sign(
        {id, login, role, name},
        process.env.SECRET_KEY,
        {expiresIn: '365d'}
    )
}

class UserController {
    async registration(req, res, next){
        const {login, password, role, name, phone, address, birthday, status} = req.body;
        if (!login){
            return next(ApiError.badRequest("Login yozilmadi"));
        }else if (!password){
            return next(ApiError.badRequest("Parol yozilmadi"));
        }else if (!role){
            return next(ApiError.badRequest("Roli tanlanmadi"));
        }else if (!name){
            return next(ApiError.badRequest("FISH yozilmadi"));
        }else if (!phone){
            return next(ApiError.badRequest("Telfon raqami yozilmadi"));
        }else if (!address){
            return next(ApiError.badRequest("Yashash manzili yozilmadi"));
        }else if (!birthday){
            return next(ApiError.badRequest("Tug`ilgan kuni tanlanmadi"));
        }else if (!status){
            return next(ApiError.badRequest("Holati tanlanmadi"));
        }
        const condidate = await model.user.findOne({login});
        if (condidate) {
            return next(ApiError.badRequest("Bu foydalanuvchi tizimda bor"));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await model.user.create({login, password:hashPassword, role, name, phone, address, birthday, status});
        const token = generateJwt(user.id, user.login, user.role)
        return res.json({token});
    }

    async login(req, res, next){
        const {login, password} = req.body;
        const user = await model.user.findOne({login});
        if (!user){
            return next(ApiError.internal("Login yoki Parol noto`g`ri"));
        }
        let comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.internal('Login yoki Parol noto`g`ri'));
        }
        const token = generateJwt(user.id, user.login, user.role, user.name);
        return res.json({token});
    }

    async check(req, res, next){
        const token = generateJwt(req.user.id, req.user.login, req.user.role, req.user.name);
        return res.json({token});
    }
}

module.exports = new UserController();