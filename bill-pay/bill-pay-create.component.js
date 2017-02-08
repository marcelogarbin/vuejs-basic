window.billPayCreateComponent = Vue.extend({
    template: `
    <form name="form" @submit.prevent="submit">
        <legend>{{ legendForm }}</legend>
        <div class="form-group">
            <label for="vencimento">Vencimento</label>
            <input type="text" class="form-control" name="vencimento" id="vencimento" v-model="bill.date_due" placeholder="Ex: dd/mm/yyyy" required="required" />
        </div>
        <div class="form-group">
            <label for="name">Nome</label>
            <select name="name" id="name" class="form-control" v-model="bill.name">
                <option value="">-- Selecionar --</option>
                <option v-for="name in names" :value="name">{{ name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="valor">Valor</label>
            <input type="number" step="0.01" class="form-control" name="valor" id="valor" v-model="bill.value" placeholder="Ex: 12,34" required="required" />
        </div>
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox" v-model="bill.done"> Paga?
                </label>
            </div>
        </div>
        <button type="submit" class="btn btn-success btn-block"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Salvar</button>
    </form>
    `,
    data: function () {
        return {
            legendForm: 'Cadastrar Conta',
            formType: 'insert',
            names: [
                'Conta de Luz',
                'Conta de Àgua',
                'Conta de Telefone',
                'Conta de Supermercado',
                'Cartão de Crédito',
                'Emprestimo',
                'Gasolina'
            ],
            bill: {
                date_due: '',
                name: '',
                value: '',
                done: false
            }
        };
    },
    created: function(){
        if(this.$route.name == 'bill-pay.update'){
            this.formType = 'update';
            this.getBill(this.$route.params.index);
        }
    },
    methods: {
        submit: function () {
            if(this.formType == 'insert'){
                this.$root.$children[0].billsPay.push(this.bill);
            }
            this.bill = {
                date_due: '',
                name: '',
                value: 0,
                done: false
            };
            this.$router.push({name: 'bill-pay.list'});
        },
        getBill: function (index) {
            var bills = this.$root.$children[0].billsPay;
            this.bill = bills[index];
        }
    }
});