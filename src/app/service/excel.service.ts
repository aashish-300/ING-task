import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
// import { Workbook } from 'exceljs/dist/exceljs.min.js';
import * as fs from 'file-saver';
import { IAddItems } from '../common/model/Productmodel';
import { ProductsService } from './products.service';

const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheet.sheet;charset=utf-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private productService: ProductsService) {}

  newColor: string[] = [];
  count: number = 0;

  public exportAsExcelFile(
    reportHeading: string,
    reportSubHeading: string,
    headerArray: any[],
    json: any[],
    footerData: any,
    excelFileName: string,
    sheetName: string
  ) {
    // const header = headerArray;
    const data = json;

    const workbook = new Workbook();

    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const workSheet = workbook.addWorksheet(sheetName);

    //get all columns from json
    let columnsArray: any[] = [];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnsArray = Object.keys(json[key]);
      }
    }

    const header = columnsArray;

    workSheet.addRow([]);
    workSheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
    workSheet.getCell('A1').value = reportHeading;
    workSheet.getCell('A1').alignment = { horizontal: 'center' };
    workSheet.getCell('A1').font = { size: 10, bold: true };

    workSheet.addRow([]);
    const headerRow = workSheet.addRow(header);

    headerRow.eachCell((cell, index) => {
      cell.font = { size: 12, bold: true };
      workSheet.getColumn(index).width =
        header[index - 1].length < 20 ? 20 : header[index - 1].length;
    });

    //Add data and conditional formatting
    let rowColor: string[] = [];
    const startRow = 4;
    json.forEach((element: any) => {
      const eachRow: any[] = [];
      //get individual row data
      columnsArray.forEach((column) => {
        eachRow.push(element[column]);
        console.log('element', element[column]);
      });

      //store background color of product using name of element
      rowColor.push(
        this.productService.getProductBackgroundColor(element).includes('#')
          ? this.productService.getProductBackgroundColor(element).split('#')[1]
          : 'FFFFFF'
      );
      console.log('rowColor', rowColor);

      //remove the #from the hex code
      // let test = rowColor.map((x) => {
      //   //   if (x.includes('#')) {
      //   //     return x.split('#')[1];
      //   //   }
      //   // console.log('count', ++this.count);
      //   if (!x.includes('#')) return 'FFFFFF';
      //   return x.split('#')[1];
      // });
      // console.log('----', test);

      // addColorToRow(test);
      // Define the range of rows to style (e.g., from row 2 to the last row)
      // const startRow = 4;
      const endRow = workSheet.rowCount;
      // Loop through the rows and apply styling
      for (let i = 4; i <= endRow; i++) {
        // console.log('test', rowColor[i]);
        const row = workSheet.getRow(i);
        console.log(rowColor[i - startRow]);
        console.log(i, rowColor[i - startRow]);
        // Apply styling to the row
        // row.font = { bold: true };
        row.fill = {
          type: 'pattern',
          pattern: 'solid',
          // fgColor: { argb: test[i - startRow] }, // Red color
        };
        // row.alignment = { vertical: 'middle', horizontal: 'center' };
      }
      workSheet.addRow(eachRow);
    });

    workSheet.addRow([]);

    //save excel file
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      fs.saveAs(blob, excelFileName + EXCEL_EXTENSION);
    });
  }

  private numToAlpha(num: number) {
    let alpha = '';
    for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
      alpha = String.fromCharCode((num % 26) + 0x41);
    }
    return alpha;
  }
}
