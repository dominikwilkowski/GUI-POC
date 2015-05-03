GUI proof of concept
====================


> This repo shall show what a componentized approach to the GUI could look like.
> Emphasis here is on an approach that works for less savvy devs as well as for more advanced ones.
> The mixins for more advanced users and the good old bootstrap css for whomever prefers it.

[Reduced mixin POC](http://codepen.io/dominikwilkowski/pen/qddwgG?editors=010)

## Running

```shell
npm install
grunt
```

Grunt will concatenate and compile files as needed. Not automated is the svg workflow and the settings for each test.

## Testing

The `./test/` folder holds six tests in which we include different moduls and see the output. CSS and JS should only include the relevant moduls.

## Known issues

The svg sprite code is not done yet and the SVG-sprite contains some path errors that we have yet to fix.