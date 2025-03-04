import { AfterContentInit, AfterViewInit, Component, inject, OnInit, signal } from '@angular/core';
import { NumbersService } from '../numbers.service';
import { NumberComponent } from "../number/number.component";
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';
import { Tables } from './tables.model';

@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [NumberComponent, ButtonComponent, FormsModule, RouterLink],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent implements OnInit {
  private numbersService = inject(NumbersService);
  numbers = this.numbersService.numbers;
  tableInput = signal<string>('Enter table number');
  counter = 0;
  sum = signal<number>(0.00);
  currentNumber = signal<string>('');
  error = signal<string>('');
  private router = inject(Router);
  data: Tables[] = [];
  private dataService = inject(DataService);
  route: ActivatedRoute | null | undefined;

  ngOnInit(): void {
    this.fetchTables();
  }

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
      if (+this.currentNumber() < 1000) {
        if (+(this.currentNumber() + number.value) >= 1000 || this.currentNumber().length > 7) {
          this.error.set("Table number cannot be bigger than 1000 and more than 7 digits !!!");
          this.clearError();
          return;
        }
        if (this.currentNumber().includes('.') && number.value === '.') {
          this.error.set("Table number cannot contain two decimal points !!!");
          this.clearError();
          return;
        }
        this.currentNumber.set(this.currentNumber() + number.value);
        this.counter++;
      }
    }
    console.log(this.currentNumber());
    
  }

  clearError() {
    setTimeout(() => {
      this.error.set('');
    }, 3000);
  }

  onSubmit() {

    this.currentNumber.set('');
    this.counter = 0;

    this.router.navigate(['/table/:id']);

    this.fetchTables();
  }

  onClear() {
    this.counter = 0;
    this.currentNumber.set('');
  }

  onSelectTable(table: any) {
    this.dataService.setSelectedTable(table);
    this.router.navigate(['table', table.number]);
  }
  
  sendMessage() {
    this.dataService.changeMessage(this.currentNumber());
  }
  
  private fetchTables() {
    return this.dataService.getData().subscribe(
      (response) => {
        this.data = response;
        this.data.sort((a, b) => +a.number - +b.number);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
