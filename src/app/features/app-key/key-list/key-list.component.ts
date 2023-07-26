import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Router } from '@angular/router';
import { AppKeyService } from 'src/app/core/services/app-key.service';

export interface PeriodicElement {
  position: number
  id: number;
  userId: number;
  name: string;
  plaforms: string;
  key: string;
  status: string;
  createDate: string;
  updateDate: string;
  deleteDate: string;
  isActive: boolean;
  Action: string
}

let ELEMENT_DATA: PeriodicElement[];

@Component({
  selector: 'app-key-list',
  templateUrl: './key-list.component.html',
  styleUrls: ['./key-list.component.css']
})
export class KeyListComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'plaforms', 'key', 'status', 'created', 'Action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true })
  sort: MatSort = new MatSort;

  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
    private appKeyService: AppKeyService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('App keys');
    this.dataSource.sort = this.sort;
    this.initDataSource();
  }

  createAppKey() {
    this.router.navigate(['/app-key/generate-key']);
  }

  async initDataSource() {
    let res = await this.appKeyService.getAllKey()
    this.dataSource.data = res;

    console.log(this.dataSource);
  }
}
