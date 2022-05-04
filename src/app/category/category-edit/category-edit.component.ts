import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryService} from '../../service/category.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NotificationService} from '../../service/notifocation/notification.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  categoryForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
  });
  id: number;

  constructor(private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getCategory();
    });
  }

  ngOnInit() {
  }

  getCategory() {
    return this.categoryService.findById(this.id).subscribe(category => {
      this.idEdit.setValue(category.id);
      this.nameEdit.setValue(category.name);
    });
  }

  updateCategory() {
    if (this.categoryForm.valid) {
      const category = this.categoryForm.value;
      this.categoryService.updateCategory(this.id, category).subscribe(() => {
        this.notificationService.showMessage('success', 'Sửa thành công!');
      }, error => {
        console.log(error);
      });
    } else {
      this.notificationService.showMessage('error', 'Sửa lỗi!');
    }
  }

  get idEdit() {
    return this.categoryForm.get('id');
  }

  get nameEdit() {
    return this.categoryForm.get('name');
  }

}
