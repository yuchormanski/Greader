import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const { apiUrl, authUrl } = environment;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/data')) {
      req = req.clone({
        url: req.url.replace('/data', apiUrl),
        // withCredentials: true,
      });
    } else if (req.url.startsWith('/users')) {
      req = req.clone({
        url: req.url.replace('/users', authUrl),
        // withCredentials: true,
      });
    }

    return next.handle(req);
  }
}

export const AppInterceptorProvider: Provider = {
  multi: true,
  useClass: AppInterceptor,
  provide: HTTP_INTERCEPTORS,
};
