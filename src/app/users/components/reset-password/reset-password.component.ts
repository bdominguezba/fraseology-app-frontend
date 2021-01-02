import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { checkEquality } from 'src/app/directives/check-equality-password.validator';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public password: FormControl;
  public repeatPassword: FormControl;
  public resetPasswordForm: FormGroup;
  public formMessage: string;
  public errorMessage: string;
  public selectedField = '';
  public user = {};

  constructor(
    private formbuilder: FormBuilder,
    private tokenStorage: TokenStorageService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser();
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.resetPasswordForm = this.formbuilder.group({
      user: this.user,
      password: this.password,
      repeatPassword: this.repeatPassword
    }, { validators: checkEquality })
  }

  resetPassword() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe(
      data => {
        console.log(data);
        this.resetPasswordForm.reset();
        this.formMessage = data.message;
      },
      err => {
        if (err.error.message) {
          console.log(err);
          this.formMessage = err.error.message;
        }
      }
    )
  }

  validatorEquality(): boolean {
    return this.resetPasswordForm.hasError('equals') && this.resetPasswordForm.get('password').dirty
      && this.resetPasswordForm.get('repeatPassword').dirty;
  }

  onFocus(field: string) {
    this.selectedField = field;
  }

  onBlur() {
    this.selectedField = '';
  }

}
