import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Product} from '../../model/product';
import {NotificationService} from '../../service/notifocation/notification.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  id: number;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService) {
  }

  private getProduct() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    return this.productService.findById(this.id).subscribe(product => {
      this.product = product;
    });
  }

  ngOnInit() {
    this.getProduct();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(() => {
      this.router.navigate(['/product/list']);
      this.notificationService.showMessage('success', 'Xóa thành công!');
    }, error => {
      this.notificationService.showMessage('error', 'Xóa lỗi!');
    });
  }
}
