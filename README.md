# tagsCloud

This library makes a kind of tags cloud similar to this

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Web_foundations_word_cloud.svg/800px-Web_foundations_word_cloud.svg.png" width="350px" alt="tags cloud example image from wikimedia" title="Example of similar tags cloud from wikimedia"/>

## Requeriments
- **jQuery**: 3.2.1

## Use

**HTML**
```html
<div id="someID">
</div>
```

**Javascript**
```js
  let selector = "#someID"; // or whatever jQuery selector you want...
  $( selector ).tagsCloud( config );
```

## No Configuration
```js
  $( selector ).tagsCloud( );
  // or
  $( selector ).tagsCloud( {} );
  // or 
  $( selector ).tagsCloud( { notAcceptedProps:...} );
```

The tagsCloud function can be used without any configuration, so it uses the default configuration:
```js
defaultConfiguration = {
  data: $(selector).text(), //Gets all the words inside the element,and count their repetitions
  minSize: 0.3,
  minOpacity: 0.5,
  maxTags: 15,
  sort: 'none',
  keyValueExtractor: null,
  onClick: null
}
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
Data can be passed as an array of {key,value} objects, where **key** is the text of the tag, and **value** is the number of repetitions of this tag.

## Custom Data Objects
```js
  config = {
    data: [
      {text:'some text', count: 1234, moreProps: 'moreValues',...},
      {text:'another text', count: 123, moreProps: 'someValues',...},
      ...],
    keyValueExtractor: ( o ) => {
      //Must return an array of [key, value] of the custom object
      return [o.text, o.count];
    }
  };
```
If the data defined is an array of custom objects that have no **key**, **value** properties, **keyValueExtractor** must be defined in order to display the tags cloud.
Params:
- **o**: The custom data object.
Return:
- An Array of size 2, where Array[0] is the correspondig **key** property for **o** element, and Array[1] is the corresponding **value** property for **o** element.

## Changing Size & Opacity
```js
  config = {
    data: [ ... ], // {key,value} objects
    minSize: 0.5, // default value 0.3
    minOpacity: 0.9 // default value 0.5
  };
```
Tags vary their size and opacity from minSize and minOpacity for least repeated tags to 1 for most repeated tags.

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
      ... // does nothing by default
    }
  };
```
When **onClick** is defined, tags are clickable ( cursor->pointer ) and interactive. The element that triggers the click event is the tag itself so, you can for example delete the tag, move it, and so on.
Parameters:
- **event**: The click event.
- **element**: The tag element clicked. If the element is customData (making use of *keyValueExtractor*), the whole object is passed.

## Sorting the tags
```js
  config = {
    data: [ ... ], // {key,value} objects
    sort: 'sortType' // ['none'(default) | 'ltm' | 'middle' | 'mtl' | 'random' | 'az' | 'za' ]
  };
```
How tags are displayed depending on the sort type:
- **none**: In the order it comes.
- **ltm**: From the top left to the bottom right, from **L**east **T**o **M**ost repeated respectively.
- **middle**: Most repeated in the center, least repeated in the outer area.
- **mtl**: From the top left to the bottom right, from **M**ost **T**o **L**east repeated respectively.
- **random**: Random order.
- **az**: From the top left to the bottom right, in alphabetical order.
- **za**: From the bottom right to top left, in alphabetical order.
