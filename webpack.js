var webpack = require('webpack');
var path = require('path');
var fs = require('fs');

var nodeModules = [ 'mongoose' ];
if (process.env.NODE_ENV !== 'production') {
  nodeModules = fs.readdirSync(path.join(__dirname, 'node_modules')).filter(function(x) {
    return [ '.bin' ].indexOf(x) === -1;
  });
}
var serverConfig = {
  context: __dirname + '/src',
  entry: [ './server/index.js' ],
  target: 'node',
  output: { path: __dirname + '/dist', filename: 'server.js' },
  node: { __dirname: false, __filename: false },
  externals: [
    function(context, request, callback) {
      var pathStart = request.split('/')[0];
      if (nodeModules.indexOf(pathStart) >= 0 && request != 'webpack/hot/signal.js') {
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.js$/,
        //Check for all js files
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [ [ 'es2015' ], 'stage-0' ],
              plugins: [ [ 'transform-runtime', { polyfill: true, regenerator: true } ] ]
            }
          }
        ]
      }
    ]
  }
};
if (process.env.NODE_ENV !== 'production') {
  //defaultConfig.devtool = '#eval-source-map';
  serverConfig.devtool = 'source-map';
  serverConfig.plugins.push(new webpack.BannerPlugin({
    banner: "require('source-map-support').install();",
    raw: true,
    entryOnly: false
  }));
}
module.exports = webpack(serverConfig);
