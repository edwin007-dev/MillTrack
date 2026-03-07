import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmaster',
  templateUrl: './adminmaster.component.html',
  styleUrls: ['./adminmaster.component.css']
})
export class AdminmasterComponent {
  loginid: any;
  constructor(private router:Router){}
  Logout() {
    console.log('Logout button clicked');
    console.log('Before Logout:', localStorage.getItem('login_id'));
    localStorage.removeItem('login_id');
    console.log('After Logout:', localStorage.getItem('login_id'));
    alert('logout successfully');
    this.router.navigate(['/guestmaster/login']);
}
ngOnInit(): void {
  const loginid = localStorage.getItem('login_id');
  if (!loginid) {
    // If loginid is not present, redirect to the login page
    this.router.navigate(['/guestmaster/login']);
}
}

}
