import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-icon',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-icon.component.html',
  styleUrl: './search-icon.component.css',
})
export class SearchIconComponent {
  searchCritiria = '';
  constructor() {
    console.log(this.searchCritiria);
  }
  onSearchChange() {
    console.log('Search criteria changed:', this.searchCritiria);
  }
}
