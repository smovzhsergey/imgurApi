var React = require('react');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var Reflux = require('reflux');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
  mixins: [
    Reflux.listenTo(ImageStore, 'onChange')
  ],
  getInitialState: function() {
    return {
      images: []
    }
  },
  componentWillMount: function() {
    Actions.getImages(this.props.params.id);
  },
  componentWillReceiveProps: function(nextProps){
    Actions.getImages(nextProps.params.id);
  },

  render: function() {
      var topicHead = this.props.params.id.replace(/_/g, " ");
      return <div className="topic">
        <h2>Images categorized as {topicHead} </h2>
        {this.renderImages()}
      </div>
  },
  renderImages: function() {

     return this.state.images.slice(0, 50).map(function(image) {

      return(
          <ImagePreview key={image.id} {...image} />
      );
    });
  },
  onChange: function(event, images) {
    this.setState({images: images})
  }
});
