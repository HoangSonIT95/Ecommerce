import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Chat from './Chat/Chat';
import Header from './Header/Header';
import EditOrder from './History/EditOrder';
import History from './History/History';
import Home from './Home/Home';
import Login from './Login/Login';
import Menu from './Menu/Menu';
import EditProduct from './Products/Component/EditProduct';
import NewProduct from './Products/Component/NewProduct';
import Products from './Products/Products';
import EditUser from './Users/EditUser';
import NewUser from './Users/NewUser';
import Users from './Users/Users';

function App() {
  const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    if (!user) {
      return <Navigate to='/login' />;
    }
    return children;
  };

  const ProtectedRouteAdmin = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || user.role !== 'admin') {
      return <Navigate to='/login' />;
    }
    return children;
  };

  return (
    <div className='App'>
      <BrowserRouter>
        <div
          id='main-wrapper'
          data-theme='light'
          data-layout='vertical'
          data-navbarbg='skin6'
          data-sidebartype='full'
          data-sidebar-position='fixed'
          data-header-position='fixed'
          data-boxed-layout='full'
        >
          <Routes>
            <Route exact path='/'>
              <Route path='login' element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRouteAdmin>
                    <Header />
                    <Menu />
                    <Home />
                  </ProtectedRouteAdmin>
                }
              />
              <Route
                path='chat'
                element={
                  <ProtectedRoute>
                    <Header />
                    <Menu />
                    <Chat />
                  </ProtectedRoute>
                }
              />

              <Route path='/users'>
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <Users />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path=':userId'
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <EditUser />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path='new'
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />

                      <NewUser />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>

              <Route path='products'>
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <Products />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path='new'
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <NewProduct />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path=':productId'
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <EditProduct />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>
              <Route path='orders'>
                <Route
                  index
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <History />
                    </ProtectedRouteAdmin>
                  }
                />
                <Route
                  path=':orderId'
                  element={
                    <ProtectedRouteAdmin>
                      <Header />
                      <Menu />
                      <EditOrder />
                    </ProtectedRouteAdmin>
                  }
                />
              </Route>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
