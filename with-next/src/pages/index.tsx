import type { NextPage } from 'next';

import OrderBacklog from '../components/OrderBacklog';
import Customers from '../components/Customers';
import OrderCounter from '../components/OrderCounter';
import OrderForm from '../components/OrderForm';
import OrdersList from '../components/OrdersList';
import SearchBox from '../components/SearchBox';

const IndexPage: NextPage = () => {
  return (
    <div className="app container">
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1>Coffee Shop</h1>
        </div>
        <div className="col-sm-6">
          <OrderForm />
          <hr />
          <Customers />
          <OrdersList />
        </div>
        <div className="col-sm-6">
          <OrderCounter />
          <SearchBox />
          <OrderBacklog />
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
