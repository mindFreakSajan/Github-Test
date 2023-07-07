import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {}
