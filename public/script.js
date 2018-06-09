new Vue({
    el: '#app',
    data:{
        total:0,
        items:[
            { id:1, title:"Item1", price: 2},
            { id:2, title:"Item2", price: 3},
            { id:3, title:"Item3", price: 1}
        ],
        cart:[]
    },
    methods:{
        addItem: function(index){
            var item = this.items[index];
            var itemInCart = this.cart.find(function(cartItem){
                return cartItem.id == item.id;
            })
            this.total += item.price;
            if(itemInCart){
                itemInCart.qty++;
                return;
            }
            this.cart.push({
                 id:item.id,
                 price:item.price,
                 title: item.title,
                 qty: 1
            });
        }
    }
});