import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss',
})
export class UpdateUserComponent {
  public user: User | null = null;

  public constructor(
    private route: ActivatedRoute,
    private userStore: UserStoreService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    const email: string | null = this.route.snapshot.paramMap.get('email');
    if (email) {
      const found: User | undefined = this.userStore.getUser(email);
      if (found) {
        this.user = found;
      }
    }
  }

  public handleUpdate(user: User): void {
    this.userStore.updateUser(user);
    this.router.navigate(['/']);
  }
}
