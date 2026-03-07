import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-subcategory-registration',
  templateUrl: './subcategoryreg.component.html',
  styleUrls: ['./subcategoryreg.component.css']
})
export class SubcategoryRegistrationComponent implements OnInit {
  savestatus=false;

  validationstatus: string | null = null;
  selectedFiles?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;
  message = '';
  categorydata: any;
  constructor(private fb: FormBuilder, private router: Router, private db: DbserviceService) { }
  SubcategoryForm = this.fb.group(
  {
  subcatname: ['',Validators.required],
  category_id: ['',Validators.required],
   image: ['',Validators.required], 
   description: ['',Validators.required]
  }
  )
  ngOnInit(): void {
   
    this.db.categoryview().then((data:any)=>{this.categorydata=data;
       console.log(this.categorydata)
    });
    
  }
  //File Upload
  selectFile(event: any): void {
  this.selectedFiles = event.target.files;
  console.log(event.target.files);
  }
  // End of upload
  onSubmit() {
    if (!this.SubcategoryForm.valid) {
      this.savestatus = true;
      // alert('Please enter valid data.');
      return;
    }
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
  this.SubcategoryForm.value.image = this.currentFile.name;
  this.db.subcategoryreg(this.SubcategoryForm.value).then((confirmation: any) => {
  //console.log(confirmation);
  if (confirmation.message == "Success") {
  alert('category details added')
  this.router.navigate(['/adminmaster/subcategoryview'])
  }
  else {
  alert('Data not inserted, Please check your data')
  }
  })
  }
  }
  }
