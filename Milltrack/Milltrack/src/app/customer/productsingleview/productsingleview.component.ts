import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-productsingleview',
  templateUrl: './productsingleview.component.html',
  styleUrls: ['./productsingleview.component.css']
})
export class ProductsingleviewComponent {
  productdataarray: any = {}; // Ensure it's initialized as an object
  product_id: any;
  quantity: number = 1; // Default quantity
  totalAmount: number = 0;
  price: number = 0; // Default price to prevent NaN
  unit: string = 'kilo'; // Default unit selection
  productsingleviewgroup!: FormGroup;
  stock: any;
  ordered: any;
  sold: any;
  customer_id: any;
  login_id: any;

  constructor(
    private dbService: DbserviceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router:Router
  ) {
    this.product_id = this.route.snapshot.paramMap.get('product_id');
    console.log("subcat:", this.product_id);
  }

  ngOnInit(): void {
    this.productsingleviewgroup = this.fb.group({
      quantity: [''],
      amount: [''],
      product_id: this.product_id,
      status: [''],
      unit: [''] // Default value for unit selection
    });

    const product_id = this.product_id;
    console.log("Sending product_id to API:", product_id); // ✅ Debugging log

    this.dbService.productsingleview({ product_id }).then((data: any) => {
      console.log("Data received:", data); // ✅ Debugging log

      if (data.length === 0) {
        console.error("No data found for product_id:", product_id);
      } else {
        this.productdataarray = data;
      }
    });
  }

  calculateTotalAmount() {
    this.price = this.productdataarray[0]?.price || 0; // Prevents NaN if data is missing
    this.quantity = this.productsingleviewgroup.value.quantity;
    this.unit = this.productsingleviewgroup.value.unit; // Get the selected unit

    if (this.price > 0 && this.quantity > 0) {
      this.totalAmount = this.quantity * this.price;
      this.productsingleviewgroup.get('amount')?.setValue(this.totalAmount);
    } else {
      this.totalAmount = 0;
    }
  }

  // ✅ Booking Function
  bookNow() {
    this.login_id = localStorage.getItem('login_id') || null;
  
    if (!this.login_id) {
      alert("User not logged in. Please log in first.");
      return;
    }
  
    const orderData = {
      login_id: this.login_id,
      customer_id: this.customer_id,
      orderdate: new Date().toISOString().slice(0, 10),
      product_id: this.product_id,
      totalamount: this.totalAmount,
      time: new Date().toLocaleTimeString(),
      status: "Pending",
      quantity: this.productsingleviewgroup.value.quantity,
      unit: this.productsingleviewgroup.value.unit,
    };
  
    console.log("Sending order data:", orderData); // Debugging log
  
    this.dbService.addOrderDetail(orderData).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Request successfully sent');
        this.router.navigate(['customermaster/cart']);
      }
    });
  }
  

}