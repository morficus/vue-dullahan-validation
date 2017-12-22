const fs =          require('fs'),
    rollup =        require('rollup'),
    babel =         require('rollup-plugin-babel'),
    package =       require('../package.json'),
    uglify =        require('rollup-plugin-uglify'),
    minify =        require('uglify-js').minify;



rollup.rollup({
    entry: './src/ValidatorEntryPoint.js',
    plugins: [
        babel({
            babelrc: false,
            presets: ['es2015-loose-rollup'],
            plugins: ['external-helpers'],
            exclude: 'node_modules/**',
            comments: false
        })
    ]
})
.then(function (bundle) {
    return write('dist/vue-validator.js', bundle.generate({
        format: 'es',
        moduleName: 'vue-validator',
        export: 'default'

    }).code, bundle);
})
.catch(function (error) {
    throw error;
});

function write(dest, code, bundle) {
    console.log(code);
    return new Promise(function (resolve, reject) {
        fs.writeFile(dest, code, function (err) {
            if (err) return reject(err);
            console.log(blue(dest) + ' ' + getSize(code));
            resolve(bundle);
        });
    });
}

function getSize(code) {
    return (code.length / 1024).toFixed(2) + 'kb';
}

function blue(str) {
    return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}
