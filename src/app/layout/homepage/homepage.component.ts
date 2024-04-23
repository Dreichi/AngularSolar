import { Component, OnInit } from '@angular/core';
import {NavbarComponent} from "../../shared/components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FooterComponent } from '../../shared/footer/footer.component';
import AOS from 'aos';




@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    FooterComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.sass'
})
export class HomepageComponent implements OnInit{
  title = 'Accueil';

  ngOnInit() {
    AOS.init();
  }
}
