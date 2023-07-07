import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { QueryParams } from '@shared/models/model';
import { isDefined } from '@utils';

@Component({
  selector: 'github-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() public totalCount: number = 0;
  @Input() public params: QueryParams = {};
  @Output() public changePage: EventEmitter<number> = new EventEmitter<number>();
  public totalPageNumber: number = 0;
  public paginationArray: number[] = Array(5).fill(0);
  private visiblePageNumber = 5;

  constructor(private ref: ChangeDetectorRef) { }

  public ngOnInit(): void {
  }

  public ngOnChanges(): void {
    this.generatePagination();
  }

  public paginateTo(i: number): void {
    this.changePage.emit(i);
    this.ref.markForCheck();
  }

  public prev(): void {
    this.paginateTo(parseInt(this.params['page'].toString()) - 1);
  }

  public next(): void {
    this.paginateTo(parseInt(this.params['page'].toString()) + 1);
  }

  private generatePagination(): void {
    this.paginationArray = [];
    if(this.totalCount > 1000) {
      this.totalCount = 1000;
    }
    const pageLimit = parseInt(this.params['page_limit'].toString()) || 10;
    const temp = Math.floor(this.totalCount/pageLimit);
    const temp1 = (this.totalCount % pageLimit) ? 1 : 0;
    this.totalPageNumber = temp + temp1;

    let startPage = parseInt(this.params['page'].toString()) - Math.floor(this.visiblePageNumber / 2);
    let endPage = parseInt(this.params['page'].toString()) + Math.floor(this.visiblePageNumber / 2);

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > this.totalPageNumber) {
      startPage -= endPage - this.totalPageNumber;
      endPage = this.totalPageNumber;
    }

    for (let page = startPage; page <= endPage; page++) {
      this.paginationArray.push(page);
    }
    this.ref.markForCheck();
  }

}
