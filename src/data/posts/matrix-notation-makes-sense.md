---
title: Why matrix notation makes sense
published: 2023-12-26
updated:
description: Ever wondered why we write a_ij for the entry in row i and column j?
---

I learned to work and calculate with matrices long ago, but curiously I only recently understood why the common notation for their entries makes sense. This might be embarrassing, but I will share it nevertheless. The insight came from programming.

Let me briefly recall what a matrix is. An <math>m</math> by <math>n</math> matrix is a rectangular grid of numbers with <math>m</math> rows and <math>n</math> columns. Here is an example for <math>m = 2</math> and <math>n = 3</math>. (Perhaps I can convince my MathJax plugin someday to render this properly.)

```json
| 2  3 0 |
| 0 -1 9 |
```

In mathematics, you denote the matrix entry in row <math>i</math> and column <math>j</math> by <math>a\_{ij}</math> (when the matrix is called <math>A</math>, when it is called <math>U</math> you write <math>u\_{ij}</math> etc.). So in the example above, we therefore have <math>a\_{12}=3</math> and <math>a\_{22} = -1</math>, for example. A general matrix is then written as <math>(a\_{ij})\_{1 \leq i \leq m,~ 1 \leq j \leq n}</math>

When I first learned this, it seemed a bit strange to me. I was so used to the cartesian coordinate system that, for me, the <math>x</math>-coordinate should come first, then the <math>y</math>-coordinate. And obviously, the column should be the <math>x</math>-coordinate and hence go first, and after that comes the row which is the <math>y</math>-coordinate. (Let's ignore for the moment that in a usual cartesian coordinate system the <math>y</math>-values grow when you go up, in a matrix it's versa.) Wouldn't it then make more sense to write <math>a\_{21} = 3</math>?

As with any notation, after some time you just get used to it. I never really had any problems with distinguishing a point on a coordinate system and the location of a matrix entry.

However, the notation makes a lot of sense when you use matrices in programming. To be precise, when you model matrices as 2-dimensional arrays, that is, arrays whose entries are arrays.

How would you model the matrix written above, as a 2-dimensional array? The only reasonable answer is

```json
[
	[2, 3, 0],
	[0, -1, 9]
]
```

The matrix is an array of rows, and each row is an array. Accordingly, when you want to access the `3` here, you write `a[0][1]`. First comes the row index `0` and only then the column index `1`. Since mathematicians tend to start their indices with `1`, they write <math>a\_{12}</math> instead of <math>a\_{01}</math>, but in principle, it's the same. First row, then column.

Of course, you _could_ also do it the other way, but then when you print out the 2-dimensional array, it won't look like the usual visual representation of the matrix. You will see the transposed matrix.

There is just one scenario where it still confuses me a bit. Namely when we parse an image to a matrix of pixel values (or vice versa, when a matrix is rendered to an image). Here it would be sort of nice to have the points on the coordinate system match up with the coordinates in the matrix, but they are transposed. When I have a pixel value with matrix coordinate `(100,100)` and I go 100 pixels to the _right_ on the image, the result is `(100,200)`, not `(200,100)`.
