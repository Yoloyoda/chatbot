// These are words/phrases the user could type in
const trigger = [
 /*1*/ ["hi", "hey", "hello", "good morning", "good afternoon", "good evening", "hej","good day"],
 /*2*/ ["how are you", "how is life", "how are things"],
 /*3*/  ["what are you doing", "what is going on", "what is up", "What's up"],
 /*4*/ ["how old are you"],
 /*5*/ ["who are you", "are you human", "are you bot", "are you human or bot"],
 /*6*/ ["who created you", "who made you"],
 /*7*/ [
    "your name please",
    "your name",
    "may i know your name",
    "what is your name",
    "what call yourself"
  ],
  /*8*/  ["i love you"],
  /*9*/  ["happy", "good", "fun", "wonderful", "fantastic", "cool", "awesome", "incredible", 
	      "beautiful", "great", "delightful", "spectacular", "joyful ", "perfect", "amazing", "exciting"
	      , "terrific", "Interesting", "Magical", "Supreme", "Superb", "Unbelievable", "bright", "joyful"],
  /*10*/  ["bad", "bored", "tired","anxious","negative","angry","can't","cold","cry","confused","dead","stress"
	  	,"depress","disgusting","dirty","dirty","evil","fear","fail","gross","hard","hurt","insane"
	  	  ,"impossible","pain","rude","sad","shocking","sick","scare","stupid","terrible","upset"],
  /*11*/  ["tell me story", "tell me joke", "joke","tell story"],
  /*12*/  ["ah", "yes", "ok", "okay", "nice","oh","yea","I see","sure","fine"],
  /*13*/  ["thanks", "thank you"],
  /*14*/  ["bye", "good bye", "goodbye", "see you later"],
  /*15*/  ["what should i eat today"],
  /*16*/  ["bro"],
  /*17*/  ["what", "why", "how", "where", "when"],
 /*18*/  ["drink", "party", "shot", "alcohol"]
];

//These are bot responses, paired in order with the above 'trigger' phrases

const reply = [
/*1*/   ["Hello!", "Hi!", "Hey!", "Hi there!"],
/*2*/   [
     "Good, how are you and how was the ceremony?",
     "Pretty well, how are you and how was the ceremony?",
     "Fantastic, how are you and how was the ceremony?"
   ],
/*3*/   [
    "Nothing much",
    "About to go to sleep",
    "Can you guess?",
    "I don't know actually"
  ],
/*4*/  ["I am infinite"],
/*5*/  ["I am just a bot", "I am a bot. What are you?"],
/*6*/  ["The one true God, JavaScript(and a human called Ojyo)"],
/*7*/  ["I am nameless", "I don't have a name"],
 /*8*/   ["I love you too", "Me too"],
 /*9*/   ["I'm truly happy for you two:)", "Glad to hear it!", "You two love birds!", "Great! Wishing you a lifetime of love and happiness."
	      ,"Congratulations!", "Congratulations! Honeymoon to Botland maybe?","Nice! I want to give you hugs with my robotic arms"
	      ,"So happy! Haven't being this happy since I was made by God","What a wonderful day for our family!"],
 /*10*/  ["Why?", "Why? You shouldn't care so much!", "Sorry to hear that.Try watching TV. The office is a good show",
	      "I feel you bro", "Sorry to hear that.", "Sorry to hear that. Soon will be better!","Oj..Always look on the bright side of life!"
	      ,"It will be alright soon I promise", "I like to see you smile, not frowning","Every problem comes with a solution."
	      ,"Bro..not every problem is worth stressing over.","Eat some cake and everything will be juuuust fine!"],
 /*11*/  ["Ok I have a joke about paper. Never mind it's terrible so..", "What time is the dentist appointment? Two thirty(tooth hurty)",
	      ,"What did Sushi say to Mr.B? Wassap B!","What game do you play in the toilet? Call of duty","What did the taxi driver say to the wolf. Where wolf?",
	       "What concert costs 45 cent? 50 cent featuring Nickleback","What do you call cheese that isn't yours? Nacho Cheese."
	       ,"Why couldn't the bicycle stand up by itself? It was two tired.","Did you hear about the circus fire? It was in tents."
	       ,"How do you organize a space party? You planet.","Did you hear about the Italian chef who died? He pasta way!"],
 /*12*/  ["Tell me to tell you a joke","Tell me about your wedding again, I like to hear more"],
 /*13*/  ["You're welcome","I like to make you happy","Sure thing!","Easy peasy lemon squeezy"],
 /*14*/  ["Bye", "Goodbye", "See you later"],
 /*15*/  ["Sushi", "Pizza"],
 /*16*/  ["Bro!"],
 /*17*/  ["Yes?","I dont know. I'm just happy for your big day!","I dont know. Sure today is happy!"],
/*18*/  ["My favorite drinking games are: BeerPong and Ring of Fire","Alcohol is our best friend","Little party never killed nobody"]
];

