describe('Core', function() {
  beforeEach(function() {
    this.core = new Core;
  })

  describe('registers', function() {
    describe('F', function() {
      it('consists of FZ, FN, FH, FC', function() {
        this.core.r.FZ = 1;
        this.core.r.FN = 0;
        this.core.r.FH = 1;
        this.core.r.FC = 0;
        expect(this.core.r.F & 0x80).toBeTruthy();
        expect(this.core.r.F & 0x40).toBeFalsy();
        expect(this.core.r.F & 0x20).toBeTruthy();
        expect(this.core.r.F & 0x10).toBeFalsy();
        this.core.r.FZ = 0;
        this.core.r.FN = 1;
        this.core.r.FH = 0;
        this.core.r.FC = 1;
        expect(this.core.r.F & 0x80).toBeFalsy();
        expect(this.core.r.F & 0x40).toBeTruthy();
        expect(this.core.r.F & 0x20).toBeFalsy();
        expect(this.core.r.F & 0x10).toBeTruthy();
      })

      it('does not use the lower 4-bits', function() {
        expect(this.core.r.F & 0x0F).toBeFalsy();
      })

      it('is split into FZ, FN, FH, FC', function() {
        this.core.r.F = 0x80 | 0x20;
        expect(this.core.r.FZ).toBeTruthy();
        expect(this.core.r.FN).toBeFalsy();
        expect(this.core.r.FH).toBeTruthy();
        expect(this.core.r.FC).toBeFalsy();
      })
    })
  })
})
