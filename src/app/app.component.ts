import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Router } from '@angular/router';
import { Collection } from './interfaces/collection';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  collections$?: Collection[];
  activeCollectionHandle: string = '';

  constructor(private productServices: ProductService,
    private router: Router) {

    this.productServices.collections$.subscribe((res) => {
      if (res && res.length <= 0) return; // if res is null, return
      this.collections$ = res.collection_listings;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
        let url = event.url.split('/')[1]; // get current url handle
        url = url.split('?')[0]; // remove query string

        if (url.length > 0) {
          this.checkHandle(url);
        } else {
          this.activeCollectionHandle = '';
        }
      }
    });

  }

  // check if url is present in collections
  checkHandle(url: string) {
    this.collections$?.forEach((collection: Collection) => {
      if (collection.handle === url) {
        this.activeCollectionHandle = url;
      }
    });
  }

  isActive(handle: string) {
    return 'true';
  }
}

