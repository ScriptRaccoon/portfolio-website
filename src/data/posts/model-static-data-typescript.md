---
title: Modeling static data in TypeScript
published: 2025-02-16
updated:
description: How to create a type-safe, read-only "database" in TypeScript
---

## Introduction

I'm currently working on a [large project](/projects/catdat) that is primarily written in TypeScript. For this project, I need a kind of database where the data remains unchanged at runtime. Using TypeScript to define such a "static database" offers several advantages — most notably, improved application performance and easier development. The interesting part is translating database concepts into TypeScript. The challenge begins right away with defining the types for the data, which is exactly what I'll explore in this blog post.

## What we want to achieve

Let's say we want to define certain "gadgets" in our application, each with the following properties (and possibly more):

```ts
type Gadget = {
	id: string;
	name: string;
	description: string;
};
```

We can represent a "table" of gadgets as an array of `Gadget` objects:

```ts
const GADGETS: Gadget[] = [
	{
		id: "spoon",
		name: "Spoon",
		description:
			"A spoon is a utensil consisting of a small shallow bowl (also known as a head), oval or round, at the end of a handle.",
	},
	{
		id: "fork",
		name: "Fork",
		description:
			"A fork is a tool consisting of a handle with several narrow tines on one end.",
	},
	{
		id: "knife",
		name: "Knife",
		description:
			"A knife is a tool with a cutting edge or blade attached to a handle.",
	},
	// ...
];
```

For this example, we'll stick to three gadgets, but in a real application, there could be hundreds. Whatever approach we take should scale accordingly.

Now, let's say another "table" needs to reference these gadgets:

```ts
type Drawer = {
	id: string;
	gadgets: GadgetID[];
	description: string;
};

const DRAWERS: Drawer[] = [
	{
		id: "1",
		gadgets: ["fork", "spoon"],
		description: "...",
	},
	// ...
];
```

Naturally, we don't want to duplicate gadgets in our "table" — we want to reference them by their ID, mimicking the concept of a foreign key. This means we need a way to define the `GadgetID` type. Simply typing the `gadgets` array as `string[]` isn't sufficient: TypeScript won't warn us about invalid or deleted IDs, nor will it provide autocompletion.

## Separate ID list

Here's an initial solution. While it works, it introduces code duplication, so I wouldn't recommend using it.

We start by defining an array of all possible gadget IDs. By declaring it `as const`, we can derive the `GadgetID` type as a union of its values:

```ts
const GADGET_IDS = ["spoon", "fork", "knife"] as const;

// Union type: 'spoon' | 'fork' | 'knife'
type GadgetID = (typeof GADGET_IDS)[number];

type Gadget = {
	id: GadgetID;
	name: string;
	description: string;
};
```

The `GADGETS` array remains unchanged, and the type-checking issue is resolved.

However, there's a significant drawback: every time we add a new gadget, we also need to manually update the `GADGET_IDS` array. This is both error-prone and inconvenient. Worse yet, we no longer have a single source of truth for gadget IDs — the data is now duplicated.

## Deriving IDs from data

A better approach is to declare the `GADGETS` array `as const` and define the type for gadget IDs based on its values.

```ts
const GADGETS = [
	{
		id: "spoon",
		name: "Spoon",
		description: "...",
	},
	// ...
] as const;

// Union type: 'spoon' | 'fork' | 'knife'
type GadgetID = (typeof GADGETS_INDEX)[number]["id"];
```

This solution is much better since we now have a single source of truth for gadget IDs. As in the first solution, we also get autocompletion and validation when referencing gadgets in a drawer.

For example, `gadgets: ["fork", ""]` is not allowed. But if we start typing inside the empty string, TypeScript suggests the available IDs, making it easy to pick the correct one. This is particularly useful when dealing with hundreds of gadgets.

However, this solution isn't quite complete. The gadgets themselves no longer have an explicit type, meaning there's no validation for their data. Fortunately, there are at least three ways to address this issue.

### Variant 1: Using `satisfies` for type validation

One way to restore type validation is to explicitly define the `Gadget` type, then use the `satisfies` keyword to ensure the array entries are compatible with it. Unlike a type cast, `satisfies` does not alter the type of the array itself, preserving the literal types needed for the `GadgetID` union.

```ts
type Gadget = {
	id: string;
	name: string;
	description: string;
};

const GADGETS = [
	{
		id: "spoon",
		name: "Spoon",
		description: "...",
	},
	// ...
] as const satisfies Gadget[];
```

With this, if a gadget is missing a required property — such as `name` — TypeScript will immediately report an error:

```
Property 'name' is missing in type ...
```

### Variant 2: Keeping `GADGETS` as `Gadget[]`

While Variant 1 provides strong type safety, it results in `GADGETS` being treated as a huge literal type instead of a simple `Gadget[]`. This can make it cumbersome to work with in the application and may lead to overly strict type errors.

To solve this, we create a separate reference that explicitly uses `Gadget[]`, while keeping the original `as const` array as `GADGETS_INDEX`:

```ts
const GADGETS_INDEX = [
	// ...
] as const;

const GADGETS: Gadget[] = GADGETS_INDEX;
```

This way, `GADGETS_INDEX` still provides a source of truth for the ID union type, while `GADGETS` remains a more usable `Gadget[]`.

### Variant 3: Ensuring `GadgetID` is preserved

There's still one minor issue: if we extract an ID from `GADGETS`, it is inferred as `string` instead of `GadgetID`.

