import logo from './logo.svg';
import './App.css';
import Itemlist from './components/Itemlist';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Additems from './components/Additems';
import Navbar from './components/Navbar';
import Home from './components/Dashboard/Home'
import NewAdjustment from './components/NewAdjustment';
import AddNewAdjust from './components/AddNewAdjust';
import Itemgroup from './components/Itemgroup';
import CreditNotes from './components/Sales/CreditNotes'
import Customers from './components/Sales/Customers';
import DeliveryChallan from './components/Sales/DeliveryChallan';
import Invoices from './components/Sales/Invoices';
import Packages from './components/Sales/Packages';
import PaymentReceived from './components/Sales/PaymentReceived';
import SalesOrder from './components/Sales/SalesOrder';
import SalesReturn from './components/Sales/SalesReturn';
import BillsPayment from './components/Purchase/BillsPayment';
import PurchaseOrder from './components/Purchase/PurchaseOrder';
import Vendor from './components/Purchase/Vendor';
import VendorCredit from './components/Purchase/VendorCredit';
import AddCustomers from './components/Sales/AddCustomers';
import AddNew from './components/AddNew';
import AddItemGroup from './components/AddItemGroup';
import Invoices1 from './components/Sales/Invoices1';
import InvoiceAddItem1 from './components/Sales/InvoiceAddItem1';
import AddNewInvoice from './components/Sales/AddNewInvoice';
import Sales from './components/Dashboard/Sales';
import SalesNavbar from './components/Sales/SalesNavbar';
import Inventory from './components/Dashboard/Inventory';
import Purchase from './components/Dashboard/Purchase';
import AddVendor from './components/Purchase/AddVendor';
import EditVendor from './components/Purchase/EditVendor';
import EditCustomer from './components/Sales/EditCustomer';
import SalesAddItem from './components/Sales/SalesAddItem';
import AddtoPackages from './components/Sales/AddtoPackages';
import AddDelivery from './components/Sales/AddDelivery';
import AddInvoicepack from './components/Sales/AddInvoicepack';
import AddCreditNote from './components/Sales/AddCreditNote';
import AddPurchase from './components/Purchase/AddPurchase';
import PurchaseItems from './components/Purchase/PurchaseItems';
import AddBillpayment from './components/Purchase/AddBillpayment';
import AddVendorCredit from './components/Purchase/AddVendorCredit';


function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/Navbar' exact element={<Navbar />}></Route>
        <Route path='/' exact element={<Home />}></Route>
        <Route path='/Item' exact element={<Itemlist />}></Route>
        <Route path='/Additems' exact element={<Additems />}></Route>
        <Route path='/Itemgroup' exact element={<Itemgroup/>}></Route>
        <Route path='/AddItemGroup' exact element={<AddItemGroup/>}></Route>
        <Route path='/NewAdjustment' exact element={<NewAdjustment />}></Route>
        <Route path='/AddAdjustment' exact element={<AddNewAdjust />}></Route>
        <Route path='/Inventory' exact element={<Inventory/>}></Route>
        
        <Route path='/SalesNavbar' exact element={<SalesNavbar/>}></Route>
        <Route path='/Sales' exact element={<Sales/>}></Route>
        <Route path='/AddCustomers' exact element={<AddCustomers/>}></Route>
        <Route path='/Customers' exact element={<Customers/>}></Route>
        <Route path='/EditCustomer/:custId' exact element={<EditCustomer/>}></Route>
        <Route path='/CreditNotes' exact element={<CreditNotes/>}></Route>
        <Route path='/AddCreditNote/:id' exact element={<AddCreditNote/>}></Route>
        <Route path='/DeliveryChallan' exact element={<DeliveryChallan/>}></Route>
        <Route path='/AddDelivery/:id' exact element={<AddDelivery/>}></Route>
        <Route path='/Invoices' exact element={<Invoices/>}></Route>
        <Route path='/AddInvoicepack/:id' exact element={<AddInvoicepack/>}></Route>
        <Route path='/Packages' exact element={<Packages/>}></Route>
        <Route path='/AddtoPack/:id' exact element={<AddtoPackages/>}></Route>
        <Route path='/PaymentReceived' exact element={<PaymentReceived/>}></Route>
        <Route path='/SalesOrder' exact element={<SalesOrder/>}></Route>
        <Route path='/SalesAddItems/:id' exact element={<SalesAddItem/>}></Route>
        <Route path='/SalesReturn' exact element={<SalesReturn/>}></Route>

        <Route path='/BillsPayment' exact element={<BillsPayment/>}></Route>
        <Route path='/AddBillpayment' exact element={<AddBillpayment/>}></Route>
        <Route path='/PurchaseOrder' exact element={<PurchaseOrder/>}></Route>
        <Route path='/AddPurchase' exact element={<AddPurchase/>}></Route>
        <Route path='/PurchaseItems/:id' exact element={<PurchaseItems/>}></Route>
        <Route path='/Vendor' exact element={<Vendor/>}></Route>
        <Route path='/AddVendor' exact element={<AddVendor/>}></Route>
        <Route path='/VendorCredit' exact element={<VendorCredit/>}></Route>
        <Route path='/AddVendorCredit/:id' exact element={<AddVendorCredit/>}></Route>
        <Route path='/Purchase' exact element={<Purchase/>}></Route>
        <Route path='/EditVendor/:vendorId' exact element ={<EditVendor/>}></Route>


        <Route path='./AddNew' exact element={<AddNew/>}></Route>

        <Route path='/Invoices1' exact element={<Invoices1/>}></Route>
       
        <Route path ="/invoiceAddItem/:id" exact element={<InvoiceAddItem1/>}></Route>
        <Route path='/AddNewInvoice' exact element={<AddNewInvoice/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
