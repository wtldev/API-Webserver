var http = require('http');

//require('dotenv').config();
const bearer = process.env.BEARER_SECRET;
const OpenAI = require('openai');
const openai = new OpenAI();


http.createServer(async function (req, res) {
	
  console.log("process env:");	
  console.log(process.env);	
 
  var newText = await OpenAiGenerateText(20,'Geschichte');

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write(String(newText));
  res.end('Hello World!');
  
}).listen(3000); 


async function  OpenAiGenerateText(wordCount, topic) {
    var url = "https://api.openai.com/v1/completions";
    response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': bearer,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "prompt": "Generiere einen lehrreichen Text zum einem zufälligen Thema aus dem Bereich "+ topic +". Der Text soll ungefähr "+ wordCount +" Wörter beinhalten. Der Text muss aus vollständigen Sätzen bestehen. Der Text darf keine Anführungs- und Schlusszeichen beinhalten.",
            "max_tokens": 500,
            "temperature": 0.3,
            "model": "gpt-3.5-turbo-instruct"
        })


    });
    result = await response.json();
    console.log(result);
    //document.getElementById("text").value = await res['choices'][0].text;
    var textWithoutMistakes= await result['choices'][0].text;
    //JSON.stringify(textWithoutMistakes)
    textWithoutMistakes = textWithoutMistakes.toString();
    textWithoutMistakes = textWithoutMistakes.replace(/(\r\n|\n|\r)/gm,"");
    
    //console.log(textWithMistakes);

    //textWithoutMistakes scheint kein String zu sein und es gibt einen Error mit der split function später, stringify scheintes gelöst zu haben
    //if (typeof "textWithoutMistakes" === 'string') {
    //    console.log("ist string");
    //  }

    return textWithoutMistakes;
}