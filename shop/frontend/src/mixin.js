import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState(['user']),
           account() {
               return this.user.user_id;
              }
         },
    methods: {
        pageCalc(currentPage, total, pageSize = 10, pageUnit) {
            let firstPage = 1;
            let lastPage = Math.floor(total / pageUnit) + (total % pageUnit == 0 ? 0 : 1);
            let startIdx = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
            let endIdx = startIdx + pageSize - 1;
            if (endIdx > lastPage) {
                endIdx = lastPage;
            }
            console.log(firstPage, lastPage, startIdx, endIdx);
            return {currentPage,firstPage, lastPage, startIdx, endIdx };
        },
        // 00,000 정규표현식
        makeComma(val) {
          if(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
            return 0;
          }
        },
        
        
        $currencyFormat(value, format = "#,###") {
            
            if (value == 0 || value == null) return 0;
      
            var currency = format.substring(0, 1);
            if (currency === "$" || currency === "₩") {
              format = format.substring(1, format.length);
            } else {
              currency = "";
            }
      
            var groupingSeparator = ",";
            var maxFractionDigits = 0;
            var decimalSeparator = ".";
            if (format.indexOf(".") == -1) {
              groupingSeparator = ",";
            } else {
              if (format.indexOf(",") < format.indexOf(".")) {
                groupingSeparator = ",";
                decimalSeparator = ".";
                maxFractionDigits = format.length - format.indexOf(".") - 1;
              } else {
                groupingSeparator = ".";
                decimalSeparator = ",";
                maxFractionDigits = format.length - format.indexOf(",") - 1;
              }
            }
      
            var prefix = "";
            var d = "";
            // v = String(parseFloat(value).toFixed(maxFractionDigits));
      
            var dec = 1;
            for (var i = 0; i < maxFractionDigits; i++) {
              dec = dec * 10;
            }
      
            var v = String(Math.round(parseFloat(value) * dec) / dec);
      
            if (v.indexOf("-") > -1) {
              prefix = "-";
              v = v.substring(1);
            }
      
            if (
              maxFractionDigits > 0 &&
              format.substring(format.length - 1, format.length) == "0"
            ) {
              v = String(parseFloat(v).toFixed(maxFractionDigits));
            }
      
            if (maxFractionDigits > 0 && v.indexOf(".") > -1) {
              d = v.substring(v.indexOf("."));
              d = d.replace(".", decimalSeparator);
              v = v.substring(0, v.indexOf("."));
            }
            var regExp = /\D/g;
            v = v.replace(regExp, "");
            var r = /(\d+)(\d{3})/;
            while (r.test(v)) {
              v = v.replace(r, "$1" + groupingSeparator + "$2");
            }
      
            return prefix + currency + String(v) + String(d);
          },
          $dateFormat(val ){
            let date =	val ==	'' ?	new Date():	new Date(val );
            let year =	date.getFullYear();
            let month =	('0' +	(date.getMonth ()	+	1 )).slice (-2 );
            let day = ('0' + date.getDate()).slice(-2);
            let hours = ('0' + date.getHours()).slice(-2);
            let minutes = ('0' + date.getMinutes()).slice(-2);
            return `${year}-${month}-${day}`;
            // return `${year}-${month}-${day} ${hours}:${minutes}`;
          }     

    }
}
