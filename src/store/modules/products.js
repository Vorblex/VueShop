import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		items: []
	},
	getters: {
		items(state){
			return state.items;
		},
		itemsMap(state){
			let itemsMap = {};

			for(let i = 0; i < state.items.length; i++){
				let product = state.items[i];
				itemsMap[product.id_product] = product;
			}
			console.log(itemsMap);

			return itemsMap;
		},
		item: (state, getters) => (id) => {
			return getters.itemsMap[id];
		}
	},
	mutations: {
		loadItems(state, data){
			state.items = data;
		}
	},
	actions: {
		loadItems(store){
			Vue.http.get('http://localhost:3012/')
					  .then(response => response.json())
					  .then(data => {
					  	 store.commit('loadItems', data);
					  });
		}
	}
};

/*
function getProducts(){
	return [
		{
			id_product: 10,
			title: 'Iphone 5',
			price: 20000
		},
		{
			id_product: 20,
			title: 'Iphone 6',
			price: 25000
		},
		{
			id_product: 30,
			title: 'Iphone 7',
			price: 30000
		}
	]
}*/