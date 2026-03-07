import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-mill',
  templateUrl: './mill.component.html',
  styleUrls: ['./mill.component.css']
})
export class MillComponent {
  savestatus=false;

  validationstatus: string | null = null;
  public districtdata:any[]=[];
public locationdata:any
public categoryarray:any[]=[];

  // millgroup: any;
  // millreg: any;
   selectedFiles?: FileList;
    currentFile?: any;
    fileInfos?: Observable<any>;
    message = '';
    categorydata: any;

 
constructor(private db:DbserviceService,private fb:FormBuilder,private router:Router) { }

millgroup=this.fb.group({
  name:['',Validators.required],
  license:['',Validators.required],
  phone:['',Validators.required],
district_id:['',Validators.required],
location_id:['',Validators.required],
email:['',Validators.required,],
landmark:['',Validators.required],
pincode:['',Validators.required,],
image:['',Validators.required],
username:['',Validators.required],
password:['',Validators.required],
count:['',Validators.required],
category: this.fb.array([])
})



ngOnInit(): void {
  

  this.db.categoryview().then((data:any)=>{
    this.categoryarray=data
  });


this.db.districtview().then((data:any)=>{this.districtdata=data;
console.log(this.districtdata)
});
}







// onCategoryChange(event: any, category_id: string): void {
//   const categoryFormArray = this.millgroup.get('category') as FormArray;

//   if (event.target.checked) {
//     // Add category ID to the form array when checked
//     categoryFormArray.push(this.fb.control(category_id));
//   } else {
//     // Remove category ID from the form array when unchecked
//     const index = categoryFormArray.controls.findIndex(control => control.value === category_id);
//     if (index >= 0) {
//       categoryFormArray.removeAt(index);
//     }
//   }

// }


//File Upload
selectFile(event: any): void {
  this.selectedFiles = event.target.files;
  console.log(event.target.files);
  }
  // End of upload
  Onsubmit() {
    
    // if (!this.millgroup.valid) {
    //   console.log('hi');
    //   this.savestatus = true;
    //   alert('Please Fill in all the fields')
    //   // alert('Please enter valid data.');
    //   return;
    // }
    
  // fileupload
  if (this.selectedFiles) {
  //console.log(this.selectedFiles);
  console.log(this.selectedFiles.item(0));
  const file: File | null = this.selectedFiles.item(0);
  if (file) {
  this.currentFile = file;
  //console.log(this.currentFile);
  this.db.upload(this.currentFile).subscribe(
  (event: any) => {
  this.message = event.body.message;
  });
  }
  // this.db.viewcategory().then((data: any) => {
  //   this.categorydata = data;
  //   console.log(this.categorydata)
  
  
  // });
  // End of upload
  //console.log(this.DepartmentFormGroup.value)
  this.millgroup.value.image = this.currentFile.name;
  this.db.millreg(this.millgroup.value).then((confirmation: any) => {
  //console.log(confirmation);
  if (confirmation.message == "Success") {
  alert('mill details added')
  this.router.navigate(['/guestmaster/guesthome'])
  }
  else {
  alert('Data not inserted, Please check your data')
  }
  })

  }
}


getlocationbyid()
{
  // console.log('hai')
  const district_id=this.millgroup.value.district_id;
  console.log(district_id)
  this.db.getlocationbyid({district_id}).then((data: any) =>{
  this.locationdata = data;
  console.log(this.locationdata)
  });
}

  }







