import { Component, EventEmitter, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';

import { NumbersService } from '../numbers.service';
import { NumberComponent } from '../number/number.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule, NumberComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private numbersService = inject(NumbersService);
  numbers = this.numbersService.numbers;
  passwordId = signal('7070');
  currentNumber = signal<string>('');
  star = signal('');
  text = signal<string>('Enter password');
  counter = 0;
  private router = inject(Router);

  onSubmit() {

    if (this.currentNumber() === this.passwordId()) {
      this.currentNumber.set('');
      this.star.set('');
      this.router.navigate(['tables'], {
        replaceUrl: true,
      })
    } else {
      this.star.set('Please enter valid password!');
      setTimeout(() => {
        this.currentNumber.set('');
        this.star.set('');
        this.counter = 0;
      }, 1500);
    }
  }

  onClick(number: { id: string; value: string; }) {
    if (number.value === '<') {
      this.currentNumber.set(this.currentNumber().slice(0, - 1));
      this.star.set(this.star().slice(0, -1));
      this.counter--;
      

      if (this.counter <= 0) {
        this.text.set('Enter password');
        this.counter = 0;
      }
    } else {
      if(this.counter > 8) {
        return;
      }
      this.currentNumber.set(this.currentNumber() + number.value);
      this.star.set(this.star() + '*');
      this.counter++;

    }
  }

  onClear() {
    this.counter = 0;
    this.currentNumber.set('');
    this.star.set('');
  }
}
