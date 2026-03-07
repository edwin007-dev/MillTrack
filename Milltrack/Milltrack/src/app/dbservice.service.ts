import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  orderdetails(orderData: { login_id: number; customer_id: number; orderdate: string; product_id: any; totalamount: number; time: string; status: string; quantity: any; unit: any; }) {
    throw new Error('Method not implemented.');
  }
  getCategories: any;
  getSubcategoriesByCategory: any;
  getMillServiceByCategory: any;
  deleteMillService: any;
  getSubcategoryData: any;
  


  constructor(private http: HttpClient) { }
  checklogin(data: any) {
    return this.http.post("http://localhost:3000/checklogin", data).toPromise()
  }

  districtview() {
    return this.http.get("http://localhost:3000/districtview").toPromise()
  }
  
  locationreg(data: any) {
    return this.http.post("http://localhost:3000/locationreg", data).toPromise()
  }
  getdistrictbyid(data: any) {
    return this.http.post("http://localhost:3000/getdistrictbyid", data).toPromise()
  }
  categoryreg(data: any) {
    return this.http.post("http://localhost:3000/categoryreg", data).toPromise()
  }
  categoryview() {
    return this.http.get("http://localhost:3000/categoryview").toPromise()
  }
  subcategoryreg(data: any) {
    return this.http.post("http://localhost:3000/subcategoryreg", data).toPromise()
  }
  subcategoryview() {
    return this.http.get("http://localhost:3000/subcategoryview").toPromise()
  }

  getcategorybyid(data: any) {
    return this.http.post("http://localhost:3000/getcategorybyid", data).toPromise()
  }
  millreg(data: any) {
    return this.http.post("http://localhost:3000/millreg", data).toPromise()
  }
  millservicedetailsreg(data: any) {
    return this.http.post("http://localhost:3000/millservicedetailsreg", data).toPromise()
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `http://localhost:3000/upload`, formData, {
      reportProgress: true, responseType: 'json'
    });
    return this.http.request(req);
  }

  getlocationbyid(data: any) {
    return this.http.post<any>("http://localhost:3000/getlocationbyid", data).toPromise()
  }

  locationview() {
    return this.http.get("http://localhost:3000/locationview").toPromise()
  }

  getmillbylid(data: any) {
    return this.http.post<any>("http://localhost:3000/getmillbylid", data).toPromise()
  }
  millaccept(data: any) {
    return this.http.post<any>("http://localhost:3000/millaccept", data).toPromise()
  }
  millreject(data: any) {
    return this.http.post<any>("http://localhost:3000/millreject", data).toPromise()
  }

  product(data: any) {
    return this.http.post("http://localhost:3000/product", data).toPromise()
  }
  getsubcategorybyid(data: any) {
    return this.http.post("http://localhost:3000/getsubcategorybyid", data).toPromise()
  }
  customerreg(data: any) {
    return this.http.post("http://localhost:3000/customerreg", data).toPromise()
  }
  getmillbyid(data: any) {
    return this.http.post("http://localhost:3000/getmillbyid", data).toPromise()
  }
  viewmill() {
    return this.http.get("http://localhost:3000/viewmill").toPromise()
  }
  viewcategory() {
    return this.http.get("http://localhost:3000/viewcategoy").toPromise()
  }


  //new code 18-02-25

  saveMillCategories(data: any) {
    console.log(data);
    return this.http.post(`http://localhost:3000/millservice`, data).toPromise();
  }

  //code 19-02-25
  addMillServiceDetails(data: any) {
    return this.http.post(`http://localhost:3000/millservicedetails`, data).toPromise();
  }

  getsubcategorybyid1(category_id: any) {
    return this.http.get(`http://localhost:3000/millservicedetails/subcategory/${category_id}`).toPromise();
  }

  //cat based on Mill
  getMillCategories(millid: string) {
    return this.http.get(`http://localhost:3000/millservicedetails/${millid}`).toPromise();
  }

  //view service

  getCategoriesByMillId(millid: string) {
    return this.http.get(`http://localhost:3000/viewmillservicedetails/categories/${millid}`).toPromise();
  }

  getMillServiceDetails(millid: string, category_id: string) {
    return this.http.get(`http://localhost:3000/viewmillservicedetails/${millid}/${category_id}`).toPromise();
  }
  //End

  //code 20-02-2025

  getMillServices(millid: any) {
    return this.http.get('http://localhost:3000/getmillservices/${millid}').toPromise();
  }

  //view millservices

  getServiceCategoriesByMillId(millid: string) {
    console.log(millid);
    return this.http.get(`http://localhost:3000/viewmillservicecategory/${millid}`).toPromise();
  }

  //End of viewmillservices

  //get millcategorycustomer 22-02-25

  loadMillCategories(login_id: any) {
    return this.http.post("http://localhost:3000/viewcategoryincustomer", { login_id }).toPromise();
  }

  getSubcategoriesByMillAndCategory(millid: string, categoryid: string) {

    const url = "http://localhost:3000/viewcustmillservices";
    return this.http.post(url, { millid, categoryid }).toPromise();

  }

  getServiceById(subcat_id: string) {
    return this.http.get(`http://localhost:3000/service/${subcat_id}`).toPromise();
  }

  checkServiceAvailability(subcat_id: string, requiredDate: string): Promise<boolean> {
    return this.http.get<boolean>(`http://localhost:3000/checkAvailability/${subcat_id}/${requiredDate}`)
      .toPromise()
      .then(response => response !== undefined ? response : false) // ✅ Ensure it never returns undefined
      .catch(error => {
        console.error("Error checking availability:", error);
        return false; // ✅ Return `false` if there's an error
      });
  }
  // addToBookingDetails(data: any) {
  //   return this.http.post(`http://localhost:3000/add-booking`, data).toPromise();
  // }

  //get categorydetails

  getlocationdetails(data: any) {
    return this.http.post<any>("http://localhost:3000/getlocationdetails", data).toPromise()
  }

  //End of category details

  //updatecategorydata
  updatelocation(data: any) {
    return this.http.post("http://localhost:3000/updatelocation", data).toPromise()
  }
  deletelocation(data: any) {
    return this.http.delete(`http://localhost:3000/deletelocation?district_id=${data}`).toPromise()
  }

  //End of update
  getcategorydetails(data: any) {
    return this.http.post<any>("http://localhost:3000/getcategorydetails", data).toPromise()
  }

  //End of category details
  deletecategory(data: any) {
    return this.http.delete(`http://localhost:3000/deletecategory?category_id=${data}`).toPromise()
  }
  //updatecategorydata
  updatecategory(data: any) {
    return this.http.post("http://localhost:3000/updatecategory", data).toPromise()
  }
  subcatsingleview(data: any) {
    return this.http.post("http://localhost:3000/subcatsingleview", data).toPromise()

  }
  millservicebyid(data: any) {
    return this.http.post("http://localhost:3000/millservicebyid",data).toPromise()

  }
  addBookingDetail(data: any) {
    console.log("data",data);
    return this.http.post("http://localhost:3000/addbookingdetail", data).toPromise();
  }
  bookingview(data: any) {
    console.log("data",data);
    return this.http.post("http://localhost:3000/bookingview", data).toPromise();
  }
  bookingaccept(data: any) {
    console.log("data",data);
    return this.http.post<any>("http://localhost:3000/bookingaccept", data).toPromise();
}
  bookingreject(data: any) {
    return this.http.post<any>("http://localhost:3000/bookingreject", data).toPromise();
  }
  viewbooking(data: any) {
    return this.http.post<any>("http://localhost:3000/viewbooking", data).toPromise();
  }
  payment(data: any) {
    return this.http.post<any>("http://localhost:3000/payment", data).toPromise()
  }
  getproductbyid(data: any) {
    return this.http.post<any>("http://localhost:3000/getproductbyid", data).toPromise()
  }
  // viewproductsincustomer(data: any) {
  //   return this.http.post<any>("http://localhost:3000/viewproductsincustomer", data).toPromise()
  // }
  loadMillProducts(login_id: any) {
    return this.http.post("http://localhost:3000/viewproductsincustomer", { login_id }).toPromise();
  }
  productsingleview(data: any) {
    return this.http.post("http://localhost:3000/productsingleview", data).toPromise()

  }
  addOrderDetail(data: any) {
    console.log("data",data);
    return this.http.post("http://localhost:3000/addOrderDetail", data).toPromise();
  }
  cart(data: any) {
    return this.http.post("http://localhost:3000/cart", data).toPromise()

  }
  carttotal(data:any) {
    return this.http.post("http://localhost:3000/carttotal",data).toPromise();
}
order(data: any) {
  return this.http.post("http://localhost:3000/order", data).toPromise()

}
removeFromCart(data: any) {
  return this.http.get("http://localhost:3000/removeFromCart", data).toPromise();
}
report1() {
  return this.http.get("http://localhost:3000/report1").toPromise();
}
updatesubcategory(data: any) {
  return this.http.post("http://localhost:3000/updatesubcategory", data).toPromise()
}
getsubcategorydetails(data: any) {
  return this.http.post<any>("http://localhost:3000/getsubcategorydetails", data).toPromise()
}
deletesubcategory(data: any) {
  return this.http.delete(`http://localhost:3000/deletesubcategory?subcat_id=${data}`).toPromise()
}

cartpayment(data: any) {
  return this.http.post(`http://localhost:3000/cartpayment`,data).toPromise()
}
payment1(data: any) {
  return this.http.post(`http://localhost:3000/payment1`,data).toPromise()
}
report2(data:any){
  return this.http.post("http://localhost:3000/report2",data).toPromise()
  }

myservicebooking(data:any){
  return this.http.post("http://localhost:3000/myservicebooking",data).toPromise()
}
paymentview(data:any){
  return this.http.post("http://localhost:3000/paymentview",data).toPromise()
}
closePage() {
  window.close();  // This will close the current tab/window
}
productview() {
  return this.http.get("http://localhost:3000/productview").toPromise();
  }

  
}






