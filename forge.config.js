module.exports = {
  packagerConfig: {
    extraResource: 'dist',
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
    },
  ],
}
