import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Publisher } from '../../interfaces';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
})
export class NewPageComponent {
  // // formulario reactivo
  public heroForm = new FormGroup({ // reactive form
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
}
