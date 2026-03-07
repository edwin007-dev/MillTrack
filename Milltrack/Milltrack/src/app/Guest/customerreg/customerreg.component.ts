import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-customerreg',
  templateUrl: './customerreg.component.html',
  styleUrls: ['./customerreg.component.css']
})
export class CustomerregComponent implements OnInit {
  customergroup!: FormGroup;
  public districtdata: any[] = [];
  public locationdata: any[] = [];
  savestatus = false;
  
  validationstatus: string | null = null;

  constructor(private db: DbserviceService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.customergroup = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      district_id: ['', Validators.required],
      location_id: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.db.districtview().then((data: any) => {
      this.districtdata = data;
    });
  }

  getlocationbyid() {
    const district_id = this.customergroup.value.district_id;
    if (!district_id) return;

    this.db.getlocationbyid({ district_id }).then((data: any) => {
      this.locationdata = data || [];
    }).catch(error => console.error("Error fetching locations:", error));
  }

  Onsubmit() {
    console.log("Submitting form:", this.customergroup.value);

    if (!this.customergroup.valid) {
      this.savestatus = true;
      alert(' Please enter valid data in all fields.');
      return;
    }

    this.db.customerreg(this.customergroup.value).then((confirmation: any) => {
      console.log("Server response:", confirmation);

      // Check for success flag
      if (confirmation.success) {
        alert(' Customer registered successfully!');
        this.router.navigate(['/guestmaster/guesthome']);
      } else {
        alert(' Registration failed. Please try again.');
      }
    }).catch((error) => {
      console.error('Error during registration:', error);

      if (error.status === 409) {
        alert(' Username, email, or phone number already exists. Please try a different one.');
      } else {
        alert(' An unexpected error occurred. Please try again later.');
      }
    });
  }
}