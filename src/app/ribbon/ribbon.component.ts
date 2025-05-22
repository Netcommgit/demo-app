import { Component } from '@angular/core';
import { RouterModule,RouterLinkActive, } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-ribbon',
  imports: [RouterModule,RouterLinkActive,CommonModule],
  templateUrl: './ribbon.component.html',
  styleUrl: './ribbon.component.scss'
})
export class RibbonComponent {

}
