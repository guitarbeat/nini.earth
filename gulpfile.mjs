// Importing required modules using ESM syntax
import gulp from 'gulp';
import * as sassModule from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(sassModule);
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
// import imagemin from 'gulp-imagemin';
import browserSyncModule from 'browser-sync';
const browserSync = browserSyncModule.create();

// File paths
const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css'
  },
  scripts: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  images: {
    src: 'src/img/**/*',
    dest: 'dist/img'
  },
  html: {
    src: 'src/**/*.html',
    dest: 'dist/'
  },
  favicons: {
    src: [
      'src/*.ico',
      'src/*.webmanifest',
      'src/*.xml',
      'src/apple-touch-icon.png',
      'src/favicon-16x16.png', // Explicitly including favicon sizes
      'src/favicon-32x32.png'
    ],
    dest: 'dist/'
  },
  static: {
    bootstrap: 'src/bootstrap/**/*',
    humans: 'src/humans.txt',
    fonts: 'src/fonts/**/*',
    sound: 'src/sound/**/*',
    video: 'src/video/**/*'
  }
};

// SCSS task
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({
      basename: 'main',
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JavaScript task
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(uglify())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Image optimization task
function images() {
  return gulp.src(paths.images.src)
    // .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// HTML task
function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream());
}

// Favicons and related assets task
function favicons() {
  return gulp.src(paths.favicons.src)
    .pipe(gulp.dest(paths.favicons.dest));
}

// Static files task
function staticFiles() {
  // Bootstrap
  gulp.src(paths.static.bootstrap)
    .pipe(gulp.dest('dist/bootstrap'));
  // Humans.txt
  gulp.src(paths.static.humans)
    .pipe(gulp.dest('dist'));
  // Fonts
  gulp.src(paths.static.fonts)
    .pipe(gulp.dest('dist/fonts'));
  // Sound
  gulp.src(paths.static.sound)
    .pipe(gulp.dest('dist/sound'));
  // Video
  return gulp.src(paths.static.video)
    .pipe(gulp.dest('dist/video'));
}

// Watch task
function watch() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.html.src, html).on('change', browserSync.reload);
  gulp.watch(paths.favicons.src, favicons).on('change', browserSync.reload);
}

// Adjust the default task to include the new tasks
const build = gulp.series(gulp.parallel(styles, scripts, images, html, favicons, staticFiles), watch);
export default build;
