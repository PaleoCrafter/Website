import to from 'await-to-js';
import globals from './globals';

export default {
    /**
     * Get the storage in which the token is
     * @returns Storage The storage in which the token is contained,
     *          will return null if token isn't present.
     */
    getStorage() {
        let storageSystem = localStorage;
        if (storageSystem.getItem('token') === null) {
            storageSystem = window.sessionStorage;
            return storageSystem.getItem('token') === null ? null : window.sessionStorage;
        }
        return storageSystem;
    },

    async refreshToken(refreshToken) {
        const data = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${refreshToken}`,
            },
            method: 'POST',
        };
        const [fetchErr, resp] = await to(fetch(`${globals.endPoint()}/auth/refreshToken`, data));
        if (fetchErr) {
            return Promise.reject(fetchErr);
        }
        const json = await resp.json();
        if (resp.ok) {
            return json;
        }
        throw json;
    },

    /**
     * Refreshes the current token if it is expired, and returns a boolean on the state of it.
     * @returns {boolean} If the token was refreshed or not.
     */
    handleRefresh() {
        return new Promise((resolve, reject) => {
            const storageSystem = this.getStorage();
            const refreshToken = storageSystem.getItem('refreshToken');
            const refreshExpire = storageSystem.getItem('refreshExpire');

            if (refreshExpire === null) {
                return reject();
            }

            const currentDate = new Date();
            if (refreshExpire >= currentDate.getTime()) {
                return this.refreshToken(refreshToken)
                    .then((res) => {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpire', res.data.tokenExpire);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpire', res.data.refreshExpire);
                        return resolve(res.data.token);
                    })
                    .catch(() => {
                        console.log('boop');
                        storageSystem.removeItem('token');
                        storageSystem.removeItem('tokenExpire');
                        storageSystem.removeItem('refreshToken');
                        storageSystem.removeItem('refreshExpire');

                        return reject();
                    });
            }
            storageSystem.removeItem('token');
            storageSystem.removeItem('tokenExpire');
            storageSystem.removeItem('refreshToken');
            storageSystem.removeItem('refreshExpire');
            return reject();
        });
    },

    /**
     * Gets the current login token used for requests. It will
     * return null if the user is not logged in.
     * @returns {string | null}
     */
    getToken() {
        return new Promise((resolve, reject) => {
            const storageSystem = this.getStorage();

            if (storageSystem === null) {
                return reject();
            }

            const token = storageSystem.getItem('token');
            const tokenExpire = storageSystem.getItem('tokenExpire');

            if (tokenExpire) {
                const currentDate = new Date();
                if (tokenExpire >= currentDate.getTime()) {
                    return resolve(token);
                }
                return this.handleRefresh()
                    .then((t) => {
                        resolve(t);
                    })
                    .catch(() => {
                        reject();
                    });
            }
            return reject();
        });
    },

    /**
     * Check to see if the user is logged in by checking for a token.
     * @returns {boolean} Returns true if the user is logged in, if not will return false
     */
    isUserLoggedIn() {
        return this.getToken();
    },
};
