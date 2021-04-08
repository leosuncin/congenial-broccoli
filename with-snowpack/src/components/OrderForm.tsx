import * as React from 'react';

import { addOrder, CreateOrder } from '../slices/ordersSlice';
import { useAppDispatch } from '../store';

const defaultValues: CreateOrder = {
  order: '',
  amount: 1,
};

function OrderForm() {
  const dispatch = useAppDispatch();
  const [order, setOrder] = React.useState(defaultValues.order);
  const [amount, setAmount] = React.useState(defaultValues.amount);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.name === 'amount') {
      setAmount(Number(event.target.value));
    }
    if (event.target.name === 'order') {
      setOrder(event.target.value);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(addOrder({ order, amount }));
    setOrder(defaultValues.order);
    setAmount(defaultValues.amount);
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
          value={order}
          onChange={handleChange}
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
          value={amount}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn btn-success btn-block">
        Add
      </button>
    </form>
  );
}

export default OrderForm;
