<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

const shareCapital = ref(0);
const monthlyContribution = ref(0);
const interestOnShareCapital = ref(5)
const interestOnContribution = ref(5)
let withholdingTax = ref(5);
let contributionAmount = ref([
            {month:1,value:0},
            {month:2,value:0},
            {month:3,value:0},
            {month:4,value:0},
            {month:5,value:0},
            {month:6,value:0},
            {month:7,value:0},
            {month:8,value:0},
            {month:9,value:0},
            {month:10,value:0},
            {month:11,value:0},
            {month:12,value:0}
        ])

let totalQualifyingSavings : any = ref(0)
watch(monthlyContribution, (newContribution : number)=>{
    // monthlyContribution.filter()
        contributionAmount.value.map((item: any)=>{
            return item.value = newContribution
        })
        let calculations = 0;

        totalQualifyingSavings.value = contributionAmount.value.reduce( 
            (accumulator, item,index) => {
                return accumulator + ((12 - index) * item.value) / 12
         },0 );
 

    })

    function setMonthContribution(event: any, month: number){
        let newValue =event.target.value
        contributionAmount.value.map((item: any)=>{
            return (item.month === month) ? item.value = newValue : item.value
        })
        totalQualifyingSavings.value = contributionAmount.value.reduce( 
            (accumulator, item,index) => {
                return accumulator + ((12 - index) * item.value) / 12
         },0 );
        // console.log()
    }

</script>

<template>
  
  <div class="container flex flex-row">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
     
        <h3 class="text-2xl font-bold text-center text-gray-800 mb-8">Dividends Calculator</h3>


      <span class="text-1xl text-center text-gray-800 mb-8 ">
          Fill in the Form for your dividend to be Calculated
          <hr class="mt-3"/>
      </span>    
    
      <form class="pt-5">
          <div class="mb-3">
            <label for="shareCapital" class="form-label">Share Capital (KES)</label>
             <input type="text" v-model.number="shareCapital" class="form-control" id="shareCapital" placeholder="">
          </div>

          <div class="mb-3">
            <label for="monthlyContribution" class="form-label">Monthly Contribution (KES)</label>
             <input type="number" v-model.number="monthlyContribution" class="form-control" id="monthlyContribution" placeholder="">
          </div>

          <div class="mb-3">
            <label for="interestOnShareCapital" class="form-label">Interest on Share Capital</label>
             <input type="number" max="100" v-model="interestOnShareCapital" class="form-control" id="interestOnShareCapital" placeholder="">
          </div>

          <div class="mb-3">
            <label for="interestOnContribution" class="form-label">Interest on Contribution</label>
             <input type="number" max="100" v-model.number="interestOnContribution" class="form-control" id="interestOnContribution" placeholder="">
          </div>
          <div class="mb-3">
            <label for="withholdingTax" class="form-label">WithHolding Tax</label>
             <input type="number" max="100" v-model="withholdingTax" class="form-control" id="withholdingTax" placeholder="">
          </div>
         
      </form>

      <hr class="mb-3"/>
      <a href="https://www.cassavahub.com"><img style="width: 100%; margin-top: 1rem;" src="/src/assets/cassavahub.png"></a>

    </div>
    <div class="w-full px-4">

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Month
                </th>
                <th scope="col" class="px-6 py-3">
                    Deposit Contribution <small class="text-muted">(Per Month)</small>
                </th>
                <th scope="col" class="px-6 py-3">
                    Qualifying Savings
                </th>
                <th scope="col" class="px-6 py-3">
                    Gross Dividends
                </th>
    
            </tr>
        </thead>
        <tbody>
        
            <tr :key="item.month" v-for="(item, value) in contributionAmount" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    2022-{{ item.month }}-01
                </th>
                <td class="px-6 py-2">
                    <input type="number" @input="setMonthContribution($event,item.month)" v-model="item.value" :name="'month_'+contributionAmount[item.month]">
                </td>
                <td class="px-6 py-2">
                    {{ (((12 - value) * item.value) / 12).toFixed(2) }}
                </td>
                <td class="px-6 py-2">
                    {{ (((12 - value) * item.value * interestOnContribution) / (12*100)).toFixed(2) }}
                </td>
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Total 
                </th>
                 <td></td>
                 <td>
                    {{ totalQualifyingSavings }}
                 </td>

                <td class="px-6 py-4">
                    {{ (totalQualifyingSavings* interestOnContribution/100).toFixed(2) }}
                </td>
               
            </tr>


            
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="3" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Dividend from Share Capital (Share Capital * Interest on Share Capital)
                </th>
            
                <td class="px-6 py-4">
                    {{ (shareCapital * interestOnShareCapital/100).toFixed(2) }}
                </td>
               
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="3" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Gross Dividends
                </th>
            
                <td class="px-6 py-4">
                    {{ ((shareCapital * interestOnShareCapital/100) + (totalQualifyingSavings* interestOnContribution/100)).toFixed(2) }}

                </td>
               
            </tr>

            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="3" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Withholding Tax
                </th>
            
                <td class="px-6 py-4">
                   {{ (((shareCapital * interestOnShareCapital/100) + (totalQualifyingSavings* interestOnContribution/100)) * (withholdingTax/100)).toFixed(2)  }}
                </td>
               
            </tr>
            <tr class="text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" colspan="3" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Total Dividents Earned
                </th>
            
                <td class="px-6 py-4">
                    <h2>{{ (((shareCapital * interestOnShareCapital/100) + (totalQualifyingSavings* interestOnContribution/100)) - ((shareCapital * interestOnShareCapital/100) + (totalQualifyingSavings* interestOnContribution/100)) * (withholdingTax/100)).toFixed(2) }}</h2>
                </td>
               
            </tr>
        </tbody>
    </table>
</div>

    </div>
 
</div>

</template>
