# Zoox-frontend

 A simple vue frontend proposed by Zoox.

 To understand how the vue works I recommend reading this guide:
[Official Vue Guide](https://vuejs.org/v2/guide/)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Project strucutre

    .
    ├── src                     # Project source files
    │   ├── api                 # Resposible for Http requests
    │   ├── assets              # Css, Sass and images files
    │   ├── components          # Vue components files
    │   ├── router              # Router for endpoints of this project
    │   ├── App.vue             # First Vue component that is called in all endpoints
    │   └── main.js             # Responsible for startup everything that Vue needs
    ├── static                  # Static files (icons, images, etc...)
    ├── package.json            # Package manager of all libs used in this project.
    └── index.html              # Startup the project loading the src/main.js

## Component Flow

![Alt text](docs/components-diagram.png)
