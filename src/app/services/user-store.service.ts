import { Injectable, signal, computed } from "@angular/core";
import { User } from "../models/user.model";

const MOCK_USERS: User[] = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    country: 'Canada',
    createdAt: new Date('2023-06-01T10:00:00Z').toISOString()
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
    email: 'bob.smith@example.com',
    country: 'Germany',
    createdAt: new Date('2023-05-15T15:30:00Z').toISOString()
  },
  {
    firstName: 'Charlie',
    lastName: 'Nguyen',
    email: 'charlie.nguyen@example.com',
    country: 'Vietnam',
    createdAt: new Date('2023-04-20T09:45:00Z').toISOString()
  }
];

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private usersSignal = signal<User[]>(this.loadUsers());
  readonly users = computed(() => this.usersSignal());

  private loadUsers(): User[] {
     const existing = localStorage.getItem('users');
    if (existing) {
      return JSON.parse(existing);
    } else {
      localStorage.setItem('users', JSON.stringify(Array.from({ length: 50 }, () => MOCK_USERS).flat()));
      return Array.from({ length: 50 }, () => MOCK_USERS).flat();
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
    this.usersSignal.set(users);
  }

  addUser(user: User) {
    const updated = [...this.usersSignal(), user];
    this.saveUsers(updated);
  }

  updateUser(updated: User) {
    const updatedUsers = this.usersSignal().map(user => user.email === updated.email ? updated : user);
    this.saveUsers(updatedUsers);
  }

  deleteUser(email: string) {
    const filtered = this.usersSignal().filter(user => user.email !== email);
    this.saveUsers(filtered);
  }

  getUser(email: string): User | undefined {
    return this.usersSignal().find(user => user.email === email);
  }
}
