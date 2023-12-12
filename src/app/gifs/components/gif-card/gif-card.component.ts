import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './gif-card.component.html'
})
export class GifCardComponent implements OnInit{

  @Input()
  public gif!:Gif;  //lo pongo opcional y luego compruebo si lo tengo

  ngOnInit(): void {
    if(!this.gif) throw new Error('Method not implemented.');
  }
}
