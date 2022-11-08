import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';
import Menu from '../Menu/Menu';
import axios from 'axios';
import { Link } from 'react-router-dom';
import convertMoney from '../convertMoney';
function Products(props) {
  const [products, setProducts] = useState([]);
  const [numOfResult, setNumOfResult] = useState();

  const [pagination, setPagination] = useState({
    page: '1',
    search: '',
    category: 'all',
  });

  const [reload, setReload] = useState(false);

  const onChangeText = e => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      search: value,
      category: pagination.category,
    });
  };

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = value => {
    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchAllData = async () => {
      let response;

      const params = {
        page: pagination.page,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = '?' + query;

      response = await ProductAPI.getPagination(newQuery);

      setProducts(response.products);
      setTotalPage(response.totalPage);
      setNumOfResult(response.numOfResult);
    };

    fetchAllData();
    setReload(false);
  }, [pagination, reload]);

  const handleDelete = productId => {
    const check = window.confirm('Are you sure delete this product?');
    if (check) {
      axios
        .delete(`http://localhost:5000/products/${productId}`)
        .then(res => setReload(true))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className='page-wrapper'>
      <div className='page-breadcrumb'>
        <div className='row'>
          <div className='col-7 align-self-center'>
            <h4 className='page-title text-truncate text-dark font-weight-medium mb-1'>
              Basic Initialisation
            </h4>
            <div className='d-flex align-items-center'>
              <nav aria-label='breadcrumb'>
                <ol className='breadcrumb m-0 p-0'>
                  <li className='breadcrumb-item'>
                    <a href='/' className='text-muted'>
                      Home
                    </a>
                  </li>
                  <li
                    className='breadcrumb-item text-muted active'
                    aria-current='page'
                  >
                    Table
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body '>
                <h4 className='card-title'>Products</h4>
                <input
                  className='form-control w-25'
                  onChange={onChangeText}
                  type='text'
                  placeholder='Enter Search!'
                />
                <a href='/products/new'>
                  <button
                    style={{ cursor: 'pointer', color: 'white' }}
                    className='btn btn-danger'
                  >
                    Add New
                  </button>
                </a>
                <br />
                <div className='table-responsive'>
                  <table className='table table-striped table-bordered no-wrap'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products &&
                        products.map(value => (
                          <tr key={value._id}>
                            <td>{value._id}</td>
                            <td>{value.name}</td>
                            <td>{convertMoney(value.price)} VND</td>
                            <td>
                              <img
                                src={value.imageURL[0]}
                                style={{ height: '60px', width: '60px' }}
                                alt=''
                              />
                            </td>
                            <td>{value.category}</td>
                            <td>
                              <a href={`/products/${value._id}`}>
                                <button
                                  style={{ cursor: 'pointer', color: 'white' }}
                                  className='btn btn-success'
                                >
                                  Update
                                </button>
                              </a>
                              &nbsp;
                              <button
                                style={{ cursor: 'pointer', color: 'white' }}
                                className='btn btn-danger'
                                onClick={() => handleDelete(value._id)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <Pagination
                    pagination={pagination}
                    handlerChangePage={handlerChangePage}
                    totalPage={totalPage}
                    setNumOfResult={numOfResult}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by{' '}
        <a href='https://www.facebook.com/KimTien.9920/'>Tiền Kim</a>.
      </footer>
    </div>
  );
}

export default Products;
