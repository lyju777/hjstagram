// proxy는 로컬 개발환경에서만 적용 가능 빌드시에는 x

const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
       '/api', 
       createProxyMiddleware({
           target: 'http://localhost:4000', 
           changeOrigin: true,
       })
    );
};

// target: 'http://localhost:4000',