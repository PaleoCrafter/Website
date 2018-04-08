import globals from './globals';

module.exports = {
    /**
     * Get the storage in which the token is
     * @returns Storage The storage in which the token is contained,
     *          will return null if token isn't present.
     */
    getStorage() {
        let storageSystem = localStorage;
        if (storageSystem.getItem('token') === null) {
            storageSystem = window.sessionStorage;
            return storageSystem.getItem('token') === null ? null : storageSystem;
        }
        return storageSystem;
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
            if (refreshExpires >= currentDate.getTime()) {
                return fetch(
                    `${globals.endPoint()}/auth/refreshToken`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    },
                )
                    .then(res => res.json()
                        .then((json) => {
                            if (res.ok) return json;

                            throw json;
                        }))
                    .then((res) => {
                        storageSystem.setItem('token', res.data.token);
                        storageSystem.setItem('tokenExpires', res.data.tokenExpires);
                        storageSystem.setItem('refreshToken', res.data.refreshToken);
                        storageSystem.setItem('refreshExpires', res.data.refreshExpires);
                        return resolve(res.data.token);
                    })
                    .catch(() => {
                        storageSystem.removeItem('token');
                        storageSystem.removeItem('tokenExpires');
                        storageSystem.removeItem('refreshToken');
                        storageSystem.removeItem('refreshExpires');
                        return reject();
                    });
            }
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
                this.handleRefresh()
                    .then((t) => {
                        resolve(t);
                    })
                    .catch(reject());
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
