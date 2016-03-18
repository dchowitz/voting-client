import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './winner';
import Vote from './vote';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    winner: React.PropTypes.string
  },
  render: function () {
    return (
      <div>{
        this.props.winner
          ? <Winner ref="winner" winner={this.props.winner} />
          : <Vote {...this.props} />
      }</div>
    );
  }
});

function mapStateToProps(state) {
  return {
    pair: state.getIn(['vote', 'pair']),
    hasVoted: state.get('hasVoted'),
    winner: state.get('winner')
  };
}

export const VotingContainer = connect(
  mapStateToProps,
  actionCreators
)(Voting);
