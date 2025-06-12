import { Component } from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  public constructor(private userStore: UserStoreService, private router: Router) {}

  public handleCreate(user: User): void {
    this.userStore.addUser(user);
    this.router.navigate(['/']);
  }
}
