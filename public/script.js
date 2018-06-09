new Vue({
    el: '#app',
    data:{
        total:0,
        items:[
            { id:1, title:"Item1", cost:2},
            { id:2, title:"Item2", cost:3},
            { id:3, title:"Item3", cost :1}
        ],
        cart:[]
    },
    methods:{
        addItem: function(index){
            var item = this.items[index];
            var itemInCart = this.cart.find(function(cartItem){
                return cartItem.id == item.id;
            })
            this.total += item.cost;
            if(itemInCart){
                itemInCart.qty++;
                return;
            }
            this.cart.push({
                 id:item.id,
                 title: item.title,
                 qty: 1
            });
            
     
            this.total += item.cost;
        }
    }
});