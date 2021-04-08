import { render, screen } from '@testing-library/react';
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
});
