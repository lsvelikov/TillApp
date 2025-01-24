import { Component, inject } from '@angular/core';
import { NumberComponent } from "./number/number.component";
import { NumbersService } from './numbers.service';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [NumberComponent],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.css'
})
export class NumberInputComponent {
  private numbersService = inject(NumbersService);
  numbers = this.numbersService.numbers;

  onClick(number: { id: string; value: string; }) {
    console.log(number.value);
    
  }
}
