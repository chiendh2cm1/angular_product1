import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';
import {Product} from '../../model/product';
import {NotificationService} from '../../service/notifocation/notification.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product;
  productForm = new FormGroup({
    id: new FormControl('', []),
    name: new FormControl('', []),
    price: new FormControl('', []),
    image: new FormControl('', []),
    description: new FormControl('', []),
    category: new FormControl('', []),
  });
  id: number;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getProduct();
  }


  getProduct() {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = +params.get('id');
      this.id = id;
      this.productService.findById(id).subscribe(
        (product) => {
          this.product = product;
        }
      );
    });
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);
      const files = (document.getElementById('image') as HTMLInputElement).files;
      if (files.length > 0) {
        formData.append('image', files[0]);
      }
      formData.append('category', this.productForm.get('category').value);
      this.productService.updateProduct(this.id, formData).subscribe(() => {
        this.notificationService.showMessage('success', 'Sửa thành công!');
      }, e => {
        this.notificationService.showMessage('error', 'Sửa lỗi!');
      });
    } else {
      this.notificationService.showMessage('error', 'Sửa lỗi!');
    }
  }
}
