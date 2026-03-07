import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-cart-payment',
  templateUrl: './cart-payment.component.html',
  styleUrls: ['./cart-payment.component.css']
})
export class CartPaymentComponent implements OnInit {
  carttotal: any[] = [];
  paymentform: FormGroup;

  constructor(
    private router: Router,
    private dbservice: DbserviceService,
    private fb: FormBuilder
  ) {
    // Initialize the form group structure
    this.paymentform = this.fb.group({
      login_id: [''],
      order_id: [''],
      amount: ['']
    });
  }

  ngOnInit(): void {
    const loginid = localStorage.getItem('login_id');

    this.dbservice.cartpayment({ loginid }).then((data: any) => {
      this.carttotal = data;
      console.log('🛒 Cart Data:', this.carttotal);

      if (this.carttotal.length > 0) {
        this.paymentform.patchValue({
          login_id: loginid,
          order_id: this.carttotal[0].order_id,
          amount: this.carttotal[0].totalamount
        });
      }
    }).catch(error => {
      console.error('❌ Error fetching cart data:', error);
      alert("Failed to load cart details. Please try again.");
    });
  }

  Onsubmit(): void {
    console.log('🧾 Payment Form Values:', this.paymentform.value);

    this.dbservice.payment1(this.paymentform.value).then((confirmation: any) => {
      console.log('✅ Payment Response:', confirmation);

      if (confirmation.message && confirmation.message.toLowerCase().includes("success")) {
        alert('✅ Payment Successfully Finished');
        this.router.navigate(['customermaster/customerhome']);
      } else {
        alert('❌ Data not inserted, please check the server response');
      }
    }).catch((error) => {
      console.error("❌ Error during payment:", error);
      alert("❌ Payment failed. Please try again.");
    });
  }
}
