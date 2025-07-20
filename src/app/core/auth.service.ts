import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"; 

@Injectable(
    {providedIn: 'root'}
)
export class AuthService {

  constructor(private http:HttpClient){}
  isTokenExpired(): boolean {
    const expiry = localStorage.getItem('token_expiry');
    if (!expiry) return true;

    const now = new Date().getTime();
    return now > parseInt(expiry, 10);
  }

  clearExpiredToken(): void {
    if (this.isTokenExpired()) {
      localStorage.removeItem('token_expiry');
      localStorage.removeItem('authData'); 
    }
  }
  doLogin(value:any){
    
    const apikey= environment.firebase.apiKey;
    const signInUrl = environment.signInUrl ;
    const URL=`${signInUrl}${apikey}`;

    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      email: value.email,
      password: value.password,
      returnSecureToken: true
    };

    return this.http.post(URL, body, { headers: headers });

  }
  doSignUp(value:any){
    const apikey= environment.firebase.apiKey;
    const signUpUrl = environment.signUpUrl ;
    const URL=`${signUpUrl}${apikey}`;
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = {
      email: value.email,
      password: value.password,
      returnSecureToken: true
    };
    return this.http.post(URL, body, { headers: headers });

  }

}