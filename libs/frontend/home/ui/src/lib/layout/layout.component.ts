import { Component, EventEmitter, input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-layout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  mobileMenuOpen = input.required<boolean>();
  @Output() mobileMenuToggle = new EventEmitter<void>();
}
