## Getting Started

Getting up and running with Ember.js is straightforward. There are no
build tools or other dependencies to install.

Download a copy of the latest release of Ember.js using the download
links above. The production version comes minified and with debugging
code stripped out. If you're getting started, we recommend the debug
build, which is not minified and leaves in framework assertions that may
help you debug your application as you're developing it.

Ember's only dependencies are
[Handlebars.js](http://www.handlebarsjs.com), which is included in the
standard builds, and [jQuery](http://www.jquery.com), which is not
included. You will need jQuery 1.6 or later. If you are not already
including jQuery in your HTML page, make sure to load it before the
Ember.js JavaScript file loads.

To include Ember on your page, add a script tag with the path to the
location where you have saved the library's JavaScript file:

```html
<!-- Make sure to include jQuery first! -->
<script type="text/html" src="javascripts/jquery-1.7.1.js"></script>
<script type="text/html" src="javascripts/ember.js"></script>
```

If you are starting a new project, you may want to use the Ember.js
Starter Kit to bootstrap your project. The Starter Kit is based on
[HTML5 Boilerplate](http://html5boilerplate.com/), modified to include
Ember.js out of the box.

If you are using the Starter Kit, you can immediately start writing your
Ember application in the `js/app.js` file, and place your Handlebars
templates inside `index.html`.

### Managing Multiples Files with Rake::Pipeline

For simple applications, keeping all of your code in a single file, or
manually managing multiple files by adding script tags, may be good enough.
However, for larger applications, file management becomes an important
issue.

The recommended solution for Ember.js apps is
[Rake::Pipeline](https://github.com/livingsocial/rake-pipeline).
Rake::Pipeline is a system for packaging assets for deployment to the
web. It uses Rake under the hood for dependency management and updating
output files based on input changes.

The community has built several filters you can use with Rake::Pipeline
to manage assets destined for the web. These [web filters](https://github.com/wycats/rake-pipeline-web-filters)
are available as a gem and make it very easy to get started.

#### 1. Install Bundler

```
$ [sudo] gem install bundler
```

#### 2. Create Project and Gemfile

Create a directory to hold your project:

```text
$ mkdir my_app
$ cd my_app
```

Inside your project directory, create a new Gemfile:

```text
$ bundle init
Writing new Gemfile to /Users/tomdale/Code/test/Gemfile
```

Open the Gemfile in your favorite editor and make it look like this:

```ruby
source "http://rubygems.org"

gem "rake-pipeline"
gem "rake-pipeline-web-filters"
```

#### 3. Install Rake::Pipeline

```
$ bundle install --binstubs
Fetching source index for http://rubygems.org/
Using rake (0.9.2.2)
Installing rake-pipeline (0.5.0)
Installing rake-pipeline-web-filters (0.5.0)
Using bundler (1.0.21)
Your bundle is complete! Use `bundle show [gemname]` to see where a bundled gem is installed.
```

This installs the Rake::Pipeline gem. The `--binstubs` flag tells
Bundler to alias the command line tool to your project's `bin` directory
for convenience.

#### 4. Create an Assetfile

Your project's Assetfile is what tells Rake::Pipeline how to package up
your app's assets. Each file in your project is passed into a filter,
where it can be modified, and then passed into the next filter, where it
can be modified further.

<img class="right" alt="Diagram of Rake::Pipeline" src="/docs/images/getting_started/pipeline.png">

For example, you will want to keep your Handlebars templates in separate
`.handlebars` files that get compiled down to JavaScript. You will also
want to bundle up all of the JavaScript files into a single,
concatenated JavaScript file to minimize the number of HTTP requests
need to load your app. But we also want to make sure that we don't
accidentally include CSS files in the concatenated JavaScript.

So how do we do it? Rake::Pipeline allows you to send a group of files
to an ordered set of _filters_. You can specify which filters apply to
which files based on their file name. After a filter has been
applied, the result is made available to the next filters.

As illustrated to the right, we might have a filter that first converts
`.handlebars` files to JavaScript `.js` files. We would run the
Handlebars filter first so that we had all of our JavaScript ready to
go.

Next, a concatenation filter takes all of the JavaScript files and
concatenates them into a single `application.js` file. Your `index.html`
can load this file.

Assetfiles use a Ruby DSL to configure your pipeline, so you don't need
to know much Ruby to use it. In fact, the [Todos sample application](https://github.com/emberjs/todos)
includes a [heavily-commented Assetfile](https://github.com/emberjs/todos/blob/master/Assetfile)
that should do everything most apps will need. This is a good starting
point for building your own app.

#### 5. Add minispade

[minispade](https://github.com/wycats/minispade) is a light-weight
JavaScript script loader. The Rake::Pipeline Web Filters gem comes with
a built-in filter that makes it easy to use your files with minispade.

The mechanism by which minispade works is very simple. The minispade
Rake::Pipeline filter wraps all of your code in a closure that is
registered with the loader. For example, if you have a script like this:

```javascript
// app/lib/main.js
console.log("Hello, world!");
```

The minispade filter will turn it into this:

```javascript
minispade.register('main', function() { console.log("Hello,
world!"); });
```

You control the order in which your files load by using `require()`.
For example, if I wanted to load a file at `app/lib/controllers.js` from
`app/lib/main.js`, it might look like this:

```javascript
window.App = Ember.Application.create();

require('controllers.js');

doOtherStuff();
```

