import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { tap } from 'rxjs';
import { CustomSnackBarComponent } from 'src/app/shared/custom-snack-bar/custom-snack-bar.component';
import { CustomerDetails } from 'src/app/shared/model/customerDetails.model';
import { SubscriptionDetails } from 'src/app/shared/model/subscriptionDetails.model';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { SubscriptionService } from 'src/app/shared/services/subscription.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {
  public myForm!: FormGroup;
  private subscriptionsDetails: SubscriptionDetails[] = [];
  private idCustomer!: string;
  public subscriptions = new Set<number>();
  public weeklyWorkouts = new Set<number>();
  public isEditMode: boolean = false;

  public isLoading: boolean = false;

  constructor(
    private customersService: CustomersService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private subscriptionService: SubscriptionService,
    private _snackBar: MatSnackBar,
  ) {
    this.getSubscriptionTypes();
  }

  ngOnInit(): void {
    this.initForm();
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      if (!paramMap.has('id')) return;
      this.isLoading = true;
      this.isEditMode = true;
      this.idCustomer = paramMap.get('id')!;
      this.customersService.getCustomerById(this.idCustomer).subscribe((customer: CustomerDetails) => {
        this.initFormWithValues(customer);
        this.isLoading = false;
      });
    })
  }

  private getSubscriptionTypes(): void {
    this.subscriptionService.getSubscriptions()
      .pipe(
        tap(val => {
          this.subscriptionsDetails = val
          this.populatedInput();
        })
      ).subscribe()
  }

  private populatedInput(): void {
    if (!this.subscriptionsDetails) return;
    this.subscriptionsDetails.map(subscription => {
      this.subscriptions.add(subscription.subscriptionDuration);
      this.weeklyWorkouts.add(subscription.weeklyWorkouts);
    })
  }

  private initForm(): void {
    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      birth: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      subscriptionDuration: new FormControl('', Validators.required),
      weeklyWorkouts: new FormControl('', Validators.required),
    });
  };

  private initFormWithValues(customer: CustomerDetails): void {
    this.myForm.patchValue({
      name: customer.name,
      surname: customer.surname,
      birth: customer.birth,
      gender: customer.gender,
      subscriptionDuration: customer.subscriptionDuration,
      weeklyWorkouts: customer.weeklyWorkouts,
    });
  };

  public onSaveCustomer(): void {
    if (this.myForm.invalid) return;
    this.isLoading = true;
    const customerData = this.myForm.value;

    if (this.isEditMode) {
      customerData._id = this.idCustomer; // Aggiungi l'ID del cliente al dato per l'aggiornamento
      console.log(customerData);
      this.customersService.patchCustomer(customerData).subscribe(() => {
        this.router.navigate(['/']);
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Cliente aggiornato con successo',
        });
        this.isLoading = false;
      });
    } else {
      this.customersService.addCustomer(customerData).subscribe(() => {
        this.router.navigate(['/']);
        this._snackBar.openFromComponent(CustomSnackBarComponent, {
          duration: 3000,
          data: 'Cliente aggiunto con successo',
        });
        this.isLoading = false;
      });
    }
  }

}
