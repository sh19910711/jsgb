describe('Core', function() {
  beforeEach(function() {
    this.core = new Core;
  })

  describe('registers', function() {
    describe('F', function() {
      it('consists of FZ, FN, FH, FC', function() {
        this.core.reg.FZ = 1;
        this.core.reg.FN = 0;
        this.core.reg.FH = 1;
        this.core.reg.FC = 0;
        expect(this.core.reg.F & 0x80).toBeTruthy();
        expect(this.core.reg.F & 0x40).toBeFalsy();
        expect(this.core.reg.F & 0x20).toBeTruthy();
        expect(this.core.reg.F & 0x10).toBeFalsy();
        this.core.reg.FZ = 0;
        this.core.reg.FN = 1;
        this.core.reg.FH = 0;
        this.core.reg.FC = 1;
        expect(this.core.reg.F & 0x80).toBeFalsy();
        expect(this.core.reg.F & 0x40).toBeTruthy();
        expect(this.core.reg.F & 0x20).toBeFalsy();
        expect(this.core.reg.F & 0x10).toBeTruthy();
      })

      it('does not use the last 4-bits', function() {
        expect(this.core.reg.F & 0x0F).toBeFalsy();
      })
    })
  })
})
