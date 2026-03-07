import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminmasterComponent } from './Admin/adminmaster/adminmaster.component';
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { GuestmasterComponent } from './Guest/guestmaster/guestmaster.component';
import { GuesthomeComponent } from './Guest/guesthome/guesthome.component';
import { LoginComponent } from './Guest/login/login.component';
import { LocationregisterComponent } from './Admin/locationregister/locationregister.component';
import { LocationviewComponent } from './Admin/locationview/locationview.component';
import { CategoryregComponent } from './Admin/categoryreg/categoryreg.component';
import { CategoryviewComponent } from './Admin/categoryview/categoryview.component';
import { SubcategoryRegistrationComponent } from './Admin/subcategoryreg/subcategoryreg.component';
import { SubcategoryviewComponent } from './Admin/subcategoryview/subcategoryview.component';
import { MillComponent } from './Guest/mill/mill.component';
import { MillviewComponent } from './Admin/millview/millview.component';
import { MillmasterComponent } from './Mill/millmaster/millmaster.component';
import { MillhomeComponent } from './Mill/millhome/millhome.component';
import { ProductaddComponent } from './Mill/productadd/productadd.component';
import { ProductaddviewComponent } from './Mill/productaddview/productaddview.component';
import { CustomerregComponent } from './Guest/customerreg/customerreg.component';
import { CustomermasterComponent } from './customer/customermaster/customermaster.component';
import { CustomerhomeComponent } from './customer/customerhome/customerhome.component';
import { ViewmillComponent } from './customer/viewmill/viewmill.component';
import { MillserviceComponent } from './Mill/millservice/millservice.component';
import { MillserviceviewComponent } from './Mill/millserviceview/millserviceview.component';
import { MillservicedetailsComponent } from './Mill/millservicedetails/millservicedetails.component';
import { ViewmillservicedetailsComponent } from './Mill/viewmillservicedetails/viewmillservicedetails.component';
import { ViewmillserviceComponent } from './Mill/viewmillservice/viewmillservice.component';
import { ViewcustmillcategoryComponent } from './customer/viewcustmillcategory/viewcustmillcategory.component';
import { ViewcustmillservicesComponent } from './customer/viewcustmillservices/viewcustmillservices.component';
import { CustservicesigleviewComponent } from './customer/custservicesigleview/custservicesigleview.component';
import { EditlocationComponent } from './Admin/editlocation/editlocation.component';
import { EditcategoryComponent } from './Admin/editcategory/editcategory.component';
import { BookingviewComponent } from './Mill/bookingview/bookingview.component';
import { ViewbookingComponent } from './customer/viewbooking/viewbooking.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { ProductsingleviewComponent } from './customer/productsingleview/productsingleview.component';
import { CartComponent } from './customer/cart/cart.component';
import { Report1Component } from './Admin/report1/report1.component';
import { EditsubcategoryComponent } from './Admin/editsubcategory/editsubcategory.component';
import { CartPaymentComponent } from './customer/cart-payment/cart-payment.component';
import { Report2Component } from './Admin/report2/report2.component';
import { MyserviceBookingComponent } from './customer/myservice-booking/myservice-booking.component';
import { PaymentviewComponent } from './customer/paymentview/paymentview.component';
import { ExcelreportComponent } from './Admin/excelreport/excelreport.component';
// import { ViewmillservicesComponent } from './customer/viewmillservices/viewmillservices.component';




const routes: Routes = [
{path:'adminmaster', component: AdminmasterComponent,
children: [
{path:'adminhome', component: AdminhomeComponent},
{path:'locationregister', component: LocationregisterComponent},
{path:'locationview', component: LocationviewComponent},
{path:'categoryreg',component:CategoryregComponent},
{path:'categoryview',component:CategoryviewComponent},
{path:'subcategoryreg',component:SubcategoryRegistrationComponent},
{path:'subcategoryview',component:SubcategoryviewComponent},
{path:'millview',component:MillviewComponent},
{path:'editlocation/:id',component:EditlocationComponent},
{path:'editcategory/:category_id',component:EditcategoryComponent},
{path:'report1',component:Report1Component},
{path:'editsubcategory/:subcat_id',component:EditsubcategoryComponent},
{path:'report2',component:Report2Component},
{path:'excelreport',component:ExcelreportComponent},



]},
{ path:'',redirectTo:'guestmaster/guesthome',pathMatch:'full'},
{ path:'guestmaster',component:GuestmasterComponent,
  children:[
    {path:'guesthome',component:GuesthomeComponent},
    {path:'login',component:LoginComponent},
    {path:'mill',component:MillComponent},
    {path:'customer',component:CustomerregComponent},
]},

{ path:'millmaster',component:MillmasterComponent,
  children:[
    {path:'millhome',component:MillhomeComponent},
    {path:'productadd',component:ProductaddComponent},
    {path:'productaddview',component:ProductaddviewComponent},
    {path:'millservice',component:MillserviceComponent},
    {path:'millserviceview',component:MillserviceviewComponent},
    {path:'millservicedetails',component:MillservicedetailsComponent},
    {path:'viewmillservicedetails',component:ViewmillservicedetailsComponent},
    {path: 'viewmillservicecategory', component: ViewmillserviceComponent },
    {path: 'bookingview', component: BookingviewComponent },
    
]},

{ path:'customermaster',component:CustomermasterComponent,
  children:[
    {path:'customerhome',component:CustomerhomeComponent},
    {path:'viewmill',component:ViewmillComponent},
    {path: 'viewmillservices/:millid', component: ViewmillservicedetailsComponent},
    {path:'viewcustmillcategory/:login_id',component:ViewcustmillcategoryComponent},
    { path: 'viewcustmillservices/:millid/:categoryid', component: ViewcustmillservicesComponent },
    { path: 'custservicesingleview/:subcat_id', component: CustservicesigleviewComponent },
    {path:'viewbooking',component:ViewbookingComponent},
    {path:'payment/:bookingdetails_id/:customer_id',component:PaymentComponent},
    {path:'productsingleview/:product_id',component:ProductsingleviewComponent},
    {path:'cart',component:CartComponent},
    {path:'cartpayment',component:CartPaymentComponent},
    {path:'myservice-booking',component:MyserviceBookingComponent},
    {path:'paymentview',component:PaymentviewComponent},


    //22-02-25
   // { path: 'customermaster/viewservice/:subcat_id', component: ViewServiceComponent }
    // {path:'viewmillservices',component:ViewmillservicesComponent},



   
]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
