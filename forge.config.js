module.exports = {
  packagerConfig: {
    extraResource: ['dist', 'audio'],
  },
  makers: [
    {
      name: '@electron-forge/maker-dmg',
    },
  ],
}
