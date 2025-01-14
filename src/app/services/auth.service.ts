import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieService: CookieService) {}
  setSessionCookie(sessionId: string): void {
    this.cookieService.set('sessionId', sessionId, 30, '/'); // Setează cookie-ul
  }

  getSessionCookie(): string {
    return this.cookieService.get('sessionId'); // Recuperează cookie-ul
  }

  deleteSessionCookie(): void {
    this.cookieService.delete('sessionId', '/'); // Șterge cookie-ul
  }
}
