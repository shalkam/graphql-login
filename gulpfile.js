var gulp = require('gulp');
var path = require('path');
var nodemon = require('nodemon');
var compiler = require('./webpack.js');
function onBuild(done) {
  return function(err, stats) {
    if (err) {
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    if (done) {
      done();
    }
  };
}

gulp.task('build', function(done) {
  compiler.run(onBuild(done));
});
gulp.task('watch', function(done) {
  var firedDone = false;
  compiler.watch(100, function(err, stats) {
    // if it's first time compiling
    if (!firedDone) {
      firedDone = true;
      done();
    }
    nodemon.restart();
  });
});
gulp.task('dev', [ 'watch' ], function() {
  nodemon({
    execMap: { js: 'node' },
    script: path.join(__dirname, 'dist/server'),
    ignore: [ '*' ],
    watch: [ 'foo/' ],
    ext: 'noop'
  }).on('restart', function() {
    console.log('Patched!');
  });
});
