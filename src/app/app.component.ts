import { Component } from '@angular/core';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flower-ecommerce';

  constructor(private productServices: ProductService) {
    let coll_id = 266329686089;
    let prod_id = 6735725133897;

    // this.productServices.getProductsFromCollection(coll_id).subscribe((res) => {
    //   console.log(res);
    // });

    this.productServices.getCollections().subscribe((res) => {
        console.log(res);
    });
  }
}
