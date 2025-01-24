import { Component, input } from '@angular/core';
import { Number } from './number.model';

@Component({
  selector: 'app-number',
  standalone: true,
  imports: [],
  templateUrl: './number.component.html',
  styleUrl: './number.component.css'
})
export class NumberComponent {
  number = input.required<Number>();
}
