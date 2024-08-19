import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateNotificationDto, NotificationsService, StatusType } from '@minta-ltd-recruit-platform/api-client';
import { Candidate, CandidateApiService } from '@minta-ltd-recruit-platform/home/data-access';
import { LayoutComponent } from '@minta-ltd-recruit-platform/home/ui';
import { SeverityPipe, StatusValuePipe } from '@minta-ltd-recruit-platform/home/util';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { BehaviorSubject, forkJoin, Observable, of, shareReplay, switchMap, tap } from 'rxjs';

@Component({
  selector: 'lib-home',
  standalone: true,
  imports: [
    CommonModule,
    LayoutComponent,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    DropdownModule,
    FormsModule,
    TagModule,
    SeverityPipe,
    StatusValuePipe,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private refreshSubject = new BehaviorSubject<void>(undefined);

  isDataLoading = signal(false);
  constructor(
    private candidateApiService: CandidateApiService,
    private notificationsService: NotificationsService,
    private messageService: MessageService
  ) {
    this.candidates$ = this.refreshSubject.pipe(
      shareReplay(1),
      tap(() => this.isDataLoading.set(true)),
      switchMap(() => this.candidateApiService.getCandidates()),
      tap(() => this.isDataLoading.set(false))
    );
  }

  candidates$: Observable<Candidate[]>;

  mobileMenuOpen = signal(false);

  selectedCandidates = signal<Candidate[] | null>(null);

  candidateDialog = signal(false);

  isEditMode = signal(false);
  candidateForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl<string>(''),
    experience: new FormControl<number>(0),
    position: new FormControl<string>(''),
    email: new FormControl<string>(''),
    status: new FormControl<StatusType>(StatusType.InterviewRound1),
    dateOfApplication: new FormControl<Date>(new Date())
  });

  readonly statuses = Object.entries(StatusType).map(([key, value]) => ({
    label: value,
    value: key
  }));
  mobileMenuToggle() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  deleteSelectedCandidates() {
    const deleteObservables = this.selectedCandidates()?.map((candidate) => this.candidateApiService.deleteCandidate(candidate.id));

    if (!deleteObservables || deleteObservables.length === 0) {
      return;
    }

    forkJoin(deleteObservables).subscribe({
      next: () => {
        this.refreshCandidates();
        this.selectedCandidates.set(null);
      }
    });
  }

  openAddDialog() {
    this.candidateForm.reset();
    this.candidateDialog.set(true);
    this.isEditMode.set(false);
  }

  saveOrUpdateCandidate() {
    const candidate = <Candidate>this.candidateForm.value;
    if (this.isEditMode()) {
      this.candidateApiService
        .updateCandidate(candidate)
        .pipe(
          tap(() => {
            this.refreshCandidates();
            this.hideDialog();
          }),
          // If the status is dirty it means status was modified
          switchMap(() => {
            if (this.candidateForm.controls.status.dirty) {
              const create: CreateNotificationDto = {
                name: candidate.name,
                status: candidate.status,
                position: candidate.position,
                email: candidate.email
              };
              return this.notificationsService.notificationsControllerGetPersonalizedNotification(create);
            }
            return of(null);
          })
        )
        .subscribe({
          next: (res) => {
            if (res?.message) {
              this.messageService.add({
                severity: 'success',
                summary: 'AI generated personalized notification',
                detail: res.message,
                life: 999999
              });
            }
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error generating personalized notification',
              detail: err.message
            });
          }
        });
    } else {
      this.candidateApiService.saveCandidate(candidate).subscribe(() => {
        this.refreshCandidates();
        this.hideDialog();
      });
    }
  }

  hideDialog() {
    this.candidateDialog.set(false);
  }

  editRow(candidate: Candidate) {
    this.candidateForm.reset();
    this.candidateForm.setValue(candidate);
    this.candidateDialog.set(true);
    this.isEditMode.set(true);
  }

  refreshCandidates() {
    this.refreshSubject.next();
  }

  deleteRow(candidate: Candidate) {
    this.candidateApiService.deleteCandidate(candidate.id).subscribe(() => {
      this.refreshCandidates();
    });
  }
}
