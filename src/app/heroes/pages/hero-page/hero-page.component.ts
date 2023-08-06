import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {
  // en el init es undefined, hasta q se haga la peticion y traiga el hero
  public hero?: Hero;

  constructor(
    private readonly heroesService: HeroesService,
    private activatedRoute: ActivatedRoute, // obtener el param de la URL
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        // cambia lo q emite el Observable original (params) - retorna new Observable
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe((hero) => { // recibe lo q retorna el switchMap
        if (!hero) return this.router.navigateByUrl('/heroes/list');

        return (this.hero = hero);
      });
  }

  goBack(): void {
    this.router.navigateByUrl('/heroes/list');
  }
}
