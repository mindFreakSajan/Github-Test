import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'github-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit {
  @Input() public title: string = '';
  @Input() public set value(value: string) {
    this.searchForm.get('search')?.setValue(value);
  }
  @Output() public searchString: EventEmitter<string> =
    new EventEmitter<string>();
  public searchForm: FormGroup = new FormGroup({
    search: new FormControl(''),
  });
  public placeHolderText: string = '';

  constructor(private ref: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.placeHolderText = `Search ${this.title}`;
    this.ref.markForCheck();
  }

  public updateSearch(): void {
    const formValue = this.searchForm.get('search')?.value?.trim();
    this.searchString.emit(formValue);
    this.ref.markForCheck();
  }
}
