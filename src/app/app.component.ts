import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" [routerLink]="['/home']">QuipuxApp</a>
      </div>
    </nav>

    <div class="container mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [RouterOutlet, RouterModule]
})
export class AppComponent {}
