import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { json } from 'stream/consumers';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent implements OnInit {
  @Output() formSubmitted = new EventEmitter<any>();
  // @Output() data: EventEmitter<any> = new EventEmitter<any>();
  isEditable: any = false;
  userData: any;
  editIndex: any;
  editData: any;
  constructor(private router: Router) {}
  contactForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    gender: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    // console.log(this.data);
    this.userData = localStorage.getItem('userData'); //editsiva
    this.userData = JSON.parse(this.userData); //editsiva

    this.editIndex = localStorage.getItem('index'); //editsiva
    console.log('userData', this.userData[this.editIndex]); //editsiva
    this.editData = this.userData[this.editIndex];

    const isEdit = localStorage.getItem('isEditable');
    this.isEditable = isEdit;

    console.log(isEdit);
    if (this.isEditable == 'true') {
      {
        this.contactForm.setValue({
          firstName: this.editData.firstName,
          lastName: this.editData.lastName,
          address: this.editData.address,
          phoneNumber: this.editData.phoneNumber,
          gender: this.editData.gender,
        });
      }
    }
  }

  onSubmit() {
    if (this.isEditable == 'false') {
      if (this.contactForm.valid) {
        console.log(this.contactForm.value);
        const formData = this.contactForm.value;

        const storedData = localStorage.getItem('userData');
        const user = storedData ? JSON.parse(storedData) : [];

        user.push(formData);

        localStorage.setItem('userData', JSON.stringify(user));
        this.formSubmitted.emit(formData);
        this.contactForm.reset();
        this.router.navigate(['/information']);
      } else {
        console.log('Form is invalid');
      }
    } else {
      console.log('edit');

      if (this.contactForm.valid) {
      }
      const formData = this.contactForm.value;
      console.log(formData);

      if (this.editIndex >= 0 && this.editIndex < this.userData.length) {
        this.userData.splice(this.editIndex, 1, formData);
        console.log('Updated userData:', this.userData);
        localStorage.setItem('userData', JSON.stringify(this.userData));
        this.router.navigate(['/information']);
      } else {
        console.error('Invalid editIndex:', this.editIndex);
      }
    }
  }
}
