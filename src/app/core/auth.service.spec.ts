import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment'; // adjust path as needed
import { mockCredentials, mockResponse } from '../mock/mock-data';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    
    service = TestBed.inject(AuthService);
  });
  it('should make a POST request to Firebase login API', () => {
    httpMock = TestBed.inject(HttpTestingController);

    service.doLogin(mockCredentials).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.signInUrl}${environment.firebase.apiKey}`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: mockCredentials.email,
      password: mockCredentials.password,
      returnSecureToken: true
    });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });
  it('should make a POST request to Firebase signup API', () => {
    httpMock = TestBed.inject(HttpTestingController);

    service.doSignUp(mockCredentials).subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.signUpUrl}${environment.firebase.apiKey}`
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      email: mockCredentials.email,
      password: mockCredentials.password,
      returnSecureToken: true
    });
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });
  it('check if the tocken expired', fakeAsync(() => {
    localStorage.setItem("token_expiry",(Date.now()+60*60*10).toString());
    expect(service.isTokenExpired()).toBeFalse();
    tick((60*60*10)+1)
    expect(service.isTokenExpired()).toBeTrue();
}))
it('should clear expired token', () => {
    localStorage.setItem('token_expiry', (Date.now() - 1000).toString());
    localStorage.setItem('authData', JSON.stringify(mockResponse));

    service.clearExpiredToken();

    expect(localStorage.getItem('token_expiry')).toBeNull();
    expect(localStorage.getItem('authData')).toBeNull();
  });

});
