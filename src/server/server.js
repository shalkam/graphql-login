import bodyParser from 'body-parser';
import config from '../config.js';
import events from 'events';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import mongoose from 'mongoose';
import passport from '../data/user/passport/index.js';
import session from 'express-session';
import schema from '../data/schema.js';
const app = express();
const mongoStore = require('connect-mongo')(session);
class Loader extends events.EventEmitter {
  constructor() {
    super();
  }
  init() {
    const self = this;
    mongoose.connect(config.DB_URL + '/' + config.DB_NAME);
    mongoose.Promise = Promise;
    app.use(bodyParser.json());
    app.use(
      session({
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true,
        store: new mongoStore({ mongooseConnection: mongoose.connection })
      })
    );
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(
      '/' + config.GQL_URL_DIR,
      graphqlExpress((req, res) => {
        console.log('user: ', req.sessionID);
        return { schema, context: { req } };
      })
    );
    app.use('/graphiql', graphiqlExpress({ endpointURL: '/' + config.GQL_URL_DIR }));
    app.listen(config.APP_PORT, () => {
      self.emit('server.loaded');
      console.log(`server listening at port ${config.APP_PORT}`);
    });
  }
}

export default new Loader();
