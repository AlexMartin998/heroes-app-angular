import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'heroesApp';

  // NOOO validar el auth aqui xq previo la validacion debe ser ejecutada antes de q tan si quiera se construya algun module, x eso se usan    @Guards()
}
