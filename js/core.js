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

    function nothing() {}

    // 0x00
    map[0x00] = this.NOP;
    map[0x01] = this.LDddnn_BC;
    map[0x02] = this.LDddA_BC;
    map[0x03] = this.INC_BC;
    map[0x04] = this.INCr_B;
    map[0x05] = this.DECr_B;
    map[0x06] = this.LDrn_B;
    map[0x07] = this.RLCr_A;
    map[0x08] = this.LDnnSP;
    map[0x09] = this.ADDHL_BC;
    map[0x0a] = this.LDAss_BC;
    map[0x0b] = this.DEC_BC;
    map[0x0c] = this.INCr_C;
    map[0x0d] = this.DECr_C;
    map[0x0e] = this.LDrn_C;
    map[0x0f] = this.RRCr_A;

    // 0x10
    map[0x10] = this.STOP;
    map[0x11] = this.LDddnn_DE;
    map[0x12] = this.LDddA_DE;
    map[0x13] = this.INC_DE;
    map[0x14] = this.INCr_D;
    map[0x15] = this.DECr_D;
    map[0x16] = this.LDrn_D;
    map[0x17] = this.RLr_A;
    map[0x18] = this.JRe;
    map[0x19] = this.ADDHL_DE;
    map[0x1a] = this.LDAss_DE;
    map[0x1b] = this.DEC_DE;
    map[0x1c] = this.INCr_E;
    map[0x1d] = this.DECr_E;
    map[0x1e] = this.LDrn_e;
    map[0x1f] = this.RRr_A;

    // 0x20
    map[0x20] = this.JRcce_NZ;
    map[0x21] = this.LDddnn_HL;
    map[0x22] = this.LDIHLA;
    map[0x23] = this.INC_HL;
    map[0x24] = this.INCr_H;
    map[0x25] = this.DECr_H;
    map[0x26] = this.LDrn_H;
    map[0x27] = this.DAA;
    map[0x28] = this.JRcce_Z;
    map[0x29] = this.ADDHL_HL;
    map[0x2a] = this.LDIAHL;
    map[0x2b] = this.DEC_HL;
    map[0x2c] = this.INCr_L;
    map[0x2d] = this.DECr_L;
    map[0x2e] = this.LDrn_L;
    map[0x2f] = this.CPL;

    // 0x30
    map[0x30] = this.JRcce_NC;
    map[0x31] = this.LDddnn_SP;
    map[0x32] = this.LDDHLA;
    map[0x33] = this.INC_SP;
    map[0x34] = this.INCHL;
    map[0x35] = this.DECHL;
    map[0x36] = this.LDHLn;
    map[0x37] = this.SCF;
    map[0x38] = this.JRcce_C;
    map[0x39] = this.ADDHL_SP;
    map[0x3a] = this.LDDAHL;
    map[0x3b] = this.DEC_SP;
    map[0x3c] = this.INCr_A;
    map[0x3d] = this.DECr_A;
    map[0x3e] = this.LDrn_A;
    map[0x3f] = this.CCF;

    // 0x40
    map[0x40] = this.LDrr_BB;
    map[0x41] = this.LDrr_BC;
    map[0x42] = this.LDrr_BD;
    map[0x43] = this.LDrr_BE;
    map[0x44] = this.LDrr_BH;
    map[0x45] = this.LDrr_BL;
    map[0x46] = this.LDrHL_B;
    map[0x47] = this.LDrr_BA;
    map[0x48] = this.LDrr_CB;
    map[0x49] = this.LDrr_CC;
    map[0x4a] = this.LDrr_CD;
    map[0x4b] = this.LDrr_CE;
    map[0x4c] = this.LDrr_CH;
    map[0x4d] = this.LDrr_CL;
    map[0x4e] = this.LDrHL_C;
    map[0x4f] = this.LDrr_CA;

    // 0x50
    map[0x50] = this.LDrr_DB;
    map[0x51] = this.LDrr_DC;
    map[0x52] = this.LDrr_DD;
    map[0x53] = this.LDrr_DE;
    map[0x54] = this.LDrr_DH;
    map[0x55] = this.LDrr_DL;
    map[0x56] = this.LDrHL_D;
    map[0x57] = this.LDrr_DA;
    map[0x58] = this.LDrr_EB;
    map[0x59] = this.LDrr_EC;
    map[0x5a] = this.LDrr_ED;
    map[0x5b] = this.LDrr_EE;
    map[0x5c] = this.LDrr_EH;
    map[0x5d] = this.LDrr_EL;
    map[0x5e] = this.LDrHL_E;
    map[0x5f] = this.LDrr_EA;

    // 0x60
    map[0x60] = this.LDrr_HB;
    map[0x61] = this.LDrr_HC;
    map[0x62] = this.LDrr_HD;
    map[0x63] = this.LDrr_HE;
    map[0x64] = this.LDrr_HH;
    map[0x65] = this.LDrr_HL;
    map[0x66] = this.LDrHL_H;
    map[0x67] = this.LDrr_HA;
    map[0x68] = this.LDrr_LB;
    map[0x69] = this.LDrr_LC;
    map[0x6a] = this.LDrr_LD;
    map[0x6b] = this.LDrr_LE;
    map[0x6c] = this.LDrr_LH;
    map[0x6d] = this.LDrr_LL;
    map[0x6e] = this.LDrHL_L;
    map[0x6f] = this.LDrr_LA;

    // 0x70
    map[0x70] = this.LDHLr_B;
    map[0x71] = this.LDHLr_C;
    map[0x72] = this.LDHLr_D;
    map[0x73] = this.LDHLr_E;
    map[0x74] = this.LDHLr_H;
    map[0x75] = this.LDHLr_L;
    map[0x76] = this.HALT;
    map[0x77] = this.LDHLr_A;
    map[0x78] = this.LDrr_AB;
    map[0x79] = this.LDrr_AC;
    map[0x7a] = this.LDrr_AD;
    map[0x7b] = this.LDrr_AE;
    map[0x7c] = this.LDrr_AH;
    map[0x7d] = this.LDrr_AL;
    map[0x7e] = this.LDrHL_A;
    map[0x7f] = this.LDrr_AA;

    // 0x80
    map[0x80] = this.ADDAr_B;
    map[0x81] = this.ADDAr_C;
    map[0x82] = this.ADDAr_D;
    map[0x83] = this.ADDAr_E;
    map[0x84] = this.ADDAr_H;
    map[0x85] = this.ADDAr_L;
    map[0x86] = this.ADDAHL;
    map[0x87] = this.ADDAr_A;
    map[0x88] = this.ADCAr_B;
    map[0x89] = this.ADCAr_C;
    map[0x8a] = this.ADCAr_D;
    map[0x8b] = this.ADCAr_E;
    map[0x8c] = this.ADCAr_H;
    map[0x8d] = this.ADCAr_H;
    map[0x8e] = this.ADCAHL;
    map[0x8f] = this.ADCAr_A;

    // 0x90
    map[0x90] = this.SUBr_B;
    map[0x91] = this.SUBr_C;
    map[0x92] = this.SUBr_D;
    map[0x93] = this.SUBr_E;
    map[0x94] = this.SUBr_H;
    map[0x95] = this.SUBr_L;
    map[0x96] = this.SUBHL;
    map[0x97] = this.SUBr_A;
    map[0x98] = this.SBCr_B;
    map[0x99] = this.SBCr_C;
    map[0x9a] = this.SBCr_D;
    map[0x9b] = this.SBCr_E;
    map[0x9c] = this.SBCr_H;
    map[0x9d] = this.SBCr_L;
    map[0x9e] = this.SBCHL;
    map[0x9f] = this.SBCr_A;

    // 0xA0
    map[0xa0] = this.ANDr_B;
    map[0xa1] = this.ANDr_C;
    map[0xa2] = this.ANDr_D;
    map[0xa3] = this.ANDr_E;
    map[0xa4] = this.ANDr_H;
    map[0xa5] = this.ANDr_L;
    map[0xa6] = this.ANDHL;
    map[0xa7] = this.ANDr_A;
    map[0xa8] = this.XORr_B;
    map[0xa9] = this.XORr_C;
    map[0xaa] = this.XORr_D;
    map[0xab] = this.XORr_E;
    map[0xac] = this.XORr_H;
    map[0xad] = this.XORr_L;
    map[0xae] = this.XORHL;
    map[0xaf] = this.XORr_A;

    // 0xB0
    map[0xb0] = this.ORr_B;
    map[0xb1] = this.ORr_C;
    map[0xb2] = this.ORr_D;
    map[0xb3] = this.ORr_E;
    map[0xb4] = this.ORr_H;
    map[0xb5] = this.ORr_L;
    map[0xb6] = this.ORHL;
    map[0xb7] = this.ORr_A;
    map[0xb8] = this.CPr_B;
    map[0xb9] = this.CPr_C;
    map[0xba] = this.CPr_D;
    map[0xbb] = this.CPr_E;
    map[0xbc] = this.CPr_H;
    map[0xbd] = this.CPr_L;
    map[0xbe] = this.CPHL;
    map[0xbf] = this.CPr_A;

    // 0xC0
    map[0xc0] = this.RETcc_NZ;
    map[0xc1] = this.POP_BC;
    map[0xc2] = this.JPccnn_NZ;
    map[0xc3] = this.JPnn;
    map[0xc4] = this.CALLccnn_NZ;
    map[0xc5] = this.PUSH_BC;
    map[0xc6] = this.ADDAn;
    map[0xc7] = this.RST_f(0x00);
    map[0xc8] = this.RETcc_Z;
    map[0xc9] = this.RET;
    map[0xca] = this.JPccnn_Z;
    map[0xcb] = function() {
      const op = this.m.read8(this.r.PC);
      this.tick();
      // TODO: call cbMap
    };
    map[0xcc] = this.CALLccnn_Z;
    map[0xcd] = this.CALLnn;
    map[0xce] = this.SBCn;
    map[0xcf] = this.RST_f(0x08);

    // 0xD0
    map[0xd0] = this.RETcc_NZ;
    map[0xd1] = this.POP_DE;
    map[0xd2] = this.JPccnn_NC;
    map[0xd3] = nothing;
    map[0xd4] = this.CALLccnn_NC;
    map[0xd5] = this.PUSH_DE;
    map[0xd6] = this.SUBn;
    map[0xd7] = this.RST_f(0x10);
    map[0xd8] = this.RETcc_Z;
    map[0xd9] = this.RET;
    map[0xda] = this.JPccnn_C;
    map[0xdb] = nothing;
    map[0xdc] = this.CALLccnn_C;
    map[0xdd] = nothing;
    map[0xde] = this.SBCn;
    map[0xdf] = this.RST_f(0x18);

    // 0xE0
    map[0xe0] = this.LDHnA;
    map[0xe1] = this.POP_HL;
    map[0xe2] = this.LDCA;
    map[0xe3] = nothing;
    map[0xe4] = nothing;
    map[0xe5] = this.PUSH_HL;
    map[0xe6] = this.ANDrn;
    map[0xe7] = this.RST_f(0x20);
    map[0xe8] = this.ADDSPe;
    map[0xe9] = this.JPHL;
    map[0xea] = this.LDddA_nn;
    map[0xeb] = nothing;
    map[0xec] = nothing;
    map[0xed] = nothing;
    map[0xee] = this.XORn;
    map[0xef] = this.RST_f(0x28);

    // 0xF0
    map[0xf0] = this.LDHAn;
    map[0xf1] = this.POP_AF;
    map[0xf2] = nothing;
    map[0xf3] = this.DI;
    map[0xf4] = nothing;
    map[0xf5] = this.PUSH_AF;
    map[0xf6] = this.ORn;
    map[0xf7] = this.RST_f(0x30);
    map[0xf8] = this.LDHLSPe;
    map[0xf9] = this.LDSPHL;
    map[0xfa] = this.LDAss_nn;
    map[0xfb] = this.EI;
    map[0xfc] = nothing;
    map[0xfd] = nothing;
    map[0xfe] = this.CPn;
    map[0xff] = this.RST_f(0x38);

    const cbMap = new Array(0xFF); // 0xCB-prefix

    // 0x00
    cbMap[0x00] = this.RLCr_B;
    cbMap[0x01] = this.RLCr_C;
    cbMap[0x02] = this.RLCr_D;
    cbMap[0x03] = this.RLCr_E;
    cbMap[0x04] = this.RLCr_H;
    cbMap[0x05] = this.RLCr_L;
    cbMap[0x06] = this.RLCHL;
    cbMap[0x07] = this.RLCr_A;
    cbMap[0x08] = this.RRCr_B;
    cbMap[0x09] = this.RRCr_C;
    cbMap[0x0a] = this.RRCr_D;
    cbMap[0x0b] = this.RRCr_E;
    cbMap[0x0c] = this.RRCr_H;
    cbMap[0x0d] = this.RRCr_L;
    cbMap[0x0e] = this.RRCHL;
    cbMap[0x0f] = this.RRCr_A;

    // 0x10
    cbMap[0x10] = this.RLr_B;
    cbMap[0x11] = this.RLr_C;
    cbMap[0x12] = this.RLr_D;
    cbMap[0x13] = this.RLr_E;
    cbMap[0x14] = this.RLr_H;
    cbMap[0x15] = this.RLr_L;
    cbMap[0x16] = this.RLHL;
    cbMap[0x17] = this.RLr_A;
    cbMap[0x18] = this.RRr_B;
    cbMap[0x19] = this.RRr_C;
    cbMap[0x1a] = this.RRr_D;
    cbMap[0x1b] = this.RRr_E;
    cbMap[0x1c] = this.RRr_H;
    cbMap[0x1d] = this.RRr_L;
    cbMap[0x1e] = this.RRHL;
    cbMap[0x1f] = this.RRr_A;

    // 0x20
    cbMap[0x20] = this.SLAr_B;
    cbMap[0x21] = this.SLAr_C;
    cbMap[0x22] = this.SLAr_D;
    cbMap[0x23] = this.SLAr_E;
    cbMap[0x24] = this.SLAr_H;
    cbMap[0x25] = this.SLAr_L;
    cbMap[0x26] = this.SLAHL;
    cbMap[0x27] = this.SLAr_A;
    cbMap[0x28] = this.SRAr_B;
    cbMap[0x29] = this.SRAr_C;
    cbMap[0x2a] = this.SRAr_D;
    cbMap[0x2b] = this.SRAr_E;
    cbMap[0x2c] = this.SRAr_H;
    cbMap[0x2d] = this.SRAr_L;
    cbMap[0x2e] = this.SRAHL;
    cbMap[0x2f] = this.SRAr_A;

    // 0x30
    cbMap[0x30] = this.SWAPr_B;
    cbMap[0x31] = this.SWAPr_C;
    cbMap[0x32] = this.SWAPr_D;
    cbMap[0x33] = this.SWAPr_E;
    cbMap[0x34] = this.SWAPr_H;
    cbMap[0x35] = this.SWAPr_L;
    cbMap[0x36] = this.SWAPHL;
    cbMap[0x37] = this.SWAPr_A;
    cbMap[0x38] = this.SRLr_B;
    cbMap[0x39] = this.SRLr_C;
    cbMap[0x3a] = this.SRLr_D;
    cbMap[0x3b] = this.SRLr_E;
    cbMap[0x3c] = this.SRLr_H;
    cbMap[0x3d] = this.SRLr_L;
    cbMap[0x3e] = this.SRLHL;
    cbMap[0x3f] = this.SRLr_A;

    // 0x40
    cbMap[0x40] = this.BITr_B(0);
    cbMap[0x41] = this.BITr_C(0);
    cbMap[0x42] = this.BITr_D(0);
    cbMap[0x43] = this.BITr_E(0);
    cbMap[0x44] = this.BITr_H(0);
    cbMap[0x45] = this.BITr_L(0);
    cbMap[0x46] = this.BITHL(0);
    cbMap[0x47] = this.BITr_A(0);
    cbMap[0x48] = this.BITr_B(1);
    cbMap[0x49] = this.BITr_C(1);
    cbMap[0x4a] = this.BITr_D(1);
    cbMap[0x4b] = this.BITr_E(1);
    cbMap[0x4c] = this.BITr_H(1);
    cbMap[0x4d] = this.BITr_L(1);
    cbMap[0x4e] = this.BITHL(1);
    cbMap[0x4f] = this.BITr_A(1);

    // 0x50
    cbMap[0x50] = this.BITr_B(2);
    cbMap[0x51] = this.BITr_C(2);
    cbMap[0x52] = this.BITr_D(2);
    cbMap[0x53] = this.BITr_E(2);
    cbMap[0x54] = this.BITr_H(2);
    cbMap[0x55] = this.BITr_L(2);
    cbMap[0x56] = this.BITHL(2);
    cbMap[0x57] = this.BITr_A(2);
    cbMap[0x58] = this.BITr_B(3);
    cbMap[0x59] = this.BITr_C(3);
    cbMap[0x5a] = this.BITr_D(3);
    cbMap[0x5b] = this.BITr_E(3);
    cbMap[0x5c] = this.BITr_H(3);
    cbMap[0x5d] = this.BITr_L(3);
    cbMap[0x5e] = this.BITHL(3);
    cbMap[0x5f] = this.BITr_A(3);

    // 0x60
    cbMap[0x60] = this.BITr_B(4);
    cbMap[0x61] = this.BITr_C(4);
    cbMap[0x62] = this.BITr_D(4);
    cbMap[0x63] = this.BITr_E(4);
    cbMap[0x64] = this.BITr_H(4);
    cbMap[0x65] = this.BITr_L(4);
    cbMap[0x66] = this.BITHL(4);
    cbMap[0x67] = this.BITr_A(4);
    cbMap[0x68] = this.BITr_B(5);
    cbMap[0x69] = this.BITr_C(5);
    cbMap[0x6a] = this.BITr_D(5);
    cbMap[0x6b] = this.BITr_E(5);
    cbMap[0x6c] = this.BITr_H(5);
    cbMap[0x6d] = this.BITr_L(5);
    cbMap[0x6e] = this.BITHL(5);
    cbMap[0x6f] = this.BITr_A(5);

    // 0x70
    cbMap[0x70] = this.BITr_B(6);
    cbMap[0x71] = this.BITr_C(6);
    cbMap[0x72] = this.BITr_D(6);
    cbMap[0x73] = this.BITr_E(6);
    cbMap[0x74] = this.BITr_H(6);
    cbMap[0x75] = this.BITr_L(6);
    cbMap[0x76] = this.BITHL(6);
    cbMap[0x77] = this.BITr_A(6);
    cbMap[0x78] = this.BITr_B(7);
    cbMap[0x79] = this.BITr_C(7);
    cbMap[0x7a] = this.BITr_D(7);
    cbMap[0x7b] = this.BITr_E(7);
    cbMap[0x7c] = this.BITr_H(7);
    cbMap[0x7d] = this.BITr_L(7);
    cbMap[0x7e] = this.BITHL(7);
    cbMap[0x7f] = this.BITr_A(7);
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

  JRcce_NC() {
    const e = signed8(this.m.read16(this.r.PC));
    this.tick();
    if (!this.r.FC) {
      this.tickn(e);
      this.cycles = 12;
    } else {
      this.cycles = 8;
    }
  }

  JRcce_Z() {
    const e = signed8(this.m.read16(this.r.PC));
    this.tick();
    if (this.r.FZ) {
      this.tickn(e);
      this.cycles = 12;
    } else {
      this.cycles = 8;
    }
  }

  JRcce_NZ() {
    const e = signed8(this.m.read16(this.r.PC));
    this.tick();
    if (!this.r.FZ) {
      this.tickn(e);
      this.cycles = 12;
    } else {
      this.cycles = 8;
    }
  }

  // Calls
  CALLnn_int(addr) {
    this.stackPush8((this.r.PC & 0xFF00) >> 8);
    this.stackPush8(this.r.PC & 0x00FF);
    this.r.PC = addr;
    this.cycles = 24;
  }

  CALLnn() {
    const addr = this.m.read16(this.r.PC);
    this.tickn(2);
    this.stackPush8((this.r.PC & 0xFF00) >> 8);
    this.stackPush8(this.r.PC & 0x00FF);
    this.cycles = 24;
  }

  CALLccnn_C() {
    if (this.r.FC) {
      this.op.CALLnn();
    } else {
      this.tickn(2);
      this.cycles = 12;
    }
  }

  CALLccnn_NC() {
    if (!this.r.FC) {
      this.op.CALLnn();
    } else {
      this.tickn(2);
      this.cycles = 12;
    }
  }

  CALLccnn_Z() {
    if (this.r.FZ) {
      this.op.CALLnn();
    } else {
      this.tickn(2);
      this.cycles = 12;
    }
  }

  CALLccnn_NZ() {
    if (!this.r.FZ) {
      this.op.CALLnn();
    } else {
      this.tickn(2);
      this.cycles = 12;
    }
  }

  // Restarts
  RST_f(f) {
    return function() {
      this.stackPush8((this.r.PC & 0xFF00) >> 8);
      this.stackPush8(this.r.PC & 0x00FF);
      this.r.PC = f & 0x00FF;
      this.cycles = 16;
    }
  }

  RET() {
    this.r.PC = this.stackPop8() + this.stackPop8() << 8;
    this.cycles = 16;
  }

  RETcc_C() {
    if (this.r.FC) {
      this.op.RET();
      this.cycles = 20;
    } else {
      this.cycles = 8;
    }
  }

  RETcc_NC() {
    if (!this.r.FC) {
      this.op.RET();
      this.cycles = 20;
    } else {
      this.cycles = 8;
    }
  }

  RETcc_Z() {
    if (this.r.FZ) {
      this.op.RET();
      this.cycles = 20;
    } else {
      this.cycles = 8;
    }
  }

  RETcc_NZ() {
    if (!this.r.FZ) {
      this.op.RET();
      this.cycles = 20;
    } else {
      this.cycles = 8;
    }
  }

  RETI() {
    this.op.RET();
    this.cycles = 16;
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
