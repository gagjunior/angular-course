import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Product } from '../product.model'
import { ProductService } from '../product.service'

@Component({
  selector: 'cbb-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product: Product = {
    name: '',
    price: null
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
      this.productService.readById(id).subscribe(prod => {
        this.product = prod
      })
    }

  }

  updateProduct(): void {
    this.productService.update(this.product).subscribe(() => {
      this.productService.showMessage('Produto atualizado com sucesso!')
      this.router.navigate(['/products'])
    })
  }

  cancel(): void {
    this.router.navigate(['/products'])
  }

}
