import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment"; // Adjust the path as necessary

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
    const URL=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`;

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
    const URL=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apikey}`;
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
  


  

//   doFacebookLogin(){
//     return new Promise<any>((resolve, reject) => {
//       let provider = new firebase.auth.FacebookAuthProvider();
//       this.afAuth.auth
//       .signInWithPopup(provider)
//       .then(res => {
//         resolve(res);
//       }, err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   doTwitterLogin(){
//     return new Promise<any>((resolve, reject) => {
//       let provider = new firebase.auth.TwitterAuthProvider();
//       this.afAuth.auth
//       .signInWithPopup(provider)
//       .then(res => {
//         resolve(res);
//       }, err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   doGoogleLogin(){
//     return new Promise<any>((resolve, reject) => {
//       let provider = new firebase.auth.GoogleAuthProvider();
//       provider.addScope('profile');
//       provider.addScope('email');
//       this.afAuth.auth
//       .signInWithPopup(provider)
//       .then(res => {
//         resolve(res);
//       }, err => {
//         console.log(err);
//         reject(err);
//       })
//     })
//   }

//   doRegister(value){
//     return new Promise<any>((resolve, reject) => {
//       firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
//       .then(res => {
//         resolve(res);
//       }, err => reject(err))
//     })
//   }
  


//   doLogin(value:any){
//     return new Promise<any>((resolve, reject) => {
//       firebase.auth().signInWithEmailAndPassword(value.email, value.password)
//       .then(res => {
//         resolve(res);
//       }, err => reject(err))
//     })
//   }

//   doLogout(){
//     return new Promise((resolve, reject) => {
//       if(firebase.auth().currentUser){
//         this.afAuth.auth.signOut();
//         resolve();
//       }
//       else{
//         reject();
//       }
//     });
//   }


}