import { Component, Input, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrl: './information.component.css',
})
export class InformationComponent implements OnInit {
  user: any[] = [];
  @Input() data: any;

  constructor(private router: Router) {}

  loadUsers() {
    const storedData = localStorage.getItem('userData');
    this.user = storedData ? JSON.parse(storedData) : [];
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(index: number) {
    if (index >= 0 && index < this.user.length) {
      this.user.splice(index, 1);
      localStorage.setItem('userData', JSON.stringify(this.user));
    }
  }
  editUser(index: number) {
    const userToEdit = this.user[index];
    // this.data.emit(true);

    localStorage.setItem('isEditable', 'true');
    localStorage.setItem('index', JSON.stringify(index));

    this.router.navigate(['/form']);
  }
  addNew() {
    this.router.navigate(['/form']);
    localStorage.setItem('isEditable', 'false');
  }
}
