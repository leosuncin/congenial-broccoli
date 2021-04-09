import * as React from 'react';

import { addOrder } from '../slices/ordersSlice';
import { useAppDispatch } from '../store';

function OrderForm() {
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    const form = event.target as HTMLFormElement;
    event.preventDefault();

    if (form.checkValidity()) {
      const $order = form.elements.namedItem('order') as HTMLInputElement;
      const $amount = form.elements.namedItem('amount') as HTMLInputElement;

      dispatch(addOrder({ order: $order.value, amount: +$amount.value }));
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="order-input">Order:</label>
        <input
          id="order-input"
          className="form-control"
          name="order"
          type="text"
          placeholder="Order"
          required
          defaultValue=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="amount-input">Amount:</label>
        <input
          id="amount-input"
          className="form-control"
          name="amount"
          type="number"
          pattern="[0-9]+"
          inputMode="numeric"
          step="1"
          min="1"
          defaultValue={1}
        />
      </div>
      <button type="submit" className="btn btn-success btn-block">
        Add
      </button>
    </form>
  );
}

export default OrderForm;