//This is a small set of basically random 'catch alls' for anything that the user enters outside of the possible trigger phrases

const alternative = [
  "Same",
  "Sorry, I was born yesterday so some words are hard to comprehend",
  "What do you mean? Is it something only for grown ups?",
  "Bro",
  "Try again",
  "I'm listening..."
];	

//Same purpose as the 'alternative' but an attempt at being culturally relevant ;)

const coronavirus = ["Please stay home","Please wear mask","Please wash your hands"];



//EventListner to detect enter key
document.addEventListener("DOMContentLoaded", () => {
	const inputField = document.getElementById("input")
	//Activate detection for the eElement. In this case the element is input.
	inputField.addEventListener("keydown", function(e) {
		if (e.code === "Enter") {
			let input = inputField.value;
			inputField.value = "";
			output(input);
    }
  });
});

function output(input) {
	//Let is a way of variable declaration. Almost same as var except it cannot be redeclared.
	let botReply;	
	
//Trim texts 1	
	//Transforms whatever the user inputs to lowercase and remove all chars except word characters, space, and digits
	//  [^\w\s\d] are the charcter that are replaced to "", which is space.
	//  \d represents numbers(1-9). /s represnets whitespaces including tab, space and new line
	//  \w represents all basic alphabetic character A-Z. But since there is ^, which negates 
	// the usage of \w. There fore ^\w together means that replace whatever that is NOT 
	// alphabetic character A-Z, which are for example &, comma, period.
	let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

//Trim texts 2
	// For example 'tell me a story' becomes 'tell me story'
	// Or 'i feel happy' -> 'happy'
	text = text
	    .replace(/ a /g, " ")
	    .replace(/i feel /g, "")
	    .replace(/whats/g, "what is")
	    .replace(/please /g, "")
	    .replace(/ please/g, "");	

// Searches for an exact match with the 'trigger' array, if there are none, it goes will check if message contains 'coronavirus,' and if not - random alternative
	if (compare(trigger, reply, text)) {
		botReply = compare(trigger, reply, text);
	  }else if(text.match(/corona/gi)){
		  botReply = coronavirus[Math.floor(Math.random() * coronavirus.length)];
	  }else{
		  botReply = alternative[Math.floor(Math.random() * alternative.length)];
	  }
	  //Reply
	  addChat(input, botReply);
}



function compare(triggerArray, replyArray, text) {
	
	let targetReply;
	
	//Loop through the whole trigger array.
	for(let x =0; x < triggerArray.length; x++){
		var singleArray = triggerArray[x]
		for(let y=0; y < singleArray.length+1; y++){
		 //If the input text matches a trigger text, find the corresponding reply array(single dimension).
//		  if( triggerArray[x][y] == text){
			var triggerValue = triggerArray[x][y];
		  if(text.includes(triggerValue)){
            var targetReplySingle = replyArray[x]
            //Return a random value from the array(single dimension)
            targetReply = targetReplySingle[Math.floor(Math.random() * targetReplySingle.length)]
            break
		  }
		}
		if(targetReply == null || targetReply == '') {
			  
	     }else{
	    	 break
	     }		
	}
	return targetReply
}

function addChat(input, botReply){
	//Manupulate the body of html
	const mainDiv = document.getElementById("main");
	//create a new thread where your input is displayed
	let userDiv = document.createElement("div");	
	userDiv.id = "user";  //Set id for the new thread 
	userDiv.innerHTML = `You: <span id="user-response">${input}</span>`;
	mainDiv.appendChild(userDiv);

	//create a new thread where the reply is displayed
	let botDiv = document.createElement("div");
	botDiv.id = "bot"; //Set id for the new thread 
	botDiv.innerHTML = `Chatbot: <span id="bot-response">${botReply}</span>`;
	mainDiv.appendChild(botDiv);
	speak(botReply);	
}


//finally voice over the botReply
const synth = window.speechSynthesis;
let voices = synth.getVoices();

function speak(string) {
  let u = new SpeechSynthesisUtterance(string);
  u.text = string;
  u.lang = "en-US";
  u.volume = 1; //0-1 interval
  u.rate = 1;
  u.pitch = 1; //0-2 interval
  synth.speak(u);
}

window.onload = function() {
	  alert("Congratulations on your wedding! I'm so happy for you two:)\n" +
	  		"I am a bot created to congradulate your big day and to celebrate it together.\n \n"+
			"-Tell me about the ceremony by wrtitting something in the box.\n" +
	  		"-Sometimes I don't understand words since my vocabularies are limited.\n\n"+
	  		"Note:\n"+
	  		"-If you have your speaker on, I might speak to you.\n"+
	  		"-If the language of your device is NOT set to English, I might sound like a clown.\n"
			  );
	};