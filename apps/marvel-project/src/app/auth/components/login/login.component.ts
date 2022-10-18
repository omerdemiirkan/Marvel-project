import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actions, Store } from '@ngxs/store';
import { OfferList, Signin } from '../../storage/action';
import { UserInfo } from '../../models/userInfo';
import { User } from '../../models/user';
import { switchMap } from 'rxjs';
import { AuthState } from '../../storage/state';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import {stringify} from "ts-jest";

@Component({
  selector: 'omer-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  type!: UserInfo;
  user!: UserInfo[];
  login!: User;
  loginForm!: FormGroup;
  selectedCustomerId!: number;
  customer!:UserInfo

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private store: Store,
    private actions: Actions,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.createLoginForm();
    this.getParams()

    this.getUserList();
  }
  getParams() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.selectedCustomerId = params['id'];

      this.getCustomerById();
    });
  }
  getCustomerById() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id']) this.selectedCustomerId = params['id'];
    });
    if (this.selectedCustomerId == undefined) {
      //toast
    } else {
      this.authService
        .getCustomerById(this.selectedCustomerId)
        .subscribe((data) => {
          this.customer = data;
          console.log(data ,"yeni dataaaa")
          console.log(this.customer,"cutsotmwee")
        });
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  getUserList() {
    this.authService.getUserList().subscribe((data) => {
      this.user = data;

      console.log(data);
    });
  }

  signin() {

    this.store
      .dispatch(
        new Signin(
          this.loginForm.get('username')?.value,
          this.loginForm.get('password')?.value
        )
      )
      .pipe(switchMap(() => this.store.selectOnce(AuthState.token)))
      .subscribe((data) => {
        if (data == undefined) {
          this.messageService.add({
            key: 'myKey1',
            severity: 'warn',
            summary: 'Login failed',
            detail: ' Please try again',
          });
        } else {
          this.store
            .dispatch(
              new Signin(
                this.loginForm.get('username')?.value,
                this.loginForm.get('password')?.value
              )
            )
            .pipe(switchMap(() => this.store.selectOnce(AuthState.userDetails)))
            .subscribe((data) => {

              this.type = data;

              console.log(data);
              console.log(this.type.userType);

              if (data.userType == 'customer') {
                this.messageService.add({
                  key: 'myKey1',
                  severity: 'success',
                  summary: 'Success',
                  detail: 'login customer successful',
                });
                this.router.navigateByUrl('/dashboard');
              } else {
                this.messageService.add({
                  key: 'myKey1',
                  severity: 'success',
                  summary: 'Success',
                  detail: 'login admin successful',
                });
                this.router.navigateByUrl('/admin');
              }
            });
        }
      });
    // this.store
    //   .dispatch(new OfferList() )
    //   .pipe(switchMap(() => this.store.selectOnce(AuthState.getOfferList)))
    //   .subscribe((data)=>{
    //     console.log(data,"state offerlist")
    //   })
  }
}
