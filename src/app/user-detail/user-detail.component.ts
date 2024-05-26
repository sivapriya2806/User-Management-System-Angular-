import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  users: any[] = [];
  isVisible = false;

  constructor(private userService: UserService) {}

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    salary: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (response) => {
        if (response.status === 'success') {
          this.users = response.data;
        } else {
          console.error('Failed to fetch data', response.message);
        }
      },
      (error) => {
        console.error('error fetch data', error);
      }
    );
  }
  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
  onSubmit() {
    if (this.userForm.valid) {
      console.log('Valid form');
      const newUser = this.userForm.value;
      this.userService.addUser(newUser).subscribe(
        (response) => {
          console.log('Success!', response);
          this.userForm.reset();
          this.toggleVisibility();
        },
        (error) => {
          console.error('error');
        }
      );
    }
  }
  onClose() {
    this.userForm.reset();
    this.toggleVisibility();
  }
}
