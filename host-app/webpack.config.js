// host-app/webpack.config.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  // ... (otros campos como entry, output, etc.)
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new ModuleFederationPlugin({
      name: "host",
      remotes: {
        angularAppAlquiler: "angularApp@http://localhost:3001/remoteEntry.js",
        angularAppVentas: "angularApp@http://localhost:3002/remoteEntry.js",
        sharedCss: "sharedCss@http://localhost:3003/remoteEntry.js",
      },
    }),
  ],
};
