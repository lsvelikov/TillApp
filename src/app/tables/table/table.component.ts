import { Component, inject } from '@angular/core';
import { ItemComponent } from "../../item/item.component";
import { ItemsService } from '../../items.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ItemComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  private itemService = inject(ItemsService);
  items = this.itemService.items;

  onClick(item: {id: string; name: string; value: string}) {
    console.log(item.id);
    console.log(item.name);
    console.log(item.value);
    
    
    
  }
}
