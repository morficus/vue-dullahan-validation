import vue from 'rollup-plugin-vue';



export default {
    input: 'documentation/demo/main.js',
    output: {
        file: 'documentation/demo.js',
        format: 'umd',
        name: 'demo',
    },

    sourcemap: false,
    plugins: [
        vue({ /* configuration options. */ }),

    ]
};
