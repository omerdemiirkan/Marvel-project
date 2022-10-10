import {of, switchMap, tap} from 'rxjs';
import { Injectable } from '@angular/core';
import {
  AuthStateModel,
  DeleteStateModel,
  OfferStateModel,
} from '../models/auth.state';
import { Auth, OfferList, Remove, Signin, Signout } from './action';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { patch, removeItem } from '@ngxs/store/operators';
import { Offer } from '../../pages/models/offer';
import { DashboardService } from '../../pages/services/dashboard.service';

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
    };
  }

  @Selector()
  static offerRemove(state: DeleteStateModel) {
    return {
      id: state.prodOfferId,
    };
  }

  @Selector()
  static getOfferList(state: OfferStateModel) {
    return {
      offerList: state.offerList,
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

  @Action(Signout)
  logout({ setState, getState }: StateContext<AuthStateModel>) {
    const { token } = getState();
    return this.authService.signout().pipe(
      tap((x) => {
        // setState({token});
      })
    );
  }

  @Action(Remove)
  deletePost(
    { getState, patchState, setState }: StateContext<DeleteStateModel>,
    { prodOfferId }: DeleteStateModel
  ) {
    {
      const state = getState();
      const filteredArray = state.prodOfferId;
      setState({
        ...state,
        prodOfferId: filteredArray,
      });
    }
  }

  @Action(OfferList)
  offerList({ setState, getState }: StateContext<OfferStateModel>) {
    const  offerList  = getState();
    console.log(offerList)
    return this.dashboardService.getOfferList().pipe(
      tap((x) => {
    offerList.offerList=x
        console.log(x)
      })
    );
  }

}
