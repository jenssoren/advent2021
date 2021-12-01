# My solutions for https://adventofcode.com/2021/

### How to run
run `node main.js DAY TASK INPUT`

`main.js` is a small runner using the following format:
|arg|description|
|---|-----------|
|**DAY**|A folder in the root (same folder as main.js)|
|**TASK**|A .js file with the name task`TASK`.js|
|**INPUT**|A .txt with input for the task (use the path relative to `main.js`)|

**ex.** `node main.js 4 1 4/input.txt` to run task 1 for day 4 with the input defined in `4/input.txt`

**ex.** `node main.js 6 2 6/example.txt` to run task 2 for day 6 with the input defined in `6/example.txt`


### How to "contribute"
***NOTE:*** This is my personal solutions, so please don't contribute :)

1. Add a folder for the day ex.  `mkdir 1`
2. Add a input.txt with the new folder with the puzzle input for the day. ex `touch 1/input.txt`
3. Add task1.js and task2.js in the new folder. ex. `touch 1/task1.js && touch 1/task2.js`
    1. Both tasks should define a class that extend `lib/base.js`
    2. Both tasks should export the class as Task.
4. Run (see How to run)
