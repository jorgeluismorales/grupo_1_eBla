import React from 'react'
import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from './layouts/ProtectedLayout';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductsPage } from './pages/ProductsPage';
import { UsersPage } from './pages/UsersPage';
import {PublicLayout} from './layouts/PublicLayout';
import {LoginPage} from './pages/LoginPage';
import {NotFoundPage} from './pages/NotFoundPage';
import HomePage from './pages/HomePage/HomePage';


const App = () => {
  return (
    <Routes>

      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>


      <Route path="/" element={<ProtectedLayout />}>
        <Route index element={<HomePage />} />
        <Route path='products' element={<ProductsPage />} />
        <Route path='users' element={<UsersPage />} />
        <Route path='categories' element={<CategoriesPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App