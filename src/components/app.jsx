import React from 'react';

export default React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  render: function () {
    return this.props.children;
  }
});