```ts
const spoonID = GADGETS[0].id; // Type: string (but we want GadgetID)
```

To fix this, we modify our `Gadget` type so that `id` is explicitly of type `GadgetID`:

```ts
type Gadget = {
	id: GadgetID;
	name: string;
	description: string;
};
```

However, this alone causes a circular reference error:

```
Type alias 'GadgetID' circularly references itself.
```

This happens because:

1. The `GADGETS` array is used to define `GadgetID`.
2. `GadgetID` is then used in the `Gadget` type.
3. The `Gadget` type is used to validate `GADGETS`.

To break this cycle, we remove the `satisfies` keyword from `GADGETS_INDEX` and keep it `as const`. We then validate the final `GADGETS` array by explicitly typing it:

```ts
const GADGETS: readonly Gadget[] = GADGETS_INDEX;
```

Adding `readonly` ensures TypeScript accepts this conversion. If you prefer, you can also use:

```ts
const GADGETS: Gadget[] = Array.from(GADGETS_INDEX);
```

The only minor drawback of this approach is that TypeScript will report validation errors on the `GADGETS` declaration rather than the individual gadget entries. However, the error messages are still clear and specific, making this the most practical and robust solution.

## Modeling relationships

So far, we've seen that drawer objects can reference gadgets. But what if gadgets need to reference other gadgets? This is indeed possible:

```ts
type Gadget = {
	id: GadgetID;
	name: string;
	description: string;
	related?: readonly GadgetID[];
};

const GADGETS_INDEX = [
	{
		id: "spoon",
		name: "Spoon",
		description: "...",
		related: ["fork", "knife"],
	},
	// ...
] as const;
```

However, this approach has some drawbacks:

1. **The data is no longer normalized.** Relationships are embedded within the gadget definitions rather than stored separately.
2. **The array becomes difficult to manage** as the number of gadgets grows.
3. **No autocompletion for related gadgets.** Since `related` is part of an `as const` array, TypeScript won't validate its entries immediately — it only checks for correctness when the `GADGETS` array is assigned.

In a database, we would typically store relationships in a separate table. We can follow the same principle in TypeScript by defining a separate array for gadget relationships.

```ts
type GadgetRelation = Record<GadgetID, GadgetID[]>;

const GADGET_RELATIONS: GadgetRelation = {
	spoon: ["fork", "knife"],
	fork: ["spoon", "knife"],
	knife: ["spoon", "fork"],
};
```

With this approach, TypeScript enforces that only valid IDs are used. Moreover, the relationship data is now distinct from gadget definitions, making both easier to manage. In particular, with hundreds of gadgets, maintaining relationships separately avoids cluttering the main `GADGETS` array.

By default, the `GadgetRelation` type requires every gadget to have an entry. This is useful because even gadgets with no relationships will explicitly map to an empty array. However, if you prefer to omit gadgets without relations, you can modify the type:

```ts
type GadgetRelation = Partial<Record<GadgetID, GadgetID[]>>;
```

## Final code

Now, let's bring everything together. Notice that we declare types at the top of each file, even when they depend on values defined later. Also, we use multiple files for separation of concerns.

### `gadgets.ts`

```ts
// Define the type for valid gadget IDs, derived from GADGETS_INDEX
export type GadgetID = (typeof GADGETS_INDEX)[number]["id"];

// Define the structure of a gadget
export type Gadget = {
	id: GadgetID;
	name: string;
	description: string;
};

// Define the actual gadget data, marked as `as const` for type inference
const GADGETS_INDEX = [
	{
		id: "spoon",
		name: "Spoon",
		description:
			"A spoon is a utensil consisting of a small shallow bowl (also known as a head), oval or round, at the end of a handle.",
	},
	{
		id: "fork",
		name: "Fork",
		description:
			"A fork is a tool consisting of a handle with several narrow tines on one end.",
	},
	{
		id: "knife",
		name: "Knife",
		description:
			"A knife is a tool with a cutting edge or blade attached to a handle.",
	},
] as const;

// The final gadgets array, properly typed as `readonly Gadget[]`
export const GADGETS: readonly Gadget[] = GADGETS_INDEX;
```

### `drawers.ts`

```ts
// Define the structure of a drawer, which contains references to gadgets
export type Drawer = {
	id: string;
	gadgets: GadgetID[]; // Ensures only valid gadget IDs can be used
	description: string;
};

// Example drawer data, referencing gadgets by ID
export const DRAWERS: Drawer[] = [
	{
		id: "1",
		gadgets: ["fork", "knife"], // TypeScript enforces correct IDs here
		description: "...",
	},
	// ...
];
```

### `gadget-relations.ts`

```ts
// Define a mapping of gadgets to their related gadgets
export type GadgetRelation = Record<GadgetID, GadgetID[]>;

// Example relationships between gadgets
export const GADGET_RELATIONS: GadgetRelation[] = [
	{
		spoon: ["fork", "knife"],
		fork: ["spoon", "knife"],
		knife: ["spoon", "fork"],
	},
];
```

## Querying data

Although we won't dive into this in detail, it's easy to write small helper functions to query data in our "database." Here's a simple example:

```ts
const DrawersWithForksInside = select("id")
	.from(DRAWERS)
	.filter((drawer) => drawer.gadgets.includes("fork"));
```

Methods like `Array.prototype.filter` (similar to `WHERE` in SQL) are already built into TypeScript, making data querying straightforward. If there’s interest, I'll provide more details on querying data in a future post.
