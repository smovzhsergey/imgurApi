var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

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
    return <div>
        <h2>Categories</h2>
        {this.renderTopics()}
    </div>
  },
  renderTopics: function() {
    return this.state.topics.slice(0, 50).map(function(topic){
        if(topic.name.indexOf(' ') != -1)
          topic.url = topic.name.replace(/\s/g, "_");
        else
          topic.url = topic.name;
        return <Link to={"topics/" + topic.url} className="categories" key={topic.id}>
            <h3>{topic.name}</h3>
            <p>{topic.description}</p>
          </Link>
    });
  },
  onChange: function(event, topics) {
    this.setState({topics: topics});
  }
});
