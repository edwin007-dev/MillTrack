import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-locationregister',
  templateUrl: './locationregister.component.html',
  styleUrls: ['./locationregister.component.css']
})
export class LocationregisterComponent {
  savestatus=false;

  validationstatus: string | null = null;
    
  public districtdataarray:any[]=[];
  public locationdataarray:any[]=[];


  
  constructor(private fb: FormBuilder, private router:Router,private dbservice: DbserviceService){}
  locationformgroup=this.fb.group({
    locationname:['',Validators.required],
    district_id:['',Validators.required]
  })
     
ngOnInit():void
{
this.dbservice.districtview().then((data:any)=>{
this.districtdataarray=data;
console.log(data);
});
}
  Onsubmit() {
    console.log(this. locationformgroup.value)
    if (!this.locationformgroup.valid) {
      this.savestatus = true;
      // alert('Please enter valid data.');
      return;
    }
    this.dbservice.locationreg(this. locationformgroup.value).then((confirmation: any) => {
    if (confirmation.message == "Success") {
    alert('Registered Successfully')
    this.router.navigate(['adminmaster/categoryview'])
    }
    else {
    alert('Data do not insert,please check')
    }
    })
  }
}
