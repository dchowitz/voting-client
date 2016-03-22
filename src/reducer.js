import {Map} from 'immutable';

function setState(state, newState) {
  const currentVoteId = state.getIn(['vote', 'id']);
  const newVoteId = newState && newState.vote && newState.vote.id;
  const resultState = state.merge(newState);
  if (currentVoteId !== newVoteId) {
    return resultState.remove('hasVoted');
  }
  return resultState;
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  }
  return state;
}

export default function (state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return setState(state, action.state);
  case 'VOTE':
    return vote(state, action.vote.entry);
  }
  return state;
}