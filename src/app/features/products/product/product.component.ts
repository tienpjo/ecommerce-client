import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, filter, map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { Cart, Product } from 'src/app/shared/models';
import { ProductActions } from 'src/app/store/actions';
import { ProductSelector } from 'src/app/store/selectors/index.selectors';
import { State } from 'src/app/store/state/app.state';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit, OnDestroy {
  items$: Observable<{ product: Product; cartIds: { [productId: string]: number } }>;
  constructor(private route: ActivatedRoute, private apiService: ApiService, private store: Store<State>) {
    this.route.paramMap.subscribe(params => {
      const name = params.get('id');
      this.store.dispatch(ProductActions.getProductById({ name: name }));
    });
    this.store.dispatch(ProductActions.getCart());

    this.items$ = combineLatest([
      this.store.select(ProductSelector.GetProduct),
      this.store.select(ProductSelector.GetCart).pipe(
        filter(Boolean),
        map((cart: Cart) => cart.items)
      ),
    ]).pipe(
      map(([product, cartItems]) => ({
        product,
        cartIds: cartItems?.reduce((prev, curr) => ({ ...prev, [curr.id]: curr.qty }), {}),
      }))
    );
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  addToCart(id: string) {
    this.store.dispatch(ProductActions.addProductToCart({ id: id }));
  }
  removeFromCart(id: string) {
    this.store.dispatch(ProductActions.removeProductFromCart({ id: id }));
  }
}
