import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import ProductAPI from '../API/ProductAPI';
import Pagination from './Component/Pagination';
import convertMoney from '../convertMoney';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function Products(props) {
  const [products, setProducts] = useState([]);
  const [numOfResult, setNumOfResult] = useState();

  const [pagination, setPagination] = useState({
    page: '1',
    search: '',
    category: 'all',
  });

  const [reload, setReload] = useState(true);

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

  const handleDelete = async productId => {
    const check = window.confirm('Are you sure delete this product?');
    if (check) {
      const response = await ProductAPI.deleteProduct(productId);
      if (response) {
        setReload(true);
      }
    }
  };

  return (
    <div className='page-wrapper d-block'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='card'>
              <div className='card-body '>
                <div className='d-flex justify-content-between'>
                  <h4 className='card-title'>Products</h4>
                  <input
                    className='form-control w-35'
                    onChange={onChangeText}
                    type='text'
                    placeholder='Enter Search!'
                  />
                  <Link to='/products/new'>
                    <button
                      style={{ cursor: 'pointer', color: 'white' }}
                      className='btn btn-danger'
                    >
                      Add New
                    </button>
                  </Link>
                </div>

                <br />
                {reload ? (
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
                          <th>ID</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Image</th>
                          <th>Category</th>
                          <th>Actions</th>
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
                                <Link to={`/products/${value._id}`}>
                                  <button
                                    style={{ margin: '1px', width: '80px' }}
                                    className='btn btn-success'
                                  >
                                    Update
                                  </button>
                                </Link>
                                &nbsp;
                                <button
                                  style={{ margin: '1px', width: '80px' }}
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

export default Products;
