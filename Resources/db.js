var scule = require('com.scule');
var collections = {};

exports.createDb = function() {
	collections.todo = scule.factoryCollection('scule+titanium://todo', {secret:'mysecretkey'});	
};

exports.selectItems = function(_done) {
	return collections.todo.find({done:_done});
};

exports.updateItem = function(_id, _done) { 
	collections.todo.update({_id:scule.getObjectId(_id)}, {$set:{done:_done}}, {}, true);
	collections.todo.commit();
	return exports.selectItems(_done);
};

exports.addItem = function(_item) {
	collections.todo.save({item:_item, done:0});
	collections.todo.commit();
};

exports.deleteItem = function(_id) {
	collections.todo.remove({_id:scule.getObjectId(_id)});
	collections.todo.commit();
};