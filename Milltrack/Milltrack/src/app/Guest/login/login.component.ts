import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/dbservice.service';
@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

public LoginArray:any[]=[];
constructor(private fb: FormBuilder,private router:Router,private dbservice:DbserviceService) { }
LoginFormGroup=this.fb.group({
username: [''],
password: ['']
})


Onsubmit(){
    console.log(this.LoginFormGroup.value)
  
 

this.dbservice.checklogin(this.LoginFormGroup.value).then((data:any)=>{
this.LoginArray=data;
// console.log(data)
if(data=="")
    {
alert ('invalid username and password')
this.router.navigate(['/guestmaster/login'])
return
}
else {
// console.log(this.LoginArray)
var role = this.LoginArray[0].role;
 console.log(role)
localStorage.setItem("login_id",this.LoginArray[0].login_id);
localStorage.setItem("username",this.LoginArray[0].username)
var status = this.LoginArray[0].status;
// console.log(status)
if(role && role.toLowerCase() == "admin")
{
this.router.navigate(['/adminmaster/adminhome'])
}
else if(role == "Mill")
    {
    this.router.navigate(['/millmaster/millhome'])
    }
  else   if(role == "Customer")
        {
        this.router.navigate(['/customermaster/customerhome'])
        }
else
{
alert('you are not an authorised person..')
}
}
})
}
// alert('success')


ngOnInit(): void {
}
}