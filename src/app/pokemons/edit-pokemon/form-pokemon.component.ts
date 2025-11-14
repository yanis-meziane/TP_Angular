import { Component, OnInit, Input } from "@angular/core";
import { Pokemon } from "../donnees-pokemons/pokemon";
import { FormsModule } from "@angular/forms";
import { PokemonTypeColorPipe } from "../pipes/pokemon-type-color.pipe";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { PokemonsService } from "../pokemons.service";


@Component({
  standalone: true,
  selector: 'form-pokemon',
  templateUrl: "./form-pokemon.component.html",
  imports: [
    CommonModule,
    FormsModule,
    PokemonTypeColorPipe
  ]
})
export class FormPokemonComponent implements OnInit{

  @Input() pokemon: any;
  types : any = [];

  constructor(private router: Router, private pokemonsService: PokemonsService){

  }

  ngOnInit(): void {
    this.types = this.pokemonsService.getPokemonTypes();
  }



  //Détermine si le type passé en paramètre appartient ou non au pokémon en cours d'édition
  hasType(type: string):boolean{
    let index = this.pokemon.types.indexOf(type)
    return(index > -1);
  }

  //Valide le nombre types pour chaque pokémon
  isTypeValid(type: string): boolean{
    
    if(this.pokemon.types.length === 1 && this.hasType(type) ){
      return false;
    }

    if(this.pokemon.types.length >= 3 && !this.hasType(type) ){
      return false;
    }
    return true;
  }

  //Méthode appélée pour ajouter ou retirer un type du pokémon en cours d'édition
  selectType($event: any, type: string){
    let checked = $event.target.checked;

    if(checked){
      this.pokemon.types.push(type);
    }else{
      let index = this.pokemon.types.indexOf(type);
      if(index > -1){
        this.pokemon.types.splice(index,1);
      }
    }
  }

  onSubmit():void{
    
    this.pokemonsService.updatePokemon(this.pokemon).subscribe( () => {
      this.router.navigate(['pokemon/', this.pokemon.id ])
    })

  }

}