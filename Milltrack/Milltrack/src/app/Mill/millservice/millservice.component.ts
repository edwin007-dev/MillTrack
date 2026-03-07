import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-millservice',
  templateUrl: './millservice.component.html',
  styleUrls: ['./millservice.component.css']
})


export class MillserviceComponent implements OnInit {
//   return;
//}
// Fetch categories from database
onViewClick() {
throw new Error('Method not implemented.');
}

  public categoryarray: any[] = [];  // Store categories
  millserviceformgroup!: FormGroup;
  millid!: string;  // Store millid from session
  status:any;
  constructor(private fb: FormBuilder, private router: Router, private db: DbserviceService) {
    this.millserviceformgroup = this.fb.group({
      category: this.fb.array([])  // Array to store selected category IDs
    });
  }

  ngOnInit(): void {
    // Retrieve millid from sessionStorage or localStorage
    this.millid = sessionStorage.getItem('login_id') || localStorage.getItem('login_id') || ''; 

    console.log('Retrieved millid:', this.millid); // Debugging

    // if (!this.millid) {
    //   alert("Mill ID is missing. Please log in again.");
    //   this.router.navigate(['/login']); // Redirect to login if millid is missing
    //   return;
    //}

    // Fetch categories from database
    this.db.categoryview().then((response: any) => {
      this.categoryarray = response;
    }).catch(error => {
      console.error('Error fetching categories:', error);
    });
  }

  onCategoryChange(event: any, category_id: string): void {
    const categoryFormArray = this.millserviceformgroup.get('category') as FormArray;

    if (event.target.checked) {
      categoryFormArray.push(this.fb.control(category_id)); // Add selected category
    } else {
      const index = categoryFormArray.controls.findIndex(control => control.value === category_id);
      if (index >= 0) {
        categoryFormArray.removeAt(index); // Remove unselected category
      }
    }
  }

  OnSubmit(): void {
    console.log('Mill ID before submit:', this.millid); // Debugging

    if (!this.millid) {
      alert("Mill ID is missing. Please log in again.");
      return;
    }

    const selectedCategories = this.millserviceformgroup.value.category;
    const requestData = {
      millid: this.millid,
      categories: selectedCategories
    };

    console.log("Submitting data:", requestData); // Debugging

  //   this.db.saveMillCategories(requestData).then((response: any) => {
  //     console.log('Response:', response);
  
  //     if (response.message) {
  //         alert('Categories saved successfully!');
  //         this.router.navigate(['/dashboard']);
  //     }
  // }).catch((error: any) => {
  //     console.error('Error saving categories:', error);
  
  //     if (error.response && error.response.status === 409) {
  //         alert('Categories already exist for this mill.');
  //     } else {
  //         alert('Failed to save categories.');
  //     }
  // });
  

  this.db.saveMillCategories(requestData).then((response: any) => {
    console.log('Response:', response);

    if (response.message === 'Categories saved successfully!') {
        alert('Categories saved successfully!');
        window.location.reload();
    }
}).catch((error: any) => {
    console.error('Error saving categories:', error);

    if (error.status === 409) {  // ✅ Now properly detects the conflict
        alert('Categories already exist for this mill.');
        window.location.reload();
    } else {
        alert('Failed to save categories.');
        window.location.reload();
    }
});


   
  }
}
