import { Component, Input } from '@angular/core';
import { ROUTES } from '../../../core/constants/route.constants';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = true;

  menuItems: MenuItem[] = [
    { label: 'Home', route: '/' + ROUTES.HOME, icon: '🏠' },
    { label: 'All Vehicles', route: '/' + ROUTES.VEHICLES, icon: '🚗' },
    { label: 'About Us', route: '/' + ROUTES.ABOUT, icon: 'ℹ️' }
  ];
}
