import React from 'react';
import Router from 'react-router';
import routes from './config/routes';


/**
* @desc we want our router to handle which component
* to render. So, our `Root` component will be decided
* in ./configs/routes.js
*
* state spread will take stuff (props) from the router
* and make it accessible to props of our root component.
*/
Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('app'));
});