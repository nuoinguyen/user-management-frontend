import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import * as moment from 'moment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    currentUser: any;
    loginForm!: UntypedFormGroup;
    loading!: boolean;

    constructor(private router: Router,
        @Inject('LOCALSTORAGE') private localStorage: Storage,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
    ) {
    }

    ngOnInit() {
        // this.currentUser = this.authenticationService.getCurrentUser(); 
        // if(this.currentUser.id) {
        //     this.router.navigate(['/dashboard']);
        // }

        this.titleService.setTitle('Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new UntypedFormControl('', Validators.required),
            rememberMe: new UntypedFormControl(savedUserEmail !== null)
        });
    }

    async login() {
        const email = this.loginForm.get('email')?.value;
        const password = this.loginForm.get('password')?.value;
        const rememberMe = this.loginForm.get('rememberMe')?.value;

        this.loading = true;
        let res = await this.authenticationService.login(email.toLowerCase(), password);

        console.log(res)
        if (res.statusCode === 200 || res.statusCode === 302) {
            if (rememberMe) {
                localStorage.setItem('savedUserEmail', email);
            } else {
                localStorage.removeItem('savedUserEmail');
            }
            this.setLocalStorage(res.data);
            this.router.navigate(['/']);
        } else {
            this.notificationService.openSnackBar(res.message);
            this.loading = false;
        }
    }

    setLocalStorage(data: any) {
        this.localStorage.setItem('currentUser', JSON.stringify({
            id: data.id,
            token: 'aisdnaksjdn,axmnczm',
            alias:data.email.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            firstName:data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            appKey: data.appKey,
            roleId: data.roleId,
            status: data.status,
            createDate: data.createDate,
            updateDate: data.updateDate,
        }));
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }

    register() {
        this.router.navigate(['/auth/register']);
    }
}
