---
title: Group theory in TypeScript (Part 2)
published: 2023-06-30
updated: 2023-07-19
description: Let's investigate more interesting examples of groups!
---

## Introduction

[Group theory](https://en.wikipedia.org/wiki/Group_theory) is a fascinating branch of pure mathematics, which allows us to understand arithmetical operations, solutions of algebraic equations, symmetries of geometric objects, cryptographic algorithms, and much more.

This series of posts is about modeling group theory within TypeScript.

In [Part 1](/blog/grouptheory-typescript-part1) we already developed a generic class `Group<X>` which models finite groups whose elements are of type `X`. Their underlying sets are instances of a generic class `SetWithEquality<X>`, which are like sets in TypeScript but with a custom notion of equality of their elements. If you haven't read that post, please check it out first.

In Part 1, we have only seen one specific example of a group in TypeScript. This part will be about implementing further examples of groups. We will look at [cyclic groups](https://en.wikipedia.org/wiki/Cyclic_group), [symmetric groups](https://en.wikipedia.org/wiki/Symmetric_group), the [Klein Four-Group](https://en.wikipedia.org/wiki/Klein_four-group) and the [General linear group](https://en.wikipedia.org/wiki/General_linear_group).

All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## Finite cyclic groups

### Modulo arithmetic

Before giving the definition, let me tell you that you already know an example of a finite cyclic group. When it is 11 o'clock, and we wait 3 hours, it is 2 o'clock. This is because <math>11 + 3 = 14</math> gives the remainder <math>2</math> when divided by <math>12</math>:

<math>14 = 1 \* 12 + 2</math>

And when it is 2 o'clock, what time was it 5 hours before? The answer is 9 o'clock because <math>2-5 = -3</math> leaves the remainder <math>9</math> when divided by <math>12</math>:

<math>-3 = (-1) \* 12 + 9</math>

When we calculate with hours, we calculate inside of the group <math>\mathbb{Z}/12\mathbb{Z}</math>, defined below in a more general fashion.

Let <math>n</math> be a positive integer. There is a group <math>\mathbb{Z}/n\mathbb{Z}</math> of order <math>n</math> (that means, with <math>n</math> elements) constructed as follows:

The underlying set consists of the numbers

<math>0,1,2,\dotsc,n-1</math>.

We take the group operations inherited from the additive group <math>\mathbb{Z}</math> but calculate the result [modulo](https://en.wikipedia.org/wiki/Modulo) <math>n</math>. This means that the composition of <math>a</math> and <math>b</math> is the remainder of <math>a + b</math> divided by <math>n</math>. The inverse of <math>a</math> is the remainder of <math>-a</math> divided by <math>n</math>. This works since the remainder is always in the list <math>0,1,2,\dotsc,n-1</math>.

And it can be simplified even further: If <math>a + b \lt n</math>, then the composition of <math>a,b</math> is just <math>a + b</math>. Otherwise, it is <math>a + b - n</math>. The inverse of <math>0</math> is <math>0</math>, and for <math>0 \lt a \lt n</math> the inverse of <math>a</math> is <math>n - a</math>.

### Implementation of the cyclic group

The next step is to define the group <math>\mathbb{Z}/n\mathbb{Z}</math> (pronounced _Z modulo n_) with our group class. Let us first define a utility function that produces the list of numbers <math>0,1,2,\dotsc,n-1</math>.

```typescript
function interval(n: number): number[] {
	return new Array(n).fill(0).map((_, i) => i)
}
```

Finally:

```typescript
function additiveGroupModulo(n: number): Group<number> | undefined {
	// TODO: error handling

	return new Group<number>({
		set: new SetWithEquality(interval(n)),
		unit: 0,
		inverse: (a) => (a === 0 ? 0 : n - a),
		compose: (a, b) => (a + b >= n ? a + b - n : a + b),
	})
}
```

Since invalid arguments may be passed to the function, we need to add some error handling:

```typescript
if (n <= 0) {
	console.error('Error: Only positive numbers are allowed for Z/nZ')
	return undefined
}

if (n != Math.ceil(n)) {
	console.error('Error: Only whole numbers are allowed for Z/nZ')
	return undefined
}
```

Let us test this by looking at the group <math>\mathbb{Z}/7\mathbb{Z}</math>:

```typescript
const Zmod7 = additiveGroupModulo(7)!
console.assert(Zmod7.isGroup)
console.assert(Zmod7.order === 7)
console.assert(Zmod7.compose(5, 3) === 1)
console.assert(Zmod7.isCommutative)
```

There are more conceptual constructions of the group <math>\mathbb{Z}/n\mathbb{Z}</math> (with quotient groups), but the one above is easier to implement in our setup. There is also an infinite cyclic group, <math>\mathbb{Z}</math>, but as already explained in Part 1, we cannot model it in TypeScript.

## Symmetric groups

### Permutations

For every set <math>X</math>, there is a group that consists of all the bijective functions <math>f : X \to X</math>. A function is _bijective_ if it has an [inverse function](https://en.wikipedia.org/wiki/Inverse_function). This essentially means that <math>f</math> just _permutes_ or _reorders_ the elements of <math>X</math>.

The group composition of two bijective functions <math>f : X \to X</math>, <math>g : X \to X</math> is, well, their composition:

<math>f \circ g : X \to X</math>

This is why it was called like that in the definition of a group! The inverse is, well, the inverse function. The unit is the identity function <math>\mathrm{id}\_X : X \to X</math> which maps every element <math>x</math> to <math>x</math>. It is trivial to check that the group axioms are satisfied.

This is the _symmetric group_ on <math>X</math>. If <math>X</math> is a finite set with <math>n</math> elements, it is usually denoted by <math>S_n</math>. Since we like to start counting with <math>0</math>, it is useful to let

<math>X = \\{0,1,\dotsc,n-1\\}</math>

In mathematics, <math>\\{1,\dotsc,n\\}</math> is more common. But in our case, a function <math>f : X \to X</math> can just be seen as an array of length <math>n</math> which consists of integers smaller than <math>n</math>. The condition that <math>f</math> is bijective means that all integers smaller than <math>n</math> appear exactly once.

For example, <math>S_3</math> consists of the following six permutations, written as arrays:

- <math>[2,0,1]</math>
- <math>[0,2,1]</math>
- <math>[0,1,2]</math>
- <math>[2,1,0]</math>
- <math>[1,2,0]</math>
- <math>[1,0,2]</math>

How do we generate all permutations?

The idea is to do this recursively. For <math>n = 0</math>, there is a unique permutation, the empty array. Otherwise, assume that we know all the permutations of the numbers <math>0,\dotsc,n-2</math>. They are seen as arrays of length <math>n-1</math>. Then, take any of the <math>n</math> spots and insert <math>n-1</math> there. This yields a permutation of the numbers <math>0,\dotsc,n-1</math>, and they all arise this way.

For example, <math>S_2</math> has exactly two permutations, <math>[0,1]</math> and <math>[1,0]</math>. The elements of <math>S_3</math> above result from these by inserting <math>2</math> anywhere.

### Implementation of the symmetric group

We are now able to write a recursive function that generates all permutations of the numbers <math>0,\dotsc,n-1</math>.

```typescript
type permutation = number[]

function listOfPermutations(n: number): permutation[] | undefined {
	// TODO: error handling

	if (n == 0) {
		return [[]]
	}

	const list = listOfPermutations(n - 1)
	if (!list) return undefined

	const result: permutation[] = []

	for (const perm of list) {
		for (let index = 0; index < n; index++) {
			result.push([
				...perm.slice(0, index),
				n - 1,
				...perm.slice(index, perm.length),
			])
		}
	}
	return result
}
```

Again, we need to add some error handling:

```typescript
if (n < 0) {
	console.error(
		'Error: Only non-negative numbers are allowed for list of permutations',
	)
	return undefined
}
if (n != Math.ceil(n)) {
	console.error(
		'Error: Only whole numbers are allowed for list of permutations',
	)
	return undefined
}
```

Next, we implement the symmetric group on <math>n</math> elements. Since its underlying set consists of elements of type `permutation`, we will use the corresponding type for our group class. We also use the function `equalTuples` from Part 1 which implements the "correct" notion of equality for tuples. Otherwise, the group axioms would fail.

```typescript
function symmetricGroup(n: number): Group<permutation> | undefined {
	// TODO: error handling

	const permutations = listOfPermutations(n)
	if (!permutations) return undefined

	return new Group<permutation>({
		set: new SetWithEquality(permutations, equalTuples),
		unit: interval(n),
		inverse: (a) => interval(n).map((y) => a.findIndex((_y) => _y === y)),
		compose: (a, b) => b.map((y) => a[y]),
	})
}
```

Let me explain this a bit more:

The unit is the array <math>[0,\dotsc,n-1]</math>, which is just the interval we implemented before.

The inverse of a permutation <math>a</math> is the permutation that maps a number <math>y</math> to the (unique) number <math>x</math> with <math>y = a(x)</math>. Since we are working with arrays, <math>x</math> is just the index of <math>y</math> inside of the array <math>a</math>.

The composition <math>c(a,b)</math> is defined by <math>c(a,b)(x) := a(b(x))</math>. This means that the array corresponding to <math>c(a,b)</math> results from the array for <math>b</math> by applying <math>a</math> to all of its entries, i.e., by mapping it via <math>a</math>.

Let us test that <math>S_3</math> behaves as we expect.

```typescript
const S3 = symmetricGroup(3)!
console.assert(S3.isGroup)
console.assert(!S3.isCommutative)
console.assert(S3.order === 6)
console.assert(S3.set.equal(S3.inverse([1, 2, 0]), [2, 0, 1]))
```

Let's not forget the error handling:

```typescript
if (n < 0) {
	console.error('Error: Only non-negative numbers are allowed for S_n')
	return undefined
}
if (n != Math.ceil(n)) {
	console.error('Error: Only whole numbers are allowed for S_n')
	return undefined
}
```

## Klein Four-Group

There is a group that has exactly four elements <math>e,a,b,c</math> such that (we write the group composition as multiplication here)

- <math>e</math> is the unit
- every element is inverse to itself (<math>a \* a = e</math>, etc.)
- <math>a \* b = b \* a = c</math>
- <math>a \* c = c \* a = b</math>
- <math>b \* c = c \* b = a</math>

So when multiplying two distinct non-units, the result is always the other of the three elements.

This is called the Klein Four-Group, named after the mathematician _Felix Klein_. Let's implement it in our code!

```typescript
const KleinFourGroup = new Group<string>({
	set: new SetWithEquality(['e', 'a', 'b', 'c']),
	unit: 'e',
	inverse: (x) => x,
	compose: (x, y) => {
		if (x === 'e') return y
		if (y === 'e') return x
		if (x === y) return 'e'
		return ['a', 'b', 'c'].find((u) => u !== x && u !== y)!
	},
})
```

Notice that we have to tell TypeScript that the result of the `find` method is not undefined, using the `!` operator. Otherwise, it will complain.

Let us test our implementation:

```typescript
console.assert(KleinFourGroup.isGroup)
console.assert(KleinFourGroup.order === 4)
console.assert(KleinFourGroup.isCommutative)
console.assert(KleinFourGroup.compose('a', 'b') === 'c')
```

## Groups of matrices

This example requires some prior knowledge of matrices and linear algebra.

If <math>F</math> is a field (or even just a commutative ring) and <math>n</math> is a non-negative integer, there is a group <math>\mathrm{GL}\_n(F)</math> of invertible matrices over <math>F</math> of size <math>n</math>, called the _general linear group_.

In this section, we will implement the special case when <math>n = 2</math> and <math>F = \mathbb{F}\_2</math> is the field with two elements, and indicate how it can be generalized.

### Implementation

The modulo operator `%` in JavaScript does not behave correctly (from a mathematician's point of view), since `-1 % 2 = -1`. It should be `1`. We need to redefine it.

```typescript
function mod(a: number, r: number) {
	return ((a % r) + r) % r
}
```

In JavaScript, matrices can be modeled with two-dimensional arrays. The matrices here have only <math>0,1</math> as entries. We filter out the invertible matrices by the condition that the determinant is non-zero (modulo <math>2</math>). We use the `squareOfArray` utility function from Part 1.

```typescript
type matrix = number[][]

const matrices: matrix[] = squareOfArray(squareOfArray(interval(2)))

const invertibleMatrices: matrix[] = matrices.filter(
	([[a, b], [c, d]]) => mod(a * d - b * c, 2) !== 0,
)
```

Next, we have to define the correct notion of equality for matrices.

```typescript
function equalMatrices<T>(a: T[][], b: T[][]): boolean {
	return (
		a.length === b.length &&
		a.every((_, index) => equalTuples(a[index], b[index]))
	)
}
```

Now we can define the group of invertible matrices. The unit element is the unit matrix. The [formula for the inverse of a matrix](https://en.wikipedia.org/wiki/Invertible_matrix#Inversion_of_2_%C3%97_2_matrices) is a little bit easier since, here, the determinant is always <math>1</math>. For composition, we use matrix multiplication modulo <math>2</math>.

```typescript
const GL2_F2 = new Group<matrix>({
	set: new SetWithEquality(invertibleMatrices, equalMatrices),
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
})
```

As always, let us test this implementation:

```typescript
console.assert(GL2_F2.isGroup)
console.assert(GL2_F2.order === 6)
console.assert(!GL2_F2.isCommutative)
```

### Generalization

This example can be extended to a much more general construction. It is possible to define a generic class `CommRing<X>` for commutative rings in TypeScript. The interface looks like this:

```typescript
interface CommRingData<X> {
	set: SetWithEquality<X>
	zero: X
	one: X
	addition: (a: X, b: X) => X
	inverse: (a: X) => X
	multiplication: (a: X, b: X) => X
}
```

The general linear group will be a function of type:

```typescript
function GL<X>(n: number, R: CommRing<X>): Group<X>
```

## Conclusion

This part was about implementing more concrete examples of finite groups within TypeScript. In the next parts, we will investigate how more interesting groups can be constructed from simpler ones, and how groups can be compared with each other.

→ [Link to Part 3](/blog/grouptheory-typescript-part3)
