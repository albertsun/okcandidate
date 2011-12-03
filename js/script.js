/*
  * OKCandidate
  * Backbone.js app
  */

$(function() {

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


});