# tagsCloud

```js
  $( selector ).tagsCloud( config );
```

## No Configuration
```js
  $( selector ).tagsCloud( {} );
  // or 
  $( selector ).tagsCloud( );
```

## Adding Data
```js
  config = {
    data: [
      {key:'some text', value: 1234},
      {key:'another text', value: 123},
      ...
  ]};
```
## Custom Data Objects
```js
  config = {
    data: [
      {text:'some text', count: 1234},
      {text:'another text', count: 123},
      ...],
    keyValueExtractor: ( o ) => {
      //Must return an array of [key, value] of the custom object
      return [o.text, o.count];
    }
  };
```
## Changing Size & Opacity
```js
  config = {
    data: [ ... ], // {key,value} objects
    minSize: 0.5, // default value 0.3
    minOpacity: 0.9 // default value 0.5
  };
```
## Setting MaxTags to display
```js
  config = {
    data: [ ... ], // {key,value} objects
    maxTags: 8 // default value 15
  };
```
## Adding some interaction on tag click
```js
  config = {
    data: [ ... ], // {key,value} objects
    onClick: function( event, element ){
      ... // do nothing by default
    }
  };
```
## Sorting the tags
```js
  config = {
    data: [ ... ], // {key,value} objects
    sort: 'sortType' // ['none'(default) | 'ltm' | 'middle' | 'mtl' | 'random' | 'az' | 'za' ]
  };
```
