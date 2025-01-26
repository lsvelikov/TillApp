import { Injectable } from "@angular/core";
import { NUMBERS_VALUES } from "./numbers-values";

@Injectable({
    providedIn: 'root',
  })
export class NumbersService {
    get numbers () {
        return NUMBERS_VALUES;
    }
}