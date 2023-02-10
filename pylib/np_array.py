import numpy as np
import pyodide.ffi as ffi

def np_array(self):
    """Performs a 2D reshaping on an arbitrary array.

    Self must point to an {x, y} object in the 
        JavaScript namespace.

    Parameters
    ----------
    self : 
        The pointer to the JavaScript namespace
    """
    m = np.arange(self.x * self.y, dtype=np.int64).reshape(self.x, self.y)
    m[1:, ::2] = -99

    # return an array of JavaScript BigInt64Array
    return ffi.to_js(m)