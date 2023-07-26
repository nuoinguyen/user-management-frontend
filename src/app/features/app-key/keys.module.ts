import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  KeysRoutingModule } from './keys-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KeyListComponent } from './key-list/key-list.component';
import { GenerateKeyComponent } from './generate-key/generate-key.component';

@NgModule({
    imports: [
        CommonModule,
        KeysRoutingModule,
        SharedModule
    ],
    declarations: [
        KeyListComponent,
        GenerateKeyComponent
    ]
})
export class KeysModule { }
