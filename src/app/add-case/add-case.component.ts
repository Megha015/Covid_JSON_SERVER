import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-cases',
  templateUrl: './add-case.component.html',
  styleUrls: ['./add-case.component.scss'],
})
export class AddCasesComponent implements OnInit {
  casesForm: FormGroup = new FormGroup({});
  name = '';
  gender = '';
  age: any = null;
  address = '';
  city = '';
  country = '';
  status = '';
  statusList = ['Positive', 'Dead', 'Recovered', 'Danger'];
  genderList = ['Male', 'Female'];
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(
    private router: Router,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.casesForm = this.formBuilder.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      age: [null, Validators.required],
      address: [null, Validators.required],
      city: [null, Validators.required],
      country: [null, Validators.required],
      status: [null, Validators.required],
    });
  }

  async onFormSubmit() {
    this.isLoadingResults = true;
    try {
      const res = await this.api.addCases(this.casesForm.value).toPromise();
      const id = res?.id;
      this.isLoadingResults = false;
      this.router.navigate(['/cases-details', id]);
    } catch (err) {
      console.log(err);
      this.isLoadingResults = false;
    }
  }
}
