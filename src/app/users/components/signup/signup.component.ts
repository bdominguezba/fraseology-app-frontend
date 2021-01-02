import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { checkEquality } from 'src/app/directives/check-equality-password.validator';
import { AuthService } from '../../services/auth.service';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public name: FormControl;
  public email: FormControl;
  public password: FormControl;
  public repeatPassword: FormControl;
  public termsAndConditions: FormControl;
  public signupForm: any = {};
  public errorSignup: boolean;
  public errorMessage: string;
  public selectedField = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.repeatPassword = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.termsAndConditions = new FormControl(false, Validators.required)
    this.signupForm = this.formBuilder.group({
      name: this.name,
      email: this.email,
      password: this.password,
      repeatPassword: this.repeatPassword,
      termsAndConditions: this.termsAndConditions
    }, { validators: checkEquality }
    );

    this.errorSignup = false;
  }

  signUp(): void {
    this.authService.signup(this.signupForm.value).subscribe(
      userData => {
        this.errorSignup = false;
        this.router.navigate(['']);
      },
      err => {
        this.errorSignup = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  validatorEquality(): boolean {
    return this.signupForm.hasError('equals') && this.signupForm.get('password').dirty
      && this.signupForm.get('repeatPassword').dirty;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TermsDialogComponent, {
      width: '250px'
    });
  }

  onFocus(identifier: string) {
    this.selectedField = identifier;
  }

  onBlur() {
    this.selectedField = '';
  }

}
