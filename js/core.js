class Registers {
  constructor() {
    this._ = {
      A: 0,
      B: 0,
      D: 0,
      H: 0,
      FZ: 0,
      FN: 0,
      FH: 0,
      FC: 0,
      C: 0,
      E: 0,
      L: 0,
      SP: 0,
      PC: 0,
    };
  }

  get A() { return this._.A & 0xFF }
  get B() { return this._.B & 0xFF }
  get D() { return this._.D & 0xFF }
  get H() { return this._.H & 0xFF }
  get FZ() { return this._.FZ & 0xFF }
  get FN() { return this._.FN & 0xFF }
  get FH() { return this._.FH & 0xFF }
  get FC() { return this._.FC & 0xFF }
  get C() { return this._.C & 0xFF }
  get E() { return this._.E & 0xFF }
  get L() { return this._.L & 0xFF }
  get SP() { return this._.SP & 0xFFFF }
  get PC() { return this._.PC & 0xFFFF }
  get F() { return (this.FZ << 7 | this.FN << 6 | this.FH << 5 | this.FC << 4) & 0xF0 }
  get BC() { return this.B << 8 | this.C }
  get DE() { return this.D << 8 | this.E }
  get HL() { return this.H << 8 | this.L }
  get AF() { return this.A << 8 | this.F }

  set A(v) { this._.A = v & 0xFF }
  set B(v) { this._.B = v & 0xFF }
  set D(v) { this._.D = v & 0xFF }
  set H(v) { this._.H = v & 0xFF }
  set FZ(v) { this._.FZ = v & 0x01 }
  set FN(v) { this._.FN = v & 0x01 }
  set FH(v) { this._.FH = v & 0x01 }
  set FC(v) { this._.FC = v & 0x01 }
  set C(v) { this._.C = v & 0xFF }
  set E(v) { this._.E = v & 0xFF }
  set L(v) { this._.L = v & 0xFF }
  set SP(v) { this._.SP = v & 0xFFFF }
  set PC(v) { this._.PC = v & 0xFFFF }
  set F(v) {
    this.FZ = (v & 0x80) >> 7;
    this.FN = (v & 0x40) >> 6;
    this.FH = (v & 0x20) >> 5;
    this.FC = (v & 0x10) >> 4;
  }
  set BC(v) {
    this.B = (v & 0xFF00) >> 8;
    this.C = (v & 0x00FF);
  }
  set DE(v) {
    this.D = (v & 0xFF00) >> 8;
    this.E = (v & 0x00FF);
  }
  set HL(v) {
    this.H = (v & 0xFF00) >> 8;
    this.L = (v & 0x00FF);
  }
  set AF(v) {
    this.A = (v & 0xFF00) >> 8;
    this.F = (v & 0x00FF);
  }
}

class System {
  constructor(core) {
    this.core = core;
    this._ = {
      P1: 0,
      SB: 0,
      SC: 0,
      DIV: 0,
      TIMA: 0,
      TMA: 0,
      TAC: 0,
      DMA: 0,
      IME: 0,

      // interrupts
      IE_VBLANK: 0,
      IE_LCD_STAT: 0,
      IE_TIMER: 0,
      IE_SERIAL: 0,
      IE_JOYPAD: 0,
      IF_VBLANK: 0,
      IF_LCD_STAT: 0,
      IF_TIMER: 0,
      IF_SERIAL: 0,
      IF_JOYPAD: 0,
    };
  }

  get P1() { return this._.P1 & 0xFF; }
  get SB() { return this._.SB & 0xFF; }
  get SC() { return this._.SC & 0xFF; }
  get DIV() { return this._.DIV & 0xFF; }
  get TIMA() { return this._.TIMA & 0xFF; }
  get TMA() { return this._.TMA & 0xFF; }
  get TAC() { return this._.TAC & 0xFF; }
  get DMA() { return this._.DMAj & 0xFF; }
  get IME() { return this._.IME & 0xFF; }
  get IE_VBLANK() { return this._.IE_VBLANK & 0x01 }
  get IE_LCD_STAT() { return this._.IE_LCD_STAT & 0x01 }
  get IE_TIMER() { return this._.IE_TIMER & 0x01 }
  get IE_SERIAL() { return this._.IE_SERIAL & 0x01 }
  get IE_JOYPAD() { return this._.IE_JOYPAD & 0x01 }
  get IE() {
    return this.IE_VBLANK << 0
      | this.IE_LCD_STAT << 1
      | this.IE_TIMER << 2
      | this.IE_SERIAL << 3
      | this.IE_JOYPAD << 4;
  }
  get IF_VBLANK() { return this._.IF_VBLANK & 0x01 }
  get IF_LCD_STAT() { return this._.IF_LCD_STAT & 0x01 }
  get IF_TIMER() { return this._.IF_TIMER & 0x01 }
  get IF_SERIAL() { return this._.IF_SERIAL & 0x01 }
  get IF_JOYPAD() { return this._.IF_JOYPAD & 0x01 }
  get IF() {
    return this.IF_VBLANK << 0
      | this.IF_LCD_STAT << 1
      | this.IF_TIMER << 2
      | this.IF_SERIAL << 3
      | this.IF_JOYPAD << 4;
  }

