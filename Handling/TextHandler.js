class TextHandler {
    static formatNumber(num) {
       var text = Math.round(num).toString();
       var len = text.length;
       var suf = "";
       if (len > 6) { 
         suf =  "." + text.substring(1,2) + " million";
         text = text.substring(0,len - 6);
       }
       if (len > 9) {
         suf =  "." + text.substring(1,2) + " billion";
         text = text.substring(0,len - 9);
       }
       if (len > 12) {
         suf =  "." + text.substring(1,2) + " trillion";
         text = text.substring(0,len-12);
       }
       if (len > 15) {
         suf =  "." + text.substring(1,2) + " quadrillion";
         text = text.substring(0,len-15);
       }
       return text + suf;
    }
}