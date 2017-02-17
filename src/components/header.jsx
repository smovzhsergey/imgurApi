var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');
var Nav = require('./nav');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(TopicStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      topics: []
    }
  },
  componentWillMount: function() {
    Actions.getTopics();
  },
  render: function() {
    return(
      <header>
        <div className="container-fluid">
          <Link to="/" className="logo">
            <img
                style = {{width: "100px", height: "100px"}}
                src ={'https://pbs.twimg.com/profile_images/690191042784706560/ICsyXEMm.png'} alt = 'imgur API example'
            />
            imgur api
          </Link>

          <Nav />
      </div>
    </header>);
  },

  onChange: function(event, topics) {
    this.setState({
      topics: topics
    });
  }
});
