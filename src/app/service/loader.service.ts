import { Injectable } from '@angular/core';

/**
 * Service responsible for managing the loader state.
 *
 * @remarks
 * This service provides methods to get, show, and hide the loader.
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  /**
   * The loader object containing the loading state.
   */
  private static object: any = {
    loading: false,
  };

  /**
   * Constructs an instance of the LoaderService.
   */
  constructor() {}

  /**
   * Retrieves the current loading state.
   *
   * @returns A boolean indicating whether the loader is currently showing or hiding.
   */
  public static get(): boolean {
    return this.object.loading;
  }

  /**
   * Shows the loader.
   *
   * @returns A boolean indicating whether the loader is now showing.
   */
  public static show(): boolean {
    return (this.object.loading = true);
  }

  /**
   * Hides the loader.
   *
   * @returns A boolean indicating whether the loader is now hiding.
   */
  public static hide(): boolean {
    return (this.object.loading = false);
  }
}
