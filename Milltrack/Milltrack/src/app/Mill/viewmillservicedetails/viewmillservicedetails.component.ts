import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewmillservicedetails',
  templateUrl: './viewmillservicedetails.component.html',
  styleUrls: ['./viewmillservicedetails.component.css']
})
export class ViewmillservicedetailsComponent {

  public categoryArray: any[] = [];
  public millServiceArray: any[] = [];
  public millid!: string;
  public selectedCategory!: string;

  constructor(private fb: FormBuilder, private db: DbserviceService) {}

  ngOnInit(): void {
    this.millid = sessionStorage.getItem('login_id') || localStorage.getItem('login_id') || ''; 

    if (!this.millid) {
      alert("Mill ID is missing. Please log in again.");
      return;
    }

    // Load categories based on millid
    this.db.getCategoriesByMillId(this.millid).then((response: any) => {
      this.categoryArray = response;
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });
  }

  onCategorySelect(event: any) {
    this.selectedCategory = event.target.value;
    
    if (this.selectedCategory) {
      this.db.getMillServiceDetails(this.millid, this.selectedCategory).then((response: any) => {
        this.millServiceArray = response;
        console.log(response)
      }).catch(error => {
        console.error('Error fetching service details:', error);
      });
    }
  }


}
