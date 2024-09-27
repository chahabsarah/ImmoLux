import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignupRequest } from '../models/SignupRequest';
import { LoginRequest } from '../models/LoginRequest';
import { JwtResponse } from '../models/JwtResponse';
import { MessageResponse } from '../models/MessageResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:9095/auth';

  constructor(private http: HttpClient) { }

  signup(signupRequest: SignupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, signupRequest);
  }

  login(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, loginRequest);
  }

  verifyEmail(token: string): Observable<any> {
    const params = new HttpParams().set('token', token);
    return this.http.post(`${this.baseUrl}/verify`, null, { params });
  }
}
