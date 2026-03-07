import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminhomeComponent } from './Admin/adminhome/adminhome.component';
import { AdminmasterComponent } from './Admin/adminmaster/adminmaster.component';
import { GuestmasterComponent } from './Guest/guestmaster/guestmaster.component';
import { GuesthomeComponent } from './Guest/guesthome/guesthome.component';
import { LoginComponent } from './Guest/login/login.component';
import { LocationregisterComponent } from './Admin/locationregister/locationregister.component';
import { LocationviewComponent } from './Admin/locationview/locationview.component';
import { CategoryregComponent } from './Admin/categoryreg/categoryreg.component';
import { CategoryviewComponent } from './Admin/categoryview/categoryview.component';
import {SubcategoryRegistrationComponent } from './Admin/subcategoryreg/subcategoryreg.component';
import { SubcategoryviewComponent } from './Admin/subcategoryview/subcategoryview.component';
import { MillComponent } from './Guest/mill/mill.component';
import { MillviewComponent } from './Admin/millview/millview.component';
import { MillhomeComponent } from './Mill/millhome/millhome.component';
import { MillmasterComponent } from './Mill/millmaster/millmaster.component';
import { ProductaddComponent } from './Mill/productadd/productadd.component';
import { ProductaddviewComponent } from './Mill/productaddview/productaddview.component';
import { CustomerregComponent } from './Guest/customerreg/customerreg.component';
import { CustomerhomeComponent } from './customer/customerhome/customerhome.component';
import { CustomermasterComponent } from './customer/customermaster/customermaster.component';
import { ViewmillComponent } from './customer/viewmill/viewmill.component';
import { MillserviceComponent } from './Mill/millservice/millservice.component';
import { MillserviceviewComponent } from './Mill/millserviceview/millserviceview.component';
import { MillservicedetailsComponent } from './Mill/millservicedetails/millservicedetails.component';
import { ViewmillservicedetailsComponent } from './Mill/viewmillservicedetails/viewmillservicedetails.component';
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
// import { ViewmillserviceComponent } from './Mill/viewmillservice/viewmillservice.component';





@NgModule({
  declarations: [
    AppComponent,
    AdminhomeComponent,
    AdminmasterComponent,
    GuestmasterComponent,
    GuesthomeComponent,
    LoginComponent,
    LocationregisterComponent,
    LocationviewComponent,
    CategoryregComponent,
    CategoryviewComponent,
    SubcategoryRegistrationComponent,
    SubcategoryviewComponent,
    MillComponent,
    MillviewComponent,
    MillhomeComponent,
    MillmasterComponent,
    ProductaddComponent,
    ProductaddviewComponent,
    CustomerregComponent,
    CustomerhomeComponent,
    CustomermasterComponent,
    ViewmillComponent,
    MillserviceComponent,
    MillserviceviewComponent,
    MillservicedetailsComponent,
    ViewmillservicedetailsComponent,
    ViewcustmillcategoryComponent,
    ViewcustmillservicesComponent,
    CustservicesigleviewComponent,
    EditlocationComponent,
    EditcategoryComponent,
    BookingviewComponent,
    ViewbookingComponent,
    PaymentComponent,
    ProductsingleviewComponent,
    CartComponent,
    Report1Component,
    EditsubcategoryComponent,
    CartPaymentComponent,
    Report2Component,
    MyserviceBookingComponent,
    PaymentviewComponent,
    ExcelreportComponent,
    // ViewmillservicesComponent,
    // ViewmillserviceComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
