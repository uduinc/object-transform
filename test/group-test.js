var assert = require('assert');
var should = require('should');

describe('group rules', function()
{
	var OT = require('../')();
	var input = {
		code1: 1,
		txt1: 'desc',
		code2: '10',
		txt2: '.',
		txt3: 'stuff'
	};
	describe('map new group', function()
	{
		it('code1 and txt1 should be in zzz', function(done)
		{
			OT.mapGroup({'code1':'code','txt1':'txt'},'zzz');
			var output = OT.transform(input);
			should.exist(output.zzz);
			should.exist(output.zzz[0].code);
			should.exist(output.zzz[0].txt);
			output.zzz[0].code.should.be.eql(1);
			output.zzz[0].txt.should.be.eql('desc');
			done();
		});
		it('txt3 requires code3 to exist', function(done)
		{
			OT.mapGroup({'code3':'code','txt3':'txt'},'xxx', 'code3');
			var output = OT.transform(input);
			should.not.exist(output.xxx);
			done();
		});
	});
});
