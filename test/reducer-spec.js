import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({'Trainspotting': 1})
        })
      })
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Trainspotting', '28 Days Later'],
          tally: {'Trainspotting': 1}
        }
      }
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({'Trainspotting': 1})
        })
      })
    };
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally : {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', vote: {voterId: 'voter1', entry: 'Trainspotting'}};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally : {Trainspotting: 1}
      }
    });
    const action = {type: 'VOTE', vote: {voterId: 'voter1', entry: 'Sunshine'}};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally : {Trainspotting: 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if vote id changes', () => {
    const state = fromJS({
      vote: {
        id: 1,
        pair: ['Trainspotting', '28 Days Later'],
        tally: {Trainspotting: 1}
      },
      hasVoted: 'Trainspotting'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          id: 2,
          pair: ['Trainspotting', 'Slumdog Millionaire']
        }
      }
    };
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        id: 2,
        pair: ['Trainspotting', 'Slumdog Millionaire']
      }
    }));
  });
});