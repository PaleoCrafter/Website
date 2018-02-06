import userUtils from './userUtils';

module.exports = {
    getFetchJSON(url) {
        const header = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const authorizationToken = userUtils.getToken();
        if (authorizationToken !== null) {
            header.Authorization = `Bearer ${authorizationToken}`;
        }
        return fetch(
            url,
            {
                method: 'GET',
                headers: header,
            },
        )
            .then(res => res.json());
    },
};
