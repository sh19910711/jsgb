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
}

class Operations {
  constructor(core) {
    const map = new Array(0xFF);
    const cbMap = new Array(0xFF); // 0xCB-prefix
  }

  LDrr_AA() {
    this.r.A = this.r.A;
    this.clocks = 4;
  }

  LDrr_AB() {
    this.r.A = this.r.B;
    this.clocks = 4;
  }

  LDrr_AD() {
    this.r.A = this.r.B;
    this.clocks = 4;
  }

  LDrr_AH() {
    this.r.A = this.r.B;
    this.clocks = 4;
  }

  LDrr_AC() {
    this.r.A = this.r.B;
    this.clocks = 4;
  }

  LDrr_AE() {
    this.r.A = this.r.E;
    this.clocks = 4;
  }

  LDrr_AL() {
    this.r.A = this.r.L;
    this.clocks = 4;
  }

  LDrr_BA() {
    this.r.B = this.r.A;
    this.clocks = 4;
  }

  LDrr_BB() {
    this.r.B = this.r.B;
    this.clocks = 4;
  }

  LDrr_BD() {
    this.r.B = this.r.B;
    this.clocks = 4;
  }

  LDrr_BH() {
    this.r.B = this.r.B;
    this.clocks = 4;
  }

  LDrr_BC() {
    this.r.B = this.r.B;
    this.clocks = 4;
  }

  LDrr_BE() {
    this.r.B = this.r.E;
    this.clocks = 4;
  }

  LDrr_BL() {
    this.r.B = this.r.L;
    this.clocks = 4;
  }

  LDrr_DA() {
    this.r.D = this.r.A;
    this.clocks = 4;
  }

  LDrr_DB() {
    this.r.D = this.r.B;
    this.clocks = 4;
  }

  LDrr_DD() {
    this.r.D = this.r.B;
    this.clocks = 4;
  }

  LDrr_DH() {
    this.r.D = this.r.B;
    this.clocks = 4;
  }

  LDrr_DC() {
    this.r.D = this.r.B;
    this.clocks = 4;
  }

  LDrr_DE() {
    this.r.D = this.r.E;
    this.clocks = 4;
  }

  LDrr_DL() {
    this.r.D = this.r.L;
    this.clocks = 4;
  }

  LDrr_HA() {
    this.r.H = this.r.A;
    this.clocks = 4;
  }

  LDrr_HB() {
    this.r.H = this.r.B;
    this.clocks = 4;
  }

  LDrr_HD() {
    this.r.H = this.r.B;
    this.clocks = 4;
  }

  LDrr_HH() {
    this.r.H = this.r.B;
    this.clocks = 4;
  }

  LDrr_HC() {
    this.r.H = this.r.B;
    this.clocks = 4;
  }

  LDrr_HE() {
    this.r.H = this.r.E;
    this.clocks = 4;
  }

  LDrr_HL() {
    this.r.H = this.r.L;
    this.clocks = 4;
  }

  LDrr_CA() {
    this.r.C = this.r.A;
    this.clocks = 4;
  }

  LDrr_CB() {
    this.r.C = this.r.B;
    this.clocks = 4;
  }
}

class Core {
  constructor() {
    this.r = new Registers;
    this.op = new Operations(this);
  }

  tick() {
  }
}
