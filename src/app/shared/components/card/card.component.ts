import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'github-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public repoData: any;
  public isImageLoaded: boolean = false;
  constructor() {}

  public ngOnInit(): void {}
}
