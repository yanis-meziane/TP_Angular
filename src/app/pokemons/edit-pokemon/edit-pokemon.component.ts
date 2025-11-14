import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonsService } from '../pokemons.service';

@Component({
  standalone: true,
  selector: 'edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  imports: [
    CommonModule,
    FormsModule
]
})
export class EditPokemonComponent implements OnInit{
  
  pokemon: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private pokemonsService: PokemonsService){
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.pokemonsService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

}