import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-viewcustmillcategory',
  templateUrl: './viewcustmillcategory.component.html',
  styleUrls: ['./viewcustmillcategory.component.css']
})
export class ViewcustmillcategoryComponent {
  categories: any[] = [];
  products:any[]=[];
  login_id:any;
 // millId = 1; // Replace with the actual logged-in mill's ID
  //login_id=localStorage.getItem('login_id')
  public imageService: ImageService;

  constructor(private route: ActivatedRoute,private dbService: DbserviceService, public imgService: ImageService) {
    this.imageService = imgService;
  }

  ngOnInit() 
  {
    this.route.paramMap.subscribe(params => {
      this.login_id = params.get('login_id'); // Get login_id from URL
      console.log("🔹 Received login_id:", this.login_id);

      //console.log("h");
      this.loadCategories();
      this.loadProducts();
    } 

    );
  }
  
    
     // const login_id=this.login_id;
    
     loadCategories() 
     {
       this.dbService.loadMillCategories(this.login_id).then((data: any) => {
         this.categories = data;
         console.log(data);
       }).catch(error => {
         console.error("Error loading categories:", error);
       });
     }
     loadProducts() 
     {
       this.dbService.loadMillProducts(this.login_id).then((data: any) => {
         this.products = data;
         console.log(data);
       }).catch(error => {
         console.error("Error loading products:", error);
       });
     }
  
  
  }