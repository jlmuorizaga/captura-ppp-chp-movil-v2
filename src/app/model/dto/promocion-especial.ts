export class PromocionEspecial {
  idPromocion!: string;
  nombre!: string;
  descripcion!: string;
  tipo!:string;
  definicion!:string;
  precio!:number;
  activa!:string;
  imgURL!:string;

  public get tipoCompleto():string{

    if (this.tipo==='CB'){
      return 'Combo';
    }else{
      return 'Precio Especial';
    }
  }
}
