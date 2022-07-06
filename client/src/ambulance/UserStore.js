import {makeAutoObservable} from "mobx";

export default class UserPolyclinic {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._userinfo = {}
        this._userrole = {}
        this._userfish = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setUserInfo(userinfo) {
        this._userinfo = userinfo
    }
    
    setUserRole(userrole) {
        this._userrole = userrole
    }
    
    setUserFish(userfish) {
        this._userfish = userfish
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get userinfo() {
        return this._userinfo
    }

    get userrole() {
        return this._userrole
    }

    get userfish() {
        return this._userfish
    }
}
