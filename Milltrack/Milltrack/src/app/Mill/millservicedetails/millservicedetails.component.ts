import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-millservicedetails',
  templateUrl: './millservicedetails.component.html',
  styleUrls: ['./millservicedetails.component.css']
})
export class MillservicedetailsComponent {

  millserviceformgroup!: FormGroup;
  categoryarray: any[] = [];
  subcategoryarray: any[] = [];
  millid!: string;
  onView: any;
  onViewClick: any;
  login_id = localStorage.getItem('login_id');


  constructor(private fb: FormBuilder, private router: Router, private db: DbserviceService) {
    this.millserviceformgroup = this.fb.group({
      category_id: ['', Validators.required],
      subcat_id: ['', Validators.required],
      millid: localStorage.getItem('login_id'),
      amount: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    const login_id = this.login_id;
    this.db.millservicebyid({ login_id }).then((data: any) => {
      this.categoryarray = data
      console.log(data)


    })
  }
  onCategoryChange(): void {
    const category_id = this.millserviceformgroup.get('category_id')?.value;
    console.log(category_id);
    if (category_id) {
      this.db.getsubcategorybyid1(category_id).then((response: any) => {
        this.subcategoryarray = response;
        console.log(response)
      }).catch(error => {
        console.error('Error fetching subcategories:', error);
      });
    }
  }

  OnSubmit(): void {

    if (!this.millserviceformgroup.valid){
      this.millserviceformgroup.markAllAsTouched(); 
      return;
    }
    console.log(this.millserviceformgroup.value)
    this.db.millservicedetailsreg(this.millserviceformgroup.value).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Service details added successfully!');
        window.location.reload();
      }
      else if (confirmation.message === "Failed") {
        alert('You have already registered this service');
        window.location.reload();
      }
      else {
        alert('Something went wrong, Please Try again!');
      }
    });
     
  }

}
