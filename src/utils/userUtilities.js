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
            const refreshExpires = storageSystem.getItem('refreshExpires');

            if (refreshExpires === null) {
                return reject();
            }

            const currentDate = new Date();
            console.log(refreshExpires + ':' + currentDate.getTime());
            if (refreshExpires >= currentDate.getTime()) {
                return this.refreshToken(refreshToken)
                    .then((res) => {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                        return resolve(res.data.token);
                    })
                    .catch(() => {
                        console.log('boop');
                        storageSystem.removeItem('token');
                        storageSystem.removeItem('tokenExpires');
                        storageSystem.removeItem('refreshToken');
                        storageSystem.removeItem('refreshExpires');

                        return reject();
                    });
            }
            console.log('bop');

            storageSystem.removeItem('token');
            storageSystem.removeItem('tokenExpires');
            storageSystem.removeItem('refreshToken');
            storageSystem.removeItem('refreshExpires');
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
            const tokenExpires = storageSystem.getItem('tokenExpires');

            if (tokenExpires) {
                const currentDate = new Date();
                if (tokenExpires >= currentDate.getTime()) {
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
