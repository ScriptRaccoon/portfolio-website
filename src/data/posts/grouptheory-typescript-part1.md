---
title: Group theory in TypeScript (Part 1)
published: 2023-06-28
updated: 2023-07-08
description: Let's develop some mathematics with generic classes!
---

## Introduction

[Group theory](https://en.wikipedia.org/wiki/Group_theory) is a fascinating branch of pure mathematics, which allows us to understand arithmetical operations, solutions of algebraic equations, symmetries of geometric objects, cryptographic algorithms, and much more.

Even if you haven't heard of groups (in mathematics) yet, you use them all the time: the standard example of a group is the set of integers

`Z = {..., -1, 0, +1, +2, ...}`

equipped with the common arithmetical operations `+` and `-` of adding and subtracting integers. (A more precise definition is explained below.)

Ever wondered why, when performing the same set of moves to a solved Rubik's cube again and again (for example: front, top, front, top, ...), you [eventually get back to its original position](/media/rubikscuberotations.mp4)? Well, this is a consequence of Lagrange's theorem in group theory. The beauty of mathematics, and group theory in particular, is that it allows us to understand these "happy accidents" on a much more conceptual level.

The objective of this series of posts is to develop some basic group theory in the context of **TypeScript**. We will make heavy use of [generics](https://typescriptlang.org/docs/handbook/2/generics.html) and [generic classes](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes) in particular. It turns out that they fit quite well to model mathematical structures.

The definition of a group requires the notion of a _set_, which is (roughly) a collection of mathematical things, such as numbers, functions, geometric objects, and other sets. It turns out that sets can be mentally mapped to _types_ in TypeScript. Please check out the following blog posts explaining the analogy between sets and types in detail.

-   Vladimir Klepov, [Making sense of TypeScript using set theory](https://blog.thoughtspile.tech/2023/01/23/typescript-sets/)
-   Iván Ovejero, [TypeScript and Set Theory](https://ivov.dev/notes/typescript-and-set-theory)

In the following, I will make use of this analogy all the time. Also, functions in mathematics are nothing but [pure functions](https://en.wikipedia.org/wiki/Pure_function) in programming.

All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## What is a group?

A group consists of a set `X` together with

-   an element `e` in `X` ("unit element")
-   a function `c : X x X ---> X` ("composition")
-   a function `i : X ---> X` ("inverse")

satisfying some conditions. The notation means that, given any two elements `x,y` in `X`, we get a new element `c(x,y)` in `X`. Also, we have an element `i(x)` of `X`, for every element `x` of `X`. So, `e` is a constant, `c` is a function of two arguments, and `i` is a function of one argument. The group is the tuple `G = (X,e,c,i)` with all the data.

For example, in the group of integers `Z`, the set consists of all integers `...,-1,0,+1,+2,...`, the unit is the zero `0`, the composition maps two integers `x,y` to their _sum_ `x + y`, and the inverse of `x` is `-x`.

Another example is the group `Q*` of all non-zero rational numbers (floats) with the unit element `1`, the composition of `x,y` is their _product_ `x * y`, and the inverse of `x` is `1/x`.

The conditions for a group, called _group axioms_, are the following:

1. **Associativity law**: For all elements `x,y,z` we have `c(x,c(y,z)) = c(c(x,y),z)`.
2. **Unit law**: For all elements `x` we have `c(x,e) = x` and `c(e,x) = x`.
3. **Inverses law**: For all elements `x` we have `c(x,i(x)) = e` and `c(i(x),x) = e`.

When you write down these conditions for `Q*`, you get:

1. `x * (y * z) = (x * y) * z` for all non-zero rational numbers `x,y,z`
2. `x * 1 = x` and `1 * x = x` for all non-zero rational numbers `x`
3. `x * 1/x = 1` and `1/x * x = 1` for all non-zero rational numbers `x`

Looks familiar, right? And for `Z`, the conditions are:

1. `x + (y + z) = (x + y) + z` for all integers `x,y,z`
2. `x + 0 = x` and `0 + x = x` for all integers `x`
3. `x + (-x) = 0` and `(-x) + x = 0` for all integers `x`

These equations are true, verifying that `Z`and `Q*` are, indeed, groups.

Groups are nothing but structures in which you can compute like you normally would, just in a more abstract way.

Examples such as `Q*` are the reason why many authors also write `x * y` instead of `c(x,y)` in the case of an abstract group, but this is confusing for beginners (after all, the composition operation could even be an addition!) and will be avoided here.

## Group interface

To translate the definition of a group to TypeScript, we will replace the set `X` with a type. It has to be arbitrary so that we will use a generic type.

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

In JavaScript, we cannot iterate over types, but over array-like structures. We will work with [sets](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) since we want to prevent duplicate elements. Instead of the class `Set`, we will use the generic class `Set<X>` in TypeScript which ensures that all elements belong to the type `X`.

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

The interface above is still not finished. Remember that we want to write down the group axioms, and these require the equality of pairs of elements. But in JavaScript, the equality of two non-primitive objects is often too strict. For example, `[1,2] === [1,2]` is actually false!

We need a more flexible notion of equality of elements of our sets. To achieve this, we extend the generic class `Set<X>` with a new generic class that has such a notion by definition:

```typescript
class SetWithEquality<X> extends Set<X> {
    public equal: (a: X, b: X) => boolean;

    constructor(elements: X[], equal?: (a: X, b: X) => boolean) {
        super(elements);
        this.equal = equal ?? ((a, b) => a === b);
    }
}
```

When no equality function is passed to the constructor, we take the default one. For example,

```typescript
new SetWithEquality([0, 1, 2, 3, 4]);
```

declares a set of 5 numbers with the usual notion of equality. For tuples, we define the utility function

```typescript
function equalTuples<T>(a: T[], b: T[]): boolean {
    return (
        a.length === b.length &&
        a.every((_, index) => a[index] === b[index])
    );
}
```

and can declare a set of tuples like so:

```typescript
new SetWithEquality([[0], [1]], equalTuples);
```

This is our finished interface for groups:

```typescript
interface GroupData<X> {
    set: SetWithEquality<X>;
    unit: X;
    inverse: (a: X) => X;
    compose: (a: X, b: X) => X;
}
```

Before we go on, let us add a method to the `SetWithEquality` class which enables us later to check if an element is contained in the set &ndash; using the custom equality function (otherwise, `Set.has` would be enough):

```typescript
contains(a: X): boolean {
    return Array.from(this).some((b) => this.equal(a, b));
}
```

For example:

```typescript
const M = new SetWithEquality([[0, 1]], equalTuples);
console.assert(M.contains([0, 1]));
console.assert(!M.has([0, 1])); // "wrong" equality
```

Reminder: `console.assert` does only log something when the assertion is not true. In our case, nothing is logged, which means that the assertions are true.

## Generic group class

To construct groups and also verify the group axioms, we need to create a generic class that implements the interface from before.

```typescript
class Group<X> implements GroupData<X> {
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
    // TODO: add methods
}
```

## A basic example

Before we continue with the group class, let us look at a basic example. This is a subgroup of `Q*` which has just two elements: `1` and `-1`. The group operations are inherited from `Q*`, so for example the composition is just ordinary multiplication.

```typescript
const SignGroup = new Group<number>({
    set: new SetWithEquality([-1, 1]),
    unit: 1,
    compose: (a, b) => a * b,
    inverse: (a) => 1 / a,
});
```

For example:

```typescript
console.assert(SignGroup.compose(-1, -1) === 1);
```

There is a big difference here to the mathematical group `{-1,+1}`, though. This one has composition and inverse defined only for these two elements. The group `SignGroup` defined in TypeScript has a function `SignGroup.compose` which is defined for _all_ pairs of numbers (at least, those JavaScript can handle). For example:

```typescript
console.assert(SignGroup.compose(2, 3) === 6);
```

One idea might be to throw an error when the function is applied to members outside of the set of elements. But we will not do that to keep the code simple.

In mathematics, the _type_ of the group elements and their underlying set are practically the same (and they _are_ in type theory). In TypeScript, unfortunately, we have to distinguish the two. We also cannot construct the whole group `Q*` in TypeScript, since it is infinite. We cannot write `Set(AllNumbers)`.

The TypeScript version of a group clearly differs from the mathematical version. Nevertheless, we can try to bring over some group theory to TypeScript. We will cover the group axioms next.

## Group axioms

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

I ran into issues without the `bind(this)`. I assume this is because the function `every` takes over the meaning of `this` otherwise. Instead, `this` should refer to the group instance.

We can test this with our example `SignGroup`.

```typescript
console.assert(SignGroup.isAssociative);
```

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
            this.compose(this.inverse(a),a),
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

### Closedness

We almost forgot something! We need to make sure that the group operations are indeed operating on the underlying set, one says that they are _closed_. This means:

-   the unit is contained in the set
-   the composition of two elements in the set is again in the set
-   the inverse of an element in the set is again in the set

It is a bit unfortunate that this is not guaranteed by our type system. After all, we are saying that, for example, the inverse of an element of type `X` is again of type `X`, via the group data interface. But as we have already explained [before](#a-basic-example), these are two different things. Remember that the types are only adding some type-safety to our class, whereas the set says exactly which elements we have and over which elements we can iterate.

Here is the code.

```typescript
get isClosedUnderUnit(): boolean {
    return this.set.contains(this.unit);
}

get isClosedUnderComposition(): boolean {
    return squareOfArray(this.elements).every(([a, b]) =>
        this.set.contains(this.compose(a, b))
    );
}

get isClosedUnderInverses(): boolean {
    return this.elements.every((a) =>
        this.set.contains(this.inverse(a))
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

We use a `squareOfArray` utility function, implemented similarly to our `cubeOfArray` function from before.

### Finale

We have everything together to check the group axioms. We also add this check to the constructor.

```typescript
constructor(data: GroupData<X>) {
    // ...

    if (!this.isGroup) {
        console.error("Error: Group axioms are not satisfied");
    }
}

get isGroup(): boolean {
    return (
        this.isClosed &&
        this.isAssociative &&
        this.hasUnit &&
        this.hasInverseElements
    );
}
```

The example group `SignGroup` from [before](#a-basic-example) is indeed a group:

```typescript
console.assert(SignGroup.isGroup);
```

Try to mess up the definition of `SignGroup.compose`, you will get an error.

## Class methods

A lot of group theory can now be added to our group class. For now, let us only look at two simple examples.

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

Our example group `SignGroup` is commutative:

```typescript
console.assert(SignGroup.isCommutative);
```

### Order

The _order_ of a group is the number of its elements. We can easily implement this as a class method:

```typescript
get order(): number {
    return this.set.size;
}
```

For example,

```typescript
console.assert(SignGroup.order === 2);
```

confirms that `SignGroup` is a [finite simple group of order two](https://www.youtube.com/watch?v=BipvGD-LCjU).

## Conclusion

Because this post is already quite long, I have decided to split the topic into several parts. The next parts will be about [finite cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group), [symmetric groups](https://en.wikipedia.org/wiki/Symmetric_group), [homomorphisms of groups](https://en.wikipedia.org/wiki/Group_homomorphism), and maybe more concepts showcasing how group theory can be modeled within TypeScript.

Of course, when you want to do some serious _computations_ with groups, you will most likely want to use a different, more performant programming language or even computer algebra system, tailored towards group theory in particular (GAP, Magma, Sage, ...).

For developing the _theory_ of groups with the help of types, [Martin-Löw type theory](https://en.wikipedia.org/wiki/Intuitionistic_type_theory) is a very powerful choice, which also experienced a renaissance within the mathematics community via the introduction of [homotopy type theory](https://en.wikipedia.org/wiki/Homotopy_type_theory).

Type theory puts a different perspective on the group axioms. For example, instead of saying that `a + (b + c) = (a + b) + c` is a true statement, this statement becomes a _type_, and a member of this type

`p : a + (b + c) = (a + b) + c`

is a _proof_ of associativity and becomes part of the group _data_!

Unfortunately, I was not able to get this idea running within TypeScript, which seems to be more "computational" in nature. Instead, we had to loop over an array to check associativity.

Put shorty: in type theory, associativity is part of the _data_, whereas here, as well as in classical mathematics, it is a _condition_.

For me, it was a joy to build a bridge between my old profession (mathematics) and my new one (web development). I hope that you also found the investigation interesting.

→ [Link to Part 2](/blog/grouptheory-typescript-part2)
