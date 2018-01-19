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
        const storageSystem = this.getStorage();
        const refreshToken = storageSystem.getItem('refreshToken');
        const refreshExpires = storageSystem.getItem('refreshExpires');

        if (refreshExpires === null) {
            return false;
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
                })
                .catch(() => {
                    storageSystem.removeItem('token');
                    storageSystem.removeItem('tokenExpires');
                    storageSystem.removeItem('refreshToken');
                    storageSystem.removeItem('refreshExpires');
                    return false;
                });
        }
        storageSystem.removeItem('token');
        storageSystem.removeItem('tokenExpires');
        storageSystem.removeItem('refreshToken');
        storageSystem.removeItem('refreshExpires');
        return false;
    },

    /**
     * Gets the current login token used for requests. It will
     * return null if the user is not logged in.
     * @returns {string | null}
     */
    getToken() {
        const storageSystem = this.getStorage();

        if (storageSystem === null) {
            return null;
        }

        const token = storageSystem.getItem('token');
        const tokenExpires = storageSystem.getItem('tokenExpires');

        if (tokenExpires) {
            const currentDate = new Date();
            if (tokenExpires >= currentDate.getTime()) {
                return token;
            } else if (async () => this.handleRefresh()) {
                return this.getStorage()
                    .getItem('token');
            }
        }
        return null;
    },

    /**
     * Check to see if the user is logged in by checking for a token.
     * @returns {boolean} Returns true if the user is logged in, if not will return false
     */
    isUserLoggedIn() {
        return this.getToken() !== null;
    },
};
