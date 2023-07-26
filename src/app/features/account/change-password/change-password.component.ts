import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { SpinnerService } from 'src/app/core/services/spinner.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  form!: UntypedFormGroup;
  hideCurrentPassword: boolean;
  hideNewPassword: boolean;
  currentPassword!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  disableSubmit!: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private logger: NGXLogger,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService) {

    this.hideCurrentPassword = true;
    this.hideNewPassword = true;
  }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      currentPassword: new UntypedFormControl('', Validators.required),
      newPassword: new UntypedFormControl('', Validators.required),
      newPasswordConfirm: new UntypedFormControl('', Validators.required),
    });

    this.form.get('currentPassword')?.valueChanges
      .subscribe(val => { this.currentPassword = val; });

    this.form.get('newPassword')?.valueChanges
      .subscribe(val => { this.newPassword = val; });

    this.form.get('newPasswordConfirm')?.valueChanges
      .subscribe(val => { this.newPasswordConfirm = val; });

    this.spinnerService.visibility.subscribe((value) => {
      this.disableSubmit = value;
    });
  }

  async changePassword() {

    if (this.newPassword !== this.newPasswordConfirm) {
      this.notificationService.openSnackBar('New passwords do not match.');
      return;
    }

    const email = this.authService.getCurrentUser().email;

    let res = await this.authService.changePassword(email, this.currentPassword, this.newPassword);

    if(res.statusCode === 200 || res.error !== undefined) {
      this.logger.info(`User ${email} changed password.`);
      this.form.reset();
      this.notificationService.openSnackBar('Your password has been changed.');
      this.router.navigate(['/auth/login']);
    } else{
      this.notificationService.openSnackBar(res.error.message);
    }
  }
}
