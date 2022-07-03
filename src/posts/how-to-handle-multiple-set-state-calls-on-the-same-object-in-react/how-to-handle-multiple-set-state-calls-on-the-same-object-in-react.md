---
title: "How to handle multiple setState calls on the same object in React"
description: "A common pitfall and solution when calling React setState multiple times on the same object."
date: "2021-03-30"
tags: ["React", "React State Management", "React Hooks", "React Documentation"]
featuredImage: chris-lawton-1400x840.jpg
# color: "rgb(196, 34, 73)"
color: "rgb(180, 160, 149)"
---

<figcaption>
    <p>Photo by <a href="https://unsplash.com/photos/5IHz5WhosQE" target="_blank">Chris Lawton</a></p>
</figcaption>

In this article I will describe a common pitfall and solution I have been experiencing when calling React `setState` multiple times on the same object. In line with the latest React practices, I will create examples with the `useState` hook.

## The `useState` hook

In React, the [useState](https://reactjs.org/docs/hooks-state.html) hook allows functional components to handle state without the need for class-based components. This feature lets you destructure an array with the state itself (`count`) and a function for updating that state (`setCount`):

```jsx
import React, { useState } from "react"

const Example = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    )
}
```

## State updates may be asynchronous

> React may batch multiple `setState` calls into a single update for performance. Because `props` and `state` may be updated asynchronously, you should not rely on their values for calculating the next state.

The above extract from the [React documentation](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous) implies the update statement is taken outside of the main program flow, allowing the code after the asynchronous call to be executed immediately _without waiting_.

So, if we try to access the variable `count` right after we use `setCount` to update it, we will still see the old value:

```jsx
const [count, setCount] = useState(0)

const handleClick = () => {
    setCount(1)
    console.log(count)
}

>> 0
```

For the same reason, if we try to consecutively update the state of two different keys of the same object by referencing the _seemingly previously updated_ state in the following way, we will end up with an incomplete update:

```jsx
const [inputs, setInputs] = useState({
    firstName: "",
    lastName: ""
})

const handleClick = () => {
    setInputs({ ...inputs, firstName: "Andrea" })
    setInputs({ ...inputs, lastName: "Diotallevi" })
}

>> console.log(inputs)
>> { firstName: "", lastName: "Diotallevi" }
```

This incomplete update is caused by the fact that the first `setInputs`, being asynchronous, doesn't update the value of `inputs` before we execute the second `setInputs()`, which therefore still uses the _old_ `inputs`.

## Solution

> If the new state is computed using the previous state, you can pass a function to `setState`. The function will receive the **previous value**, and return an updated value.

The above extract from the [React documentation](https://reactjs.org/docs/hooks-reference.html#functional-updates) describes we should not rely on the seemingly new updated state, but rather pass a function which will hold the previous state present before the batch update:

```jsx
const [inputs, setInputs] = useState({
    firstName: "",
    lastName: ""
})

const handleClick = () => {
    setInputs(previousInputs => ({ ...previousInputs, firstName: "Andrea" }))
    setInputs(previousInputs => ({ ...previousInputs, lastName: "Diotallevi" }))
}

>> console.log(inputs)
>> { firstName: "Andrea", lastName: "Diotallevi" }
```

## Conclusion

Having stumbled across this problem made me read carefully the documentation, which gave me a better understanding of how React `setState` works under the hood.

So, if we summarise the takeaways from this article we can list the following:

-   React `setState` is asynchronous, which means the update function is taken outside the main program flow.
-   If you access a variable straight after it has been updated you will likely still see the old value and not the updated value.
-   If a new state is computed using the previous state, the best way is to pass a function to `setState` referencing the previous value, rather than destructuring the previously updated state itself.
