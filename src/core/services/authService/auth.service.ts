import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private storageKey = 'user';

  getUser(): any {
    try {
      const userString = localStorage.getItem(this.storageKey);
      console.log('entro');
      
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error parsing user from storage:', error);
      return null;
    }
  }

  getToken(): string | null {
    const user = this.getUser();
    return user?.data?.token ?? null;
  }

  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (e) {
      console.error('Error decoding token:', e);
      return true; 
    }
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  hasRole(rol: string): boolean {
    const user = this.getUser();
    return user?.data?.rol === rol;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    sessionStorage.clear();
  }
}
