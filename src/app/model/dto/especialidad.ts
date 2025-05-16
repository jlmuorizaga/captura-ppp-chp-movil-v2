export class Especialidad{
    id!:string;
    nombre!:string;
    ingredientes!:string;
    imgURL!:string;
    orden!:string;
    cantidadIngredientes!:string;
    esDeUnIngrediente!:string;

       //Mu Se creó este constuctor el 23 dic 2024
  constructor(
    id:string,
    nombre:string,
    ingredientes:string,
    imgURL:string,
    orden:string,
    cantidadIngredientes:string,
    esDeUnIngrediente:string,
  ){
    this.id=id;
    this.nombre=nombre;
    this.ingredientes=ingredientes;
    this.imgURL=imgURL;
    this.orden=orden;
    this.cantidadIngredientes=cantidadIngredientes;
    this.esDeUnIngrediente=esDeUnIngrediente;
  }
    public get esDeUnIngredientesCompleto():string{

    if (this.esDeUnIngrediente==='S'){
      return 'Sí';
    }else{
      return 'No';
    }
  }
}
