import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-locationview',
  templateUrl: './locationview.component.html',
  styleUrls: ['./locationview.component.css']
})
export class LocationviewComponent  implements OnInit{


      public districtdataarray:any[]=[];
     
      locationdataarray: any;
      constructor(private fb: FormBuilder, private router:Router,private dbservice: DbserviceService){}
      locationformgroup=this.fb.group({
        district_id:['']
      })
      ngOnInit():void{
      this.dbservice.districtview().then((data:any)=>{
      this.districtdataarray=data;
      console.log(data);
      });
      }
      Deletelocation(location_id: string) {
        if (!window.confirm('Are you sure you want to delete?')) return;
    
        this.dbservice.deletelocation( location_id ).then((confirmation: any) => {
          console.log(confirmation);
          
            if (confirmation.message === "Success") {
                alert('Successfully Deleted');
               window.location.href='/adminmaster/locationview';
       }
  });
    }

      getdistrictbyid() {
        console.log('Hi')
        const district_id=this.locationformgroup.value.district_id;
        console.log(district_id)
        this.dbservice.getdistrictbyid({district_id}).then((data:any) =>
{this.locationdataarray=data;
        console.log(this.locationdataarray)
        });}}
    