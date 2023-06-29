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

This series of posts is about modeling group theory within TypeScript.

In [Part 1](https://scriptraccoon.dev/blog/grouptheory-typescript-part1) we already developed a generic class `Group<X>` which models finite groups whose elements are of type `X`. Their underlying sets are instances of an abstract class `SetWithEquality<X>`, which are like sets in TypeScript but with a custom notion of equality of their elements. If you haven't read that post, please check it out first.

In Part 1, we have only seen one specific example of a group in TypeScript. This part will be about implementing further examples of groups. We will look at [cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group), [symmetric groups](https://en.wikipedia.org/wiki/Symmetric_group), the [Klein Four-Group](https://en.wikipedia.org/wiki/Klein_four-group) and the [General linear group](https://en.wikipedia.org/wiki/General_linear_group).

All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## Finite cyclic groups

### Modulo arithmetic

Before giving the definition, let me tell you that you already know an example of a finite cyclic group. When it is 11 o'clock, and we wait 3 hours, it is 2 o'clock. This is because `11 + 3 = 14` gives the remainder `2` when divided by `12`. When we calculate with hours, we calculate inside of the group `Z/12Z`, defined below in a more general fashion.

Let `n` be a positive integer. There is a group `Z/nZ` of order `n` (that means, with `n` elements) constructed as follows:

The underlying set consists of the numbers `0,1,2,...,n-1`. We take the group operations inherited from the additive group `Z`, but calculate the result [modulo](https://en.wikipedia.org/wiki/Modulo) `n`. This means that the composition of `a` and `b` is the remainder of `a + b` divided by `n`. The inverse of `a` is the remainder of `-a` divided by `n`. This works since the remainder is always in the list `0,1,2,...,n-1`.

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

There are more conceptual constructions of the group `Z/nZ` (with quotient groups), but the one above is easier to implement in our setup. There is also an infinite cyclic group, `Z`, but as already explained in Part 1, we cannot model it in TypeScript.

## Symmetric groups

### Permutations

For every set `X`, there is a group that consists of all the bijective functions `f : X ---> X`. A function is _bijective_ if it has an [inverse function](https://en.wikipedia.org/wiki/Inverse_function). This essentially means that `f` just _permutes_ or _reorders_ the elements of `X`.

The group composition of two bijective functions `f : X ---> X`, `g : X ---> X` is, well, their composition:

`X ---f---> X ---g--> X`

(This is why it was called like that in the definition of a group!) And the inverse is the inverse function. The unit is the identity function `id : X ---> X` which maps every element `x` to `x`. It is trivial to check that the group axioms are satisfied.

This is the _symmetric group_ on `X`. If `X` is a finite set with `n` elements, it is usually denoted by `S_n` (S with a subscript of `n`). Since we like to start counting with `0`, it is useful to let

`X = {0,1,...,n-1}`

(whereas most mathematicians will use `1,...,n` instead). In this case, a function `f : X ---> X` can just be seen as an array of length `n` which consists of integers smaller than `n`. The condition that `f` is bijective means that all integers smaller than `n` appear exactly once.

For example, `S_3` consists of the following six permutations, written as arrays:

-   `[2,0,1]`
-   `[0,2,1]`
-   `[0,1,2]`
-   `[2,1,0]`
-   `[1,2,0]`
-   `[1,0,2]`

How do we generate all permutations?

The idea is to do this recursively. For `n = 0`, there is a unique permutation, the empty array. Otherwise, assume that we know all the permutations of the numbers `0,...,n-2`. They are seen as arrays of length `n-1`. Then, take any of the `n` spots and insert `n-1` there. This yields a permutation of the numbers `0,...,n-1`, and they all arise this way.

For example, `S_2` has exactly two permutations, `[0,1]` and `[1,0]`. The elements of `S_3` above result from these by inserting `2` anywhere.

### Implementation

We are now able to write a recursive function that generates all permutations of the numbers `0,...,n-1`.

```typescript
function listOfPermutations(n: number): number[][] {
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
function symmetricGroup(n: number): Group<number[]> {
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

The unit is the array `[0,...,n-1]`, which is just the interval we implemented before.

The inverse of a permutation `a` is the permutation that maps a number `y` to the (unique) number `x` with `y = a(x)`. Since we are working with arrays, `x` is just the index of `y` inside of the array `a`.

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

This is called the Klein Four-Group, named after the mathematician _Felix Klein_. Let's implement it in our code!

First, we need to implement a corresponding class for sets of strings. Since strings are primitive, the equality method is simple.

```typescript
class SetOfStrings extends SetWithEquality<string> {
    equal(a: string, b: string): boolean {
        return a === b;
    }
}
```

Our description of the group can be translated as follows.

```typescript
const KleinFourGroup = new Group<string>({
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

## Groups of matrices

This example requires some prior knowledge of matrices and linear algebra.

If `F` is a field (or even just a commutative ring) and `n` is a non-negative integer, there is a group `GL_n(F)` of invertible matrices over `F` of size `n`, called the _general linear group_.

In this section, we will implement the special case when `n = 2` and `F = F_2` is the field with two elements, and indicate how it can be generalized.

### Implementation

The modulo operator in JavaScript does not behave correctly, since `-1 % 2 = -1` &ndash; it should be `1`. We need to redefine it.

```typescript
function mod(a: number, r: number) {
    return ((a % r) + r) % r;
}
```

In JavaScript, matrices can be modeled with two-dimensional arrays. We filter out the invertible matrices by the condition that the determinant is non-zero (modulo `2`). We use the `squareOfArray` utility function from Part 1.

```typescript
const matrices = squareOfArray(squareOfArray(interval(2)));

const invertibleMatrices = matrices.filter(
    ([[a, b], [c, d]]) => mod(a * d - b * c, 2) !== 0,
);
```

Next, we have to define a class for sets of such matrices. We also calculate modulo `2`.

```typescript
class SetOfMatrices extends SetWithEquality<number[][]> {
    equal(a: number[][], b: number[][]): boolean {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            const row_a = a[i];
            const row_b = b[i];
            if (row_a.length !== row_b.length) return false;
            for (let j = 0; j < row_a.length; j++) {
                if (mod(row_a[j], 2) !== mod(row_b[j], 2))
                    return false;
            }
        }
        return true;
    }
}
```

Now we can define the group of invertible matrices. The unit element is the unit matrix. The [formula for the inverse of a matrix](https://en.wikipedia.org/wiki/Invertible_matrix#Inversion_of_2_%C3%97_2_matrices) is a little bit easier since, here, the determinant is always `1`. For composition, we use matrix multiplication.

```typescript
const GL2_F2 = new Group<number[][]>({
    set: new SetOfMatrices(invertibleMatrices),
    unit: [
        [1, 0],
        [0, 1],
    ],
    inverse: ([[a, b], [c, d]]) => [
        [mod(d, 2), mod(-b, 2)],
        [mod(-c, 2), mod(a, 2)],
    ],
    compose: ([[a, b], [c, d]], [[p, q], [r, s]]) => [
        [mod(a * p + b * r, 2), mod(a * q + b * s, 2)],
        [mod(c * p + d * r, 2), mod(c * q + d * s, 2)],
    ],
});
```

As always, let us test this implementation:

```typescript
console.assert(GL2_F2.order === 6);
console.assert(GL2_F2.isCommutative === false);
```

Since this does not throw an error, this shows in particular that the group axioms are verified.

### Generalization

This example can be extended to a much more general construction. It is possible to define a generic class `CommRing<X>` for commutative rings in TypeScript. The interface looks like this:

```typescript
interface CommRingData<X> {
    set: SetWithEquality<X>;
    zero: X;
    one: X;
    addition: (a: X, b: X) => X;
    inverse: (a: X) => X;
    multiplication: (a: X, b: X) => X;
}
```

The general linear group will be a function of type:

```typescript
function GL<X>(n: number, R: CommRing<X>): Group<X>;
```

## Conclusion

This part was about implementing more concrete examples of finite groups within TypeScript. In the next part, we will investigate how more interesting groups can be constructed from simpler ones, and how groups can be compared with each other.
