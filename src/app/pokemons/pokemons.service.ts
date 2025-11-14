import { Injectable } from "@angular/core";
import { Pokemon } from "./donnees-pokemons/pokemon";
import { POKEMONS } from "./donnees-pokemons/mock-pokemons";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { catchError, Observable, of, tap } from "rxjs";


@Injectable( { providedIn: 'root' })
export class PokemonsService{
  constructor(private http: HttpClient){}

  private pokemonsUrl = 'api/pokemons';
  getPokemonList(): Observable<Pokemon[]> {
    return of(POKEMONS);
  }

  

  //Methode qui gére proprement les erreurs dans les appels HTTP, sans faire planter l'application
  private handleError<T>(operation="operation", result?: T ){
    return (error: any): Observable<T> => {
      console.log(error);
      console.log(`${operation} failed : ${error.message}`);

      return of(result as T);
    };

  }

  private log(log: string){
    console.info(log);
  }

  //Permet de récupérer tous les pokémons
  getPokemons(): Observable<Pokemon[]>{
    return this.http.get<Pokemon[]>(this.pokemonsUrl).pipe(
      tap(_ => this.log('fetched pokemons')),
      catchError(this.handleError('getPokemons', []))
    )
  }
  
  
  //Permet de récupérer un pokemon
  getPokemon(id: number): Observable<Pokemon> {
    const url = `${this.pokemonsUrl}/${id}`;

      return this.http.get<Pokemon>(url).pipe(
        tap(_ => this.log(`fetched pokemon id=${id}`)),
        catchError(this.handleError<Pokemon>(`getPokemon id=${id}`))
      );
  }

  //Permet de mettre à jour le pokemon
  updatePokemon(pokemon: Pokemon): Observable<null> {
  // 1. Trouver l'index dans le tableau statique
  const index = POKEMONS.findIndex((p: Pokemon) => p.id === pokemon.id);

  if (index !== -1) {
    // 2. Remplacer l'ancien objet par le nouveau (mise à jour)
    POKEMONS[index] = pokemon;
    console.log(`Pokémon mis à jour: ${pokemon.name}`);
  }

  // 3. Retourner un Observable vide (simulant la réponse 200 OK)
  return of(null);
}

   //Permet de mettre à jour le pokemon
  deletePokemon(pokemon: Pokemon): Observable<Pokemon>{ 
    const httpOptions = {
      headers: new HttpHeaders({ 'content-type' : 'application/json'})
    };
    const url = `${this.pokemonsUrl}/${pokemon.id}`;

    return this.http.delete<Pokemon>(url, httpOptions).pipe(
        tap(_ => this.log(`delete pokemon id=${pokemon.id}`)),
        catchError(this.handleError<Pokemon>(`deletePokemon id=${pokemon.id}`))
      );
  }



  //Permet de récupérer tous les types de pokémon
  getPokemonTypes(): string[]{
    return ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol'];
  }

  
  searchPokemons(term: string): Observable<Pokemon[]>{
    if(!term.trim()){
      return of([]);
    }

    return this.http.get<Pokemon[]>(`${this.pokemonsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found pokemons matching "${term}`)),
    catchError(this.handleError<Pokemon[]>('searchPokemons', []))
  );
  }

  
}
