// next.config.js

module.exports = {
  // Your other Next.js configuration options

  // Exclude CSS modules for Bootstrap
  cssLoaderOptions: {
    modules: {
      localIdentName: '[local]__[hash:base64:5]',
    },
  },
};
