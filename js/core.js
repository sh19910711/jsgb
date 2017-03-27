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

  set P1(v) { this.P1 = v & 0xFF }
  set SB(v) { this.SB = v & 0xFF }
  set SC(v) { this.SC = v & 0xFF }
  set DIV(v) { this.DIV = v & 0xFF }
  set TIMA(v) { this.TIMA = v & 0xFF }
  set TMA(v) { this.TMA = v & 0xFF }
  set TAC(v) { this.TAC = v & 0xFF }
  set DMA(v) { this.DMA = v & 0xFF }
  set IME(v) { this.IME = v & 0xFF }
  set IE_VBLANK(v) { this.IE_VBLANK = v & 0x01 }
  set IE_LCD_STAT(v) { this.IE_LCD_STAT = v & 0x01 }
  set IE_TIMER(v) { this.IE_TIMER = v & 0x01 }
  set IE_SERIAL(v) { this.IE_SERIAL = v & 0x01 }
  set IE_JOYPAD(v) { this.IE_JOYPAD = v & 0x01 }
  set IE(v) {
    this.IE_VBLANK   = (v & 0x01) >> 0;
    this.IE_LCD_STAT = (v & 0x02) >> 1;
    this.IE_TIMER    = (v & 0x04) >> 2;
    this.IE_SERIAL   = (v & 0x08) >> 3;
    this.IE_JOYPAD   = (v & 0x10) >> 4;
  }
  set IF_VBLANK(v) { this.IF_VBLANK = v & 0x01 }
  set IF_LCD_STAT(v) { this.IF_LCD_STAT = v & 0x01 }
  set IF_TIMER(v) { this.IF_TIMER = v & 0x01 }
  set IF_SERIAL(v) { this.IF_SERIAL = v & 0x01 }
  set IF_JOYPAD(v) { this.IF_JOYPAD = v & 0x01 }
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
      case 0xFF: return this.system.IE;
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
}
