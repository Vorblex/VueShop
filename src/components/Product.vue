<template>
	<div>
		<h1>{{ product.title }}</h1>
		<router-link :to="{name: 'products'}">Back to products</router-link>
		<hr>
		<div class="alert alert-success">
			{{ product.price }}
		</div>
		<button v-if="inCart.indexOf(id) === -1" type="button" @click="addToCart(id)" class="btn btn-primary">Add to cart</button>
		<button v-else type="button" @click="removeFromCart(id)" class="btn btn-warning">Remove from cart</button>
	</div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

	export default {
		computed: {
			...mapGetters('cart',{
				inCart: 'products'
			}),
			id(){
				return this.$route.params.id;
			},
			product(){
				return this.$store.getters['products/item'](this.id);
			}
		},
		methods: {
			...mapActions('cart',{
				addToCart: 'add',
				removeFromCart: 'remove'
			})
		}
	}
</script>