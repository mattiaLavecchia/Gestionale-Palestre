import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'subscriptionType'
})
export class SubscriptionTypePipe implements PipeTransform {
    transform(value: number): string {
        switch (value) {
            case 1:
                return 'Mensile';
            case 2:
                return 'Bimestrale';
            case 3:
                return 'Trimestrale';
            case 6:
                return 'Semestrale';
            case 12:
                return 'Annuale';
            default:
                return 'Sconosciuto';
        }
    }
}