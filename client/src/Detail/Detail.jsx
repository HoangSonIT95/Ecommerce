import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import { Link, useParams } from 'react-router-dom';
import alertify from 'alertifyjs';
import CartAPI from '../API/CartAPI';
import CommentAPI from '../API/CommentAPI';
import convertMoney from '../convertMoney';
import { format } from 'timeago.js';
import ReactStars from 'react-rating-stars-component';
import { ColorRing } from 'react-loader-spinner';

function Detail(props) {
  const [detail, setDetail] = useState({});
  const [count, setCount] = useState(1);

  //id params cho từng sản phẩm
  const { id } = useParams();

  // user đã đăng nhập
  let user = JSON.parse(localStorage.getItem('user'));

  const [product, setProduct] = useState([]);

  const [star, setStar] = useState(5);

  const [comment, setComment] = useState('');

  // Listcomment
  const [list_comment, set_list_comment] = useState([]);

  // state này dùng để load lại comment khi user gửi comment lên
  const [load_comment, set_load_comment] = useState(false);
  const [load, setLoad] = useState(true);

  const firstExample = {
    size: 15,
    count: 5,
    value: 5,
    color: 'black',
    activeColor: 'rgb(255, 215, 0)',
    a11y: true,
    isHalf: true,
    emptyIcon: <i className='far fa-star' />,
    halfIcon: <i className='fa fa-star-half-alt' />,
    filledIcon: <i className='fa fa-star' />,
    edit: false,
  };

  const secondExample = {
    size: 20,
    count: 5,
    color: 'black',
    activeColor: 'rgb(255, 215, 0)',
    value: 5,
    a11y: true,
    isHalf: true,
    emptyIcon: <i className='far fa-star' />,
    halfIcon: <i className='fa fa-star-half-alt' />,
    filledIcon: <i className='fa fa-star' />,
    onChange: newValue => {
      setStar(newValue);
    },
  };

  // Hàm này dùng để lấy dữ liệu comment
  // Hàm này sẽ chạy lại phụ thuộc vào id Param
  useEffect(() => {
    const fetchData = async () => {
      const response = await CommentAPI.getCommentProduct(id);
      set_list_comment(response);
    };

    fetchData();
    set_load_comment(false);
  }, [id, load_comment]);

  // Hàm thay đổi comment
  const onChangeComment = e => {
    setComment(e.target.value);
  };

  // Hàm này dùng để bình luận
  const handlerComment = () => {
    if (!user) {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Vui Lòng Đăng Nhập!');
      return;
    }

    const fetchSendComment = async () => {
      const data = {
        idProduct: id,
        idUser: user._id,
        fullName: user.fullName,
        content: comment,
        star: star,
      };

      await CommentAPI.postCommentProduct(id, data);
      set_load_comment(true);
    };

    fetchSendComment();

    setComment('');
  };

  //Hàm này để lấy dữ liệu chi tiết sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id);
      setDetail(response);
      setLoad(false);
    };

    fetchData();
  }, [id]);

  //Hàm này gọi API và cắt chỉ lấy 4 sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getAPI();
      setProduct(response);
    };
    fetchData();
  }, []);

  //Phần này là để thay đổi số lượng khi mua sản phẩm
  const onChangeCount = e => {
    setCount(e.target.value);
  };

  //Phần này dùng để xem review hay description
  const [review, setReview] = useState('description');
  const handlerReview = value => {
    setReview(value);
  };

  //Hàm này là Thêm Sản Phẩm
  const addToCart = async () => {
    if (user) {
      const cart = {
        productId: id,
        quantity: count,
      };

      const response = await CartAPI.postAddToCart(cart);
      user.cart = response;
      localStorage.setItem('user', JSON.stringify(user));

      alertify.set('notifier', 'position', 'bottom-left');
      alertify.success('Bạn Đã Thêm Hàng Thành Công!');
    } else {
      alertify.set('notifier', 'position', 'bottom-left');
      alertify.error('Bạn Cần Đăng Nhập Để Thêm Sản Phẩm Vào Giỏ Hàng!');
    }
  };

  return (
    <section className='py-5'>
      <div className='container'>
        {load ? (
          <ColorRing
            visible={true}
            height='80'
            width='80'
            ariaLabel='blocks-loading'
            wrapperStyle={{}}
            wrapperClass='blocks-wrapper'
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        ) : (
          <>
            <div className='row mb-5'>
              <div className='col-lg-6'>
                <div className='row m-sm-0'>
                  <div className='col-sm-2 p-sm-0 order-2 order-sm-1 mt-2 mt-sm-0'>
                    <div
                      className='owl-thumbs d-flex flex-row flex-sm-column'
                      data-slider-id='1'
                    >
                      {detail.imageURL &&
                        detail.imageURL.map(img => (
                          <div className='owl-thumb-item flex-fill mb-2 mr-2 mr-sm-0'>
                            <img className='w-100' src={img} alt='...' />
                          </div>
                        ))}
                    </div>
                  </div>

                  <div
                    id='carouselExampleControls'
                    className='carousel slide col-sm-10 order-1 order-sm-2'
                    data-ride='carousel'
                  >
                    <div className='carousel-inner owl-carousel product-slider'>
                      {detail.imageURL &&
                        detail.imageURL.map((img, i) => (
                          <div
                            className={
                              i == 0 ? 'carousel-item active' : 'carousel-item'
                            }
                          >
                            <img
                              className='d-block w-100'
                              src={img}
                              alt='product slide'
                            />
                          </div>
                        ))}
                    </div>
                    <a
                      className='carousel-control-prev'
                      href='#carouselExampleControls'
                      role='button'
                      data-slide='prev'
                    >
                      <span
                        className='carousel-control-prev-icon'
                        aria-hidden='true'
                      ></span>
                      <span className='sr-only'>Previous</span>
                    </a>
                    <a
                      className='carousel-control-next'
                      href='#carouselExampleControls'
                      role='button'
                      data-slide='next'
                    >
                      <span
                        className='carousel-control-next-icon'
                        aria-hidden='true'
                      ></span>
                      <span className='sr-only'>Next</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className='col-lg-6'>
                <br></br>
                <ReactStars {...firstExample} />

                <h1>{detail.name}</h1>
                <br></br>
                <p className='text-muted lead'>
                  {convertMoney(detail.price)} VND
                </p>
                <br></br>
                <p className='mb-4'>{detail.short_desc}</p>
                <ul className='list-unstyled small d-inline-block'>
                  <li className='mb-3 bg-white text-muted'>
                    <strong className='text-uppercase text-dark'>
                      Category:
                    </strong>
                    <a className='reset-anchor ml-2'>{detail.category}s</a>
                  </li>
                </ul>
                {detail.stock === 0 ? (
                  <h5 className='mb-2 mt-2 text-danger'>
                    This product is currently out of stock!
                  </h5>
                ) : (
                  <>
                    <h6 className='mb-2 mt-2 text-success'>
                      This product has {detail.stock} items
                    </h6>
                    <div className='row align-items-stretch mb-4'>
                      <div className='col-sm-5 pr-sm-0'>
                        <div className='border d-flex align-items-center justify-content-between py-1 px-3 bg-white border-white'>
                          <span className='small text-uppercase text-gray mr-4 no-select'>
                            Quantity
                          </span>
                          <div className='quantity'>
                            <button
                              className='dec-btn p-0'
                              style={{ cursor: 'pointer' }}
                              disabled={count === 1}
                              onClick={() => setCount(count - 1)}
                            >
                              <i className='fas fa-caret-left'></i>
                            </button>
                            <input
                              className='form-control border-0 shadow-0 p-0'
                              type='text'
                              value={count}
                              onChange={onChangeCount}
                            />
                            <button
                              className='inc-btn p-0'
                              style={{ cursor: 'pointer' }}
                              disabled={count === detail.stock}
                              onClick={() => setCount(count + 1)}
                            >
                              <i className='fas fa-caret-right'></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className='col-sm-3 pl-sm-0'>
                        <button
                          className='btn btn-dark btn-sm btn-block d-flex align-items-center justify-content-center px-0 text-white'
                          onClick={addToCart}
                        >
                          Add to cart
                        </button>
                      </div>
                      <br></br>
                      <br></br>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className='form-group'>
              <label htmlFor='exampleFormControlTextarea1'>Comment:</label>
              <textarea
                className='form-control'
                rows='3'
                onChange={onChangeComment}
                value={comment}
              ></textarea>
            </div>
            <div className='d-flex justify-content-between'>
              <div className='d-flex w-25'>
                <span className='mt-2'>Evaluate: </span>
                &nbsp; &nbsp;
                <ReactStars {...secondExample} />
              </div>
              <div>
                <button
                  className='btn btn-dark btn-sm btn-block px-0 text-white'
                  style={{ width: '12rem' }}
                  onClick={handlerComment}
                >
                  Send
                </button>
              </div>
            </div>
            <br />
            <ul className='nav nav-tabs border-0'>
              <li className='nav-item'>
                <button
                  className='nav-link fix_comment'
                  onClick={() => handlerReview('description')}
                  style={
                    review === 'description'
                      ? { backgroundColor: '#383838', color: '#ffffff' }
                      : { color: '#383838' }
                  }
                >
                  Description
                </button>
              </li>
              <li className='nav-item'>
                <button
                  className='nav-link fix_comment'
                  onClick={() => handlerReview('review')}
                  style={
                    review === 'review'
                      ? { backgroundColor: '#383838', color: '#ffffff' }
                      : { color: '#383838' }
                  }
                >
                  Reviews
                </button>
              </li>
            </ul>
            <div className='tab-content mb-5'>
              {review === 'description' ? (
                <div className='tab-pane fade show active'>
                  <div className='pt-4 pb-4 bg-white'>
                    <h6 className='text-uppercase'>Product description </h6>
                    <br></br>
                    <h6
                      className='text-muted text-small mb-0'
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {detail.long_desc}
                    </h6>
                  </div>
                </div>
              ) : (
                <div className='tab-pane fade show active'>
                  <div className='p-4 p-lg-5 bg-white'>
                    <div className='row'>
                      <div className='col-lg-8'>
                        {list_comment &&
                          list_comment.map(value => (
                            <div className='media mb-3' key={value._id}>
                              <img
                                className='rounded-circle'
                                src='https://img.icons8.com/color/36/000000/administrator-male.png'
                                alt=''
                                width='50'
                              />
                              <div className='media-body ml-3'>
                                <h6 className='mb-0 small text-uppercase'>
                                  {value.fullName}
                                </h6>
                                <p className=' text-muted mb-0'>
                                  {format(value.createdAt)}
                                </p>
                                <ReactStars
                                  {...firstExample}
                                  value={value.star}
                                />
                                <h6 className=' mb-0 text-muted'>
                                  {value.content}
                                </h6>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <h2 className='h5 text-uppercase mb-4'>Related products</h2>
        <div className='row'>
          {product &&
            product
              .filter(
                el => el.category === detail.category && el._id !== detail._id
              )
              .slice(0, 4)
              .map(value => (
                <div className='col-lg-3 col-sm-6' key={value._id}>
                  <div className='product text-center skel-loader'>
                    <div className='d-block mb-3 position-relative'>
                      <img
                        className='img-fluid w-100'
                        src={value.imageURL[0]}
                        alt='...'
                      />
                      <div className='product-overlay'>
                        <ul className='mb-0 list-inline'></ul>
                      </div>
                    </div>
                    <h6>
                      <Link
                        className='reset-anchor'
                        to={`/detail/${value._id}`}
                      >
                        {value.name}
                      </Link>
                    </h6>
                    <p className='small text-muted'>
                      {convertMoney(value.price)} VND
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Detail;
