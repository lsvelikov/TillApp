import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { NumberInputComponent } from "../number-input/number-input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, FormsModule, NumberInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  passwordId = signal('7070');
  enteredPassword = signal('');
  login = false;
  private router = inject(Router);

  onSubmit() {
    if (this.enteredPassword() === this.passwordId()) {
      this.enteredPassword.set('');
      this.login = true;
      this.router.navigate(['tables'], {
        replaceUrl: true,
      })
    } else {
      this.enteredPassword.set('Please enter valid password!');
      setTimeout(() => {
        this.enteredPassword.set('');
      }, 1500);
    }
  }
}
