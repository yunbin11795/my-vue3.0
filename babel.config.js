module.exports = {
  "presets": [
    "@vue/cli-plugin-babel/preset"
  ],
  "plugins": [
    [
      "import",
      {
        "libraryName": "element-plus"
      }
    ],
    [
      "component",
      {
        "libraryName": "element-plus",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "lodash"
    ],
  ]
}
