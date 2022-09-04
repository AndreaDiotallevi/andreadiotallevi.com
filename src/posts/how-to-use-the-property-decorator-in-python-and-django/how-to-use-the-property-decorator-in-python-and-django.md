---
title: "How To Use The @property Decorator In Python And Django"
description: "An overview of how the @property decorator works in Python and when to use it in Django."
date: "2021-01-31"
tags: ["Python", "Django", "Decorators", "Property Decorator"]
featuredImage: sarah-dorweiler-1400x840-b-w.jpg
color: "rgb(93, 120, 77)"
---

<figcaption>
    <p>Photo by <a href="https://unsplash.com/photos/x2Tmfd1-SgA" target="_blank">Sarah Dorweiler</a></p>
</figcaption>

In Python, the `@property` decorator allows you to call custom model methods as if they were normal model attributes.

For example, if you have the following `greeting` method,

```python
class Person:
    def __init__(self, first_name):
        self.first_name = first_name

    def greeting(self):
        return f'Hello {self.first_name}!'
```

```shell
>>> person = Person(first_name='Andrea')
>>> person.greeting()
Hello Andrea!
```

adding the `@property` decorator to that method would allow you to access its computed value like a model attribute without parenthesis:

```python
[...]

@property
def greeting(self):
    return f'Hello {self.first_name}!'
```

```shell
>>> person.greeting
Hello Andrea!
```

## What is a decorator?

In Python, the function is a first-order object. It means that it can be passed as an argument to another function. It is also possible to define a function inside another function. Such a function is called a nested function. Moreover, a function can return another function.

> A [decorator](https://docs.python.org/2/glossary.html#term-decorator) is a function that receives another function as argument. The behaviour of the argument function is extended by the decorator without actually modifying it.

In the example below, you can see what a typical decorator function looks like in Python:

```python
def decorator(f):
    def new_function():
        print("Extra Functionality")
        f()

    return new_function

@decorator
def initial_function():
    print("Initial Functionality")
```

```shell
>>> initial_function()
Extra Functionality
Initial Functionality
```

The `f` is a function whose behaviour we want to extend. So, we will have to write a custom function like `decorator()`, which takes the `f` as an argument.

The `new_function()` is an inner function where we can write additional code to extend the behaviour of the `f`, before or after calling it.

And finally, the `new_function()` should be returned. In this way, Python includes decorator functions. Also, we can define our own decorator function to extend the behaviour of a function without modifying it.

## How does the `@property` decorator work?

The `@property` decorator is a built-in decorator in Python for the [property() function](https://docs.python.org/2/library/functions.html#property). This function returns a special [descriptor object](https://docs.python.org/3/howto/descriptor.html) which allows direct access to **getter**, **setter**, and **deleter** methods.

A typical use is to define a managed attribute `x`:

```python
class C(object):
    def __init__(self):
        self._x = None

    def getx(self):
        return self._x

    def setx(self, value):
        self._x = value

    def delx(self):
        del self._x

    x = property(getx, setx, delx, "I'm the 'x' property.")
```

If `c` is an instance of `C`, `c.x` will invoke the **getter**, `c.x = value` will invoke the **setter** and del `c.x` the **deleter**. This makes it possible to create read-only properties easily using **property()** as a decorator.

The following example explains how to use the `@property` decorator to achieve the same behaviour as the first example:

```python
class C(object):
    def __init__(self):
        self._x = None

    @property
    def x(self):
        """I'm the 'x' property."""
        return self._x

    @x.setter
    def x(self, value):
        self._x = value

    @x.deleter
    def x(self):
        del self._x
```

In this last example, the property object has **getter**, **setter**, and **deleter** methods usable as decorators that create a copy of the property with the corresponding accessor function set to the decorated function.

You don't necessarily have to define all three methods for every property. You can define read-only properties by only including a getter method. You can choose which methods to include depending on the context that you are working with.

## Why use it?

### Computed attributes

In Django, a typical situation where the `@property` decorator can be used is for model methods that return computed attributes.

For example, if you have a `Book` model with a `price` attribute, it can be useful to create a custom method to calculate the `price_locale` string:

```python
from django.db import models
import locale

class Book(models.Model):
    price = models.IntegerField()

    @property
    def price_locale(self):
        locale.setlocale(locale.LC_ALL, '')
        return locale.currency(self.price)
```

```shell
>>> book = Book(price=30)
>>> book.save()
>>> book.price_locale
'£30.00'
```

### Backward compatibility

Another scenario when the `@property` decorator comes to our rescue is when we need to convert a model attribute from public to private (i.e. from `price` to `_price`). By adding a **getter** method for the `_price` attribute, we can keep all the code where we access that attribute as it is, making use of the read-only accessor.

Existing code:

```python
class Book(models.Model):
    price = models.IntegerField()
```

Code after refactoring:

```python
class Book(models.Model):
    _price = models.IntegerField()

    @property
    def price(self):
        return self._price
```

## Django limitations

Although using the `@property` decorator can help you access model methods as attributes, you can't filter QuerySets by them, use them for ordering, or any other operation that makes use of the database engine.

So, before deciding whether creating a new model attribute or just adding a custom method with the `@property` decorator, think about the type of operations you would like to execute using that field.

## Further reading

A big thank you to the following resources, which greatly helped me grasp the concepts described in this article:

-   [Property function](https://docs.python.org/2/library/functions.html#property) (Python Docs)
-   [Descriptors](https://docs.python.org/2/howto/descriptor.html) (Python Docs)
-   [How does the property decorator work in Python](https://stackoverflow.com/questions/17330160/how-does-the-property-decorator-work-in-python) (Stack Overflow)
-   [Using the @property decorator on custom model methods](http://dylanbfox.blogspot.com/2015/01/django-tip-using-property-decorator-on.html) (Dylan B. Fox)
-   [The @property Decorator in Python](https://www.freecodecamp.org/news/python-property-decorator/) (Estefania Cassingena Navone)
