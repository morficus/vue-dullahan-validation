import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';


export default {
    // moduleName: 'validator',
    input: 'src/ValidatorEntryPoint.js',
    output: {
        file: 'dist/bundle.js',
        format: 'umd',
        name: 'VueDullahan',
        exports: 'named'
    },
    sourcemap: true,
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**' // only transpile our source code
        }),
        uglify()

    ]
};
