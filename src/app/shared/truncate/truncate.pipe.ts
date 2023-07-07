import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 100): string {
    if (!value || value?.length <= maxLength) {
      return value;
    } else {
      return value.substring(0, maxLength) + '...';
    }
  }
}
