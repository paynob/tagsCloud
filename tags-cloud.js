(function($) {
  $.fn.tagsCloud = function( params ) {
    let self = this;
    
    let defaultConfig = {
    	data: null,
    	sort: 'none',
    	minSize: 0.3,
    	minOpacity: 0.5,
    	maxTags: 15,
    };
    
    let config = params ? { ...defaultConfig, ...params } : defaultConfig;
    
    if ( config.data === null ){
      // Count repeatitions of each word in the innerHTML of this element
    	config.data = countWords();
      
      let contentBackup = $(document.createElement('div')).html( self.html() ).hide();
      self.html('');
      self.append( contentBackup );
    }
    
    if (typeof config.keyValueExtractor === 'function'){
    	config.data = config.data.map( o => {
      	let keyValue = config.keyValueExtractor( o );
        return { ...o, key: keyValue[0], value : keyValue[1] };
      } );
    }

    config.data = sort( config.data, config.sort, config.maxTags );
    
    let [min,max] = minMaxValues(config.data );
    

    self.children().remove('[data-tag]').hide();

    $.each(config.data, function(i, v) {
      let weight = (v.value - min) / (max - min);
      let size = (1 - config.minSize) * weight + config.minSize;
      let opacity = (1 - config.minOpacity) * weight + config.minOpacity;

      let span = $(document.createElement('span') );
     	span.attr('data-tag', v.key );
      span.css({
      	'--weight': size + 'em',
      	'--opacity': opacity
      });
      span.html(v.key);
      
      if ( config.sort !== 'middle' || self.children().length % 2 == 0) {
        self.append(span);
      } else {
        self.prepend(span);
      }

      if (typeof config.onClick === 'function') {
      	span.on('click', function(e) {
        	config.onClick.call(span,e,v);
        });
      }else{
      	span.attr('disabled',true);
      }
    });
    
    function sort (data, sortType, maxTags){
    	if (sortType !== 'none') {
        data.sort(function(a, b) {
          return b.value - a.value;
        });
        data = data.slice(0, maxTags);

        if ( sortType === 'random'){
          shuffle( data );
        }else if ( sortType === 'ltm' ){
          data.reverse();
        }else if ( sortType === 'za' ){
          data.sort( function(a, b){
            return b.key.toLowerCase().localeCompare(a.key.toLowerCase());
          });
        }else if ( sortType === 'az' ){
          data.sort( function(a, b){
            return a.key.toLowerCase().localeCompare(b.key.toLowerCase());
          });
        }
      }else{
        data = mostNRepeated( data, maxTags );
        data = data.slice(0, maxTags);
      }
      return data;
    }
    
    function countWords( delimiter = ' '){
    	let words = {};
      let arr = self.text().replace(/[^a-zA-Z0-9]+/g, " ").split(delimiter); 
      
      for ( var i=arr.length-1; i>=0; i--){
      	let k = arr[i].toLowerCase();
      	words[ k ] = (words[ k ] ? words[ k ] : 0 ) + 1;
      }
      
      return Object.keys(words).map((key, index) => {
          return {
            key: key,
            value: words[key]
          }
        });
    }
    
    function minMaxValues(data){
    	let max =  Number.MIN_VALUE;
      let min = Number.MAX_VALUE;
      $.each(data, function(i, v) {
        if (v.value > max) { max = v.value; }
        if (v.value < min) { min = v.value; }
      });
      return [min,max];
    }
    
    function shuffle(data){
    	let counter = data.length;
      
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
					counter--;
          let temp = data[counter];
          data[counter] = data[index];
          data[index] = temp;
      }
    }
    
    function mostNRepeated(data, n){
    	var arr = [];
      let indexOfMin = -1;
      
      for ( var i = data.length - 1; i>= 0; i--){
      	if ( arr.length < n ){
        	indexOfMin = data[i] < arr[indexOfMin] ? 0 : indexOfMin+1;
        	arr.unshift( data[i] );
        }else{
        	if ( data[i] > arr[indexOfMin] ){
            arr.splice( indexOfMin, 1 );
            arr.unshift( data[i] );
            
            indexOfMin = arr.length-1;
            for( var j=indexOfMin; j>=0; j-- ){
                if ( arr[j] < arr[indexOfMin] ){
                    indexOfMin = j;
                }
            }
        	}
        }
      }
      
      return arr;
    }
    
    return this;
  };
   
})(jQuery);
