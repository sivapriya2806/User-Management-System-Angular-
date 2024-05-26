import { Component } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isMenuCollapsed = true;
  constructor(private authService: AuthService, private router: Router) {}
  navigatePath() {
    localStorage.setItem('isEditable', 'false');
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/information']);
  }
  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed; /* Toggle the menu state */
  }
  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;
  ngOnInit(): void {}
  openMenu() {
    this.menuVariable = !this.menuVariable;
    this.menu_icon_variable = !this.menu_icon_variable;
  }
}
