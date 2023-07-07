import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiPath, PageRequest, SearchModel } from '@shared/models/model';
import { Observable, of, map } from '@rx';
import { isObjectDefined } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  constructor(private httpClient: HttpClient) {}

  public getAll(paramsQuery: PageRequest): Observable<SearchModel> {
    if (!isObjectDefined(paramsQuery)) {
      return of<SearchModel>({} as SearchModel);
    }

    return this.httpClient
      .get<SearchModel>(`${apiPath}/search/repositories`, {
        params: paramsQuery as any,
      })
      .pipe(map((res: SearchModel) => res));
  }

  public get(user: string, repos: string): Observable<any> {
    if (!user || !repos) {
      return of({});
    }

    return this.httpClient
      .get<SearchModel>(`${apiPath}/repos/${user}/${repos}`);
  }

  public getReadMe(user: string, repos: string): Observable<any> {
    if (!user || !repos) {
      return of({});
    }

    return this.httpClient
      .get<SearchModel>(`${apiPath}/repos/${user}/${repos}/readme`);
  }
}
