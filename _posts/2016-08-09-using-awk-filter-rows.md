---
layout: post
title: "Using AWK to Filter Rows"
description: "A brief explanation on how to use AWK filter data files."
excerpt_separator: <!--more-->
categories: [data, tech]
---

After attending a `bash` class I taught for Software Carpentry, a student contacted me having troubles working with a large data file in R. She wanted to filter out rows based on some condition in two columns. An easy task in R, but because of the size of the file and R objects being memory bound, reading the whole file in was too much for my student's computer to handle.  She sent me the below sample file and how she wanted to filter it. I chose **AWK** because it is designed for this type of task. It parses data line-by-line and doesn't need to read the whole file into memory to process it.  Further, if we wanted to speed up our AWK even more, we can investigate **AWK** ports, such as [MAWK](http://invisible-island.net/mawk/mawk.html), that are built for speed.  
<!--more-->

### Let's look at the data we want to filter

```bash
MarkerName  Allele1 Allele2 Freq1   FreqSE  P-value Chr Pos
rs2326918   a   g   0.8510  0.0001  0.5255  6   130881784
rs2439906   c   g   0.0316  0.0039  0.8997  10  6870306
rs10760160  a   c   0.5289  0.0191  0.8107  9   123043147
rs977590    a   g   0.9354  0.0023  0.8757  7   34415290
rs17278013  t   g   0.7498  0.0067  0.3595  14  24783304
rs7852050   a   g   0.8814  0.0006  0.7671  9   9151167
rs7323548   a   g   0.0432  0.0032  0.4555  13  112320879
rs12364336  a   g   0.8720  0.0015  0.4542  11  99515186
rs12562373  a   g   0.7548  0.0020  0.6151  1   164634379
```

What we want to do is get the rows from `Chr` (column 7) when it equals 6 and also the `Pos` (column 8) when the values are between 11000000 and 25000000.

Let's start working out parts of the code in AWK. If you aren't familiar with **AWK**, it's a programming language designed for text processing and data extraction. One of the things it does well is recognize fields in the data. For instance, we know we have 8 columns delimited by tabs in our data, but if you didn't know how many columns you have, you can find this out with a bit of **AWK**:

```bash
awk "{print NF}" < pos_cut.txt | uniq
```

```output
8
```

`NF` is an AWK built in variable and it stands for *number of fields*. We pipe this to `uniq` because the default behavior will print the number of columns for each row and since each row has the same number of columns, `uniq` will reduce this to one number.

### Printing Fields and Searching

We can also use AWK to select and print parts of the file. Let's do this now.

```bash
awk '{print $1 $2}' pos_cut.txt
```

```output
rs11058339t
rs7338610t
rs882601t
rs13290449t
rs2941056a
rs10444526a
rs12190167a
rs1125337a
rs7911101a
rs13053206c
rs697690t
rs12447687t
rs2402752t
rs12042911a
...
```

Notice that there's no formatting of the output. There are many ways to format and structure the output in AWK. Checkout the [printing](https://www.gnu.org/software/gawk/manual/gawk.html#Printing) section on the AWK user guide for more information on this.

Now we've selected a couple of columns to print out, let's use AWK to search for a specific thing -- a number we know exists in the dataset. Note that if you specify what fields to print out, AWK will print the whole line that matches the search by default.

```bash
awk '/2410626/' pos_cut.txt
```

```output
rs4853805   a   t   0.2107  0.0029  0.4229  2   2410626
```

Instead of matching a unique number, we could have matched on a string pattern or regular expression. In that case, AWK would return every line that matches the pattern. In our case above, that number occurs once in the data file, but we could have used a regular expression or a range pattern instead. For more on finding patterns in AWK, check out the [Patterns, Actions and Variables](https://www.gnu.org/software/gawk/manual/gawk.html#Patterns-and-Actions) section of the AWK guide.

### Filtering Rows Based on Field Values

Ok, now we know how to access fields (columns) and find patterns in our document, but how can we control what we want to search on and where? Our initial problem requires that we look into the `Chr` field to get only lines with the value 6. Then we want to look into the `Pos` field to grab the lines where those values are between 11000000  and 25000000. To do this in AWK, we need to use the `if` control statement along with a conditional expression. Let's run one now and explain after:

```
awk '{ if ($7 == 6) { print } }' pos_cut1-5.txt | head
```

```
rs2326918   a   g   0.8510  0.0001  0.5255  6   130881784
rs16877977  a   g   0.1302  0.0048  0.05945 6   16494324
rs7763812   a   t   0.9815  0.0008  0.05328 6   104042808
rs222555    c   g   0.3720  0.0051  0.7756  6   95272331
rs9450727   t   c   0.6193  0.0106  0.08575 6   88293919
rs12200899  t   c   0.7683  0.0075  0.7118  6   66215503
rs990018    t   c   0.0201  0.0000  0.6292  6   68825590
rs1344178   a   c   0.6250  0.0016  0.7234  6   118804141
rs12529570  c   g   0.1987  0.0148  0.266   6   110283483
rs3130560   t   g   0.2706  0.0242  0.2365  6   31205432
```

Above, we use the keyword `if` and then a conditional expression, `($7 == 6)`, based on the column variable, `$7` we want to test on. The dollar sign here denotes we are working with a variable and in this case, AWK knows that `$7` means the 7th field in our dataset. Likewise, `$6` would mean the 6th field and so on. `==` is often used in programming languages to test for equality because a single `=` is often used for object assignment. What we are saying here is, as we go line-by-line in this file, if the value in column 7 is equal to 6 then the match is true and the line is included in the output. I'm piping, using the `|` operator, the results to `head` to keep the output concise for this blog.

Now we want to test the other part of the conditional on the `Pos` column. This time we will use the `>=` operator to test if the values in the column 8 are greater than or equal to 11000000.

```bash
awk '{ if($8 >= 11000000) { print }}' pos_cut.txt | head
```

```bash
MarkerName  Allele1 Allele2 Freq1   FreqSE  P-value Chr Pos
rs2326918   a   g   0.8510  0.0001  0.5255  6   130881784
rs10760160  a   c   0.5289  0.0191  0.8107  9   123043147
rs977590    a   g   0.9354  0.0023  0.8757  7   34415290
rs17278013  t   g   0.7498  0.0067  0.3595  14  24783304
rs7323548   a   g   0.0432  0.0032  0.4555  13  112320879
rs12364336  a   g   0.8720  0.0015  0.4542  11  99515186
rs12562373  a   g   0.7548  0.0020  0.6151  1   164634379
rs17706069  a   t   0.8055  0.0537  0.993   16  27095047
rs17035887  a   g   0.0588  0.0072  0.6673  2   46983448
```

So far, we've confirmed that we can use the `if` statement in AWK to return the rows that meet our conditional expressions when true. Check out the documentation on using [control statements](https://www.gnu.org/software/gawk/manual/gawk.html#Statements) in AWK for more ways you can use conditionals to make decisions.

The next step is to combine these conditional expressions with the third (less than 25000000) to do all the filtering in one pass. To do this we need to use [boolean operators](https://www.gnu.org/software/gawk/manual/gawk.html#Boolean-Ops) with our conditional expressions. Let's try it for the two conditional expressions we worked out above first.

```bash
awk -F "\t" '{ if(($7 == 6) && ($8 >= 11000000)) { print } }' pos_cut.txt | tail
```

```
rs9320690   a   g   0.5342  0.0041  0.9136  6   119812605
rs483727    t   c   0.2512  0.0052  0.1624  6   81681348
rs754997    t   g   0.8192  0.0091  0.6605  6   133635869
rs2073214   t   c   0.1465  0.0007  0.1076  6   144123302
rs12195885  a   c   0.0224  0.0000  0.9662  6   23600679
rs6924121   t   c   0.6988  0.0031  0.4138  6   165249220
rs11961870  a   c   0.2470  0.0094  0.9404  6   143943842
rs9476984   c   g   0.0711  0.0014  0.9935  6   16036569
rs9382099   t   c   0.1443  0.0043  0.7554  6   52328752
rs2504065   a   g   0.4974  0.0009  0.3366  6   152136860
```

We are using the boolean **and** `&&` here (other operators are `||` for **or** and `!` for **not**) to combine our two conditional statements. Now let's add our second column `$8` condition (<=25000000) to our if statement.

```bash
awk -F "\t" '{ if(($7 == 6) && ($8 >= 11000000 && $8 <= 25000000)) { print } }' pos_cut.txt
```

```output
rs16877977  a   g   0.1302  0.0048  0.05945 6   16494324
rs7767788   t   c   0.6144  0.0042  0.3234  6   14098813
rs12523811  a   c   0.5216  0.0055  0.2504  6   17941531
rs12199382  a   g   0.4045  0.0113  0.7856  6   22435109
rs9465281   c   g   0.0719  0.0105  0.1794  6   19326722
rs13196524  t   c   0.9426  0.0209  0.8672  6   22356754
rs12195885  a   c   0.0224  0.0000  0.9662  6   23600679
rs9476984   c   g   0.0711  0.0014  0.9935  6   16036569
```

That works! The final step after this might be to redirect this into a new file to save for further analysis.

AWK is pretty flexible. We can use at the command line in conjunction with other UNIX commands to build a pipeline of operations that act on a data file or we can use AWK inside a shell script. You can also put an AWK program in it's own file and run with `awk -f source-file`. There are many more features in the [AWK language](https://www.gnu.org/software/gawk/manual/gawk.html) I didn't discuss in this blog. The big takeaway here is that if you run into a file that exceeds or slows down memory bound languages like R, you can use stream based operations on those files in AWK.
