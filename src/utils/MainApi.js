class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getInitialProjects() {
    return fetch(`${this.baseUrl}/projects`, {
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse)
  }

  getInitialLists(projectID) {
    return fetch(`${this.baseUrl}/projects/${projectID}`, {
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse);
  }

  postList(data) {
    return fetch(`${this.baseUrl}/projects/${data.projectID}`, {
      method: 'POST',
      headers: this._injectBearerToken(this.headers),
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  getInitialTasks(projectID) {
    return fetch(`${this.baseUrl}/projects/${projectID}/tasks`, {
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse);
  }

  postProjectTask({ projectID, listID, text }) {
    return fetch(`${this.baseUrl}/projects/${projectID}/lists/${listID}`, {
      method: 'POST',
      headers: this._injectBearerToken(this.headers),
      body: JSON.stringify({ text })
    })
      .then(this._checkResponse);
  }

  deleteProjectTask(projectID, taskID) {
    return fetch(`${this.baseUrl}/projects/${projectID}/tasks/${taskID}`, {
      method: 'DELETE',
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse);
  }


  moveTask(projectID, taskID, listID) {
    return fetch(`${this.baseUrl}/projects/${projectID}/tasks/${taskID}`, {
      method: 'PATCH',
      headers: this._injectBearerToken(this.headers),
      body: JSON.stringify({ listID })
    })
      .then(this._checkResponse);
  }

  postProject(data) {
    return fetch(`${this.baseUrl}/projects`, {
      method: 'POST',
      headers: this._injectBearerToken(this.headers),
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  deleteProject(projectId) {
    return fetch(`${this.baseUrl}/projects/${projectId}`, {
      method: 'DELETE',
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse);
  }

  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this._injectBearerToken(this.headers)
    })
      .then(this._checkResponse);
  }

  editUser(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._injectBearerToken(this.headers),
      body: JSON.stringify(data)
    })
      .then(this._checkResponse);
  }

  _injectBearerToken(headers) {
    const token = localStorage.getItem('jwt');
    if (!token) {
      return headers;
    }
    return { ...headers, Authorization: `Bearer ${token}` }
  }
}

export const MainAPI = new MainApi({
  baseUrl: 'http://localhost:3001',
  headers: {
    'Accept': 'application/json',
    'Content-type': 'application/json'
  }
});