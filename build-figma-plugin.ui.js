// module.exports = function (buildOptions) {
//   return {
//     ...buildOptions,
//     define: {
//       global: 'window'
//     }
//   }
// }


module.exports = function (buildOptions) {
  return {
    ...buildOptions,
    plugins: buildOptions.plugins.filter(function (plugin) {
      return plugin.name !== 'preact-compat'
    })
  }
}