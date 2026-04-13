import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
 // protected readonly title = signal('tpAnguler');
  title ='Licence Developement Informatique et Methodes DevOps';


  welcome() : void {
    alert(this.title + ",Bienvenue parmi nous");
  }
}
