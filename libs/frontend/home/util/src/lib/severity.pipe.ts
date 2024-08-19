import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'severity',
  standalone: true
})
export class SeverityPipe implements PipeTransform {
  transform(value: string): 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast' {
    switch (value) {
      case 'SignedUp':
        return 'success';
      case 'InterviewRound1':
        return 'info';
      case 'TaskPosted':
        return 'warning';
      case 'TaskExpired':
        return 'danger';
      case 'TaskReturned':
        return 'secondary';
      case 'InterviewRound2':
        return 'contrast';
      case 'NotifiedOffer':
        return 'success';
      case 'NotifiedRejected':
        return 'danger';
      default:
        return 'secondary';
    }
  }
}
