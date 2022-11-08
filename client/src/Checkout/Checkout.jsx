import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import CartAPI from '../API/CartAPI';
import UserAPI from '../API/UserAPI';
import CheckoutAPI from '../API/CheckoutAPI';
import convertMoney from '../convertMoney';
import './Checkout.css';

// import io from 'socket.io-client';
import axios from 'axios';
import { Link } from 'react-router-dom';
// const socket = io('http://localhost:5000');

function Checkout(props) {
  const userId = localStorage.getItem('id_user');
  const [user, setUser] = useState();

  const [carts, setCarts] = useState([]);

  const [total, setTotal] = useState(0);

  const [success, setSuccess] = useState(false);

  const [load, setLoad] = useState(false);

  //Hàm này dùng để gọi API và render số sản phẩm
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        const response = await axios.get(`/users/${userId}`);
        setUser(response.data);
        setCarts(response.data.cart.items);
        getTotal(response.data.cart.items);
      };
      fetchData();
    }
  }, []);

  //Hàm này dùng để tính tổng tiền carts
  function getTotal(carts) {
    let sub_total = 0;
    carts.map(value => {
      return (sub_total +=
        parseInt(value.priceProduct) * parseInt(value.quantity));
    });

    setTotal(sub_total);
  }

  //Check Validation
  const handleSubmit = e => {
    e.preventDefault();
    const dataOrder = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      total: total,
    };

    axios
      .post('/orders', dataOrder, {
        withCredentials: true,
      })
      .then(res => {
        alert('Order success!');
        // window.location.href = "http://localhost:3000/orders";
        // return res.data;
      })
      .catch(err => console.log(err));
  };

  //Hàm này bắt đầu gửi Email xác nhận đơn hàng
  //   useEffect(() => {
  //     if (load) {
  //       const sendMail = async () => {
  //         const params = {
  //           to: email,
  //           fullname: fullname,
  //           phone: phone,
  //           address: address,
  //           idUser: localStorage.getItem('id_user'),
  //         };

  //         const query = '?' + queryString.stringify(params);

  //         const response = await CheckoutAPI.postEmail(query);

  //         console.log(response);
  //       };

  //       sendMail();

  //       const data = localStorage.getItem('id_user');

  //       // Gửi socket lên server
  //       socket.emit('send_order', data);

  //       //Dùng setTimeout delay 3s
  //       //Sau 4s nó sẽ thực hiện
  //       setTimeout(() => {
  //         setSuccess(!success);
  //         setLoad(!load);
  //       }, 4000);
  //     }
  //   }, [load]);
  return (
    <div>
      {load && (
        <div className='wrapper_loader'>
          <div className='loader'></div>
        </div>
      )}

      <div className='container'>
        <section className='py-5 bg-light'>
          <div className='container'>
            <div className='row px-4 px-lg-5 py-lg-4 align-items-center'>
              <div className='col-lg-6'>
                <h1 className='h2 text-uppercase mb-0'>Checkout</h1>
              </div>
              <div className='col-lg-6 text-lg-right'>
                <nav aria-label='breadcrumb'>
                  <ol className='breadcrumb justify-content-lg-end mb-0 px-0'>
                    <li className='breadcrumb-item'>
                      <Link to='/'>Home</Link>
                    </li>
                    <li className='breadcrumb-item'>
                      <Link to='/cart'>Cart</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Checkout
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>

        {!success && (
          <section className='py-5'>
            <h2 className='h5 text-uppercase mb-4'>Billing details</h2>
            <div className='row'>
              <div className='col-lg-8'>
                <form type='submit' onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col-lg-12 form-group'>
                      <label
                        className='text-small text-uppercase'
                        htmlFor='Fullname'
                      >
                        Full Name:
                      </label>
                      <input
                        className='form-control form-control-lg'
                        defaultValue={user?.fullName}
                        type='text'
                        name='fullName'
                        id='fullName'
                        required
                      />
                    </div>
                    <div className='col-lg-12 form-group'>
                      <label
                        className='text-small text-uppercase'
                        htmlFor='Email'
                      >
                        Email:{' '}
                      </label>
                      <input
                        className='form-control form-control-lg'
                        defaultValue={user?.email}
                        type='email'
                        name='email'
                        id='email'
                        required
                      />
                    </div>
                    <div className='col-lg-12 form-group'>
                      <label
                        className='text-small text-uppercase'
                        htmlFor='Phone'
                      >
                        Phone Number:{' '}
                      </label>
                      <input
                        className='form-control form-control-lg'
                        defaultValue={user?.phone}
                        type='text'
                        name='phone'
                        id='phone'
                        required
                      />
                    </div>
                    <div className='col-lg-12 form-group'>
                      <label
                        className='text-small text-uppercase'
                        htmlFor='Address'
                      >
                        Address:{' '}
                      </label>
                      <input
                        className='form-control form-control-lg'
                        type='text'
                        name='address'
                        id='address'
                        placeholder='Enter Your Address Here!'
                        required
                      />
                    </div>
                    <div className='col-lg-12 form-group'>
                      <button
                        className='btn btn-dark'
                        style={{ color: 'white' }}
                        type='submit'
                      >
                        Place order
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className='col-lg-4'>
                <div className='card border-0 rounded-0 p-lg-4 bg-light'>
                  <div className='card-body'>
                    <h5 className='text-uppercase mb-4'>Your order</h5>
                    <ul className='list-unstyled mb-0'>
                      {carts &&
                        carts.map(value => (
                          <div key={value._id}>
                            <li className='d-flex align-items-center justify-content-between'>
                              <strong className='small font-weight-bold'>
                                {value.nameProduct}
                              </strong>
                              <span className='text-muted small'>
                                {`${convertMoney(value.priceProduct)} x
                                ${value.quantity}`}
                              </span>
                            </li>
                            <li className='border-bottom my-2'></li>
                          </div>
                        ))}
                      <li className='d-flex align-items-center justify-content-between'>
                        <strong className='text-uppercase small font-weight-bold'>
                          Total
                        </strong>
                        <span>{convertMoney(total)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {success && (
          <section className='py-5'>
            <div className='p-5'>
              <h1>You Have Successfully Ordered!</h1>
              <p style={{ fontSize: '1.2rem' }}>Please Check Your Email.</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Checkout;
