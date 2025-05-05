import { Injectable,inject } from "@angular/core";
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from "./auth.service";

export const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Skip token for login or register requests
  const excludedUrls = ['/login', '/register'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req);
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq);
};