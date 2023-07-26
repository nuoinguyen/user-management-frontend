import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

import { KeyListComponent } from './key-list/key-list.component';
import { GenerateKeyComponent } from './generate-key/generate-key.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: KeyListComponent },
      {path: 'generate-key', component: GenerateKeyComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KeysRoutingModule { }
