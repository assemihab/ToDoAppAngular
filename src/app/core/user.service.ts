import { Injectable } from "@angular/core";
import 'rxjs/add/operator/toPromise';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class UserService {

  constructor(
   public db: Firestore,
   public afAuth: Auth
 ){
 }

}