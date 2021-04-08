import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import { store } from '../../src/store';
import IndexPage from '../../src/pages/index';

describe('<App />', () => {
  it('renders "Coffee Shop" heading', () => {
    render(
      <Provider store={store}>
        <IndexPage />
      </Provider>,
    );

    expect(screen.getByText(/coffee shop/i)).toBeInTheDocument();
  });
});
