---
title: Group theory in TypeScript (Part 1)
published: 2023-06-26
updated: null
public: false
description: Let's develop some mathematics with generic classes!
show_toc: true
---

## Introduction

[Group theory](https://en.wikipedia.org/wiki/Group_theory) is a fascinating branch of pure mathematics, which allows us to understand arithmetical operations, solutions of algebraic equations, symmetries of geometric objects, cryptographic algorithms, and much more.

Even if you haven't heard of groups (in mathematics) yet, you use them all the time: the standard example of a group is the set of integers

`Z = {..., -1, 0, +1, +2, ...}`

together with the common arithmetic operations of adding and subtracting integers. (A more precise definition is explained below.)

Ever wondered why, when performing the same set of moves to a solved Rubik's cube again and again (for example: front, top, front, top, ...), you [eventually get back to its original position](/media/rubikscuberotations.mp4)? Well, this is a consequence of Lagrange's theorem in group theory. The beauty of mathematics, and group theory in particular, is that it allows us to understand these "happy accidents" on a much more conceptual level.

The objective of this series of posts is to develop some basic group theory in the context of **TypeScript**. We will make heavy use of generics and [generic classes](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes) in particular. It turns out that they fit perfectly to model mathematical structures.

The definition of a group requires the notion of a _set_, which is (roughly) a collection of mathematical things (numbers, functions, geometric objects, other sets, ...). It turns out that sets can be mentally mapped to _types_ in TypeScript. Please check out the following blog posts explaining the analogy between sets and types in detail.

-   Vladimir Klepov, [Making sense of TypeScript using set theory](https://blog.thoughtspile.tech/2023/01/23/typescript-sets/)
-   Iván Ovejero, [TypeScript and Set Theory](https://ivov.dev/notes/typescript-and-set-theory)

In the following, I will make use of this analogy all the time. Also, functions in mathematics are nothing but [pure functions](https://en.wikipedia.org/wiki/Pure_function) in programming.

All of the code can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## What is a group?

A group consists of a set `X` together with

-   an element `e` in `X` ("unit element")
-   a function `c : X x X ---> X` ("composition")
-   a function `i : X ---> X` ("inverse")

satisfying some conditions. The notation means that, given any two elements `a,b` in `X`, we get a new element `c(a,b)` in `X`. Also, we have an element `i(a)` of `X`, for every element `a` of `X`. So, `e` is a constant, `c` is a function of two arguments, and `i` is a function of one argument. The group is the tuple `G=(X,e,c,i)` with all the data.

For example, in the group of integers `Z`, the set consists of all integers `...,-1,0,+1,+2,...`, the unit is the zero `0`, the composition maps two integers `a,b` to their _sum_ `a + b`, and the inverse of `a` is `-a`.

Another example is the group `Q*` of all non-zero rational numbers (floats) with the unit element `1`, the composition of `a,b` is their _product_ `a * b`, and the inverse of `a` is `1/a`.

The conditions (called "group axioms") are the following:

1. **Associativity law**: For all elements `x,y,z` we have `c(x,c(y,z)) = c(c(x,y),z)`.
2. **Unit law**: For all elements `x` we have `c(x,e) = x` and `c(e,x) = x`.
3. **Inverses law**: For all elements `x` we have `c(x,i(x)) = e` and `c(i(x),x) = e`.

When you write down these conditions for `Q*`, you get:

1. `a * (b * c) = (a * b) * c` for all rational numbers `a,b,c`
2. `a * 1 = a` and `1 * a = a` for all rational numbers `a`
3. `a * 1/a = 1` and `1/a * a = e` for all rational numbers `a`

Looks familiar, right? And for `Z`, the conditions are:

1. `a + (b + c) = (a + b) + c` for all integers `a,b,c`
2. `a + 0 = a` and `0 + a = a` for all integers `a`
3. `a + (-a) = 0` and `(-a) + a = 0` for all integers `a`

These equations are true, verifying that `Z`and `Q*` are in fact groups.

## Group interface

To translate the definition of a group to TypeScript, we will replace the set `X` with any type. It has to be arbitrary so that we will use a generic type.

The unit can be any element of type `X`. The composition is a function of two arguments, both of type `X`, producing an element of type `X`. And the inverse operation takes an element of type `X` to an element of type `X`.

This is what our (preliminary) generic interface looks like:

```typescript
// group.ts

interface GroupData<X> {
    unit: X;
    inverse: (a: X) => X;
    compose: (a: X, b: X) => X;
    // not finished
}
```

But we have a problem here: given an object of this interface, how do we validate the group axioms? We need to check a condition for _all_ elements of type `X`. But this is not possible on a computer unless `X` has only finitely many distinguished members.

We will solve this in the next section.

## Sets with equality

In JavaScript, we cannot iterate over types, but over array-like structures. We will work with [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) since we want to prevent duplicate elements. Instead of the class `Set` we will use the generic class `Set<X>` in TypeScript which ensures that all elements belong to `X`.

```typescript
interface GroupData<X> {
    set: Set<X>;
    unit: X;
    inverse: (a: X) => X;
    compose: (a: X, b: X) => X;
    // not finished
}
```

Remember that all sets in JavaScript / TypeScript are finite so we will only be able to model _finite groups_. Infinite groups can only be modeled "partially".

The interface above is still not finished. Remember that we want to write down the group axioms which require the equality of two elements. But in JavaScript, the equality of two elements is often a too strict notion. For example, `[1,2] === [1,2]` is actually false!

Hence, we need to introduce a more flexible notion of equality of elements of our sets. To achieve this, we extend the generic class `Set<X>` with a new generic class that has such a notion:

```typescript
// set.ts

abstract class SetWithEquality<X> extends Set<X> {
    abstract equal(a: T, b: T): boolean;
}
```

We need to make this an [abstract class](https://www.typescriptlang.org/docs/handbook/classes.html#abstract-classes) since we cannot implement the `equal` method at this stage: this is the job of more _concrete_ classes which inherit from our abstract class.

For example, the following two classes implement the notion of equality for numbers and arrays of numbers.

```typescript
class SetOfNumbers extends SetWithEquality<number> {
    equal(a: number, b: number): boolean {
        return a === b;
    }
}

class SetOfTuples extends SetWithEquality<number[]> {
    equal(a: number[], b: number[]): boolean {
        return (
            a.length === b.length &&
            a.every((element, index) => element === b[index])
        );
    }
}
```

Remember that these classes inherit from the class `Set<X>`, so we can use its constructor and all the usual methods. For example,

```typescript
new SetOfNumbers([0, 1, 2, 3, 4]);
```

declares a set of 5 numbers with our own notion of equality.

This is our finished interface for groups:

```typescript
interface GroupData<X> {
    set: SetWithEquality<X>;
    unit: X;
    inverse: (a: X) => X;
    compose: (a: X, b: X) => X;
}
```

## Generic Group class

To construct groups and also verify the group axioms, we need to create a generic class that implements the interface from before.

```typescript
// group.ts

class Group<X> {
    public set: SetWithEquality<X>;
    public unit: X;
    public inverse: (a: X) => X;
    public compose: (a: X, b: X) => X;

    constructor(data: GroupData<X>) {
        const { set, unit, inverse, compose } = data;
        this.set = set;
        this.unit = unit;
        this.inverse = inverse;
        this.compose = compose;

        // TODO: check group axioms
    }
}
```

Before we continue with this class, let us look at an instructive example.

```typescript
const G = new Group<number>({
    set: new SetOfNumbers([0, 1, 2, 3, 4]),
    unit: 0,
    inverse: (a) => -a,
    compose: (a, b) => a + b,
});
```

This is, strictly speaking, not a group, but only a subset of the group of integers `Z`. The group axioms are satisfied for `G` except for the fact that inverse and composition are not _closed_: For example, `3` is contained in the set, but its inverse `-3` is not. (More on that later.)

We have to make this compromise here since we cannot model infinite groups. We cannot write `new SetOfNumbers(Integers)`, unfortunately.

## Class methods

All functions in this section are methods inside of the generic class `Group<X>` unless stated otherwise.

Let us begin to define the _array_ of elements of our set. This is useful since some array methods are not (yet) implemented for sets in JavaScript.

```typescript
get elements(): X[] {
    return Array.from(this.set);
}
```

### Associativity

Let us check the associativity law for three elements. Instead of writing

```typescript
this.compose(this.compose(a, b), c) ===
    this.compose(a, this.compose(b, c));
```

which would be too strict, we use the notion of equality attached to our underlying set.

```typescript
isAssociativeTriple([a, b, c]: [X, X, X]): boolean {
    return this.set.equal(
        this.compose(this.compose(a, b), c),
        this.compose(a, this.compose(b, c))
    );
}
```

To test this for all triples and avoid ugly nested for loops, we define a helper function in a separate file:

```typescript
// utils.ts
function cubeOfArray<X>(A: X[]): [X, X, X][] {
    // implementation left to the reader
}
```

This function maps an array `A` to the array of all triples `[a,b,c]` of elements `a,b,c` in `A`. Their order does not matter here. Now we can check associativity as a whole:

```typescript
get isAssociative(): boolean {
    const triples = cubeOfArray(this.elements);
    return triples.every(this.isAssociativeTriple.bind(this));
}
```

I ran into issues without the `bind(this)`. I assume this is because the `every` function takes over the meaning of `this` otherwise. Instead, `this` should refer to the group instance.

We can test this with our example "group" from before.

```typescript
console.assert(G.isAssociative);
```

Reminder: `console.assert` does only log something when the assertion is not true. In our case, nothing is logged, which means that `G` is, indeed, associative. Yay!

### Unit law

Next, we treat the unit law. As before, we define a helper method first which checks this for a single element.

```typescript
respectsUnit(a: X): boolean {
    return (
        this.set.equal(this.compose(a, this.unit), a) &&
        this.set.equal(this.compose(this.unit, a), a)
    );
}

get hasUnit(): boolean {
    return this.elements.every(this.respectsUnit.bind(this));
}
```

### Inverses

Let us continue with inverses in the same fashion.

```typescript
hasInverseElement(a: X): boolean {
    return (
        this.set.equal(
            this.compose(a, this.inverse(a)),
            this.unit
        ) &&
        this.set.equal(
            this.compose(a, this.inverse(a)),
            this.unit
        )
    );
}

get hasInverseElements(): boolean {
    return this.elements.every(this.hasInverseElement.bind(this));
}
```

### Group axioms

We have everything together to check the group axioms. We also add this check to the constructor.

```typescript
constructor(data: GroupData<X>) {
    // ...
    if (!this.isGroup) throw "Group axioms are not satisfied";
}

get isGroup(): boolean {
    return (
        this.isAssociative &&
        this.hasUnit &&
        this.hasInverseElements
    );
}
```

The example group `G` from before does not throw an error, implying that the group axioms (except for closedness) are satisfied! Try to mess up the definition of `G.inverse` for example, you will get an error.

### Closedness

We will not make this mandatory like the group axioms but want to have a method to check if the group is closed, i.e. that

-   the unit is contained in the set
-   the composition of two elements in the set is again in the set
-   the inverse of an element in the set is again in the set

It is a bit unfortunate that this is not guaranteed by our type system. After all, we are saying that, for example, the inverse of an element of type `X` is again of type `X`, via the group data interface. But these are two different things. Remember that the types are only adding some type-safety to our class, whereas the set says exactly which elements we have and over which elements we can iterate. In mathematics (and type theory), these things are the same, but unfortunately, it is not the case here. Please let me know if you find an approach in TypeScript that unifies the type and the set!

When implementing the closedness check, we also have to make sure to use the notion of equality in our set. Therefore, it is _not_ enough to use the `Set.has` class method.

So let's do it:

```typescript
get isClosedUnderUnit(): boolean {
    return this.elements.some((a) =>
        this.set.equal(a, this.unit)
    );
}

get isClosedUnderComposition(): boolean {
    return squareOfArray(this.elements).every(([a, b]) =>
        this.elements.some((c) =>
            this.set.equal(this.compose(a, b), c)
        )
    );
}

get isClosedUnderInverses(): boolean {
    return this.elements.every((a) =>
        this.elements.some((b) =>
            this.set.equal(this.inverse(a), b)
        )
    );
}

get isClosed(): boolean {
    return (
        this.isClosedUnderUnit &&
        this.isClosedUnderComposition &&
        this.isClosedUnderInverses
    );
}
```

We use a `squareOfArray` utility function, implemented similarly to our `cubeOfArray` function from before. For our example, `G.isClosed` will be false. When you reduce the list of elements to `0` in its definition, it will be true. This is the so-called trivial group.

### Commutativity

In mathematics, a group `(X,e,c,i)` is called _commutative_ if `c(x,y) = c(y,x)` holds for all elements `x,y` of `X`. For example, `Z` and `Q*` are commutative.

We can easily add a commutativity check to our group class.

```typescript
isCommutingPair([a, b]: [X, X]) {
    return this.set.equal(this.compose(a, b), this.compose(b, a));
}

get isCommutative(): boolean {
    const pairs = squareOfArray(this.elements);
    return pairs.every(this.isCommutingPair.bind(this));
}
```

Our example "group" `G` is commutative:

```typescript
console.assert(G.isCommutative === true);
```

## A finite simple group of order 2

There is a group with two elements `0,1` and composition (written as `+`) defined by `1 + 1 = 0` and the condition that `0` is a unit. This is the cyclic group `Z/2Z` or `Z modulo 2`. There is even a
[song named after this group](https://www.youtube.com/watch?v=BipvGD-LCjU)!

It is essentially the same as (mathematicians say: _isomorphic_ to) the group of truth values with the `XOR` operation.

Let us build it with our class.

```typescript
const Zmod2 = new Group<number>({
    set: new SetOfNumbers([0, 1]),
    unit: 0,
    compose: (a, b) => (a == b && a == 1 ? 0 : a + b),
    inverse: (a) => a,
});
```

Let us test the implementation:

```typescript
console.assert(Zmod2.isClosed === true);
console.assert(Zmod2.isCommutative === true);
console.assert(Zmod2.compose(1, 1) === 0);
```

## Outlook

Since this post is already very long, I have decided to split it into several parts. The next part will be about [finite cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group) and [symmetric groups](https://en.wikipedia.org/wiki/Symmetric_group). We will also implement some general constructions for groups, and add some further methods to our group class, showcasing how group theory can be modeled within TypeScript.

Of course, when you want to do some serious computations with groups, you will most likely want to use a different, more performant programming language or even computer algebra system, tailored towards group theory in particular (GAP, Magma, Sage, ...).

For me, it was a joy to build a bridge between my old profession (mathematics) and my new one (web development). I hope that you also found the investigation interesting.
