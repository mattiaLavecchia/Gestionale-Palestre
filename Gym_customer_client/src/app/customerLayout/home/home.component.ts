import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { CustomerDetails } from 'src/app/shared/model/customerDetails.model';
import { AccessService } from 'src/app/shared/services/access.service';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { PaymentsService } from 'src/app/shared/services/payments.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public isLoading: boolean = false;
  public displayedColumns: string[] = ['name', 'surname', 'birth', 'subscription', 'weeklyWorkouts', 'accesses', 'subscriptionExpires', 'status', 'actions'];
  public dataSource: MatTableDataSource<CustomerDetails> = new MatTableDataSource<CustomerDetails>();
  public totalCustomers: number = 0;
  public customersPerPage: number = 5;
  public currentPage: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customersService: CustomersService,
    private accessService: AccessService,
    private paymentsService: PaymentsService,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.customersService.getCustomers(this.currentPage, this.customersPerPage).subscribe(data => {
      this.dataSource.data = data.customers;
      this.totalCustomers = data.countCustomer;
      this.isLoading = false;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  doFilter(filterValue: EventTarget): void {
    this.dataSource.filter = (filterValue as HTMLTextAreaElement).value.trim().toLocaleLowerCase();
  }

  onChangedPage(pageData: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.customersPerPage = pageData.pageSize;
    this.customersService.getCustomers(++pageData.pageIndex, pageData.pageSize).subscribe(data => {
      this.dataSource.data = data.customers;
      this.totalCustomers = data.countCustomer;
      this.isLoading = false;
    });
  }

  addAccess(idCustomer: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Conferma accesso',
        message: 'Sei sicuro di voler procedere con l accesso?'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return
      this.accessService.addAccess(idCustomer).subscribe(() => {
        // location.reload();
        this.router.navigate(['/list-access'])
      });
    });

  }

  addPayment(idCustomer: string): void {
    this.paymentsService.addPayment(idCustomer).subscribe(() => {
      location.reload();
    });
  };


}
