describe('Core', function() {
  beforeEach(function() {
    this.core = new Core;
  })

  describe('Registers', function() {
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

  describe('Operations', function() {
    describe('8-bit loads (register <= value)', function() {
      it('puts value into register', function() {
        this.core.m.data = [0x11, 0x22, 0x33];
        this.core.r.PC = 0x00;

        this.core.op.LDrn_A.call(this.core);
        expect(this.core.r.A).toEqual(0x11);
        this.core.op.LDrn_A.call(this.core);
        expect(this.core.r.A).toEqual(0x22);
        this.core.op.LDrn_A.call(this.core);
        expect(this.core.r.A).toEqual(0x33);
      })
    })

    describe('8-bit loads ([addr] <= register)', function() {
      it('puts value into register', function() {
        this.core.m.data = [0x00, 0x00, 0x00];
        this.core.r.A = 0x77;
        this.core.r.HL = 0x0001;
        this.core.op.LDHLr_A.call(this.core);
        expect(this.core.m.data[0x0000]).toEqual(0x00);
        expect(this.core.m.data[0x0001]).toEqual(0x77);
        expect(this.core.m.data[0x0002]).toEqual(0x00);
      })
    })

    describe('Stack pointer', function() {
      it('can push and pop values', function() {
        this.core.r.BC = 0x1234;
        this.core.op.PUSH_BC.call(this.core);
        this.core.op.POP_DE.call(this.core);
        expect(this.core.r.DE).toEqual(0x1234);
      })
    })
  })
})
