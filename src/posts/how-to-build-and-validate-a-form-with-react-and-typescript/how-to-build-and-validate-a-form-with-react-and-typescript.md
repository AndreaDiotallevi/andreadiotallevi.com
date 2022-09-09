---
title: "How To Build And Validate A Form With React And TypeScript"
description: "The state management fundamentals for building and validating a form with React and TypeScript to create the best user experience."
date: "2022-09-09"
tags: ["React", "TypeScript", "Forms", "Error Handling"]
featuredImage: linus-nylund2-1400x840.jpg
color: "rgb(48, 121, 107)"
---

<figcaption>
    <p>Photo by <a href="https://unsplash.com/photos/UCIZh0-OYPw" target="_blank">Linus Nylund</a></p>
</figcaption>

There are many libraries out there you can use to build forms in React.

However, before you choose to use one of them, it’s important to understand the role of each piece of state for creating the best user experience.

In this article I will explore the state management fundamentals for building and validating a form with React and TypeScript.

## Use controlled components to handle user inputs

> Leverage React state management to create a single source of truth for each input.

[Uncontrolled components](https://reactjs.org/docs/uncontrolled-components.html) use two separate steps for displaying (with native HTML elements) and retrieving (with [DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction) queries) the input data. [Controlled components](https://reactjs.org/docs/forms.html#controlled-components), on the other hand, keep track of the value of the input field at every keystroke. This continuous knowledge allows you to display the most suitable errors, styling and feedback _at any time_, in line with your UI / UX design strategy.

Let React handle the form data for you so you can focus on creating the best user experience.

## Store user inputs in an easily accessible data structure

> Think about how you want to access the data before choosing the best data structure.

Since you care about which input and what value the user is working on, the best data structure for storing the user inputs is an [object](https://www.typescriptlang.org/docs/handbook/2/objects.html). The keys are the input names and the values are the input values. This allows you to quickly access any input value by accessing its specific key name (`inputs.email`).

When you want to quickly access the same data type and _don’t_ care about ordering, choose an object.

```tsx
// TypeScript object type definition
type Inputs = { email: string }

// Initialisation of the inputs object using TypeScript
const [inputs, setInputs] = useState<Inputs>({ email: "" })
```

```tsx
// First draft of the email input component
<label>
    Email
    <input
        onChange={event => {
            setInputs({ ...inputs, email: event.target.value })
        }}
        value={inputs.email}
    />
</label>
```

## Use a similar data structure to store user errors

> As the `inputs` object is in charge of storing user inputs, the `errors` object is in charge of storing user errors, if any.

Because of the direct correlation between these two entities, the `errors` object is modelled with the same keys as the `inputs` object. This is achieved with TypeScript that makes sure you can create errors only with [keyof Inputs](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html). So, same as the `inputs` object, any error can be easily accessed through its key name (`errors.email`).

Using different pieces of state for different concerns makes the code more readable.

```tsx
// Partial means the object doesn't need to contain all keys
// Record is used to create more complex object types
type Errors = Partial<Record<keyof Inputs, string>>
const [errors, setErrors] = useState<Errors>({})
```

## Keep track of the inputs completed by the user to display errors at the right time

> The `touched` object is in charge of remembering whether the user has completed filling a certain input or not.

As opposed to the `inputs` and `errors` objects, having string values, the `touched` object has boolean values, to represent whether a certain input has been completed by the user or not. This object is usually updated when the user _leaves_ the field, using the [onBlur](https://www.w3schools.com/jsref/event_onblur.asp) event. This piece of state allows you to display the error only when `touched.email` is `true`.

Display any potential errors to the user only when they have completed filling it and clicked outside the field.

```tsx
type Touched = Partial<Record<keyof Inputs, boolean>>
const [touched, setTouched] = useState<Touched>({})
```

```tsx
<label>
    Email
    <input
        ...
        onBlur={() => setTouched({ ...touched, email: true })}
    />
    {errors.email && touched.email ? <p>{errors.email}</p> : null}
</label>
```

## Use pure functions to validate inputs

> A function should either change something (have side effects) and return nothing, or change nothing (no side effects) and return something.

To separate concerns, the validate function should only care about validating the form. It takes the new inputs and returns the new errors, without changing any state. The function is called every time there is a change ([onChange](https://www.w3schools.com/jsref/event_onchange.asp) event), to make sure the `errors` object is always in sync with the `inputs` object.

Event handlers like the one handling `onChange` are, on the other hand, functions that change state and return nothing.

```jsx
// A function that returns something and changes nothing
const validate = (newInputs: Inputs): Errors => {
    const newErrors: Errors = {}

    if (!newInputs.email.includes("@")) {
        newErrors.email = "Please enter a valid email."
    }

    return newErrors
}
```

```tsx
// Initialise errors on first render
const [errors, setErrors] = useState<Errors>(validate(inputs))
```

```tsx
// A function that returns nothing and changes something
onChange={(event) => {
    setInputs({ ...inputs, email: event.target.value })
    setErrors(validate({ ...inputs, email: event.target.value }))
}}
```

## Submit the form to the server when there are no errors

> Minimise calls to the server when the user makes syntax errors.

[It's the client that is in charge of handling syntax errors](https://www.andreadiotallevi.com/blog/the-3-types-of-errors-you-need-to-handle-to-help-your-users-submit-a-web-form). These errors should be displayed close to the input field, to allow the user to quickly amend them. This creates a fast user experience, since the user doesn’t need to wait for a network call to realise they have just made a typo.

Tell the user they are on the right track as often as possible to increase the chances they will complete the form.

```tsx
// Simplified final version of a React + TypeScript form
import { useState } from "react"

function App() {
    const validate = (newInputs: Inputs): Errors => {
        const newErrors: Errors = {}

        if (!newInputs.email.includes("@")) {
            newErrors.email = "Please enter a valid email."
        }

        return newErrors
    }

    type Inputs = { email: string }
    const [inputs, setInputs] = useState<Inputs>({ email: "" })

    type Errors = Partial<Record<keyof Inputs, string>>
    const [errors, setErrors] = useState<Errors>(validate(inputs))

    type Touched = Partial<Record<keyof Inputs, boolean>>
    const [touched, setTouched] = useState<Touched>({})

    return (
        <form noValidate>
            <label>
                Email
                <input
                    type="email"
                    name="email"
                    onChange={event => {
                        setInputs({ ...inputs, email: event.target.value })
                        setErrors(
                            validate({ ...inputs, email: event.target.value })
                        )
                    }}
                    onBlur={() => setTouched({ ...touched, email: true })}
                    value={inputs.email}
                />
                {errors.email && touched.email ? <p>{errors.email}</p> : null}
            </label>
            <button
                onClick={event => {
                    event.preventDefault()

                    if (Object.keys(errors).length === 0) {
                        // Server call
                    }
                }}
            >
                Submit
            </button>
        </form>
    )
}

export default App
```

**Although it’s easier to use a form library at the start, creating your own form component from scratch has also its own benefits in terms of control, flexibility and maintainability.**

So, which approach are you going to take?
