const { serialMatches } = require('./utils')

describe('serialMatches', () => {
  it('returns true when serial pattern is nil', () => {
    const actual = serialMatches('', undefined)

    expect(actual).toBe(true);
  })
  
  it('returns true when serial pattern is NaN', () => {
    const actual = serialMatches('', NaN)

    expect(actual).toBe(true);
  })

  describe('when pattern is a singe number', () => {
    const pattern = '33339'
    it('returns true when number matches', () => {
      const actual = serialMatches('33339', pattern)

      expect(actual).toBe(true)
    })

    it('returns false when number does not match', () => {
      const actual = serialMatches('3339', pattern)

      expect(actual).toBe(false)
    })
  })

  describe('when pattern is a valid range', () => {
    const pattern = '500-676'
    const inRange = [500, 676, 501, 600, 599]
    const outOfRange = [499, 677, 1, 50, 776]

    it.each(inRange)('returns true when number (%s) is in range', (value) => {
      const actual = serialMatches(value, pattern)

      expect(actual).toBe(true);
    })

    it.each(outOfRange)('returns false when number (%s) is not in range', (value) => {
      const actual = serialMatches(value, pattern)

      expect(actual).toBe(false);
    })
  })
 
  describe('when pattern is a valid regex', () => {
    const pattern = '/^(\\d)\\1*(?!\\1)(\\d)\\2*(\\1|\\2)*$/' // 2 unique digits
    const matches = [23, 511, 65665, 59955]
    const nonMatches = [2, 22, 495, 6758, 1002, 543, 756]

    it.each(matches)('returns true when number (%s) matches regex', (value) => {
      const actual = serialMatches(value, pattern)

      expect(actual).toBe(true);
    })

    it.each(nonMatches)('returns false when number (%s) does not match regex', (value) => {
      const actual = serialMatches(value, pattern)

      expect(actual).toBe(false);
    })
    
    describe('that contains a "-"', () => {
      const pattern = '/^[0-3]+$/' // Only contains low digits
      const matches = [30, 30002, 1, 100323]
      const nonMatches = [24, 5, 495, 6758, 10029, 543, 756]
  
      it.each(matches)('returns true when number (%s) matches regex', (value) => {
        const actual = serialMatches(value, pattern)
  
        expect(actual).toBe(true);
      })
  
      it.each(nonMatches)('returns false when number (%s) does not match regex', (value) => {
        const actual = serialMatches(value, pattern)
  
        expect(actual).toBe(false);
      })
    })
  })

})