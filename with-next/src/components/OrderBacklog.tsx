import { markOrderAsDone } from '../slices/backlogSlice';
import { customersSelector } from '../slices/customersSlice';
import { searchResultsSelector } from '../slices/searchSlice';
import { useAppDispatch, useAppSelector } from '../store';
import styles from './OrderBacklog.module.css';

function OrderBacklog() {
  const customers = useAppSelector(customersSelector);
  const searchResults = useAppSelector(searchResultsSelector);
  const dispatch = useAppDispatch();

  function markAsDone(id: string) {
    dispatch(markOrderAsDone(id));
  }

  return (
    <div data-testid="backlog">
      {searchResults.map((order) => (
        <div key={order.id} className={styles.orderCard}>
          <div className="clearfix">
            <strong className="float-left py-2 mb-0">Items list:</strong>
            <button
              className="btn btn-sm mt-1 btn-success float-right"
              onClick={markAsDone.bind(null, order.id)}
            >
              DONE
            </button>
          </div>
          <table>
            <tbody>
              {order.list.map((item) => (
                <tr key={item.id}>
                  <td>{item.amount}</td>
                  <td>{item.order}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <div>
            customer: {customers.find((c) => c.id === order.customer)?.name}
          </div>
          <div>time: {order.time}</div>
          <div className={styles.orderId}>{order.id.substr(0, 4)}</div>
        </div>
      ))}
    </div>
  );
}

export default OrderBacklog;
