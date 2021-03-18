// EcmaScript 
// Dépendent du contexte d'exécution
// Tous les navigateurs n'ont pas la même version de JS
// deux modes d'accès aux propriétés d'un objet : 
// 	* objet   : obj.property 
// 	* tableau : obj["property"] 
// for...in 
// typeof 
// createElement, appendChild, setAttributes
// functions anonymes : function() { ... }

// ##########################
// # UI Toolkit
// ##########################

var Tag = {};

Tag.ROOT = document.body;

Tag.create = function (type, attributes = {}, children = []) 
{
  // Crée l'élément HTML 
  var tag = document.createElement(type);

  // Assigne des attributs
  for(var key in attributes) {
    tag.setAttribute(key, attributes[key]);
  }

  // Assigne des éléments HTML enfants
  for(var key in children) {

    var child;

    if(typeof children[key] === "object") {
      child = children[key];
    }
    else {
      child = document.createElement("span");
      child.innerText = children[key].toString();
    }

    tag.appendChild(child);

  }

  // Retourne l'élément HTML
  return tag;
}

Tag.append = function (tag, parentNode) {
  parentNode.appendChild(tag);
}

Tag.get = function(selector) {
  var list = [];

  // selector = id ?
  var idElm = document.getElementById(selector);
  if(idElm !== null)
    list.push(idElm);

  // selector = class ?
  var classElm = document.getElementsByClassName(selector);
  for(var i = 0; i < classElm.length; i++) {
    list.push(classElm[i]);
  }

  // selector = tag ?
  var tagElm = document.getElementsByTagName(selector);
  for(var i = 0; i < tagElm.length; i++) {
    list.push(tagElm[i]);
  }

  return list;
}

// ##########################
// # Components
// ##########################

function Article(title, author, published, content) {

  var article = Tag.create(
    "div", 
    { "class": "Article" },
    [
      Tag.create("h1", { "class": "Article__Title"}, [title]),
      Tag.create("div", { "class": "Article__Metadata"}, [
	Tag.create("span", {"class": "Article__Author"}, [author]),
	Tag.create("span", {"class": "Article__Published"}, [published])
      ]),
      Tag.create("p", { "class": "Article__Content"}, [content]),
    ]
  );

  return article;
}

function Counter(articles) {
  var counter = Tag.create("div", {"class": "Counter"}, [
    Tag.create("span", {}, ["Nombre d'articles : "]),
    Tag.create("span", {}, [articles.length])
  ])

  return counter;
}

// ##########################
// # Code de l'application
// ##########################

var articles = [
  { 
    title: "Mon titre", 
    author: "Julien OPPLIGER", 
    published: "17/03/2021", 
    category: "javascript",
    content: "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
  },
  { 
    title: "Autre chose", 
    author: "Julien OPPLIGER", 
    published: "18/03/2021", 
    category: "poisson",
    content: "lorem ipsum autre chose lorem ipsum lorem ipsum lorem ipsum"
  },
  { 
    title: "Encore autre chose", 
    author: "Julien OPPLIGER", 
    published: "18/03/2021", 
    category: "poisson",
    content: "encore autre chose lorem ipsum lorem ipsum lorem ipsum"
  },
]

Tag.append(Counter(articles), Tag.ROOT);

for(var a in articles) {
  Tag.append(
    Article(
      articles[a].title, 
      articles[a].author, 
      articles[a].published, 
      articles[a].content, 
    ), 
    Tag.ROOT
  );
}
