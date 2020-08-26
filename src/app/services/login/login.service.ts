import { Injectable, OnInit } from '@angular/core';
import { userLogin } from 'src/app/views/login/login-view/login-view.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { promise } from 'protractor';

interface User {
  id: number;
  fullName: string;
  email: string;
  pass: string;
}

interface Account {
  name: string;
  email: string;
  password: string;
}

enum Gender {
  Male = "male",
  Female = "female"
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  userSpecific$: Observable<User>;
  constructor(private _httpClient: HttpClient) { }
  
  ngOnInit() {
 
  }

  async checkAuth(userDetails: userLogin): Promise<boolean> {
    
    let params = new HttpParams().set('email',userDetails.email);

     return await this._httpClient.get<User>(`${environment.backendAddress}users/specific`, { params: params }).toPromise().then((user: User) => {      
      if (user[0] != undefined){
        if(userDetails.password == user[0].pass){
          localStorage.setItem('user_id', user[0].id);
          localStorage.setItem('fullName', user[0].fullName);
          localStorage.setItem('username',userDetails.email);
          return true;
          } 
      }  
        return false;
      });
  
  }

  async createAccount(account: Account) {
    await this._httpClient.post(`${environment.backendAddress}users`, 
      {
       fullName: account.name,
       email: account.email,
       pass: account.password
      }).toPromise().then();
  }
}
