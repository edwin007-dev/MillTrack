import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-myservice-booking',
  templateUrl: './myservice-booking.component.html',
  styleUrls: ['./myservice-booking.component.css']
})
export class MyserviceBookingComponent {
  showAccepted = false;
  showRejected = false;
  showRequested = false;

  acceptedOrders :any []=[];
  rejectedOrders  :any []=[];
  requestedOrders  :any []=[];
data: any;

  constructor(
      private db: DbserviceService, private router: Router,private fb: FormBuilder
    ) {}

  toggleSection(section: string) {
    if (section === 'accepted') this.showAccepted = !this.showAccepted;
    if (section === 'rejected') this.showRejected = !this.showRejected;
    if (section === 'requested') this.showRequested = !this.showRequested;
  }

  ngOnInit(){

    const id=localStorage.getItem('login_id');
    this.db.myservicebooking({id}).then((data:any) =>
      {
        if (data) {
          this.acceptedOrders = data.acceptedOrders || [];  // Assign accepted orders
          this.rejectedOrders = data.rejectedOrders || [];  // Assign rejected orders
          this.requestedOrders = data.requestedOrders || []; // Assign requested orders
        }
              });

  }
}
