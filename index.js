const Metalsmith			= require("metalsmith");
const layouts				= require("metalsmith-layouts");
const collections			= require("metalsmith-collections");
const discoverPartials		= require("metalsmith-discover-partials");
const dateFormatter			= require("metalsmith-date-formatter");
const permalinks			= require("metalsmith-permalinks");
const debug					= require('metalsmith-debug');

Metalsmith(__dirname)
	.metadata({
		sitename: "LetsGraphQL",
		siteurl: "",
		description: "",
		generatorName: "Metalsmith",
		generatorUrl: "http://www.metalsmith.io"
	})
	.source("./src")
	.destination("./docs")
	.clean(true)
	.use(collections({
		posts: {
			pattern: "blog/*/*.html",
			sortBy: "date",
			reverse: true
		},
		apis: {
			pattern: "apis/api-list/*.html",
			sortBy: "title",
			reverse: false
		},
	}))
	.use(permalinks({
		relative: false
	}))
	.use(dateFormatter({
		dates: [
			{
				key: "date",
				format: "YYYY-MM-DD"
			},
		]
	}))
	.use(discoverPartials({
		directory: "./layouts/partials",
		pattern: /\.hbs$/
	}))
	.use(layouts({
		engine: "handlebars",
		pattern: "**/*.html",
		directory: "./layouts",
	}))
	.use(debug()) 
	.build(function(err) {
		if (err) throw err;
	});