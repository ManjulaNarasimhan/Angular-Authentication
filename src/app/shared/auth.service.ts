import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  endPoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser: {};
  
  constructor(private _httpClient: HttpClient, private _router: Router) { }

  //Sign-up

  signUp(user:User): Observable<User>{
    return this._httpClient.post<User>(`${this.endPoint}/register-user`,user)
                .pipe(catchError(this.handleError));
  }

  signIn(user:User){
    this._httpClient.post(`${this.endPoint}/signin`, user)
        .subscribe((res: any)=>{
          localStorage.setItem('access-token',res.token);
          this.getUserProfileById(res._id)
              .subscribe((res)=>{
                console.log('Got the response' + res)
                this.currentUser = res;
                this._router.navigate(['user-profile/' + res.msg._id])
              })
        })
  }

  doLogout(){
    let removeItem = localStorage.removeItem('access-token')
    if(removeItem == null){     
      this._router.navigate(['log-in']);
    }
  }

  getUserProfileById(id): Observable<any>{
    let api = `${this.endPoint}/user-profile/${id}`;
    console.log('API::::' + api);
     return this._httpClient.get(api, {headers: this.headers})
                .pipe(map((res:Response)=>{
                  console.log("get profile By Id method" + res);
                  console.log('profile:::' + res)
                  return res || {}
                }),
                 catchError(this.handleError)
                )
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  getToken(){
    return localStorage.getItem('access-token');
  }

  handleError(error: HttpErrorResponse){
    let msg = '';
    if(error.error instanceof ErrorEvent){
      msg =  error.error.message;
    } else {
      msg=`Error code: ${error.status}\n Message: ${error.message}`;
    }
    console.log('Error Message from handleError()' + msg);
    return throwError(msg);
  }

}
