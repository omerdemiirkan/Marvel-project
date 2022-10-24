import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offer';
import { DashboardService } from '../services/dashboard/dashboard.service';
import { Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';
import { AuthState } from '../../auth/storage/state';
import {
  OfferList,
  RemoveOfferBasket,
  RemoveOfferList,
} from '../../auth/storage/action';
import { Router } from '@angular/router';
import { OfferItem } from '../models/offerItem';

@Component({
  selector: 'omer-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  offerList!: Offer[];

  status!: Offer;
  selectedOffers!: OfferItem[];

  selectedCustomerId!: number;

  constructor(
    private dashboardService: DashboardService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getOfferList();
    this.getSelectedOfferList();
  }

  getOfferList() {
    this.store
      .dispatch(new OfferList())
      .pipe(switchMap(() => this.store.selectOnce(AuthState.getOfferList)))
      .subscribe((data) => {
        console.log(data.offerList, 'state offerlist');
        this.offerList = data.offerList;
        console.log(this.offerList,"valla geliyor hepsi")
      });

  }
  getSelectedOfferList() {
    this.store.select(AuthState.getSelectedOfferList).subscribe((data) => {
      console.log(data);
      if (data.selectedOfferList) {
        this.selectedOffers = data.selectedOfferList;
      }
    });
  }

  update(id: number) {
    localStorage.setItem('id', String(id));

    this.router.navigateByUrl('/update-Offer');
  }

  remove(offer: Offer) {
    console.log(offer);
    this.store.dispatch(new RemoveOfferList(offer)
    );

  }
}
