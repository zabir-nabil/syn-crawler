 var request1 = require('request');
//var cheerio = require('cheerio');
//var URL_parse = require('url-parse');

var final_URL = "http://www.synonym.com/synonyms/";
var synonym = "";


var prompt = require('prompt');
 
  // 
  // Start the prompt 
  // 
  
  console.log('Type any valid word: ');
  prompt.start();
 
  // 
  // Get the word 
  // 
  prompt.get(['syn'], function (error, result) {
    // 
    // Log 
    // 
	
	//Check error [later]
	
    
    console.log('        You typed : ' + result.syn);
	
    synonym = result.syn;
	
	console.log("Finding synonyms from " + final_URL + "\n");
	
    final_URL += synonym;
	
	console.log("Finding synonyms from " + final_URL + "\n");
	
	call_on();

	
  });





function reverse(s) {
  return s.split('').reverse().join('');
}

function process(body)
{
	//Used the structure of page
	
	if(body.length==0)
	{
		console.log("Not found\n");
		return;
	}
	
	var idx = body.indexOf("<li class=\"syn\">");
	//console.log("Found at "+idx);
	var flag = false;
	var syns = [];
	for(var cp=idx;cp<=body.length;cp++)
	{
		var posstr = body.charAt(cp) + body.charAt(cp+1) + body.charAt(cp+2) + body.charAt(cp+3);
		
		var curSyn = "";
		
		if(posstr=="</a>")
		{
			flag = true;
			var cid = cp-1;
			
			while(body.charAt(cid)!='>')
			{
				curSyn += body.charAt(cid);
				cid--;
			}
			
			curSyn = reverse(curSyn);
			
			//console.log(curSyn);
			syns.push(curSyn);
		}
		else if(flag && posstr=="/ul>")
		{
			break;
		}
		
	}
	
	
	 if(syns.length==0)
   {
	   console.log("No synonyms found.\n");
	   
   }
   else
   {
	   console.log(syns.length + " synonyms found.\n");
	   
	   for(var i=0;i<syns.length;i++)
	   {
		   console.log((i+1) + ") " + syns[i] + "\n");
	   }
	   
   }
   
   
	
	//console.log(syns.length);
	
	return syns;
	
}





function call_on()
{
	var syns_arr = [];
	
	console.log("call_on() " + final_URL + "\n");
	
	request1(final_URL, function(error, response, body) {
   if(error) {
     console.log("Error happened: " + error);
   }
   
   console.log("Valid word (Found page): " + response.statusCode);
   if(response.statusCode === 200) {
  
	 
	 syns_arr = process(body);
   }
   else
   {
	   
	   console.log("Some error!\n");
   }
});
   

}






