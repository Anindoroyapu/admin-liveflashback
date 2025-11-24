import React from "react";
import { HashRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./components/layout/MainLayout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ContactPage from "./pages/ContactPage";
import CollectionPage from "./pages/CollectionPage";
import ExpenditurePage from "./pages/ExpenditurePage";
import OtherPage from "./pages/OtherPage";
import SettingsPage from "./pages/SettingsPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProductPage from "./pages/ProductPage";
import OrderListProvider from "./pages/checkout/context/OrderListProvider";

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : (
    <Navigate to="/login" />
  );
};

const App: React.FC = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      <HashRouter>
        <Routes>
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/checkout" element={
              <OrderListProvider>
              <CheckoutPage />
              </OrderListProvider>
              
              } />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/expenditure" element={<ExpenditurePage />} />
            <Route path="/other" element={<OtherPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
