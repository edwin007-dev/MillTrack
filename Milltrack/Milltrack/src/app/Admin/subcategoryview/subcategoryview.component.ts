import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-subcategoryview',
  templateUrl: './subcategoryview.component.html',
  styleUrls: ['./subcategoryview.component.css']
})
export class SubcategoryviewComponent {
  // categoryview: any;
public categorydataarray:any[]=[];
public  subcategorydataarray:any[]=[]; 
  subcategoryformgroup: any;
Deletesubcategory: any;

      constructor(private fb: FormBuilder, private router:Router,private dbservice: DbserviceService){}
    
      ngOnInit():void{
        this.subcategoryformgroup=this.fb.group({
          category_id:[],
          

        })
      this.dbservice.categoryview().then((data:any)=>{
      this.categorydataarray=data;
      console.log(data);
      });
      }

      deletesubcategory(subcat_id: string) {
        if (!window.confirm('Are you sure you want to delete?')) return;
      
        this.dbservice.deletesubcategory( subcat_id ).then((confirmation: any) => {
          console.log(confirmation);
          
            if (confirmation.message === "Success") {
                alert('Successfully Deleted');
               window.location.href='/adminmaster/subcategoryview';
       }
      });
      }
      
      getcategorybyid() {
        console.log('Hi')
        const id=this.subcategoryformgroup.value.category_id;
        this.dbservice.getcategorybyid({id}).then((data:any) =>
{this.subcategorydataarray=data;
        console.log(this.subcategorydataarray)
        });}}

        
    
        
