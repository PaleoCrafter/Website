import userUtils from './userUtils';

module.exports = {
    getFetchJSON(url, method = 'GET', authorizationToken = userUtils.getToken()) {
        if (authorizationToken !== null) {
            return fetch(
                url,
                {
                    method,
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: `Bearer ${authorizationToken}`,
                    },
                },
            )
                .then(res => res.json());
        }
        return fetch(
            url,
            {
                method,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            },
        )
            .then(res => res.json());
    },

};
