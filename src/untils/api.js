class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.text().then((err) =>
        Promise.reject({
          status: res.status,
          message: JSON.parse(err).message,
        })
      );
    }
  }

  getDangerGroups() {
    return fetch(`${this._baseUrl}/dangerGroup`, {
      headers: {
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  createDangerGroups(item) {
    return fetch(`${this._baseUrl}/dangerGroup`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        dangerID: item.dangerID,
        label: item.label,
      }),
    }).then(this._checkRes);
  }

  getDangers() {
    return fetch(`${this._baseUrl}/danger`, {
      headers: {
        ...this._headers,
      },
    }).then(this._checkRes);
  }

  createDangers(item) {
    return fetch(`${this._baseUrl}/danger`, {
      method: 'POST',
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        dependence: item.dependence,
        label: item.label,
        groupId: item.groupId,
      }),
    }).then(this._checkRes);
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;