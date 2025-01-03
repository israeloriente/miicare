import { Injectable } from '@angular/core';
import { User } from 'src/interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private fakeUsersUrl = '/assets/data/fake-users.json';

  async authenticate(username: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(this.fakeUsersUrl);
      const users: User[] = await response.json();
      const user = users.find((u: User) => u.username === username && u.password === password);
      return !!user;
    } catch {
      return false;
    }
  }
}
