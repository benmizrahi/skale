var assert = require('assert');
var fs = require('fs');
var trace = require('line-trace');

var files = [
	__dirname + '/kv.data',
	__dirname + '/kv2.data'
];

var raw_data = [
	fs.readFileSync(files[0], {encoding: 'utf8'}),
	fs.readFileSync(files[1], {encoding: 'utf8'})
];

function textParser(s) {return s.split(' ').map(parseFloat);}
function textParser2(s) {trace(s); return (typeof s) === 'string' ? s.split(' ').map(parseFloat) : s;}

var v = [
	raw_data[0].split('\n').map(textParser),
	raw_data[1].split('\n').map(textParser)
];

// Helper functions for tests
function compareResults(r1, r2) {
	if (Array.isArray(r1)) sort(r1);
	if (Array.isArray(r2)) sort(r2);
	//assert.deepEqual(r1, r2);
	assert.equal(JSON.stringify(r1), JSON.stringify(r2));
}

function filter(e) {return e[1] % 2 === 0;}

function flatMapper(e) {return [e, e];}

function mapper(e) {e[1] *= 2; return e;}

function reducer(a, b) {
	if (Array.isArray(b[0]))
		a[0] += b[0].reduce(sum);
	else
		a[0] += b[0];

	if (Array.isArray(b[1])) {
		a[1] += b[1].reduce(function (a, b) {
			if (Array.isArray(b))
				return a + b.reduce(sum);
			return a + b;
		}, 0);
	} else
		a[1] += b[1];
	return a;

	function sum(a, b) {return a + b;}
}

function sort(v) {
	for (var i = 0; i < v.length; i++) {
		if (Array.isArray(v[i])) sort(v[i]);
	}
	v.sort();
}

function valueMapper(e) {return e * 2;}

function valueFlatMapper(e) {
	var i, out = [];
	for (i = e; i <= 5; i++) out.push(i);
	return out;
}

module.exports = {
	v: v,
	compareResults: compareResults,
	files: files,
	filter: filter,
	flatMapper: flatMapper,
	mapper: mapper,
	reducer: reducer,
	textParser: textParser,
	valueMapper: valueMapper,
	valueFlatMapper: valueFlatMapper
};
