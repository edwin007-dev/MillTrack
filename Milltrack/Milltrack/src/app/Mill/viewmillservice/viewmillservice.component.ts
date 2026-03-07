import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewmillservice',
  templateUrl: './viewmillservice.component.html',
  styleUrls: ['./viewmillservice.component.css']
})
export class ViewmillserviceComponent 

{
  millid!: string;
  serviceCategories: any[] = [];

  constructor(private route: ActivatedRoute, private dbservice: DbserviceService) {
    console.log("ViewMillServiceComponent Constructor Called");

  }

  ngOnInit(): void
   {
    console.log("hi");
    // Get millid from URL
    this.millid = sessionStorage.getItem('login_id') || localStorage.getItem('login_id') || ''; 
    console.log("The Mill id is"+this.millid);
    // Fetch service categories for the given mill
    this.getServiceCategories();
  }

  getServiceCategories(): void {
    this.millid = sessionStorage.getItem('login_id') || localStorage.getItem('login_id') || ''; 
    this.dbservice.getServiceCategoriesByMillId(this.millid).then((data: any) => {
      this.serviceCategories = data;
    }).catch(err => {
      console.error('Error fetching service categories:', err);
    });
  }
}
