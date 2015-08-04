# object-transform
Take a JS object and apply transformation rules to make a new JS object.  Transformation rule include
* Mapping field name to a new name
* Translating the value of a field to a new value
* Converting field value from string to int
* Grouping several fields into a sub-object
* Groups can be restricted to required field names
* Mapping several field names to an array

# Installation

Not in NPM yet so ...
```
npm install git+ssh://git@github.com/uduinc/object-transform
```

# Test
```
npm install
npm test
```
# Example

```
node example.js
```

Take the input of -
```
{
    "aaa": 1,
    "bbb": 2,
    "ccc": "10",
    "ddd": ".",
    "code1": 1,
    "txt1": "desc",
    "makeitso1": "1",
    "code2": "10",
    "makeitso2": "0",
    "txt2": ".",
    "makeitso3": "1",
    "txt3": "stuff",
    "makeitso4": "1",
    "txt4": "."
}
```
and will transform to - 
```
{
    "aaa": 1,
    "ijk": "zippy",
    "ccc": 10,
    "eee": [
        {
            "code": 1,
            "make_it_so": true,
            "txt": "desc"
        },
        {
            "code": 10,
            "make_it_so": false,
            "txt": "."
        }
    ]
}
```
