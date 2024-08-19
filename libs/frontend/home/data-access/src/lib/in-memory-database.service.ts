import { Injectable } from '@angular/core';
import { StatusType } from '@minta-ltd-recruit-platform/api-client';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDatabaseService implements InMemoryDbService {
  createDb() {
    const candidates = [
      {
        id: 1,
        name: 'John Doe',
        experience: 5,
        position: 'Frontend',
        email: 'john.doe@example.com',
        status: 'InterviewRound1' as keyof typeof StatusType,
        dateOfApplication: '2024-08-01'
      },
      {
        id: 2,
        name: 'Jane Smith',
        experience: 3,
        position: 'Backend',
        email: 'jane.smith@example.com',
        status: 'InterviewRound1' as keyof typeof StatusType,
        dateOfApplication: '2024-08-02'
      },
      {
        id: 3,
        name: 'Sam Wilson',
        experience: 7,
        position: 'Fullstack',
        email: 'sam.wilson@example.com',
        status: 'TaskPosted' as keyof typeof StatusType,
        dateOfApplication: '2024-08-03'
      },
      {
        id: 4,
        name: 'Test User',
        experience: 7,
        position: 'Fullstack',
        email: 'sam.wilson@example.com',
        status: 'NotifiedOffer' as keyof typeof StatusType,
        dateOfApplication: '2024-08-03'
      },
      {
        id: 5,
        name: 'Joe Almond',
        experience: 7,
        position: 'Fullstack',
        email: 'sam.wilson@example.com',
        status: 'NotifiedRejected' as keyof typeof StatusType,
        dateOfApplication: '2024-08-03'
      },
      {
        id: 6,
        name: 'Joe Foo',
        experience: 7,
        position: 'Fullstack',
        email: 'sam.wilson@example.com',
        status: 'NotifiedRejected' as keyof typeof StatusType,
        dateOfApplication: '2024-08-03'
      },
      {
        id: 7,
        name: 'Joe Bar',
        experience: 7,
        position: 'Fullstack',
        email: 'sam.wilson@example.com',
        status: 'TaskPosted' as keyof typeof StatusType,
        dateOfApplication: '2024-08-03'
      }
    ];
    return { candidates };
  }
}
