---
title: Group theory in TypeScript (Part 3)
published: 2023-07-04
updated: 2023-07-08
description: Let's bring group homomorphisms to TypeScript!
---

## Introduction

This is Part 3 of a series about modeling [group theory](https://en.wikipedia.org/wiki/Group_theory) within TypeScript.
In [Part 1](/blog/grouptheory-typescript-part1) we developed the basics, and in [Part 2](/blog/grouptheory-typescript-part2) we studied more examples.

The goal of this part is to add theory and examples of [group homomorphisms](https://en.wikipedia.org/wiki/Group_homomorphism) to our TypeScript code. We also connect them to [orders of group elements](<https://en.wikipedia.org/wiki/Order_(group_theory)>).

In contrast to the previous parts, in this part, I will not explain the mathematical background anymore. I assume that you are familiar with group theory already.

All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## Homomorphisms

### Homomorphism class

A homomorphism of groups consists of two groups and a map (that is, a function) between their underlying sets, satisfying the condition that group composition is preserved in an appropriate sense. It turns out that then the unit and inverse operation are also preserved.

Since this is a concept on its own, and we certainly want to add methods to study homomorphisms, it makes sense to define a generic class for it.

First, let's define the generic interface.

```typescript
interface HomomorphismOfGroupsData<X, Y> {
	source: Group<X>
	target: Group<Y>
	map: (x: X) => Y
}
```

Now, we define a class that implements this interface.

```typescript
class HomomorphismOfGroups<X, Y> implements HomomorphismOfGroupsData<X, Y> {
	public source: Group<X>
	public target: Group<Y>
	public map: (x: X) => Y

	constructor(data: HomomorphismOfGroupsData<X, Y>) {
		const { source, target, map } = data
		this.source = source
		this.target = target
		this.map = map

		// TODO: check homomorphism property
	}
}
```

This means that, when `h` is a homomorphism in our system, `h.source` refers to the source group, `h.target` refers to the target group, and `h.map` refers to the actual map.

The homomorphism property consists of two parts. First, we need to check that the map actually operates between the underlying sets. Remember that our type assertions are not enough for that since the generic types differ from the underlying sets of the groups.

This is why we add the following check as a class method. It says that the map sends every element of the source set to an element in the target set.

```typescript
get isClosed(): boolean {
    return this.source.elements.every((a) =>
        this.target.set.contains(this.map(a))
    );
}
```

Next, we check the homomorphism property. As before, we first implement a helper method that checks this for a single pair.

```typescript
// this says f(a * b) = f(a) * f(b)
isHomomorphicPair([a, b]: [X, X]): boolean {
    return this.target.set.equal(
        this.map(this.source.compose(a, b)),
        this.target.compose(this.map(a), this.map(b))
    );
}

get isHomomorphism(): boolean {
    const pairs = squareOfArray(this.source.elements);
    return (
        this.isClosed &&
        pairs.every(this.isHomomorphicPair.bind(this))
    );
}
```

We add this check to the constructor:

```typescript
constructor(...) {
    // ...
    if (!this.isHomomorphism) {
        console.error("Error: Homomorphism property is not satisfied");
    }
}
```

### Types of homomorphisms

There are three special types of homomorphisms: injective, surjective and bijective homomorphisms. Bijective homomorphisms of groups are exactly the [isomorphisms of groups](https://en.wikipedia.org/wiki/Isomorphism).

We can easily add getter methods to check these properties.

```typescript
// this says a != b ==> f(a) != f(b) for all source elements a,b
get isInjective(): boolean {
    const pairs = squareOfArray(this.source.elements);
    return pairs.every(
        ([a, b]) =>
            this.source.set.equal(a, b) ||
            !this.target.set.equal(this.map(a), this.map(b))
    );
}

// this says that every target element is of the form f(a)
get isSurjective(): boolean {
    return this.target.elements.every((b) =>
        this.source.elements.some((a) =>
            this.target.set.equal(this.map(a), b)
        )
    );
}

get isIsomorphism(): boolean {
    return this.isInjective && this.isSurjective;
}
```

## Examples of homomorphisms

### A basic example of an injective homomorphism

There is a basic example of a homomorphism from $\mathbb{Z}/2\mathbb{Z}$ to $\mathbb{Z}/4\mathbb{Z}$ which maps $0 \mapsto 0$ and $1 \mapsto 2$. We can implement this with our class as follows.

```typescript
const Zmod2 = additiveGroupModulo(2)!
const Zmod4 = additiveGroupModulo(4)!

const emb = new HomomorphismOfGroups({
	source: Zmod2,
	target: Zmod4,
	map: (a) => 2 * a,
})
```

And in fact, these assertions are true:

```typescript
console.assert(emb.isHomomorphism)
console.assert(!emb.isSurjective)
console.assert(emb.isInjective)
```

I really like the syntax here. A mathematician would say something like: "We define a homomorphism of groups with source Z modulo 2 and target Z modulo 4 which maps a to 2 \* a", and this is _exactly_ what is in our code above!

### A basic example of an isomorphism

The groups $\mathbb{Z}/2\mathbb{Z}$ and $\{+1,-1\}$, which were called `Zmod2` and `SignGroup` in previous parts, are essentially the same: they are [isomorphic](https://en.wikipedia.org/wiki/Isomorphism). We can verify this by defining an isomorphism between these two groups, as follows:

```typescript
const Zmod2 = additiveGroupModulo(2)!

const isomZmod2 = new HomomorphismOfGroups({
	source: Zmod2,
	target: SignGroup,
	map: (a) => (a === 0 ? 1 : -1),
})
```

So, we map $0 \mapsto 1$ and $1 \mapsto -1$. We can run tests to verify that this is, indeed, an isomorphism.

```typescript
console.assert(isomZmod2.isHomomorphism)
console.assert(isomZmod2.isIsomorphism)
```

### The sign homomorphism

There is an interesting example of a homomorphism from any finite symmetric group to $\{+1,-1\}$, called the [sign homomorphism](https://en.wikipedia.org/wiki/Parity_of_a_permutation). Here, we will only cover the special case $S_3$.

The group $S_3$ consists of three 2-cycles, which have the sign $1$, and three other permutations, whose sign is $-1$. The 2-cycles can be distinguished by the fact that they have exactly one fixed point.

This leads to the following implementation.

```typescript
const S3 = symmetricGroup(3)!

const signum = new HomomorphismOfGroups({
	source: S3,
	target: SignGroup,
	map: (a) => {
		const fixedPoints = [0, 1, 2].filter((i) => a[i] === i)
		return fixedPoints.length === 1 ? -1 : 1
	},
})
```

The sign is a surjective homomorphism, but it is not injective and hence not an isomorphism. This is confirmed by our tests:

```typescript
console.assert(signum.isHomomorphism)
console.assert(signum.isSurjective)
console.assert(!signum.isInjective)
console.assert(!signum.isIsomorphism)
```

### An isomorphism of groups of order 6

In the last part, we saw two non-commutative groups of order 6, namely the symmetric group $S_3$ and the group $\mathrm{GL}_2(\mathbb{F}_2)$ of $2 \times 2$ matrices over the field with two elements. It turns out that all non-commutative groups of order 6 are isomorphic. Let us verify this in this example.

The best explanation for this goes as follows. Let $V$ be a 2-dimensional vector space over $\mathbb{F}_2$. There is an obvious restriction homomorphism from

$\mathrm{GL}(V) \to \mathrm{Sym}(V \setminus \{0\})$,

where the latter is the symmetric group on the set of non-zero vectors. It is injective. Both groups have order 6, hence it is an isomorphism. The inverse map is a linear extension. Also, $\mathrm{GL}(V)$ is isomorphic to $\mathrm{GL}_2(\mathbb{F}_2)$, and $\mathrm{Sym}(V \setminus \{0\})$ is isomorphic to $S_3$.

It is possible to go through this proof and find an explicit formula for the isomorphism from $S_3$ to $\mathrm{GL}_2(\mathbb{F}_2)$. This is a good exercise, and the result is implemented below.

```typescript
const isomGL2 = new HomomorphismOfGroups({
	source: S3,
	target: GL2_F2,
	map: (a) => [
		[Number(a[0] !== 1), Number(a[1] !== 1)],
		[Number(a[0] > 0), Number(a[1] > 0)],
	],
})
```

Remember that our permutations are 0-indexed arrays. The `Number` constructor transforms booleans into numbers, so `Number(false)=0` and `Number(true)=1`.

The following test confirms that we have defined an isomorphism.

```typescript
console.assert(isomGL2.isIsomorphism)
```

### Trivial homomorphisms

Between any two groups, there is a very boring example of a homomorphism: the trivial homomorphism that sends everything to the unit element. We can implement this as follows:

```typescript
function trivialHom<X, Y>(G: Group<X>, H: Group<Y>) {
	return new HomomorphismOfGroups({
		source: G,
		target: H,
		map: (a) => H.unit,
	})
}
```

This is indeed a homomorphism, which we can see in an example:

```typescript
const trivialHomExample = trivialHom(S3, Zmod6)
console.assert(trivialHomExample.isHomomorphism)
```

## Orders of elements

### The definition

It is time to add some more group theory to our group class.

Consider an element $a$ of a finite group, whose composition is written multiplicatively. For every positive integer $n \gt 0$ we can form the _power_

$a^n := \underbrace{a * a * \dotsc * a}_{n \text{ factors}}$.

It turns out that there is always an $n$ such that $a^n$ equals the unit of the group. The smallest $n$ with this property is called the _order of $a$_. (This is different from the _order of the group_, which is just the number of all group elements.)

We can implement this as a class method in our group class. We start with the first power of $a$, namely $a$ itself. Then we multiply $a$ to these powers until they have reached the unit of the group.

```typescript
class Group<X> {
	// ...

	orderOfElement(a: X): number {
		let order = 1
		let power = a
		while (!this.set.equal(power, this.unit)) {
			order++
			power = this.compose(power, a)
		}
		return order
	}
}
```

An interesting invariant of a group is the maximal possible order of a group element. This easy to implement:

```typescript
get maximalOrderOfElement(): number {
    return Math.max(
        ...this.elements.map((a) => this.orderOfElement(a)),
    );
}
```

A finite group is _cyclic_ if there is an element whose order is the group order. We can add this property to our class as well:

```typescript
get isCyclic(): boolean {
    return this.maximalOrderOfElement === this.order;
}
```

It turns out that the groups $\mathbb{Z}/n\mathbb{Z}$ are cyclic (the element $1$ has order $n$), and every cyclic group is isomorphic to such a group (more on that later).

Let us test the implementation:

```typescript
console.assert(Zmod6.isCyclic)
console.assert(!S3.isCyclic)
console.assert(S3.orderOfElement(S3.unit) === 1)
console.assert(S3.orderOfElement([1, 0, 2]) === 2)
console.assert(S3.maximalOrderOfElement === 3)
console.assert(KleinFourGroup.maximalOrderOfElement === 2)
```

### Powers

Inside the `orderOfElement` method, we implicitly implemented the power of a group element by a positive integer. We should extract this logic into its own method. But powers are also available for negative exponents (they just have to be integers): in that case, we multiply the inverse element with itself many times.

We can implement this by recursion as follows. For positive exponents $n$, we define $a^n$ by $a * a^{n-1}$. For negative exponents, we define $a^n$ by $i(a)^{-n}$. The base case is $a^0 = e$.

```typescript
power(a: X, n: number): X {
    if (n != Math.floor(n)) {
        console.error(
            "Error: Only whole numbers are allowed for powers",
        );
        return this.unit;
    }
    if (n === 0) {
        return this.unit;
    } else if (n > 0) {
        return this.compose(a, this.power(a, n - 1));
    } else {
        return this.power(this.inverse(a), -n);
    }
}
```

Let us test this:

```typescript
console.assert(KleinFourGroup.power('a', 2) === 'e')
console.assert(S3.set.equal(S3.power([2, 0, 1], 3), [0, 1, 2]))
console.assert(Zmod6.power(2, -1) === 4)
```

### Homomorphisms on cyclic groups

There is a connection between homomorphisms and orders of elements:

If $G$ is a finite group, then

1. homomorphisms $\mathbb{Z}/n\mathbb{Z} \to G$ correspond 1:1 to elements $a$ of $G$ whose order divides $n$,
2. _injective_ homomorphisms $\mathbb{Z}/n\mathbb{Z} \hookrightarrow G$ correspond 1:1 to elements of $G$ whose order is _equal_ to $n$.

The second statement immediately implies the already mentioned classification of cyclic groups. I will not explain the proof but would like to make the correspondence more explicit.

In one direction, we evaluate a homomorphism at the element $1$ of $\mathbb{Z}/n\mathbb{Z}$ (remember that the underlying set was $0,1,...,n-1$ in our construction of that group) to get an element of $G$. Conversely, given an element $a$ of $G$ whose order divides $n$ (this just means $a^n = e$), we take the map which maps $k$ to the power $a^k$.

Let's implement this as a general function, that produces for every triple $(a,G,n)$ as above a homomorphism $\mathbb{Z}/n\mathbb{Z} \to G$:

```typescript
function homFromTorsion<X>(
	a: X,
	G: Group<X>,
	n: number,
): HomomorphismOfGroups<number, X> | undefined {
	// TODO: error handling when n is not a positive integer
	const Zmodn = additiveGroupModulo(n)!

	const power = G.power(a, n)

	if (!G.set.equal(power, G.unit)) {
		console.error('Error: The element is not n-torsion.')
		return undefined
	}

	return new HomomorphismOfGroups({
		source: Zmodn,
		target: G,
		map: (k) => G.power(a, k),
	})
}
```

For example, the permutation $[2,0,1]$ has order $3$ in $S_3$, and hence gives rise to an injective homomorphism $\mathbb{Z}/3\mathbb{Z} \hookrightarrow S_3$:

```typescript
const g = homFromTorsion([2, 0, 1], S3, 3)
console.assert(g != undefined)
console.assert(g?.isHomomorphism)
console.assert(g?.isInjective)
```

Let us point out that these are just example verifications. Our TypeScript code cannot give us general proof that the map $\mathbb{Z}/n\mathbb{Z} \to G$ that we defined is a homomorphism, for every group $G$ and every element inside it. For this, a bit of mathematics is necessary.

## Conclusion

For me, the highlight of this part was the isomorphism between the symmetric group $S_3$ and the general linear group $\mathrm{GL}_2(\mathbb{F}_2)$. It is very interesting to see that (a) it can be defined in a very formal and still concrete way, (b) the verification of the isomorphism property can be done by JavaScript.

By now, it should be more or less clear that all topics of finite group theory can be carried out within the system presented here. It could eventually become a proper library for group theory.

However, I will not pursue this (as already mentioned in Part 1, there are better alternatives already available), and instead would like to finish this series with two very basic albeit important topics in group theory: direct products and subgroups. These will be covered in the next part.

→ [Link to Part 4](/blog/grouptheory-typescript-part4)
