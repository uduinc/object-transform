'use strict';
var _ = require('lodash');

module.exports = function(transform)
{
	var map = {};
	if (map)
	{
		map = transform;
	}


	function mapOne2One(from, to, translate, type)
	{
		if (!to)
		{
			to = from;
		}
		map[from] = {
			target: 'one2one',
			name: to,
			translate: translate,
			type: type
		};
	}

	function mapArray(from, to)
	{
		map[from] = {
			target: 'array',
			name: to
		};
	}

	function mapGroup(group, to, require)
	{
		if (!require)
		{
			require = false;
		}
		if (!map['group'])
		{
			map['group'] = [];
		}
		map['group'].push(
		{
			group: group,
			name: to,
			require: require
		});
	}

	function transform(record)
	{
		var output = {};
		_.forOwn(map, function(value, key)
		{
			if (value.target === 'one2one')
			{
				if (record[key])
				{
					if (value.translate && value.translate.hasOwnProperty([record[key]]))
					{
						if (value.translate[record[key]] !== '')
						{
							output[value.name] = value.translate[record[key]];
						}
					}
					else
					{
						if (value.type && value.type === 'int')
						{
							output[value.name] = parseInt(record[key]);
						}
						else
						{
							output[value.name] = record[key];
						}
					}
				}
			}
			else if (value.target === 'array')
			{
				if (!output[value.name])
				{
					output[value.name] = [];
				}
				if (record[key])
				{
					if (value.translate && value.translate.hasOwnProperty(record[key]))
					{
						output[value.name] = push(value.translate[record[key]]);
					}
					else
					{
						output[value.name].push(record[key]);
					}
				}
			}
		});
		if (map.group)
		{
			_.forEach(map.group, function(groupMap)
			{
				var suboutput = {};
				var require_found = false;
				var used = 0;
				_.forOwn(groupMap.group, function(value, key)
				{
					if (record[key])
					{
						if ((typeof value) === 'string')
						{
							suboutput[value] = record[key];
							used++;
						}
						else
						{
							if (value.translate && value.translate.hasOwnProperty(record[key]))
							{
								if (value.translate[record[key]] !== '')
								{
									suboutput[value.name] = value.translate[record[key]];
									used++;
								}
							}
							else
							{
								if (value.type && value.type === 'int')
								{
									suboutput[value.name] = parseInt(record[key]);
									used++;
								}
								else
								{
									suboutput[value.name] = record[key];
									used++;
								}
							}
						}
						if (key === groupMap.require)
						{
							require_found = true;
						}
					}
				});
				if ((groupMap.require && require_found && used > 0) || (!groupMap.require && used > 0))
				{
					if (!output[groupMap.name])
					{
						output[groupMap.name] = [];
					}
					output[groupMap.name].push(suboutput);
				}
			});
		}
		return output;
	}

	return {
		mapOne2One: mapOne2One,
		mapArray: mapArray,
		mapGroup: mapGroup,
		transform: transform
	}
}
