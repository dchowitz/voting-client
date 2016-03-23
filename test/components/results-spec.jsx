import React from 'react';
import ReactDom from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/results';
import {expect} from 'chai';

describe('Results', () => {

  it('renders entries with vote count or zero', () => {
    const pair = List.of('Trainspotting', '28 Days Later');
    const tally = Map({'Trainspotting': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );

    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [train, days] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(train).to.contain('Trainspotting');
    expect(train).to.contain('5');
    expect(days).to.contain('28 Days Later');
    expect(days).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
        tally={Map()}
        next={next} />
    );
    Simulate.click(ReactDom.findDOMNode(component.refs.next));
    expect(nextInvoked).to.equal(true);
  });

  it('invokes the reset callback when reset button is clicked', () => {
    let resetInvoked = false;
    const reset = () => resetInvoked = true;
    const pair = List.of('Trainspotting', '28 Days Later');
    const component = renderIntoDocument(
      <Results pair={pair}
        tally={Map()}
        next={()=>{}}
        reset={reset} />
    );
    Simulate.click(ReactDom.findDOMNode(component.refs.reset));
    expect(resetInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Trainspotting" pair={List.of('Trainspotting', '28 Days Later')} tally={Map()} />
    );
    const winner = ReactDom.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Trainspotting');
  });
});