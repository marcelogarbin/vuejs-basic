window.billReceiveComponent = Vue.extend({
    components: {
        'menu-component': billReceiveMenuComponent
    },
    template: `
    <div class="row">
        <div class="col-md-12">
            <h1>
                {{ title }}
                <small v-html="this.$options.filters.statusGeneral(status, 'receive')" class="alert pull-right"
                       :class="{
                       'well well-sm alert alert-default text-muted': status === false,
                       'alert alert-danger text-danger': status > 0,
                       'alert alert-success text-success': status === 0
                       }">
                </small>
            </h1>
            <menu-component></menu-component>
        </div>
        <div class="col-md-12">
            <router-view></router-view>
        </div>
    </div>
    `,
    data: function() {
        return {
            title: 'Contas a Receber'
        };
    },
    computed: {
        status: function () {
            var bills = this.$root.$children[0].billsReceive;
            if(!bills.length){
                return false;
            }

            var count = 0;
            for(var i in bills){
                if(!bills[i].done){
                    count++;
                }
            }
            return count;
        },
    }
});