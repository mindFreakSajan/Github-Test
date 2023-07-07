import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesRoutingModule } from './repositories-routing.module';
import { SearchModule } from '@shared/components/search/search.module';
import { LoaderComponent } from '@shared/components/loader/loader.component';
import { CardComponent } from '@shared/components/card/card.component';
import { TruncatePipe } from '@shared/truncate/truncate.pipe';
import { PaginationComponent } from '@shared/components/pagination/pagination.component';
import { RepositoriesViewComponent } from './repositories-view/repositories-view.component';

@NgModule({
  imports: [CommonModule, FormsModule, RepositoriesRoutingModule, SearchModule],
  declarations: [
    RepositoriesComponent,
    LoaderComponent,
    CardComponent,
    TruncatePipe,
    PaginationComponent,
    RepositoriesViewComponent
  ],
})
export class RepositoriesModule {}
