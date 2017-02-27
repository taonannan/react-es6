module.exports = {
    "use": ["postcss-cssnext", "precss", "postcss-cachify"],
    "local-plugins": true,
    "postcss-cssnext": {
        "browsers": "> 5%"
    },
    "postcss-cachify": {
        "baseUrl": "/res"
    }
}
