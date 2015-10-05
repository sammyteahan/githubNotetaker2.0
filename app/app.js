var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');


/**
* @desc we want our router to handle which component
* to render. So, our `Root` component will be decided
* in ./configs/routes.js
*/
Router.run(routes, function (Root) {
  React.render(<Root />, document.getElementById('app'));
});