/**
* Create an object property which acts alike a regular property, but which will call the factory function providing a value whenever the value is found to be undefined.
* @param dep - either a factory function or a module-name string to require() on demand
* @param localModule - the passed in's local callsite to require() from, if factory is a module-name string
*/
function defaulter(factory, localModule){
	factory= exports.makeFactory(factory, localModule)
	var val
	return {
		get: function(){
			if(val === undefined){
				val= factory()
			}
			return val
		},
		set: function(_val){
			val= _val
			// todo: de-cache module if unset?
		},
		configurable: true,
		enumerable: true
	}
}


/**
* Create a defaulter and apply it as an object property
* @param factory - the factory/module to apply
* @param localModule - an optional local module to require()
* @param object- the exports to build on
* @param propertyName - a name to apply onto
*/
function apply(factory, localModule, object, propertyName){
	if(arguments.length === 3){
		propertyName= object
		object= localModule
		localModule= undefined
	}
	var property = exports.defaulter(factory, localModule)
	Object.defineProperty(object, propertyName, property)
	return object
}

/**
* Either pass through a factory object, or, if params are found to be a module name, build a require() factory
* @param factory - the factory function to pass or module string to lift
* @param localModule - the module to require() from
*/
function makeFactory(factory, localModule){
	if(factory instanceof String){
		var moduleName = factory
		localModule = localModule || module
		factory = function(){
			return localModule.require(moduleName)
		}
	}
	if(!(factory instanceof Function)){
		throw new TypeError('Expected a function or module-name')
	}
	return factory
}

module.exports= exports= apply
exports.defaulter= defaulter
exports.makeFactory= makeFactory
