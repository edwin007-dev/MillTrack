import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-millserviceview',
  templateUrl: './millserviceview.component.html',
  styleUrls: ['./millserviceview.component.css']
})
export class MillserviceviewComponent {
  millserviceviewgroup!: FormGroup;
  productdataarray: any[] = [];  // Stores categories & subcategories
  millserviceviewarray: any[] = [];
  subcategorydataarray:any[]=[];
  productviewgroup: any;
  millid: any
  categorydataarray: any;
  login_id=localStorage.getItem('login_id')
  public imageService: ImageService;
  constructor(private fb: FormBuilder, private dbService: DbserviceService, public imgService: ImageService) {
    this.imageService = imgService;
  }

  ngOnInit(): void {
    // Initialize the form
    this.millserviceviewgroup = this.fb.group({
      category_id: [''],
      subcat_id: ['']
    });

   

    // 🔹 Fetch all categories & subcategories
   const login_id=this.login_id;

    // Fetch categories based on millid
    this.dbService.millservicebyid({login_id}).then((data: any) => {
      this.categorydataarray= data;
      console.log(data)
   
  })
}




 
 
      

  // 🔹 Fetch services when category & subcategory are selected
  getsubcategorybyid() {
    const categoryId = this.millserviceviewgroup.get('category_id')?.value;
    const subcatId = this.millserviceviewgroup.get('subcat_id')?.value;

    if (categoryId && subcatId) {
      this.dbService.getMillServiceByCategory(categoryId, subcatId).subscribe((res: any) => {
        if (res.success) {
          this.millserviceviewarray = res.data;
        }
      });
    }
  }

  // 🔹 Edit service (Implement navigation or modal popup)
  editService(service: any) {
    console.log("Editing:", service);
    // Navigate to edit page or open modal (Customize this as needed)
  }

  // 🔹 Delete service
  deleteService(serviceId: number) {
    if (confirm("Are you sure you want to delete this service?")) {
      this.dbService.deleteMillService(serviceId).subscribe((res: any) => {
        if (res.success) {
          alert("Service deleted successfully!");
          this.getsubcategorybyid();  // Refresh list
        }
      });
    }
  }
}


