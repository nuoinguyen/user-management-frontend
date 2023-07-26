import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';

import { backend_api, environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';
import { REGISTER_FORM_DATA } from '../models/auth/auth-forms.model';
import axios from 'axios';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    constructor(private http: HttpClient,
        private router: Router,
        @Inject('LOCALSTORAGE') private localStorage: Storage,
        private notificationService: NotificationService,) {
    }

    login(email: string, password: string) {
        const formData = { email: email, password: password }

        return axios.post(backend_api.apiUrl + 'login', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        let user = localStorage.getItem('currentUser');
        let parsedUser;

        if (user !== null) {
            try {
                parsedUser = JSON.parse(user);
                return {
                    isAdmin: true,
                    alias: parsedUser.email.split('@')[0],
                    expiration: moment().add(1, 'days').toDate(),
                    fullName: parsedUser.firstName + ' ' + parsedUser.lastName,
        
                    id: parsedUser.id,
                    token: 'aisdnaksjdn,axmnczm',
                    firstName: parsedUser.firstName,
                    lastName: parsedUser.lastName,
                    email: parsedUser.email,
                    phone: parsedUser.phone,
                    address: parsedUser.address,
                    appKey: parsedUser.appKey,
                    roleId: parsedUser.roleId,
                    status: parsedUser.status,
                    createDate: parsedUser.createDate,
                    updateDate: parsedUser.updateDate,
                };
            } catch (error) {
                console.error('Error parsing JSON data from localStorage:', error);
            }
        } else {
            this.router.navigate(['/auth/login']);
        }
        
    }

    passwordResetRequest(email: string) {
        const formData = {email: email};
        return axios.post(backend_api.apiUrl + 'users/reset-password', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            }).catch(error => {
                console.log()
                return error.response.data.error;
            })
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        // return of(true).pipe(delay(1000));
        const formData = {
            email: email,
            currentPwd: currentPwd,
            newPwd: newPwd
        };

        return axios.post(backend_api.apiUrl + 'users/change-password', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            }).catch(error  => {
                return error.response.data;
            });
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string) {
        const formData = {
            email: email,
            token: token,
            password: password
        };

        return axios.post(backend_api.apiUrl + 'users/reset-password/verify', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            }).catch(error  => {
                return error.response.data;
            });
    }

    register(formData: REGISTER_FORM_DATA): any {
        delete formData.passwordConfirm;

        return axios.post(backend_api.apiUrl + 'register', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response
            })
    }
}
