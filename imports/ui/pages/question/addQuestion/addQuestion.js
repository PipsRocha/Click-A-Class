import './addQuestion.html';

import { Question } from '/imports/api/question/question.js';

Template.addQuestion.onRendered(function(){
	var self = this;
	self.autorun(function(){
		
	});
});

Template.addQuestion.helpers({
	Question(){
		return Question;
	},
});

Template.addQuestion.events({
	
});


AutoForm.addHooks(['addQuestion'],{
	onSuccess: function(formType, result) {
		alert("Question added successfuly");
	}
});