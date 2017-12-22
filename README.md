# vue-music
#### vue+ webpack+ cordova -> vue-music-player
use: `vue` `vuex` `mint-ui` `pug` `stylus`

## Quick start

    git clone ...
    npm i 

    mkdir www
    
    cordova add browser
    npm run dev (browser)
    
    cordova add android
    npm run android (android device)
    
    ...other cordova task

## Minimum

* Cordova: 6.0.0
* Node.js: 6.5.0

## View demo 

![demo](http://vmusicapi.duapp.com/api/qcode?url=http://vmusicapi.duapp.com/ "demo") 

## Use server api

    <!--checkout /api/index.js-->
    const apiRoutes = express.Router()
    require('path/to/api/index')(apiRoutes)
