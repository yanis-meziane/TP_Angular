import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rarity',
  standalone: true,
})
export class RarityPipe implements PipeTransform {
  transform(rarity: number): string {
    if (rarity < 1 || rarity > 5) {
      return '★'; 
    }
   
    return '★'.repeat(rarity);
  }
}


@Pipe({
  name: 'pokemonTypeColor',
  standalone: true,
})
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    let color: string;

    switch (type) {
      case 'Feu':
        color = 'bg-red-600';
        break;
      case 'Eau':
        color = 'bg-blue-600';
        break;
      case 'Plante':
        color = 'bg-green-600';
        break;
      case 'Insecte':
        color = 'bg-lime-600';
        break;
      case 'Normal':
        color = 'bg-gray-400';
        break;
      case 'Vol':
        color = 'bg-sky-400';
        break;
      case 'Poison':
        color = 'bg-purple-600';
        break;
      case 'Fée':
        color = 'bg-pink-400';
        break;
      case 'Psy':
        color = 'bg-indigo-600';
        break;
      case 'Electrik':
        color = 'bg-yellow-400';
        break;
      case 'Combat':
        color = 'bg-orange-600';
        break;
      default:
        color = 'bg-gray-300';
        break;
    }

    return color;
  }
}
