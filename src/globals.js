const env = process.env.NODE_ENV || 'dev';

module.exports = {
    host: env === 'dev' ? 'http://localhost:1234' : env === 'staging' ? 'http://diluv-dev.com' : 'http://diluv.com',
    endPoint: env === 'dev' ? 'http://localhost:8080/v1' : env === 'staging' ? 'http://api.diluv-dev.com/v1' : 'https://api.diluv.com/v1',

    getFetch(url, method = "GET", authorizationToken = null) {
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

    postForm(url, payload, callback) {
        let formBody = [];
        for (let property in payload) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(payload[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        fetch(url,
            {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formBody
            })
            .then(res => res.json())
            .then(res => {
                callback(res)
            });
    },

    getStorage() {
        let storageSystem = localStorage;
        if (storageSystem.getItem("token") == null) {
            storageSystem = window.sessionStorage;
            if (storageSystem.getItem("token") == null)
                return null;
            else
                return storageSystem;
        } else
            return storageSystem
    },

    refreshToken() {
        const storageSystem = this.getStorage();
        let refreshToken = storageSystem.getItem("refreshToken");
        let refreshTokenExpires = storageSystem.getItem("refreshExpires");

        if (refreshTokenExpires == null)
            return false;

        let currentDate = new Date();
        currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
        if (refreshTokenExpires >= currentDate) {
            this.getFetch(this.endPoint + '/auth/refreshToken', "POST", refreshToken)
                .then(res => res.json())
                .then(res => {
                    if (res.statusCode === 200) {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                        return true;
                    } else {
                        storageSystem.removeItem('token');
                        storageSystem.removeItem('tokenExpires');
                        storageSystem.removeItem('refreshToken');
                        storageSystem.removeItem('refreshExpires');
                        return false;
                    }
                });
        } else {
            storageSystem.removeItem('token');
            storageSystem.removeItem('tokenExpires');
            storageSystem.removeItem('refreshToken');
            storageSystem.removeItem('refreshExpires');
            return false;
        }
    },


    getToken() {
        const storageSystem = this.getStorage();
        if (storageSystem == null)
            return null;
        let token = storageSystem.getItem("token");
        let tokenExpires = storageSystem.getItem("tokenExpires");

        if (tokenExpires) {
            let currentDate = new Date();
            currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
            if (tokenExpires >= currentDate) {
                return token
            } else if (this.refreshToken()) {
                return storageSystem.getItem("token");
            }

        }
        return null;
    },
    isUserLoggedIn() {
        return this.getToken() != null;
    },
    hasProjectPermission(permission, type) {
        return permission != null && (1 << type & permission) > 0
    },
    hasUserPermission(permission, type) {
        if (!this.isUserLoggedIn())
            return false;
        return permission != null && (1 << type & permission) > 0
    },
    PROJECT_PERMISSION: {
        EDIT_DESCRIPTION: 1,
        EDIT_SETTINGS: 2,
        ADD_USER: 3,

        UPLOAD_FILE: 30,
    }
};
