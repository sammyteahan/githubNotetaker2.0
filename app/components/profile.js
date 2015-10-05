var React = require('react');
var Router = require('react-router');
var Repos = require('./github/repos');
var UserProfile = require('./github/userprofile');
var Notes = require('./notes/notes');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');



var Profile = React.createClass({

  
  /**
  * mixins take our components state, and adds
  * some properties to it. Router.State allows
  * us to query the url parameters
  */
  mixins: [Router.State, ReactFireMixin],

  /**
  * setup initial state
  */
  getInitialState: function() {
    return {
      notes: [],
      bio: {name: 'Sam'},
      repos: [1, 2, 3]
    }
  },

  /**
  * AJAX goes here. Called right after component mounts
  * to the view.
  */
  componentDidMount: function(){
    this.ref = new Firebase('https://notesv2.firebaseio.com');
    var childRef = this.ref.child(this.getParams().username);
    this.bindAsArray(childRef, 'notes'); // bind childRef to this.state.notes
  },

  /**
  * Get rid of listeners when component moves on
  */
  componentWillUnmount: function() {
    this.unbind('notes');
  },
  
  /**
  * .set is a firebase thing
  */
  handleAddNote: function(newNote){
    this.ref.child(this.getParams().username).set(this.state.notes.concat([newNote]));
  },
  render: function() {
    var username = this.getParams().username;
    return (
      <div className="row">
        <div className= "col-md-4">
          <UserProfile username={username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes 
            addNote={this.handleAddNote}
            username={username} 
            notes={this.state.notes} />
        </div>
      </div>
    )
  }
});

module.exports = Profile;