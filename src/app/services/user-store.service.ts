import {
  Injectable,
  signal,
  computed,
  Signal,
  WritableSignal,
} from '@angular/core';
import { User } from '../models/user.model';

const generateMockUsers = (count: number): User[] => {
  const countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Germany',
    'France',
    'Australia',
  ];
  const users: User[] = [];

  for (let i = 1; i <= count; i++) {
    users.push({
      firstName: `User${i}`,
      lastName: `Test${i}`,
      email: `user${i}@example.com`,
      country: countries[i % countries.length],
      createdAt: new Date(2023, Math.floor(i / 5), (i % 28) + 1).toISOString(),
    });
  }

  return users;
};

const MOCK_USERS: User[] = generateMockUsers(50);

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private usersSignal: WritableSignal<User[]> = signal<User[]>(
    this.loadUsers()
  );
  public readonly users: Signal<User[]> = computed(() => this.usersSignal());

  private loadUsers(): User[] {
    const existing: string | null = localStorage.getItem('users');
    if (existing) {
      return JSON.parse(existing);
    } else {  
      localStorage.setItem('users', JSON.stringify(MOCK_USERS));
      return MOCK_USERS;
    }
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
    this.usersSignal.set(users);
  }

  public addUser(user: User): void {
    const updated: User[] = [...this.usersSignal(), user];
    this.saveUsers(updated);
  }

  public updateUser(updated: User): void {
    const updatedUsers = this.usersSignal().map((user) =>
      user.email === updated.email ? updated : user
    );
    this.saveUsers(updatedUsers);
  }

  public deleteUser(email: string): void {
    const filtered = this.usersSignal().filter((user) => user.email !== email);
    this.saveUsers(filtered);
  }

  public getUser(email: string): User | undefined {
    return this.usersSignal().find((user) => user.email === email);
  }
}
