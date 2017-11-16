const env = process.env.NODE_ENV || 'dev';

module.exports = {
    host: env === 'dev' ? 'http://localhost:1234' : env === 'staging' ? 'https://dev.diluv.com' : 'http://diluv.com',
    endPoint: env === 'dev' ? 'http://localhost:8080/v1' : env === 'staging' ? 'https://devapi.diluv.com/v1' : 'https://api.diluv.com/v1',

    getFetch(url, method = 'GET', authorizationToken = null) {
        if (authorizationToken != null) {
            return fetch(url,
                {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${authorizationToken}`,
                    },
                });
        }
        return fetch(url,
            {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
    },

    postForm(url, payload, callback) {
        let formBody = [];
        for (const property in payload) {
            const encodedKey = encodeURIComponent(property);
            const encodedValue = encodeURIComponent(payload[property]);
            formBody.push(`${encodedKey}=${encodedValue}`);
        }
        formBody = formBody.join('&');
        fetch(url,
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody,
            })
            .then(res => res.json())
            .then((res) => {
                callback(res);
            });
    },

    getStorage() {
        let storageSystem = localStorage;
        if (storageSystem.getItem('token') == null) {
            storageSystem = window.sessionStorage;
            if (storageSystem.getItem('token') == null) {
                return null;
            }
            return storageSystem;
        }
        return storageSystem;
    },

    refreshToken() {
        const storageSystem = this.getStorage();
        const refreshToken = storageSystem.getItem('refreshToken');
        const refreshTokenExpires = storageSystem.getItem('refreshExpires');

        if (refreshTokenExpires == null) {
            return false;
        }

        let currentDate = new Date();
        currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
        if (refreshTokenExpires >= currentDate) {
            this.getFetch(`${this.endPoint}/auth/refreshToken`, 'POST', refreshToken)
                .then(res => res.json())
                .then((res) => {
                    if (res.statusCode === 200) {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                        return true;
                    }
                    storageSystem.removeItem('token');
                    storageSystem.removeItem('tokenExpires');
                    storageSystem.removeItem('refreshToken');
                    storageSystem.removeItem('refreshExpires');
                    return false;
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
        if (storageSystem == null) {
            return null;
        }
        const token = storageSystem.getItem('token');
        const tokenExpires = storageSystem.getItem('tokenExpires');

        if (tokenExpires) {
            let currentDate = new Date();
            currentDate = (currentDate.getTime() - currentDate.getMilliseconds()) / 1000;
            if (tokenExpires >= currentDate) {
                return token;
            } else if (this.refreshToken()) {
                return storageSystem.getItem('token');
            }
        }
        return null;
    },
    isUserLoggedIn() {
        return this.getToken() != null;
    },
    hasProjectPermission(permission, type) {
        return permission != null && (1 << type & permission) > 0;
    },
    hasUserPermission(permission, type) {
        if (!this.isUserLoggedIn()) {
            return false;
        }
        return permission != null && (1 << type & permission) > 0;
    },
    PROJECT_PERMISSION: {
        EDIT_DESCRIPTION: 1,
        EDIT_SETTINGS: 2,
        ADD_USER: 3,

        UPLOAD_FILE: 30,
    },
};
