import { Pipe, PipeTransform } from '@angular/core';
import { StatusType } from '@minta-ltd-recruit-platform/api-client';

@Pipe({
  name: 'statusValue',
  standalone: true
})
export class StatusValuePipe implements PipeTransform {
  transform(key: string): StatusType {
    const status = key as keyof typeof StatusType;
    return StatusType[status];
  }
}
