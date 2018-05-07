import to from 'await-to-js';
import userUtilities from './userUtilities';

export default {
    async fetchData(url, method, body, params) {
        const headers = {
            Accept: 'application/json',
        };

        if (params) {
            Object.keys(params)
                .forEach((key) => {
                    url.searchParams.append(key, params[key]);
                });
        }

        const [tokenErr, token] = await to(userUtilities.getToken());
        if (!tokenErr) {
            headers.Authorization = `Bearer ${token}`;
        }

        const data = {
            headers,
            method,
        };
        if (body) {
            data.body = body;
        }
        const [fetchErr, resp] = await to(fetch(url, data));
        if (fetchErr) return Promise.reject(fetchErr);
        const json = await resp.json();
        if (resp.ok) {
            return json;
        }
        throw json;
    },

    fetchGet(url, params) {
        return this.fetchData(url, 'GET', null, params);
    },
    fetchPut(url, params) {
        return this.fetchData(url, 'PUT', null, params);
    },
    fetchDelete(url, params) {
        return this.fetchData(url, 'DELETE', null, params);
    },
    fetchPost(url, body) {
        return this.fetchData(url, 'POST', body);
    },
};
