import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

declare var bootstrap: any; // Required to use Bootstrap Modal JS

@Component({
  selector: 'app-bookingview',
  templateUrl: './bookingview.component.html',
  styleUrls: ['./bookingview.component.css']
})
export class BookingviewComponent {
  public bookingarray: any = [];
  login_id: any;
  bookingformgroup!: FormGroup;
  bookingdetails_id: any;
  acceptForm: FormGroup;
  selectedBookingId: string = '';
  modalInstance: any;

  constructor(private fb: FormBuilder, private router: Router, private dbservice: DbserviceService) {
    this.acceptForm = this.fb.group({
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.login_id = localStorage.getItem('login_id');
    const id = this.login_id;
    this.loadBookings(id);
  }

  loadBookings(id: any) {
    this.dbservice.bookingview({ id }).then((data: any) => {
      this.bookingarray = data;
    });
  }

  openModal(bookingId: string) {
    this.selectedBookingId = bookingId;
    const modalElement = document.getElementById('acceptModal');
    this.modalInstance = new bootstrap.Modal(modalElement);
    this.modalInstance.show();
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.acceptForm.reset(); // optional: reset form after close
  }

  submitBooking() {
    const timeValue = this.acceptForm.value.time;

    if (!timeValue) {
      alert("Please enter a valid time");
      return;
    }

    this.dbservice.bookingaccept({
      bookingdetails_id: this.selectedBookingId,
      time: timeValue
    }).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Successfully Accepted your request');
        this.closeModal(); // close the modal
        this.loadBookings(this.login_id); // refresh data
      }
    });
  }

  bookingreject(bookingdetails_id: string) {
    this.dbservice.bookingreject({ bookingdetails_id }).then((confirmation: any) => {
      if (confirmation.message === "rejected") {
        alert('Rejected your Request');
        this.loadBookings(this.login_id); // refresh data
      }
    });
  }
  
}