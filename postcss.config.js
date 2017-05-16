const px2rem = require('postcss-px2rem');

module.exports = {
    plugins: [
        require('autoprefixer'),
        px2rem({
            baseDpr: 1,
            remUnit: 37.5,
            forcePxComment: '!px',
            keepComment: '!no'
        })
    ]
};
