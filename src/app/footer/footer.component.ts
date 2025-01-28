import { Component, inject, signal } from '@angular/core';
import { BackButtonDirective } from '../back-button.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [BackButtonDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
