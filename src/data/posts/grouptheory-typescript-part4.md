---
title: Group theory in TypeScript (Part 4)
published: 2023-07-08
updated: 2023-07-09
description: Let's implement general constructions of groups!
---

## Introduction

This is Part 4 of a series about modeling [group theory](https://en.wikipedia.org/wiki/Group_theory) within TypeScript. In previous parts, we already developed the basics of groups and their homomorphisms and looked at several examples. If you haven't checked them out yet, start with [Part 1](/blog/grouptheory-typescript-part1).

The goal of this part is to show that general constructions of groups can be carried out in our system. Specifically, we will demonstrate this with [direct products of groups](https://en.wikipedia.org/wiki/Direct_product_of_groups) as well as [subgroups](https://en.wikipedia.org/wiki/Subgroup). We will also define the [kernel](<https://en.wikipedia.org/wiki/Kernel_(algebra)>) and [image](<https://en.wikipedia.org/wiki/Image_(mathematics)>) of a group homomorphism. I assume that you are familiar with group theory already.

All of the code below can be found on [GitHub](https://github.com/ScriptRaccoon/group-theory-typescript).

## Direct products

### Construction of direct products

The direct product of groups is based on the direct product of sets. In our system, sets are instances of a generic class `SetWithEquality<X>`. Remember that we needed a custom notion of equality so that arrays behave as expected.

So we have to construct products of sets with equality first. Surely, equality is implemented "component-wise".

```typescript
function ProductOfSets<X, Y>(
    A: SetWithEquality<X>,
    B: SetWithEquality<Y>,
): SetWithEquality<[X, Y]> {
    const product: [X, Y][] = [];
    for (const a of A) {
        for (const b of B) {
            product.push([a, b]);
        }
    }

    return new SetWithEquality<[X, Y]>(
        product,
        ([a1, b1], [a2, b2]) => A.equal(a1, a2) && B.equal(b1, b2),
    );
}
```

The group operations in a direct product of groups are also defined "component-wise". We can implement them accordingly. The following function yields for every pair of groups `A` and `B` a new group `productOfGroups(A,B)`, which stands for the direct product `A x B`.

```typescript
function productOfGroups<X, Y>(
    A: Group<X>,
    B: Group<Y>,
): Group<[X, Y]> {
    return new Group<[X, Y]>({
        set: ProductOfSets(A.set, B.set),
        unit: [A.unit, B.unit],
        inverse: ([a, b]) => [A.inverse(a), B.inverse(b)],
        compose: ([a1, b1], [a2, b2]) => [
            A.compose(a1, a2),
            B.compose(b1, b2),
        ],
    });
}
```

The type system has helped us here since it catches errors during development. For example, try to replace the result of the compose function above with

```typescript
[A.compose(a1, b1), B.compose(a2, b2)];
```

The TypeScript compiler will inform us about a type error. Also, when you accidentally type

```typescript
[A.compose(a1, a1), B.compose(b1, b2)];
```

the editor will tell you that `a2` is declared but never used. This means that the whole setup almost _forces_ us to write the correct implementation.

But as always, let us also test the implementation in an example.

```typescript
const Zmod7 = additiveGroupModulo(7)!;
const S3 = symmetricGroup(3)!;
const Zmod7_x_S3 = productOfGroups(Zmod7, S3);
console.assert(Zmod7_x_S3.isGroup);
console.assert(!Zmod7_x_S3.isCommutative);
console.assert(Zmod7_x_S3.order === 42);
```

### The Klein Four-Group as a direct product

There is an isomorphism between the Klein Four-Group (from [Part 2](/blog/grouptheory-typescript-part2)) and the direct product of `Z/2Z` with itself. The idea is to send `e` to `[0,0]` (which is forced by the homomorphism property) and map the other three source elements `a`, `b`, `c` randomly\* to the other target elements `[1,0]`, `[0,1]`, `[1,1]`.

Let us implement this!

```typescript
const Zmod2 = additiveGroupModulo(2)!;

const table: Record<string, [number, number]> = {
    e: [0, 0],
    a: [1, 0],
    b: [0, 1],
    c: [1, 1],
};

const isomKlein = new HomomorphismOfGroups({
    source: KleinFourGroup,
    target: productOfGroups(Zmod2, Zmod2),
    map: (x) => table[x],
});

console.assert(isomKlein.isIsomorphism);
```

\*Any permutation is allowed since we have seen in the previous part that `GL_2(F_2)` and `S_3` are isomorphic.

### Properties of the direct product

It is a general fact that the groups `A x B` and `B x A` are isomorphic. We can construct this isomorphism as follows:

```typescript
function isomSwap<X, Y>(A: Group<X>, B: Group<Y>) {
    return new HomomorphismOfGroups<[X, Y], [Y, X]>({
        source: productOfGroups(A, B),
        target: productOfGroups(B, A),
        map: ([a, b]) => [b, a],
    });
}
```

And test it:

```typescript
const swap = isomSwap(Zmod7, S3);
console.assert(swap.isIsomorphism);
```

Direct products are characterized by a _universal property_. I will not explain this in full detail, but one part of it is very simple, actually: Given two homomorphisms of groups

`f : C ---> A`, `g : C ---> B`,

we can construct a homomorphism

`(f,g) : C ---> A x B`, `(f,g)(c) := (f(c),g(c))`.

The homomorphism property is easy to check. We can implement this construction as follows.

```typescript
function pairHom<X, Y, Z>(
    f: HomomorphismOfGroups<Z, X>,
    g: HomomorphismOfGroups<Z, Y>,
) {
    if (f.source !== g.source) {
        console.error("Error: Sources do not match");
        return undefined;
    }

    return new HomomorphismOfGroups<Z, [X, Y]>({
        source: f.source,
        target: productOfGroups(f.target, g.target),
        map: (c) => [f.map(c), g.map(c)],
    });
}
```

We can also define the projection homomorphisms `A x B ---> A` and `A x B ---> B` and formulate the universal property with these, but as already indicated many times before it is unfortunately not possible to verify anything like this in full generality with our code alone. We still have to rely on mathematics for proof.

At least, the TypeScript compiler helps us to write down _meaningful formulas_. For example, in the code above we cannot replace `g.map(c)` with `f.map(c)` without the TypeScript compiler yelling at us. Indeed, this is a type error.

When there is a type error, the implementation is incorrect for sure. But the converse is also true quite often. I found that oftentimes when implementing a general function like the one above, it will be correct once no type errors are left. This extra confidence during development is the reason why a strongly typed language is suitable for the system developed here.

TypeScript's autocompletion also helps a lot during development. When we type `G.` (with the dot) for a group `G`, we automatically get all the available methods for groups.

## Subgroups

### Construction of subgroups

For making sense of subgroups, we first have to make sense of subsets. This may sound a bit trivial, but we just have to take care of inheriting the equality method.

We add a `subset` method to our `SetWithEquality<X>` class that generates a subset from a list of elements. These elements should belong to the set so that some error handling is required.

```typescript
class SetWithEquality<X> extends Set<X> {
    // ...

    subset(list: X[]): SetWithEquality<X> {
        if (list.some((a) => !this.contains(a))) {
            console.error("Error: Subset property is not satisfied");
        }

        return new SetWithEquality<X>(list, this.equal);
    }
}
```

For example, `Zmod2.set.subset([0])` declares the subset of the underlying set of `Z/2Z` (which is `{0,1}`) that just consists of the zero.

Now, a subgroup of a group consists of a subset of the underlying set with all group operations being inherited from the whole group. Of course, this deserves only the name _subgroup_ when the result is indeed a group. But remember that we already included the check for all group axioms in the `Group<X>` constructor, so we do not need to repeat it here:

```typescript
class Group<X> {
    // ...

    subgroupOfList(list: X[]): Group<X> {
        return new Group<X>({
            set: this.set.subset(list),
            unit: this.unit,
            compose: this.compose,
            inverse: this.inverse,
        });
    }
}
```

We can then check for the subgroup property with the method `subgroupOfList(...).isGroup`.

```typescript
console.assert(Zmod6.subgroupOfList([0]).isGroup);
console.assert(!Zmod6.subgroupOfList([1]).isGroup);
console.assert(Zmod6.subgroupOfList([0, 2, 4]).isGroup);
```

For later usage, we also add a method that checks if a group is trivial:

```typescript
get isTrivial(): boolean {
    return this.order === 1;
}
```

### Kernels and Images

Many examples of subgroups arise from homomorphisms. Every homomorphism `f : A ---> B` yields a [kernel](<https://en.wikipedia.org/wiki/Kernel_(algebra)>), which is a subgroup of `A`, and an [image](<https://en.wikipedia.org/wiki/Image_(mathematics)>), which is a subgroup of `B`.

To implement these two subgroups, we extend the `HomomorphismOfGroups<X,Y>` class as follows:

```typescript
export class HomomorphismOfGroups<X, Y> {
    // ...

    get kernel(): Group<X> {
        // source elements that map to the unit
        const elements = this.source.elements.filter((a) =>
            this.target.set.equal(this.map(a), this.target.unit),
        );
        return this.source.subgroupOfList(elements);
    }

    get image(): Group<Y> {
        //  target elements that have a preimage
        const elements = this.target.elements.filter((b) =>
            this.source.elements.some((a) =>
                this.target.set.equal(this.map(a), b),
            ),
        );
        return this.target.subgroupOfList(elements);
    }
}
```

We can test this implementation with all the homomorphisms from the [previous part](/blog/grouptheory-typescript-part3). For example, when `isomGL2` denotes the isomorphism from `S3` to `GL_2(F_2)`, then

```typescript
console.assert(isomGL2.kernel.isTrivial);
console.assert(isomGL2.image.order === 6);
```

When `signum` denotes the sign homomorphism `S_3 ---> {+1,-1}`, we get:

```typescript
console.assert(signum.kernel.order === 3);
console.assert(signum.kernel.isCyclic);
console.assert(signum.image.order === 2);
```

### Generated subgroups

If `S` is any subset of the underlying set of a group `G`, we wish to build the smallest subgroup of `G` which contains `S`. This is the subgroup [generated by](https://en.wikipedia.org/wiki/Generating_set_of_a_group) `S`.

The following pseudo-algorithm constructs the elements of this group:

We build the list of elements step by step and start with `[e]` (where `e` is the unit). For every element `s` of `S`, we compute the products `g * s` with all the elements `g` from the list. If no product is new, we are done: we return the list of elements with the inherited group operations. Otherwise, we add all of them to the list (without duplicates). Now, we continue with that larger list.

In our code, we can do this with a `while` loop which runs as long as new elements have been found. The process of finding new elements will be extracted into its own function\* for better readability.

```typescript
class Group<X> {
    // ...

    subgroupGeneratedBy(generators: X[]): Group<X> {
        let elements = [this.unit];
        let done = false;

        const getNewElements = (): X[] => {
            const newElements = [];
            for (const element of elements) {
                for (const generator of generators) {
                    const product = this.compose(element, generator);
                    const isOld = elements
                        .concat(newElements)
                        .some((s) => this.set.equal(s, product));
                    if (!isOld) newElements.push(product);
                }
            }
            return newElements;
        };

        while (!done) {
            const newElements = getNewElements();
            done = newElements.length === 0;
            elements = elements.concat(newElements);
        }

        return new Group<X>({
            set: this.set.subset(elements),
            unit: this.unit,
            compose: this.compose,
            inverse: this.inverse,
        });
    }
}
```

\*It has to be an arrow function since otherwise, `this` would not refer to the class instance anymore.

We should test this extensively. First, some tests with cyclic groups.

```typescript
console.assert(Zmod6.subgroupGeneratedBy([]).isTrivial);
console.assert(Zmod6.subgroupGeneratedBy([1]).order === 6);
console.assert(Zmod6.subgroupGeneratedBy([2]).order === 3);
console.assert(Zmod6.subgroupGeneratedBy([3]).order === 2);
console.assert(Zmod6.subgroupGeneratedBy([4]).order === 3);
```

The Klein Four-Group is generated by `a` and `b`:

```typescript
console.assert(
    KleinFourGroup.subgroupGeneratedBy(["a", "b"]).order == 4,
);
```

In the symmetric group on 3 elements, 2-cycles generate subgroups of order 2:

```typescript
console.assert(S3.subgroupGeneratedBy([[1, 0, 2]]).order == 2);
console.assert(S3.subgroupGeneratedBy([[0, 2, 1]]).order == 2);
```

Each 3-cycle generates the subgroup of order 3:

```typescript
console.assert(S3.subgroupGeneratedBy([[1, 2, 0]]).order == 3);
```

And two 2-cycles generate the whole group:

```typescript
console.assert(
    S3.subgroupGeneratedBy([
        [1, 0, 2],
        [0, 2, 1],
    ]).order == 6,
);
```

### Center of a group

The center of a group is the subgroup consisting of all elements which commute with all other elements. In the implementation, we can reuse the `isCommutingPair` method from the first part.

```typescript
class Group<X> {
    // ...

    get center(): Group<X> {
        const elements = this.elements.filter((a) =>
            this.elements.every((b) => this.isCommutingPair([a, b])),
        );
        return this.subgroupOfList(elements);
    }
}
```

The center of all symmetric groups is trivial (except for `S_2`). Let us test this by example:

```typescript
const S5 = symmetricGroup(5)!;
console.assert(S5.order === 120);
console.assert(S5.center.isTrivial);
```

## Conclusion

We have seen that many basic notions and constructions of (finite) group theory can be implemented in our TypeScript system. It is only a matter of exercise to also add all other constructions: normal subgroups, quotient groups, semi-direct products, automorphism groups, conjugation homomorphisms, conjugacy classes, group actions, and so on.

But let's leave it like that for now. Maybe I will add material to the [repository](https://github.com/ScriptRaccoon/group-theory-typescript) later, but this will not be discussed anymore in this blog.

We have also discussed why the type system helps us during development to write the correct implementation. On the other hand, JavaScript, which all this compiles down to, is not very fast compared to other languages. So the system that we developed here will not be suitable for heavy computations with large finite groups.

This project showcases that an abstract mathematical theory can be modeled quite well with TypeScript, the most important concept being generic classes and their methods. Group theory is just an example, other theories can be implemented as well using the same pattern.
