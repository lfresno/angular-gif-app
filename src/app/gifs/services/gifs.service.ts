import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

//con el provide in root, este servicio está disponible para todos los
//componentes que inyecten este servicio, sin necesidad de importarlo
@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList:Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey:string = 'NHXCcEiK2CA4M696zaqCNuwG7Jof7jgz';
  private serviceUrl:string = 'https://api.giphy.com/v1/gifs';

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log("Gifs service ready");
   }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  private organizeHistory(tag:string){
    tag = tag.toLowerCase();  //porque ts es case sensitive y para ahorrarnos problemas

    //borro el tag si este se repite
    if(this._tagsHistory.includes(tag)){
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag != tag);
    }

    this._tagsHistory.unshift(tag); //se pone arriba del todo
    this._tagsHistory = this._tagsHistory.splice(0,10); //se limita a 10 elementos

    this.saveLocalStorage();
  }

  //guardar info en localstorage para que haya un poco de persistencia entre sesiones
  //no tiene capacidad para guarrdar mucha info, pero sí cosas pequeñas
  //lo guardado en localStorage solo se puede ver desde el equipo en el que se ha guardado y su dominio
  private saveLocalStorage():void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void {
    if(!localStorage.getItem('history')) return;  //si no hay datos, no cargamos nada

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if(this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag:string ):void {

    if(tag.length === 0) return;
    this.organizeHistory(tag);

    //parametros de la petición http
    //los usamos para que la legibilidad del código sea mejor y para poder hacer cambios más fácilmente en
    //el url de la petición http
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag)

    //objeto observable: puede emitir valores
    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp =>{
        this.gifList = resp.data;
        //console.log({gifs:this.gifList});
      })

  }
}
