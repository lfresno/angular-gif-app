import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {

  //sirve para tomar una referencia local
  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor(private gifsService:GifsService){}

  //searchTag(newTag:string ):void {
  searchTag():void {
    const newTag = this.tagInput.nativeElement.value;

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';

  }

}
