---
title: "How To Implement Client Side Redirects In Next.js"
description: "Steps to implement client side redirects in Next.js, using as example whether a user should go to the dashboard (if logged in) or to the homepage (if not logged in)."
date: "2022-10-31"
tags: ["React", "Next.js", "Redirects"]
featuredImage: marcel-strauss-1400x840.jpg
color: "rgb(108, 102, 93)"
---

<figcaption>
    <p>Photo by <a href="https://unsplash.com/photos/G30jlFPt-wg" target="_blank">Marcel Strauß</a></p>
</figcaption>

In vanilla React, you can perform redirects by rendering the [Redirect](https://v5.reactrouter.com/web/api/Redirect) component from the `react-router-dom` library.

```jsx
import { Redirect } from "react-router-dom"

...

<Route exact path="/">
    {loggedIn ? <Redirect to="/dashboard" /> : <PublicHomePage />}
</Route>
```

But how can you implement client side redirects with the in-built routing system of Next.js?

In this article I will go through the steps to implement client side redirects in Next.js, using as example whether a user should go to the dashboard (if logged in) or to the homepage (if not logged in).

## 1. Access the router object with `useRouter()`

In Next.js, any routing logic is managed by the `router` object, which can be accessed with the [useRouter()](https://nextjs.org/docs/api-reference/next/router) hook.

```jsx
import { useRouter } from 'next/router'

function App() {
  const router = useRouter()
  ...
}

export default App
```

The [router object](https://nextjs.org/docs/api-reference/next/router#router-object) exposes a series of properties and functions you can use to do anything routing-related, like changing the page (`router.push()`) or getting the current pathname (`router.pathname`).

## 2. Place the redirecting logic inside a `useEffect()`

While vanilla React redirects by rendering a component (`<Redirect />`), Next.js can change the page only by calling a function like `router.push()`.

The best place to call this function is inside a `useEffect()` that listens for changes to the `loggedIn` variable.

```jsx
import { useEffect } from "react"
import { useRouter } from "next/router"

function App({ loggedIn }) {
    const router = useRouter()

    useEffect(() => {
        if (loggedIn) {
            router.push("/dashboard")
            return
        }

        router.push("/)
    }, [loggedIn])

    return "Loading..."
}

export default App
```

## 3. Manage the history stack with `router.replace()`

Image you have a feature composed of multiple pages with this URL structure:

<!-- | URL | File | Purpose |
| ---------------- | ----------------------- | Redirecting route |
| /feature | pages/feature/index.ts | Page |
| /feature/start | pages/feature/start.ts | Page |
| /feature/middle | pages/feature/middle.ts | Page |
| /feature/end | pages/feature/end.ts | Page | -->

-   `/feature` (`pages/feature/index.tsx` for redirecting logic to other pages)
-   `/feature/start` (`pages/feature/start.tsx`)
-   `/feature/continue` (`pages/feature/continue.tsx`)
-   `/feature/success` (`pages/feature/end.tsx`)

What if you don’t want to save the redirecting page `/feature` in the history stack?

You can use [router.replace()](https://nextjs.org/docs/api-reference/next/router#routerreplace).

This will change the page without saving it in the history stack, avoiding to re-perform the redirecting logic if the user clicks the back arrow from their browser.

```jsx
import { useEffect } from "react"
import { useRouter } from "next/router"

function App({ loggedIn }) {
    const router = useRouter()

    useEffect(() => {
        if (loggedIn) {
            router.replace("/dashboard")
            return
        }

        router.replace("/)
    }, [loggedIn])

    return "Loading..."
}

export default App
```

**Next.js is a fully-fledged framework you can use to create web applications that are modern and performant.**

Spend time reading through the documentation to make the most of it.
