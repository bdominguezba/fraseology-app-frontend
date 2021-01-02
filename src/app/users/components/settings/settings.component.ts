import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from '../../services/token-storage.service';
import { UserService } from '../../services/user.service';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public notificationCheck: FormControl;
  public configForm: FormGroup;
  public selectedItem = '';
  public currentUserId;
  public currentUser;

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
        this.notificationCheck = new FormControl(this.currentUser.accept_notifications);
      },
      error => {
        console.log(error);
      });
    
    this.configForm = this.formBuilder.group({
      notificationCheck: this.notificationCheck
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogoutComponent, {
      width: '250px'
    });
  }

  checkNotificationPreference(): void {
    const preferenceObj = {
      userId: this.currentUserId,
      accept_notifications: !this.notificationCheck.value
    }
    this.userService.changeNotificationPreference(preferenceObj)
    .subscribe(
      data => {
        this.notificationCheck = data;
        window.location.reload();
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
