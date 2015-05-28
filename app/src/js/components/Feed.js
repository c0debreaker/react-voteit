var React = require('react');
var ShowAddButton = require('./ShowAddButton');
var FeedForm = require('./FeedForm');
var FeedList = require('./FeedList');
var _ = require('lodash');
var Firebase = require('firebase');

var Feed = React.createClass({

  loadData: function () {
    var ref = new Firebase('https://scorching-heat-1563.firebaseio.com/');
    ref.on('value', function(snap) {
      var items = [];

      snap.forEach(function(itemSnap) {
        var item = itemSnap.val();
        item.key = itemSnap.name();
        items.push(item);
      });

      this.setState({
        items: items
      });

    }.bind(this));
  },

  componentDidMount: function() {
    this.loadData();
  },

  getInitialState: function () {
    var FEED_ITEMS = [
      {
        id: 1,
        title: 'JavaScript is fun',
        description: 'Lexical scoping FTW',
        voteCount: 34
      }, {
        id: 2,
        title: 'Realtime data!',
        description: 'Firebase is cool',
        voteCount: 49
      }, {
        id: 3,
        title: 'Coffee makes you awake',
        description: 'Drink responsibly',
        voteCount: 15
      }
    ];
    return {
      items: FEED_ITEMS,
      formDisplayed: false
    }
  },

  onToggleForm: function () {
    this.setState({
      formDisplayed: !this.state.formDisplayed
    });
  },

  onNewItem: function (newItem) {
    var newItems = this.state.items.concat([newItem]);
    this.setState({
      items: newItems,
      formDisplayed: false,
      id: this.state.items.length
    });
  },

  onVote: function (newItem) {
    // copy the original array.
    var items = _.uniq(this.state.items);
    // Return the index of two matching objects.
    var index = _.findIndex(items, function (feedItem) {
      return feedItem.id === newItem.id;
    });
    // store the old object in a var.
    var oldObj = items[index];
    // pull the old object out of the copy array.
    var newItems = _.pull(items, oldObj);
    newItems.splice(index, 0, newItem);
    this.setState({
      items: newItems
    });
  },

  sortByVotes: function () {
    var feedItems = this.state.items;
    feedItems.sort(function(a, b) {
      if (a.voteCount < b.voteCount) {
        return 1;
      }
      if (a.voteCount > b.voteCount) {
        return -1;
      }
      return 0;
    });
  },

  render: function () {
    this.sortByVotes();

    return (
      <div>
        <div className="container">
          <ShowAddButton displayed={this.state.formDisplayed} onToggleForm={this.onToggleForm}/>
        </div>
        <FeedForm displayed={this.state.formDisplayed} onNewItem={this.onNewItem}/>
        <br />
        <br />
        <FeedList items={this.state.items} onVote={this.onVote}/>
      </div>
    );
  }

});

module.exports = Feed;
