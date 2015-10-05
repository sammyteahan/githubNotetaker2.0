var React = require('react');


var UserProfile = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired    
  },
  render: function() {
    return (
      <div>
        <h2>USER PROFILE</h2>
        <h6>Username: {this.props.username}</h6>
        <h6>Bio: {this.props.bio}</h6>
      </div>
    )
  }
});

module.exports = UserProfile;