import { Component, inject } from '@angular/core';
import { TableComponent } from "./table/table.component";
import { NumbersService } from '../numbers.service';
import { NumberComponent } from "../number/number.component";
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [TableComponent, NumberComponent, ButtonComponent],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  private numbersService = inject(NumbersService);
  numbers = this.numbersService.numbers;

  onClick(number: { id: string; value: string; }) {
    console.log(number.value);
    
  }

  onSubmit() {
    
  }
}
