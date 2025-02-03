import { Injectable } from "@angular/core";
import { ITEM_VALUES } from "./items-values";

@Injectable({
    providedIn: 'root'
})
export class ItemsService {
    get items() {
        return ITEM_VALUES;
    }
}