// custom-webpack.config.js
//Este archivo expone AppComponent para que pueda ser consumido por la aplicación host.

const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "angularAppAlquiler",
      library: { type: "var", name: "angularAppAlquiler" },
      filename: "remoteEntry.js",
      exposes: {
        "./Component": "./src/app/app.component.ts",
      },
      shared: ["@angular/core", "@angular/common", "@angular/router"],
    }),
  ],
};
