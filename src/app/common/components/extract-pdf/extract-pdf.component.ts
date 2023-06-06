import { Component, Input, OnInit } from '@angular/core';
import { ISellItems } from '../../model/Productmodel';

@Component({
  selector: 'app-extract-pdf',
  templateUrl: './extract-pdf.component.html',
  styleUrls: ['./extract-pdf.component.css'],
})
export class ExtractPdfComponent implements OnInit {
  @Input('today') today!: ISellItems[];
  @Input('popular') popular!: ISellItems[];

  constructor() {}

  ngOnInit(): void {
  }
}
