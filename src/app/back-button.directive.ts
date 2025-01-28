import { Location } from '@angular/common';
import { Directive, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[appBackButton]',
  standalone: true
})
export class BackButtonDirective {
  private router = inject(Router);

  constructor(private location: Location) { }

  @HostListener('click')
  onClick() {
    if(this.router.url !== '/') {
      this.location.back();
    }
  }
}
