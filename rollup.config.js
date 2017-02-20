export default {
  entry: 'dist/ng2-file-input.js',
  dest: 'dist/bundles/ng2-file-input.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng2-file-input',
  globals: {
    '@angular/core': 'ng.core',
    'rxjs': 'Rx',
  }
}
