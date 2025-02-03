import { Component, input } from '@angular/core';
import { Item } from './item.model';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  item = input.required<Item>();
}
