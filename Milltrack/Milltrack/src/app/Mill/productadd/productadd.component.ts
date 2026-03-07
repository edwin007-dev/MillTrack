import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent {
calculateTotalAmount: any;
  singleviewgroup: any;
  unit: any;
allowOnlyFloat: any;
stockValue: any;
preventTextPaste: any;
onView() {
throw new Error('Method not implemented.');
}


  selectedFiles?: FileList;
  currentFile?: any;
  fileInfos?: Observable<any>;
  message = '';
  categorydata: any;
  subcategorydata:any
 
 
  constructor(private fb: FormBuilder, private router: Router, private db: DbserviceService) { }


  ngOnInit(): void {
    // this.login_id=localStorage.getItem('login_id')
   
    this.db.categoryview().then((data:any)=>{this.categorydata=data;
       console.log(this.categorydata)
    }); }


  productaddform = this.fb.group(
  {
  category_id: [''],
   productname: [''],
   image: [''],
   description: [''],
   price: [''],
   stock: [''],
   quantity:[''],
   login_id:localStorage.getItem('login_id'),
   unit: ['Kilo'] // Default value for unit selection
   
   }
  )
 
  //File Upload
  selectFile(event: any): void {
  this.selectedFiles = event.target.files;
  console.log(event.target.files);
  }
  // End of upload
  onSubmit() {
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
  
  
  this.productaddform.value.image = this.currentFile.name;
  this.db.product(this.productaddform.value).then((confirmation: any) => {
  //console.log(confirmation);
  if (confirmation.message == "success") {
  alert('product details added')
  this.router.navigate(['/millhome'])
  }
  else {
  alert('Data not inserted, Please check your data')
  }
  })
  }
  }

  getcategorybyid()
  {
 
    const id=this.productaddform.value.category_id;
    console.log(id)
    this.db.getcategorybyid({id}).then((data:any)=>{
      this.subcategorydata=data;
      console.log(this.subcategorydata);
    });
  }
  // getsubcategorybyid(){
  //   console.log('hi')
  //   const id=this.productaddform.value.category_id;
  //   this.db.getsubcategorybyid({id}).then((data:any)=>{
  //     this.categorydata=data;
  //   });
  // }


}
    


  
  


 
