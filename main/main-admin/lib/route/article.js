
var router = require('koa-router')();

var testData =[
	        [
	            "Angelica",
	            "Ramos",
	            "System Architect",
	            "London",
	            "9th Oct 09",
	            "$2,875"
	        ],
	        [
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],
	        [
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],
	        [
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ],[
	            "Ashton",
	            "Cox1",
	            "Technical Author",
	            "San Francisco",
	            "12th Jan 09",
	            "$4,800"
	        ]
	    ];

testData = [
	{
		"name":"dddd",
		"position":"11111",
		"salary":"ddddd",
		"date":new Date
	}
]


router.post('/laborunion-welfare/list',async (ctx, next)=>{
	var {draw,columns,start,length,search} = ctx.request.body;
	start = start==0?start:start-1;
	console.log(JSON.stringify(ctx.request.body));
	var data = testData.slice(start,length);
    ctx.body = {
	    "recordsTotal": testData.length,
	    "recordsFiltered": testData.length,
	    "data": data,

	};
});




export default router;
