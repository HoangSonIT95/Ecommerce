import React, { useEffect, useState } from 'react';
import convertMoney from '../convertMoney';
import './Checkout.css';

import { Link } from 'react-router-dom';
import HistoryAPI from '../API/HistoryAPI';
import alertify from 'alertifyjs';

function Checkout(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  const [carts, setCarts] = useState([]);

  const [total, setTotal] = useState(0);

  const [success, setSuccess] = useState(false);

  //Hàm này dùng để gọi API và render số sản phẩm
  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        setCarts(user.cart.items);
        getTotal(user.cart.items);
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
  const handleSubmit = async e => {
    e.preventDefault();
    const dataOrder = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      address: e.target.address.value,
      total: total,
    };

    const response = await HistoryAPI.postOrder(dataOrder);
    if (response) {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.success('Bạn Đã Đặt Hàng Thành Công!');
      setSuccess(true);
    }
  };

  return (
    <div>
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
                        <span>{convertMoney(total)} VND</span>
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
