const config = require('../src/config');
const tester = require('graphql-tester').tester;

describe('A user', function() {
  const self = this;
  beforeAll(() => {
    self.test = tester({
      url: `http://127.0.0.1:${config.APP_PORT}/${config.GQL_URL_DIR}`,
      contentType: 'application/json'
    });
  });
  it('should register a new user', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    username
    message
    id
  }
}`,
          variables: {
            username: 'test',
            password: 'test'
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        self.tempID = res.data.register.id;
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should not register with existing user data', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation register($username: String!, $password: String!) {
  register(username: $username, password: $password) {
    username
    message
    id
  }
}`,
          variables: {
            username: 'test',
            password: 'test'
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(false);
        expect(res.errors[0].message).toBe('A user with the given username is already registered');
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should not login with wrong credentials', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation login($username:String!, $password: String!) {
  login(username:$username, password: $password) {
    username
    message
  }
}`,
          variables: {
            username: 'test',
            password: 'wrongpass'
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(false);
        expect(res.errors[0].message).toBe('Password or username are incorrect');
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should login with correct credentials', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation login($username:String!, $password: String!) {
  login(username:$username, password: $password) {
    username
    message
  }
}`,
          variables: {
            username: 'test',
            password: 'test'
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should not login twice', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation login($username:String!, $password: String!) {
  login(username:$username, password: $password) {
    username
    message
  }
}`,
          variables: {
            username: 'test',
            password: 'test'
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(false);
        expect(res.errors[0].message).toBe('Already logged in');
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should logout after logging in', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation logout {
  logout {
    result
  }
}`
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should not logout if not logged in', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation logout {
  logout {
    result
  }
}`
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(false);
        expect(res.errors[0].message).toBe("Not logged in, can't log out");
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
  it('should be removed by ID', done => {
    self
      .test(
        JSON.stringify({
          query: `mutation remove($id: ID!) {
  remove(id:$id) {
    username
  }
}`,
          variables: {
            id: self.tempID
          }
        }),
        { jar: true } // using my fork shalkam/graphql-tester to be able to add this option to the node request
      )
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.success).toBe(true);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
