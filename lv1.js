//copy and paste code to console directly

var ans = [];

var trs = $('tr');

var col_name = $(trs[0]).children('td');

for(var i=1; i<trs.length; i++)
{
	var cols = $(trs[i]).children('td');
	var grades = {};
	for(var j=1; j<cols.length; j++)
	{
		grades[$(col_name[j]).text()] = parseInt($(cols[j]).text());
	}
	
	ans.push({
		name: $(cols[0]).text(),
		grades: grades
	});
}

document.write(JSON.stringify(ans, undefined, 0));