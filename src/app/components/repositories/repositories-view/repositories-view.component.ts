import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription, switchMap, throwError } from '@rx';
import { RepositoriesService } from '@shared/services/repositories.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { isObjectDefined } from '@shared/utils';

@Component({
  selector: 'github-repositories-view',
  templateUrl: './repositories-view.component.html',
  styleUrls: ['./repositories-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesViewComponent implements OnInit, OnDestroy {

  public repoData: any;
  public isImageLoaded: boolean = false;
  private readonly subscription: Subscription = new Subscription();
  public loading = true;
  public readmeContent: SafeHtml = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private repositoriesService: RepositoriesService,
    private sanitizer: DomSanitizer,
    private ref: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    const routeParamsSubscription = this.activatedRoute.paramMap.subscribe({
      next: (params: ParamMap) => {
        if (!params.has('repos') || !params.has('user')) {
          this.loading = false;
          this.router.navigate(['']);
          this.ref.markForCheck();
          return;
        }
        this.loading = true;
        this.fetchRepository(params.get('user') || '', params.get('repos') || '');
        this.ref.markForCheck();
      },
    });
    this.subscription.add(routeParamsSubscription);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchRepository(user: string, repos: string): void {
    this.repositoriesService.get(user, repos)
    .pipe(switchMap((res: any) => {
      if(!isObjectDefined(res)){
        return throwError(() => new Error('no repos'));
      }
      this.repoData = res;
      return this.repositoriesService.getReadMe(user, repos);
    }))
    .subscribe({
      next: (data: any) => {
        const readmeBase64 = data.content;
        const readmeText = atob(readmeBase64);
        this.readmeContent = this.sanitizer.bypassSecurityTrustHtml(readmeText);
        this.loading = false;
        this.ref.markForCheck();
      },
      error: () => {
        console.error('Error in fetching repository');
      }
    })
  }

}
