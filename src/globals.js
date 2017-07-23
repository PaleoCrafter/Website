const env = process.env.NODE_ENV || 'dev';

module.exports = {
    host: env === 'dev' ? 'http://localhost:1234' : 'http://mcmoddev.com',
    endPoint: env === 'dev' ? 'http://localhost:8080/v1' : 'https://api.mcmoddev.com/v1',

    getFetch(url, method, authorizationToken = null){
        if (authorizationToken != null) {
            return fetch(url,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + authorizationToken
                    },
                })
        } else {
            return fetch(url,
                {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
        }
    },

    getStorage(){
        let storageSystem = localStorage;
        if (storageSystem.getItem("token") == null) {
            storageSystem = window.sessionStorage;
            if (storageSystem.getItem("token") == null)
                return undefined;
            else
                return storageSystem;
        } else
            return storageSystem
    },

    refreshToken(){
        const storageSystem = this.getStorage();
        let refreshToken = storageSystem.getItem("refreshToken");
        let refreshTokenExpire = storageSystem.getItem("refreshExpire");

        if (refreshTokenExpire == null)
            return false;

        let currentDate = new Date();
        currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
        if (refreshTokenExpire >= currentDate) {
            this.getFetch(this.endPoint + `/auth/refreshToken`, "POST", refreshToken)
                .then(res => {
                    return res.json().then(json => ({
                            status: res.status,
                            data: json
                        })
                    )
                })
                .then(res => {
                    if (res.status === 200) {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpire', res.data.tokenExpire);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpire', res.data.refreshExpire);
                        return true;
                    } else {
                        storageSystem.removeItem('token');
                        storageSystem.removeItem('tokenExpire');
                        storageSystem.removeItem('refreshToken');
                        storageSystem.removeItem('refreshExpire');
                        return false;
                    }
                });
        } else {
            storageSystem.removeItem('token');
            storageSystem.removeItem('tokenExpire');
            storageSystem.removeItem('refreshToken');
            storageSystem.removeItem('refreshExpire');
            return false;
        }
    },

    isUserLoggedIn() {
        const storageSystem = this.getStorage();
        if (storageSystem == null)
            return false;

        let refreshToken = storageSystem.getItem("refreshToken");
        let tokenExpire = storageSystem.getItem("tokenExpire");

        if (tokenExpire) {
            let currentDate = new Date();
            currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
            if (tokenExpire >= currentDate) {
                return true;
            } else {
                return this.refreshToken()
            }
        }
        return false;
    },
    getToken() {
        const storageSystem = this.getStorage();
        if (storageSystem == null)
            return undefined;
        let token = storageSystem.getItem("token");
        let tokenExpire = storageSystem.getItem("tokenExpire");

        if (tokenExpire) {
            let currentDate = new Date();
            currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
            if (tokenExpire >= currentDate) {
                return token
            } else if (this.refreshToken()) {
                return storageSystem.getItem("token");
            }

        }
        return undefined;
    },

    hasProjectPermission(permission, type){
        return permission != null && permission === 10000000000
    }
};
