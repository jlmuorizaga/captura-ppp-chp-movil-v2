export class PromocionEspecial {
  idPromocion!: string;
  nombre!: string;
  descripcion!: string;
  tipo!:string;
  definicion!:string;
  precio!:number;
  activa!:string;
  imgURL!:string;

   //Mu Se creó este constuctor el 23 dic 2024
  constructor(
    idPromocion: string,
    nombre: string,
    descripcion: string,
    tipo:string,
    definicion:string,
    precio:number,
    activa:string,
    imgURL:string,
  ){
    this.idPromocion=idPromocion;
    this.nombre=nombre;
    this.descripcion=descripcion;
    this.tipo=tipo;
    this.definicion=definicion;
    this.precio=precio;
    this.activa=activa;
    this.imgURL=imgURL;
  }

  public get tipoCompleto():string{

    if (this.tipo==='CB'){
      return 'Combo';
    }else{
      return 'Precio Especial';
    }
  }

  public get activaCompleto():string{

    if (this.activa==='S'){
      return 'Sí';
    }else{
      return 'No';
    }
  }
}
