 
const ejs = require('ejs');
const appHelper = require('../helpers/appHelper');

module.exports = apiRoutes => {
  apiRoutes.get(
    '/',
    function(req, res) {
      ejs.renderFile('app/index.html', appHelper.home, {}, function(err, str){
        res.send(err || str);
      });
    }
  );
};