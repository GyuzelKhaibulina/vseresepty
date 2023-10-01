module.exports = {
    entry : {
        main: './index.js'
    },
    output: {
        path: '/dev-build',
        publicPath: '/',
        filename: 'server.js',
        clean: true
    },
    mode: 'development',
    target: 'node',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
  };