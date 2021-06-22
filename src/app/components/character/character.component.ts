import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character } from './../../models/character';
import { RickMortyService } from './../../services/rick-morty.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  id: number;
  character: Character;
  cargando: boolean = false;

  constructor(
      private activatedRoute: ActivatedRoute,
      private rickMortyService: RickMortyService
    ) { 
      this.id = this.activatedRoute.snapshot.params.id;
      this.getCharacter();
  }

  ngOnInit(): void {}

  getCharacter(){
    this.cargando = true;
    this.rickMortyService.getOneCharacter(this.id).subscribe((res: any) => {
      this.cargando = false;
      console.log(res);
      this.character = res
    })
  }

}
