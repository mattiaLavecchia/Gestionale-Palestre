import { PaymentsService } from './../../shared/services/payments.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { forkJoin } from 'rxjs';
import { PaymentDetails } from 'src/app/shared/model/paymentDetails.model';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
  selector: 'app-list-payment',
  templateUrl: './list-payment.component.html',
  styleUrls: ['./list-payment.component.scss']
})
export class ListPaymentComponent {
  displayedColumns: string[] = ['name', 'surname', 'paymentDate', 'price'];
  dataSource: MatTableDataSource<PaymentDetails> = new MatTableDataSource<PaymentDetails>();
  totalEarned: number = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public isLoading: boolean = false;

  constructor(private paymentsService: PaymentsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.paymentsService.getPayments().subscribe(payments => {
      this.dataSource.data = payments;
      this.totalImportEarned();
      this.isLoading = false;
    });
  }


  ngAfterViewInit() { }

  totalImportEarned() {
    this.dataSource.data.forEach(el => {
      this.totalEarned += el.price;
    })
  }
}
