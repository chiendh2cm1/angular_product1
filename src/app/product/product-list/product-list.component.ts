import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';

declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAll().subscribe((products) => {
      this.products = products.content;
      $(function() {
        $('#product-list').DataTable({
          'paging': true,
          'lengthChange': false,
          'searching': true,
          'ordering': true,
          'info': true,
          'autoWidth': false,
          'responsive': true,
          'pageLength': 3,
        });
      });
    }, error => {
      console.log(error);
    });
  }

}
