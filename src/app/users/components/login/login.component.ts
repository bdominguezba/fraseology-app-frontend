import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: FormControl;
  public password: FormControl;
  public rememberMe: FormControl;
  public loginForm: FormGroup;
  public errorLogin: boolean;
  public isLoggedIn: boolean;
  public selectedField = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('rememberMe') && localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]);
    this.password = new FormControl('', Validators.required);
    this.rememberMe = new FormControl(false);
    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
      rememberUser: this.rememberMe
    });

    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.router.navigate(['home']);
    }
    this.errorLogin = false;
  }

  login(): void {
    this.authService.login(this.loginForm).subscribe(
      data => {
        if (this.loginForm.value['rememberUser']) {
          localStorage.setItem('rememberMe', 'yes');
          localStorage.setItem('token', data.accessToken);
        }
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.errorLogin = false;
        this.isLoggedIn = true;
        this.router.navigate(['home']);
      },
      err => {
        this.errorLogin = true;
      }
    );
  }

  onFocus(field: string) {
    this.selectedField = field;
  }

  onBlur() {
    this.selectedField = '';
  }

}
