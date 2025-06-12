import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { CountryService } from '../services/country.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  @Input() public user: User | null = null;
  @Output() public formSubmit: EventEmitter<User> = new EventEmitter<User>();

  public userForm!: FormGroup;
  public countries$: Observable<string[]>;
  public submitted: boolean = false;

  public constructor(private fb: FormBuilder, private countryService: CountryService) {
    this.countries$ = of([]);
  }

  public ngOnInit(): void {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
    });

    if (this.user) this.userForm.patchValue(this.user);

    this.countries$ = this.countryService.getCountries();
  }

  public onSubmit(): void {
    this.submitted = true;
    if (this.userForm.valid) {
      const data: User = {
        ...this.userForm.value,
        createdAt: this.user?.createdAt || new Date().toISOString(),
      };
      this.formSubmit.emit(data);
    }
  }
}
