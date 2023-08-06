import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  public searchInput = new FormControl(''); // reactive form
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor(private readonly heroesService: HeroesService) {}

  // without Observable
  searchHero() {
    const value: string = this.searchInput.value || '';
    // TODO: aqui podriamos aplicar el Subject Observable - debounce, etc.

    this.heroesService
      .getSuggestions(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  // after select an option (autocomplete)
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    const heroEvent: Hero = event.option.value;
    if (!heroEvent) return (this.selectedHero = undefined);

    // this.heroesService.get(url)// si no obtuviese el hero completo, puedo hacer 1 req

    this.selectedHero = heroEvent;
    this.searchInput.setValue(this.selectedHero.superhero);
  }
}
