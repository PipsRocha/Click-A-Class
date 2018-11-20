import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Click } from './click.js';

Meteor.methods({

	fakeClick: function(mac){
		var c = {
			'raspberry':"12345",
			'mac':mac,
			'type': 'ButtonSingleClick',
			'time': Date.now()
		};
		Click.insert(c);
	},

});
