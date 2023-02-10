// require the function to load python VM
const { loadPyodide } = require ('pyodide')
// python packages to be installed
const packages = [
    'numpy',
    'scikit-learn',
    'matplotlib',
    'pandas'
]

const loadPyEnv = () => {
    return new Promise(async (resolve, reject) => {
        const pypackages = []

         try {
            // wait for the python VM to be fully loaded
            const pyodide = await loadPyodide()
             // install the required python packages
            for (let i = 0; i < packages.length; i++) {
                pypackages.push(pyodide.loadPackage(packages[i]))
            }
            // wait for all the python packages to be installed
            let status = Promise.allSettled (pypackages)
            await status
            // resolve the promise and return a JS proxy on top the Python VM
            resolve(pyodide)
        } catch (error) {
            // return the cause of promise rejection
            reject(error)
        }
    })
}

/**
 * Summary. Load the WASM Python virtual machine.
 *
 * Description. A wrapper function for loadPyEnv. Loads the WASM Python virtual
 * machine and provision it with the main scientific packages. If successful,
 * define a global variable 'pyodide' with the pointer to the JavaScript proxy
 * with the convenience methods to access the Python environment.
 *
 * @since      0.0.1
 *
 */
module.exports.loadPy = async () => {
    try {
        const pyodide = await loadPyEnv()
        global.pyodide = pyodide
    } catch (error) {
        throw(new Error(error))
    }
}