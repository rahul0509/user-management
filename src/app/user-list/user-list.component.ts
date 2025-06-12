import {
  Component,
  computed,
  EventEmitter,
  Signal,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { UserStoreService } from '../services/user-store.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import { Column } from 'devextreme/ui/data_grid';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users = signal<User[]>([]);
  private filterText: WritableSignal<string> = signal('');
  public filteredUsers: Signal<User[]> = computed((): User[] => {
    return this.users().filter((user: User): unknown =>
      (user.firstName + ' ' + user.lastName)
        .toLowerCase()
        .includes(this.filterText().toLowerCase())
    );
  });

  public filterTextValue: string = '';
  columns!: Column[];

  public constructor(
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.columns = [
      { dataField: 'firstName', caption: 'First Name' },
      { dataField: 'lastName', caption: 'Last Name' },
      { dataField: 'email', caption: 'Email' },
      { dataField: 'country', caption: 'Country' },
      {
        dataField: 'createdAt',
        caption: 'Created At',
        calculateCellValue: (user: User) => this.formatDate(user),
      },
    ];
    this.users.set(this.userStoreService.users());
  }

  public formatDate(user: User): string {
    return new Date(user.createdAt).toLocaleDateString();
  }

  public deleteUser(email: string): void {
    this.userStoreService.deleteUser(email);
    this.users.set(this.userStoreService.users());
  }

  public clearFilter(): void {
    this.filterText.set('');
    this.filterTextValue = '';
  }

  public goToCreate(): void {
    this.router.navigate(['/create']);
  }

  public goToEdit(email: string): void {
    this.router.navigate(['/edit', email]);
  }

  public onFilterChange(searchVal: ValueChangedEvent): void {
    this.filterText.set(searchVal.value || '');
  }
}
