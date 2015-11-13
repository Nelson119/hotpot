// generated on 2015-10-05 using generator-gulp-webapp 1.0.3
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';   
import connect from 'gulp-connect-php';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

var app = 'theme/app/';
var dist = 'wp-content/themes/vision-theme/'

gulp.task('styles', () => {
  return gulp.src( app + 'styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
const testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint( app + 'scripts/*.js'));
// gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['.tmp', app]});

  return gulp.src( app + '*.php')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    // .pipe($.if('*.php', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest(dist));
});

gulp.task('images', () => {
  return gulp.src( app + 'images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest( dist + 'images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat( app + 'fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest(dist + 'fonts'));
});



gulp.task('extras', () => {
  return gulp.src([
    app + '*.*',
    app + 'style.css',
    app + '**/*.php',
    app + '**/*.po',
    app + '**/*.mo'
  ], {
    dot: true
  }).pipe(gulp.dest(dist));
});

gulp.task('clean', del.bind(null, ['.tmp', dist]));

gulp.task('serve', ['styles', 'fonts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', app],
      routes: {
        '/theme/app/scripts/lib': app + '/scripts/lib'
      }
    }
  });

  gulp.watch([
    app + '*.php',
    app + '*.html',
    app + 'scripts/**/*.js',
    app + 'images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(app + 'styles/**/*.scss', ['styles']);
  gulp.watch(app + 'fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:php', function() {
  connect.server({
    base : '../../../'
  }, function (){
    browserSync({
      proxy: 'localhost:8000'
    });
  });
 
  gulp.watch('**/*.php').on('change', function () {
    browserSync.reload();
  });
});

// gulp.task('serve:dist', () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     server: {
//       baseDir: ['dist']
//     }
//   });
// });

// gulp.task('serve:test', () => {
//   browserSync({
//     notify: false,
//     port: 9000,
//     ui: false,
//     server: {
//       baseDir: 'test',
//       routes: {
//         '/bower_components': 'bower_components'
//       }
//     }
//   });

//   gulp.watch('test/spec/**/*.js').on('change', reload);
//   gulp.watch('test/spec/**/*.js', ['lint:test']);
// });

// inject bower components
gulp.task('wiredep', () => {
  gulp.src(app + 'styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest(app + 'styles'));

  gulp.src(app + '*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(app));

  gulp.src(app + '*.php')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(app));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['serve:php'], () => {
  // gulp.start('build');
});


var tinypng = $.tinypng;
 
gulp.task('tinypng', function () {
    gulp.src(app + 'images/**/*.png')
        .pipe(tinypng('RpQXcDk7_To0LtCie5S647UshZiHjFdF'))
        .pipe(gulp.dest( dist + 'img'));
});
