---
title: "How to Incrementally Develop an Algorithm using Test Driven Development"
description: "The fundamental components of test-driven development, with an example of how to incrementally develop an algorithm using the red-green-refactor cycle."
date: "2020-02-20"
featuredImage: bahador-1400x840.jpg
---

<figcaption>
    <p>Photo by <a href='https://unsplash.com/@_bahador?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Bahador</a> on <a href='https://unsplash.com/s/photos/traffic-lights?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>
</figcaption>

In the world of software development, test-driven development (TDD) is a discipline where failing tests are written first, and _only then_ is the actual software code created, aiming to pass the newly-generated tests.

In this article, I will explore the fundamental components of test-driven development, with an example of how to _incrementally_ develop an algorithm using the TTD cycle.

The example I will use is the [prime factors](https://en.wikipedia.org/wiki/Table_of_prime_factors) kata, which challenges you to find all the prime factors of a given integer. For instance, the prime factors of `12` is the array `[2, 2, 3]`, because `12 = 2 * 2 * 3`.

This article and the algorithm development closely follow [this](https://vimeo.com/97516288) fascinating talk by Robert C. Martin, aka Uncle Bob, which inspired me to thoroughly master the underlying concepts behind test-driven development.

## What is Test-Driven Development?

The core of the test-driven development cycle, also called _red-green-refactor_, revolves around three simple steps, which are repeated throughout the software development life cycle:

1. **Red**: write a new test and confirm it fails.

2. **Green**: write the simplest code to make the new test pass.

3. **Refactor**: optimise the code, making sure all the tests still pass.

### 1. Red: write a new test and confirm it fails

In test-driven development, each new cycle begins with writing a test. This test should be as simple as possible, testing a very specific component of a larger feature.

This is the first differentiating feature of TTD versus writing unit tests _after_ the code is written, as it makes the developer focus on the requirements _before_ writing the code.

We are now ready to write our first test, which expects the _yet_ undefined `primeFactors()` function to return an empty array for the given integer `1`. We will use the JavaScript language and the [Jest](https://jestjs.io/) framework for testing, while the full codebase can be found [here](https://github.com/AndreaDiotallevi/prime-factors-kata).

```javascript
describe("primeFactors", () => {
  it("should return [] if given 1", () => {
    expect(primeFactors(1)).toEqual([]);
  });
});
```

Once the test is created, the next step is to confirm that the test fails. By confirming that the new test fails, and does so for the reasons we expect, we can be confident that the test is _useful_, and will be beneficial once we write the code necessary to pass the test. Let’s run the tests:

```shell
ReferenceError: primeFactors is not defined
```

### 2. Green: write the simplest code to make the new test pass

After confirming that the test fails, we now must write the code that will allow the test to pass. The idea here is that we _should not_ write any additional code that goes beyond the scope of the test, but only focusing on writing the _least amount of code_ to make the test pass.

The code written here will likely be rough and not finalised, but that’s ok as the entire test-driven development process encourages constant refactoring, meaning our current code is likely to change numerous times in the future.

We can now start writing our production code and let the error message _guide us_. Let’s define the `primeFactors()` function:

```javascript
function primeFactors() {}
```

Let’s run the tests again:

```shell
Expected: []
Received: undefined
```

In order to make the test pass with the _least amount of keystrokes_, we can just return an empty array:

```javascript
function primeFactors() {
  return [];
}
```

### 3. Refactor: optimise the code, making sure all the tests still pass

The process of writing the code necessary to allow the test to pass may have introduced some duplications or inconsistencies. That’s perfectly normal and expected and it depends on the fact that _it is hard to write good code when we try to make it work_.

The importance of the refactoring step is to _take the time_ to locate those problem areas and to focus on simplifying the codebase, confirming that we haven’t accidentally introduced any additional bugs, or changed something that now causes a previously passing test to fail.

## Incremental Algorithm Development

Now that we have analysed all three steps of test-driven development, we can continue with the algorithm design and learn how to incrementally develop the code test by test.

### From a constant to a variable

It’s time for the next test, which expects the prime factors of `2` to be an array with `2` in it:

```javascript
it("should return [2] if given 2", () => {
  expect(primeFactors(2)).toEqual([2]);
});
```

We expect the test to fail:

```shell
Expected: [2]
Received: []
```

We can make this pass by modifying our algorithm. We still want to start with that empty array constant, but we want to be able to modify it before returning it. Therefore, we need to _transform that constant into a variable_ named `factors` and introduce an `if` statement, where we check whether the given number is greater than `1`:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) factors.push(2);
  return factors;
}
```

We expect the tests to pass:

```shell
Tests: 2 passed, 2 total
```

Now, some of you might think we have just hacked an `if` statement in and that there was no design in there. However, watch what happens to that `if` statement as we continue, which is truly fascinating.

### As the tests get more specific, the code gets more generic

The next test will be to expect the prime factors of `3` to be an array with `3` in it:

```javascript
it("should return [3] if given 3", () => {
  expect(primeFactors(3)).toEqual([3]);
});
```

This test should fail. Notice how we are getting into a _hypothesis experiment loop_, as we write a test and expect it to fail:

```shell
✕ should return [3] if given 3
Expected: [3]
Received: [2]
```

Our hypothesis was correct. Now, we need to make this test pass with the _fewest keystrokes possible_. Inside the `if` statement we can change the `2` to `n` and the tests will pass:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) factors.push(n);
  return factors;
}
```

Note that we made again a change from a constant to a variable. A change from something _specific_ to something more _general_. In fact, if you think carefully now, all the changes we have made to the production code have been towards generality. We didn’t have to do that, as we could have put more `if` statements in. However, that would have violated this new rule: _as the tests get more specific, the code gets more generic_.

### Recognising emerging patterns

We expect the prime factors of 4 to be an array with two `2` in it (`4 = 2 * 2`):

```javascript
it("should return [2, 2] if given 4", () => {
  expect(primeFactors(4)).toEqual([2, 2]);
});
```

We expect the test to fail:

```shell
✕ should return [2, 2] if given 4
Expected: [2, 2]
Received: [4]
```

If we look at the code, we can get it to pass by putting another if statement that checks whether the number is divisible by 2 and then reduces the original number by the factor 2:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) {
    if (n % 2 === 0) {
      factors.push(2);
      n /= 2;
    }
    factors.push(n);
  }
  return factors;
}
```

Let’s run the tests again:

```shell
✓ should return [] if given 1
✕ should return [2] if given 2
✓ should return [3] if given 3
✓ should return [2, 2] if given 4
Expected: [2]
Received: [2, 1]
```

We can see the new test passed, but the test that failed is the test number 2. After the nested `if` statement we need to avoid adding 1 to the array, so we must add another `if` statement that checks whether the number is greater than `1`:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) {
    if (n % 2 === 0) {
      factors.push(2);
      n /= 2;
    }
    if (n > 1) factors.push(n);
  }
  return factors;
}
```

