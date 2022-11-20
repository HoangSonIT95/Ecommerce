import React, { useEffect, useState } from 'react';
import HistoryAPI from '../API/HistoryAPI';
import { ThreeDots } from 'react-loader-spinner';
import convertMoney from '../convertMoney';
import { Link } from 'react-router-dom';

function History(props) {
  const [history, setHistory] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await HistoryAPI.getAll();
      setHistory(response.reverse());
      setLoad(false);
    };

    fetchData();
  }, []);

  return (
    <div className='page-wrapper d-block'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body'>
                <h4 className='card-title'>Orders</h4>
                <br />
                {load ? (
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
                    <table className='table table-striped table-bordered v-middle '>
                      <thead>
                        <tr>
                          <th>ID User</th>
                          <th>Name</th>
                          <th>Phone</th>
                          <th>Address</th>
                          <th>Total</th>
                          <th>Delivery</th>
                          <th>Status</th>
                          <th>Actions</th>
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
                                <Link to={`/orders/${value._id}`}>
                                  <button
                                    style={{ margin: '1px', width: '80px' }}
                                    className='btn btn-success'
                                  >
                                    View
                                  </button>
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
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by{' '}
        <a href='https://www.facebook.com/nunhivole/'> Hoang Son</a>.
      </footer>
    </div>
  );
}

export default History;
