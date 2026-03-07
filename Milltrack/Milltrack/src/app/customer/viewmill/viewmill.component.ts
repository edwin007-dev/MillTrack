import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewmill',
  templateUrl: './viewmill.component.html',
  styleUrls: ['./viewmill.component.css']
})
export class ViewmillComponent {
showImage($event: Event) {
throw new Error('Method not implemented.');
}
   public districtdataarray: any[] = [];
  
    public locationdataarray: any[] = [];
    public milldataarray: any[] = [];
    millformgroup: any;
    millid: number | null = null;

    // !: FormGroup;
    constructor(private fb: FormBuilder, private router: Router, private dbservice: DbserviceService) { }
  
    ngOnInit(): void {

      // //Get millid
      // const millid = this.router.paramMap.get('millid');
      // console.log("Received mill ID:", millid);

      // //End of millid

      //this.millid = Number(this.router.snapshot.paramMap.get('millid'));
    
      this.millformgroup = this.fb.group({
        district_id: [''],
        location_id: ['']
      })
      this.dbservice.viewmill().then((data: any) => {
        this.milldataarray = data;
         console.log(this.locationdataarray)
      });
      this.dbservice.districtview().then((data: any) => {
        this.districtdataarray = data;
       // console.log(data);
      });
      

// this.dbservice.categoryview().then((data:any)=>{
// this. milldataarray=data});
// }
    }
    
    getdistrictbyid() {
      const district_id = this.millformgroup.value.district_id;
      console.log(district_id)
      this.dbservice.getdistrictbyid({ district_id }).then((data: any) => {
        this.locationdataarray = data;
        //console.log(this.locationdataarray)
      });
    
    }
    getmillbyid() {
      const location_id = this.millformgroup.value.location_id;
      this.dbservice.getmillbylid({ location_id }).then((data: any) => {
        this.milldataarray = data;
         console.log(this.locationdataarray)
      });
    }

    //newe code -20-02-2025

    viewMillServices(millid: number) 
    {
      if (!millid) {
        console.error("Error: Mill ID is undefined!");
        return;
      }
      console.log("Navigating to mill services with ID:", millid);
      this.router.navigate(['/viewmillservices', millid]);
    }
    
   
  
  }
  
  
  