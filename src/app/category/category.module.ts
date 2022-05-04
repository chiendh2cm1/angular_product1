import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CategoryRoutingModule} from './category-routing.module';
import {CategoryListComponent} from './category-list/category-list.component';
import {ProductListComponent} from '../product/product-list/product-list.component';
import { CategoryCreateComponent } from './category-create/category-create.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { CategoryDeleteComponent } from './category-delete/category-delete.component';


@NgModule({
  declarations: [CategoryListComponent, CategoryCreateComponent, CategoryEditComponent, CategoryDeleteComponent],
  exports: [
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CategoryModule {
}
