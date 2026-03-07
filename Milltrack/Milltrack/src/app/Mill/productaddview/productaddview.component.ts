import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-productaddview',
  templateUrl: './productaddview.component.html',
  styleUrls: ['./productaddview.component.css']
})

  export class ProductaddviewComponent {
    public categorydataarray:any[]=[];
    
      productviewgroup: any;
      productdataarray: any;
    
      constructor(private fb: FormBuilder, private router:Router,private dbservice: DbserviceService){}
    
      ngOnInit():void{
        this.productviewgroup=this.fb.group({
          category_id:[],
          
        })
      this.dbservice.categoryview().then((data:any)=>{
      this.categorydataarray=data;
      console.log(data);
      });
      }
      getproductbyid() {
        console.log('Hi')
        const id=this.productviewgroup.value.category_id;
        this.dbservice.getproductbyid({id}).then((data:any) =>
{this.productdataarray=data;
        console.log(this.productdataarray)
        });
      }
     }
