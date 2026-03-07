import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  login_id: string | null = null;
  bookingdetails_id: string | null = null;
  customer_id: string | null = null;
  PaymentArray: any[] = [];
  paymentform!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dbservice: DbserviceService
  ) {
    // Get the parameters from the route
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.bookingdetails_id = params.get('bookingdetails_id');
      this.customer_id = params.get('customer_id');
    });
  }

  ngOnInit(): void {
    this.login_id = localStorage.getItem("login_id");

    if (!this.login_id) {
      alert("Error: You are not logged in!");
      this.router.navigate(['/login']);
      return;
    }

    this.paymentform = this.fb.group({
      bookingdetails_id: [this.bookingdetails_id, Validators.required],
      login_id: [this.login_id],
      amount: ['']
    });

    this.loadPaymentDetails();
  }

  loadPaymentDetails(): void {
    console.log("🔍 Fetching payment details...");

    this.dbservice.viewbooking({ login_id: this.login_id, id: this.bookingdetails_id })
      .then((data: any) => {
        console.log("📌 API Response:", data);

        if (data && data.length > 0) {
          this.PaymentArray = data.filter((item: any) => item.bookingdetails_id == this.bookingdetails_id);

          if (this.PaymentArray.length > 0) {
            console.log("✅ Filtered PaymentArray:", this.PaymentArray);

            // ✅ Update the form with the amount
            this.paymentform.patchValue({
              amount: this.PaymentArray[0].amount
            });

          } else {
            console.warn("⚠ No matching payment record found.");
          }
        } else {
          console.warn("⚠ No payment data found.");
        }
      })
      .catch((error) => {
        console.error("❌ Error fetching payment data:", error);
      });
  }

  Onsubmit(): void {
    console.log("🚀 Submitting payment form:", this.paymentform.value);

    this.dbservice.payment(this.paymentform.value)
      .then((confirmation: any) => {
        if (confirmation.message === "Success") {
          alert('✅ Payment Successfully Finished');
          this.router.navigate(['Usermaster/catview']);
        } else {
          alert('❌ Data not inserted, please check');
        }
      })
      .catch((error) => {
        console.error("❌ Error during payment:", error);
        alert("❌ Payment failed. Please try again.");
      });
  }
}