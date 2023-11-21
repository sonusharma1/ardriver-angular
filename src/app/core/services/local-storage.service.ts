import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public storeItem(key:string, value:string){
    localStorage.setItem(key, value);
  }

  public getItem(key:string) {
    return localStorage.getItem(key);
  }

  public removeItem(key:string){
    localStorage.removeItem(key);
  }

}
