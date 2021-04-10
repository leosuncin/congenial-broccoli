import './OrdersList.css';

import * as React from 'react';

import { submitOrder } from '../slices/backlogSlice';
import {
  customersSelector,
  selectedCustomerSelector,
} from '../slices/customersSlice';
import { deleteOrder, ordersSelector } from '../slices/ordersSlice';
import { resetAfterSubmit } from '../slices/resetAfterSubmitAction';
import { useAppDispatch, useAppSelector } from '../store';

function OrdersList() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(ordersSelector);
  const customers = useAppSelector(customersSelector);
  const selectedCustomer = useAppSelector(selectedCustomerSelector);

  function handleDeleteOrder(id: string) {
    dispatch(deleteOrder(id));
  }

  function pushItemsAsOrder() {
    dispatch(
      submitOrder({
        customer: customers.find((c) => c.selected)!.id!,
        time: new Date().toLocaleTimeString(),
        list: orders,
      }),
    );
    dispatch(resetAfterSubmit());
  }

  return (
    <>
      <ul className="pt-3 list-unstyled" data-testid="orders">
        {orders.map((order) => (
          <li key={order.id} className="d-flex flex-row px-3 py-1 order-row">
            <div className="flex-fill w-100 p-2">{order.order}</div>
            <div className="flex-fill flex-shrink-1 py-2 px-4">
              {order.amount}
            </div>
            <div className="flex-fill flex-shrink-1 p-1">
              <button
                className="btn btn-danger"
                onClick={handleDeleteOrder.bind(null, order.id)}
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={
          'btn btn-block btn-primary mt-3 ' +
          (orders.length > 0 ? '' : 'd-none')
        }
        disabled={!selectedCustomer}
        onClick={pushItemsAsOrder}
      >
        Submit Order
      </button>
    </>
  );
}

export default OrdersList;
