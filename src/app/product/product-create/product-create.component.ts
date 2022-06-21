import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ProductService} from '../../service/product.service';
import {NotificationService} from '../../service/notifocation/notification.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {Category} from '../../model/category';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  product: Product = {
    category: null
  };
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  constructor(private productService: ProductService,
              private notificationService: NotificationService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  createProduct() {
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
      this.productService.saveProduct(formData).subscribe(() => {
          this.notificationService.showMessage('success', 'Tạo mới thành công!');
        }, error => {
          this.notificationService.showMessage('error', 'Tạo mới lỗi!');
        }
      );
      this.productForm.reset();
    } else {
      this.notificationService.showMessage('error', 'Tạo mới lỗi!');
    }
  }

  get nameCreate() {
    return this.productForm.get('name');
  }

  get priceCreate() {
    return this.productForm.get('price');
  }

  get imageCreate() {
    return this.productForm.get('image');
  }

  get descriptionCreate() {
    return this.productForm.get('description');
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }
}
