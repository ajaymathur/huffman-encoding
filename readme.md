# Lossless compressian using [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding)

> Implementation of huffman coding algorithm in javascript

<p style="color: red">This is not a product or production ready in any sense</p>

## Huffman coding

For description of how this algorithm works please read the wikipedia article https://en.wikipedia.org/wiki/Huffman_coding. ( Someday if I write an article I will update it here. )

## How does this code work?

Example:

Suppose we need to encode the text *"ajay"* then each alphabet is given a rank based on probability of number of times that they will appear in the text.

In case of *ajay* it will be:

|Element|number of times appeared in text|
|---|---|
|a|2|
|j|1|
|y|1|

Now, we start with the two entities with least occurances, in this case *j* and *y*

```

        2 (j,y)
      /    \
    j=1     y=1

```

and now again form the table:

|Element|number of times appeared in text|
|---|---|
|a|2|
|j,y|2|


```

        4 (a,j,y)
      /    \
    a=2     2=(j,y)
          /    \
        j=1     y=1

```

Now we traverse the tree by assigning 0 to left branch and 1 to right branch:

```

        4 (a,j,y)
      /0   \1
    a=2     2=(j,y)
          /0   \1
        j=1     y=1

```

Therefore the codes are:

|Element|number of times appeared in text|code|
|---|---|---|
|a|2|0|
|j|1|10|
|y|1|11|

Therefore, the element that appears for most number of times get the shortest code.

## :)
