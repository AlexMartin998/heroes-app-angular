import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];

  constructor(private readonly heroesService: HeroesService) {}

  ngOnInit(): void {
    // toda req http se dispara cuando se monta el component, como es 1 Observable .subscribe()
    this.heroesService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
