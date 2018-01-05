const userUtils = require('./userUtils');

const env = process.env.NODE_ENV || 'dev';

module.exports = {
    /**
     * Returns the endpoint for the current build type
     * @returns {string} The endpoint for the build type, either dev, staging or production
     */
    endPoint: () => {
        if (env === 'dev') {
            return 'http://localhost:8080/v1';
        } else if (env === 'staging') {
            return 'https://api.diluv.io/v1';
        }
        return 'http://api.diluv.com/v1';
    },

    hasProjectPermission(permission, type) {
        console.log(permission +":"+ type);
        return permission != null && ((1 << type) & permission) > 0;
    },

    hasUserPermission(permission, type) {
        if (!userUtils.isUserLoggedIn()) {
            return false;
        }
        return permission != null && ((1 << type) & permission) > 0;
    },

    PROJECT_PERMISSION: {
        EDIT_DESCRIPTION: 1,
        EDIT_SETTINGS: 2,
        ADD_USER: 4,

        UPLOAD_FILE: 30,
    },
};
