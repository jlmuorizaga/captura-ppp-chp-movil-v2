import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public idSucursalGlobal:string='';
  cveSucursalGlobal: string = ''; // 👈 Agrega esta línea
 // public cveSucursalGlobal: string = '';
 // public nombreSucursalGlobal:string='';

  constructor() { }
}

