import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {  UserInfo } from '../models/userInfo';
import {LocalStorageService} from "./localStorage/local-storage.service";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(

    private localStorageService: LocalStorageService, private httpClient: HttpClient,
    private router: Router,
  ) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  logOut(){
    localStorage.removeItem("token");
  }

  signin(
    email: string,
    password: string
  ): Observable<{ token: string | undefined}> {
    return of({
      token: 'token'
    });
  }

  isExits(username:string,password:string):Observable<UserInfo[]>{
    console.log(username,password)
    return this.httpClient.get<UserInfo[]>(`http://localhost:3000/userInfo?username=${username}&password=${password}`)
  }

  signout(): Observable<null> {
    return of(null);
  }

  addUser(user:UserInfo):Observable<UserInfo>{
    console.log(user)
    return this.httpClient.post<UserInfo>("http://localhost:3000/userInfo",user)
  }

  login1(user:UserInfo):Observable<UserInfo[]>{

    return this.httpClient.get<UserInfo[]>("http://localhost:3000/userInfo?username="+user.username+"&password="+user.password)

  }

  login(user:User):Observable<any>{
    console.log(user.username , user.password)

    return this.httpClient.get("http://localhost:3000/login")

  }

  getUserList():Observable<UserInfo[]>{

    return this.httpClient.get<UserInfo[]>("http://localhost:3000/userInfo")
  }
  // login1(userForLoginModel: UserForLogin): Observable<UserLoginResponse> {
  //   const subject = new Subject<UserLoginResponse>();
  //   this.httpClient
  //     .post<UserLoginResponse>(
  //       "http://localhost:3000/userInfo/auth" + '/login',
  //       userForLoginModel
  //     )
  //     .subscribe({
  //       next: (response) => {
  //         if (!response.success) return;
  //         this.saveToken(response);
  //         subject.next(response);
  //       },
  //       error: (err) => {
  //         subject.error(err);
  //       },
  //       complete: () => {
  //         subject.complete();
  //       },
  //     });
  //
  //   return subject.asObservable();
  // }
  //
  // saveToken(userLoginResponse: UserLoginResponse) {
  //   this.localStorageService.set('token', userLoginResponse.access_token);
  //
  // }


}
