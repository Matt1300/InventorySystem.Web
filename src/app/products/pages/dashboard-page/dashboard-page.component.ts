import { Component } from '@angular/core';
import { SideMenuComponent } from "../../components/side-menu/side-menu.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dashboard-page',
  imports: [
    SideMenuComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard-page.component.html',
})
export class DashboardPageComponent { }
