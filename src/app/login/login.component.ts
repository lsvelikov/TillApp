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
  enteredPassword = signal<string>('');
  text = signal<string>('Enter table number');
  login = false;
  private router = inject(Router);

  onSubmit() {
    
    // if (this.enteredPassword() === this.passwordId()) {
    //   this.enteredPassword.set('');
    //   this.login = true;
    //   this.router.navigate(['tables'], {
    //     replaceUrl: true,
    //   })
    // } else {
    //   this.enteredPassword.set('Please enter valid password!');
    //   setTimeout(() => {
    //     this.enteredPassword.set('');
    //   }, 1500);
    // }
  }

  onClick(number: {id: string; value: string;}) {
    this.enteredPassword.set(this.enteredPassword() + number.value);
    console.log(this.enteredPassword());
    
  }

  onClear() {

  }
}
