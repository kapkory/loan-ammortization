<script setup lang="ts">
import { ref } from 'vue'
import {ammortizedPayment} from '../Interfaces/ammortizedPayment';
defineProps<{
   loanAmount: number,
   ammortizedPayments:ammortizedPayment
}>()

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
</script>
<template>
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400" v-if="loanAmount > 0">
              <thead  class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">#</th>
                  <th scope="col" class="py-3 px-6">Amount</th>
                  <th scope="col" class="py-3 px-6">Interest</th>
                  <th scope="col" class="py-3 px-6">Principal</th>
                  <th scope="col" class="py-3 px-6">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr :key="term.term_id" v-for="term in ammortizedPayments">
                  <td class="py-4 px-6">{{ term.term_id+1 }}</td>
                  <td class="py-4 px-6">{{ addCommas(term.principalPayment.toFixed()) }}</td>
                  <td class="py-4 px-6">{{ addCommas(term.interest.toFixed()) }}</td>
                  <td class="py-4 px-6"> {{ addCommas(term.payment.toFixed()) }} </td>
                  <td class="py-4 px-6">{{ addCommas(term.balance.toFixed()) }} </td>
                </tr>
              </tbody>
        </table>
</template>