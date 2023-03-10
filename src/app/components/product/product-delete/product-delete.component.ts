import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'cbb-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    price: 0
  }

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id != null) {
      this.productService.readById(id).subscribe(product => {
        this.product = product
      })
    }

  }

  deleteProduct(): void {
    if (this.product.id != null) {
      this.productService.delete(this.product.id).subscribe(() => {
        this.productService.showMessage('Produto excluido com sucesso!')
        this.router.navigate(['/products'])
      })
    }

  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
