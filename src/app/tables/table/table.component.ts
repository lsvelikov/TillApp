import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ItemComponent } from "../../item/item.component";
import { Router } from '@angular/router';
import { ItemsService } from '../../items.service';
import { ButtonComponent } from "../../button/button.component";
import { DataService } from '../../data.service';
import { BackActionService } from '../../back-action.sevice';
import { Subscription } from 'rxjs';
import { Table } from './table.model';

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
  selectedTable: any;
  private dataService = inject(DataService);
  router = inject(Router);
  tableNumber = signal<string>('');
  tableSum = signal<number>(0);
  tableData: any[] = [];
  data: Table[] = [];
  tableItems: { id: string, name: string, value: number, quantity: number }[] = [];
  backActionService = inject(BackActionService);
  private backActionSubscription: Subscription = new Subscription;
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {

    this.backActionSubscription = this.backActionService.backAction$.subscribe(() => {
      this.resetTable();
    });

    this.dataService.currentMessage.subscribe(msg => {
      this.tableNumber.set(msg);
    });

    const subscription = this.dataService.selectedTable.subscribe(tbl => {
      this.tableNumber.set(tbl.number);
      this.tableSum.set(tbl.totalSum);


      this.destroyRef.onDestroy(() => subscription.unsubscribe());
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

  }

  onSubmit() {

    const tableData = { number: this.tableNumber(), items: this.tableItems, status: this.status(), totalSum: this.tableSum() };

    console.log(this.data);
    

    this.dataService.insertTableData(tableData).subscribe(response => {
      console.log('Data inserted:', response);
    }, error => {
      console.error('Error:', error);
    });

    this.resetTable();

    this.router.navigate(['/tables'], {
      replaceUrl: true,
    });

  }

  ngOnDestroy() {
    if (this.backActionSubscription) {
      this.backActionSubscription.unsubscribe();
    }
  }

  private resetTable() {
    for (const item of this.tableItems) {
      item.quantity = 0;
    }
  }
}
