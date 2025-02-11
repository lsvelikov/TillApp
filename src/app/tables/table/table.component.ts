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
  private route = inject(ActivatedRoute);
  tableNumber = signal<string>('');
  tableSum = signal<number>(0);
  tableItems: { id:string, name: string, value: number } [] = [];

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      const number = params['number'];
      const sum = params['sum'];
      console.log(id, number, sum);
      this.tableNumber.set(number);
      this.tableSum.set(sum);
    });
  }

  onClick(item: { id: string; name: string; value: number }) {
    console.log(item.id);
    console.log(item.name);
    console.log(item.value);
    this.tableItems.push(item);
    console.log(this.tableItems);
    
  }
}
