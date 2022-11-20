import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function Users(props) {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();
      setUsers(response);
    };

    fetchData();
    setReload(false);
  }, [reload]);

  const handleDelete = async userId => {
    const check = window.confirm('Are you sure delete this user?');
    if (check) {
      const response = await UserAPI.deleteUser(userId);
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
              <div className='card-body'>
                <div className='d-flex justify-content-between'>
                  <h4 className='card-title'>Users</h4>
                  <input
                    className='form-control w-35'
                    type='text'
                    placeholder='Enter Search!'
                  />
                  <Link to='/users/new'>
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
                          <th>Full Name</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users &&
                          users.map(value => (
                            <tr key={value._id}>
                              <td>{value._id}</td>
                              <td>{value.fullName}</td>
                              <td>{value.email}</td>
                              <td>{value.phone}</td>
                              <td>
                                <Link to={`/users/${value._id}`}>
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className='footer text-center text-muted'>
        All Rights Reserved by Adminmart. Designed and Developed by
        <a href='https://www.facebook.com/nunhivole/'> Hoang Son</a>.
      </footer>
    </div>
  );
}

export default Users;
