import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-paymentview',
  templateUrl: './paymentview.component.html',
  styleUrls: ['./paymentview.component.css']
})
export class PaymentviewComponent {


  public servicePayments: any[] = [];
  public orderPayments: any[] = [];
  login_id: any;

  constructor(private fb: FormBuilder, private router: Router, private dbservice: DbserviceService) {}

  ngOnInit(): void {
    this.login_id = localStorage.getItem('login_id');
    const login_id = this.login_id;

    this.dbservice.paymentview({ login_id }).then((data: any) => {
      console.log(data);
      // Separate data based on type
      this.servicePayments = data.filter((item: any) => item.type === 'service');
      this.orderPayments = data.filter((item: any) => item.type === 'order');
    });
  }
}