# React/Redux Project
The supporting files are attached (Gridster-files.zip)

Please use the React and Redux JavaScript libraries to create a UI consisting of:
* An input labelled 'Rows' which only allows integers and max value is 20
* An input labelled 'Column' which only allows integers and max value is 20
* A button labelled ‘Generate’
* An X by Y grid of squares each of which is large enough to be clicked with the mouse.
* The look of the UI should match the one supplied to you in the zip file attached.

### Additional requirements:
* The initial dimensions of the grid should be 10 by 10.
* When the grid is first initialised or resized exactly one square on the left is chosen at random and marked as a 'start' square and coloured appropriately.
* When the grid is first initialised or resized exactly one square on the right is chosen at random and marked as an 'end' square and coloured appropriately.
* The initial state of each square in the grid except the 'start' and 'end' squares is 'filled' and it should be coloured appropriately.
* Clicking on any 'filled' square which is not the 'start' or 'end' square changes its state to 'clear', and it should be re-coloured appropriately.
* Clicking on any 'clear' square which is not the 'start' or 'end' square changes its state to 'filled'
* If the value of either input is changed and the generate button is clicked, the grid should be resized appropriately, the 'start' and 'end' squares should be re-set as described above and all squares other squares should be re-set to ‘filled'
* If at any point there is a connected path of 'clear' squares all the way from the 'start' square to the 'end' square then the path should be coloured appropriately.
* 'clear' squares are only connected by their sides. They do not connect diagonally.
* If there is more than one path from the 'start' square to the 'end' square then only the shortest path should be shown.

Depending on your approach you may find that you need a min or max priority queue. Please feel free to use one of the priority queue libraries on NPM.

If you are familiar with webpack, create configuration by your own.

Feel free to use es5/es6 as you prefer. We use TypeScript but unless you are already familiar with it I recommend you stick to JavaScript for the test.

Please return the source code for the completed test along with any associated build files and package files in a zip file via email.
