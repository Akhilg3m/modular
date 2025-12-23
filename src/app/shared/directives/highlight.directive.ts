/**
 * ============================================
 * HIGHLIGHT DIRECTIVE
 * ============================================
 *
 * BEGINNER EXPLANATION:
 * --------------------
 * A DIRECTIVE adds behavior to DOM elements.
 *
 * TYPES OF DIRECTIVES:
 * 1. Component - Directive with a template (what we usually create)
 * 2. Structural - Change DOM structure (*ngIf, *ngFor)
 * 3. Attribute - Change appearance/behavior (this one!)
 *
 * ATTRIBUTE DIRECTIVE:
 * - Looks like an HTML attribute
 * - Changes how an element looks or behaves
 * - Does NOT have its own template
 *
 * USAGE:
 * <p appHighlight>This text will be highlighted</p>
 * <p appHighlight="yellow">Yellow highlight</p>
 */

import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]'  // Attribute selector (note the [brackets])
})
export class HighlightDirective implements OnInit {

  /**
   * INPUT PROPERTY
   * --------------
   * Allows passing a custom color:
   * <p appHighlight="blue">Blue highlight</p>
   *
   * The 'appHighlight' name matches the selector
   */
  @Input() appHighlight: string = '';

  /**
   * DEFAULT HIGHLIGHT COLOR
   * Can be overridden with input
   */
  @Input() defaultColor: string = 'yellow';

  /**
   * CONSTRUCTOR
   * -----------
   * ElementRef gives us access to the DOM element
   * that this directive is applied to.
   */
  constructor(private elementRef: ElementRef) { }

  /**
   * OnInit LIFECYCLE HOOK
   * ---------------------
   * Set initial styles when directive loads
   */
  ngOnInit(): void {
    // Add a subtle transition for smooth effect
    this.elementRef.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  /**
   * HOSTLISTENER - MOUSEENTER
   * -------------------------
   * Listen for mouse entering the element.
   * When mouse enters, apply highlight.
   *
   * @HostListener('eventName') decorator binds to DOM events
   */
  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.highlight(this.appHighlight || this.defaultColor);
  }

  /**
   * HOSTLISTENER - MOUSELEAVE
   * -------------------------
   * When mouse leaves, remove highlight.
   */
  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.highlight('');  // Remove highlight
  }

  /**
   * HELPER: Apply background color
   */
  private highlight(color: string): void {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
