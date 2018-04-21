import to from 'await-to-js';
import userUtils from './userUtils';

module.exports = {

    async fetchData(url, method, body, params) {
        const headers = {
            Accept: 'application/json',
        };

        if (params ) {
            Object.keys(params)
                .forEach(key => url.searchParams.append(key, params[key]));
        }

        const [tokenErr, token] = await to(userUtils.getToken());
        if (!tokenErr) {
            headers.Authorization = `Bearer ${token}`;
        }

        const [fetchErr, resp] = await to(fetch(url, { headers }));
        if (fetchErr) return Promise.reject(fetchErr);

        return await resp.json();
    },

    fetchGet(url, ...params) {
        return this.fetchData(url, 'GET', null, params);
    },
    fetchPut(url, ...params) {
        return this.fetchData(url, 'PUT', null, params);
    },
    fetchDelete(url, ...params) {
        return this.fetchData(url, 'DELETE', null, params);
    },
    fetchPost(url, body) {
        return this.fetchData(url, 'POST', body);
    },
};
