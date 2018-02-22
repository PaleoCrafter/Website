import userUtils from './userUtils';

module.exports = {
    getFetchJSON(url) {
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        const authorizationToken = userUtils.getToken();
        if (authorizationToken !== null) {
            headers.Authorization = `Bearer ${authorizationToken}`;
        }

        return fetch(
            url,
            {
                method: 'GET',
                headers,
            },
        )
            .then(res => res.json()
                .then((json) => {
                    if (res.ok) return json;

                    throw json;
                }));
    },
};
