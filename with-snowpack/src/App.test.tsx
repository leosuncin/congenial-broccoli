import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { expect } from 'chai';
import * as React from 'react';
import { Provider } from 'react-redux';

import App from './App';
import { store } from './store';

describe('<App />', () => {
  it('renders "Coffee Shop" heading', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    const headingElement = screen.getByText(/coffee shop/i);
    expect(document.body.contains(headingElement));
  });

  it('submit the order, then serve it', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
    );

    user.type(screen.getByLabelText(/order/i), 'Cappuccino');
    user.type(screen.getByLabelText(/amount/i), '6');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/cappuccino/i)).to.be.ok;

    user.type(screen.getByLabelText(/order/i), 'Espresso');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/espresso/i)).to.be.ok;
    expect(screen.getByTestId('orders').children).to.have.lengthOf(2);

    user.click(
      screen.getByText(/delete/i, { selector: 'li:last-of-type button' }),
    );

    expect(screen.getByTestId('orders').children).to.have.lengthOf(1);

    user.click(screen.getByText('John'));
    user.click(screen.getByRole('button', { name: /submit order/i }));

    expect(screen.getByRole('row', { name: /6\s+cappuccino/i })).to.be.ok;
    expect(screen.getByText(/customer: john/i)).to.be.ok;

    user.type(screen.getByLabelText(/order/i), 'Cold Brew Coffee');
    user.type(screen.getByLabelText(/amount/i), '4');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/cold brew coffee/i)).to.be.ok;

    user.click(screen.getByText('Mark'));
    user.click(screen.getByRole('button', { name: /submit order/i }));

    expect(screen.getByRole('row', { name: /4\s+cold brew coffee/i })).to.be.ok;
    expect(screen.getByText(/customer: mark/i)).to.be.ok;

    user.type(screen.getByRole('searchbox', { name: /search/i }), 'cold brew');
    user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(screen.getByTestId('backlog').children).to.have.lengthOf(1);
    expect(screen.queryByText(/customer: john/i)).not.to.be.ok;

    user.click(screen.getByRole('button', { name: /done/i }));

    expect(screen.getByTestId('backlog').children).to.have.lengthOf(0);

    user.click(screen.getByRole('button', { name: /clear search term/i }));

    expect(screen.getByTestId('backlog').children).to.have.lengthOf(1);
    expect(screen.queryByText(/customer: mark/i)).not.to.be.ok;

    user.click(screen.getByRole('button', { name: /done/i }));

    expect(screen.getByTestId('backlog').children).to.have.lengthOf(0);
  });
});
