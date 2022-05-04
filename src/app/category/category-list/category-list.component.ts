import {Component, OnInit} from '@angular/core';
import {Category} from '../../model/category';
import {CategoryService} from '../../service/category.service';

declare var $: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
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
