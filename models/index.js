const math = require('mathjs')

class Ota {
    constructor (amp, frequency) {
        this.Rs = amp.Rs
        this.Cin = amp.Cin
        this.Gm = amp.Gm
        this.Ro = amp.Ro
        this.CL = amp.CL
        this.complexFrequency = math.complex(0, 2 * Math.PI * frequency)
        this.H = math.parse('(Gm * Ro) / ((1 + s * Rs * Cin) * (1 + s * Ro * CL))')
    }

    get magnitude() {
        const Hval = this.H.evaluate({
            s: this.complexFrequency, 
            Gm: this.Gm, 
            Ro: this.Ro, 
            Rs: this.Rs,
            Cin: this.Cin,
            CL: this.CL})

        return math.abs(Hval)
    }

    get phase() {
        const Hval = this.H.evaluate({
            s: this.complexFrequency, 
            Gm: this.Gm, 
            Ro: this.Ro, 
            Rs: this.Rs,
            Cin: this.Cin,
            CL: this.CL})

        return math.arg(Hval)
    }

    get bandwidth() {
        const fp1 = 1/(2 * Math.PI * this.Rs * this.Cin)
        const fp2 = 1/(2 * Math.PI * this.Ro * this.CL)
        const fmin = Math.min(fp1, fp2)

        return fmin <= 10 * Math.max(fp1, fp2) ? 
            fmin :
            1 /(Math.sqrt((1/Math.pow(fp1, 2)) + (1/Math.pow(fp2, 2))))
    }
}

module.exports = Ota