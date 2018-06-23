const dateFormat = require('dateformat');


export default {
    publicURL() {
        return process.env.REACT_APP_ASSETS_URL;
    },

    /**
     * Returns the api endpoint for the current build type
     */
    endPoint() {
        return process.env.REACT_APP_API_URL;
    },

    getDate(epoch) {
        return this.getFormattedDate(epoch, 'HH:mm:ss dd/mm/yyyy');
    },
    getFormattedDate(epoch, format) {
        return dateFormat(new Date(epoch), format);
    },
};

