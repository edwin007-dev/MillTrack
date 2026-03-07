import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component implements OnInit {
  reportdetails: any;
  reportformgroup!: FormGroup;  // Define the form group properly
  constructor(private fb: FormBuilder, private router: Router, private db: DbserviceService) {}

  ngOnInit(): void {
    // Initialize form inside ngOnInit
    this.reportformgroup = this.fb.group({
      startdate: [''],
      enddate: ['']
    });
  }

  OnSubmit() {
    this.db.report2(this.reportformgroup.value)
      .then((data: any) => {
        this.reportdetails = data;
        console.log(data);
      })
      .catch((error: any) => {
        console.error('Error fetching report:', error);
      });
  }
}