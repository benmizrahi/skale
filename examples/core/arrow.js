#!/usr/bin/env node

var sc = require('skale').context();

sc.range(6).map(a => a*a).reduce((a,b) => a+b, 0).then(function (res) {
	console.log(res);
	sc.end();
})
