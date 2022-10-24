import { tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthStateModel, OfferStateModel } from '../models/auth.state';
import {
  addOfferToBasket,
  Auth,
  OfferList,
  RemoveOfferBasket, RemoveOfferList,
  SelectedUpdateOfferList,
  Signin,
} from './action';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../../pages/services/dashboard/dashboard.service';
import { patch, updateItem } from '@ngxs/store/operators';
import {Offer} from "../../pages/models/offer";
import {OfferItem} from "../../pages/models/offerItem";

@State<AuthStateModel>({
  name: 'auth', // the name of our state
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel) {
    return state.token;
  }

  @Selector()
  static userDetails(state: AuthStateModel) {
    return {
      userType: state.userType,
      userInfo: state.userInfo,
    };
  }

  @Selector()
  static getOfferList(state: OfferStateModel) {
    return {
      offerList: state.offerList,
    };
  }

  @Selector()
  static getSelectedOfferList(state: OfferStateModel) {
    return {
      selectedOfferList: state.selectedOfferList,
    };
  }

  @Selector()
  static selectedUpdateOfferList(state: OfferStateModel) {
    return {
      selectedUpdateOfferList: state.selectedUpdateOfferList,

    };
  }
  @Selector()
  static addOfferToBasket(state: OfferStateModel) {
    return {
      offerList: state.offerList,
      selectedOfferList: state.selectedOfferList,
    };
  }

  constructor(
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  @Action(Signin)
  login(
    { dispatch, patchState }: StateContext<AuthStateModel>,
    { email, password }: Signin
  ) {
    return this.authService.isExits(email, password).pipe(
      tap((res) => {
        res.length > 0
          ? dispatch(new Auth(email, password))
          : patchState({
              token: undefined,
            });
        patchState({
          userType: res[0]?.userType,
          userInfo: res,
        });
      })
    );
  }

  @Action(Auth)
  auth(
    { patchState }: StateContext<AuthStateModel>,
    { email, password }: Signin
  ) {
    return this.authService.signin(email, password).pipe(
      tap((result) => {
        console.log('token');
        patchState({
          token: result.token,
        });
      })
    );
  }


  @Action(OfferList)
  offerList({ setState,patchState, getState }: StateContext<AuthStateModel>) {
    const offerList = getState();
    console.log(offerList);
    return this.dashboardService.getOfferList().pipe(
      tap((x) => {
        const offerList = getState();
        offerList.offerList = x;
        console.log(x)
        patchState({
          offerList:x
        })
      })
    );
  }


  @Action(addOfferToBasket)
  addOfferToBasket(
    { setState, getState, patchState }: StateContext<OfferStateModel>,
    { offer }: addOfferToBasket
  ) {
    const offerItem = { offer, id: Math.floor(Math.random() * 1000) };
    patchState({
      selectedOfferList: getState().selectedOfferList
        ? [...getState().selectedOfferList, offerItem]
        : [offerItem],
    });
  }

  @Action(SelectedUpdateOfferList)
  selectedUpdateOfferList(
    { setState, getState, patchState }: StateContext<OfferStateModel>,
    { offer }: SelectedUpdateOfferList
  ) {

      const state=getState()
      const emplist=state.selectedOfferList


      const index=emplist.findIndex(emp=>emp.id===offer?.id)

    const newOffer =  emplist[index]


      patchState({
        selectedUpdateOfferList:newOffer
      })

    console.log(emplist)
    console.log(emplist[index])

  }



  @Action(RemoveOfferBasket)
  RemoveOfferBasket(
    { setState, getState, patchState }: StateContext<OfferStateModel>,
    { offer }: RemoveOfferBasket
  ) {
    let offers = getState().selectedOfferList;
    offers = offers.filter((o) => o?.id != offer?.id);

    patchState({ selectedOfferList: offers });
  }

  @Action(RemoveOfferList)
  RemoveOfferList(
    { setState, getState, patchState }: StateContext<OfferStateModel>,
    { offer }: RemoveOfferList
  ) {
    let offers = getState().offerList;
    console.log(offers)
    offers = offers.filter((o) => o.id != offer.id)
    console.log(offers)
    patchState({ offerList:offers});
  }


}
