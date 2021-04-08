import { render, screen } from '@testing-library/react';
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

    expect(screen.getByText(/coffee shop/i)).toBeInTheDocument();
  });
});
