import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../environment/environment";

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  let isAuthenticationRequest: boolean = req.url.endsWith('/auth/authenticate');
  let isRegister: boolean = req.url.endsWith('/auth/register');
  let isPost: boolean = req.url.startsWith( environment.apiBaseUrl+'/post') && req.method == 'GET';
  let isPostDelete: boolean = req.url.startsWith( environment.apiBaseUrl+'/post') && req.method === 'DELETE';
  let isReaction: boolean = req.url.startsWith( environment.apiBaseUrl+'/reaction/post');
  let isCheckingUsername: boolean = req.url.startsWith( environment.apiBaseUrl+'/users/username');
  let isCheckingEmail: boolean = req.url.startsWith( environment.apiBaseUrl+'/users/mail');


  let token = sessionStorage.getItem('loginToken');
  if(token && !isAuthenticationRequest && !isRegister && !(isPost && !isPostDelete) && !isReaction && !isCheckingUsername && !isCheckingEmail){
    req = req.clone(
      {
        setHeaders:{
          'Authorization': `Bearer ${token}`
        }
      })
  }
  return next(req);
};
