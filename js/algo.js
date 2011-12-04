// var questions = [
//     {
// 	id: "1",
// 	question: "What do you think of 1",
// 	desc: "Something about 1",
// 	choices: [
// 	    {answer: "1", desc: "option 1"},
// 	    {answer: "2", desc: "option 2"},
// 	    {answer: "3", desc: "option 3"}
// 	]
//     },
//     {
// 	id: "2",
// 	question: "What do you think of 2",
// 	desc: "Something about 2",
// 	choices: [
// 	    {answer: "1", desc: "option 1"},
// 	    {answer: "2", desc: "option 2"},
// 	    {answer: "3", desc: "option 3"}
// 	]
//     },
//     {
// 	id: "3",
// 	question: "What do you think of 3",
// 	desc: "Something about 3",
// 	choices: [
// 	    {answer: "1", desc: "option 1"},
// 	    {answer: "2", desc: "option 2"},
// 	    {answer: "3", desc: "option 3"}
// 	]
//     }
// ];

// var candidates = [
//     {
// 	name: "Romney",
// 	type: "candidate",
// 	responses: [
// 	    {
// 		question_id: "1", //key to question
// 		response_answer: "1", //key to question choice
// 		accepted_responses: ["1", "2", "3"], //keys to question choice
// 		importance: 10, //one of 0, 1, 10, 50, 250
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "2",
// 		response_answer: "1",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "3",
// 		response_answer: "1",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    }
// 	]
//     },
//     {
// 	name: "Gingrich",
// 	type: "candidate",
// 	responses: [
// 	    {
// 		question_id: "1", //key to question
// 		response_answer: "2", //key to question choice
// 		accepted_responses: ["1", "2", "3"], //keys to question choice
// 		importance: 10, //one of 0, 1, 10, 50, 250
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "2",
// 		response_answer: "2",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "3",
// 		response_answer: "2",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    }
// 	]
//     },
//     {
// 	name: "Cain",
// 	type: "candidate",
// 	responses: [
// 	    {
// 		question_id: "1", //key to question
// 		response_answer: "3", //key to question choice
// 		accepted_responses: ["1", "2", "3"], //keys to question choice
// 		importance: 10, //one of 0, 1, 10, 50, 250
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "2",
// 		response_answer: "3",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "3",
// 		response_answer: "3",
// 		accepted_responses: ["1", "2", "3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    }
// 	]
//     }
// ];

// var user = {
//     name: "george",
//     type: "voter",
//     responses: [
// 	    {
// 		question_id: "1",
// 		response_answer: "3",
// 		accepted_responses: ["3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "2",
// 		response_answer: "3",
// 		accepted_responses: ["3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    },
// 	    {
// 		question_id: "3",
// 		response_answer: "3",
// 		accepted_responses: ["2","3"],
// 		importance: 10,
// 		explanation: "Lorem ipsum..."
// 	    }
// 	]
// };

//var user = {"name":"","responses":[{"question":"Do you believe in the Evolution","response_answer":"Yes","accepted_responses":["Yes","No","Intellegent Design"],"importance":1,"explanation":"","question_id":"1"},{"question":"Do you support a woman's right to choose","response_answer":"No","accepted_responses":["No"],"importance":10,"explanation":"","question_id":"2"},{"question":"Should we Maintain or Lower presence in afganistan","response_answer":"Lower","accepted_responses":["Maintain","Lower"],"importance":1,"explanation":"","question_id":"3"}]};

//var user = {"name":"","responses":[{"question":"Do you believe in the Evolution","response_answer":"Yes","accepted_responses":["Yes"],"importance":10,"explanation":"","question_id":"1"},{"question":"Do you support a woman's right to choose","response_answer":"Yes","accepted_responses":["Yes","No"],"importance":1,"explanation":"","question_id":"2"},{"question":"Should we Maintain or Lower presence in afganistan","response_answer":"Lower","accepted_responses":["Lower"],"importance":1,"explanation":"","question_id":"3"},{"question":"What is your stance on Same-Sex Marriage","response_answer":"For","accepted_responses":["For"],"importance":50,"explanation":"","question_id":"4"},{"question":"Is the rent too damn high","response_answer":"Yes","accepted_responses":["Yes","No"],"importance":0,"explanation":"","question_id":"5"}]};

var user = {"name":"","responses":[{"question":"Do you believe in the Evolution","response_answer":"Yes","accepted_responses":["Yes"],"importance":50,"explanation":"","question_id":"1"}]};

function score(u1, u2) {
    var u2responses = {};
    for (var i=0,len=u2.responses.length; i<len; i++) {
	u2responses[u2.responses[i].question_id] = u2.responses[i];
    }
    //console.log(u2responses);
    var u1score = [0,0];
    var u2score = [0,0];
    for (var j=0,len2=u1.responses.length; j<len2; j++) {
	var question_id = u1.responses[j].question_id;
	var u1response = u1.responses[j];
	var u2response = u2responses[question_id];
	if (u1response && u2response) {
	    //console.log(u1response);
	    //console.log(u2response);
	    if (_.indexOf(u1response.accepted_responses, u2response.response_answer) != -1) {
		u1score[0] += u1response.importance;
		u1score[1] += u1response.importance;
	    } else {
		u1score[1] += u1response.importance;
	    }
	    if (_.indexOf(u2response.accepted_responses, u1response.response_answer) != -1) {
		u2score[0] += u2response.importance;
		u2score[1] += u2response.importance;
	    } else {
		u2score[1] += u2response.importance;
	    }
	}
    }
    //console.log(u1score);
    //console.log(u2score);
    var s = Math.sqrt((u1score[0]/u1score[1]) * (u2score[0]/u2score[1]));
    if (_.isNaN(s)) { s = 0; }
    return {"u1": u1, "u2":u2, "score":s};
}

function calculate_scores(u1, candidates) {
    var i,len,scores=[];
    for (i=0,len=candidates.length; i<len; i++) {
	var s = score(u1, candidates[i]);
	//console.log(s);
	scores.push(s);
    }
    return scores
}

// var scores = calculate_scores(user, candidates);
// scores = _.sortBy(scores, function(a) { return -a.score; });
// console.log(scores);
// //console.log(score(user,candidates[2]));
