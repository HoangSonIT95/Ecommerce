import React, { useEffect, useState } from 'react';
import UserAPI from '../API/UserAPI';
import axios from 'axios';

function Users(props) {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await UserAPI.getAllData();
      setUsers(response);
    };

    fetchData();
    setReload(false);
  }, [reload]);

  const handleDelete = userId => {
    const check = window.confirm('Are you sure delete this user?');
    if (check) {
      axios
        .delete(`/users/${userId}`)
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
              <div className='card-body'>
                <h4 className='card-title'>Users</h4>
                <input
                  className='form-control w-25'
                  type='text'
                  placeholder='Enter Search!'
                />
                <br />
                <div className='table-responsive'>
                  <table className='table table-striped table-bordered no-wrap'>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Edit</th>
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
                              <a href={`/users/${value._id}`}>
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

export default Users;
