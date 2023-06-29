---
title: Group theory in TypeScript (Part 2)
published: 2023-06-30
updated: null
public: false
description: Let's investigate more interesting examples of groups!
show_toc: true
---

## Introduction

[Group theory](https://en.wikipedia.org/wiki/Group_theory) is a fascinating branch of pure mathematics, which allows us to understand arithmetical operations, solutions of algebraic equations, symmetries of geometric objects, cryptographic algorithms, and much more.

This series of posts is about modeling group theory within TypeScript. In [Part 1](/blog/grouptheory-typescript-part1) we already developed a generic class `Group<X>` which models finite groups whose elements are of type `X`. Their underlying sets are instances of an abstract class `SetWithEquality<X>`, which are like sets in TypeScript but with a custom notion of equality of their elements. If you haven't read that post, please check it out first.

In the previous part, we have only seen one specific example of a group in TypeScript. This part will be about introducing more interesting examples of groups. All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## Finite cyclic groups

### Modulo arithmetic

Before giving the definition, let me tell you that you already know an example of a finite cyclic group. When it is 11 o'clock, and we wait 3 hours, it is 2 o'clock. This is because `11 + 3 = 14` gives the remainder `2` when divided by `12`. When we calculate with hours, we calculate inside of the group `Z/12Z`, defined below in a more general fashion.

Let `n` be a positive integer. There is a group `Z/nZ` of order `n` (that means, with `n` elements) constructed as follows:

The underlying set consists of the numbers `0,1,2,...,n-1`. We take the group operations inherited from the additive group `Z`, but calculate the result _modulo `n`_. This means that the composition of `a` and `b` is the remainder of `a + b` divided by `n`. The inverse of `a` is the remainder of `-a` divided by `n`. This works since the remainder is always in the list `0,1,2,...,n-1`.

And it can be simplified even further: If `a + b < n`, then the composition of `a,b` is just `a + b`. Otherwise, it is `a + b - n`. The inverse of `0` is `0`, and for `0 < a < n` the inverse of `a` is `n - a`.

### Implementation

The next step is to define the group `Z/nZ`, pronounced _Z modulo n_, with our group class. Let us first define a utility function that produces the list of numbers `0,1,2,...,n-1`.

```typescript
function interval(n: number): number[] {
    return new Array(n).fill(0).map((_, i) => i);
}
```

Finally:

```typescript
function additiveGroupModulo(n: number): Group<number> {
    if (n <= 0) throw "Only positive numbers are allowed";
    if (n != Math.ceil(n)) throw "Only whole numbers are allowed";

    return new Group<number>({
        set: new SetOfNumbers(interval(n)),
        unit: 0,
        inverse: (a) => (a === 0 ? 0 : n - a),
        compose: (a, b) => (a + b >= n ? a + b - n : a + b),
    });
}
```

Let us test this by looking at the group `Z/7Z`:

```typescript
const Zmod7 = additiveGroupModulo(7);
console.assert(Zmod7.order === 7);
console.assert(Zmod7.compose(5, 3) === 1);
console.assert(Zmod7.isCommutative === true);
```

No error is thrown by the declaration of the group, which means that the group axioms are indeed satisfied. (We implemented this behavior in Part 1.) Also, the group behaves as expected.

There are more conceptual constructions of the group `Z/nZ` (with quotient groups), but the one above is more practical for the code. There is also an infinite cyclic group, `Z`, but as already explained in Part 1, we cannot model this in TypeScript. There is also a better, more abstract definition of cyclic groups (via generators), but this is not relevant for now.

## Symmetric groups

### Permutations

For every set `X`, there is a group that consists of all the bijective functions `f : X ---> X`. A function is _bijective_ it has an inverse function. This essentially means that `f` just _permutes_ or _reorders_ the elements of `X`. For example, `f : Z ---> Z`, `f(z) := -z` is bijective, but `f : Z ---> Z`, `f(z) := 0` is not.

The group composition of two functions `f : X ---> X`, `g : X ---> X` is, well, their composition:

`X ---f---> X ---g--> X`

(This is why it was called like that in the definition of a group!) And the inverse is the inverse function. The unit is the identity function `id : X ---> X` which maps every element `x` to `x`. It is trivial to check that the group axioms are satisfied.

This is the _symmetric group_ on `X`. If `X` is a finite set with `n` elements, it is usually denoted by `S_n` (S with a subscript of `n`). Since we like to start counting with `0`, it is useful to let

`X = {0,1,...,n-1}`

(whereas most mathematicians will use `1,...,n` instead). In this case, a function `f : X ---> X` can just be seen as an array of length `n` which consists of integers smaller than `n`. The condition that `f` is bijective means that all integers smaller than `n` appear exactly once.

For example, `S_3` consists of the following six permutations, written as arrays:

-   `[0,1,2]`
-   `[0,2,1]`
-   `[1,0,2]`
-   `[1,2,0]`
-   `[2,0,1]`
-   `[2,1,0]`

How do we generate all permutations?

The idea is to do this recursively. For `n = 0`, there is a unique permutation, the empty array. Otherwise, assume that we know all the permutations of the numbers `0,...,n-2`. They are seen as arrays of length `n-1`. Then, take any of the `n` spots and insert `n-1` there.

For example, `S_2` has exactly two permutations, `[0,1]` and `[1,0]`. The elements of `S_3` above result from these by inserting `2` anywhere.

### Implementation

We are now able to write a recursive function that generates all permutations of the numbers `0,...,n-1`.

```typescript
export function listOfPermutations(n: number): number[][] {
    if (n < 0) throw "Only non-negative numbers are allowed";
    if (n != Math.ceil(n)) throw "Only whole numbers are allowed";

    if (n == 0) {
        return [[]];
    }

    const list = listOfPermutations(n - 1);

    const result: number[][] = [];

    for (const perm of list) {
        for (let index = 0; index < n; index++) {
            result.push([
                ...perm.slice(0, index),
                n - 1,
                ...perm.slice(index, perm.length),
            ]);
        }
    }
    return result;
}
```

And now, we can implement the symmetric group on `n` elements. Since its underlying set consists of elements of type `number[]`, we will use the corresponding type for our group class. We also use the class `SetOfTuples` from Part 1 with the "correct" notion of equality for tuples. Otherwise, the group axioms would fail.

```typescript
export function symmetricGroup(n: number): Group<number[]> {
    if (n < 0) throw "Only non-negative numbers are allowed";
    if (n != Math.ceil(n)) throw "Only whole numbers are allowed";

    return new Group<number[]>({
        set: new SetOfTuples(listOfPermutations(n)),
        unit: interval(n),
        inverse: (a) =>
            interval(n).map(y) =>
                a.findIndex((_y) => _y === y),
            ),
        compose: (a, b) => b.map((y) => a[y]),
    });
}
```

Let me explain this a bit more:

The unit is just the array `[0,...,n-1]`, which is just the interval we implemented before.

The inverse of a permutation `a` is the permutation that maps a number `y` to the (unique) number `x` with `y = a(x)`. Now, since we are working with arrays, `inverse(a)(y)` is really just the index of `y` inside of the array `a`.

The composition `c(a,b)` is defined by `c(a,b)(x) := a(b(x))`. This means that the array corresponding to `c(a,b)` results from the array for `b` by applying `a` to all of its entries, i.e., by mapping it via `a`.

Let us test that `S_3` behaves as we expect.

```typescript
const S3 = symmetricGroup(3);
console.assert(S3.isCommutative === false);
console.assert(S3.order === 6);
console.assert(S3.set.equal(S3.inverse([1, 2, 0]), [2, 0, 1]));
```

## Klein Four-Group

There is a group that has exactly four elements `e,a,b,c` such that (we write the group composition as multiplication here)

-   `e` is the unit
-   every element is inverse to itself (`a * a = e`, etc.)
-   `a * b = b * a = c`, `a * c = c * a =  b`, `b * c = c * b = a`.

So when multiplying two distinct non-units, the result is always the other of the three elements.

This is called the Klein Four-Group (named after the mathematician _Felix Klein_). Let's implement it in our code!

First, we need to implement a corresponding class for sets of strings. Since strings are primitive, the equality method is simple.

```typescript
export class SetOfStrings extends SetWithEquality<string> {
    equal(a: string, b: string): boolean {
        return a === b;
    }
}
```

Our description of the group can be translated as follows.

```typescript
export const KleinFourGroup = new Group<string>({
    set: new SetOfStrings(["e", "a", "b", "c"]),
    unit: "e",
    inverse: (x) => x,
    compose: (x, y) => {
        if (x === "e") return y;
        if (y === "e") return x;
        if (x === y) return "e";
        return ["a", "b", "c"].find((u) => u !== x && u !== y)!;
    },
});
```

Notice that we have to tell TypeScript that the result of the `find` method is not undefined, using the `!` operator. Otherwise, it will complain.

Let us test our implementation:

```typescript
import { KleinFourGroup } from "./examples/groups/klein-four-group";
console.assert(KleinFourGroup.order === 4);
console.assert(KleinFourGroup.isCommutative === true);
console.assert(KleinFourGroup.compose("a", "b") === "c");
```

## Conclusion

This part was about implementing more examples of finite groups within TypeScript. There are many more such basic examples. They are the building blocks of more fascinating examples of finite groups. In fact, there are several constructions that build groups out of (simpler) groups. This is what we will cover in the next part.
