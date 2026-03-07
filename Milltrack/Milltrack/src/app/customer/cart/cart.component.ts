import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

    login_id = localStorage.getItem("login_id");
    ProductArray: any[] = [];
    carttotal: any[] = [];
    totalamount: number = 0;
    showPaymentButton: boolean = false; // Initially hidden
  
    constructor(private router: Router, private dbservice: DbserviceService, private ngZone: NgZone) {}
  
    ngOnInit(): void {
      this.dbservice.cart({ login_id: this.login_id }).then((data: any) => {
        this.ProductArray = data;
      });
  
      this.dbservice.carttotal({ login_id: this.login_id }).then((data: any) => {
        this.carttotal = data;
        this.totalamount = this.carttotal[0]?.totalamount || 0;
      });
    }
  
    book(): void {
      if (this.ProductArray.length === 0) {
        alert("Your cart is empty!");
        return;
      }
  
      const productIds = this.ProductArray.map(item => item.productid);
  
      this.dbservice.order({ 
        login_id: this.login_id, 
        price: this.totalamount, 
        totalamount: this.totalamount, 
        productid: productIds 
      }).then((response: any) => {
        if (response.success) {
          alert("Booking confirmed!");
          
          // Show the payment button
          this.showPaymentButton = true;
  
        } else {
          alert("Booking failed. Please try again.");
        }
      }).catch(error => {
        console.error("Error during booking:", error);
        alert("An error occurred. Please try again later.");
      });
    }
  
    proceedToPayment(): void {
      this.router.navigate(['/customermaster/cartpayment']).then(() => {
        console.log("Navigated to Payment Page");
      }).catch(err => {
        console.error("Navigation failed:", err);
      });
    }
  }
  