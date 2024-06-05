import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
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

  public isClickedButton: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private customersService: CustomersService,
    private accessService: AccessService,
    private paymentsService: PaymentsService,
    private dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

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
    this.isClickedButton = true;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Conferma accesso',
        message: 'Sei sicuro di voler procedere con l accesso?'
      },
      autoFocus: false,
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.isClickedButton = false;
        return;
      };
      this.accessService.addAccess(idCustomer).subscribe(() => {
        const customerIndex = this.dataSource.data.findIndex(customer => customer._id === idCustomer);
        if (customerIndex !== -1) {
          // Aggiorna i dati del customer
          --this.dataSource.data[customerIndex].accesses;
          // Forza l'aggiornamento del dataSource
          this.dataSource._updateChangeSubscription();
        }
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Accesso aggiunto con successo',
        });
      });
      this.isClickedButton = false;

    });

  }

  addPayment(idCustomer: string): void {
    this.isClickedButton = true;

    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Conferma pagamento',
        message: 'Sei sicuro di voler procedere con il pagamento del cliente?'
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.isClickedButton = false;
        return;
      };
      this.paymentsService.addPayment(idCustomer).subscribe((el) => {
        this.router.navigate(['/list-payment']);
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Pagamento effettuato con successo',
        });
      });
      this.isClickedButton = false;
    });

  };

}
