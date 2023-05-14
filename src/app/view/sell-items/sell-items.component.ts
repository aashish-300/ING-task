import { Component,OnInit} from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sell-items',
  templateUrl: './sell-items.component.html',
  styleUrls: ['./sell-items.component.css']
})
export class SellItemsComponent implements OnInit {

  constructor(private service: ProductsService,private router: Router){}

  products: any;
  selectedItem:any;

  ngOnInit(): void {
      this.service.getAllProducts().subscribe(res => {
        console.log(res);
        this.products = res;
      });
  }

  sellItems = new FormGroup({
    id: new FormControl(''),
    invoice: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
    quantity: new FormControl(0),
    price: new FormControl(0),
    total: new FormControl(0),
    customerName: new FormControl(''),
    address: new FormControl(''),
    remark: new FormControl(''),
  })

  onSell(){
    console.log(this.sellItems.value);
    this.service.sellItem(this.sellItems.value).subscribe(res => {
      this.router.navigate(['/product']);
    })
  }

  itemSelected(){
    this.service.getProduct(this.sellItems.value.id).subscribe(data => {
      this.selectedItem = data;
      this.sellItems.patchValue({
        quantity: this.selectedItem.quantity,
        price: this.selectedItem.price,
        total: this.selectedItem.total
      })
    })
  }

}
