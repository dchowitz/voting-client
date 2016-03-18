import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    winner: React.PropTypes.string
  },
  render: function () {
    return <div className="winner">Winner is {this.props.winner}!</div>;
  }
});