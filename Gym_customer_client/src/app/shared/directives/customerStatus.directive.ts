// user-status.directive.ts
import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[customerStatusColor]'
})
export class CustomerStatusDirective implements OnChanges {
    @Input() customerStatusColor!: string; // Lo stato dell'utente da valutare

    constructor(private el: ElementRef, private renderer: Renderer2) { }

    ngOnChanges(changes: SimpleChanges): void {
        // Rimuovi tutte le classi prima di applicarne di nuove
        this.renderer.removeClass(this.el.nativeElement, 'scaduto');
        this.renderer.removeClass(this.el.nativeElement, 'inScadenza');

        // Applica le classi condizionali in base allo stato dell'utente
        if (this.customerStatusColor === 'scaduto') {
            this.renderer.addClass(this.el.nativeElement, 'scaduto');
        } else if (this.customerStatusColor === 'in scadenza') {
            this.renderer.addClass(this.el.nativeElement, 'inScadenza');
        }
    }
}