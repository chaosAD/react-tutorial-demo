## React Theory 🧐

Before we start building the translator app, it's important that you have a good grasp of React basics. I want you to specifically focus on:

- [**React Components**](#react-components)
- [**"State"**](#state)
- **User Interaction and Events** (Week 2)

If you can undertstand what these three things and how they are used in React, the rest of the tutorial will be much easier to digest. However, don't sweat every detail here. Treat this section as a *reference*; read through it over once with the exercises back to it when you have rhetorical questions.

<h3 id="react-components">React Components</h3>
#### Introduction

React uses **components** to organize complex websites into tiny, "modular" pieces of code. The <u>src/App.js</u> file that we previously edited was a React component.

```jsx
class HelloWorld extends React.Component {
  render() {
    return <p>Hello World</p>
  }
}
```

`HelloWorld` is also aReact component. The first thing that you might have noticed is that React components are JavaScript classes. JavaScript classes are no different from Java classes except that you don't need special modifiers and types such as `public`,  `private`, and `int` before method names and class definitions.

> React components are JavaScript classes

The second thing that you might notice is that the  `HelloWorld` component extends the `React.Component` class. *Every React component class **must** extend the `React.Component` class*. If you don't, you'll get some nasty errors when you try to save and run your code. Extending  `React.Component` tells React that the class that you're defining can be used as a component later on. There are exceptions to this rule, but only for very special use cases. It's best to just accept this as fact.

#### Components Deconstructed

Each React component lives in it's own JavaScript class *and* in it's own separate file. Let's take a look at another React component.

```jsx
/* `Date` React component stored in a "Date.js" file. */
/* "react" is the library that we are using. We can use the  "react" package because we ran `npm install` and "react" is listed in the dependencies property of our `package.json` file. */
import React from "react";

/* All "component" classes *must* extend `React.Component`. */
class Date extends React.Component {
  /* The `render()` method returns a "view". This is what the user sees. */
  render() {
    /* Our `render()` method returns a paragraph element with the text "It's 2019". */
    let year = new Date().getFullYear();
    return <p>It's {year}!</p>
  }
}

/* We need to export the React component so that it can be imported elsewhere! We use "default" because we're only exporting one component from our file. Remember, one component per file. */
export default Date;
```

Notice how our `Date` component extends the `React.Component` class. As we went over, every React component **must** do this.

Also notice how our class has a  `render()` that returns some HTML-like syntax that I called a "view". Why did I choose the method name `render`? In React, the `render()` method is expected to return the *view* of a component class. 

A *view* is a codified version of what the user is able to see. In this instance, our view is the `p` element that we're returning containing the string "It's 2019!". This means that when the `Date` React component is *rendered* (Alert! React jargon here!) the users sees some text with the string "It's 2019".

> A *view* is a codified version of what the user is able to see.

Ok, things are starting to make sense. However, you might be thinking, how did those curly braces get inside of the "HTML" that we return from our `render()` method? Or maybe... Why is there "HTML" inside of our JavaScript in the first place? To answer these questions you need to understand a special syntax called **JSX**.

#### What is JSX?

That "HTML" that the `render()` method returns, isn't real HTML—it's "JSX". JSX is a special HTML-like language that is used to instantiate components and elements in React. It's basically syntactical sugar for creating HTML elements in JavaScript, nothing more. React developers use JSX because it's more readable and idiomatic than instantiating classes to create components.

```jsx
// Returns a paragraph element with "It's 2019" inside.
<p>It's {new Date().getFullYear()}!</p>
```

The above is actually the exact same thing as...

```jsx
// Returns a paragraph element with "It's 2019" inside.
React.createElement("p", null, "It's "+ new Date().getFullYear() + "!");
```

In fact, when React actually run inside of your browser, the JSX expression up top is compiled to the JavaScript expression below. The `React.createElement` method returns a React element object. Since JSX is compiled into this form, **we can use JSX elements as objects**. 

> It's basically syntactical sugar for defining HTML elements in JavaScript, nothing more

One handy feature that JSX has is that it lets you insert or "interpolate" JavaScript expressions into elements.

```jsx
// We use curly braces to insert or "interpolate" expressions.
<p>It's {new Date().getFullYear()}!</p>
```

React evaluates whatever expression is between the curly braces and displays the result at that location. In this example,  the `new Date().getFullYear()` expression returns the current year as a number, which is then casted into a string by React.

*P.S. Don't get to clever with what you put inside of the curly braces. Only [expressions](https://stackoverflow.com/questions/18443801/in-programming-what-is-an-expression) are permitted!.*

```jsx
// ⛔️ You can't do this! "if" statements are not valid expressions so they can't return anything.
<p>You { if (age < 21) { return "can't"; } return "can"; } legally drink!</p>
```

To make this code work as intended, you can replace the "if" statements with a ternary operator.

```jsx
// ✅ Ternary operators are great for conditional expressions.
<p>You { age < 21 ? "can't" : "can" } legally drink!</p>
```

Now it's your turn! Add your own elements to the <u>src/App.js</u> component of your `hello-world` project and experiment with adding different JavaScript expressions in-between.

#### Nesting Components

```jsx
import NavigationBar from "./NavigationBar.js";
import MainContainer from "./MainContainer.js";

class App {
  render() {
    return (
      <div>
        <NavigationBar />
        <MainContainer />
      </div>
    );
  }
}

export default App;
```

In the above example, we called our React component `App`. The generated <u>src/App.js</u> component of our `hello-world` example, was as also called `App`. This is because *applications are also components*. Remember how we've used `export default` at the bottom of all of our JavaScript files. We did this so that we can import them into other React components. This helps us keep our React app more clean, and allows us to make more complex applications.

```jsx
import NavigationBar from "./NavigationBar.js";
import MainContainer from "./MainContainer.js";
/*
Our component hierarchy looks a lot like a 🌲.

        App <= The "root" node.
      /     \
Navigation MainContainer <= These components may also have nested components.
   Bar
*/
class App {
  render() {
    return (
      <div>
        <NavigationBar />
        <MainContainer />
      </div>
    );
  }
}
```

If we think of an application as a tree, the app component is the `root` node. It contains child components, which also contain child components. The entire tree is the application itself.

```jsx
// ⛔️ This will give us some nasty errors
class App {
  render() {
    return (
        <NavigationBar />
        <MainContainer />
    );
  }
}
```

```jsx
class App {
  render() {
    return (
      <div> {/* ✅ We absolutely need this div! */}
        <NavigationBar />
        <MainContainer />
      </div>
    );
  }
}
```

Notice how our JavaScript expression is wrapped nicely in a ` div` element. **This is required**. React doesn't allow you to render a sequence of elements without a container element. Why? Each React element is a tree node. A series of nodes always need to be contained within a larger node.

<h3 id="state">"State"</h3>

In the context of React, "state" is the *minimum* amount of data that a component needs to `render()` a view. Notice how I italicized *minimum*. It's really important that we keep our state as small as possible. You ideally want a very [DRY]([https://en.wikipedia.org/wiki/Don%27t_repeat_yourself](https://en.wikipedia.org/wiki/Don't_repeat_yourself)) state model.

