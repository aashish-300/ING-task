export class LoaderService {
  /**
   * The loader object containing the loading state.
   */
  private static object: any = {
    loading: false,
  };

  // TODO Add JsDoc
  public static get() {
    return this.object;
  }

  /**
   * Shows the loader.
   * @returns A boolean indicating whether the loader is now showing.
   */
  public static show(): boolean {
    return (this.object.loading = true);
  }

  /**
   * Hides the loader.
   * @returns A boolean indicating whether the loader is now hiding.
   */
  public static hide(): boolean {
    return (this.object.loading = false);
  }
}
