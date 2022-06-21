import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserToken} from '../../model/user-token';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currenUserSubject: BehaviorSubject<UserToken>;
  public currenUser: Observable<UserToken>;

  constructor(private http: HttpClient,
              private router: Router,) {
    this.currenUserSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user')));
    this.currenUser = this.currenUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<UserToken> {
    return this.http.post<any>(API_URL + '/login', {username, password})
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currenUserSubject.next(user);
        return user;
      }));
  }

  get currentUserValue() {
    return this.currenUserSubject.value;
  }

  logout() {
    localStorage.removeItem('user');
    this.currenUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
