import { Component,DoCheck } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'ING-task';
  isMenuRequired = false;
  constructor(private router: Router){}

  ngDoCheck(): void{
    const currenturl = this.router.url;
    if(currenturl === '/login' || currenturl === '/register'){
      this.isMenuRequired = false;
    }else{
      this.isMenuRequired = true;
    }
  }

}
