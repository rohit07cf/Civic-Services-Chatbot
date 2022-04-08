# ng-jsyaml
AngularJS wrapper for js-yaml package

This is just a package which allows using js-yaml in the AngularJS way.

## Installation
### NPM
```
npm install --save ng-jsyaml
```

### Yarn
```
yarn add ng-jsyaml
```

### Bower
```
bower install --save ng-jsyaml
```


## Usage
1. Add [js-yaml](https://github.com/nodeca/js-yaml) and [ng-jsyaml](https://github.com/gmanriqueUy/ng-jsyaml) js files into your html file

```html
...
<script src="path/to/js-yaml/dist/js-yaml.js"></script>
<script src="path/to/ng-jsyaml/angular-jsyaml.js"></script>
...
```

2. Add dependency to AngularJS module
```javascript
angular.module('your-app', ['ng-jsyaml']);
```

3. Inject `yaml` service and voila!
```javascript
angular.module('your-app')
  .controller('YourController', YourController)
  
YourController.$inject = ['yaml']

function YourController(yaml) {
  // your awesome code
  
  // use yaml here
  
  // more of your awesome code
}
```

## API
### parse (string [, options])
Alias of [safeLoad](https://github.com/nodeca/js-yaml#safeload-string---options-) of [js-yaml](https://github.com/nodeca/js-yaml)

### stringify (object [, options])
Alias of [safeDump](https://github.com/nodeca/js-yaml#safedump-object---options-) of [js-yaml](https://github.com/nodeca/js-yaml)

## License

[MIT](https://github.com/gmanriqueUy/ng-jsyaml/blob/master/LICENSE)