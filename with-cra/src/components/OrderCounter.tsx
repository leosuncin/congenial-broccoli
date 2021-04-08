import { countOrdersSelector } from '../slices/backlogSlice';
import { useAppSelector } from '../store';

function OrderCounter() {
  const count = useAppSelector(countOrdersSelector);

  return (
    <div>
      <strong>Number of current orders ({count})</strong>
    </div>
  );
}

export default OrderCounter;
