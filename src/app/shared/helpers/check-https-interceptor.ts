import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class CheckHttpsInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const secureReq = req.clone({
            url: req.url.replace('http://', 'https://')
        });
        return next.handle(secureReq);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: CheckHttpsInterceptor, multi: true }
]