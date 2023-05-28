/**
 * @fileoverview Root component for the Angular application.
 * @module AppComponent
 */

import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';

/**
 * Root component that represents the Angular application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  /**
   * Title of the application.
   * @type {string}
   */
  title = 'ING-task';
  
  /**
   * Flag indicating whether the menu is required or not.
   * Determines the visibility of the menu component.
   * @type {boolean}
   */
  isMenuRequired = false;
  
  /**
   * Static property to track the loading state of the application.
   * @type {boolean}
   */
  static loading: boolean;
  
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
    AppComponent.loading = LoaderService.get();
    const currenturl = this.router.url;
    
    if (currenturl === '/login' || currenturl === '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }
  
  /**
   * Getter for the isLoading property.
   * Used to check the loading state of the application.
   * @returns {boolean} - The loading state of the application.
   */
  get isLoading(): boolean {
    return AppComponent.loading;
  }
}
