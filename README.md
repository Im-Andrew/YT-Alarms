# YouTube Alarms

Youtube Alarms is a React application built to set off alarms which play YouTube videos
of your choice. You can setup up as many alarms which go off based off of days and times.

Try it here: https://making.codes/app/ytalarm/

![](/gh/demo.gif)

# Features

- Create alarms with names, comments, times, and recurring dates
- Have unlimited alarms
- Alarms can be paused and turned off
- Display upcoming alarms and their thumbnails

## Built With

- languages: JavaScript (jsx), SASS (SCSS), HTML
- Build Tool: webpack
- Libraries: React, Redux, React-Router, CSS components
- APIs: YouTube Video player

## Design goals

1. Create an application structure which supported a nice component model
2. Keep configuration unified in one location
3. Create reusable components where possible
4. Separate pages from components 
5. Separate UI state from App state, and make ui state flow down

## Challenges

- Mixing YouTube's Video Player API with React
    - This was notably difficult due to the nature of the API. It injects an IFRAME into a DOM element - something React does _NOT_ want to do.
- Syncing up alarm settings with firing alarms
- Parsing human readable time strings 
- Having many independently updating timers which will eventually mount as an active YouTube player
- Having videos play in the background of the application and transfer the route when alarms activate


# Getting Started

This project utilizes webpack, sass, and babel. All of these tools work together to help build a final
 browser compatible website.

## Installation

1. Copy this repository into a folder: `git clone https://github.com/Im-Andrew/YT-Alarms.git .`
2. Install all of your necessary components `npm install`

## My webpack setup
I have a webpack setup with 3 files. There's a "base" file which is the standard `webpack.config.js` file
and that's where common setup is shared between development and production. 

Development produces source maps and tries to simulate the hosting from a non-root address 
so I can publish the application to my site without any routing issues.

Production builds a minimized pack of everything and stores it in a hashed script file so that
I don't get plagued by the effects of cache shadowing. 

## Testing it locally

Once you have installed this project you have a couple of scripts available to you. The
two ones you'll want to use are for development testing and for building.

If you want to **test** then use: `npm run start`

If you want to **build** then use: `npm run build`. 
After you've built it you should find the output in your dist folder.


# Contact me:
I am available for hire. You can quickly get in contact with me here:
[http://www.making.codes/#contact-me](http://www.making.codes/#contact-me)