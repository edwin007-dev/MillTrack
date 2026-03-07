import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-editlocation',
  templateUrl: './editlocation.component.html',
  styleUrls: ['./editlocation.component.css']
})
export class EditlocationComponent {
  locationid: any; // Correct the property name to 'ategoryId'
  public locationArray: any;
  EditLocationFormGroup!: FormGroup;
districtdataarray: any;

  constructor(private fb: FormBuilder, private router :Router, private route: ActivatedRoute, private dbservice: DbserviceService) {
    route.paramMap.subscribe((params: ParamMap) => {
      this.locationid = params.get('id')
    })

    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.CourseId = params.get('id'); // Use 'CourseId' here
    // });
  }


  //page load
  ngOnInit(): void {
    this.EditLocationFormGroup = this.fb.group({
      location_id: [''], // Use 'CategoryId' here
      locationname: [''],
      districtname:['']
      
    })
    const id = this.locationid;
    console.log(id);
    this.dbservice.getlocationdetails({ id }).then((data: any) => { // Use 'CategoryId' here
      this.locationArray = data;
      console.log(this.locationArray);
      this.EditLocationFormGroup.setValue({
        location_id: data[0].location_id, // Use 'CourseId' here
        locationname: data[0].locationname,
        districtname: data[0].districtname,

        
      });
    });
  }
  //End of page load

  //Submit code

  onSubmit()
  {
   this.dbservice.updatelocation(this.EditLocationFormGroup.value)
   .then((confirmation: any) => {
   if (confirmation.message === "Success") 
   {
     
   alert('Location Details Updated')
   this.router.navigate(['/adminmaster/locationview'])
   }})
   }
}


