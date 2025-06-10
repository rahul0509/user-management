import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import { CountryService } from '../services/country.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  @Input() user: User | null = null;
  @Output() formSubmit = new EventEmitter<User>();

  userForm!: FormGroup;
  countries$: Observable<string[]> = of([]);

  constructor(private fb: FormBuilder, private countryService: CountryService) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required]
    });

    if (this.user) this.userForm.patchValue(this.user);

    this.countries$ = this.countryService.getCountries();
  }

  onSubmit() {
    if (this.userForm.valid) {
      const data = {
        ...this.userForm.value,
        createdAt: this.user?.createdAt || new Date().toISOString()
      };
      this.formSubmit.emit(data);
    }
  }

}
