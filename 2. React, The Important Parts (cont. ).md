# User Interaction and Events ☝🏽

Most React components *update* their `state` in reaction to different actions (such as mouse clicks and drag events) that users have with the webpage. To update the state of a React component, we use the `setState` method. This class method comes for free when we extend the `React.Component` class. Don't worry the specifics of this method, just look over the following code:

```jsx
// "Counter.js" file.
import React from "react";

class Counter extends React.Component {
  state = {
    count: 0
  };

	render() {
    return (
      <div>
        <button onClick={() => {
            this.setState({
              count: this.state.count + 1
            });
          }}>Increment</button>
        <p>Counter: {this.state.count}</p>
      </div>
    );
  }
}

export default Counter;
```

What exactly is happening here? Imagine a counter application with a `state` object that takes the following form.

```javascript
state = {
  count: 0
}
```

Every time that a user clicks on the "Increment" `button`, JavaScript triggers the *callback* contained within the JavaScript expression adjacent to the `onClick` attribute (remember these from the HTML?) on the `button` element.

The body of the *callback* function contains the `setState` method, the one that we use to *update* our `state` object. Every time that this *callback* is triggered, the `setState` method is called, which updates the `count` property on the state object to one more than its current value ( ` this.setState({ count: this.state.count + 1 })`).

Whats most important about the  `setState` method is that it updates the `state` object **everywhere** that it is used. *Every* place within the render method that we use the  `this.state` is object is refreshed with the new value. In this instance, after we click on the "Increment" `button`, the JavaScript expression within our paragraph element returns a new, incremented value. [Check it out](https://codesandbox.io/embed/react-counter-rml2u).

It's very important that you get familiar with this pattern of updating `state`. Let's go through how it works once more.

1. When the button is clicked, React calls the `onClick` *callback* function that we passed to it.
2. Inside of the  `onClick` *callback* function, we have a statement that calls `setState`, the method that I mentioned is used to update the `state` of a React component.
3. The responsibility of the `setState` method is to update the `state` with properties that have been updated. `setState` see that the value of the `count` property has updated so it sets the `count` property from value `this.state.count` to `this.state.count + 1`. Note that if the `this.state.count` value did not change, React would be smart enough to not update the paragraph element, it's intelligent enough to know when the `state` object has updated values. 
4. React calls the `render()` method with a fresh `count` value, so we see an updated value next to "Counter: ". *This is the beauty of React*. Every time that we update a property value in our  `state` object using the `setState` method, every place that we use the  `state` is automatically updated. In conclusion, React makes separating the our *data* (`state` object) and our *view* (`render()` method) shockingly simple.

#### Don't Get Too Clever!

A common mistake is that people make is changing the value of the `state` object directly. If you want React to automatically update the every place that the `state` object is used in the `render()` method, you must use the  `this.setState` method. Changing the `state` object directly using  `this.state` is prohibited.

```jsx
// "Counter.js" file.
import React from "react";

class Counter extends React.Component {
  state = {
    count: 0
  };

	render() {
    return (
      <div>
        <button onClick={() => {
            // ✅ This is valid. 
            this.setState({
              count: this.state.count + 1
            });
            
            // ⛔️ This does nothing.
            this.state.count = this.state.count + 1;
          }}>Increment</button>
        <p>Counter: {this.state.count}</p>
      </div>
    );
  }
}

export default Counter;
```

### Homework

Create cool effects with different events. Try adding style and changing text in response to mouse events, scroll events, and other events.

#### Helpful Resources

- [Inline Styles](https://reactjs.org/docs/dom-elements.html#style)
- [Styling with CSS](https://reactjs.org/docs/faq-styling.html)
- [React Events](https://reactjs.org/docs/handling-events.html)
