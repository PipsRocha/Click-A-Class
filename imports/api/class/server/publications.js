import { Meteor } from 'meteor/meteor';
import { Class } from '/imports/api/class/class.js';
import { Teacher } from '/imports/api/teacher/teacher.js';

Meteor.publish('class.all', function () {
	return Class.find();
});

Meteor.publish('class.own', function () {
	let t = Teacher.findOne({"user":this.userId});
	return Class.find({"number":{"$in":t.classes}});
});

Meteor.publish('class.own.single', function (number) {
	let t = Teacher.findOne({"user":this.userId});
	if ( t.classes.indexOf(number) > -1 )
		return Class.find({"number":number});
});

Meteor.publish('class.own.current', function (number) {
	let t = Teacher.findOne({"user":this.userId});
	if ( t.classes.indexOf(number) > -1 )
		return Class.find({"number":number});
});