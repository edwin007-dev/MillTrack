import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-viewbooking',
  templateUrl: './viewbooking.component.html',
  styleUrls: ['./viewbooking.component.css']
})
export class ViewbookingComponent {

  public viewbookingarray:any[]=[];
  login_id:any;
  constructor(private fb:FormBuilder,private router:Router,private dbservice:DbserviceService) { }
  ngOnInit(): void {
    this.login_id=localStorage.getItem('login_id')
    const login_id=this.login_id;
    this.dbservice.viewbooking({login_id}).then((data:any)=>{
    this.viewbookingarray=data;
});
}
  

}


