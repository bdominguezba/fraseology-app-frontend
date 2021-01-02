import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public name: FormControl;
  public surname: FormControl;
  public email: FormControl;
  public birthdate: FormControl;
  public selectedField = '';
  public currentUser;
  public currentUserId;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.tokenStorageService.getUser().id;
    this.userService.getUser(this.currentUserId)
    .subscribe(
      data => {
        this.currentUser = data;
        console.log(data);
        this.name = new FormControl(this.currentUser.name, [
          Validators.required,
          Validators.minLength(2)
        ]);
        this.surname = new FormControl(this.currentUser.surname, Validators.minLength(2));
        this.birthdate = new FormControl(this.currentUser.birthdate);
        this.email = new FormControl(this.currentUser.email, [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]);
        this.profileForm = this.formBuilder.group({
          name: this.name,
          surname: this.surname,
          birthdate: this.birthdate,
          email: this.email
        });
      },
      error => {
        console.log(error);
      });
    
  }

  updateUser(): void {
    const userData = {
      id: this.currentUserId,
      name: this.profileForm.value.name,
      surname: this.profileForm.value.surname,
      email: this.profileForm.value.email,
      birthdate: this.profileForm.value.birthdate
    };
    this.userService.updateProfile(userData)
    .subscribe(
      data => {
        this.profileForm = data;
        window.location.reload();
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '250px'
    });
  }

  onFocus(field: string) {
    this.selectedField = field;
  }

  onBlur() {
    this.selectedField = '';
  }

}
