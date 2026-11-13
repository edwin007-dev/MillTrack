import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-custservicesigleview',
  templateUrl: './custservicesigleview.component.html',
  styleUrls: ['./custservicesigleview.component.css']
})
export class CustservicesigleviewComponent implements OnInit {
  subcategorydataarray: any = {}; // Ensure it's initialized as an object
  subcat_id: any;
  millid:any;
  quantity: number = 1; // Default quantity
  totalAmount: number = 0;
  price: number = 0; // Default price to prevent NaN
  unit: string = 'kilo'; // Default unit selection
  singleviewgroup!: FormGroup;
  public imageService: ImageService;

  constructor(
    private dbService: DbserviceService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public imgService: ImageService
  ) {
    this.imageService = imgService;
    this.subcat_id = this.route.snapshot.paramMap.get('subcat_id');
    console.log("subcat:",this.subcat_id);
  }

  ngOnInit(): void {
    this.singleviewgroup = this.fb.group({
      customerid:localStorage.getItem('login_id'),
      millid:localStorage.getItem('millid'),
      quantity: [''],
      amount: [''],
      requireddate: [''],
      subcat_id: this.subcat_id,
      unit: ['kilo'] // Default value for unit selection
    });

    const subcat_id = this.subcat_id;
    console.log("Sending subcat_id to API:", subcat_id); // ✅ Debugging log

    this.dbService.subcatsingleview({ subcat_id }).then((data: any) => {
      console.log("Data received:", data); // ✅ Debugging log

      if (data.length === 0) {
        console.error("No data found for subcat_id:", subcat_id);
      } else {
        this.subcategorydataarray = data;
      }
    });
  }

  calculateTotalAmount() {
    this.price = this.subcategorydataarray[0]?.amount || 0; // Prevents NaN if data is missing
    this.quantity = this.singleviewgroup.value.quantity;
    this.unit = this.singleviewgroup.value.unit; // Get the selected unit

    if (this.price > 0 && this.quantity > 0) {
      this.totalAmount = this.quantity * this.price;
      this.singleviewgroup.get('amount')?.setValue(this.totalAmount);
    } else {
      this.totalAmount = 0;
    }
  }

  // ✅ Booking Function
  bookNow() {
    console.log(this.singleviewgroup.value)
    this.dbService.addBookingDetail(this.singleviewgroup.value).then((confirmation: any) => {
      if (confirmation.message === "Success") {
        alert('Booking Successful!');
        window.location.reload();
      }
      else {
        alert('Booking unsuccessful! please try again');
      }
    });
  }
}