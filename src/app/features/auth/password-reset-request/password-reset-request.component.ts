import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { NotificationService } from 'src/app/core/services/notification.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-password-reset-request',
  templateUrl: './password-reset-request.component.html',
  styleUrls: ['./password-reset-request.component.css']
})
export class PasswordResetRequestComponent implements OnInit {

  private email!: string;
  form!: UntypedFormGroup;
  loading!: boolean;

  constructor(
    @Inject('LOCALSTORAGE') private localStorage: Storage,
    private authService: AuthenticationService,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Password Reset Request');

    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email])
    });

    this.form.get('email')?.valueChanges
      .subscribe((val: string) => { this.email = val.toLowerCase(); });
  }

  async resetPassword() {
    this.loading = true;
    let res = await this.authService.passwordResetRequest(this.email)

    if(res.statusCode === 200 || res.error !== undefined) {
      this.notificationService.openSnackBar('Password verification mail has been sent to your email address.');
      this.router.navigate(['/auth/login']);
    } else {
      this.loading = false;
      this.notificationService.openSnackBar(res.message);
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
