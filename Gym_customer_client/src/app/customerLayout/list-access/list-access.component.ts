import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AccessDetails } from 'src/app/shared/model/accessDetails.model';
import { AccessService } from 'src/app/shared/services/access.service';

@Component({
  selector: 'app-list-access',
  templateUrl: './list-access.component.html',
  styleUrls: ['./list-access.component.scss']
})
export class ListAccessComponent {
  public isLoading: boolean = false;
  public displayedColumns: string[] = ['name', 'surname', 'access', 'subscriptionExpires'];
  public dataSource: MatTableDataSource<AccessDetails> = new MatTableDataSource<AccessDetails>();
  public totalAccess: number = 0;
  public accessPerPage: number = 5;
  public currentPage: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.accessService.getAccesses(this.currentPage, this.accessPerPage).subscribe(data => {
      this.dataSource.data = data.accesses;
      this.totalAccess = data.countAccess;
      this.isLoading = false;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.accessPerPage = pageData.pageSize;
    this.accessService.getAccesses(++pageData.pageIndex, pageData.pageSize).subscribe(data => {
      this.dataSource.data = data.accesses;
      this.totalAccess = data.countAccess;
      this.isLoading = false;
    });
  }
}
