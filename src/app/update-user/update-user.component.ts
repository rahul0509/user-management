import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserStoreService } from '../services/user-store.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.scss'
})
export class UpdateUserComponent {

  user: User | null = null;

  constructor(private route: ActivatedRoute, private userStore: UserStoreService, private router: Router) {}

  ngOnInit() {
    const email = this.route.snapshot.paramMap.get('email');
    if (email) {
      const found = this.userStore.getUser(email);
      if (found) this.user = found;
    }
  }

  handleUpdate(user: User) {
    this.userStore.updateUser(user);
    this.router.navigate(['/']);
  }


}
