import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private static object: any = {
    loading: false
  }

  constructor() { }

  public static get(): boolean {
    return this.object.loading
  }

  public static show(): boolean {
    return this.object.loading = true;
  }

  public static hide(): boolean {
    return this.object.loading = false;
  }

}
