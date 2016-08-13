---
layout: post
title: "Using AWK to Filter Rows"
description: "A brief explanation on how to use AWK filter data files."
excerpt_separator: <!--more-->
---

I had a student with large data files she wanted to filter out rows based on some condition in two columns. If she loaded the files in R, it would take too long to run the subsetting. After attending a `bash` class I taught for Software Carpentry she sent me the below sample file and how she wanted to filter them.  
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

What we want to do is get the rows from “Chr” (column 7) when it equals 6 and also the “Pos” (column 8) when the values are between 11000000  and 25000000.

Let's start working out parts of the code in AWK. If you aren't familiar with AWk, it's a programming laguage designed for text processing and data extraction. One of the things it does well is recognize feilds in the data. For instance, we know we have 8 columns in our data. If you didn't know how many columns you have, you can find this out with a bit of AWK: 

```bash
awk "{print NF}" < pos_cut.txt | uniq
```

```output
8
```

`NF` is an AWk built in variable and means number of fields. We pipe this to `uniq` because the default behavior will print the number of columns for each row -- `uniq` will reduce this to one. 

### Printing Fields and Searching

Ok, let's use AWK to print out some of our fields.  

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

Notice that there's no formatting of the output. There are many ways to format and structure the output in AWK. Checkout the [printing](https://www.gnu.org/software/gawk/manual/gawk.html#Printing) section on the AWK user guide. 

Now let's use AWK to search for a specific thing. If you don't tell AWK to print specific fields it will print the whole line that matches the search. 

```bash
awk '/2410626/' pos_cut.txt
```

```output
rs4853805   a   t   0.2107  0.0029  0.4229  2   2410626
```

Instead of this number to match, it could be a string or regular expression. AWK will return every line that matches the pattern. Check out the [Patterns, Actions and Variables](https://www.gnu.org/software/gawk/manual/gawk.html#Patterns-and-Actions) section of the AWK guide for more on this. 

### Filtering Rows Based on Field Values

Ok, now we know how to access fields (columns) and find patterns in our document. But how can we control what we want to search? Our initial problem requires that we look into the "Chr" field to get only lines with value 6. Then we want to look into the "Pos" field to grab the lines between 11000000  and 25000000. To do this we use the `if` control statement and a conditional expression. Let's explore this and add a conditional expression to extract the rows we want.  

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

This is pretty straightforward. We use the keyword `if` and then a conditional expression based on the column variable we want to test on. When the match is true on that column the line is included in the output. I'm piping the results to `head` to keep the output concise for this blog. 

Now we want to test the other part of the conditional on the `Pos` column. 

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

We've confirmed that we can use the `if` statement in AWK to return the rows that meet our conditionals. Check out the documentation on using [control statements](https://www.gnu.org/software/gawk/manual/gawk.html#Statements) in AWK. 

The next step is to combine these conditional expressions with the third (less than 25000000) to do all the filtering in one pass. To do this we need to use [boolean operators](https://www.gnu.org/software/gawk/manual/gawk.html#Boolean-Ops) with our conditional expressions. Let's try it for the two conditional expressions we worked out first. 

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

That works! The final step here might be to redirect this into a new file. 

AWK is pretty flexible. We can use at the command line in conjunction with other UNIX commands in a pipeline or we can use AWK inside a shell script as well. You can also put an AWK program in it's own file and run with `awk -f source-file`. There are also many more features in the [AWK language](https://www.gnu.org/software/gawk/manual/gawk.html). The big takeaway here is that if you run into a file that exceeds or slows down memory bound languages like R, you can use stream based operations on those files in AWK. 

