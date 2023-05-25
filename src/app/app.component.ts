import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from './service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'ING-task';
  isMenuRequired = false;
  static loading: boolean;
  constructor(private router: Router) {
  }

  ngDoCheck(): void {
    AppComponent.loading = LoaderService.get();
    const currenturl = this.router.url;
    if (currenturl === '/login' || currenturl === '/register') {
      this.isMenuRequired = false;
    } else {
      this.isMenuRequired = true;
    }
  }

  get isLoading() {
    return AppComponent.loading
  }

}
