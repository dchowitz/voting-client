import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './winner';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    pair: React.PropTypes.object,
    tally: React.PropTypes.object,
    next: React.PropTypes.func,
    reset: React.PropTypes.func,
    winner: React.PropTypes.string
  },
  getPair: function () {
    return this.props.pair || [];
  },
  getVotes: function (entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  render: function () {
    return this.props.winner
      ? <Winner ref="winner" winner={this.props.winner} />
      : (<div className="results">
          <div className="tally">
            {this.getPair().map(entry =>
              <div key={entry} className="entry">
                <h1>{entry}</h1>
                <div className="voteCount">
                  {this.getVotes(entry)}
                </div>
              </div>
            )}
          </div>
          <div className="management">
            <button ref="next" className="next" onClick={this.props.next}>Next</button>
            <br/>
            <button ref="reset" className="reset" onClick={this.props.reset}>Reset</button>
          </div>
        </div>);
  }
});

function mapStateToProps(state) {
  return {
    winner: state.get('winner'),
    pair: state.getIn(['vote', 'pair']),
    tally: state.getIn(['vote', 'tally'])
  };
}

export const ResultsContainer = connect(mapStateToProps, actionCreators)(Results);