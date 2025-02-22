import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemComponent } from "../../item/item.component";
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../items.service';
import { ButtonComponent } from "../../button/button.component";
import { DataService } from '../../data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ItemComponent, ButtonComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  private itemService = inject(ItemsService);
  items = this.itemService.items;
  tableId = signal<string>('');
  status = signal<string>('open');
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  router = inject(Router);
  tableNumber = signal<string>('');
  tableSum = signal<number>(0);
  tableItems: { id: string, name: string, value: number, quantity: number }[] = [];

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   const number = params['number'];
    //   const sum = params['sum'];
    //   this.tableId.set(id);
    //   this.tableNumber.set(number);
    //   this.tableSum.set(sum);
    // });

    this.dataService.currentMessage.subscribe(msg => {
      this.tableNumber.set(msg);
    });

  }

  onClick(item: { id: string; name: string; value: number, quantity: number }) {

    const existingItem = this.tableItems.find((i) => i.id === item.id);

    if (!existingItem) {
      item.quantity = item.quantity + 1;
      this.tableItems.push(item);
    } else {
      existingItem.quantity = existingItem.quantity + 1;
    }

    this.tableSum.set(+this.tableSum() + item.value);

    // console.log(this.tableItems);


  }

  // changeQueryParam() {
  //   this.router.navigate(['/tables'], {
  //     relativeTo: this.route,
  //     queryParams: { sum: this.tableSum() },
  //     queryParamsHandling: 'merge', 
  //   });
  // }

  onSubmit() {
    // this.route.queryParams.subscribe(params => {
    //   const id = params['id'];
    //   const number = params['number'];
    //   let sum = params['sum'];
    //   sum = this.tableSum();
    //   console.log(sum);

    console.log(this.tableItems);
    
    console.log(this.status());
    
    const tableData = { number: this.tableNumber(),items: this.tableItems, status: this.status(), totalSum: this.tableSum() };

    console.log(tableData);

    this.dataService.insertTableData(tableData).subscribe(response => {
      console.log('Data inserted:', response);
    }, error => {
      console.error('Error:', error);
    });

    this.router.navigate(['/tables']);
    // });

  }
}
