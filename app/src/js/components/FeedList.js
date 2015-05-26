var React    = require('react'),
    FeedItem = require('./FeedItem');

var FeedList = React.createClass({

  render: function() {
    var feedItems = this.props.items;
    var feedItems = this.props.items.map(function(item) {
      return <FeedItem id={item.id}
                       key={item.id}
                       title={item.title}
                       desc={item.description}
                       voteCount={item.voteCount}
                       onVote={this.props.onVote} />
    }.bind(this));
    return (
      <div className="container">
        <ul className="list-group">
          {feedItems}
        </ul>
      </div>
    );
  }

});

module.exports = FeedList;
