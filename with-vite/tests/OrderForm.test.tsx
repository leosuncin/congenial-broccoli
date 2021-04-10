/// <reference types="mocha" />
import { render, screen } from '@testing-library/react';
import user, { specialChars } from '@testing-library/user-event';
import { expect } from 'chai';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { addOrder } from '../src/slices/ordersSlice';
import OrderForm from '../src/components/OrderForm';

describe('<OrderForm />', () => {
  const mockStore = configureStore([]);

  it(`dispatch "${addOrder}" action when form is valid`, () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>,
    );

    user.type(screen.getByLabelText(/order/i), 'Espresso americano');
    user.type(screen.getByLabelText(/amount/i), `${specialChars.backspace}6`);
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(store.getActions()).to.deep.equal([
      addOrder({ order: 'Espresso americano', amount: 6 }),
    ]);
  });

  it(`doesn't dispatch any action when form is invalid`, () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <OrderForm />
      </Provider>,
    );

    user.click(screen.getByRole('button', { name: /add/i }));

    expect(store.getActions()).to.deep.equal([]);
  });
});
