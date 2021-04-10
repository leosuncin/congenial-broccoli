import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';

import { store } from '../../src/store';
import IndexPage from '../../src/pages/index';

describe('<IndexPage />', () => {
  it('renders "Coffee Shop" heading', () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    expect(screen.getByText(/coffee shop/i)).toBeInTheDocument();
  });

  it('submit the order, then serve it', () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    user.type(screen.getByLabelText(/order/i), 'Cappuccino');
    user.type(screen.getByLabelText(/amount/i), '6');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/cappuccino/i)).toBeInTheDocument();

    user.type(screen.getByLabelText(/order/i), 'Espresso');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/espresso/i)).toBeInTheDocument();
    expect(screen.getByTestId('orders').children).toHaveLength(2);

    user.click(
      screen.getByText(/delete/i, { selector: 'li:last-of-type button' }),
    );

    expect(screen.getByTestId('orders').children).toHaveLength(1);

    user.click(screen.getByText('John'));
    user.click(screen.getByRole('button', { name: /submit order/i }));

    expect(
      screen.getByRole('row', { name: /6\s+cappuccino/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/customer: john/i)).toBeInTheDocument();

    user.type(screen.getByLabelText(/order/i), 'Cold Brew Coffee');
    user.type(screen.getByLabelText(/amount/i), '4');
    user.click(screen.getByRole('button', { name: /add/i }));

    expect(screen.getByText(/cold brew coffee/i)).toBeInTheDocument();

    user.click(screen.getByText('Mark'));
    user.click(screen.getByRole('button', { name: /submit order/i }));

    expect(
      screen.getByRole('row', { name: /4\s+cold brew coffee/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/customer: mark/i)).toBeInTheDocument();

    user.type(screen.getByRole('searchbox', { name: /search/i }), 'cold brew');
    user.click(screen.getByRole('button', { name: /^search$/i }));

    expect(screen.getByTestId('backlog').children).toHaveLength(1);
    expect(screen.queryByText(/customer: john/i)).not.toBeInTheDocument();

    user.click(screen.getByRole('button', { name: /done/i }));

    expect(screen.getByTestId('backlog')).toBeEmptyDOMElement();

    user.click(screen.getByRole('button', { name: /clear search term/i }));

    expect(screen.getByTestId('backlog').children).toHaveLength(1);
    expect(screen.queryByText(/customer: mark/i)).not.toBeInTheDocument();

    user.click(screen.getByRole('button', { name: /done/i }));

    expect(screen.getByTestId('backlog')).toBeEmptyDOMElement();
  });
});
