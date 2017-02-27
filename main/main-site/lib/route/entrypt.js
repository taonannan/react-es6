function Entrypt (){
  this.a= [19,1,4,7,30,14,28,8,24,17,6,35,34,16,9,10,13,22,32,29,31,21,18,3,2,23,25,27,11,20,5,15,12,0,33,26];
};

Entrypt.prototype.encode  =   function  (value){
     var mess = [] ;
     for(var i = 0 ; i < value.length ; i++){
         var t = 0  ;
         if(value[i] >= 'a' && value[i] <= 'z' ) {
             t = this.a[ value[i].charCodeAt(0) - 'a'.charCodeAt(0) ] ;
         }else{
             t = this.a[ value[i] - '0' + 26];
         }

         if( t > 25 ){
             mess[i] = t-26;
         }else{
             mess[i] = String.fromCharCode( t  + 97) ;
         }
     }
     return mess.join('');
 }

Entrypt.prototype.decode = function (value){
      var ret = [];
      for(var i = 0 ; i< value.length ; i++ ) {
          var t = 0 ;
          if( value[i] >= 'a' && value[i] <= 'z'){
              t = value[i].charCodeAt(0) - 'a'.charCodeAt(0) ;
          }else{
              t = value[i] - '0' + 26 ;
          }
          for(var j = 0 ; j<36 ; j++){
              if(this.a[j] == t ){
                  t = j ;
                  break;
              }
          }
          if( t>25 )
              ret[i] = t - 26 ;
          else{
              ret[i] = String.fromCharCode( t + 97 );
          }
      }
      return ret.join('');
 }
 
 export default new Entrypt()
