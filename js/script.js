/*
 * OKCandidate
 * Backbone.js app
 */



$(function() {
    var questiontemplate;

    $.when( $.get("tmpl/question-form.html", function(data) {
	questiontemplate = data;
    }) ).then(function() {

	window.Question = Backbone.Model.extend({
	    defaults: function() {
		return {
		    q: "Question?",
		    desc: "Optional description of question",
		    choices: []
		};
	    },
	    initialize: function() {
		console.log("question initialize");
		this.view = new QuestionView({model: this});
	    }
	});
	
	window.QuestionList = Backbone.Collection.extend({
	    model: Question,
	    initialize: function() {
		console.log("questionlist initialize");
		this.curr = 0;
	    },
	    showCurr: function() {
		var q = Questions.at(this.curr);
		console.log(q);
		q.change();
	    },
	    showNext: function() {
		if (this.curr < this.length-1) {
		    this.curr += 1;
		    this.showCurr();
		} else {
		    console.log("at end of questions");
		}
	    }
	});

	window.QuestionView = Backbone.View.extend({
	    tagName: "div",
	    template: _.template(questiontemplate),
	    
	    events: {

	    },

	    initialize: function(options) {

		console.log("questionview initialize");
		this.model = options.model;
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
		//this.render();
	    },
	    
	    render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		$(window.App.el).html($(this.el));
		return this;
	    },
	    remove: function() {
		$(this.el).remove();
	    }

	});

	window.AppView = Backbone.View.extend({
	    el: $("#question-container"),
	    initialize: function() {
		console.log("appview initialize");
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
	});
	//$(".get-started").click();

    }); //end then
});