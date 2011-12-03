/*
 * OKCandidate
 * Backbone.js app
 */



$(function() {
    var questiontemplate;

    $.when( $.get("tmpl/question-form.html", function(data) {
	questiontemplate = data;
    }) ).then(function() {

	window.Question = Backbone.model.extend({
	    defaults: function() {
		return {
		    q: "Question?"
		    desc: "Optional description of question"
		    choices: []
		};
	    }
	});
	
	window.QuestionList = Backbone.Collection.extend({
	    model: Question
	    
	});

	window.Questions = new QuestionList;

	window.QuestionView = Backbone.View.extend({
	    tagName: "div",
	    template: _.template(questiontemplate);
	    
	    events: {

	    },

	    intialize: function() {
		this.model.bind('change', this.render, this);
		this.model.bind('destroy', this.remove, this);
	    },
	    
	    render: function() {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	    },
	    remove: function() {
		$(this.el).remove();
	    }

	});

	


    }); //end then
});