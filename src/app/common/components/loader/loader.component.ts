import { Component } from '@angular/core';
import { LoaderService } from 'src/app/service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})

/**

Represents the LoaderComponent.
@class
*/
export class LoaderComponent {

  /**

Constructs a new LoaderComponent.
@constructor
@param {LoaderService} service - The LoaderService instance.
*/
  constructor(private service: LoaderService) { }




}
