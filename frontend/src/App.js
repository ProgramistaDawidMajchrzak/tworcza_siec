import './App.css';
import {
  Route,
  Routes
} from "react-router-dom";

import Home from './routes/HomePage/Home';
import Navigation from './routes/Navigation/Navigation';
import QuotationPage from './routes/QuotationPage/QuotationPage';
import Shop from './routes/Shop/Shop';
import News from './routes/News/News';
import ProductPage from './routes/Shop/ProductPage';

import SignUp from './routes/Email/SignUp';
import Login from './routes/Email/LogIn';
import EmailVerified from './routes/Email/EmailVerified';
import AuthGuard from './components/AuthGuard';
import Account from './routes/Email/Account';

import AdminLogin from './routes/Admin/AdminLogin';
import AdminBoard from './routes/Admin/AdminBoard';
import AdminNavigation from './routes/Admin/AdminNavigation';
import AdminClients from './routes/Admin/AdminClients';
import AdminProductsAdd from './routes/Admin/AdminProductsAdd';
import AdminProductsList from './routes/Admin/AdminProductsList';
import AdminProductsEdit from './routes/Admin/AdminProductEdit';
import AdminSubscribers from './routes/Admin/AdminSubscribers';
import AdminNewsletter from './routes/Admin/AdminNewsletter';

import ConfirmSubscription from './routes/Newsletter/ConfirmSubscription';

import { ToastContainer } from 'react-toastify';
import AdminZipsAdd from './routes/Admin/AdminZipsAdd';
import ScrollToTop from './routes/Elements/ScrollToTop';
import CheckoutWizard from './routes/Shop/CheckoutWizard';

function App() {
  return (
    <>
    <ScrollToTop />
      <Routes>
        <Route element={<Navigation />}>
          <Route path="/" element={<Home />} />
          <Route path="/nowosci" element={<News />} />
          <Route path="/sklep" element={<Shop />} />
          <Route path="/sklep/:product_code" element={<ProductPage />} />
          <Route path="/checkout/:productId" element={<CheckoutWizard />} />
          <Route path="/wycena" element={<QuotationPage />} />
          <Route path="/confirm/:token" element={<ConfirmSubscription />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/email-verified" element={<EmailVerified />} />
          <Route
            path="/account"
            element={
              <AuthGuard>
                <Account />
              </AuthGuard>
            }
          />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route element={<AdminNavigation />}>
          <Route path="/admin-home" element={<AdminBoard />} />
          <Route path="/admin-products-add" element={<AdminProductsAdd />} />
          <Route path="/admin-products-edit/:productCode" element={<AdminProductsEdit />} />
          <Route path="/admin-products" element={<AdminProductsList />} />
          <Route path="/admin-subscribers" element={<AdminSubscribers />} />
          <Route path="/admin-newsletter" element={<AdminNewsletter />} />
          <Route path="/admin-users" element={<AdminClients />} />
          <Route path="/admin-zips" element={<AdminZipsAdd />} />
        </Route>
      </Routes>
      <ToastContainer autoClose={2000}/>
    </>
  );
}

export default App;