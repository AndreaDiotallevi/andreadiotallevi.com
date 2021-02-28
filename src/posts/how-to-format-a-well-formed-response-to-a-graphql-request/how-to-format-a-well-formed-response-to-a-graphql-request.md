---
title: "How to format a well-formed response to a GraphQL request"
description: "The convention for designing a well-formed GraphQL response in line with the GraphQL specification."
date: "2021-02-22"
tags: ["GraphQL", "Documentation", "APIs"]
featuredImage: zdenek-machacek-1400x840-mod2.jpg
---

<figcaption>
   <p>Photo by <a href="https://unsplash.com/photos/EtxsgEcHnZg" target="_blank">Zdeněk Macháček</a></p>
</figcaption>

I have been recently refactoring a big chunk of my company's codebase with the goal of replacing the [Django REST Framework](https://www.django-rest-framework.org/) with [GraphQL](https://graphql.org/) and [Graphene](https://graphene-python.org/).

Therefore, I found myself reading up quite a lot about GraphQL best practices and conventions for creating **readable**, **flexible** and **maintainable** APIs.

In this article I will combine my research on how to format a **well-formed** GraphQL response in line with the GraphQL specification, breaking down each part of the response object and purpose.

## What is GraphQL?

GraphQL is a **query language** and server-side runtime for application programming interfaces (APIs) that prioritises giving clients **exactly the data they request** and no more.

As an alternative to [REST](https://en.wikipedia.org/wiki/Representational_state_transfer), GraphQL developers construct requests that pull data sources in a **single API endpoint**, using **types** to ensure clients only ask for what's possible and provide clear and helpful errors.

## The GraphQL specification

The [GraphQL specification](http://spec.graphql.org/draft/) is an evolving open standard that was initially licensed under the [Open Web Foundation](http://www.openwebfoundation.org/legal/the-owf-1-0-agreements/owfa-1-0) (OWF) in 2017, and then transferred to the [GraphQL Foundation](https://foundation.graphql.org/) in 2019.

This document is presented to clarify intent, draw attention to potential edge-cases and pit-falls, and answer common questions that arise during implementation.

In this article I will *copy* extracts of the documentation from the [section number 7](http://spec.graphql.org/draft/#sec-Response) on the GraphQL **response** and combine them with personal examples.

## Response format

> "When a GraphQL service receives a request, it must return a **well-formed response**. The service's response describes the result of executing the requested operation *if successful*, and describes any errors encountered during the request."

A response to a GraphQL operation must be a **map** containing one or all of the following keys: `errors`, `data` and `extensions`.

```graphql
{
  "errors": [...],
  "data": {...},
  "extensions": {...}
}
```

### Data

> "If the operation included **execution**, the response map must contain an entry key `data`. If the operation failed before execution, due to a syntax error, missing information, or validation error, this entry must not be present."

> "If an error was encountered during the execution that prevented a valid response, the `data` entry in the response should be `null`."

### Errors

> "If the operation encountered any errors, the response map must contain an entry with key `errors`. If the operation completed without encountering any errors, this entry must not be present."

> "When `errors` is present in the response, it may be helpful for it to **appear first** when serialised to make it more clear when errors are present in a response during debugging."

### Extensions

> "The response map may also contain an entry with key `extensions`, which is reserved for implementors to extend the protocol."

This entry is more rare and used only in special circumstances, so I won't be covering it in detail in this article.

## Data entry format

> "The `data` entry in the response will be the result of the execution of the requested operation. If the operation was a `query`, this output will be an object of the **schema's query root type**".

For example, if querying a `todo` is successful in the following `query`:

```graphql
query GetTodo($id: Int = 1) {
  todo(id: $id) {
    id
    name
  }
}
```

The response will look like:

```graphql
{
  "data": {
    "todo": {
      "id": 1,
      "name": "Finish article"
    }
  }
}
```

If the operation was a `mutation`, this output will be an object of the **schema's mutation root type**.

For example, if creating a `todo` is successful in the following `mutation`:

```graphql
mutation CreateTodo($name: String = "Read book") {
  createTodo(name: $name) {
    todo {
      id
      name
    }
  }
}
```

The response will look like:

```graphql
{
  "data": {
    "createTodo": {
      "todo": {
        "id": 2,
        "name": "Read book"
      }
    }
  }
}
```

## Errors entry format

> "The `errors` entry in the response is a **non‐empty list** of errors, where each error is a **map**."

<!-- > "If no errors were encountered during the requested operation, the `errors` entry should not be present in the result."

> "If the `data` entry in the response is not present, the `errors` entry in the response must not be empty. It must contain at least one error. The errors it contains should indicate why no data was able to be returned."

> "If the `data` entry in the response is present (including if it is the value `null`), the `errors` entry in the response may contain any errors that occurred during execution. If errors occurred during execution, it should contain those errors." -->

> "Every error must contain an entry with the key `message` with a string description of the error intended for the developer **as a guide** to understand and correct the error."

> "If an error can be associated to a particular point in the requested GraphQL document, it should contain an entry with the key `locations` with a **list** of locations, where each location is a **map** with the keys `line` and `column`, both positive numbers starting from `1` which **describe the beginning of an associated syntax element**."

> "If an error can be associated to a particular field in the GraphQL result, it must contain an entry with the key `path` that details the path of the **response field which experienced the error**. This allows clients to identify whether a `null` result is intentional or caused by a runtime error."

> "This field should be a list of path segments **starting at the root of the response** and ending with the field associated with the error. Path segments that represent fields should be strings, and path segments that represent list indices should be 0‐indexed integers."

For example, if fetching one of the todos' names fails in the following query:

```graphql
query GetTodos {
  todos {
    id
    name
  }
}
```

The response might look like:

```graphql
{
  "errors": [
    {
      "message": "Name for todo with ID 1 could not be fetched.",
      "locations": [ { "line": 4, "column": 4 } ],
      "path": [ "todos", 0, "name" ]
    }
  ],
  "data": {
    "todos": [
      {
        "id": 1,
        "name": null
      },
      {
        "id": 2,
        "name": "Read book"
      }
    ]
  }
}
```

> "If the field which experienced an error was declared as `Non-Null`, **the null result will bubble up to the next nullable field**. In that case, the path for the error should include the **full path** to the result field where the error occurred, even if that field is not present in the response."

For example, if the `name` field from above had declared a `Non-Null` return type in the schema, the result would look different but the error reported would be the same:

```graphql
{
  "errors": [
    {
      "message": "Name for todo with ID 1 could not be fetched.",
      "locations": [ { "line": 4, "column": 4 } ],
      "path": [ "todos", 0, "name" ]
    }
  ],
  "data": {
    "todos": [
      null,
      {
        "id": 2,
        "name": "Read book"
      }
    ]
  }
}
```

## Conclusion

Having read the documentation in detail and created my own examples of successful and not successful operations have given me a better understanding of how to design GraphQL APIs for clients to use. 

Following this convention set by the GraphQL foundation allows you to create GraphQL services that are easier to develop and maintain, with higher readability and lower chance of collisions with future realises.

I hope this article was useful to you by giving you a more in-depth understanding of how to structure GraphQL operation interfaces.
