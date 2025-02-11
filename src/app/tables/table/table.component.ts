import { Component, inject, OnInit, signal } from '@angular/core';
import { ItemComponent } from "../../item/item.component";
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  private itemService = inject(ItemsService);
  items = this.itemService.items;
  tableId = signal<string>('');
  private route = inject(ActivatedRoute);
  tableNumber = signal<string>('');
  tableSum = signal<number>(0);
  tableItems: { id:string, name: string, value: number, quantity: number } [] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const number = params['number'];
      const sum = params['sum'];
      this.tableId.set(id);
      this.tableNumber.set(number);
      this.tableSum.set(sum);
    });
  }

  onClick(item: { id: string; name: string; value: number, quantity: number }) {
  
    const existingItem = this.tableItems.find((i) => i.id === item.id);
    
    if(!existingItem) {
      item.quantity = item.quantity + 1;
      this.tableItems.push(item);
    } else {
      existingItem.quantity = existingItem.quantity + 1;
    }

    this.tableSum.set(+this.tableSum() + item.value);
    
  }
}
