import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-categoryview',
  templateUrl: './categoryview.component.html',
  styleUrls: ['./categoryview.component.css']
})
export class CategoryviewComponent {



public categoryArray:any[]=[];
  // categoryview: any;
  public imageService: ImageService;

constructor(private fb: FormBuilder, private router:Router,private dbservice: DbserviceService, public imgService: ImageService){
  this.imageService = imgService;
}

ngOnInit():void
{
  this.dbservice.categoryview().then((data:any)=>{this.categoryArray=data
console.log(data)

  });
}
Deletecategory(category_id: string) {
  if (!window.confirm('Are you sure you want to delete?')) return;

  this.dbservice.deletecategory( category_id ).then((confirmation: any) => {
    console.log(confirmation);

      if (confirmation.message === "Success") {
          alert('Successfully Deleted');
         window.location.href='/adminmaster/categoryview';
 }
});
}



}




