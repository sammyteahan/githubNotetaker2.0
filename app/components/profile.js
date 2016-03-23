import React from 'react';
import Repos from './github/repos';
import UserProfile from './github/userprofile';
import Notes from './notes/notes';
import helpers from '../utils/helpers';
import Rebase from 're-base';

var base = Rebase.createClass('https://notesv2.firebaseio.com');


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    };
  }

  init() {
    this.ref = base.bindToState(this.router.getCurrentParams().username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    /**
    * Call helper and bind to `this` in the above context,
    * not in context of the promise itself
    */
    helpers.getGithubInfo(this.router.getCurrentParams().username)
      .then((data) => {
        this.setState({
          bio: data.bio,
          repos: data.repos
        });
      });
  }

  componentWillMount() {
    this.router = this.context.router;
  }

  /**
  * AJAX goes here. Called right after component mounts
  * to the view.
  */
  componentDidMount(){
    this.init();
  }

  /**
  * Get rid of firebase listeners when component moves on
  */
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  /**
  * If our route changes (e.g. we get a new username in url),
  * we need to setup new data in component
  */
  componentWillReceiveProps() {
    base.removeBinding(this.ref);
    this.init();
  }
  
  handleAddNote(newNote) {
    base.post(this.router.getCurrentParams().username, {
      data: this.state.notes.concat([newNote])
    });
  }
  
  render() {
    var username = this.router.getCurrentParams().username;
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
            addNote={this.handleAddNote.bind(this)}
            username={username} 
            notes={this.state.notes} />
        </div>
      </div>
    )
  }
};


Profile.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Profile;