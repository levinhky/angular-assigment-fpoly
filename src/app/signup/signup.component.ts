import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formSignUp!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.formSignUp = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      name: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
    });
  }
}
