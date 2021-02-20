class UserService {
  constructor() {
    this.getGithubAPI = 'https://api.github.com/';
  }

  async fetchUsers({ since = 0, perPage } = {}) {
    const { data } = await fetch(`${this.getGithubAPI}/users`, {
      method: 'GET',
      params: {
        per_page: perPage,
        since,
      },
    });

    if (!data) {
      throw new Error('Response data is unavailable');
    }

    return data;
  }

  async fetchUser(username) {
    const { data } = await fetch(`${this.getGithubAPI}/users/${username}`, {
      method: 'GET',
    });

    if (!data) {
      throw new Error('Response data is unavailable');
    }

    return data;
  }
}

export default new UserService()
