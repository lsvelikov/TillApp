import { Component, inject, signal } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { NumbersService } from '../numbers.service';
import { NumberComponent } from "../number/number.component";
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [TableComponent, NumberComponent, ButtonComponent, FormsModule],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  private numbersService = inject(NumbersService);
  numbers = this.numbersService.numbers;
  tableInput = signal<string>('Enter table number');
  counter = 0;
  currentNumber = signal<string>('');
  error = signal<string>('');
  private router = inject(Router);

  onClick(number: { id: string; value: string; }) {
    if (number.value === '<') {
      this.currentNumber.set(this.currentNumber().slice(0, - 1));
      this.counter--;
      
      if (this.counter <= 0) {
        this.tableInput.set('Enter table number');
        this.counter = 0;
      }
    } else {
      if ((number.value === '0' && this.counter === 0) || (number.value === '.' && this.counter === 0)) {
        this.error.set("Table number cannot start with '0' or '.' !!!");
        this.clearError();
        return;
      }
      if(+this.currentNumber() < 1000) {
        if(+(this.currentNumber() + number.value) >= 1000 || this.currentNumber().length > 7) {
          this.error.set("Table number cannot be bigger than 1000 and more than 7 digits !!!"); 
          this.clearError();
          return;
        }
        if(this.currentNumber().includes('.') && number.value === '.') {
          this.error.set("Table number cannot contain two decimal points !!!");
          this.clearError();
          return;
        }
        this.currentNumber.set(this.currentNumber() + number.value);
        this.counter++;
      }
    }
  }

  clearError() {
    setTimeout(() => {
      this.error.set('');
    }, 3000);
  }

  onSubmit() {
    this.currentNumber.set('');
    this.counter = 0;

    this.router.navigate(['table'], {
      replaceUrl: true,
    })
     
  }

  onClear() {
    this.counter = 0;
    this.currentNumber.set('');
  }
}
