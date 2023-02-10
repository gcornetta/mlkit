// import chalk to colorize output text
const chalk = require('chalk')
const { loadPy } = require('./pyenv')

// import the JS wrapper library
const { classification_score, np_array } = require('./jslib')

// main module
const main = async  () => {
    console.log(chalk.blue.bgRed.bold('Loading Python environment...'))
    await loadPy()
    
    console.log(chalk.blue.bgRed.bold('Testing Scikit-learn...'))
    // wait for the classification_score script to be executed (a map is expected)
    const scores = await classification_score()
    // print the results
    scores.forEach((value, key) => {
        console.log(`${chalk.green(key)} - ${chalk.cyan('score:')} ${chalk.whiteBright(Math.round(value * 1000) / 1000)}`)
    })

    console.log(chalk.blue.bgRed.bold('Testing Numpy...'))
    // wait for the np_array script to be executed (an array of BigInt64Array is expected)
    const matrix = await np_array(3, 5)
    console.log(matrix)
}

main()
