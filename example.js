	var OT = require('./')();
	var input = {
		aaa: 1,
		bbb: 2,
		ccc: '10',
		ddd: '.',
		code1: 1,
		txt1: 'desc',
		makeitso1: '1',
		code2: '10',
		makeitso2: '0',
		txt2: '.',
		makeitso3: '1',
		txt3: 'stuff',
		makeitso4: '1',
		txt4: '.'
	};
	// straight map
	OT.mapOne2One('aaa');
	// rename field
	OT.mapOne2One('bbb', 'xyz');
	// rename field and translate value
	OT.mapOne2One('bbb', 'ijk',
	{
		2: 'zippy'
	});
	// no translation but convert to int
	OT.mapOne2One('ccc', 'ccc',
	{}, 'int');
	// map value '.' to '' so field is empty and not be included
	OT.mapOne2One('ddd', 'ddd',
	{
		'.': ''
	});
	//require code1 field
	var code = {
		name: 'code',
		type: 'int'
	};
	//convert to true/false
	var truefalse = {
		'0': false,
		'1': true
	};
	var makeitso = {
		name: 'make_it_so',
		translate: truefalse
	}
	OT.mapGroup(
	{
		'code1': code,
		'makeitso1': makeitso,
		'txt1': 'txt'
	}, 'eee', 'code1');
	// require code2 field
	OT.mapGroup(
	{
		'code2': code,
		'makeitso2': makeitso,
		'txt2': 'txt'
	}, 'eee', 'code2');
	// require code3 field
	OT.mapGroup(
	{
		'code3': code,
		'makeitso3': makeitso,
		'txt3': 'txt'
	}, 'eee', 'code3');
	var output = OT.transform(input);
	console.log(JSON.stringify(input));
	console.log(JSON.stringify(output));
