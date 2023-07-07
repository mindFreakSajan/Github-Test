import { Endpoint, PageRequest } from '@shared/models/model';
import {
  finalize,
  Subject,
  BehaviorSubject,
  Observable,
  switchMap,
  startWith,
  catchError,
  of,
} from 'rxjs';

export class DataSource<T> {
  public loading: Subject<boolean> = new Subject<boolean>();
  public loading$: Observable<boolean> = this.loading.asObservable();
  public page$: Observable<T>;
  private sort!: BehaviorSubject<string>;
  private search = new Subject<string>();
  private pageLimit = new Subject<number>();
  private pageNumber = new Subject<number>();

  constructor(
    public endpoint: Endpoint<T>,
    public sortBy: string,
    public searchQuery = '',
    public perPage = 10,
    public page = 1
  ) {
    this.sort = new BehaviorSubject<string>(sortBy);
    this.page$ = this.sort.pipe(
      switchMap((sort: string) => {
        return this.search.pipe(
          startWith(this.searchQuery ? this.searchQuery : ''),
          switchMap((searchQuery: string) => {
            if (!searchQuery) {
              return of<T>({} as T);
            }
            return this.pageLimit.pipe(
              startWith(this.perPage ? this.perPage : 10),
              switchMap((limit: number) => {
                return this.pageNumber.pipe(
                  startWith(this.page ? this.page : 1),
                  switchMap((pageNum: number) => {
                    this.loading.next(true);
                    const endPointData: PageRequest = {};
                    if (searchQuery) {
                      endPointData.q = searchQuery;
                    }
                    if (sort) {
                      endPointData.order = sort.includes('-') ? 'desc' : 'asc';
                      endPointData.sort = sort.replace('-', '');
                    }
                    if (limit) {
                      endPointData.per_page = limit;
                    }
                    if (pageNum) {
                      endPointData.page = pageNum;
                    }
                    return endpoint(endPointData).pipe(
                      finalize(() => this.loading.next(false)),
                      catchError(() => {
                        console.error('Error in fetching data');
                        return of<T>({} as T);
                      })
                    );
                  })
                );
              })
            );
          })
        );
      })
    );
  }

  public setSort(sort: string) {
    this.sortBy = sort;
    this.sort.next(sort);
  }

  public setSearch(searchQuery: string) {
    this.searchQuery = searchQuery;
    this.search.next(searchQuery);
  }

  public setPage(pageNum: number) {
    this.page = pageNum;
    this.pageNumber.next(pageNum);
  }

  public setPageLimit(perPage: number) {
    this.pageLimit.next(perPage);
    this.perPage = perPage;
  }
}
