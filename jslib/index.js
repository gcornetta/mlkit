// require node.js file system and path modules
const fs = require ('fs')
const path = require ('path')

// resolve the base path to the python scripts library
const pyLibPath = path.resolve(__dirname, '../pylib')

/**
 * Summary. JavaScript wrapper for the classification_score python script.
 *
 * Description. A wrapper function for the Python scripts in pylib folder. 
 * The function has no input parameters and returns a promise with the results
 * of the Python script.
 *
 * @since      0.0.1
 *
 * @return {Promise} When resolved the promise returns a Map (value, key) with the 
 *                   results, otherwise the reason of rejection is returned.
 */
module.exports.classification_score = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // compute the path to python script to be executed
            const cs = path.join(pyLibPath, 'classification_score.py')
            // read the python script
            const py = fs.readFileSync(cs,
                {encoding:'utf8', flag:'r'})
            // run the script and wait for results
            const result = await pyodide.runPythonAsync(py.toString())
            // resolve the promise and return a JS map with the results
            resolve (result)
        } catch (error) {
            // return the cause of promise rejection
            reject(error)
        }
    })
}

/**
 * Summary. JavaScript wrapper for the np_array python function.
 *
 * Description. A wrapper function for the Python functions in pylib folder. 
 * The function has two input parameters and returns a promise with the results
 * of the Python script.
 *
 * @since      0.0.1
 *
 * @param {x}   Number    A number with the size of the x-axis of a n-dimensional array.
 * 
 * @param {y}   Number    A number with the size of the y-axis of a n-dimensional array.
 * 
 * @return {Promise}      When resolved the promise returns an array of 'x' BigInt64Array 
 *                        of size 'y', otherwise the reason of rejection is returned.
 */
module.exports.np_array = (x, y) => {
    return new Promise(async (resolve, reject) => {
        try {
            // compute the path to python script to be executed
            const cs = path.join(pyLibPath, 'np_array.py')
            // read the python script
            const py = fs.readFileSync(cs,
                {encoding:'utf8', flag:'r'})
            // collect function inputs into a JS object
            const obj = {x, y}
            // run the script
            await pyodide.runPythonAsync(py.toString())
            // make np_array self point to JavaScript namespace
            obj.np_array = pyodide
                .globals
                .get('np_array')
                .captureThis()
            // resolve the promise and return a JS array with the result
            resolve (obj.np_array())
        } catch (error) {
            // return the cause of promise rejection
            reject(error)
        }
    })
}