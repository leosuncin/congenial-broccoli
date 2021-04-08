import './Customers.css';

import { backlogSelector } from '../slices/backlogSlice';
import {
  customersSelector,
  markCustomerAsSelected,
} from '../slices/customersSlice';
import { useAppDispatch, useAppSelector } from '../store';

function Customers() {
  const customers = useAppSelector(customersSelector);
  const backlog = useAppSelector(backlogSelector);
  const dispatch = useAppDispatch();

  function markAsSelected(id: string) {
    dispatch(markCustomerAsSelected(id));
  }

  return (
    <ul className="p-0">
      {customers.map((customer) => (
        <li
          key={customer.id}
          className={'customer-card ' + (customer.selected ? 'selected' : '')}
          onClick={markAsSelected.bind(null, customer.id)}
        >
          <div className="order-count">
            Orders:{' '}
            {backlog.filter((order) => order.customer === customer.id).length}
          </div>
          {customer.name}
        </li>
      ))}
    </ul>
  );
}

export default Customers;
