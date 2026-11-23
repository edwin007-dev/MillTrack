import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-adminmaster',
  templateUrl: './adminmaster.component.html',
  styleUrls: ['./adminmaster.component.css']
})
export class AdminmasterComponent implements OnInit {
  loginid: any;

  isRegistrationsOpen: boolean = false;
  isViewsOpen: boolean = false;
  isReportsOpen: boolean = false;
  isSidebarMinimized: boolean = false;
  isMobileNavOpen: boolean = false;

  constructor(private router: Router) {}

  toggleMenu(menu: string): void {
    if (menu === 'registrations') {
      this.isRegistrationsOpen = !this.isRegistrationsOpen;
    } else if (menu === 'views') {
      this.isViewsOpen = !this.isViewsOpen;
    } else if (menu === 'reports') {
      this.isReportsOpen = !this.isReportsOpen;
    }
  }

  toggleSidebar(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }

  toggleMobileNav(): void {
    this.isMobileNavOpen = !this.isMobileNavOpen;
  }

  checkActiveRoute(): void {
    const url = this.router.url;
    if (
      url.includes('/locationregister') ||
      url.includes('/categoryreg') ||
      url.includes('/subcategoryreg') ||
      url.includes('/editlocation') ||
      url.includes('/editcategory') ||
      url.includes('/editsubcategory')
    ) {
      this.isRegistrationsOpen = true;
    } else if (
      url.includes('/millview') ||
      url.includes('/locationview') ||
      url.includes('/categoryview') ||
      url.includes('/subcategoryview')
    ) {
      this.isViewsOpen = true;
    } else if (
      url.includes('/report1') ||
      url.includes('/report2') ||
      url.includes('/excelreport')
    ) {
      this.isReportsOpen = true;
    }
  }

  Logout(): void {
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
      this.router.navigate(['/guestmaster/login']);
      return;
    }

    this.checkActiveRoute();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkActiveRoute();
      });
  }
}
