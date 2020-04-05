import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CONSTANTS } from '../../constantes/constantes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showLoginBtn: boolean = true;

  constructor(
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.ref.detectChanges();
    this.detectChangePage();
  }

  private detectChangePage(): void {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showLoginBtn = (this.router.url === CONSTANTS.urlDashboard) ? true : false;
      }
    });
  }

}
