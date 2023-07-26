import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import * as moment from 'moment';

import { backend_api, environment } from '../../../environments/environment';
import { of, EMPTY } from 'rxjs';
import { GENERATE_KEY_FORM_DATA, REGISTER_FORM_DATA } from '../models/auth/auth-forms.model';
import axios from 'axios';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AppKeyService {

    constructor(private http: HttpClient,
        private router: Router,
        @Inject('LOCALSTORAGE') private localStorage: Storage,
        private notificationService: NotificationService,
        private authService: AuthenticationService
        ) {}

    register(formData: GENERATE_KEY_FORM_DATA) {
        let user = this.authService.getCurrentUser();
        formData.userId = user.id;

        return axios.post(backend_api.apiUrl + 'app-keys', formData, { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            });
    }

    getAllKey() {
        return axios.get(backend_api.apiUrl + 'app-keys', { headers: backend_api.headers })
            .then(function (response) {
                return response.data;
            });
    }
}
