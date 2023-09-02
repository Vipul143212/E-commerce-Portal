import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  // Function to save user data in local storage after successful login
  private saveUserName(username: string): void {
    localStorage.setItem('username', username);
  }

  // Function to retrieve user data from local storage
  private getUserData() {
    const userData = localStorage.getItem('username');
    console.log(userData);
    if(userData != null) {
      return userData;
    } else {
      return null;
    }
  }

  // Function to clear user data from local storage after logout
  private clearUserData() {
    localStorage.removeItem('username');
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map((response) => {
        // Check if there is a user with the given username and password
        if (response && response.length === 1) {
          const user = response[0];
          // Save user data in local storage (you can save additional data as needed)
          this.saveUserName(user.username);
          return true; // Login successful
        } else {
          console.error('Login failed: Invalid username or password');
          return false; // Login failed
        }
      }),
      catchError((error) => {
        console.error('Login failed with error:', error);
        return throwError('Login failed due to an error'); // Throw an error observable
      })
    );
  }

  

  register(username: string, password: string): Observable<any> {
    // Send a POST request to your JSON Server for registration
    return this.http.post<any>(`${this.apiUrl}`, { username, password });
  }

  logout() {
    // Clear user data from local storage
    this.clearUserData();
  }

  // Function to check if the user is currently logged in
  isLoggedIn(): boolean {
    const userData = this.getUserData();
    return !!userData;
  }

  // Function to retrieve the current user's username
  getCurrentUsername(): string | null {
    const userData = this.getUserData();
    if(userData != null) {
      return userData;
    } else {
      return null;
    }
  }
}
