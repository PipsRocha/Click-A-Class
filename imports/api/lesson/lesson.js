import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
SimpleSchema.extendOptions(['autoform']);

import { Teacher } from '/imports/api/teacher/teacher.js';
import { Classroom } from '/imports/api/classroom/classroom.js';
import { Class } from '/imports/api/class/class.js';

export const Lesson = new Mongo.Collection( 'lesson' );

// The goal of this object is to isolate a lesson ("class") form the remaining objects
// It requires the room it's taking place, the teacher and the students in it

Lesson.allow({
  insert() { return false; },
  update() { return true; },
  remove() { return false; },
});

LessonSchema = new SimpleSchema({
	number: {
		type: Number,
		label: "Number",
		optional: true,
	},
	state: {			// State of class, "on", "off", "quiz", "questions", "break", ...
		type: String,
		label: "State",
		allowedValues: ['on', 'idle', 'quiz', 'finished', 'association','quick-question'],
		optional: true,
	},
	// Display Only The Classrooms the User has access
	classroom: {
		type: Number,
		label: "Classroom",
		autoform:
		{
			options: function () {
				let t = Teacher.findOne({"user":Meteor.userId()});
				let cr = Classroom.find({"teachers":t._id});
				return cr.map((doc) => ({
					label: doc.name,
					value: doc.number
				}))	
				
			},
		},
	},
	// Must be the logged user
	teacher: {
		type: String,
		label: "Teacher",
		optional: true,
	},
	// Display Only the User's classes
	class: {
		type: Number,
		label: "Class",
		autoform:
		{
			options: function () {
				let t = Teacher.findOne({"user":Meteor.userId()});
				let c = Class.find({"number":{"$in":t.classes}});
				return c.map((doc) => ({
					label: doc.name,
					value: doc.number
				}));
			},
		},
	},
	association: {
        type: Array,
        optional: true,
    },
    'association.$': Object,
    'association.$.mac': { type:String, optional:true},
    'association.$.student': String,
    'association.$.score': Number,
	/* 	Future:
		- Quizzes / Activities
	*/
	quiz:{
		type: Number,
		optional: true,
	},
	quizCount:{
		type: Number,
		optional: true,
	},
	quickQuestion: {
		type: Number,
		optional: true,
	},

});

Lesson.attachSchema( LessonSchema ); 