  set P1(v) { this._.P1 = v & 0xFF }
  set SB(v) { this._.SB = v & 0xFF }
  set SC(v) { this._.SC = v & 0xFF }
  set DIV(v) { this._.DIV = v & 0xFF }
  set TIMA(v) { this._.TIMA = v & 0xFF }
  set TMA(v) { this._.TMA = v & 0xFF }
  set TAC(v) { this._.TAC = v & 0xFF }
  set DMA(v) { this._.DMA = v & 0xFF }
  set IME(v) { this._.IME = v & 0xFF }
  set IE_VBLANK(v) { this._.IE_VBLANK = v & 0x01 }
  set IE_LCD_STAT(v) { this._.IE_LCD_STAT = v & 0x01 }
  set IE_TIMER(v) { this._.IE_TIMER = v & 0x01 }
  set IE_SERIAL(v) { this._.IE_SERIAL = v & 0x01 }
  set IE_JOYPAD(v) { this._.IE_JOYPAD = v & 0x01 }
  set IE(v) {
    this.IE_VBLANK   = (v & 0x01) >> 0;
    this.IE_LCD_STAT = (v & 0x02) >> 1;
    this.IE_TIMER    = (v & 0x04) >> 2;
    this.IE_SERIAL   = (v & 0x08) >> 3;
    this.IE_JOYPAD   = (v & 0x10) >> 4;
  }
  set IF_VBLANK(v) { this._.IF_VBLANK = v & 0x01 }
  set IF_LCD_STAT(v) { this._.IF_LCD_STAT = v & 0x01 }
  set IF_TIMER(v) { this._.IF_TIMER = v & 0x01 }
  set IF_SERIAL(v) { this._.IF_SERIAL = v & 0x01 }
  set IF_JOYPAD(v) { this._.IF_JOYPAD = v & 0x01 }
  set IF(v) {
    this.IF_VBLANK   = (v & 0x01) >> 0;
    this.IF_LCD_STAT = (v & 0x02) >> 1;
    this.IF_TIMER    = (v & 0x04) >> 2;
    this.IF_SERIAL   = (v & 0x08) >> 3;
    this.IF_JOYPAD   = (v & 0x10) >> 4;
  }
}

class Operations {
  constructor(core) {
    const map = new Array(0xFF);
    const cbMap = new Array(0xFF); // 0xCB-prefix
  }

  //
  // 8-bit loads
  //

  // register <= register
  LDrr_AA() {
    this.r.A = this.r.A;
    this.cycles = 4;
  }

  LDrr_AB() {
    this.r.A = this.r.B;
    this.cycles = 4;
  }

  LDrr_AD() {
    this.r.A = this.r.B;
    this.cycles = 4;
  }

  LDrr_AH() {
    this.r.A = this.r.B;
    this.cycles = 4;
  }

  LDrr_AC() {
    this.r.A = this.r.B;
    this.cycles = 4;
  }

  LDrr_AE() {
    this.r.A = this.r.E;
    this.cycles = 4;
  }

  LDrr_AL() {
    this.r.A = this.r.L;
    this.cycles = 4;
  }

  LDrr_BA() {
    this.r.B = this.r.A;
    this.cycles = 4;
  }

  LDrr_BB() {
    this.r.B = this.r.B;
    this.cycles = 4;
  }

  LDrr_BD() {
    this.r.B = this.r.B;
    this.cycles = 4;
  }

  LDrr_BH() {
    this.r.B = this.r.B;
    this.cycles = 4;
  }

  LDrr_BC() {
    this.r.B = this.r.B;
    this.cycles = 4;
  }

  LDrr_BE() {
    this.r.B = this.r.E;
    this.cycles = 4;
  }

  LDrr_BL() {
    this.r.B = this.r.L;
    this.cycles = 4;
  }

  LDrr_DA() {
    this.r.D = this.r.A;
    this.cycles = 4;
  }

  LDrr_DB() {
    this.r.D = this.r.B;
    this.cycles = 4;
  }

  LDrr_DD() {
    this.r.D = this.r.B;
    this.cycles = 4;
  }

  LDrr_DH() {
    this.r.D = this.r.B;
    this.cycles = 4;
  }

  LDrr_DC() {
    this.r.D = this.r.B;
    this.cycles = 4;
  }

  LDrr_DE() {
    this.r.D = this.r.E;
    this.cycles = 4;
  }

  LDrr_DL() {
    this.r.D = this.r.L;
    this.cycles = 4;
  }

  LDrr_HA() {
    this.r.H = this.r.A;
    this.cycles = 4;
  }

  LDrr_HB() {
    this.r.H = this.r.B;
    this.cycles = 4;
  }

  LDrr_HD() {
    this.r.H = this.r.B;
    this.cycles = 4;
  }

  LDrr_HH() {
    this.r.H = this.r.B;
    this.cycles = 4;
  }

  LDrr_HC() {
    this.r.H = this.r.B;
    this.cycles = 4;
  }

  LDrr_HE() {
    this.r.H = this.r.E;
    this.cycles = 4;
  }

  LDrr_HL() {
    this.r.H = this.r.L;
    this.cycles = 4;
  }

  LDrr_CA() {
    this.r.C = this.r.A;
    this.cycles = 4;
  }

  LDrr_CB() {
    this.r.C = this.r.B;
    this.cycles = 4;
  }

  LDrr_CD() {
    this.r.C = this.r.B;
    this.cycles = 4;
  }

  LDrr_CH() {
    this.r.C = this.r.B;
    this.cycles = 4;
  }

  LDrr_CC() {
    this.r.C = this.r.B;
    this.cycles = 4;
  }

  LDrr_CE() {
    this.r.C = this.r.E;
    this.cycles = 4;
  }

  LDrr_CL() {
    this.r.C = this.r.L;
    this.cycles = 4;
  }

  LDrr_EA() {
    this.r.E = this.r.A;
    this.cycles = 4;
  }

  LDrr_EB() {
    this.r.E = this.r.B;
    this.cycles = 4;
  }

