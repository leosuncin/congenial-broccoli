import { render, screen } from '@testing-library/react';
import user, { specialChars } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import { addOrder } from '../slices/ordersSlice';
import OrderForm from './OrderForm';

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

    expect(store.getActions()).toEqual([
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

    expect(store.getActions()).toEqual([]);
  });
});
