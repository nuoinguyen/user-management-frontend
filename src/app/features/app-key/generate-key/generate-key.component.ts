import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { AppKeyService } from 'src/app/core/services/app-key.service';

@Component({
    selector: 'app-generate-key',
    templateUrl: './generate-key.component.html',
})
export class GenerateKeyComponent implements OnInit {

    currentUser: any;
    keyForm!: UntypedFormGroup;
    loading!: boolean;
    hidePasswordConfirm: boolean;
    Platforms: any = ['Geocode', 'Android SDK', 'IOS SDK'];

    constructor(
        private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private appKeyService: AppKeyService
    ) {
        this.hidePasswordConfirm = true;
    }

    ngOnInit() {
        this.titleService.setTitle('Generate key');
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.keyForm = new UntypedFormGroup({
            name: new UntypedFormControl('', Validators.required),
            platform: new UntypedFormControl('', Validators.required)
        });
    }

    async generate() {
        this.loading = true;

        if (this.keyForm.valid) {
            let res = await this.appKeyService.register(this.keyForm.value);
            console.log(res.statusCode)
            if (res.statusCode === 200) {
                this.notificationService.openSnackBar('Generate app key Success');
                this.router.navigate(['/app-key']);
            } else {
                this.notificationService.openSnackBar('Generate app key Failure');
            }
        }
    }

    cancel() {
        this.router.navigate(['/app-key']);
    }

}