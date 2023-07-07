import { Observable } from 'rxjs';

export const apiPath = '/api';

export interface PageRequest {
  q?: string;
  sort?: string;
  order?: string;
  per_page?: number;
  page?: number;
}

export type Endpoint<T> = (req: PageRequest) => Observable<T>;

export interface SearchModel {
  incomplete_results: boolean;
  items: Array<any>;
  total_count: number;
}

export interface Pagination {
  count?: number;
  current_page?: number;
  has_next_page?: boolean;
  has_prev_page?: boolean;
  limit?: number;
  page_count?: number;
}

export interface QueryParams {
  [key: string]: string | number;
}
