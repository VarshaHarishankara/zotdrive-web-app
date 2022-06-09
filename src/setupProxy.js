const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cors-everywhere.herokuapp.com/http://ec2-3-238-79-254.compute-1.amazonaws.com:8083',
      changeOrigin: true,
    })
  );
  app.use(
    '/file-chunk',
    createProxyMiddleware({
      target: 'https://cors-everywhere.herokuapp.com/http://ec2-3-238-79-254.compute-1.amazonaws.com:8082',
      changeOrigin: true,
    })
  );
  app.use(
    '/protected/api',
    createProxyMiddleware({
      target: 'https://cors-everywhere.herokuapp.com/http://ec2-3-238-79-254.compute-1.amazonaws.com:8080',
      changeOrigin: true,
    })
  );
};
