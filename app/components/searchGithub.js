import React from 'react';


class SearchGithub extends React.Component{
  handleSubmit(){
    var router = this.context.router;
    var username = this.refs.username.getDOMNode().value;
    this.refs.username.getDOMNode().value = '';
    router.transitionTo('profile', {username: username});
  }
  render(){
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref="username" />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github </button>
          </div>
        </form>
      </div>
    )
  }
};

/**
* We need router methods on component context
* because we're using es6 classes
*/
SearchGithub.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default SearchGithub;