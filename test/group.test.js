var assert = require('assert');
var should = require('should');

describe('group rules', function()
{
	var input = {
		code1: 1,
		txt1: 'desc',
		code2: '10',
		txt2: '.',
		txt3: 'stuff',
		txt4: '.'
	};
	describe('map new group', function()
	{
		it('code1 and txt1 should be in aaa', function(done)
		{
			var OT = require('../')();
			OT.mapGroup(
			{
				'code1': 'code',
				'txt1': 'txt'
			}, 'aaa');
			var output = OT.transform(input);
			should.exist(output.aaa);
			should.exist(output.aaa[0].code);
			should.exist(output.aaa[0].txt);
			output.aaa[0].code.should.be.eql(1);
			output.aaa[0].txt.should.be.eql('desc');
			done();
		});
		it('code2 should be in bbb and type int, but txt2 not exist', function(done)
		{
			var OT = require('../')();
			OT.mapGroup(
			{
				'code2':
				{
					name: 'code',
					type: 'int'
				},
				'txt2':
				{
					name: 'txt',
					translate:
					{
						'.': ''
					}
				}
			}, 'bbb');
			var output = OT.transform(input);
			should.exist(output.bbb);
			should.exist(output.bbb[0].code);
			should.not.exist(output.bbb[0].txt);
			output.bbb[0].code.should.be.eql(10);
			done();
		});
		it('txt1 should be in ccc and value changed', function(done)
		{
			var OT = require('../')();
			OT.mapGroup(
				{
					'code1': 'code',
					'txt1':
					{
						name: 'txt',
						translate:
						{
							'desc': 'new desc'
						}
					}
				},
				'ccc');
			var output = OT.transform(input);
			should.exist(output.ccc);
			should.exist(output.ccc[0].code);
			should.exist(output.ccc[0].txt);
			output.ccc[0].code.should.be.eql(1);
			output.ccc[0].txt.should.be.eql('new desc');
			done();
		});
		it('txt3 requires code3 to exist', function(done)
		{
			var OT = require('../')();
			OT.mapGroup(
			{
				'code3': 'code',
				'txt3': 'txt'
			}, 'ddd', 'code3');
			var output = OT.transform(input);
			should.not.exist(output.ddd);
			done();
		});
		it('txt1 should exist with multiple mapping to ', function(done)
		{
			var OT = require('../')();
			OT.mapGroup(
			{
				'code1': 'code',
				'txt1': 'txt'
			}, 'eee', 'code1');
			OT.mapGroup(
			{
				'code2': 'code',
				'txt2': 'txt'
			}, 'eee', 'code2');
			OT.mapGroup(
			{
				'code3': 'code',
				'txt3': 'txt'
			}, 'eee', 'code3');
			var output = OT.transform(input);
			console.log(output);
			should.exist(output.eee);
			should.exist(output.eee[0].code);
			should.exist(output.eee[0].txt);
			output.eee[0].code.should.be.eql(1);
			output.eee[0].txt.should.be.eql('desc');
			done();
		});
	});
});
