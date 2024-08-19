import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Candidate } from './interfaces/candidate.interface';

@Injectable({
  providedIn: 'root'
})
export class CandidateApiService {
  constructor(private http: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('api/candidates').pipe(
      map((candidates) =>
        candidates.map((candidate) => ({
          ...candidate,
          dateOfApplication: new Date(candidate.dateOfApplication)
        }))
      )
    );
  }

  saveCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.post<Candidate>('api/candidates', candidate);
  }

  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`api/candidates/${id}`);
  }

  updateCandidate(candidate: Candidate): Observable<Candidate> {
    return this.http.put<Candidate>(`api/candidates/${candidate.id}`, candidate);
  }
}
