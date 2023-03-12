<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ammortizedPayment } from '../Interfaces/ammortizedPayment';
import LoanPaymentTable from './LoanPaymentTable.vue';
const loanAmount = ref(0);
let interestRate = ref(13);
const terms = ref(12);
// let ammortizedPayments = reactive([{
//     payment: ref(0),
//     term_id : ref(0),
//     principalPayment: ref(0),
//     interest: ref(0),
//     balance: ref(0),
// }]);
let monthly_repayment = ref(0);


const monthlyRate = ()=>{ return (interestRate.value / (terms.value * 100))};


function addCommas(nStr : any) {
			nStr += '';
			var x = nStr.split('.');
			var x1 = x[0];
			var x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		}
const monthlyRepayments = computed(()=>{
  let rate = interestRate.value / 1200;

   monthly_repayment.value  = (rate * loanAmount.value ) / ( 1 - ( Math.pow( 1 + rate, -terms.value ) ) );
  const  total_repayment :number = monthly_repayment.value * terms.value;
  // let results = calculatePrincipal(terms.value);
  // console.table(results)
  // table.pu

   return 'monthly repayment <b>'+ addCommas(monthly_repayment.value.toFixed()) + '</b> total repayment <b>'+addCommas(total_repayment.toFixed())+'</b>';

})

const ammortizedPayments = computed<ammortizedPayment[]>(() => {
  return calculatePrincipal(terms.value);
})
// onMounted(()=>{
//   console.log("Value of reference is ")
//   console.log(tetsRef.value)
// })

function calculateInterest(balance :number) :number{
  let  newBalance = balance * monthlyRate();
     return newBalance;
}

function calculatePrincipal(terms :number){
  let ammortizedPayments = [];
    for (let i = 0; i < terms; i++) {
      console.log('monthly rate uis '+monthlyRate());
    // i is your integer
      if(i === 0){
        let interest :number = monthlyRate() * loanAmount.value;
        let principalPayment = monthly_repayment.value - interest;
        let balance = loanAmount.value - principalPayment;
        ammortizedPayments.push({term_id : i, payment : monthly_repayment.value, principalPayment: principalPayment, interest: interest, balance: balance})
      }else{
          console.log("this is my second test")
          let { balance } = ammortizedPayments[i-1];

          let interest :number = monthlyRate() * balance;
          let principalPayment = monthly_repayment.value - interest;
          let newBalance :number = balance - principalPayment;
          ammortizedPayments.push({term_id : i, payment : monthly_repayment.value, principalPayment: principalPayment, interest: interest, balance: newBalance})
        
        // console.log();
      }
        
    }
    // console.log(ammortizedPayments)

    return ammortizedPayments;
}

</script>

<template>
  


  <div class="container flex flex-row">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Loan Calculator</h3>


      <span class="text-1xl text-center text-gray-800 mb-8 ">
          Enter the Loan Amount and Repayments will be automatically calculated
          <hr class="mt-3"/>
      </span>    
    
      <form class="pt-5">
          <div class="mb-3">
            <label for="loanAmount" class="form-label">Loan Amount (KES)</label>
             <input type="text" v-model.number="loanAmount" class="form-control" id="loanAmount" placeholder="">
          </div>

          <div class="mb-3">
            <label for="interestRate" class="form-label">Annual Interest Rate</label>
             <input type="number" v-model="interestRate" class="form-control" id="interestRate" placeholder="">
          </div>

          <div class="mb-3">
            <label for="terms" class="form-label">Terms <small>(In Months)</small></label>
             <input type="number" v-model="terms" class="form-control" id="terms" placeholder="">
          </div>

         
      </form>
    </div>
 

     <div class="w-full px-4">

      <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Repayments Details </h3>    
      <span class="text-gray-800 text-base px-6 mb-5" v-html="monthlyRepayments">
        
      </span>
        <LoanPaymentTable :loanAmount="loanAmount" :ammortizedPayments="ammortizedPayments"/>
        <span class="text-muted">total items is {{ammortizedPayments.length }}</span>
    </div>
 
</div>
</template>
