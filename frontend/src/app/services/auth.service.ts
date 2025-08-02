import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserRole } from '../guards/auth.guard';

export interface User {
  email: string;
  role: UserRole[];
  name: string;
}

export interface LoginResponse {
  success: boolean;
  user?: User;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser: User | null = null;

  // Hardcoded credentials
  private users: User[] = [
    { email: 'admin@example.com', role: [UserRole.admin], name: 'Admin User' },
    { email: 'user@example.com', role: [UserRole.user], name: 'Regular User' }
  ];

  private credentials = [
    { email: 'admin@example.com', password: 'admin123' },
    { email: 'user@example.com', password: 'user123' }
  ];

  constructor() {}

  login(email: string, password: string): Observable<LoginResponse> {
    const credential = this.credentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      const user = this.users.find(u => u.email === email);
      if (user) {
        this.currentUser = user;
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        return of({ success: true, user });
      }
    }

    return of({
      success: false,
      message: 'Invalid email or password'
    });
  }

  logout(): void {
    this.currentUser = null;
    sessionStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      return this.currentUser;
    }

    const stored = sessionStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }

    return null;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role?.includes(UserRole.admin) ?? false;
  }

  isUser(): boolean {
    const user = this.getCurrentUser();
    return user?.role?.includes(UserRole.user) ?? false;
  }

  hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser();
    return user?.role?.includes(role) ?? false;
  }

  getUserRole(): UserRole[] {
    const user = this.getCurrentUser();
    return user && user.role && user.role.length > 0 ? user.role : []; // Default to user role if not logged in
  }


}
