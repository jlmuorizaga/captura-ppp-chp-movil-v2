export class Producto {
  id!: string;
  descripcionP!: string;
  tamanio!: string;
  usaSalsa!: string;
  idTipoProducto!: string;
  nombreTP!:string;
  rutaImagen!: string;
  categoria1!: string;
  categoria2!: string;
  categoria3!: string;
  aplicaBebidaGratis!: string;

  constructor(
    id: string,
    descripcionP: string,
    tamanio: string,
    usaSalsa: string,
    idTipoProducto: string,
    nombreTP:string,
    rutaImagen: string,
    categoria1: string,
    categoria2: string,
    categoria3: string,
    aplicaBebidaGratis: string = 'N'
  ) {
    this.id=id;
    this.descripcionP=descripcionP;
    this.tamanio=tamanio;
    this.usaSalsa=usaSalsa;
    this.idTipoProducto=idTipoProducto;
    this.nombreTP=nombreTP;
    this.rutaImagen=rutaImagen;
    this.categoria1=categoria1;
    this.categoria2=categoria2;
    this.categoria3=categoria3;
    this.aplicaBebidaGratis=aplicaBebidaGratis;
  }

  public get usaSalsaCompleto(): string {
    if (this.usaSalsa === 'S') {
      return 'Sí';
    } else {
      return 'No';
    }
  }

  public get aplicaBebidaGratisCompleto(): string {
    if (this.aplicaBebidaGratis === 'S') {
      return 'Sí';
    } else {
      return 'No';
    }
  }
}
