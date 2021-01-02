import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public selectedField = '';
  public email: FormControl;
  public forgotPwForm: FormGroup;
  public formMessage: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.forgotPwForm = this.formBuilder.group({
      email: this.email
    });
  }

  sendEmail(): void {
    this.authService.requestResetPassword(this.forgotPwForm.value).subscribe(
      data => {
        this.forgotPwForm.reset();
        this.formMessage = data.message;
      },
      err => {
        if (err.error.message) {
          console.log(err);
          this.formMessage = err.error.message;
        }
      });
  }

  onFocus(field: string) {
    this.selectedField = field;
  }

  onBlur() {
    this.selectedField = '';
  }

}
