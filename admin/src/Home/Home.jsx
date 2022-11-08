import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import convertMoney from '../convertMoney';
import UserAPI from '../API/UserAPI';
import HistoryAPI from '../API/HistoryAPI';

Home.propTypes = {};

function Home(props) {
  const [users, setUsers] = useState(0);
  const [earning, setEarning] = useState(0);
  const [orders, setOrders] = useState(0);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const count = await UserAPI.getCountUser();
      setUsers(count);

      const earning = await HistoryAPI.getEarningTotal();
      setEarning(earning);

      const countOrder = await HistoryAPI.getCountOrder();
      setOrders(countOrder);

      const orders = await HistoryAPI.getAll();
      setHistory(orders.slice(0, 10));
    };
    fetchData();
  }, []);

  return (
    <div className='page-wrapper'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-7 align-self-center'>
            <div className='d-flex align-items-center'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb m-0 p-0'>
                  <li className='breadcrumb-item'>
                    <a href='index.html'>Dashboard</a>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='card-group'>
          <div className='card border-right'>
            <div className='card-body'>
              <div className='d-flex d-lg-flex d-md-block align-items-center'>
                <div>
                  <div className='d-inline-flex align-items-center'>
                    <h2 className='text-dark mb-1 font-weight-medium'>
                      {users}
                    </h2>
                  </div>
                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    Clients
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <i data-feather='user-plus'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='card border-right'>
            <div className='card-body'>
              <div className='d-flex d-lg-flex d-md-block align-items-center'>
                <div>
                  <h2 className='text-dark mb-1 w-100 text-truncate font-weight-medium'>
                    {convertMoney(earning)}
                    <sup className='set-doller'> VND</sup>
                  </h2>
                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    Earnings of Month
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <i data-feather='dollar-sign'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-body'>
              <div className='d-flex d-lg-flex d-md-block align-items-center'>
                <div>
                  <h2 className='text-dark mb-1 font-weight-medium'>
                    {orders}
                  </h2>
                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    New Order
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <i data-feather='globe'></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-12'>
              <div className='card'>
                <div className='card-body'>
                  <h4 className='card-title'>History</h4>

                  <div className='table-responsive'>
                    <table className='table table-striped table-bordered no-wrap'>
                      <thead>
                        <tr>
                          <th>ID User</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Total</th>
                          <th>Delivery</th>
                          <th>Status</th>
                          <th>Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {history &&
                          history.map(value => (
                            <tr key={value._id}>
                              <td>{value.userId}</td>
                              <td>{value.fullName}</td>
                              <td>{value.phone}</td>
                              <td>{value.address}</td>
                              <td>{convertMoney(value.total)} VND</td>
                              <td>{value.delivery}</td>
                              <td>{value.status}</td>
                              <td>
                                <a
                                  style={{ cursor: 'pointer', color: 'white' }}
                                  className='btn btn-success'
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by{' '}
        <a href='https://www.facebook.com/KimTien.9920/'>Tien Kim</a>.
      </footer>
    </div>
  );
}

export default Home;
