import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { DataSource } from '@shared/datasource';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RepositoriesService } from '@shared/services/repositories.service';
import { PageRequest, SearchModel, QueryParams } from '@shared/models/model';
import { Subscription } from '@rx';
import { isDefined } from '@shared/utils';

interface SortModel {
  key: string;
  value: string;
}

@Component({
  selector: 'github-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  public dataSource!: DataSource<any>;
  public searchQuery: string = '';
  public queryParams: QueryParams = {};
  public sortValues: Array<SortModel> = [
    {
      key: '-stars',
      value: 'Most Stars'
    },
    {
      key: 'stars',
      value: 'Fewest Stars'
    },
    {
      key: '-forks',
      value: 'Most forks'
    },
    {
      key: 'forks',
      value: 'Fewest forks'
    },
    {
      key: '-updated',
      value: 'Recently updated'
    },
    {
      key: 'updated',
      value: 'Least recently updated'
    }
  ];
  private readonly subscription: Subscription = new Subscription();

  constructor(
    private repositoriesService: RepositoriesService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const routeParamsSubscription = this.activatedRoute.queryParamMap.subscribe(
      {
        next: (params: ParamMap) => {
          if (params.has('q')) {
            this.searchQuery = params.get('q') || '';
            this.search(
              params.get('q') || '',
              params.get('sort') || '',
              parseInt(params.get('page_limit') || '10'),
              parseInt(params.get('page') || '1')
            );
          }
          this.ref.markForCheck();
        },
      }
    );
    this.subscription.add(routeParamsSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public search(
    searchQuery: string,
    sort: string = '',
    page_limit = 10,
    page = 1
  ) {
    if (!this.dataSource) {
      this.dataSource = new DataSource<SearchModel>(
        (request: PageRequest) => {
          return this.repositoriesService.getAll(request);
        },
        sort,
        searchQuery,
        page_limit,
        page
      );
      const onDataSourceSubscription = this.dataSource.loading.subscribe((res: boolean) => {
        if(!res) {
          const paramsTemp: QueryParams = {
            q: this.dataSource.searchQuery,
            sort: this.dataSource.sortBy,
            page_limit: this.dataSource.perPage,
            page: this.dataSource.page,
          };
          this.createUrlParams(paramsTemp);
        }
      });
      this.subscription.add(onDataSourceSubscription);
      this.ref.markForCheck();
      return;
    }
    this.dataSource.setSearch(searchQuery);
    this.ref.markForCheck();
  }

  public paginate(page: number) {
    this.dataSource.setPage(page);
  }

  public sortBy(event: any) {
    this.dataSource.setSort(event?.target?.value);
  }

  private createUrlParams(
    pageParams: QueryParams,
    updateLocation: boolean = true
  ) {
    const paramSet = new Map<string, string>();
    for (const key in pageParams) {
      if (pageParams.hasOwnProperty(key) && isDefined(pageParams[key])) {
        paramSet.set(key, pageParams[key].toString());
      }
    }
    if (updateLocation) {
      const urlTree = this.router.parseUrl(this.router.url);
      urlTree.queryParams = Object.create(Object.prototype);
      for (const [key, value] of paramSet.entries()) {
        urlTree.queryParams[key] = value;
      }
      this.location.go(urlTree.toString());
      this.queryParams = pageParams;
    }
  }
}
