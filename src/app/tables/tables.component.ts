import { ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import { NumbersService } from '../numbers.service';
import { NumberComponent } from "../number/number.component";
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../data.service';

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
  data: any[] = [];
  private dataService = inject(DataService);
  route: ActivatedRoute | null | undefined;
  private cdRef = inject(ChangeDetectorRef);


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
  }

  clearError() {
    setTimeout(() => {
      this.error.set('');
    }, 3000);
  }

  onSubmit() {

    const currentUrl = this.router.url;

    const exsistingNumber = this.data.some((t) => t.number === (this.currentNumber()));

    if (!exsistingNumber) {
      const data = { number: this.currentNumber(), totalSum: this.sum() };

      this.dataService.insertData(data).subscribe(response => {
        console.log('Data inserted:', response);
      }, error => {
        console.error('Error:', error);
      });

    }

    this.fetchTables();

    this.currentNumber.set('');
    this.counter = 0;

    this.router.navigate([currentUrl], {
      replaceUrl: true
    })
  }

  onClear() {
    this.counter = 0;
    this.currentNumber.set('');
  }

  private fetchTables() {
    return this.dataService.getData().subscribe(
      (response) => {
        this.data = response; 
        this.data.sort((a, b) => +a.number - +b.number);  
        console.log(this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
