import {Component, Input} from '@angular/core';
import {ISellItems} from '../../../model';

@Component({
  selector: 'app-extract-pdf',
  templateUrl: './extract-pdf.component.html',
  styleUrls: ['./extract-pdf.component.css'],
})
export class ExtractPdfComponent {
  @Input('today') today!: ISellItems[];
  @Input('popular') popular!: ISellItems[];

  constructor() {
  }
}
