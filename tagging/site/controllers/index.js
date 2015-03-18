
// export a function that accepts `app` as a param
module.exports = function (app) {
	console.log('index run');
	require("./tag_controller")(app)
	require("./about")(app)
};