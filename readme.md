# Lossless compressian using [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding)

> Implementation of huffman coding algorithm in javascript

***This is not a product or production ready in any sense***

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

## Using this repository

Currently this code is not available on published on npm, [ maybe someday 🎃 ]. Therefore, please clone the repository in local and install all the dependencies.

```sh
$ git clone git@github.com:ajaymathur/huffman-encoding.git
$ cd huffman-encoding
$ yarn install
```

Please create test file in local maybe *text.txt* and [add come text to it](https://lipsum.com/).

The *cli.js* file in root is executable. Execute cli.js.

```sh
$ ./cli.js encode text.txt
```

Couple of file will be created in you root directory *text.txt.zip*, is encoded file which should be smaller in size as compared to *text.js* is everything goes well and *.keycode*, this is the dictionary created by our program. This is in json file so please go ahead and take a look at it.

To decode the encoded file, execute the *cli.js* file again:

```sh
$ ./cli.js decode text.txt.zip
```

This will create a new file *text.txt.zip.txt* which will be same as *text.txt*. I kept adding extensions instead of creating one's for testing purposes.

🔥 isn't it?

## API

```sh
$ ./cli.js <command> <fileName> <targetFileName>
```

**command:** ( encode | decode ) Use encode to compress (encode) the file and decode to uncompress (decode) the file.

**fileName:** ( string ) Pass the name of the file to execute the command on.

**targetFileName:** ( optional: string ) Pass the name of target file that will be created by the operation.

## :)
