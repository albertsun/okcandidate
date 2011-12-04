/*
 * OKCandidate
 * Backbone.js app
 */


var USER = {
    name: "",
    responses: []
};
var scores;


var questiontemplate, responsetemplate, alluserstemplate;
$(function() {
    

    $.when(
	$.get("tmpl/question-form.html", function(data) { questiontemplate = data; }),
	$.get("tmpl/single-response.html", function(data) { responsetemplate = data; }),
	$.get("tmpl/all-users.html", function(data) { alluserstemplate = data; }),
	$.get("tmpl/users-scores.html", function(data) { usersscorestemplate = data; })
    ).then(function() {

	var allcands = _.template(alluserstemplate, {"respondents": candidates});
	$("#all-candidates").html( allcands );
	

	window.User = Backbone.Model.extend({
	    defaults: {
		name: "George",
		responses: []
	    },
	    initialize: function(data) {
		//console.log("user init");
		//this.question = 
	    }
	});

	window.Response = Backbone.Model.extend({
	    defaults: {
		question: "q",
		response_answer: null,
		accepted_responses: [],
		importance: 10,
		explanation: ""
	    },
	    initialize: function(data) {
		this.set({ "question": window.questions_obj[this.toJSON().question_id].question });
		
		////console.log(this.toJSON());
		this.view = new ResponseView({model: this});
		this.view.render();
	    }
	});
	window.ResponseView = Backbone.View.extend({
	    tagName: "div",
	    template: _.template(responsetemplate),

	    initialize: function(options) {
		//console.log("responseview initialize");
		this.model = options.model;
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	    },
	    render: function() {
		var d = this.model.toJSON();
		d.choices = window.questions_obj[d.question_id].choices;
		for (var i=0,len=d.choices.length; i<len; i++) {
		    d.choices[i].classes = "";
		    if (d.accepted_responses == d.choices[i].answer) {
			d.choices[i].classes += " my-response";
		    }
		    if ( _.indexOf(d.accepted_responses, d.choices[i].answer) != -1 ) {
			d.choices[i].classes += " accepted-response";
		    }
		}
		//console.log(d);
		$(this.el).html(this.template(d));
		//console.log(this.el);
		$("#response-container").append($(this.el));
	    },
	    remove: function() {
		$(this.el).remove();
	    }
	});

	window.Question = Backbone.Model.extend({
	    defaults: function() {
		return {
		    q: "Question?",
		    desc: "Optional description of question",
		    choices: []
		};
	    },
	    initialize: function() {
		//console.log("question initialize");
		this.view = new QuestionView({model: this});
	    }
	});
	
	window.QuestionList = Backbone.Collection.extend({
	    model: Question,
	    initialize: function() {
		//console.log("questionlist initialize");
		this.curr = 0;
	    },
	    showCurr: function() {
		//console.log(this.curr);
		var q = Questions.at(this.curr);
		////console.log(q);
		q.change();
	    },
	    showNext: function() {
		//console.log("showNext");
		if (this.curr < this.length-1) {
		    this.curr += 1;
		    this.showCurr();
		} else {
		    //console.log("at end of questions");
		    scores = _.sortBy(calculate_scores(USER, window.candidates), function(a) { return -a.score; });
		    var scoredata = {};
		    var respondents = [];
		    for (var i=0,len=scores.length; i<len; i++) {
			respondents[i] = scores[i].u2;
			respondents[i].score = scores[i].score;
		    }
		    scoredata.respondents = respondents;
		    $("#container").html(_.template(usersscorestemplate, scoredata));
		}
	    }
	});

	window.QuestionView = Backbone.View.extend({
	    tagName: "div",
	    template: _.template(questiontemplate),
	    
	    events: {

	    },

	    initialize: function(options) {
		//console.log("questionview initialize");
		this.model = options.model;
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	    },
	    
	    render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		$(window.App.el).html($(this.el));
		$("form").bind("submit", function(e) {
		    e.preventDefault();
		    var result = $(this).serializeArray();
		    var response = {
			question_id: Questions.at(Questions.curr).id,
			accepted_responses: []
		    };
		    for (var i=0,len=result.length; i<len; i++) {
			if (result[i].name == "user-response") {
			    response["response_answer"] = result[i].value;
			}
			if (result[i].name == "accepted-response") {
			    response["accepted_responses"].push(result[i].value);
			}
			if (result[i].name == "question-relevance") {
			    response["importance"] = Number(result[i].value);
			}
			if (result[i].name == "explanation") {
			    response["explanation"] = result[i].value;
			}
		    }
		    var r = new Response(response);
		    USER.responses.push(r.toJSON());
		    ////console.log(r);
		    //r.change();
		    Questions.showNext();
		});
		return this;
	    },
	    remove: function() {
		$(this.el).remove();
	    }

	});

	window.AppView = Backbone.View.extend({
	    el: $("#question-container"),
	    //responses_el: $("#response-container"),
	    initialize: function() {
		//console.log("appview initialize");
		window.Questions = new QuestionList(questions);
	    },
	    render: function() {
		Questions.showCurr();
	    }
	});

	$(".get-started").live("click", function(e) {
	    e.preventDefault();
	    window.App = new AppView;
	    App.render();
	    window.questions_obj = (function(arr) {
		var rv = {};
		for (var i=0,len=arr.length; i<len; i++) {
		    rv[arr[i].id] = arr[i];
		}
		return rv;
	    }(Questions.toJSON()));
	});
	//$(".get-started").click();
	$("#skip-question").live("click", function(e) {
	    e.preventDefault();
	    Questions.showNext();
	});
    }); //end then
});