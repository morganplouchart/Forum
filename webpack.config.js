const path = require('path');

module.exports = {
    entry: './src/api.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    "module": {
        rules: [
            {
                test: /\.twig$/,
                use: 'twigjs-loader',
            },
        ],
    },
    resolve: {
        fallback:{ "path": require.resolve("path-browserify") },
        alias: {
            "@app": path.resolve(__dirname, 'src/'),
        },

    }
};