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
  productForm: FormGroup;
  id: number;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private categoryService: CategoryService,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.productForm = new FormGroup({
        id: new FormControl(''),
        name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
        price: new FormControl('', [Validators.required]),
        image: new FormControl(''),
        description: new FormControl(''),
        category: new FormControl('', [Validators.required]),
      });
      this.getProduct();
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  private getProduct() {
    return this.productService.findById(this.id).subscribe(product => {
      this.product = product;
    });
  }

  get idEdit() {
    return this.productForm.get('id');
  }

  get nameEdit() {
    return this.productForm.get('name');
  }

  get priceEdit() {
    return this.productForm.get('price');
  }

  get imageEdit() {
    return this.productForm.get('image');
  }

  get descriptionEdit() {
    return this.productForm.get('description');
  }

  getCategories() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('image').setValue(file);
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('image', this.productForm.get('image').value);
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
