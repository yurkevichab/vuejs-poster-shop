var PRICE = 9.99;
var LOAD_NUM =10;
new Vue({
    el: '#app',
    data:{
        total:0,
        items:[],
        cart:[],
        search:'90s',
        results:[],
        loading:false
    },
    computed: {
        noMoreItems: function(){
            return true;
        }
    },
    methods:{
        appendItems: function(){

            if(this.items.length<this.results.length){
                var append =this.results.slice(this.items.length, this.items.length+LOAD_NUM);
                this.items= this.items.concat(append)
            }
        },
        addItem: function(index){
            var item = this.items[index];
            var itemInCart = this.cart.find(function(cartItem){
                return cartItem.id == item.id;
            })
            this.total += PRICE;
            if(itemInCart){
                itemInCart.qty++;
                return;
            }
            this.cart.push({
                 id:item.id,
                 price:PRICE,
                 title: item.title,
                 qty: 1
            });
        },
        inc: function(item){
            item.qty++;
            this.total+=PRICE;
        },
        dec:function(item){
            item.qty--;
            this.total-=PRICE;
            if(item.qty==0){
               var index = this.cart.indexOf(function(cartItem){
                    return cartItem.id == item.id;
                })
                this.cart.slice(index,1);
            }
        },
        onSubmit: function(){
            this.item = [];
            this.loading =true;
            this.$http.get('/search/'.concat(this.search))
            .then(function(res){
                console.log(res)
                this.results = res.data;
                this.items = res.data.slice(0, LOAD_NUM);
                this.loading =false;
            })
        }
    },
    filters:{
        currency: function(price){
            return '$' + price.toFixed(2);
        }
    },
    mounted: function(){
        this.onSubmit();

        var vueIns = this;
        var elem = document.getElementById('product-list-bottom');
        var watcher = scrollMonitor.create(elem);
        watcher.enterViewport(function(){
            vueIns.appendItems();
        })
    }
});
