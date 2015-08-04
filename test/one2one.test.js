var assert = require('assert');
var should = require('should');

describe('one2one rules', function()
{
	var OT = require('../')();
	var input = {
		aaa: 1,
		bbb: 2,
		ccc: '10',
		ddd: '.'
	};
	describe('map new field', function()
	{
		it('aaa should be aaa', function(done)
		{
			OT.mapOne2One('aaa');
			var output = OT.transform(input);
			should.exist(output.aaa);
			output.aaa.should.be.eql(1);
			done();
		});
		it('bbb should be xyz', function(done)
		{
			OT.mapOne2One('bbb', 'xyz');
			var output = OT.transform(input);
			should.exist(output.xyz);
			should.not.exist(output.bbb);
			output.xyz.should.be.eql(2);
			done();
		});
		it('bbb should be ijk and value should be equal to zippy', function(done)
		{
			OT.mapOne2One('bbb', 'ijk',
			{
				2: 'zippy'
			});
			var output = OT.transform(input);
			should.exist(output.ijk);
			output.ijk.should.be.eql('zippy');
			done();
		});
		it('ccc should be converted to integer ', function(done)
		{
			OT.mapOne2One('ccc', 'ccc', {}, 'int');
			var output = OT.transform(input);
			should.exist(output.ccc);
			should(output.ccc).be.a.Number();
			output.ccc.should.be.eql(10);
			done();
		});
		it('ddd should not exist', function(done)
		{
			OT.mapOne2One('ddd', 'ddd', {'.':''});
			var output = OT.transform(input);
			should.not.exist(output.ddd);
			done();
		});
	});
});
