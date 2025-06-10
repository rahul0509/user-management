import { Component, computed, signal, ViewChild } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users = signal<User[]>([]);
  filterText = signal('');
  filteredUsers = computed(() => {
    return this.users().filter(u =>
      (u.firstName + ' ' + u.lastName).toLowerCase().includes(this.filterText().toLowerCase())
    );
  });

  filterTextValue = '';

  constructor(private userStoreService: UserStoreService, private router: Router) {}

  ngOnInit() {
    this.users.set(this.userStoreService.users());
  }

  formatDate(user: User): string {
    return new Date(user.createdAt).toLocaleDateString();
  }

  deleteUser(email: string) {
    this.userStoreService.deleteUser(email);
    this.users.set(this.userStoreService.users());
  }

  clearFilter() {
    this.filterText.set('');
    this.filterTextValue = '';
  }

  goToCreate() {
    this.router.navigate(['/create']);
  }

  goToEdit(email: string) {
    this.router.navigate(['/edit', email]);
  }

}
