import logo from './logo.svg';
import './App.css';
import Header from "./component/Header";
import ScrollToTop from "./component/ScrollToTop";
import {Route, Routes} from "react-router";
import Home from "./component/home/Home";
import FacilitiesList from "./component/facility/FacilitiesList";
import FacilitiesEditForm from "./component/facility/FacilitiesEditForm";
import Footer from "./component/Footer";
import {ToastContainer} from "react-toastify";
import ContractList from "./component/contract/ContractList";
import ContractAddForm from "./component/contract/ContractAddForm";
import CustomerEditForm from "./component/customer/CustomerEditForm";
import CustomerList from "./component/customer/CustomerList";
import CustomerAddForm from "./component/customer/CustomerAddForm";
import FacilitiesAddForm from "./component/facility/FacilitiesAddForm";

function App() {
  return (
    <>
      <Header/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/facility" element={<FacilitiesList />} />
        <Route path="/facility-edit/:id" element={<FacilitiesEditForm />} />
        <Route path="/facility-add" element={<FacilitiesAddForm />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/customer-edit/:id" element={<CustomerEditForm />} />
        <Route path="/customer-add" element={<CustomerAddForm />} />
        <Route path="/contract" element={<ContractList />} />
        <Route path="/contract-add" element={<ContractAddForm />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
