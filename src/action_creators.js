import getUserId from './userId';

export function setState(state) {
  return {
    type: 'SET_STATE',
    state: state
  };
}

export function vote(entry) {
  return {
    meta: {remote: true},
    type: 'VOTE',
    vote: {voterId: getUserId(), entry: entry}
  };
}

export function next() {
  return {
    meta: {remote: true},
    type: 'NEXT'
  };
}

export function reset() {
  return {
    meta: {remote: true},
    type: 'RESET'
  };
}