Since most developers aren't used to imagining applications through the lens of "state", it's typically a hard concept to get a handle on at first. However, as you build more applications, you'll develop great metaphors  and a good mental model for reasoning about application state. Let's work through some examples!

> "state" is the *minimum* amount of data that a component needs to render a view

Consider a todo application. More specifically, consider its most basic data requirements. You'll likely need:

- A list of items
- Some indication of each item's completion

If you were to codify those requirements for our hypothetical todo application into a state object, you might come up with...

```javascript
state = {
  items: [
    { completed: false, name: "Actually do my homework." },
    { completed: true, name: "Sell concert tickets." }
  ]
};
```

Notice how *minimal* this state object is. It's very clear what information the state object conveys here—a list of items, each with two properties, `completed` and `name`. This state object works well because it communicates the smallest amount of information that a component might need to know to render a view.

##### What am I seeing?

In JavaScript, curly brackets  `{}`  and colons  `:`  are part of the [syntax](https://www.w3schools.com/js/js_objects.asp) for defining properties and values for objects. If you're familiar with Python, think of JavaScript objects as dictionaries. If you're familiar with Java, think of JavaScript objects as `HashMap`s. It's the same metaphor—you have properties and values for those properties. In the example above, our `state` object has an `items` property which contains an array of objects each containing `completed` and `name` properties.

#### Adding "state" to React components

In React, "state" is local to components—each component has it's *own* state object.

```jsx
/* `TodoApp.js` file */
import React from "react";

class TodoApp extends React.Component {
 	/* React components store their state in a state object field, just like Java class fields. */
  state = {
    items: [
      { completed: false, name: "Actually do my homework." },
      { completed: true, name: "Sell concert tickets." }
    ]
  };
	
  render() {
    /* Access the state object using `this.state`, just like Java class fields. */
    return <div>You have {this.state.items.length} todo items.</div>;
  }
}

export default TodoApp;
```

In the example above, I've added some state to a `TodoApp` component. You can access a component's state in the `render()` method using `this` syntax, just like Java class fields. Let's piece this together. We have...

- State for storing critical data
- A singular `render() `method for displaying a view to users

This is the most React's most essential symbiosis. We store component information in our state object and render that data in our `render()` method. This separation works well because as we modify our `state` object , we don't need to change our `render()` method—React just needs to call the `render()` method with fresh values. I'll go into more detail about how to modify the `state` in React in response to user action in the [Interaction and Events](#interaction-and-events) section.

#### Rendering state objects

Let's modify our `render()` method to render the todo items in our `state  `object.

```jsx
import React from "react";

class TodoApp extends React.Component {
  state = {
    items: [
      { completed: false, name: "Actually do my homework." },
      { completed: true, name: "Sell concert tickets." }
    ]
  };
	
  render() {
    return (
      <div>
        {
          this.state.items.map((item, index) => {
            return <p>
              {item.name} · {item.completed ? "Completed" : "Not Completed"}
            </p>;
          })
        }
      </div>
  	);
  }
}

export default TodoApp;
```

Here we're iteratirng through a list of items in our state object and returning a list of `p` elements containing their names and their completion status. We can't use a for-loop here because for-loops are statements, and JSX only accepts expressions. This means that we need a way to iterate through items using some structure that returns a value. Luckily, JavaScript has a means of doing this—the `map` array method. 

#### `map` all of the things

Every JavaScript array has a `map` method on it. The `map ` method takes a one function as an argument and calls that function on every value in the array that we call it on.

```javascript
let numbers = [1, 5, 6, 2];

/* 
  `map` calls the function on every array item...
  it calls each item with items value as the first
  argument and it's index as the second.
  
  ourFunction(value, index)
  
	calling `map` looks a lot like this internally...
	
   - ourFunction (1, 0) => 1
   - ourFunction (5, 1) => 25
   - ourFunction (6, 2) => 36
   - ourFunction (4, 3) => 4
   
   and returns a combined list of results as an array...
   - [1, 25, 36, 4]
 */
let squaredNumbers = numbers.map((number, numberIndex) => {
  return number * number;
});
```

The `map` method calls the function that we pass on every single array element and returns a new array filled with the new return values in the order that they were in the original array.

When we call the `map` method here, we're looping through every item in the `items` property of our `state` and returning a paragraph element. Returning the pargraph element works here because JSX elements are objects.

```jsx
let foods = ["pho", "corn", "broccoli"];

/* 
	ourFunction(value, index)
	
	calling `map` looks a lot like this internally...
	
   - ourFunction ("pho", 0) => <li>pho</li>
   - ourFunction ("corn", 1) => <li>corn</li>
   - ourFunction ("brocolli", 2) => <li>broccoli</li>
   
   and returns a combined list of results as an array...
   - [
   -   <li>pho</li>,
   -   <li>corn</li>,
   -   <li>broccoli</li>
   - ]
 */
let foodElements = foods.map((food, foodIndex) => {
  return <li>{food}</li>;
});
```

Now we know how to format our component `state`into a nicely formatted view for the user.

### Homework

Play around with this! Edit the `state` object to make it your own and try rendering it with all different [HTML elements](https://www.w3schools.com/html/html_elements.asp) that you've learned about!

That's it for this week!