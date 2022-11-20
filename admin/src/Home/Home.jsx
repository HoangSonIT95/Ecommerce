import React, { useEffect, useState } from 'react';
import convertMoney from '../convertMoney';
import UserAPI from '../API/UserAPI';
import HistoryAPI from '../API/HistoryAPI';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

Home.propTypes = {};

function Home(props) {
  const [users, setUsers] = useState(0);
  const [earning, setEarning] = useState(0);
  const [orders, setOrders] = useState(0);
  const [history, setHistory] = useState([]);
  const [loadCountUser, setLoadCountUser] = useState(true);
  const [loadEarning, setLoadEarning] = useState(true);
  const [loadCountOder, setLoadCountOder] = useState(true);
  const [loadOrders, setLoadOrders] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const count = await UserAPI.getCountUser();
      setUsers(count);
      setLoadCountUser(false);

      const earning = await HistoryAPI.getEarningTotal();
      setEarning(earning);
      setLoadEarning(false);

      const countOrder = await HistoryAPI.getCountOrder();
      setOrders(countOrder);
      setLoadCountOder(false);

      let orders = await HistoryAPI.getAll();
      setHistory(orders.reverse().slice(0, 5));
      setLoadOrders(false);
    };
    fetchData();
  }, []);

  return (
    <div className='page-wrapper d-block'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-7 align-self-center'>
            <div className='d-flex align-items-center'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb m-0 p-0'>
                  <li className='breadcrumb-item'>
                    <Link to='/'>Dashboard</Link>
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
                  {loadCountUser ? (
                    <ThreeDots
                      height='80'
                      width='80'
                      radius='9'
                      color='#4fa94d'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClassName=''
                      visible={true}
                    />
                  ) : (
                    <div className='d-inline-flex align-items-center'>
                      <h2 className='text-dark mb-1 font-weight-medium'>
                        {users}
                      </h2>
                    </div>
                  )}
                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    Clients
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <GroupAddIcon color='success' fontSize='large' />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='card border-right'>
            <div className='card-body'>
              <div className='d-flex d-lg-flex d-md-block align-items-center'>
                <div>
                  {loadEarning ? (
                    <ThreeDots
                      height='80'
                      width='80'
                      radius='9'
                      color='#4fa94d'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClassName=''
                      visible={true}
                    />
                  ) : (
                    <h2 className='text-dark mb-1 w-100 text-truncate font-weight-medium'>
                      {convertMoney(earning)}
                      <sup className='set-doller'> VND</sup>
                    </h2>
                  )}

                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    Earnings of Month
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <AccountBalanceWalletIcon
                      color='secondary'
                      fontSize='large'
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-body'>
              <div className='d-flex d-lg-flex d-md-block align-items-center'>
                <div>
                  {loadCountOder ? (
                    <ThreeDots
                      height='80'
                      width='80'
                      radius='9'
                      color='#4fa94d'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClassName=''
                      visible={true}
                    />
                  ) : (
                    <h2 className='text-dark mb-1 font-weight-medium'>
                      {orders}
                    </h2>
                  )}

                  <h6 className='text-muted font-weight-normal mb-0 w-100 text-truncate'>
                    New Order
                  </h6>
                </div>
                <div className='ml-auto mt-md-3 mt-lg-0'>
                  <span className='opacity-7 text-muted'>
                    <AddShoppingCartIcon color='primary' fontSize='large' />
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
                  <h4 className='card-title'>Order</h4>
                  {loadOrders ? (
                    <ThreeDots
                      height='80'
                      width='80'
                      radius='9'
                      color='#4fa94d'
                      ariaLabel='three-dots-loading'
                      wrapperStyle={{}}
                      wrapperClassName=''
                      visible={true}
                    />
                  ) : (
                    <div className='table-responsive'>
                      <table className='table table-striped table-bordered v-middle'>
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
                                <td className='text-break'>{value.userId}</td>
                                <td>{value.fullName}</td>
                                <td>{value.phone}</td>
                                <td>{value.address}</td>
                                <td>{convertMoney(value.total)} VND</td>
                                <td>{value.delivery}</td>
                                <td>{value.status}</td>
                                <td>
                                  <Link
                                    to={`/orders/${value._id}`}
                                    style={{
                                      cursor: 'pointer',
                                      color: 'white',
                                    }}
                                    className='btn btn-success'
                                  >
                                    View
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by{' '}
        <a href='https://www.facebook.com/nunhivole/'> Hoang Son</a>.
      </footer>
    </div>
  );
}

export default Home;
