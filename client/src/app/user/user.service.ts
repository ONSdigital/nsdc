import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { LoginService } from '../login/login.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import { Configuration } from '../app.constants';

@Injectable()
export class UserService {

  private actionUrl: string;
  public headers: Headers;

  constructor(private http: Http, private config: Configuration, private loginService: LoginService) {
    this.actionUrl = config.Server + 'nsdc/v1.0/users';

    this.headers = new Headers();
    this.headers.set('Content-Type', 'application/json');
  }

  addUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userAddUrl = this.config.Server + 'nsdc/v1.0/users';
    return this.http.post(userAddUrl, JSON.stringify(user), { headers: this.headers } )
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  getUsersByStatus(status: string) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/status/' + status;
    return this.http.get(userUrl, { headers: this.headers })
      .toPromise().then(response => response.json() as User[])
      .catch(this.handleError);
  }

  getUserById(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
    return this.http.get(userUrl, { headers: this.headers })
    .toPromise().then(response => response.json() as User)
    .catch(this.handleError);
  }

  getUsersByRole(roleId: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userUrl = this.config.Server + 'nsdc/v1.0/users/role/' + roleId;
    return this.http.get(userUrl, { headers: this.headers })
    .toPromise()
    .then(response => response.json() as User[])
    .catch(this.handleError);
  }

  updateUser(user: User) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let userEditUrl = this.config.Server + 'nsdc/v1.0/users/' + user.id;
    return this.http.put(userEditUrl, JSON.stringify(user),
    { headers: this.headers }).toPromise().then(() => user).catch(this.handleError);
  }

  deactivateUser(id: number) {
    this.headers.set('X-TOKEN', this.loginService.getSessionId());
    let deactivateUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
    return this.http.put(deactivateUrl, JSON.stringify({status: 'inactive'}), { headers: this.headers })
    .map(res => res.json())
    .catch(res => {
      return Observable.throw(res.json());
    });
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }

 // Add a new comment
  // addUser (user: User): Observable<User> {
  //     let userAddUrl = this.config.Server + 'nsdc/v1.0/post_user';
  //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //     let options       = new RequestOptions({ headers: headers }); // Create a request option

  //     return this.http.post(userAddUrl, JSON.stringify(user), options) // ...using post request
  //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
  //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  // }
// getUsers(): Observable<User []> {
//     let userListUrl = this.config.Server + 'nsdc/v1.0/users';
//     return this.http.get(userListUrl)
//                          .map((res:Response) => res.json())
//                          //...errors if any
//                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


//     }
    // Implement method to get all users


// getUserById(id:number): Observable<User> {
//     let userUrl = this.config.Server + 'nsdc/v1.0/users/' + id;
//     return this.http.get(userUrl)
//                          .map((res:Response) => res.json())
//                          //...errors if any
//                          .catch((error:any) => Observable.throw(error.json().error || 'Server error'));


//     }




        // Update a comment
    // updateUser (id: number, user: User): Observable<User> {
    //     let userEditUrl = this.config.Server + 'nsdc/v1.0/edit_user/' + id;
    //     let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    //     let options       = new RequestOptions({ headers: headers }); // Create a request option

    //     return this.http.put(userEditUrl, JSON.stringify(user), options) // ...using put request
    //                      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
    //                      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
    // }
}
