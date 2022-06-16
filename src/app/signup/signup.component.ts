import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formSignUp!: FormGroup;
  constructor(private authService: AuthService) {}

  handleSignUp() {
    this.formSignUp.value.role = 'member';
    this.authService.signup(this.formSignUp.value).subscribe((data) => {
      alert('Đăng ký thành công!');
      this.formSignUp.reset();
    });
  }

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
