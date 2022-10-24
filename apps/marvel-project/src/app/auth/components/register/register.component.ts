import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserInfo } from '../../models/userInfo';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'omer-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userAddForm!: FormGroup;
  user!: UserInfo;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() {
    this.userAddForm = this.formBuilder.group({
      uname: ['', Validators.required],
      username: ['', Validators.required],
      userType: ['', Validators.required],
      isActive: [true, Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
  }

  addUser() {
    if (this.userAddForm.invalid){

      this.messageService.add({
        key: 'myKey1',
        severity: 'warn',
        summary: 'Danger',
        detail: 'Fill in the required fields',
      });

    }
    if (this.userAddForm.valid) {
      this.user = Object.assign(
        { id: Math.floor(Math.random() * 1000), ...this.user },
        this.userAddForm.value
      );
      console.log(this.user);
      if(  this.userAddForm.get('password')?.value !=
        this.userAddForm.get('repassword')?.value){

        this.messageService.add({
          key: 'myKey1',
          severity: 'warn',
          summary: 'Danger',
          detail: 'Your password does not match',
        });
      }
      if (
        this.userAddForm.get('password')?.value ===
        this.userAddForm.get('repassword')?.value
      ) {
        this.authService.addUser(this.user).subscribe((data) => {
          this.messageService.add({
            key: 'myKey1',
            severity: 'success',
            summary: 'Success',
            detail: 'Registration Successful',
          });
          this.router.navigateByUrl('/login');
          console.log(data);
        });
      }
    }
    }

}
