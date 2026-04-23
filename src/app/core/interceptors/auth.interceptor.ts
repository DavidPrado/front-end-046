import { HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem('auth_token');

  if(token) {
    const cloned = req.clone({
      setHeaders :{
        Authorization: `Bearer ${token}`
      }
    })
    return next(cloned).pipe(
      catchError((error) =>{
        if(error.status === 401){
          localStorage.removeItem('auth_token');
          inject(Router).navigate(['/login'])
        }
        return throwError(() => error)
      })
    );
  }
  return next(req);
};
