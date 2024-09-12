export default class RestoService {
    _apiBase = 'http://localhost:3000';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + 
                `, received ${res.status}`);
        }
        return await res.json();
    }

    async getMenuItems () {
        return await this.getResource('/menu');
    }

    async setOrder(order) {
        const newOrder = {
            order
        }
        const response = await fetch(`${this._apiBase}/orders`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok){
            throw new Error('json error'); 
        }
    }
}