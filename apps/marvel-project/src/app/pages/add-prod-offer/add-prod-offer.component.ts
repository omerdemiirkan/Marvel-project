import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserInfo } from '../../auth/models/userInfo';
import { AuthService } from '../../auth/services/auth.service';
import { ProdOfferChars } from '../models/prodOfferChars';
import { Offer } from '../models/offer';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { AuthState } from '../../auth/storage/state';
import { OfferItem } from '../models/offerItem';
import { Store } from '@ngxs/store';
import {
  OfferList,
  RemoveOfferBasket,
  SelectedUpdateOfferList,
} from '../../auth/storage/action';
import { of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'omer-add-prod-offer',
  templateUrl: './add-prod-offer.component.html',
  styleUrls: ['./add-prod-offer.component.css'],
})
export class AddProdOfferComponent implements OnInit {
  AddOfferForm!: FormGroup;
  offer!: Offer;
  selectedOffer!: OfferItem;
  selectedOffers!: OfferItem[];
  offerList!: Offer[];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,

    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getOfferList();

    this.createAddOfferForm();
  }

  createAddOfferForm() {
    this.AddOfferForm = this.formBuilder.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      prodOfferType: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  getOfferList() {
    this.store
      .dispatch(new OfferList())
      .pipe(switchMap(() => this.store.selectOnce(AuthState.getOfferList)))
      .subscribe((data) => {
        this.offerList = data.offerList;
        console.log(data, 'state offerlist');
      });

  }
  addOffer() {
    if(this.AddOfferForm.invalid){

    return   this.messageService.add({
        key: 'myKey1',
        severity: 'warn',
        summary: 'Danger',
        detail: 'Fill in the required fields',
      });
    }
    if (this.AddOfferForm.valid) {
      this.offer = Object.assign(
        { ...this.offer, id: Math.floor(Math.random() * 1000) },
        this.AddOfferForm.value
      );
      console.log(this.offer);

    }
    this.dashboardService.addOffer(this.offer).subscribe((data) => {
      this.messageService.add({
        key: 'myKey1',
        severity: 'success',
        summary: 'Success',
        detail: 'Registration Successful',
      });
      this.router.navigateByUrl('/admin');
      console.log(data);
    });
  }
}
