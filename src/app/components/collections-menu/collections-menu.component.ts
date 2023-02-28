import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Collection } from 'src/app/interfaces/collection';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-collections-menu',
  templateUrl: './collections-menu.component.html',
  styleUrls: ['./collections-menu.component.scss']
})
export class CollectionsMenuComponent {
  collections?: Collection[];
  collection_id?: Collection["collection_id"];
  collection_handle?: Collection["handle"];
  products?: Product[];

  constructor(private productServices: ProductService,
    private router: Router) {
    this.getCollections();
  }

  // get collections
  getCollections() {
    this.productServices.collections$.subscribe((res) => {
      this.collections = res.collection_listings;
    });
  }

  // redirect to collection page
  goToCollection(handle:string) {
    this.router.navigate(['c/'+handle]);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
