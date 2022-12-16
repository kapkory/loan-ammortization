// File: loan-calc.js
//Source  https://familybank.co.ke/family-bank/wp-content/themes/family-bank/assets/js/loan-calc.js?ver=1.9
// Frontend form = https://familybank.co.ke/loan-calculator/
// JS for making calculations on the loan calculator form


// how it should look like https://www.pesabazaar.com/loan-calculator

(function($) {
    var calc_loan = function() {
        
        var monthly_repayment = 0;
        var total_repayment = 0;
        
        var duration = $('#loan-term').val();
        var rate = $('#loan-rate').val();
        rate = rate / 1200;
        var principle = $('#loan-amount').val();
        
        monthly_repayment = ( rate * principle ) / ( 1 - ( Math.pow( 1 + rate, -duration ) ) );
        total_repayment = monthly_repayment * duration;

        
        if( (monthly_repayment === "Infinity") || (isNaN(monthly_repayment)) ) {
            monthly_repayment = 0.00;
            total_repayment = 0.00;
        }
        
        if( (total_repayment === "Infinity") || (isNaN(total_repayment)) ) {
            total_repayment = 0.00;
            monthly_repayment = 0.00;
        }		
		
		function addCommas(nStr) {
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
        
        $('#monthly-repayment').text( addCommas( parseFloat(monthly_repayment).toFixed() ) );
        $('#total-repayment').text( addCommas( parseFloat(total_repayment).toFixed() ) );        
        
    }      
    
    $('#loan-amount, #loan-rate, #loan-term').keyup(function() {
        calc_loan(); 
    });   
	
	/*
	$('#loan-rate, #loan-term').change(function() {
		calc_loan();
	});
	*/
	
	$('#loan-calculator-form').on( "submit", function(event) {
		event.preventDefault();
	});
    
})(jQuery);