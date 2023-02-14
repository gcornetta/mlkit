const math = require('mathjs')

module.exports.ota = (Gm, Ro, CL, frequency) => {
    const complexFrequency = math.complex(0, 2 * Math.PI * frequency)
    const H = math.parse('(Gm * Ro) / (1 + s * Ro * CL)')

    const Hval = H.evaluate({s: complexFrequency, Gm, Ro, CL})

    return {
        magnitude: math.abs(Hval),
        phase: math.arg(Hval)
    }
}