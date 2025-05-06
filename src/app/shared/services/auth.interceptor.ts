import { Injectable,inject } from "@angular/core";
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { error } from "console";

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router =  inject(Router);
  const token = authService.getToken();

  // Skip token for login or register requests
  const excludedUrls = ['/login', '/register'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }
  debugger;
  if (token && authService.isExpiredToken()) {
    authService.logOut();
    router.navigate(['/user-login']);
    return throwError(() => new Error('Token expired'));
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) =>{
      debugger;
      if(error.status === 401){
        authService.logOut();
        router.navigate(['/user-login'])
      }
      return throwError(() => error);
    })
  );
};