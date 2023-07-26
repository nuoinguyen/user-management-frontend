import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {

    currentUser: any;
    registerForm!: UntypedFormGroup;
    loading!: boolean;
    Roles: any = ['Admin', 'Author', 'Reader'];
    hidePasswordConfirm: boolean;

    constructor(
        private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService
    ) {
        this.hidePasswordConfirm = true;
    }

    ngOnInit() {
        this.titleService.setTitle('Register');
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.registerForm = new UntypedFormGroup({
            firstName: new UntypedFormControl('', Validators.required),
            lastName: new UntypedFormControl('', Validators.required),
            address: new UntypedFormControl('', Validators.required),
            phone: new UntypedFormControl('', Validators.required),
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl('', Validators.required),
            passwordConfirm: new UntypedFormControl('', Validators.required)
        });
    }

    async register() {
        const password = this.registerForm.get('password')?.value;
        const passwordConfirm = this.registerForm.get('passwordConfirm')?.value;

        if (password !== passwordConfirm) {
            this.notificationService.openSnackBar('Passwords do not match');
            return;
        }

        this.loading = true;

        if (this.registerForm.valid) {
            let res = await this.authenticationService.register(this.registerForm.value)
            if (res.data.statusCode === 200) {
                this.notificationService.openSnackBar('Register Success');
                this.router.navigate(['/auth/login']);
            } else {
                this.notificationService.openSnackBar('Register Failure');
                this.navigateToRegister();
            }
        }
    }

    navigateToRegister(): void {
        this.loading = false
        this.router.navigate(['/auth/register']);
    }
    login() {
        this.router.navigate(['/auth/login']);
    }

}