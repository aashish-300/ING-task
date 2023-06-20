/**
 * @fileoverview Root component for the Angular application.
 * @module AppComponent
 */

import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './service';

/**
 * Root component that represents the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  /**
   * Flag indicating whether the menu is required or not.
   * Determines the visibility of the menu component.
   * @type {boolean}
   */
  public isMenuRequired: boolean = false;

  public loader = LoaderService.get();

  /**
   * Constructs the AppComponent.
   * @param {Router} router - The Angular router service.
   */
  constructor(private router: Router) {}

  /**
   * Lifecycle hook that is called when Angular performs change detection.
   * Implements the DoCheck interface.
   */
  ngDoCheck(): void {
    const currenturl = this.router.url;

    if (currenturl === '/login' || currenturl === '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
}
