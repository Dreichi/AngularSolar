import { Component } from '@angular/core';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';




@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent {
  title = 'Accueil';


}