  LDrr_ED() {
    this.r.E = this.r.B;
    this.cycles = 4;
  }

  LDrr_EH() {
    this.r.E = this.r.B;
    this.cycles = 4;
  }

  LDrr_EC() {
    this.r.E = this.r.B;
    this.cycles = 4;
  }

  LDrr_EE() {
    this.r.E = this.r.E;
    this.cycles = 4;
  }

  LDrr_EL() {
    this.r.E = this.r.L;
    this.cycles = 4;
  }

  LDrr_LA() {
    this.r.L = this.r.A;
    this.cycles = 4;
  }

  LDrr_LB() {
    this.r.L = this.r.B;
    this.cycles = 4;
  }

  LDrr_LD() {
    this.r.L = this.r.B;
    this.cycles = 4;
  }

  LDrr_LH() {
    this.r.L = this.r.B;
    this.cycles = 4;
  }

  LDrr_LC() {
    this.r.L = this.r.B;
    this.cycles = 4;
  }

  LDrr_LE() {
    this.r.L = this.r.E;
    this.cycles = 4;
  }

  LDrr_LL() {
    this.r.L = this.r.L;
    this.cycles = 4;
  }

  // register <= value
  LDrn_A() {
    this.r.A = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_B() {
    this.r.B = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_D() {
    this.r.D = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_H() {
    this.r.H = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_C() {
    this.r.C = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_E() {
    this.r.E = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrn_L() {
    this.r.L = this.m.read8(this.r.PC);
    this.tick();
    this.cycles = 8;
  }

  LDrHL_A() {
    this.r.A = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_B() {
    this.r.B = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_D() {
    this.r.D = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_H() {
    this.r.H = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_C() {
    this.r.C = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_E() {
    this.r.E = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_E() {
    this.r.E = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDrHL_L() {
    this.r.L = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDHLr_A() {
    this.m.write8(this.r.HL, this.r.A);
    this.cycles = 8;
  }

  LDHLr_B() {
    this.m.write8(this.r.HL, this.r.B);
    this.cycles = 8;
  }

  LDHLr_D() {
    this.m.write8(this.r.HL, this.r.D);
    this.cycles = 8;
  }

  LDHLr_H() {
    this.m.write8(this.r.HL, this.r.H);
    this.cycles = 8;
  }

  LDHLr_C() {
    this.m.write8(this.r.HL, this.r.C);
    this.cycles = 8;
  }

  LDHLr_E() {
    this.m.write8(this.r.HL, this.r.E);
    this.cycles = 8;
  }

  LDHLr_L() {
    this.m.write8(this.r.HL, this.r.L);
    this.cycles = 8;
  }

  LDHLn() {
    this.m.write8(this.r.HL, this.m.read8(this.r.PC));
    this.tick();
    this.cycles = 16;
  }

  //
  LDAss_BC() {
    this.r.A = this.m.read8(this.r.BC);
    this.cycles = 8;
  }

  LDAss_DE() {
    this.r.A = this.m.read8(this.r.DE);
    this.cycles = 8;
  }

  LDAss_HL() {
    this.r.A = this.m.read8(this.r.HL);
    this.cycles = 8;
  }

  LDAss_nn() {
    this.r.A = this.m.read8(this.m.read16(this.r.PC));
    this.tickn(2);
    this.cycles = 16;
  }

  LDddA_BC() {
    this.m.write8(this.r.BC, this.r.A);
    this.cycles = 8;
  }

  LDddA_DE() {
    this.m.write8(this.r.DE, this.r.A);
    this.cycles = 8;
  }

  LDddA_HL() {
    this.m.write8(this.r.HL, this.r.A);
    this.cycles = 8;
  }

  LDddA_nn() {
    this.m.write8(this.read16(this.r.PC), this.r.A);
    this.tickn(2);
    this.cycles = 16;
  }

  LDAC() {
    this.r.A = this.m.read8(0xFF00 | this.r.C);
    this.cycles = 8;
  }

  LDCA() {
    this.m.write8(0xFF00 | this.r.C, this.r.A);
    this.cycles = 8;
  }

  LDDAHL() {
    this.r.A = this.m.read8(this.r.HL);
    this.r.HL = this.r.HL - 1;
    this.cycles = 8;
  }

  LDDHLA() {
    this.m.write8(this.r.HL, this.r.A);
    this.r.HL = this.r.HL - 1;
    this.cycles = 8;
  }

  LDIAHL() {
    this.r.A = this.m.read8(this.r.HL);
    this.r.HL = this.r.HL + 1;
    this.cycles = 8;
  }

  LDIHLA() {
    this.m.write8(this.r.HL, this.r.A);
    this.r.HL = this.r.HL + 1;
    this.cycles = 8;
  }

  LDHnA() {
    this.m.write8(0xFF00 | this.m.read8(this.r.PC), this.r.A);
    this.tick();
    this.cycles = 12;
  }

  LDHAn() {
    this.r.A = this.m.read8(0xFF00 | this.m.read8(this.r.PC));
    this.tick();
    this.cycles = 12;
  }

  // 16-bit loads
  LDddnn_BC() {
    this.r.BC = this.m.read16(this.r.PC);
    this.tickn(2);
    this.cycles = 12;
  }

  LDddnn_DE() {
    this.r.DE = this.m.read16(this.r.PC);
    this.tickn(2);
    this.cycles = 12;
  }

  LDddnn_HL() {
    this.r.HL = this.m.read16(this.r.PC);
    this.tickn(2);
    this.cycles = 12;
  }

  LDddnn_SP() {
    this.r.SP = this.m.read16(this.r.PC);
    this.tickn(2);
    this.cycles = 12;
  }

  LDnnSP() {
    this.m.write16(this.m.read16(this.r.PC), this.r.SP);
    this.tickn(2);
    this.cycles = 12;
  }

  LDSPHL() {
    this.r.SP = this.r.HL;
    this.cycles = 8;
  }

  LDHLSPe() {
    const e = this.m.read8(this.r.PC);
    this.tick();
    const se = signed8(e);
    this.r.HL = this.r.SP + se;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = halfCarry16(this.r.SP, e);
    this.r.FC = carry16(this.r.SP, e);
    this.cycles = 12;
  }

  PUSH_BC() {
    this.stackPush8(this.r.B);
    this.stackPush8(this.r.C);
    this.cycles = 16;
  }

  PUSH_DE() {
    this.stackPush8(this.r.D);
    this.stackPush8(this.r.E);
    this.cycles = 16;
  }

  PUSH_HL() {
    this.stackPush8(this.r.H);
    this.stackPush8(this.r.L);
    this.cycles = 16;
  }

  PUSH_AF() {
    this.stackPush8(this.r.A);
    this.stackPush8(this.r.F);
    this.cycles = 16;
  }

  POP_BC() {
    this.r.C = this.stackPop8();
    this.r.B = this.stackPop8();
    this.cycles = 12;
  }

  POP_DE() {
    this.r.E = this.stackPop8();
    this.r.D = this.stackPop8();
    this.cycles = 12;
  }

  POP_HL() {
    this.r.L = this.stackPop8();
    this.r.H = this.stackPop8();
    this.cycles = 12;
  }

  POP_AF() {
    this.r.F = this.stackPop8();
    this.r.A = this.stackPop8();
    this.cycles = 12;
  }

  // 8-bit ALUs
  ADDAr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 4;
  }

  ADDAn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 8;
  }

  ADDAHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    this.r.A = d0 + d1;
    this.r.FZ = zero8(d0, d1)
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1);
    this.r.FC = carry8(d0, d1);
    this.cycles = 8;
  }

  ADCAr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 4;
  }

  ADCAn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 8;
  }

  ADCAHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    const d2 = this.r.FC;
    this.r.A = d0 + d1 + d2;
    this.r.FZ = zero8(d0, d1, d2);
    this.r.FN = 0;
    this.r.FH = halfCarry8(d0, d1, d2);
    this.r.FC = carry8(d0, d1, d2);
    this.cycles = 8;
  }

  SUBr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 4;
  }

  SUBn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 8;
  }

  SUBHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    this.r.A = d0 - d1;
    this.r.FZ = zeroSub8(d0, d1);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1);
    this.r.FC = carrySub8(d0, d1);
    this.cycles = 8;
  }

  SBCr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 4;
  }

  SBCn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC); 
    this.tick();
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 8;
  }

  SBCHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL); 
    const d2 = this.r.FC;
    this.r.A = d0 - d1 - d2;
    this.r.FZ = zeroSub8(d0, d1, d2);
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(d0, d1, d2);
    this.r.FC = carrySub8(d0, d1, d2);
    this.cycles = 8;
  }

  ANDr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ANDn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 8;
  }

  ANDHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    this.r.A = d0 & d1;
    this.r.FZ = (d0 & d1) == 0;
    this.r.FN = 0;
    this.r.FH = 1;
    this.r.FC = 0;
    this.cycles = 8;
  }

  ORr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  ORn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  ORHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    this.r.A = d0 | d1;
    this.r.FZ = (d0 | d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  XORr_A() {
    const d0 = this.r.A;
    const d1 = this.r.A;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_B() {
    const d0 = this.r.A;
    const d1 = this.r.B;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_D() {
    const d0 = this.r.A;
    const d1 = this.r.D;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_H() {
    const d0 = this.r.A;
    const d1 = this.r.H;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_C() {
    const d0 = this.r.A;
    const d1 = this.r.C;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_E() {
    const d0 = this.r.A;
    const d1 = this.r.E;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORr_L() {
    const d0 = this.r.A;
    const d1 = this.r.L;
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 4;
  }

  XORn() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.PC);
    this.tick();
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  XORHL() {
    const d0 = this.r.A;
    const d1 = this.m.read8(this.r.HL);
    this.r.A = d0 ^ d1;
    this.r.FZ = (d0 ^ d1) == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  CPr_A() {
    const v = this.r.A;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_B() {
    const v = this.r.B;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_D() {
    const v = this.r.D;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_H() {
    const v = this.r.H;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_C() {
    const v = this.r.C;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_E() {
    const v = this.r.E;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPr_L() {
    const v = this.r.L;
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 4;
  }

  CPn() {
    const v = this.m.read8(this.r.PC);
    this.tick();
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 8;
  }

  CPHL() {
    const v = this.m.read8(this.r.HL);
    this.r.FZ = (this.r.A - v) == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(this.r.A, v);
    this.r.FC = carrySub8(this.r.A, v);
    this.cycles = 8;
  }

  INCr_A() {
    const r = this.r.A;
    const v = (this.r.A = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_B() {
    const r = this.r.B;
    const v = (this.r.B = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_D() {
    const r = this.r.D;
    const v = (this.r.D = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_H() {
    const r = this.r.H;
    const v = (this.r.H = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_C() {
    const r = this.r.C;
    const v = (this.r.C = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_E() {
    const r = this.r.E;
    const v = (this.r.E = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCr_L() {
    const r = this.r.L;
    const v = (this.r.L = r + 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 4;
  }

  INCHL() {
    const d = this.m.read8(this.r.HL);
    const v = d + 1;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = halfCarry8(r, 1);
    this.r.FC = carry8(r, 1);
    this.cycles = 12;
  }

  DECr_A() {
    const r = this.r.A;
    const v = (this.r.A = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_B() {
    const r = this.r.B;
    const v = (this.r.B = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_D() {
    const r = this.r.D;
    const v = (this.r.D = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_H() {
    const r = this.r.H;
    const v = (this.r.H = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_C() {
    const r = this.r.C;
    const v = (this.r.C = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_E() {
    const r = this.r.E;
    const v = (this.r.E = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECr_L() {
    const r = this.r.L;
    const v = (this.r.L = r - 1);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 4;
  }

  DECHL() {
    const r = this.m.read8(this.r.HL);
    const v = r - 1;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 1;
    this.r.FH = halfCarrySub8(r, 1);
    this.r.FC = 0;
    this.cycles = 12;
  }

  // 16-bit ALUs
  ADDHL_BC() {
    const d0 = this.r.HL;
    const d1 = this.r.BC;
    this.r.HL = d0 + d1;
    this.r.FZ = this.r.FZ; // not affected
    this.r.FN = 0;
    this.r.FH = halfCarry16(d0, d1);
    this.r.FC = carry16(d0, d1);
    this.cycles = 8;
  }

  ADDHL_DE() {
    const d0 = this.r.HL;
    const d1 = this.r.DE;
    this.r.HL = d0 + d1;
    this.r.FZ = this.r.FZ; // not affected
    this.r.FN = 0;
    this.r.FH = halfCarry16(d0, d1);
    this.r.FC = carry16(d0, d1);
    this.cycles = 8;
  }

  ADDHL_HL() {
    const d0 = this.r.HL;
    const d1 = this.r.HL;
    this.r.HL = d0 + d1;
    this.r.FZ = this.r.FZ; // not affected
    this.r.FN = 0;
    this.r.FH = halfCarry16(d0, d1);
    this.r.FC = carry16(d0, d1);
    this.cycles = 8;
  }

  ADDHL_SP() {
    const d0 = this.r.HL;
    const d1 = this.r.SP;
    this.r.HL = d0 + d1;
    this.r.FZ = this.r.FZ; // not affected
    this.r.FN = 0;
    this.r.FH = halfCarry16(d0, d1);
    this.r.FC = carry16(d0, d1);
    this.cycles = 8;
  }

  ADDSPe() {
    const v = this.r.SP;
    const e = toSign8(this.m.read8(this.r.PC));
    this.tick();
    this.r.SP = this.r.SP + e;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = halfCarry16(v, e); // TODO: need to check sign?
    this.r.FC = carry16(v, e);
    this.cycles = 16;
  }

  INC_BC() {
    this.r.BC = this.r.BC + 1;
    this.cycles = 8;
  }

  INC_DE() {
    this.r.DE = this.r.DE + 1;
    this.cycles = 8;
  }

  INC_HL() {
    this.r.HL = this.r.HL + 1;
    this.cycles = 8;
  }

  INC_SP() {
    this.r.SP = this.r.SP + 1;
    this.cycles = 8;
  }

  DEC_BC() {
    this.r.BC = this.r.BC - 1;
    this.cycles = 8;
  }

  DEC_DE() {
    this.r.DE = this.r.DE - 1;
    this.cycles = 8;
  }

  DEC_HL() {
    this.r.HL = this.r.HL - 1;
    this.cycles = 8;
  }

  DEC_SP() {
    this.r.SP = this.r.SP - 1;
    this.cycles = 8;
  }

  // Misc
  SWAPr_A() {
    const v = this.r.A;
    const s = (this.r.A = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_B() {
    const v = this.r.B;
    const s = (this.r.B = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_D() {
    const v = this.r.D;
    const s = (this.r.D = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_H() {
    const v = this.r.H;
    const s = (this.r.H = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_C() {
    const v = this.r.C;
    const s = (this.r.C = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_E() {
    const v = this.r.E;
    const s = (this.r.E = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPr_L() {
    const v = this.r.L;
    const s = (this.r.L = (v & 0xF0) >> 4 | (v & 0x0F) << 4);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  SWAPHL() {
    const v = this.m.read8(this.r.HL);
    const s = (v & 0xF0) >> 4 | (v & 0x0F) << 4;
    this.m.write8(this.r.HL, s);
    this.r.FZ = s == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = 0;
    this.cycles = 8;
  }

  DAA() { // TODO: check how to use
    const v = parseInt(this.r.A.toString(16), 10);
    this.r.A = v;
    this.r.FZ = v == 0;
    this.r.FH = 0;
    this.r.FC = v > 0xFF;
    this.cycles = 4;
  }

  CPL() {
    this.r.A = ~this.r.A;
    this.r.FN = 1;
    this.r.FH = 1;
    this.cycles = 4;
  }

  CCF() {
    this.r.FC = ~this.r.FC;
    this.r.FN = 0;
    this.r.FH = 0;
    this.cycles = 4;
  }

  SCF() {
    this.r.FC = 1;
    this.r.FN = 0;
    this.r.FH = 0;
    this.cycles = 4;
  }

  NOP() {
    this.cycles = 4;
  }

  HALT() { // TODO: implement me
    this.cycles = 4;
  }

  STOP() { // TODO: implement me
    this.cycles = 4;
  }

  DI() {
    this.sys.IME = 0;
    this.cycles = 4;
  }

  EI() {
    this.sys.IME = 1;
    this.cycles = 4;
  }

  // Rotates
  RLCA() {
    const r = this.r.A;
    const v = (r << 1) & 0xFF | (r & 0x80) >> 7;
    this.r.A = v;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 4;
  }

  RLA() {
    const r = this.r.A;
    const v = (r << 1) & 0xFF | this.r.FC;
    this.r.A = v;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 4;
  }

  RRCA() {
    const r = this.r.A;
    const v = (r >> 1) & 0x7F | (r & 0x01) << 7;
    this.r.A = v;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 4;
  }

  RRA() {
    const r = this.r.A;
    const v = (r >> 1) & 0x7F | this.r.FC << 7;
    this.r.A = v;
    this.r.FZ = 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 4;
  }

  RLCr_A() {
    const r = this.r.A;
    const v = (this.r.A = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCr_B() {
    const r = this.r.B;
    const v = (this.r.B = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCr_D() {
    const r = this.r.D;
    const v = (this.r.D = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCr_H() {
    const r = this.r.H;
    const v = (this.r.H = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCr_C() {
    const r = this.r.C;
    const v = (this.r.C = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCr_E() {
    const r = this.r.E;
    const v = (this.r.E = (r << 1) & 0xFF | r >> 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLCHL() {
    const r = this.m.read8(this.r.HL);
    const v = (r << 1) & 0xFF | r >> 7;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 16;
  }

  RLr_A() {
    const r = this.r.A;
    const v = (this.r.A = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_B() {
    const r = this.r.B;
    const v = (this.r.B = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_D() {
    const r = this.r.D;
    const v = (this.r.D = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_H() {
    const r = this.r.H;
    const v = (this.r.H = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_C() {
    const r = this.r.C;
    const v = (this.r.C = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_E() {
    const r = this.r.E;
    const v = (this.r.E = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLr_L() {
    const r = this.r.L;
    const v = (this.r.L = (r << 1) & 0xFF | this.r.FC);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  RLHL() {
    const r = this.m.read8(this.r.HL);
    const v = (r << 1) & 0xFF | this.r.FC;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 16;
  }

  RRCr_A() {
    const r = this.r.A;
    const v = (this.r.A = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_B() {
    const r = this.r.B;
    const v = (this.r.B = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_D() {
    const r = this.r.D;
    const v = (this.r.D = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_H() {
    const r = this.r.H;
    const v = (this.r.H = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_C() {
    const r = this.r.C;
    const v = (this.r.C = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_E() {
    const r = this.r.E;
    const v = (this.r.E = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCr_L() {
    const r = this.r.L;
    const v = (this.r.L = (r >> 1) & 0xFF | (r & 0x01) << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRCHL() {
    const r = this.m.read8(this.r.HL);
    const v = (r >> 1) & 0xFF | (r & 0x01) << 7;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 16;
  }

  RRr_A() {
    const r = this.r.A;
    const v = (this.r.A = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_B() {
    const r = this.r.B;
    const v = (this.r.B = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_D() {
    const r = this.r.D;
    const v = (this.r.D = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_H() {
    const r = this.r.H;
    const v = (this.r.H = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_C() {
    const r = this.r.C;
    const v = (this.r.C = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_E() {
    const r = this.r.E;
    const v = (this.r.E = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRr_L() {
    const r = this.r.L;
    const v = (this.r.L = (r >> 1) & 0xFF | this.r.FC << 7);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  RRHL() {
    const r = this.m.read8(this.r.HL);
    const v = (r >> 1) & 0xFF | this.r.FC << 7;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 16;
  }

  // Shifts
  SLAr_A() {
    const r = this.r.A;
    const v = (this.r.A = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_B() {
    const r = this.r.B;
    const v = (this.r.B = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_D() {
    const r = this.r.D;
    const v = (this.r.D = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_H() {
    const r = this.r.H;
    const v = (this.r.H = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_C() {
    const r = this.r.C;
    const v = (this.r.C = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_E() {
    const r = this.r.E;
    const v = (this.r.E = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAr_L() {
    const r = this.r.L;
    const v = (this.r.L = (r << 1) & 0xFE);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 8;
  }

  SLAHL() {
    const r = this.m.read8(this.r.HL);
    const v = (this.r.L = (r << 1) & 0xFE);
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x80;
    this.cycles = 16;
  }

  SRAr_A() {
    const r = this.r.A;
    const v = (this.r.A = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_B() {
    const r = this.r.B;
    const v = (this.r.B = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_D() {
    const r = this.r.D;
    const v = (this.r.D = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_H() {
    const r = this.r.H;
    const v = (this.r.H = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_C() {
    const r = this.r.C;
    const v = (this.r.C = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_E() {
    const r = this.r.E;
    const v = (this.r.E = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAr_L() {
    const r = this.r.L;
    const v = (this.r.L = r & 0x80 | r >> 1);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRAHL() {
    const r = this.m.read8(this.r.HL);
    const v = r & 0x80 | r >> 1;
    this.m.write8(this.r.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 16;
  }

  SRLr_A() {
    const r = this.r.A;
    const v = (this.r.A = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_B() {
    const r = this.r.B;
    const v = (this.r.B = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_D() {
    const r = this.r.D;
    const v = (this.r.D = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_H() {
    const r = this.r.H;
    const v = (this.r.H = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_C() {
    const r = this.r.C;
    const v = (this.r.C = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_E() {
    const r = this.r.E;
    const v = (this.r.E = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLr_L() {
    const r = this.r.L;
    const v = (this.r.L = r >> 1 & 0x7F);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 8;
  }

  SRLHL() {
    const r = this.m.read8(this.HL);
    const v = r >> 1 & 0x7F;
    this.m.write8(this.HL, v);
    this.r.FZ = v == 0;
    this.r.FN = 0;
    this.r.FH = 0;
    this.r.FC = r & 0x01;
    this.cycles = 16;
  }

  // Bit
  BITr_A(b) {
    this.r.FZ = !(this.r.A & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_B(b) {
    this.r.FZ = !(this.r.B & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_D(b) {
    this.r.FZ = !(this.r.D & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_H(b) {
    this.r.FZ = !(this.r.H & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_C(b) {
    this.r.FZ = !(this.r.C & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_E(b) {
    this.r.FZ = !(this.r.E & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITr_L(b) {
    this.r.FZ = !(this.r.L & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 8;
  }

  BITHL(b) {
    this.r.FZ = !(this.m.read8(this.r.HL) & 1 << b);
    this.r.FN = 0;
    this.r.FH = 1;
    this.cycles = 12;
  }

  SETr_A(b) {
    this.r.A = this.r.A | 1 << b;
    this.cycles = 8;
  }

  SETr_B(b) {
    this.r.B = this.r.B | 1 << b;
    this.cycles = 8;
  }

  SETr_D(b) {
    this.r.D = this.r.D | 1 << b;
    this.cycles = 8;
  }

  SETr_H(b) {
    this.r.H = this.r.H | 1 << b;
    this.cycles = 8;
  }

  SETr_C(b) {
    this.r.C = this.r.C | 1 << b;
    this.cycles = 8;
  }

  SETr_E(b) {
    this.r.E = this.r.E | 1 << b;
    this.cycles = 8;
  }

  SETr_L(b) {
    this.r.L = this.r.L | 1 << b;
    this.cycles = 8;
  }

  SETHL(b) {
    const v = this.m.read8(this.r.HL);
    this.m.write8(this.r.HL, v | 1 << b);
    this.cycles = 16;
  }

  RESr_A(b) {
    this.r.A = ~(~this.r.A & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_B(b) {
    this.r.B = ~(~this.r.B & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_D(b) {
    this.r.D = ~(~this.r.D & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_H(b) {
    this.r.H = ~(~this.r.H & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_C(b) {
    this.r.C = ~(~this.r.C & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_E(b) {
    this.r.E = ~(~this.r.E & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESr_L(b) {
    this.r.L = ~(~this.r.L & 0xFF | 1 << b);
    this.cycles = 8;
  }

  RESHL(b) {
    const r = this.m.read8(this.r.HL);
    this.m.write8(this.r.HL, ~(~r & 0xFF | 1 << b));
    this.cycles = 16;
  }

  // Jumps
  JPnn() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    if (this.r.FC) {
      this.r.PC = addr;
      this.cycles = 16;
    } else {
      this.cycles = 12;
    }
  }

  JPccnn_C() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    if (this.r.FC) {
      this.r.PC = addr;
      this.cycles = 16;
    } else {
      this.cycles = 12;
    }
  }

  JPccnn_NC() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    if (!this.r.FC) {
      this.r.PC = addr;
      this.cycles = 16;
    } else {
      this.cycles = 12;
    }
  }

  JPccnn_Z() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    if (this.r.FZ) {
      this.r.PC = addr;
      this.cycles = 16;
    } else {
      this.cycles = 12;
    }
  }

  JPccnn_NZ() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    if (!this.r.FZ) {
      this.r.PC = addr;
      this.cycles = 16;
    } else {
      this.cycles = 12;
    }
  }

  JPHL() {
    this.r.PC = this.r.HL;
    this.cycles = 4;
  }

  JRe() {
    const e = signed8(this.m.read16(this.r.PC));
    this.tickn(1 + e);
    this.cycles = 12;
  }

  JRcce_C() {
    const e = signed8(this.m.read16(this.r.PC));
    this.tick();
    if (this.r.FC) {
      this.tickn(e);
      this.cycles = 12;
    } else {
      this.cycles = 8;
    }
  }
}

function zero8(d0, d1, d2) {
  d2 = d2 || 0;
  return (d0 + d1 + d2) == 0;
}

function zeroSub8(d0, d1, d2) {
  d2 = d2 || 0;
  return (d0 - d1 - d2) == 0;
}

function signed8(v) {
  if (v & 0x80) {
    return ((~n + 1) & 0xFF) * -1;
  } else {
    return n;
  }
}

function carry8(d0, d1, d2) {
  d2 = d2 || 0;
  return d0 + d1 + d2 > 0xFF;
}

function halfCarry8(d0, d1, d2) {
  d2 = d2 || 0;
  return d0 + d1 + d2 > 0x0F;
}

function carrySub8() {
  d2 = d2 || 0;
  return d0 < d1 + d2;
}

function halfCarrySub8() {
  d2 = d2 || 0;
  return d0 & 0x0F < d1 & 0x0F + d2 & 0x0F;
}

function carry16(d0, d1, d2) {
  d2 = d2 || 0;
  return d0 + d1 + d2 > 0xFFFF;
}

function halfCarry16(d0, d1, d2) {
  d2 = d2 || 0;
  return d0 + d1 + d2 > 0x0FFF;
}

/*********************************
Interrupt Enable Register
-------------------------- FFFF
Internal RAM
-------------------------- FF80
Empty but unusable for I/O
-------------------------- FF4C
I/O ports
-------------------------- FF00
Empty but unusable for I/O
-------------------------- FEA0
Sprite Attrib Memory
-------------------------- FE00
Echo of 8kB Internal RAM
-------------------------- E000
8kB Internal RAM
-------------------------- C000
8kB switchable RAM bank
-------------------------- A000
8kB Video RAM
-------------------------- 8000 --
16kB switchable ROM bank
-------------------------- 4000   = 32kB Cartridge
16kB ROM bank #0
-------------------------- 0000 --
**********************************/
class RAM {
  constructor(core) {
    this.core = core;
    this.data = new Array(0x10000);
  }

  read8(addr) {
    if ((addr & 0xFF00) == 0xFF00) {
      switch (addr & 0xFF) {
      case 0x00: return this.core.sys.P1;
      case 0x01: return this.core.sys.SB;
      case 0x02: return this.core.sys.SC;
      case 0x04: return this.core.sys.DIV;
      case 0x05: return this.core.sys.TIMA;
      case 0x06: return this.core.sys.TMA;
      case 0x07: return this.core.sys.TAC;
      case 0x0F: return this.core.sys.IF;
      case 0x40: return this.core.lcd.LCDC;
      case 0x41: return this.core.lcd.STAT;
      case 0x42: return this.core.lcd.SCY;
      case 0x43: return this.core.lcd.SCX;
      case 0x44: return this.core.lcd.LY;
      case 0x45: return this.core.lcd.LYC;
      case 0x46: return this.core.sys.DMA;
      case 0x47: return this.core.lcd.BGP;
      case 0x48: return this.core.lcd.OBP0;
      case 0x49: return this.core.lcd.OBP1;
      case 0x4A: return this.core.lcd.WY;
      case 0x4B: return this.core.lcd.WX;
      case 0xFF: return this.core.sys.IE;
      }
    }

    if (addr >= 0xC000 && addr < 0xDE00) {
      return this.data[addr]; // TODO
    }

    if (addr >= 0xE000 && addr < 0xFE00) {
      return this.data[addr - 0x2000]; // TODO
    }

    return this.data[addr];
  }

  write8(addr, v) {
    v &= 0xFF;

    if ((addr & 0xFF00) == 0xFF00) {
      switch (addr & 0xFF) {
      case 0x00: return this.core.sys.P1 = v;
      case 0x01: return this.core.sys.SB = v;
      case 0x02: return this.core.sys.SC = v;
      case 0x04: return this.core.sys.DIV = v;
      case 0x05: return this.core.sys.TIMA = v;
      case 0x06: return this.core.sys.TMA = v;
      case 0x07: return this.core.sys.TAC = v;
      case 0x0F: return this.core.sys.IF = v;
      case 0x40: return this.core.lcd.LCDC = v;
      case 0x41: return this.core.lcd.STAT = v;
      case 0x42: return this.core.lcd.SCY = v;
      case 0x43: return this.core.lcd.SCX = v;
      case 0x44: return this.core.lcd.LY = v;
      case 0x45: return this.core.lcd.LYC = v;
      case 0x46: return this.core.sys.DMA = v;
      case 0x47: return this.core.lcd.BGP = v;
      case 0x48: return this.core.lcd.OBP0 = v;
      case 0x49: return this.core.lcd.OBP1 = v;
      case 0x4A: return this.core.lcd.WY = v;
      case 0x4B: return this.core.lcd.WX = v;
      case 0xFF: return this.core.sys.IE = v;
      }
    }

    if (addr >= 0xC000 && addr < 0xDE00) {
      return this.data[addr] = v; // TODO
    }

    if (addr >= 0xE000 && addr < 0xFE00) {
      return this.data[addr - 0x2000] = v;
    }

    return this.data[addr] = v;
  }

  read16(addr) {
    return this.read8(addr) | this.read8(addr + 1) << 8;
  }

  write16(addr, v) {
    this.write8(addr, data & 0x00FF);
    this.write8(addr + 1, (data & 0xFF00) >> 8);
  }
}

class LCD {
  constructor() {
    this._ = {
      STAT: 0,
      SCY: 0,
      SCX: 0,
      LY: 0,
      LYC: 0,
      BGP: 0,
      OBP0: 0,
      OBP1: 0,
      WY: 0,
      WX: 0,
    };
  }

  get STAT() { return this._.STAT & 0xFF }
  get SCY() { return this._.SCY & 0xFF }
  get SCX() { return this._.SCX & 0xFF }
  get LY() { return this._.LY & 0xFF }
  get LYC() { return this._.LYC & 0xFF }
  get BGP() { return this._.BGP & 0xFF }
  get OBP0() { return this._.OBP0 & 0xFF }
  get OBP1() { return this._.OBP1 & 0xFF }
  get WY() { return this._.WY & 0xFF }
  get WX() { return this._.WX & 0xFF }

  set STAT(v) { this._.STAT = v & 0xFF }
  set SCY(v) { this._.SCY = v & 0xFF }
  set SCX(v) { this._.SCX = v & 0xFF }
  set LY(v) { this._.LY = v & 0xFF }
  set LYC(v) { this._.LYC = v & 0xFF }
  set BGP(v) { this._.BGP = v & 0xFF }
  set OBP0(v) { this._.OBP0 = v & 0xFF }
  set OBP1(v) { this._.OBP1 = v & 0xFF }
  set WY(v) { this._.WY = v & 0xFF }
  set WX(v) { this._.WX = v & 0xFF }
}

class Core {
  constructor() {
    this.r = new Registers(this);
    this.m = new RAM(this);
    this.sys = new System(this);
    this.lcd = new LCD(this);
    this.op = new Operations(this);
  }

  tick() {
    this.r.PC = this.r.PC + 1;
  }

  tickn(n) {
    this.r.PC = this.r.PC + n;
  }

  stackPush8(v) {
    this.r.SP = this.r.SP - 1;
    this.m.write8(this.r.SP, v);
  }

  stackPop8() {
    const v = this.m.read8(this.r.SP);
    this.r.SP = this.r.SP + 1;
    return v;
  }
}
