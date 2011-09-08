# Titanium Placement Helper

## Description

A set of scripts designed to help with placing objects in Titanium and generating the code directly in your project.

Note: This project is still in development, and features will be added as they are needed. If you would like to suggest a feature, create a GitHub issue with your request, and I will get to it when I have time.

[Click here to see a video of this plugin in action!](http://www.youtube.com/watch?v=XL5WFo6GxMU)


## Accessing the Placement Helper


Install
=======

1. Ensure Node.js is installed. (Click [here](https://github.com/joyent/node/wiki/Installation) for instructions).
2. Download the example project.
3. Add placement.js and pServer.js to your project.
	
	 


How to use
==========

Start the node.js server by running:
	
	node path/to/pServer.js

This should generate the "generated.js" file in the same directory as pServer.js.

Once the server is running, include placement.js in your project.
	
	Ti.include('path/to/placement.js');

Finally, use the "addMarker" function, passing a window as the argument.
	
	addMarker(myWindow);

Start the simulator.

Once the simulator has started, you will notice the black marker. Use this view to determine when you want to add your object.
Once the marker is in place, double click the marker to give it a name and type. Clicking the "Generate Code" button will place the generated code in "generated.js".



## Author


Created by Jacob Williams

[@cheapdevotion](http://www.twitter.com/cheapdevotion)

Source : https://github.com/CheapDevotion/TiPlacementHelper



## License

MIT License