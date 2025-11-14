import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../donnees-pokemons/pokemon';
import { CommonModule, DatePipe } from '@angular/common';
import { BorderCardDirective } from '../directives/border-card.directive';
import { PokemonTypeColorPipe } from '../pipes/pokemon-type-color.pipe';
import { Router } from '@angular/router';
import { PokemonsService } from '../pokemons.service';
import { SearchPokemonComponent } from '../search-pokemon/search-pokemon.component';
@Component({
  standalone: true,
  selector: 'list-pokemons',
  imports: [
    CommonModule, // pour utiliser ngIf et ngFor
    DatePipe,
    BorderCardDirective,
    PokemonTypeColorPipe,
    SearchPokemonComponent
  ],
  templateUrl: './pokemons.component.html',
})
export class PokemonsComponentTs implements OnInit {
  
  pokemons: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonsService){
    this.pokemons = [];
  }

  ngOnInit(): void {
    
    this.pokemonService.getPokemons().subscribe(pokemons => this.pokemons = pokemons);

  }

  selectPokemon(pokemon: Pokemon){
    let link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }

}
