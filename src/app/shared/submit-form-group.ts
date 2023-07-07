import { FormGroup } from '@angular/forms';

export class SubmitFormGroup extends FormGroup {
  private loading = false;

  constructor(
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    form: any,
    validators = null,
    isLoading = false
  ) {
    super(form, validators);
    this.loading = isLoading;
  }

  public get isLoading(): boolean {
    return this.loading;
  }

  public set isLoading(value: boolean) {
    this.loading = value;
  }
}