Now, we expect the tests to pass:

```shell
Tests: 4 passed, 4 total
```

However, that new `if` statement is an interesting one, as it is the same as the one above it. Since we have two `if` statements in the row, we can take the second one and move it completely out of the loop and the tests still pass:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) {
    if (n % 2 === 0) {
      factors.push(2);
      n /= 2;
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}
```

We have now two `if` statements in the row with the same predicate and you can see how the last `if` statement looks like the end condition of a `while` loop. However, let’s move on for now.

### Comprehensive test suite

The next three tests are the following:

```javascript
it("should return [5] if given 5", () => {
  expect(primeFactors(5)).toEqual([5]);
});
it("should return [2, 3] if given 6", () => {
  expect(primeFactors(6)).toEqual([2, 3]);
});
it("should return [7] if given 7", () => {
  expect(primeFactors(7)).toEqual([7]);
});
```

And they all pass:

```shell
Tests: 7 passed, 7 total
```

### A while is a general form of an if statement

We expect the prime factors of `8` to be an array with three 2 in it (`8 = 2 * 2 * 2`):

```javascript
it("should return [2, 2, 2] if given 8", () => {
  expect(primeFactors(8)).toEqual([2, 2, 2]);
});
```

We expect this test to fail, as there is nothing in our code that puts three elements in the array:

```shell
✕ should return [2, 2, 2] if given 8
Expected: [2, 2, 2]
Received: [2, 4]
```

How can we get this to pass with the fewest possible keystrokes? We can change the `if` statement to a `while` loop, that keeps checking whether the number is divisible by `2`:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) {
    while (n % 2 === 0) {
      factors.push(2);
      n /= 2;
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}
```

Let’s run the tests:

```shell
Tests: 8 passed, 8 total
```

What happened there? A `while` is a general form of an `if` statement. An `if` statement is a degenerate form of a `while` loop. Again, this is a move towards _generality_. We have made the code more general simply by letting the `if` statement continue until it is false, which is interesting. Let’s move on to `9`.

### For loops are concise while loops

We expect the prime factors of `9` to be an array with two 3 in it (`9 = 3 * 3`):

```javascript
it("should return [3, 3] if given 9", () => {
  expect(primeFactors(9)).toEqual([3, 3]);
});
```

We expect this test to fail as there is nothing in our code that can put two `3`s in it:

```shell
✕ should return [3, 3] if given 3
Expected: [3, 3]
Received: [9]
```

If we look at the code, we realise that there is a little engine that factors out all the `2`s. Therefore, we can repeat that loop and factor out all the `3`s:

```javascript
function primeFactors(n) {
  factors = [];
  if (n > 1) {
    while (n % 2 === 0) {
      factors.push(2);
      n /= 2;
    }
    while (n % 3 === 0) {
      factors.push(3);
      n /= 3;
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}
```

And we expect the tests to pass:

```shell
Tests: 9 passed, 9 total
```

However, this violates the rule of making the code more general. In fact, by duplicating the code, we have made the code more specific. As we know what we want to do now, we just need to do it in a more general way.

First thing we need to do is change that 2 into a variable called `divisor`. Then, we need to take that code and put it into another loop, ending when the number is reduced to 1. So we will execute this loop _while_ the number is greater than `1`, by changing the first `if` statement to a `while` loop. Finally, we need to take the initialiser outsides the loop and increment it at the end of the loop block:

```javascript
function primeFactors(n) {
  factors = [];
  divisor = 2;
  while (n > 1) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n /= divisor;
    }
    divisor++;
  }
  if (n > 1) factors.push(n);
  return factors;
}
```

However, there is still some refactoring we can do. The first `while` loop cannot exit until `n` is equal to `1`, therefore the following if statement is not necessary anymore and can be removed (it really was the terminating condition of a `while` loop):

```javascript
function primeFactors(n) {
  factors = [];
  divisor = 2;
  while (n > 1) {
    while (n % divisor === 0) {
      factors.push(divisor);
      n /= divisor;
    }
    divisor++;
  }
  return factors;
}
```

There is still more refactoring we can do. While loops are wordy and can be transformed into `for` loops:

```javascript
function primeFactors(n) {
  factors = [];
  divisor = 2;
  while (n > 1) {
    for (; n % divisor === 0; n /= divisor) {
      factors.push(divisor);
    }
    divisor++;
  }
  return factors;
}
```

And we can do the same for the outer `while` loop:

```javascript
function primeFactors(n) {
  factors = [];
  for (divisor = 2; n > 1; divisor++) {
    for (; n % divisor === 0; n /= divisor) {
      factors.push(divisor);
    }
  }
  return factors;
}
```

### Does it really work?

To check if our algorithm really works, let’s write a final test for a big number with a lot of prime factors:

```javascript
it("should return [2, 3, 3, 3, 5, 7, 11, 11, 13]
  if given (2 * 3 * 3 * 3 * 5 * 7 * 11 * 11 * 13)", () => {
    expect(primeFactors(2 * 3 * 3 * 3 * 5 * 7 * 11 * 11 * 13))
      .toEqual([2, 3, 3, 3, 5, 7, 11, 11, 13])
})
```

It passes!

```shell
Tests: 10 passed, 10 total
```

Although the algorithm works, there is still a small improvement we can make to speed the algorithm up in the case of large prime numbers. We don’t need to loop while `n` is greater than `1`, but we can loop while `n` is greater than the square root of the original `n`:

```javascript
function primeFactors(n) {
  factors = [];
  for (divisor = 2; n > n ** 0.5; divisor++) {
    for (; n % divisor === 0; n /= divisor) {
      factors.push(divisor);
    }
  }
  return factors;
}
```

## Conclusion

It is interesting to notice that this elegant algorithm did not come about because we thought it through beforehand, but emerged while we were developing it, with a little test case at the time.

This implies that it is possible to _derive algorithms incrementally_ to solve algorithmic problems, if we assume we follow the rule that everything we do to the production code is done to make it more general.

I hope this article was helpful to you and will make you want to further explore the magic behind test-driven development! :)