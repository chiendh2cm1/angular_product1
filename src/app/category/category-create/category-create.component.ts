import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../service/category.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NotificationService} from '../../service/notifocation/notification.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]),
  });

  constructor(private categoryService: CategoryService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
  }

  get idCreate() {
    return this.categoryForm.get('id');
  }

  get nameCreate() {
    return this.categoryForm.get('name');
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.saveCategory(category).subscribe(() => {
        this.categoryForm.reset();
        this.notificationService.showMessage('success', 'Tạo mới thành công!');
      }, e => {
        console.log(e);
      });
    } else {
      this.notificationService.showMessage('error', 'Tạo mới lỗi!');
    }
  }
}
