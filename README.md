# OguzhanCubuk

Stackblitz.com have been utilized while solving this task in order to dynamically see the changes made while also being able to check the codes on the side. I have implemented the code i have written on stackblitz to VScode and then made commits to github repository.



--Page Structure--
The layout is built around a single container called .actionBox, which acts like the "scene" for the simulation.
It's set to position: relative so that the elements inside it (.plank, .ucgen, .ground) can be positioned absolutely relative to this box.
The triangle (.ucgen) acts as the pivot.
The plank is clickable and rotates based on torque.
The .objects layer holds all the generated weights that appear when you click.

--How the Logic Works--
Each object has an x position (how far it is from the center) and a random weight.
The program calculates torque for both sides using this simple formula: torque = weight x distance; then it finds the difference between left and right torques and converts it into a rotation angle.That angle is limited between -30° and +30° so the plank doesn't flip too far.


--Trade-offs & Limitations--
Theres no real motion or gravity. The plank instantly moves to the new angle instead of swinging naturally.


-- Use of AI--

getBoundingClientRect() method has been lookedup from chatGPT.

background: linear-gradient(to bottom, #c9e9ff, #a9d8ff 60%, #91c9ff) --> this line has been looked up from chatGPT.

Color codes for style.css file has been looked up from chatGPT.

Comments in the code have been annotated with chatGPT in order to let people understand the function utilizations easier.



--Change after sending the demo video--
I have made a change that effects the color of the objects created. As the objects get heavier the blue color of the object gets darker.