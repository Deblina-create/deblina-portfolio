const path = require("path");


module.exports = [{
    context: __dirname,
    entry: "./src/styles/main.scss",
    output:{
       //path: path.resolve(__dirname, "dist"),
       filename: "style-bundle.js"
    },
    module:{
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                          name: 'bundle.css',
                        },
                    },
                    { loader: 'extract-loader' },
                    { loader: 'css-loader' },
                    {
                      loader: 'postcss-loader'
                    },
                    {
                      loader: 'sass-loader',
                      options: {
                        
                        implementation: require('dart-sass'),
                        sassOptions: {
                            includePaths: ['./node_modules'],
                            fiber: require("fibers"),
                        }
                      }
                    },
                ]
              }
        ]
    }
},
{
  context: __dirname,
  entry: "./app.js",
  output:{
     path: path.resolve(__dirname, "dist"),
     filename: "main.js"
  },
  
  module:{
      rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
      ]
  },
  devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
  }
}
];