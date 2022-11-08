import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Chat from './Chat/Chat';
import Header from './Header/Header';
import History from './History/History';
import Home from './Home/Home';
import Login from './Login/Login';
import Menu from './Menu/Menu';
import EditProduct from './Products/Component/EditProduct';
import NewProduct from './Products/Component/NewProduct';
import Products from './Products/Products';
import EditUser from './Users/EditUser';
import Users from './Users/Users';

function App() {
  const ProtectedRoute = ({ children }) => {
    const user = localStorage.getItem('user');
    if (!user) {
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
          <Header />

          <Menu />
          <Routes>
            <Route exact path='/'>
              <Route path='login' element={<Login />} />
              <Route
                index
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path='chat'
                element={
                  <ProtectedRoute>
                    <Chat />
                  </ProtectedRoute>
                }
              />

              <Route path='users'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path=':userId'
                  element={
                    <ProtectedRoute>
                      <EditUser />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path='products'>
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route path='new' element={<NewProduct />} />
                <Route path=':productId' element={<EditProduct />} />
              </Route>
              <Route
                path='history'
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
