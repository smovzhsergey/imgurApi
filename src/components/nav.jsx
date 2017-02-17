var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Actions = require('../actions');
var TopicStore = require('../stores/topic-store');
var Reflux = require('reflux');

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
            <nav>
                <ul className="nav navbar-nav navbar-right">
                     {this.renderTopics()}
                 </ul>

            </nav>);
    },
    renderTopics: function() {
        return this.state.topics.map(function(topic){

            if(topic.name.indexOf(' ') != -1)
                topic.url = topic.name.replace(/\s/g, "_");
            else
                topic.url = topic.name;

            return <li key={topic.id}>
                <Link activeClassName="active" to={"topics/" + topic.url}>
                    {topic.name}
                </Link>
            </li>
        });
    },
    onChange: function(event, topics) {
        this.setState({
            topics: topics
        });
    }
});