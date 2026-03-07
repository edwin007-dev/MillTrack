import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-millview',
  templateUrl: './millview.component.html',
  styleUrls: ['./millview.component.css']
})
export class MillviewComponent implements OnInit {
  public districtdataarray: any[] = [];

  public locationdataarray: any[] = [];
  public milldataarray: any[] = [];
  millformgroup!: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private dbservice: DbserviceService) { }

  ngOnInit(): void {
    this.millformgroup = this.fb.group({
      district_id: [''],
      location_id: ['']
    })
    this.dbservice.districtview().then((data: any) => {
      this.districtdataarray = data;
      console.log(data);
    });
  }
  getdistrictbyid() {
    const district_id = this.millformgroup.value.district_id;
    console.log(district_id)
    this.dbservice.getdistrictbyid({ district_id }).then((data: any) => {
      this.locationdataarray = data;
      console.log(this.locationdataarray)
    });
  }

  viewmillbylid() {
    const location_id = this.millformgroup.value.location_id;
    this.dbservice.getmillbylid({ location_id }).then((data: any) => {
      this.milldataarray = data;
      // console.log(this.locationdataarray)
    });
  }

  millaccept(login_id: string) {
    this.dbservice.millaccept({ login_id }).then((confirmation: any) => {
      if (confirmation.message === "success") {
        alert('Successfully updated')
        window.location.href = '/adminmaster/millview'

      }
    })

  }
  millreject(login_id: string) {
    this.dbservice.millreject({ login_id }).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Successfully rejected')
        window.location.href = '/adminmaster/millview'
      }
    })

  }
}


