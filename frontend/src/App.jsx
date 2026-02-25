import React from 'react'
import Home from './Component/Home'
import { Navigate, Route, Routes } from 'react-router'
import Signup from './Component/Signup'
import { useDispatch, useSelector } from 'react-redux'
import Login from './Component/Login'
import { useEffect } from 'react'
import { checkUser } from './authslice'
import AdminPanel from './pages/AdminPanel'
import Admincreate from './pages/Admincreate'
import Admindelete from './pages/Admindelete'
import AdminAllUser from './pages/adminAllUser'
import Cart from './pages/Cart'

const App = () => {

  const dispatch = useDispatch()
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch])

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center'>
      <span className='loading loading-spinner loading-lg'></span>
    </div>
  }

  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
        <Route path='/login' element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path='/adminPanel' element={isAuthenticated && user?.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />} />
        <Route path='/admin/create' element={isAuthenticated && user?.role === 'admin' ? <Admincreate /> : <Navigate to="/" />} />
        <Route path='/admin/delete' element={isAuthenticated && user?.role === 'admin' ? <Admindelete /> : <Navigate to="/" />} />
        <Route path='/admin/getUser' element={isAuthenticated && user?.role === 'admin' ? <AdminAllUser /> : <Navigate to="/" />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  )
}

export default App