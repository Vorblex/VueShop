<template>
	<div>
		<h1>Cart</h1>
		<hr>
		<div v-if="empty"
			 class="alert alert-warning">
			Your cart is empty
		</div>
		<template v-else>
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
					</tr>
				</thead>	
				<tbody>
					<tr v-for="product in products">
						<td>{{ product.title }}</td>
						<td>{{ product.price }}</td>
					</tr>
					<tr>
						<td>Total price</td>
						<td><b>{{totalPrice}}</b></td>
					</tr>
				</tbody>	
			</table>
			<button @click="onOrder"
					class="btn btn-success"
					>
				Order Now
			</button>
			<button @click="clearCart" class="btn btn-danger">Remove All</button>
		</template>
	</div>
</template>

<script>
	import {mapActions,mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters('products', {
				productsAll: 'items'
			}),
			...mapGetters('cart', {
				productsInCart: 'products'
			}),
			products(){
				return this.productsAll.filter((elem) => {
					return this.productsInCart.indexOf(elem.id_product) !== -1;
				});
			},
			empty(){
				return this.products.length === 0;
			},
			totalPrice() {
				let result = 0;
				for (const product of this.products) {
					result += product.price;	
				}
				return result;
			}
		},
		methods: {
			...mapActions('cart', {
				clearCart: 'clear'
			}),
			onOrder(){
				this.$router.push('/checkout');
			}
		}
	}
</script>