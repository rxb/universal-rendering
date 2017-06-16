install dependencies
```
brew install imagemagick
npm install
```

build test icon assets
```
grunt svgmin
grunt svgstore
grunt convert-svg-to-png
```

sketchapp render test
```
node assetServer.js
npm run build
```

web render test
```
npm run web
```

![wooo](http://i.imgur.com/wdaYJCk.png)
