var questions = [
    {
	id: "1",
	q: "What do you think of 1",
	desc: "Something about 1",
	choices: [
	    {key: "1", desc: "option 1"},
	    {key: "2", desc: "option 2"},
	    {key: "3", desc: "option 3"}
	]
    },
    {
	id: "2",
	q: "What do you think of 2",
	desc: "Something about 2",
	choices: [
	    {key: "1", desc: "option 1"},
	    {key: "2", desc: "option 2"},
	    {key: "3", desc: "option 3"}
	]
    },
    {
	id: "3",
	q: "What do you think of 3",
	desc: "Something about 3",
	choices: [
	    {key: "1", desc: "option 1"},
	    {key: "2", desc: "option 2"},
	    {key: "3", desc: "option 3"}
	]
    }
];

var candidates = [
    {
	name: "Romney",
	type: "candidate",
	responses: [
	    {
		question_id: "1", //key to question
		response_key: "1", //key to question choice
		accepted_responses: ["1", "2", "3"], //keys to question choice
		importance: 10, //one of 0, 1, 10, 50, 250
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "2",
		response_key: "1",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "3",
		response_key: "1",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    }
	]
    },
    {
	name: "Gingrich",
	type: "candidate",
	responses: [
	    {
		question_id: "1", //key to question
		response_key: "2", //key to question choice
		accepted_responses: ["1", "2", "3"], //keys to question choice
		importance: 10, //one of 0, 1, 10, 50, 250
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "2",
		response_key: "2",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "3",
		response_key: "2",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    }
	]
    },
    {
	name: "Cain",
	type: "candidate",
	responses: [
	    {
		question_id: "1", //key to question
		response_key: "3", //key to question choice
		accepted_responses: ["1", "2", "3"], //keys to question choice
		importance: 10, //one of 0, 1, 10, 50, 250
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "2",
		response_key: "3",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "3",
		response_key: "3",
		accepted_responses: ["1", "2", "3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    }
	]
    }
];

var user = {
    name: "george",
    type: "voter",
    responses: [
	    {
		question_id: "1",
		response_key: "3",
		accepted_responses: ["3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "2",
		response_key: "3",
		accepted_responses: ["3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    },
	    {
		question_id: "3",
		response_key: "3",
		accepted_responses: ["2","3"],
		importance: 10,
		explanation: "Lorem ipsum..."
	    }
	]
};

function score(u1, u2) {
    var u2responses = {};
    for (var i=0,len=u2.responses.length; i<len; i++) {
	u2responses[u2.responses[i].question_id] = u2.responses[i];
    }
    var u1score = [0,0];
    var u2score = [0,0];
    for (var j=0,len2=u1.responses.length; j<len2; j++) {
	var question_id = u1.responses[j].question_id;
	var u1response = u1.responses[j];
	var u2response = u2responses[question_id];
	console.log(u1response);
	console.log(u2response);
	if (_.indexOf(u1response.accepted_responses, u2response.response_key) != -1) {
	    u1score[0] += u1response.importance;
	    u1score[1] += u1response.importance;
	} else {
	    u1score[1] += u1response.importance;
	}
	if (_.indexOf(u2response.accepted_responses, u1response.response_key) != -1) {
	    u2score[0] += u2response.importance;
	    u2score[1] += u2response.importance;
	} else {
	    u2score[1] += u2response.importance;
	}
    }
    console.log(u1score);
    console.log(u2score);
    var s = Math.sqrt((u1score[0]/u1score[1]) * (u2score[0]/u2score[1]));
    return {"u1": u1, "u2":u2, "score":s};
}

function calculate_scores(user, candidates) {
    var i,len,scores=[];
    for (i=0,len=candidates.length; i<len; i++) {
	var s = score(user, candidates[i]);
	console.log(s);
	scores.push(s);
    }
    return scores
}

var scores = calculate_scores(user, candidates);
console.log(scores);
//console.log(score(user,candidates[2]));