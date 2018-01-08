import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';



export default {
    // moduleName: 'validator',
    input: 'src/ValidatorEntryPoint.js',
    output: {
        file: 'dist/vue-dullahan-validation.js',
        format: 'umd',
        name: 'VueDullahan',
        exports: 'named'
    },
    sourcemap: true,
    plugins: [
        commonjs({
            // polyfill async/await
            'node_modules/babel-runtime/helpers/asyncToGenerator.js': ['default']
        }),
        resolve(),
        babel({
            runtimeHelpers: true,
            exclude: 'node_modules/**', // only transpile our source code
        }),
        uglify()

    ]
};
