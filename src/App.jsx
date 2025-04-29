import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Bounce, ToastContainer } from 'react-toastify'
import { AddProduct } from './pages/AddProduct'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { LoginModal } from './components/LoginModal'
import useAuthContext from './context/useAuthContext'
import { ProductPage } from './pages/ProductPage'


const App = () => {
  const { isModalOpen, setModalOpen } = useAuthContext();
  return (
    <>
    <Navbar openModal={() => setModalOpen(true)} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/product/:id' element={<ProductPage />} />
    </Routes>
    <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    <Footer />
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App