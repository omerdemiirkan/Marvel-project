import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard/dashboard.service';
import {RemoveOfferBasket,} from '../../auth/storage/action';
import {tap} from 'rxjs';
import {AuthState} from '../../auth/storage/state';
import {Store} from '@ngxs/store';
import {OfferItem} from '../models/offerItem';

@Component({
  selector: 'omer-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css'],
})
export class BasketComponent implements OnInit {
  selectedOffers!: OfferItem[];
  constructor(
    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getSelectedOfferList();
  }

  getSelectedOfferList() {
    this.store.select(AuthState.getSelectedOfferList).subscribe((data) => {
      console.log(data);
      if (data.selectedOfferList) {
        this.selectedOffers = data.selectedOfferList;
      }
    });
  }

  get amount() {
    let sumAmount = 0;
    if (this.selectedOffers === undefined) return sumAmount;
    this.selectedOffers.forEach((offer) => {
      sumAmount += offer.offer.amount;
    });
    return sumAmount;
  }

  remove(offer: OfferItem) {
    this.store.dispatch(new RemoveOfferBasket(offer)).pipe(
      tap((m) => {
        console.log(m, 'seeçtilk baba');
      })
    );
  }


}
