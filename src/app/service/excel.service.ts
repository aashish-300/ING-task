import {Injectable, OnInit} from '@angular/core';
import {Workbook} from 'exceljs';
import * as fs from 'file-saver';
import {ProductsService} from './products.service';
import {RegisterModel} from '../model';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=utf-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService implements OnInit {
  private userData!: RegisterModel;

  constructor(private productService: ProductsService) {
    const temp = sessionStorage.getItem('user');
    this.userData = JSON.parse(temp!);
  }

  ngOnInit(): void {
  }

  public exportAsExcelFile(
    reportHeading: string,
    salesData: any[],
    excelFileName: string,
    sheetName: string
  ) {

    //<editor-fold desc="new workbook">
    const workbook = new Workbook();

    workbook.creator = 'ING';
    workbook.lastModifiedBy = 'Aashish';
    workbook.created = new Date();
    workbook.lastPrinted = new Date();
    //</editor-fold>
    const workSheet = workbook.addWorksheet(sheetName);
    //<editor-fold desc="row background color">
    let headerArray: string[] = [];
    let rowColor: string[] = [];
    salesData.forEach((sale) => {
      const hash = this.productService.getProductBackgroundColor(sale);
      for (const key in sale) {
        if (!headerArray.includes(key)) headerArray.push(key);
      }
      rowColor.push(hash.includes('#') ? hash.split('#')[1] : 'FFFFFF');
    });
    //</editor-fold>

    //<editor-fold desc="sheet heading">
    workSheet.addRow([]);
    workSheet.mergeCells('A1:' + this.numToAlpha(headerArray.length - 1) + '1');
    workSheet.getCell('A1').value = reportHeading;
    workSheet.getCell('A1').alignment = {horizontal: 'center'};
    workSheet.getCell('A1').font = {bold: true};
    //</editor-fold>
    workSheet.addRow([]);

    //<editor-fold desc="add header to excel">
    workSheet.addRow(headerArray);
    const row = workSheet.getRow(3);
    row.font = {bold: true};
    //</editor-fold>

    //<editor-fold desc="sales data in excel">
    salesData.forEach((col, i) => {
      let eachRow: string[] = [];
      headerArray.forEach((head) => {
        eachRow.push(col[head]);
      });
      workSheet.addRow(eachRow);

    });
    //</editor-fold>

    //<editor-fold desc="color to each row in excel">
    for (let i = 4; i <= workSheet.rowCount; i++) {
      const row = workSheet.getRow(i);
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {argb: rowColor[i - 4]},
      };
    }
    //</editor-fold>

    //<editor-fold desc="excel sheet download">
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], {type: EXCEL_TYPE});
      fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
    });
    //</editor-fold>
  }

  //<editor-fold desc="row number to alpha "
  private numToAlpha(num: number) {
    let alpha = '';
    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode((num % 26) + 0x41);
    }
    return alpha;
  }
  //</editor-fold>
}
