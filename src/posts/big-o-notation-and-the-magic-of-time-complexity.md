---
title: "Big O Notation and the Magic of Time Complexity"
description: "In this article I explore the fundamental components of algorithm complexity analysis, describe how to derive an algorithm big-O and list all the common big-O classes of runtime complexity."
date: "2020-04-15"
featuredImage: circular-building.jpg
thumbnailImage: circular-building-thumbnail.jpg
---

<figcaption>
   <p>Photo by <a href='https://unsplash.com/@darwiiiin?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Darwin Vegher</a> on <a href='https://unsplash.com/s/photos/vortex?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>Unsplash</a></p>
</figcaption>

Have you ever wondered how your algorithm would perform if you _drastically increase_ the input data set? The concept programmers use to **compare algorithms’ behaviours** is the [big-O mathematical notation](https://en.wikipedia.org/wiki/Big_O_notation).

Big-O notation is used in Computer Science to describe the **worst-case** performance or complexity of an algorithm, ignoring low-level details such as the implementation programming language, the hardware the algorithm runs on, or the instruction set of the given CPU.

In this article I will explore the fundamental components of algorithm complexity analysis, describe how to derive an algorithm big-O and list all the common **big-O classes of runtime complexity**.

## What is Big-O Notation?

Big-O notation is the language we use for talking about how long an algorithm takes to run. It’s how we compare the efficiency of different approaches to a problem.

More technically, we use it to be able to say that the behaviour of our algorithm will never exceed a certain bound or upper limit, as the input gets arbitrarily large.

This allows us to compare different algorithms, by putting them in the same class of complexity, which **regroups** all the algorithms which have the same big-O.

On the next paragraphs, we will go through each step on how to calculate an algorithm big-O:

- Counting Instructions
- Worst-Case Scenario
- Asymptotic Behaviour

### Counting Instructions

When trying to characterise an algorithm’s efficiency in terms of execution time, independent of any particular program or computer, it is important to quantify the **number of operations** or steps that the algorithm will require.

If each of these steps is considered to be a basic unit of computation, then the execution time for an algorithm can be expressed as the number of steps required to solve the problem.

The example we will use is a JavaScript function to find the maximum element in a non-empty array:

```javascript
function findMax(arr) {
  let max = arr[0];
  let n = arr.length;

  for (let i = 0; i < n; ++i) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}
```

Now, the first thing we will do is count how many **fundamental instructions** this piece of code executes. We will assume our processor can execute operations like assigning, looking up or comparing values as one instruction each.

Therefore, if we ignore the `for` body for the moment, the number of instructions this algorithm needs are `6 + 2n`:

- `let max = arr[0]`: `arr[0]` lookup and max assignment
- `let n = arr.length`: `arr.length` lookup and n assignment
- before the `for` loop: `i` initialisation and `i < n` comparison check
- `for` loop: `++i` increment and `i < n` comparison check, `n` times

### Worst-Case Scenario

Now, looking at the `for` body, we have an array lookup operation and a comparison that happen always. However, we are not able to tell in advance whether the `if` body will run or not, as this depends on the input array.

When analysing algorithms, we often consider the worst-case scenario — the case when the algorithm needs **the most instructions** to complete. In our case that would be with an input array of `[1, 2, 3, 4, 5]`.

So, in the worst case, we have 4 more instructions to run within the `for` body, which means we can define a function `f`, given a problem of size `n`, of `f(n) = 6 + 2n + 4n = 6n + 6`.

### Asymptotic Behaviour

In our function, `6n + 6`, we have two terms: `6n` and `6`. In complexity analysis we only care about what happens to the instruction-counting function as the program input `n` grows large.

From the terms that we are considering, we will drop all the terms that grow slowly and only keep the ones that grow fast as n becomes larger. As `n` increases, `6` remains `6`, so it tends to matter less for larger problems.

Therefore, we can drop 6 and keep the function as `f(n) = 6n`. This makes sense if you consider `6` an “initialisation constant”, as different programming languages may require a different time to set up.

The second thing we will ignore is the constant multiplier in front of `n`, which simplifies our function even more to `f(n) = n`. Again, this makes some sense if we think about how different programming languages compile, for instance when looking up an array.

This filter of **dropping all factors** and of **keeping the largest growing term** as described above is what we call [asymptotic](https://en.wikipedia.org/wiki/Asymptotic_analysis) behaviour. So, the asymptotic behaviour of `f(n) = 6n + 6` is described by the function `f(n) = n`. Mathematically speaking, we are interested in the **limit** of function `f` as `n` tends to _infinity_.

Now that we know how to derive the **Order of magnitude** as O( f ( n ) ), we can describe how we can use it to compare algorithms’ behaviours.

## Big-O Classes of Runtime Complexity

<figure>
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Comparison_computational_complexity.svg" alt="Big-O Classes of Runtime Complexity"/>
  <figcaption>
  <p>Graphs of functions showing the number of operations N versus input size n for each function</p>
  </figcaption>
</figure>

### O( 1 ) — Constant Time

O( 1 ) describes an algorithm that will always execute in the same time (or space) regardless of the size of the input data set. So if it takes 1 operation to compute 10 elements, it will still take 1 to compute 100 elements, 1 to compute 1000 elements, and so on.

For example, printing the first element of an array:

```javascript
function printFirstElement(arr) {
  console.log(arr[0]);
}
```

### O( log n ) — Logarithmic Time

O( log n ) denotes an algorithm where time goes up linearly while the input data set goes up exponentially. So if it takes 1 operation to compute 10 elements, it will take 2 operations to compute 100 elements, 3 operations to compute 1000 elements, and so on.

A common example is [binary search](https://en.wikipedia.org/wiki/Binary_search_algorithm), a technique to search sorted data sets. In this case, we will use it to check whether a sorted array includes a given number:

```javascript
function isInArray(arr, num) {
  let startIndex = 0;
  let endIndex = arr.length - 1;

  while (startIndex <= endIndex) {
    let midIndex = Math.floor((startIndex + endIndex) / 2);
    let midNum = arr[midIndex];

    if (midNum === num) {
      return true;
    } else if (midNum > num) {
      endIndex = midIndex - 1;
    } else {
      startIndex = midIndex + 1;
    }
  }

  return false;
}
```

It works by selecting the _middle element_ of the data set, essentially the median, and comparing it against a target value. If the values match it will return `true`. If the target value is higher than the value of the probe element it will take the upper half of the data set and perform the same operation against it. Likewise, if the target value is lower than the value of the probe element it will perform the operation against the lower half. It will continue to _halve the data_ set with each iteration until the value has been found or until it can no longer split the data set.

The iterative halving of data sets described in the binary search example produces a growth curve that peaks at the beginning and slowly flattens out as the size of the data sets increase. Doubling the size of the input data set has little effect on its growth as after a single iteration of the algorithm the data set will be halved and therefore on a par with an input data set half the size. This makes algorithms like binary search extremely efficient when dealing with large data sets.

To further explain why the big-O is actually `log(n)` we need to remember what a logarithm is. In mathematics, the [logarithm](https://en.wikipedia.org/wiki/Logarithm) is the inverse function to exponentiation. That means _“the logarithm of a given number x is the exponent to which another fixed number, the base b, must be raised, to produce that number x”_. So, since `2³ = 8`, we can derive that `log(base=2)(8) = 3`.

In computer science _base 2 logarithms_ are much more common than any other types of logarithms. This is because we often only have two different entities, 0 and 1. We also tend to cut down one big problem into halves, of which there are always two, like in the example of binary search.

So, if we take a worst-case example of checking if the array `[1, 4, 6, 8, 9, 23, 35, 56]` includes the number 1, we would have the following operations:

- Initial array, `n = 8`

```javascript
[1, 4, 6, 8, 9, 23, 35, 56];
```

- With 9 as pivot, we keep checking the left half, `n = 8 * 1/2 = 4`

```javascript
[1, 4, 6, 8];
```

- With 6 as pivot, we keep checking the left half, `n = 4 * 1/2 = 2`

```javascript
[1, 4];
```

- With 4 as pivot, we keep checking the left half, `n = 2 * 1/2 = 1`

```javascript
[1];
```

So, we can say we had to divide the array 3 times, which leads us to this equation:

```javascript
8 * (1 / 2)³ = 1
```

Similarly, for n elements:

```javascript
(n * (1 / 2)) ^ k = 1;
n * ((1 / 2) ^ k) = 1;
n = 2 ^ k;
```

Which makes our equation to:

```javascript
log((base = 2))(n) = k;
```

### O( n ) — Linear Time

O( n ) describes an algorithm whose performance will grow linearly and in direct proportion to the size of the input data set. So if it takes 10 operations to compute 10 elements, it will take 100 operations to compute 100 elements, 1000 operations to compute 1000 elements, and so on.

For example, printing all the elements of an array:

```javascript
function printAllElements(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    console.log(arr[i]);
  }
}
```

### O( n log n ) — Linearithmic Time

O( n log n ) represents an algorithm when a data set is repeatedly divided into half ( log n ) and each half is processed again independently ( n ).

A common example is the [mergesort](https://en.wikipedia.org/wiki/Merge_sort) algorithm, for which we would have the following operations:

- Divide the list into two sublists
- Sort the left one recursively
- Sort the right one recursively
- Merge the sorted lists

### O( n² ) — Quadratic Time

O( n² ) represents an algorithm whose performance is directly proportional to the square of the size of the input data set. This is common with algorithms that involve nested iterations over the data set. So if it takes 100 operations to compute 10 elements, it will take 10000 operations to compute 100 elements, 1000000 operations to compute 1000 elements, and so on.

For example, printing all possible pairs of values in an array:

```javascript
function printAllPairs(arr) {
  let n = arr.length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
```

### O( 2^n ) — Exponential Time

O( 2^n ) denotes an algorithm whose growth doubles with each addition to the input data set. The growth curve of an O( 2^n ) function is exponential — starting off very shallow, then rising meteorically.

For example, the recursive calculation to find the n-th [Fibonacci](https://en.wikipedia.org/wiki/Fibonacci_number) number:

```javascript
function fibonacci(n) {
  if (n < 2) {
    return n;
  }

  return fibonacci(n - 2) + fibonacci(n - 1);
}
```

In this case the input data set is not an array, but a number. So if it takes 1 operation to compute 1, it will take 1024 operations to compute 10, a quintillion ( 10³⁰ ) of operations to compute 100, and so on!

### O( n! ) — Factorial Time

O( n! ) describes an algorithm whose performance depends on the [factorial](https://en.wikipedia.org/wiki/Factorial) of `n`, which grows _worse than exponentially_. A common example is solving the [traveling salesman problem](https://www2.cs.sfu.ca/CourseCentral/125/tjd/tsp_example.html) with a brute force algorithm.

The problem asks the following question: _“Given a list of cities and the distances between each pair of cities, what is the shortest possible route that visits each city and returns to the origin city?”_. To solve a 20-city problem, we will need to generate over 120 quintillion permutations!

### Optimising

There is a reason why big-O notation drops out the constants and smaller terms. This is because when the problem size gets sufficiently large, those terms don’t matter.

Even though it is not actually proper for big-O notation, using a constant of k or similar can be desirable for benchmarking algorithms when the problem size is small. An algorithm of O( k _ n ) is going to take longer than O( n ). This is not going to matter for the math side and for the trend, but a user is going to notice if O( n²) takes 5 seconds and O( 2 _ n² ) takes 10.

## Conclusion

Studying big-O notation makes you grasp the very important concept of **efficiency** in your code. So when you do work with **huge data sets**, you will have a good sense of where major slowdowns are likely to cause bottlenecks, and where more attention should be paid to get the largest improvements. This is also called **sensitivity analysis**, and is an important part of solving problems and writing great software.

Big-O notation is extremely powerful, but it’s important not to jump the gun and try to prematurely optimise. Use big-O notation to track down scale level efficiencies and refine from there. If you know a data set is never going to be large, or the constants get to be large enough, it can be worth going deeper and focusing on what works better.

In addition, big-O notation is not just limited to runtime. It can be used to quantifies the _amount of space_ or memory taken by an algorithm to run as a function of the length of the input. **Space complexity** includes both _auxiliary space_ and space used by the input and sometimes it’s useful for taking the worse optimisation for memory concerns in an embedded environment.

Hopefully, this article has helped you to grasp the concept of big-O notation, and how to use it to _think at scale_ and develop the most efficient algorithm for any particular problem! :)

### Additional Resources

Here are some resources that massively helped me understand the underlining concepts behind the big-O notation and gave me a great foundation for writing this article:

- [A Gentle Introduction to Algorithm Complexity Analysis](http://discrete.gr/complexity/)
- [A Beginner’s Guide to Big O Notation](https://rob-bell.net/2009/06/a-beginners-guide-to-big-o-notation/)
- [The Basics of Big O Notation](https://somedudesays.com/2020/01/the-basics-of-big-o-notation/)