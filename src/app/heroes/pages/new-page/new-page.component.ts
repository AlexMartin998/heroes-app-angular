import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmDialagComponent } from '../../components/confirm-dialag/confirm-dialag.component';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent implements OnInit {
  // // formulario reactivo
  public heroForm = new FormGroup({
    // reactive form
    id: new FormControl<string>(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel Comics' },
  ];

  constructor(
    private readonly heroesService: HeroesService,

    private activatedRoute: ActivatedRoute,
    private router: Router,

    private readonly snackbar: MatSnackBar,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // only populate form if data exists
    if (!this.router.url.includes('edit')) return;

    // // FETCH Hero by ID to populate form with Hero data
    // in React.js we have an store to set ActiveHero and then set that data in form without fetching data
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.findOne(id)))
      .subscribe((hero) => {
        if (!hero) return this.router.navigateByUrl('/');

        // popula basado en el  formControlName  x eso es bueno tener los mismos names en el form q se tiene en el back
        return this.heroForm.reset(hero);
      });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    // update
    if (this.currentHero.id)
      return this.heroesService.update(this.currentHero).subscribe((hero) => {
        // mostrar snackbar
        this.showSnackbar(`${hero.superhero} updated`);
      });

    // create
    return this.heroesService.create(this.currentHero).subscribe((hero) => {
      this.showSnackbar(`${hero.superhero} updated`);
      this.router.navigate(['/heroes/edit', hero.id]);
    });
  }

  onDeleteHero() {
    if (!this.currentHero.id) throw Error('Hero is required');

    const dialogRef = this.dialog.open(ConfirmDialagComponent, {
      data: this.heroForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result), // solo pasa si es true
        switchMap(() => this.heroesService.delete(this.currentHero.id)), // delete it
        filter((wasDeleted: boolean) => wasDeleted) // resp del deleted
      )
      .subscribe(() => this.router.navigateByUrl('/heroes/list')); // llega solo si wasDeleted

    /* without filters
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;

      this.heroesService.delete(this.currentHero.id).subscribe((wasDeleted) => {
        if (wasDeleted) this.router.navigateByUrl('/heroes/list');
      });
    }); */
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2500,
    });
  }
}
