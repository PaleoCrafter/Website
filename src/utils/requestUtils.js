import userUtils from './userUtils';

module.exports = {
    getFetchJSON(url) {
        const headers = {
            Accept: 'application/json',
        };

        return userUtils.getToken()
            .then((token) => {
                headers.Authorization = `Bearer ${token}`;
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
            })
            .catch(() => fetch(
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
                    })));
    },
};
