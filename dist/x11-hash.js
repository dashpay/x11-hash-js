require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var op = require('./op');

var AES0 = [
    0xA56363C6, 0x847C7CF8, 0x997777EE, 0x8D7B7BF6,
    0x0DF2F2FF, 0xBD6B6BD6, 0xB16F6FDE, 0x54C5C591,
    0x50303060, 0x03010102, 0xA96767CE, 0x7D2B2B56,
    0x19FEFEE7, 0x62D7D7B5, 0xE6ABAB4D, 0x9A7676EC,
    0x45CACA8F, 0x9D82821F, 0x40C9C989, 0x877D7DFA,
    0x15FAFAEF, 0xEB5959B2, 0xC947478E, 0x0BF0F0FB,
    0xECADAD41, 0x67D4D4B3, 0xFDA2A25F, 0xEAAFAF45,
    0xBF9C9C23, 0xF7A4A453, 0x967272E4, 0x5BC0C09B,
    0xC2B7B775, 0x1CFDFDE1, 0xAE93933D, 0x6A26264C,
    0x5A36366C, 0x413F3F7E, 0x02F7F7F5, 0x4FCCCC83,
    0x5C343468, 0xF4A5A551, 0x34E5E5D1, 0x08F1F1F9,
    0x937171E2, 0x73D8D8AB, 0x53313162, 0x3F15152A,
    0x0C040408, 0x52C7C795, 0x65232346, 0x5EC3C39D,
    0x28181830, 0xA1969637, 0x0F05050A, 0xB59A9A2F,
    0x0907070E, 0x36121224, 0x9B80801B, 0x3DE2E2DF,
    0x26EBEBCD, 0x6927274E, 0xCDB2B27F, 0x9F7575EA,
    0x1B090912, 0x9E83831D, 0x742C2C58, 0x2E1A1A34,
    0x2D1B1B36, 0xB26E6EDC, 0xEE5A5AB4, 0xFBA0A05B,
    0xF65252A4, 0x4D3B3B76, 0x61D6D6B7, 0xCEB3B37D,
    0x7B292952, 0x3EE3E3DD, 0x712F2F5E, 0x97848413,
    0xF55353A6, 0x68D1D1B9, 0x00000000, 0x2CEDEDC1,
    0x60202040, 0x1FFCFCE3, 0xC8B1B179, 0xED5B5BB6,
    0xBE6A6AD4, 0x46CBCB8D, 0xD9BEBE67, 0x4B393972,
    0xDE4A4A94, 0xD44C4C98, 0xE85858B0, 0x4ACFCF85,
    0x6BD0D0BB, 0x2AEFEFC5, 0xE5AAAA4F, 0x16FBFBED,
    0xC5434386, 0xD74D4D9A, 0x55333366, 0x94858511,
    0xCF45458A, 0x10F9F9E9, 0x06020204, 0x817F7FFE,
    0xF05050A0, 0x443C3C78, 0xBA9F9F25, 0xE3A8A84B,
    0xF35151A2, 0xFEA3A35D, 0xC0404080, 0x8A8F8F05,
    0xAD92923F, 0xBC9D9D21, 0x48383870, 0x04F5F5F1,
    0xDFBCBC63, 0xC1B6B677, 0x75DADAAF, 0x63212142,
    0x30101020, 0x1AFFFFE5, 0x0EF3F3FD, 0x6DD2D2BF,
    0x4CCDCD81, 0x140C0C18, 0x35131326, 0x2FECECC3,
    0xE15F5FBE, 0xA2979735, 0xCC444488, 0x3917172E,
    0x57C4C493, 0xF2A7A755, 0x827E7EFC, 0x473D3D7A,
    0xAC6464C8, 0xE75D5DBA, 0x2B191932, 0x957373E6,
    0xA06060C0, 0x98818119, 0xD14F4F9E, 0x7FDCDCA3,
    0x66222244, 0x7E2A2A54, 0xAB90903B, 0x8388880B,
    0xCA46468C, 0x29EEEEC7, 0xD3B8B86B, 0x3C141428,
    0x79DEDEA7, 0xE25E5EBC, 0x1D0B0B16, 0x76DBDBAD,
    0x3BE0E0DB, 0x56323264, 0x4E3A3A74, 0x1E0A0A14,
    0xDB494992, 0x0A06060C, 0x6C242448, 0xE45C5CB8,
    0x5DC2C29F, 0x6ED3D3BD, 0xEFACAC43, 0xA66262C4,
    0xA8919139, 0xA4959531, 0x37E4E4D3, 0x8B7979F2,
    0x32E7E7D5, 0x43C8C88B, 0x5937376E, 0xB76D6DDA,
    0x8C8D8D01, 0x64D5D5B1, 0xD24E4E9C, 0xE0A9A949,
    0xB46C6CD8, 0xFA5656AC, 0x07F4F4F3, 0x25EAEACF,
    0xAF6565CA, 0x8E7A7AF4, 0xE9AEAE47, 0x18080810,
    0xD5BABA6F, 0x887878F0, 0x6F25254A, 0x722E2E5C,
    0x241C1C38, 0xF1A6A657, 0xC7B4B473, 0x51C6C697,
    0x23E8E8CB, 0x7CDDDDA1, 0x9C7474E8, 0x211F1F3E,
    0xDD4B4B96, 0xDCBDBD61, 0x868B8B0D, 0x858A8A0F,
    0x907070E0, 0x423E3E7C, 0xC4B5B571, 0xAA6666CC,
    0xD8484890, 0x05030306, 0x01F6F6F7, 0x120E0E1C,
    0xA36161C2, 0x5F35356A, 0xF95757AE, 0xD0B9B969,
    0x91868617, 0x58C1C199, 0x271D1D3A, 0xB99E9E27,
    0x38E1E1D9, 0x13F8F8EB, 0xB398982B, 0x33111122,
    0xBB6969D2, 0x70D9D9A9, 0x898E8E07, 0xA7949433,
    0xB69B9B2D, 0x221E1E3C, 0x92878715, 0x20E9E9C9,
    0x49CECE87, 0xFF5555AA, 0x78282850, 0x7ADFDFA5,
    0x8F8C8C03, 0xF8A1A159, 0x80898909, 0x170D0D1A,
    0xDABFBF65, 0x31E6E6D7, 0xC6424284, 0xB86868D0,
    0xC3414182, 0xB0999929, 0x772D2D5A, 0x110F0F1E,
    0xCBB0B07B, 0xFC5454A8, 0xD6BBBB6D, 0x3A16162C
];

var AES1 = [
    0x6363C6A5, 0x7C7CF884, 0x7777EE99, 0x7B7BF68D,
    0xF2F2FF0D, 0x6B6BD6BD, 0x6F6FDEB1, 0xC5C59154,
    0x30306050, 0x01010203, 0x6767CEA9, 0x2B2B567D,
    0xFEFEE719, 0xD7D7B562, 0xABAB4DE6, 0x7676EC9A,
    0xCACA8F45, 0x82821F9D, 0xC9C98940, 0x7D7DFA87,
    0xFAFAEF15, 0x5959B2EB, 0x47478EC9, 0xF0F0FB0B,
    0xADAD41EC, 0xD4D4B367, 0xA2A25FFD, 0xAFAF45EA,
    0x9C9C23BF, 0xA4A453F7, 0x7272E496, 0xC0C09B5B,
    0xB7B775C2, 0xFDFDE11C, 0x93933DAE, 0x26264C6A,
    0x36366C5A, 0x3F3F7E41, 0xF7F7F502, 0xCCCC834F,
    0x3434685C, 0xA5A551F4, 0xE5E5D134, 0xF1F1F908,
    0x7171E293, 0xD8D8AB73, 0x31316253, 0x15152A3F,
    0x0404080C, 0xC7C79552, 0x23234665, 0xC3C39D5E,
    0x18183028, 0x969637A1, 0x05050A0F, 0x9A9A2FB5,
    0x07070E09, 0x12122436, 0x80801B9B, 0xE2E2DF3D,
    0xEBEBCD26, 0x27274E69, 0xB2B27FCD, 0x7575EA9F,
    0x0909121B, 0x83831D9E, 0x2C2C5874, 0x1A1A342E,
    0x1B1B362D, 0x6E6EDCB2, 0x5A5AB4EE, 0xA0A05BFB,
    0x5252A4F6, 0x3B3B764D, 0xD6D6B761, 0xB3B37DCE,
    0x2929527B, 0xE3E3DD3E, 0x2F2F5E71, 0x84841397,
    0x5353A6F5, 0xD1D1B968, 0x00000000, 0xEDEDC12C,
    0x20204060, 0xFCFCE31F, 0xB1B179C8, 0x5B5BB6ED,
    0x6A6AD4BE, 0xCBCB8D46, 0xBEBE67D9, 0x3939724B,
    0x4A4A94DE, 0x4C4C98D4, 0x5858B0E8, 0xCFCF854A,
    0xD0D0BB6B, 0xEFEFC52A, 0xAAAA4FE5, 0xFBFBED16,
    0x434386C5, 0x4D4D9AD7, 0x33336655, 0x85851194,
    0x45458ACF, 0xF9F9E910, 0x02020406, 0x7F7FFE81,
    0x5050A0F0, 0x3C3C7844, 0x9F9F25BA, 0xA8A84BE3,
    0x5151A2F3, 0xA3A35DFE, 0x404080C0, 0x8F8F058A,
    0x92923FAD, 0x9D9D21BC, 0x38387048, 0xF5F5F104,
    0xBCBC63DF, 0xB6B677C1, 0xDADAAF75, 0x21214263,
    0x10102030, 0xFFFFE51A, 0xF3F3FD0E, 0xD2D2BF6D,
    0xCDCD814C, 0x0C0C1814, 0x13132635, 0xECECC32F,
    0x5F5FBEE1, 0x979735A2, 0x444488CC, 0x17172E39,
    0xC4C49357, 0xA7A755F2, 0x7E7EFC82, 0x3D3D7A47,
    0x6464C8AC, 0x5D5DBAE7, 0x1919322B, 0x7373E695,
    0x6060C0A0, 0x81811998, 0x4F4F9ED1, 0xDCDCA37F,
    0x22224466, 0x2A2A547E, 0x90903BAB, 0x88880B83,
    0x46468CCA, 0xEEEEC729, 0xB8B86BD3, 0x1414283C,
    0xDEDEA779, 0x5E5EBCE2, 0x0B0B161D, 0xDBDBAD76,
    0xE0E0DB3B, 0x32326456, 0x3A3A744E, 0x0A0A141E,
    0x494992DB, 0x06060C0A, 0x2424486C, 0x5C5CB8E4,
    0xC2C29F5D, 0xD3D3BD6E, 0xACAC43EF, 0x6262C4A6,
    0x919139A8, 0x959531A4, 0xE4E4D337, 0x7979F28B,
    0xE7E7D532, 0xC8C88B43, 0x37376E59, 0x6D6DDAB7,
    0x8D8D018C, 0xD5D5B164, 0x4E4E9CD2, 0xA9A949E0,
    0x6C6CD8B4, 0x5656ACFA, 0xF4F4F307, 0xEAEACF25,
    0x6565CAAF, 0x7A7AF48E, 0xAEAE47E9, 0x08081018,
    0xBABA6FD5, 0x7878F088, 0x25254A6F, 0x2E2E5C72,
    0x1C1C3824, 0xA6A657F1, 0xB4B473C7, 0xC6C69751,
    0xE8E8CB23, 0xDDDDA17C, 0x7474E89C, 0x1F1F3E21,
    0x4B4B96DD, 0xBDBD61DC, 0x8B8B0D86, 0x8A8A0F85,
    0x7070E090, 0x3E3E7C42, 0xB5B571C4, 0x6666CCAA,
    0x484890D8, 0x03030605, 0xF6F6F701, 0x0E0E1C12,
    0x6161C2A3, 0x35356A5F, 0x5757AEF9, 0xB9B969D0,
    0x86861791, 0xC1C19958, 0x1D1D3A27, 0x9E9E27B9,
    0xE1E1D938, 0xF8F8EB13, 0x98982BB3, 0x11112233,
    0x6969D2BB, 0xD9D9A970, 0x8E8E0789, 0x949433A7,
    0x9B9B2DB6, 0x1E1E3C22, 0x87871592, 0xE9E9C920,
    0xCECE8749, 0x5555AAFF, 0x28285078, 0xDFDFA57A,
    0x8C8C038F, 0xA1A159F8, 0x89890980, 0x0D0D1A17,
    0xBFBF65DA, 0xE6E6D731, 0x424284C6, 0x6868D0B8,
    0x414182C3, 0x999929B0, 0x2D2D5A77, 0x0F0F1E11,
    0xB0B07BCB, 0x5454A8FC, 0xBBBB6DD6, 0x16162C3A
];

var AES2 = [
    0x63C6A563, 0x7CF8847C, 0x77EE9977, 0x7BF68D7B,
    0xF2FF0DF2, 0x6BD6BD6B, 0x6FDEB16F, 0xC59154C5,
    0x30605030, 0x01020301, 0x67CEA967, 0x2B567D2B,
    0xFEE719FE, 0xD7B562D7, 0xAB4DE6AB, 0x76EC9A76,
    0xCA8F45CA, 0x821F9D82, 0xC98940C9, 0x7DFA877D,
    0xFAEF15FA, 0x59B2EB59, 0x478EC947, 0xF0FB0BF0,
    0xAD41ECAD, 0xD4B367D4, 0xA25FFDA2, 0xAF45EAAF,
    0x9C23BF9C, 0xA453F7A4, 0x72E49672, 0xC09B5BC0,
    0xB775C2B7, 0xFDE11CFD, 0x933DAE93, 0x264C6A26,
    0x366C5A36, 0x3F7E413F, 0xF7F502F7, 0xCC834FCC,
    0x34685C34, 0xA551F4A5, 0xE5D134E5, 0xF1F908F1,
    0x71E29371, 0xD8AB73D8, 0x31625331, 0x152A3F15,
    0x04080C04, 0xC79552C7, 0x23466523, 0xC39D5EC3,
    0x18302818, 0x9637A196, 0x050A0F05, 0x9A2FB59A,
    0x070E0907, 0x12243612, 0x801B9B80, 0xE2DF3DE2,
    0xEBCD26EB, 0x274E6927, 0xB27FCDB2, 0x75EA9F75,
    0x09121B09, 0x831D9E83, 0x2C58742C, 0x1A342E1A,
    0x1B362D1B, 0x6EDCB26E, 0x5AB4EE5A, 0xA05BFBA0,
    0x52A4F652, 0x3B764D3B, 0xD6B761D6, 0xB37DCEB3,
    0x29527B29, 0xE3DD3EE3, 0x2F5E712F, 0x84139784,
    0x53A6F553, 0xD1B968D1, 0x00000000, 0xEDC12CED,
    0x20406020, 0xFCE31FFC, 0xB179C8B1, 0x5BB6ED5B,
    0x6AD4BE6A, 0xCB8D46CB, 0xBE67D9BE, 0x39724B39,
    0x4A94DE4A, 0x4C98D44C, 0x58B0E858, 0xCF854ACF,
    0xD0BB6BD0, 0xEFC52AEF, 0xAA4FE5AA, 0xFBED16FB,
    0x4386C543, 0x4D9AD74D, 0x33665533, 0x85119485,
    0x458ACF45, 0xF9E910F9, 0x02040602, 0x7FFE817F,
    0x50A0F050, 0x3C78443C, 0x9F25BA9F, 0xA84BE3A8,
    0x51A2F351, 0xA35DFEA3, 0x4080C040, 0x8F058A8F,
    0x923FAD92, 0x9D21BC9D, 0x38704838, 0xF5F104F5,
    0xBC63DFBC, 0xB677C1B6, 0xDAAF75DA, 0x21426321,
    0x10203010, 0xFFE51AFF, 0xF3FD0EF3, 0xD2BF6DD2,
    0xCD814CCD, 0x0C18140C, 0x13263513, 0xECC32FEC,
    0x5FBEE15F, 0x9735A297, 0x4488CC44, 0x172E3917,
    0xC49357C4, 0xA755F2A7, 0x7EFC827E, 0x3D7A473D,
    0x64C8AC64, 0x5DBAE75D, 0x19322B19, 0x73E69573,
    0x60C0A060, 0x81199881, 0x4F9ED14F, 0xDCA37FDC,
    0x22446622, 0x2A547E2A, 0x903BAB90, 0x880B8388,
    0x468CCA46, 0xEEC729EE, 0xB86BD3B8, 0x14283C14,
    0xDEA779DE, 0x5EBCE25E, 0x0B161D0B, 0xDBAD76DB,
    0xE0DB3BE0, 0x32645632, 0x3A744E3A, 0x0A141E0A,
    0x4992DB49, 0x060C0A06, 0x24486C24, 0x5CB8E45C,
    0xC29F5DC2, 0xD3BD6ED3, 0xAC43EFAC, 0x62C4A662,
    0x9139A891, 0x9531A495, 0xE4D337E4, 0x79F28B79,
    0xE7D532E7, 0xC88B43C8, 0x376E5937, 0x6DDAB76D,
    0x8D018C8D, 0xD5B164D5, 0x4E9CD24E, 0xA949E0A9,
    0x6CD8B46C, 0x56ACFA56, 0xF4F307F4, 0xEACF25EA,
    0x65CAAF65, 0x7AF48E7A, 0xAE47E9AE, 0x08101808,
    0xBA6FD5BA, 0x78F08878, 0x254A6F25, 0x2E5C722E,
    0x1C38241C, 0xA657F1A6, 0xB473C7B4, 0xC69751C6,
    0xE8CB23E8, 0xDDA17CDD, 0x74E89C74, 0x1F3E211F,
    0x4B96DD4B, 0xBD61DCBD, 0x8B0D868B, 0x8A0F858A,
    0x70E09070, 0x3E7C423E, 0xB571C4B5, 0x66CCAA66,
    0x4890D848, 0x03060503, 0xF6F701F6, 0x0E1C120E,
    0x61C2A361, 0x356A5F35, 0x57AEF957, 0xB969D0B9,
    0x86179186, 0xC19958C1, 0x1D3A271D, 0x9E27B99E,
    0xE1D938E1, 0xF8EB13F8, 0x982BB398, 0x11223311,
    0x69D2BB69, 0xD9A970D9, 0x8E07898E, 0x9433A794,
    0x9B2DB69B, 0x1E3C221E, 0x87159287, 0xE9C920E9,
    0xCE8749CE, 0x55AAFF55, 0x28507828, 0xDFA57ADF,
    0x8C038F8C, 0xA159F8A1, 0x89098089, 0x0D1A170D,
    0xBF65DABF, 0xE6D731E6, 0x4284C642, 0x68D0B868,
    0x4182C341, 0x9929B099, 0x2D5A772D, 0x0F1E110F,
    0xB07BCBB0, 0x54A8FC54, 0xBB6DD6BB, 0x162C3A16
];

var AES3 = [
    0xC6A56363, 0xF8847C7C, 0xEE997777, 0xF68D7B7B,
    0xFF0DF2F2, 0xD6BD6B6B, 0xDEB16F6F, 0x9154C5C5,
    0x60503030, 0x02030101, 0xCEA96767, 0x567D2B2B,
    0xE719FEFE, 0xB562D7D7, 0x4DE6ABAB, 0xEC9A7676,
    0x8F45CACA, 0x1F9D8282, 0x8940C9C9, 0xFA877D7D,
    0xEF15FAFA, 0xB2EB5959, 0x8EC94747, 0xFB0BF0F0,
    0x41ECADAD, 0xB367D4D4, 0x5FFDA2A2, 0x45EAAFAF,
    0x23BF9C9C, 0x53F7A4A4, 0xE4967272, 0x9B5BC0C0,
    0x75C2B7B7, 0xE11CFDFD, 0x3DAE9393, 0x4C6A2626,
    0x6C5A3636, 0x7E413F3F, 0xF502F7F7, 0x834FCCCC,
    0x685C3434, 0x51F4A5A5, 0xD134E5E5, 0xF908F1F1,
    0xE2937171, 0xAB73D8D8, 0x62533131, 0x2A3F1515,
    0x080C0404, 0x9552C7C7, 0x46652323, 0x9D5EC3C3,
    0x30281818, 0x37A19696, 0x0A0F0505, 0x2FB59A9A,
    0x0E090707, 0x24361212, 0x1B9B8080, 0xDF3DE2E2,
    0xCD26EBEB, 0x4E692727, 0x7FCDB2B2, 0xEA9F7575,
    0x121B0909, 0x1D9E8383, 0x58742C2C, 0x342E1A1A,
    0x362D1B1B, 0xDCB26E6E, 0xB4EE5A5A, 0x5BFBA0A0,
    0xA4F65252, 0x764D3B3B, 0xB761D6D6, 0x7DCEB3B3,
    0x527B2929, 0xDD3EE3E3, 0x5E712F2F, 0x13978484,
    0xA6F55353, 0xB968D1D1, 0x00000000, 0xC12CEDED,
    0x40602020, 0xE31FFCFC, 0x79C8B1B1, 0xB6ED5B5B,
    0xD4BE6A6A, 0x8D46CBCB, 0x67D9BEBE, 0x724B3939,
    0x94DE4A4A, 0x98D44C4C, 0xB0E85858, 0x854ACFCF,
    0xBB6BD0D0, 0xC52AEFEF, 0x4FE5AAAA, 0xED16FBFB,
    0x86C54343, 0x9AD74D4D, 0x66553333, 0x11948585,
    0x8ACF4545, 0xE910F9F9, 0x04060202, 0xFE817F7F,
    0xA0F05050, 0x78443C3C, 0x25BA9F9F, 0x4BE3A8A8,
    0xA2F35151, 0x5DFEA3A3, 0x80C04040, 0x058A8F8F,
    0x3FAD9292, 0x21BC9D9D, 0x70483838, 0xF104F5F5,
    0x63DFBCBC, 0x77C1B6B6, 0xAF75DADA, 0x42632121,
    0x20301010, 0xE51AFFFF, 0xFD0EF3F3, 0xBF6DD2D2,
    0x814CCDCD, 0x18140C0C, 0x26351313, 0xC32FECEC,
    0xBEE15F5F, 0x35A29797, 0x88CC4444, 0x2E391717,
    0x9357C4C4, 0x55F2A7A7, 0xFC827E7E, 0x7A473D3D,
    0xC8AC6464, 0xBAE75D5D, 0x322B1919, 0xE6957373,
    0xC0A06060, 0x19988181, 0x9ED14F4F, 0xA37FDCDC,
    0x44662222, 0x547E2A2A, 0x3BAB9090, 0x0B838888,
    0x8CCA4646, 0xC729EEEE, 0x6BD3B8B8, 0x283C1414,
    0xA779DEDE, 0xBCE25E5E, 0x161D0B0B, 0xAD76DBDB,
    0xDB3BE0E0, 0x64563232, 0x744E3A3A, 0x141E0A0A,
    0x92DB4949, 0x0C0A0606, 0x486C2424, 0xB8E45C5C,
    0x9F5DC2C2, 0xBD6ED3D3, 0x43EFACAC, 0xC4A66262,
    0x39A89191, 0x31A49595, 0xD337E4E4, 0xF28B7979,
    0xD532E7E7, 0x8B43C8C8, 0x6E593737, 0xDAB76D6D,
    0x018C8D8D, 0xB164D5D5, 0x9CD24E4E, 0x49E0A9A9,
    0xD8B46C6C, 0xACFA5656, 0xF307F4F4, 0xCF25EAEA,
    0xCAAF6565, 0xF48E7A7A, 0x47E9AEAE, 0x10180808,
    0x6FD5BABA, 0xF0887878, 0x4A6F2525, 0x5C722E2E,
    0x38241C1C, 0x57F1A6A6, 0x73C7B4B4, 0x9751C6C6,
    0xCB23E8E8, 0xA17CDDDD, 0xE89C7474, 0x3E211F1F,
    0x96DD4B4B, 0x61DCBDBD, 0x0D868B8B, 0x0F858A8A,
    0xE0907070, 0x7C423E3E, 0x71C4B5B5, 0xCCAA6666,
    0x90D84848, 0x06050303, 0xF701F6F6, 0x1C120E0E,
    0xC2A36161, 0x6A5F3535, 0xAEF95757, 0x69D0B9B9,
    0x17918686, 0x9958C1C1, 0x3A271D1D, 0x27B99E9E,
    0xD938E1E1, 0xEB13F8F8, 0x2BB39898, 0x22331111,
    0xD2BB6969, 0xA970D9D9, 0x07898E8E, 0x33A79494,
    0x2DB69B9B, 0x3C221E1E, 0x15928787, 0xC920E9E9,
    0x8749CECE, 0xAAFF5555, 0x50782828, 0xA57ADFDF,
    0x038F8C8C, 0x59F8A1A1, 0x09808989, 0x1A170D0D,
    0x65DABFBF, 0xD731E6E6, 0x84C64242, 0xD0B86868,
    0x82C34141, 0x29B09999, 0x5A772D2D, 0x1E110F0F,
    0x7BCBB0B0, 0xA8FC5454, 0x6DD6BBBB, 0x2C3A1616
];


module.exports.AES_ROUND_LE = function(X, K, Y) {
    (Y[0]) = AES0[(X[0]) & 0xFF] ^
        AES1[((X[1]) >>> 8) & 0xFF] ^
        AES2[((X[2]) >>> 16) & 0xFF] ^
        AES3[((X[3]) >>> 24) & 0xFF] ^ (K[0]);
    (Y[1]) = AES0[(X[1]) & 0xFF] ^
        AES1[((X[2]) >>> 8) & 0xFF] ^
        AES2[((X[3]) >>> 16) & 0xFF] ^
        AES3[((X[0]) >>> 24) & 0xFF] ^ (K[1]);
    (Y[2]) = AES0[(X[2]) & 0xFF] ^
        AES1[((X[3]) >>> 8) & 0xFF] ^
        AES2[((X[0]) >>> 16) & 0xFF] ^
        AES3[((X[1]) >>> 24) & 0xFF] ^ (K[2]);
    (Y[3]) = AES0[(X[3]) & 0xFF] ^
        AES1[((X[0]) >>> 8) & 0xFF] ^
        AES2[((X[1]) >>> 16) & 0xFF] ^
        AES3[((X[2]) >>> 24) & 0xFF] ^ (K[3]);
}

module.exports.AES_ROUND_NOKEY_LE = function(X, Y) {
    var K = new Array(4);
    op.bufferSet(K, 0, 0, 4);
    this.AES_ROUND_LE(X, K, Y);
}
},{"./op":11}],2:[function(require,module,exports){
/////////////////////////////////////
///////////////  Blake //////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var CB = [
  new op.u64(0x243f6a88, 0x85a308d3),
  new op.u64(0x13198a2e, 0x03707344),
  new op.u64(0xa4093822, 0x299f31d0),
  new op.u64(0x082efa98, 0xec4e6c89),
  new op.u64(0x452821e6, 0x38d01377),
  new op.u64(0xbe5466cf, 0x34e90c6c),
  new op.u64(0xc0ac29b7, 0xc97c50dd),
  new op.u64(0x3f84d5b5, 0xb5470917),
  new op.u64(0x9216d5d9, 0x8979fb1b),
  new op.u64(0xd1310ba6, 0x98dfb5ac),
  new op.u64(0x2ffd72db, 0xd01adfb7),
  new op.u64(0xb8e1afed, 0x6a267e96),
  new op.u64(0xba7c9045, 0xf12c7f99),
  new op.u64(0x24a19947, 0xb3916cf7),
  new op.u64(0x0801f2e2, 0x858efc16),
  new op.u64(0x636920d8, 0x71574e69)
];

var Z = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  [14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3],
  [11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4],
  [7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8],
  [9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13],
  [2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9],
  [12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11],
  [13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10],
  [6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5],
  [10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0]
];

var Mx = function(M, r, i) {
  return M[Z[r][i]];
}

var CBx = function(r, i) {
  return CB[Z[r][i]];
}

var initialValues = [
  new op.u64(0x6a09e667, 0xf3bcc908),
  new op.u64(0xbb67ae85, 0x84caa73b),
  new op.u64(0x3c6ef372, 0xfe94f82b),
  new op.u64(0xa54ff53a, 0x5f1d36f1),
  new op.u64(0x510e527f, 0xade682d1),
  new op.u64(0x9b05688c, 0x2b3e6c1f),
  new op.u64(0x1f83d9ab, 0xfb41bd6b),
  new op.u64(0x5be0cd19, 0x137e2179)
];

var GB = function(m0, m1, c0, c1, a, b, c, d) {
  a.add(b.plus(m0.xor(c1)));
  var l = d.xor(a);
  d.set(d.xor(a).rotateRight(32));
  c.add(d);
  b.set(b.xor(c).rotateRight(25));
  a.add(b.plus(m1.xor(c0)));
  d.set(d.xor(a).rotateRight(16));
  c.add(d);
  b.set(b.xor(c).rotateRight(11));
}

var round = function(r, V, M) {
  GB(Mx(M, r, 0), Mx(M, r, 1), CBx(r, 0), CBx(r, 1), V[0], V[4], V[8], V[0xC]);
  GB(Mx(M, r, 2), Mx(M, r, 3), CBx(r, 2), CBx(r, 3), V[1], V[5], V[9], V[0xD]);
  GB(Mx(M, r, 4), Mx(M, r, 5), CBx(r, 4), CBx(r, 5), V[2], V[6], V[0xA], V[0xE]);
  GB(Mx(M, r, 6), Mx(M, r, 7), CBx(r, 6), CBx(r, 7), V[3], V[7], V[0xB], V[0xF]);
  GB(Mx(M, r, 8), Mx(M, r, 9), CBx(r, 8), CBx(r, 9), V[0], V[5], V[0xA], V[0xF]);
  GB(Mx(M, r, 0xA), Mx(M, r, 0xB), CBx(r, 0xA), CBx(r, 0xB), V[1], V[6], V[0xB], V[0xC]);
  GB(Mx(M, r, 0xC), Mx(M, r, 0xD), CBx(r, 0xC), CBx(r, 0xD), V[2], V[7], V[8], V[0xD]);
  GB(Mx(M, r, 0xE), Mx(M, r, 0xF), CBx(r, 0xE), CBx(r, 0xF), V[3], V[4], V[9], V[0xE]);
}

var compress = function(M, H, S, T0, T1) {
  var V = new Array(16);
  op.bufferInsert64(V, 0, H, 8);
  V[8] = S[0].xor(CB[0]);
  V[9] = S[1].xor(CB[1]);
  V[10] = S[2].xor(CB[2]);
  V[11] = S[3].xor(CB[3]);
  V[12] = T0.xor(CB[4]);
  V[13] = T0.xor(CB[5]);
  V[14] = T1.xor(CB[6]);
  V[15] = T1.xor(CB[7]);
  for (var i = 0; i < 16; i++) {
    round(i % 10, V, M);
  }
  for (var i = 0; i < 8; i++) {
    H[i] = op.xor64(H[i], S[i % 4], V[i], V[8 + i]);
  }
}

var blake = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  var H = new Array(8);
  var S = new Array(4);
  var T0 = ctx.T0.clone();
  var T1 = ctx.T1.clone();
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  op.bufferInsert(H, 0, ctx.state, 8);
  op.bufferInsert(S, 0, ctx.salt, 4);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      T0.add(new op.u64(0, 1024));
      if (T0.hi < 0 || T0.lo < 1024)
        T1.addOne();
      var int64Buf = h.bytes2Int64Buffer(buf);
      compress(int64Buf, H, S, T0, T1);
      ptr = 0;
    }
  }
  ctx.state = H;
  ctx.salt = S;
  ctx.T0 = T0;
  ctx.T1 = T1;
  ctx.ptr = ptr;
}

var blakeClose = function(ctx) {
  var buf = new Array(128);
  var ptr = ctx.ptr;
  var bitLen = (new op.u64(0, ptr)).shiftLeft(3);
  var len = buf.length;
  var padLen;
  var count;
  var tl = ctx.T0.plus(bitLen);
  var th = ctx.T1.clone();
  buf[ptr] = 0x80;
  if (ptr === 0) {
    ctx.T0 = new op.u64(0xFFFFFFFF, 0xFFFFFC00);
    ctx.T1 = new op.u64(0xFFFFFFFF, 0xFFFFFFFF);
  }
  else if (ctx.T0.isZero()) {
    ctx.T0 = new op.u64(0xFFFFFFFF, 0xFFFFFC00).plus(bitLen);
    ctx.T1 = ctx.T1.minus(new op.u64(0, 1));
  }
  else {
    ctx.T0 = ctx.T0.minus(new op.u64(0, 1024).minus(bitLen));
  }
  if (bitLen.lo <= 894) {
    op.bufferSet(buf, ptr + 1, 0, 111 - ptr);
    buf[111] |= 1;
    h.bufferEncode64(buf, 112, th);
    h.bufferEncode64(buf, 120, tl);
    blake(ctx, buf.slice(ptr), 128 - ptr);
  }
  else {
    op.bufferSet(u.buf, ptr + 1, 0, 127 - ptr);
    blake(ctx, buf.slice(ptr), 128 - ptr);
    ctx.T0 = new op.u64(0xFFFFFFFFFFFFFC00);
    ctx.T1 = new op.u64(0xFFFFFFFFFFFFFFFF);
    op.bufferSet(buf, 0, 0, 112);
    buf[111] = 1;
    h.bufferEncode64(buf, 112, th);
    h.bufferEncode64(buf, 120, tl);
    blake(ctx, buf, 128);
  }
  var out = new Array(16);
  for (var u = 0; u < 8; u++) {
    out[2 * u] = ctx.state[u].hi;
    out[2 * u + 1] = ctx.state[u].lo;
  }
  return out;
}


module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = op.clone64Array(initialValues);
  ctx.salt = [op.u64.prototype.zero(), op.u64.prototype.zero(), op.u64.prototype.zero(), op.u64.prototype.zero()];
  ctx.T0 = op.u64.prototype.zero();
  ctx.T1 = op.u64.prototype.zero();
  ctx.ptr = 0;
  ctx.buffer = new Array(128);
  blake(ctx, msg, msg.length);
  var r = blakeClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],3:[function(require,module,exports){
/////////////////////////////////////
//////////////  BMW /////////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var V_INIT = [
  new op.u64(0x80818283, 0x84858687), new op.u64(0x88898A8B, 0x8C8D8E8F),
  new op.u64(0x90919293, 0x94959697), new op.u64(0x98999A9B, 0x9C9D9E9F),
  new op.u64(0xA0A1A2A3, 0xA4A5A6A7), new op.u64(0xA8A9AAAB, 0xACADAEAF),
  new op.u64(0xB0B1B2B3, 0xB4B5B6B7), new op.u64(0xB8B9BABB, 0xBCBDBEBF),
  new op.u64(0xC0C1C2C3, 0xC4C5C6C7), new op.u64(0xC8C9CACB, 0xCCCDCECF),
  new op.u64(0xD0D1D2D3, 0xD4D5D6D7), new op.u64(0xD8D9DADB, 0xDCDDDEDF),
  new op.u64(0xE0E1E2E3, 0xE4E5E6E7), new op.u64(0xE8E9EAEB, 0xECEDEEEF),
  new op.u64(0xF0F1F2F3, 0xF4F5F6F7), new op.u64(0xF8F9FAFB, 0xFCFDFEFF)
];

var final = [
  new op.u64(0xaaaaaaaa, 0xaaaaaaa0), new op.u64(0xaaaaaaaa, 0xaaaaaaa1),
  new op.u64(0xaaaaaaaa, 0xaaaaaaa2), new op.u64(0xaaaaaaaa, 0xaaaaaaa3),
  new op.u64(0xaaaaaaaa, 0xaaaaaaa4), new op.u64(0xaaaaaaaa, 0xaaaaaaa5),
  new op.u64(0xaaaaaaaa, 0xaaaaaaa6), new op.u64(0xaaaaaaaa, 0xaaaaaaa7),
  new op.u64(0xaaaaaaaa, 0xaaaaaaa8), new op.u64(0xaaaaaaaa, 0xaaaaaaa9),
  new op.u64(0xaaaaaaaa, 0xaaaaaaaa), new op.u64(0xaaaaaaaa, 0xaaaaaaab),
  new op.u64(0xaaaaaaaa, 0xaaaaaaac), new op.u64(0xaaaaaaaa, 0xaaaaaaad),
  new op.u64(0xaaaaaaaa, 0xaaaaaaae), new op.u64(0xaaaaaaaa, 0xaaaaaaaf)
];

var sb_a = [1, 1, 2, 2, 1, 2];
var sb_b = [3, 2, 1, 2];
var sb_c = [4, 13, 19, 28];
var sb_d = [37, 43, 53, 59];

var I16 = new Array(16); //we are trying to start at 16;

I16.push([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
I16.push([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
I16.push([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]);
I16.push([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
I16.push([4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
I16.push([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
I16.push([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]);
I16.push([7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
I16.push([8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]);
I16.push([9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]);
I16.push([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
I16.push([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]);
I16.push([12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
I16.push([13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]);
I16.push([14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]);
I16.push([15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);

var M16 = new Array(16);

M16.push([0, 1, 3, 4, 7, 10, 11]);
M16.push([1, 2, 4, 5, 8, 11, 12]);
M16.push([2, 3, 5, 6, 9, 12, 13]);
M16.push([3, 4, 6, 7, 10, 13, 14]);
M16.push([4, 5, 7, 8, 11, 14, 15]);
M16.push([5, 6, 8, 9, 12, 15, 16]);
M16.push([6, 7, 9, 10, 13, 0, 1]);
M16.push([7, 8, 10, 11, 14, 1, 2]);
M16.push([8, 9, 11, 12, 15, 2, 3]);
M16.push([9, 10, 12, 13, 0, 3, 4]);
M16.push([10, 11, 13, 14, 1, 4, 5]);
M16.push([11, 12, 14, 15, 2, 5, 6]);
M16.push([12, 13, 15, 16, 3, 6, 7]);
M16.push([13, 14, 0, 1, 4, 7, 8]);
M16.push([14, 15, 1, 2, 5, 8, 9]);
M16.push([15, 16, 2, 3, 6, 9, 10]);

var sb = function(n, x) {
  //xOriginal must be of type u64
  if (n < 4) {
    return op.xor64(x.shiftRight(sb_a[n]), x.shiftLeft(sb_b[n]), x.rotateLeft(sb_c[n]), x.rotateLeft(sb_d[n]));
  }
  else {
    return x.shiftRight(sb_a[n]).xor(x);
  }
}


var rbn = [0, 5, 11, 27, 32, 37, 43, 53];

var rb = function(n, x) {
  //x must be of type u64
  return x.rotateLeft(rbn[n]);
}

var makeW = function(M,H,i, op) {
  var a = M[i[0]].xor(H[i[0]]);
  var b = M[i[1]].xor(H[i[1]]);
  var c = M[i[2]].xor(H[i[2]]);
  var d = M[i[3]].xor(H[i[3]]);
  var e = M[i[4]].xor(H[i[4]]);
  var w = op[3](op[2](op[1](op[0](a,b),c),d),e);

  return w;
}

var wbn = [
  [5, 7, 10, 13, 14],
  [6, 8, 11, 14, 15],
  [0, 7, 9, 12, 15],
  [0, 1, 8, 10, 13],
  [1, 2, 9, 11, 14],
  [3, 2, 10, 12, 15],
  [4, 0, 3, 11, 13],
  [1, 4, 5, 12, 14],
  [2, 5, 6, 13, 15],
  [0, 3, 6, 7, 14],
  [8, 1, 4, 7, 15],
  [8, 0, 2, 5, 9],
  [1, 3, 6, 9, 10],
  [2, 4, 7, 10, 11],
  [3, 5, 8, 11, 12],
  [12, 4, 6, 9, 13],
];

var plus = function(a,b) {
  return a.plus(b);
}

var minus = function(a,b) {
  return a.minus(b);
}

var wboperators = [
  [minus, plus, plus, plus],
  [minus, plus, plus, minus],
  [plus, plus, minus, plus],
  [minus, plus, minus, plus],
  [plus, plus, minus, minus],
  [minus, plus, minus, plus],
  [minus, minus, minus, plus],
  [minus, minus, minus, minus],
  [minus, minus, plus, minus],
  [minus, plus, minus, plus],
  [minus, minus, minus, plus],
  [minus, minus, minus, plus],
  [plus, minus, minus, plus],
  [plus, plus, plus, plus],
  [minus, plus, minus, minus],
  [minus, minus, minus, plus],
]

var wb = function(M,H,i) {
  return makeW(M,H,wbn[i],wboperators[i]);
}

var kb = function(j) {
  var fives = new op.u64(0x05555555, 0x55555555);
  return fives.multiply(j);
}


var addElt = function(buffer64, state, mVars, i) {
  var k = kb(i);
  var elt =  buffer64[mVars[0]].rotateLeft(mVars[1])
     .add(buffer64[mVars[2]].rotateLeft(mVars[3]))
     .minus(buffer64[mVars[5]].rotateLeft(mVars[6]))
     .add(k)
     .xor(state[mVars[4]]);
    return elt;
}

var expand2Inner = function(qt, mf, state, i, iVars, mVars) {
  return qt[iVars[0]]
    .plus(rb(1, qt[iVars[1]]))
    .add(qt[iVars[2]])
    .add(rb(2, qt[iVars[3]]))
    .add(qt[iVars[4]])
    .add(rb(3, qt[iVars[5]]))
    .add(qt[iVars[6]])
    .add(rb(4, qt[iVars[7]]))
    .add(qt[iVars[8]])
    .add(rb(5, qt[iVars[9]]))
    .add(qt[iVars[10]])
    .add(rb(6, qt[iVars[11]]))
    .add(qt[iVars[12]])
    .add(rb(7, qt[iVars[13]]))
    .add(sb(4, qt[iVars[14]]))
    .add(sb(5, qt[iVars[15]]))
    .add(addElt(mf, state, mVars, i));
}

var expand1Inner = function(qt, mf, state, i, iVars, mVars) {
  return sb(1, qt[iVars[0]])
    .add(sb(2, qt[iVars[1]]))
    .add(sb(3, qt[iVars[2]]))
    .add(sb(0, qt[iVars[3]]))
    .add(sb(1, qt[iVars[4]]))
    .add(sb(2, qt[iVars[5]]))
    .add(sb(3, qt[iVars[6]]))
    .add(sb(0, qt[iVars[7]]))
    .add(sb(1, qt[iVars[8]]))
    .add(sb(2, qt[iVars[9]]))
    .add(sb(3, qt[iVars[10]]))
    .add(sb(0, qt[iVars[11]]))
    .add(sb(1, qt[iVars[12]]))
    .add(sb(2, qt[iVars[13]]))
    .add(sb(3, qt[iVars[14]]))
    .add(sb(0, qt[iVars[15]]))
    .add(addElt(mf, state, mVars, i));
}

var expand1b = function(qt, mf, state, i) {
  var iVars = I16[i];
  var mVars = M16[i];
  return expand1Inner(qt, mf, state, i, iVars, mVars);
}

var expand2b = function(qt, mf, state, i) {
  var iVars = I16[i];
  var mVars = M16[i];
  return expand2Inner(qt, mf, state, i, iVars, mVars);
}

var makeQ = function(mf, state) {
  var qt = new Array(32);
  for (var i = 0; i < 16; i++) {
    var w = wb(mf,state,i);
    var s = sb(i % 5, w);
    qt[i] = s.plus(state[(i + 1) % 16]);
  }
  qt[16] = expand1b(qt, mf, state, 16);
  qt[17] = expand1b(qt, mf, state, 17);
  for (var i = 18; i < 32; i++) {
    qt[i] = expand2b(qt, mf, state, i);
  }
  return qt;
}

var fold = function(int64Buffer, state) {
  var out = new Array(16);
  var qt = makeQ(int64Buffer, state);
  var xl = op.xor64(qt[16], qt[17], qt[18], qt[19], qt[20], qt[21], qt[22], qt[23]);
  var xh = op.xor64(xl, qt[24], qt[25], qt[26], qt[27], qt[28], qt[29], qt[30], qt[31]);
  out[0] = op.xor64(xh.shiftLeft(5), qt[16].shiftRight(5), int64Buffer[0]).add(op.xor64(xl, qt[24], qt[0]));
  out[1] = op.xor64(xh.shiftRight(7), qt[17].shiftLeft(8), int64Buffer[1]).add(op.xor64(xl, qt[25], qt[1]));
  out[2] = op.xor64(xh.shiftRight(5), qt[18].shiftLeft(5), int64Buffer[2]).add(op.xor64(xl, qt[26], qt[2]));
  out[3] = op.xor64(xh.shiftRight(1), qt[19].shiftLeft(5), int64Buffer[3]).add(op.xor64(xl, qt[27], qt[3]));
  out[4] = op.xor64(xh.shiftRight(3), qt[20], int64Buffer[4]).add(op.xor64(xl, qt[28], qt[4]));
  out[5] = op.xor64(xh.shiftLeft(6), qt[21].shiftRight(6), int64Buffer[5]).add(op.xor64(xl, qt[29], qt[5]));
  out[6] = op.xor64(xh.shiftRight(4), qt[22].shiftLeft(6), int64Buffer[6]).add(op.xor64(xl, qt[30], qt[6]));
  out[7] = op.xor64(xh.shiftRight(11), qt[23].shiftLeft(2), int64Buffer[7]).add(op.xor64(xl, qt[31], qt[7]));
  out[8] = out[4].rotateLeft(9).add(op.xor64(xh, qt[24], int64Buffer[8])).add(op.xor64(xl.shiftLeft(8), qt[23], qt[8]));
  out[9] = out[5].rotateLeft(10).add(op.xor64(xh, qt[25], int64Buffer[9])).add(op.xor64(xl.shiftRight(6), qt[16], qt[9]));
  out[10] = out[6].rotateLeft(11).add(op.xor64(xh, qt[26], int64Buffer[10])).add(op.xor64(xl.shiftLeft(6), qt[17], qt[10]));
  out[11] = out[7].rotateLeft(12).add(op.xor64(xh, qt[27], int64Buffer[11])).add(op.xor64(xl.shiftLeft(4), qt[18], qt[11]));
  out[12] = out[0].rotateLeft(13).add(op.xor64(xh, qt[28], int64Buffer[12])).add(op.xor64(xl.shiftRight(3), qt[19], qt[12]));
  out[13] = out[1].rotateLeft(14).add(op.xor64(xh, qt[29], int64Buffer[13])).add(op.xor64(xl.shiftRight(4), qt[20], qt[13]));
  out[14] = out[2].rotateLeft(15).add(op.xor64(xh, qt[30], int64Buffer[14])).add(op.xor64(xl.shiftRight(7), qt[21], qt[14]));
  out[15] = out[3].rotateLeft(16).add(op.xor64(xh, qt[31], int64Buffer[15])).add(op.xor64(xl.shiftRight(2), qt[22], qt[15]));
  return out;
}

var compress = function(buf, state) {
  var int64Buf = h.bytes2Int64BufferLeAligned(buf);
  return fold(int64Buf, state);
}

var bmw = function(ctx, data) {
  var htmp = new Array(16);
  var len = data.length;
  var lenL3 = new op.u64(0, len);
  lenL3 = lenL3.shiftLeft(3);
  ctx.bitCount.add(lenL3);
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var h1 = ctx.state;
  var h2 = htmp;
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len)
      clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    data = data.slice(clen);
    len -= clen;
    ptr += clen;
    if (ptr === ctx.buffer.length) {
      var ht;
      h2 = compress(buf, h1);
      ht = h1;
      h1 = h2;
      h2 = ht;
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
  if (h1 !== ctx.state)
    op.bufferInsert(ctx.state, 0, h1, ctx.state.length);
}

var bmwClose = function(ctx) {
  var h1;
  var h2 = new Array(16);

  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var len = buf.length;
  buf[ptr++] = 0x80;
  var hState = ctx.state;
  if (ptr > len - 8) {
    op.bufferSet(buf, ptr, 0, len - ptr);
    hState = compress(buf, hState);
    ptr = 0;
  }
  op.bufferSet(buf, ptr, 0, len - 8 - ptr);
  h.bufferEncode64leAligned(buf, len - 8, ctx.bitCount);
  h2 = compress(buf, hState);
  for (u = 0; u < 16; u++)
    h.bufferEncode64leAligned(buf, 8 * u, h2[u]);
  h1 = compress(buf, final);
  var out = new Array(16);
  for (var u = 0, v = 8; u < 8; u++, v++) {
    out[2 * u] = op.swap32(h1[v].lo);
    out[2 * u + 1] = op.swap32(h1[v].hi);
  }
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = op.clone64Array(V_INIT);
  ctx.ptr = 0;
  ctx.bitCount = op.u64.prototype.zero();
  ctx.buffer = new Array(128);
  bmw(ctx, msg);
  var r = bmwClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],4:[function(require,module,exports){
/////////////////////////////////////
////////////  Cubehash //////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var Cubehash_BlockSize = 32;
var Cubehash_StateSize = 32;

var IV512 = [
	0x2AEA2A61, 0x50F494D4, 0x2D538B8B,
	0x4167D83E, 0x3FEE2313, 0xC701CF8C,
	0xCC39968E, 0x50AC5695, 0x4D42C787,
	0xA647A8B3, 0x97CF0BEF, 0x825B4537,
	0xEEF864D2, 0xF22090C4, 0xD0E5CD33,
	0xA23911AE, 0xFCD398D9, 0x148FE485,
	0x1B017BEF, 0xB6444532, 0x6A536159,
	0x2FF5781C, 0x91FA7934, 0x0DBADEA9,
	0xD65C8A2B, 0xA5A70E75, 0xB1C62456,
	0xBC796576, 0x1921C8F7, 0xE7989AF1,
	0x7795D246, 0xD43E3B44,
];

var ROUND_EVEN = function(x) {
	x[16] = 0xFFFFFFFF & (x[0] + x[16]);
	x[0] = op.rotl32(x[0], 7);
	x[17] = 0xFFFFFFFF & (x[1] + x[17]);
	x[1] = op.rotl32(x[1], 7);
	x[18] = 0xFFFFFFFF & (x[2] + x[18]);
	x[2] = op.rotl32(x[2], 7);
	x[19] = 0xFFFFFFFF & (x[3] + x[19]);
	x[3] = op.rotl32(x[3], 7);
	x[20] = 0xFFFFFFFF & (x[4] + x[20]);
	x[4] = op.rotl32(x[4], 7);
	x[21] = 0xFFFFFFFF & (x[5] + x[21]);
	x[5] = op.rotl32(x[5], 7);
	x[22] = 0xFFFFFFFF & (x[6] + x[22]);
	x[6] = op.rotl32(x[6], 7);
	x[23] = 0xFFFFFFFF & (x[7] + x[23]);
	x[7] = op.rotl32(x[7], 7);
	x[24] = 0xFFFFFFFF & (x[8] + x[24]);
	x[8] = op.rotl32(x[8], 7);
	x[25] = 0xFFFFFFFF & (x[9] + x[25]);
	x[9] = op.rotl32(x[9], 7);
	x[26] = 0xFFFFFFFF & (x[10] + x[26]);
	x[10] = op.rotl32(x[10], 7);
	x[27] = 0xFFFFFFFF & (x[11] + x[27]);
	x[11] = op.rotl32(x[11], 7);
	x[28] = 0xFFFFFFFF & (x[12] + x[28]);
	x[12] = op.rotl32(x[12], 7);
	x[29] = 0xFFFFFFFF & (x[13] + x[29]);
	x[13] = op.rotl32(x[13], 7);
	x[30] = 0xFFFFFFFF & (x[14] + x[30]);
	x[14] = op.rotl32(x[14], 7);
	x[31] = 0xFFFFFFFF & (x[15] + x[31]);
	x[15] = op.rotl32(x[15], 7);
	x[8] ^= x[16];
	x[9] ^= x[17];
	x[10] ^= x[18];
	x[11] ^= x[19];
	x[12] ^= x[20];
	x[13] ^= x[21];
	x[14] ^= x[22];
	x[15] ^= x[23];
	x[0] ^= x[24];
	x[1] ^= x[25];
	x[2] ^= x[26];
	x[3] ^= x[27];
	x[4] ^= x[28];
	x[5] ^= x[29];
	x[6] ^= x[30];
	x[7] ^= x[31];
	x[18] = 0xFFFFFFFF & (x[8] + x[18]);
	x[8] = op.rotl32(x[8], 11);
	x[19] = 0xFFFFFFFF & (x[9] + x[19]);
	x[9] = op.rotl32(x[9], 11);
	x[16] = 0xFFFFFFFF & (x[10] + x[16]);
	x[10] = op.rotl32(x[10], 11);
	x[17] = 0xFFFFFFFF & (x[11] + x[17]);
	x[11] = op.rotl32(x[11], 11);
	x[22] = 0xFFFFFFFF & (x[12] + x[22]);
	x[12] = op.rotl32(x[12], 11);
	x[23] = 0xFFFFFFFF & (x[13] + x[23]);
	x[13] = op.rotl32(x[13], 11);
	x[20] = 0xFFFFFFFF & (x[14] + x[20]);
	x[14] = op.rotl32(x[14], 11);
	x[21] = 0xFFFFFFFF & (x[15] + x[21]);
	x[15] = op.rotl32(x[15], 11);
	x[26] = 0xFFFFFFFF & (x[0] + x[26]);
	x[0] = op.rotl32(x[0], 11);
	x[27] = 0xFFFFFFFF & (x[1] + x[27]);
	x[1] = op.rotl32(x[1], 11);
	x[24] = 0xFFFFFFFF & (x[2] + x[24]);
	x[2] = op.rotl32(x[2], 11);
	x[25] = 0xFFFFFFFF & (x[3] + x[25]);
	x[3] = op.rotl32(x[3], 11);
	x[30] = 0xFFFFFFFF & (x[4] + x[30]);
	x[4] = op.rotl32(x[4], 11);
	x[31] = 0xFFFFFFFF & (x[5] + x[31]);
	x[5] = op.rotl32(x[5], 11);
	x[28] = 0xFFFFFFFF & (x[6] + x[28]);
	x[6] = op.rotl32(x[6], 11);
	x[29] = 0xFFFFFFFF & (x[7] + x[29]);
	x[7] = op.rotl32(x[7], 11);
	x[12] ^= x[18];
	x[13] ^= x[19];
	x[14] ^= x[16];
	x[15] ^= x[17];
	x[8] ^= x[22];
	x[9] ^= x[23];
	x[10] ^= x[20];
	x[11] ^= x[21];
	x[4] ^= x[26];
	x[5] ^= x[27];
	x[6] ^= x[24];
	x[7] ^= x[25];
	x[0] ^= x[30];
	x[1] ^= x[31];
	x[2] ^= x[28];
	x[3] ^= x[29];
}

var ROUND_ODD = function(x) {
	x[19] = 0xFFFFFFFF & (x[12] + x[19]);
	x[12] = op.rotl32(x[12], 7);
	x[18] = 0xFFFFFFFF & (x[13] + x[18]);
	x[13] = op.rotl32(x[13], 7);
	x[17] = 0xFFFFFFFF & (x[14] + x[17]);
	x[14] = op.rotl32(x[14], 7);
	x[16] = 0xFFFFFFFF & (x[15] + x[16]);
	x[15] = op.rotl32(x[15], 7);
	x[23] = 0xFFFFFFFF & (x[8] + x[23]);
	x[8] = op.rotl32(x[8], 7);
	x[22] = 0xFFFFFFFF & (x[9] + x[22]);
	x[9] = op.rotl32(x[9], 7);
	x[21] = 0xFFFFFFFF & (x[10] + x[21]);
	x[10] = op.rotl32(x[10], 7);
	x[20] = 0xFFFFFFFF & (x[11] + x[20]);
	x[11] = op.rotl32(x[11], 7);
	x[27] = 0xFFFFFFFF & (x[4] + x[27]);
	x[4] = op.rotl32(x[4], 7);
	x[26] = 0xFFFFFFFF & (x[5] + x[26]);
	x[5] = op.rotl32(x[5], 7);
	x[25] = 0xFFFFFFFF & (x[6] + x[25]);
	x[6] = op.rotl32(x[6], 7);
	x[24] = 0xFFFFFFFF & (x[7] + x[24]);
	x[7] = op.rotl32(x[7], 7);
	x[31] = 0xFFFFFFFF & (x[0] + x[31]);
	x[0] = op.rotl32(x[0], 7);
	x[30] = 0xFFFFFFFF & (x[1] + x[30]);
	x[1] = op.rotl32(x[1], 7);
	x[29] = 0xFFFFFFFF & (x[2] + x[29]);
	x[2] = op.rotl32(x[2], 7);
	x[28] = 0xFFFFFFFF & (x[3] + x[28]);
	x[3] = op.rotl32(x[3], 7);
	x[4] ^= x[19];
	x[5] ^= x[18];
	x[6] ^= x[17];
	x[7] ^= x[16];
	x[0] ^= x[23];
	x[1] ^= x[22];
	x[2] ^= x[21];
	x[3] ^= x[20];
	x[12] ^= x[27];
	x[13] ^= x[26];
	x[14] ^= x[25];
	x[15] ^= x[24];
	x[8] ^= x[31];
	x[9] ^= x[30];
	x[10] ^= x[29];
	x[11] ^= x[28];
	x[17] = 0xFFFFFFFF & (x[4] + x[17]);
	x[4] = op.rotl32(x[4], 11);
	x[16] = 0xFFFFFFFF & (x[5] + x[16]);
	x[5] = op.rotl32(x[5], 11);
	x[19] = 0xFFFFFFFF & (x[6] + x[19]);
	x[6] = op.rotl32(x[6], 11);
	x[18] = 0xFFFFFFFF & (x[7] + x[18]);
	x[7] = op.rotl32(x[7], 11);
	x[21] = 0xFFFFFFFF & (x[0] + x[21]);
	x[0] = op.rotl32(x[0], 11);
	x[20] = 0xFFFFFFFF & (x[1] + x[20]);
	x[1] = op.rotl32(x[1], 11);
	x[23] = 0xFFFFFFFF & (x[2] + x[23]);
	x[2] = op.rotl32(x[2], 11);
	x[22] = 0xFFFFFFFF & (x[3] + x[22]);
	x[3] = op.rotl32(x[3], 11);
	x[25] = 0xFFFFFFFF & (x[12] + x[25]);
	x[12] = op.rotl32(x[12], 11);
	x[24] = 0xFFFFFFFF & (x[13] + x[24]);
	x[13] = op.rotl32(x[13], 11);
	x[27] = 0xFFFFFFFF & (x[14] + x[27]);
	x[14] = op.rotl32(x[14], 11);
	x[26] = 0xFFFFFFFF & (x[15] + x[26]);
	x[15] = op.rotl32(x[15], 11);
	x[29] = 0xFFFFFFFF & (x[8] + x[29]);
	x[8] = op.rotl32(x[8], 11);
	x[28] = 0xFFFFFFFF & (x[9] + x[28]);
	x[9] = op.rotl32(x[9], 11);
	x[31] = 0xFFFFFFFF & (x[10] + x[31]);
	x[10] = op.rotl32(x[10], 11);
	x[30] = 0xFFFFFFFF & (x[11] + x[30]);
	x[11] = op.rotl32(x[11], 11);
	x[0] ^= x[17];
	x[1] ^= x[16];
	x[2] ^= x[19];
	x[3] ^= x[18];
	x[4] ^= x[21];
	x[5] ^= x[20];
	x[6] ^= x[23];
	x[7] ^= x[22];
	x[8] ^= x[25];
	x[9] ^= x[24];
	x[10] ^= x[27];
	x[11] ^= x[26];
	x[12] ^= x[29];
	x[13] ^= x[28];
	x[14] ^= x[31];
	x[15] ^= x[30];
}

var SIXTEEN_ROUNDS = function(x) {
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
	ROUND_EVEN(x);
	ROUND_ODD(x);
}

var cubehash = function(ctx, data) {
	var buf, ptr;
	//create a local copy of states
	var x = new Array(Cubehash_StateSize);
	buf = ctx.buffer;
	ptr = ctx.ptr;
	var len = data.length;
	if (len < ctx.buffer.length - ptr) {
		op.bufferInsert(buf, ptr, data, data.length);
		ptr += data.length;
		ctx.ptr = ptr;
		return;
	}
	//perform a deep copy of current state
	for (var i = 0; i < Cubehash_StateSize; i++) {
		x[i] = ctx.state[i];
	}
	while (len > 0) {
		var clen = ctx.buffer.length - ptr;
		if (clen > len) clen = len;
		op.bufferInsert(buf, ptr, data, clen);
		ptr += clen;
		data = data.slice(clen);
		len -= clen;
		if (ptr === ctx.buffer.length) {
			var int32Buf = op.swap32Array(h.bytes2Int32Buffer(buf));
			op.bufferXORInsert(x, 0, int32Buf,0, 8)
			SIXTEEN_ROUNDS(x);
			ptr = 0;
		}
	}
	ctx.state = x;
	ctx.ptr = ptr;
}
var cubehashClose = function(ctx) {
	var buf = ctx.buffer;
	var ptr = ctx.ptr;
	var x = new Array(Cubehash_StateSize);
	buf[ptr++] = 0x80;
	op.bufferSet(buf, ptr, 0, ctx.buffer.length - ptr);
	for (var i = 0; i < Cubehash_StateSize; i++) {
		x[i] = ctx.state[i];
	}
	var int32Buf = op.swap32Array(h.bytes2Int32Buffer(buf));
	op.bufferXORInsert(x, 0, int32Buf,0, 8)
	for (i = 0; i < 11; i++) {
		SIXTEEN_ROUNDS(x);
		if (i == 0)
			x[31] ^= 0xFFFFFFFF & (1);
	}
	ctx.state = x;
	var out = new Array(16);
	for (var u = 0; u < 16; u++)
		out[u] = op.swap32(ctx.state[u]);
	return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
	var ctx = {};
	ctx.state = IV512;
	ctx.ptr = 0;
	ctx.buffer = new Array(Cubehash_BlockSize);
	cubehash(ctx, msg);
	var r = cubehashClose(ctx);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],5:[function(require,module,exports){
/////////////////////////////////////
///////////////  Echo ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');
var aes = require('./aes');

var ECHO_BlockSize = 128;

var subWords = function(W, pK) {
  for (var n = 0; n < 16; n++) {
    var X = W[n];
    var Y = new Array(4);
    aes.AES_ROUND_LE(X, pK, Y);
    aes.AES_ROUND_NOKEY_LE(Y, X);
    if ((pK[0] = op.t32(pK[0] + 1)) === 0) {
      if ((pK[1] = op.t32(pK[1] + 1)) === 0)
        if ((pK[2] = op.t32(pK[2] + 1)) === 0)
          pK[3] = op.t32(pK[3] + 1);
    }
  }
}

var shiftRow1 = function(W, a, b, c, d) {
  var tmp;
  tmp = W[a][0];
  W[a][0] = W[b][0];
  W[b][0] = W[c][0];
  W[c][0] = W[d][0];
  W[d][0] = tmp;
  tmp = W[a][1];
  W[a][1] = W[b][1];
  W[b][1] = W[c][1];
  W[c][1] = W[d][1];
  W[d][1] = tmp;
  tmp = W[a][2];
  W[a][2] = W[b][2];
  W[b][2] = W[c][2];
  W[c][2] = W[d][2];
  W[d][2] = tmp;
  tmp = W[a][3];
  W[a][3] = W[b][3];
  W[b][3] = W[c][3];
  W[c][3] = W[d][3];
  W[d][3] = tmp;
}

var shiftRow2 = function(W, a, b, c, d) {
  var tmp;
  tmp = W[a][0];
  W[a][0] = W[c][0];
  W[c][0] = tmp;
  tmp = W[b][0];
  W[b][0] = W[d][0];
  W[d][0] = tmp;
  tmp = W[a][1];
  W[a][1] = W[c][1];
  W[c][1] = tmp;
  tmp = W[b][1];
  W[b][1] = W[d][1];
  W[d][1] = tmp;
  tmp = W[a][2];
  W[a][2] = W[c][2];
  W[c][2] = tmp;
  tmp = W[b][2];
  W[b][2] = W[d][2];
  W[d][2] = tmp;
  tmp = W[a][3];
  W[a][3] = W[c][3];
  W[c][3] = tmp;
  tmp = W[b][3];
  W[b][3] = W[d][3];
  W[d][3] = tmp;
}

var shiftRow3 = function(W, a, b, c, d) {
  shiftRow1(W, d, c, b, a);
}

var shiftRows = function(W) {
  shiftRow1(W, 1, 5, 9, 13);
  shiftRow2(W, 2, 6, 10, 14);
  shiftRow3(W, 3, 7, 11, 15);
}

var mixColumn = function(W, ia, ib, ic, id) {
  for (var n = 0; n < 4; n++) {
    var a = W[ia][n];
    var b = W[ib][n];
    var c = W[ic][n];
    var d = W[id][n];
    var ab = a ^ b;
    var bc = b ^ c;
    var cd = c ^ d;
    var abx = ((ab & (0x80808080)) >>> 7) * 27 ^
      ((ab & (0x7F7F7F7F)) << 1);
    var bcx = ((bc & (0x80808080)) >>> 7) * 27 ^
      ((bc & (0x7F7F7F7F)) << 1);
    var cdx = ((cd & (0x80808080)) >>> 7) * 27 ^
      ((cd & (0x7F7F7F7F)) << 1);
    W[ia][n] = abx ^ bc ^ d;
    W[ib][n] = bcx ^ a ^ cd;
    W[ic][n] = cdx ^ ab ^ d;
    W[id][n] = abx ^ bcx ^ cdx ^ ab ^ c;
  }
}

var finalize = function(ctx, W) {
  var int32Buf = op.swap32Array(h.bytes2Int32Buffer(ctx.buffer));
  for (var u = 0; u < 8; u++) {
    for (var v = 0; v < 4; v++) {
      ctx.state[u][v] ^= int32Buf[u * 4 + v] ^ W[u][v] ^ W[u + 8][v];
    }
  }
}

var inputBlock = function(ctx, W) {
  op.buffer2Insert(W, 0, 0, ctx.state, 8, 4);
  var int32Buf = op.swap32Array(h.bytes2Int32Buffer(ctx.buffer));
  for (var u = 0; u < 8; u++) {
    W[u + 8][0] = (int32Buf[4 * u]);
    W[u + 8][1] = (int32Buf[4 * u + 1]);
    W[u + 8][2] = (int32Buf[4 * u + 2]);
    W[u + 8][3] = (int32Buf[4 * u + 3]);
  }
}

var mixColumns = function(W) {
  mixColumn(W, 0, 1, 2, 3);
  mixColumn(W, 4, 5, 6, 7);
  mixColumn(W, 8, 9, 10, 11);
  mixColumn(W, 12, 13, 14, 15);
}

var ROUND = function(W,K) {
  subWords(W,K);
  shiftRows(W);
  mixColumns(W);
}

var compress = function(ctx) {
  var W = new Array(16);
  for (var i = 0; i < 16; i++) {
    W[i] = new Array(4);
  }
  var K = new Array(4);
  op.bufferInsert(K,0,ctx.C,4);
  inputBlock(ctx, W);
  for (var u = 0; u < 10; u++) {
    ROUND(W,K);
  }
  finalize(ctx,W);
}

var incrCounter = function(ctx, val) {
  ctx.C[0] = op.t32(ctx.C[0] + op.t32(val));
  if (ctx.C[0] < op.t32(val)) {
    if ((ctx.C[1] = op.t32(ctx.C[1] + 1)) === 0) {
      if ((ctx.C[2] = op.t32(ctx.C[2] + 1)) === 0) {
        ctx.C[3] = op.t32(ctx.C[3] + 1);
      }
    }
  }
}

var echoInit = function(ctx) {
  ctx.state = new Array(8);
  for (var i = 0; i < 8; i++) {
    ctx.state[i] = new Array(4);
  }
  ctx.state[0][0] = 512;
  ctx.state[0][1] = ctx.state[0][2] = ctx.state[0][3] = 0;
  ctx.state[1][0] = 512;
  ctx.state[1][1] = ctx.state[1][2] = ctx.state[1][3] = 0;
  ctx.state[2][0] = 512;
  ctx.state[2][1] = ctx.state[2][2] = ctx.state[2][3] = 0;
  ctx.state[3][0] = 512;
  ctx.state[3][1] = ctx.state[3][2] = ctx.state[3][3] = 0;
  ctx.state[4][0] = 512;
  ctx.state[4][1] = ctx.state[4][2] = ctx.state[4][3] = 0;
  ctx.state[5][0] = 512;
  ctx.state[5][1] = ctx.state[5][2] = ctx.state[5][3] = 0;
  ctx.state[6][0] = 512;
  ctx.state[6][1] = ctx.state[6][2] = ctx.state[6][3] = 0;
  ctx.state[7][0] = 512;
  ctx.state[7][1] = ctx.state[7][2] = ctx.state[7][3] = 0;
  ctx.ptr = 0;
  ctx.C = new Array(4);
  op.bufferSet(ctx.C,0,0,4);
  ctx.buffer = new Array(ECHO_BlockSize);
}

var echo = function(ctx, data) {
  var buf, ptr;
  buf = ctx.buffer;
  ptr = ctx.ptr;
  var len = data.length;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int32Buf = h.bytes2Int32Buffer(buf);
      incrCounter(ctx, 1024);
      compress(ctx);
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
}

var echoClose = function(ctx) {
  var out = new Array(16);
  var buf = ctx.buffer;
  var len = ctx.buffer.length;
  var ptr = ctx.ptr;
  var elen = (ptr << 3);
  incrCounter(ctx, elen);
  var cBytes = h.int32Buffer2Bytes(op.swap32Array(ctx.C));
  /*
   * If elen is zero, then this block actually contains no message
   * bit, only the first padding bit.
   */
  if (elen === 0) {
    ctx.C[0] = ctx.C[1] = ctx.C[2] = ctx.C[3] = 0;
  }
  buf[ptr++] = 0x80;
  
  op.bufferSet(buf,ptr, 0, len - ptr);
  if (ptr > (len - 18)) {
    compress(ctx);
    op.bufferSet(ctx.C,0,0,4);
    op.bufferSet(buf, 0, 0,len);
  }
  buf[len - 17] = 2;
  op.bufferInsert(buf,len - 16, cBytes, 16);
  compress(ctx);
  for (var u = 0; u < 4; u++) {
    for (var v = 0; v < 4; v++) {
      out[u*4 + v] = op.swap32(ctx.state[u][v]);
    }
  }
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  echoInit(ctx);
  echo(ctx, msg);
  var r = echoClose(ctx);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./aes":1,"./helper":7,"./op":11}],6:[function(require,module,exports){
/////////////////////////////////////
////////////  groestl ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var T0 = [
  new op.u64(0xc632f4a5, 0xf497a5c6), new op.u64(0xf86f9784, 0x97eb84f8),
  new op.u64(0xee5eb099, 0xb0c799ee), new op.u64(0xf67a8c8d, 0x8cf78df6),
  new op.u64(0xffe8170d, 0x17e50dff), new op.u64(0xd60adcbd, 0xdcb7bdd6),
  new op.u64(0xde16c8b1, 0xc8a7b1de), new op.u64(0x916dfc54, 0xfc395491),
  new op.u64(0x6090f050, 0xf0c05060), new op.u64(0x02070503, 0x05040302),
  new op.u64(0xce2ee0a9, 0xe087a9ce), new op.u64(0x56d1877d, 0x87ac7d56),
  new op.u64(0xe7cc2b19, 0x2bd519e7), new op.u64(0xb513a662, 0xa67162b5),
  new op.u64(0x4d7c31e6, 0x319ae64d), new op.u64(0xec59b59a, 0xb5c39aec),
  new op.u64(0x8f40cf45, 0xcf05458f), new op.u64(0x1fa3bc9d, 0xbc3e9d1f),
  new op.u64(0x8949c040, 0xc0094089), new op.u64(0xfa689287, 0x92ef87fa),
  new op.u64(0xefd03f15, 0x3fc515ef), new op.u64(0xb29426eb, 0x267febb2),
  new op.u64(0x8ece40c9, 0x4007c98e), new op.u64(0xfbe61d0b, 0x1ded0bfb),
  new op.u64(0x416e2fec, 0x2f82ec41), new op.u64(0xb31aa967, 0xa97d67b3),
  new op.u64(0x5f431cfd, 0x1cbefd5f), new op.u64(0x456025ea, 0x258aea45),
  new op.u64(0x23f9dabf, 0xda46bf23), new op.u64(0x535102f7, 0x02a6f753),
  new op.u64(0xe445a196, 0xa1d396e4), new op.u64(0x9b76ed5b, 0xed2d5b9b),
  new op.u64(0x75285dc2, 0x5deac275), new op.u64(0xe1c5241c, 0x24d91ce1),
  new op.u64(0x3dd4e9ae, 0xe97aae3d), new op.u64(0x4cf2be6a, 0xbe986a4c),
  new op.u64(0x6c82ee5a, 0xeed85a6c), new op.u64(0x7ebdc341, 0xc3fc417e),
  new op.u64(0xf5f30602, 0x06f102f5), new op.u64(0x8352d14f, 0xd11d4f83),
  new op.u64(0x688ce45c, 0xe4d05c68), new op.u64(0x515607f4, 0x07a2f451),
  new op.u64(0xd18d5c34, 0x5cb934d1), new op.u64(0xf9e11808, 0x18e908f9),
  new op.u64(0xe24cae93, 0xaedf93e2), new op.u64(0xab3e9573, 0x954d73ab),
  new op.u64(0x6297f553, 0xf5c45362), new op.u64(0x2a6b413f, 0x41543f2a),
  new op.u64(0x081c140c, 0x14100c08), new op.u64(0x9563f652, 0xf6315295),
  new op.u64(0x46e9af65, 0xaf8c6546), new op.u64(0x9d7fe25e, 0xe2215e9d),
  new op.u64(0x30487828, 0x78602830), new op.u64(0x37cff8a1, 0xf86ea137),
  new op.u64(0x0a1b110f, 0x11140f0a), new op.u64(0x2febc4b5, 0xc45eb52f),
  new op.u64(0x0e151b09, 0x1b1c090e), new op.u64(0x247e5a36, 0x5a483624),
  new op.u64(0x1badb69b, 0xb6369b1b), new op.u64(0xdf98473d, 0x47a53ddf),
  new op.u64(0xcda76a26, 0x6a8126cd), new op.u64(0x4ef5bb69, 0xbb9c694e),
  new op.u64(0x7f334ccd, 0x4cfecd7f), new op.u64(0xea50ba9f, 0xbacf9fea),
  new op.u64(0x123f2d1b, 0x2d241b12), new op.u64(0x1da4b99e, 0xb93a9e1d),
  new op.u64(0x58c49c74, 0x9cb07458), new op.u64(0x3446722e, 0x72682e34),
  new op.u64(0x3641772d, 0x776c2d36), new op.u64(0xdc11cdb2, 0xcda3b2dc),
  new op.u64(0xb49d29ee, 0x2973eeb4), new op.u64(0x5b4d16fb, 0x16b6fb5b),
  new op.u64(0xa4a501f6, 0x0153f6a4), new op.u64(0x76a1d74d, 0xd7ec4d76),
  new op.u64(0xb714a361, 0xa37561b7), new op.u64(0x7d3449ce, 0x49face7d),
  new op.u64(0x52df8d7b, 0x8da47b52), new op.u64(0xdd9f423e, 0x42a13edd),
  new op.u64(0x5ecd9371, 0x93bc715e), new op.u64(0x13b1a297, 0xa2269713),
  new op.u64(0xa6a204f5, 0x0457f5a6), new op.u64(0xb901b868, 0xb86968b9),
  new op.u64(0x00000000, 0x00000000), new op.u64(0xc1b5742c, 0x74992cc1),
  new op.u64(0x40e0a060, 0xa0806040), new op.u64(0xe3c2211f, 0x21dd1fe3),
  new op.u64(0x793a43c8, 0x43f2c879), new op.u64(0xb69a2ced, 0x2c77edb6),
  new op.u64(0xd40dd9be, 0xd9b3bed4), new op.u64(0x8d47ca46, 0xca01468d),
  new op.u64(0x671770d9, 0x70ced967), new op.u64(0x72afdd4b, 0xdde44b72),
  new op.u64(0x94ed79de, 0x7933de94), new op.u64(0x98ff67d4, 0x672bd498),
  new op.u64(0xb09323e8, 0x237be8b0), new op.u64(0x855bde4a, 0xde114a85),
  new op.u64(0xbb06bd6b, 0xbd6d6bbb), new op.u64(0xc5bb7e2a, 0x7e912ac5),
  new op.u64(0x4f7b34e5, 0x349ee54f), new op.u64(0xedd73a16, 0x3ac116ed),
  new op.u64(0x86d254c5, 0x5417c586), new op.u64(0x9af862d7, 0x622fd79a),
  new op.u64(0x6699ff55, 0xffcc5566), new op.u64(0x11b6a794, 0xa7229411),
  new op.u64(0x8ac04acf, 0x4a0fcf8a), new op.u64(0xe9d93010, 0x30c910e9),
  new op.u64(0x040e0a06, 0x0a080604), new op.u64(0xfe669881, 0x98e781fe),
  new op.u64(0xa0ab0bf0, 0x0b5bf0a0), new op.u64(0x78b4cc44, 0xccf04478),
  new op.u64(0x25f0d5ba, 0xd54aba25), new op.u64(0x4b753ee3, 0x3e96e34b),
  new op.u64(0xa2ac0ef3, 0x0e5ff3a2), new op.u64(0x5d4419fe, 0x19bafe5d),
  new op.u64(0x80db5bc0, 0x5b1bc080), new op.u64(0x0580858a, 0x850a8a05),
  new op.u64(0x3fd3ecad, 0xec7ead3f), new op.u64(0x21fedfbc, 0xdf42bc21),
  new op.u64(0x70a8d848, 0xd8e04870), new op.u64(0xf1fd0c04, 0x0cf904f1),
  new op.u64(0x63197adf, 0x7ac6df63), new op.u64(0x772f58c1, 0x58eec177),
  new op.u64(0xaf309f75, 0x9f4575af), new op.u64(0x42e7a563, 0xa5846342),
  new op.u64(0x20705030, 0x50403020), new op.u64(0xe5cb2e1a, 0x2ed11ae5),
  new op.u64(0xfdef120e, 0x12e10efd), new op.u64(0xbf08b76d, 0xb7656dbf),
  new op.u64(0x8155d44c, 0xd4194c81), new op.u64(0x18243c14, 0x3c301418),
  new op.u64(0x26795f35, 0x5f4c3526), new op.u64(0xc3b2712f, 0x719d2fc3),
  new op.u64(0xbe8638e1, 0x3867e1be), new op.u64(0x35c8fda2, 0xfd6aa235),
  new op.u64(0x88c74fcc, 0x4f0bcc88), new op.u64(0x2e654b39, 0x4b5c392e),
  new op.u64(0x936af957, 0xf93d5793), new op.u64(0x55580df2, 0x0daaf255),
  new op.u64(0xfc619d82, 0x9de382fc), new op.u64(0x7ab3c947, 0xc9f4477a),
  new op.u64(0xc827efac, 0xef8bacc8), new op.u64(0xba8832e7, 0x326fe7ba),
  new op.u64(0x324f7d2b, 0x7d642b32), new op.u64(0xe642a495, 0xa4d795e6),
  new op.u64(0xc03bfba0, 0xfb9ba0c0), new op.u64(0x19aab398, 0xb3329819),
  new op.u64(0x9ef668d1, 0x6827d19e), new op.u64(0xa322817f, 0x815d7fa3),
  new op.u64(0x44eeaa66, 0xaa886644), new op.u64(0x54d6827e, 0x82a87e54),
  new op.u64(0x3bdde6ab, 0xe676ab3b), new op.u64(0x0b959e83, 0x9e16830b),
  new op.u64(0x8cc945ca, 0x4503ca8c), new op.u64(0xc7bc7b29, 0x7b9529c7),
  new op.u64(0x6b056ed3, 0x6ed6d36b), new op.u64(0x286c443c, 0x44503c28),
  new op.u64(0xa72c8b79, 0x8b5579a7), new op.u64(0xbc813de2, 0x3d63e2bc),
  new op.u64(0x1631271d, 0x272c1d16), new op.u64(0xad379a76, 0x9a4176ad),
  new op.u64(0xdb964d3b, 0x4dad3bdb), new op.u64(0x649efa56, 0xfac85664),
  new op.u64(0x74a6d24e, 0xd2e84e74), new op.u64(0x1436221e, 0x22281e14),
  new op.u64(0x92e476db, 0x763fdb92), new op.u64(0x0c121e0a, 0x1e180a0c),
  new op.u64(0x48fcb46c, 0xb4906c48), new op.u64(0xb88f37e4, 0x376be4b8),
  new op.u64(0x9f78e75d, 0xe7255d9f), new op.u64(0xbd0fb26e, 0xb2616ebd),
  new op.u64(0x43692aef, 0x2a86ef43), new op.u64(0xc435f1a6, 0xf193a6c4),
  new op.u64(0x39dae3a8, 0xe372a839), new op.u64(0x31c6f7a4, 0xf762a431),
  new op.u64(0xd38a5937, 0x59bd37d3), new op.u64(0xf274868b, 0x86ff8bf2),
  new op.u64(0xd5835632, 0x56b132d5), new op.u64(0x8b4ec543, 0xc50d438b),
  new op.u64(0x6e85eb59, 0xebdc596e), new op.u64(0xda18c2b7, 0xc2afb7da),
  new op.u64(0x018e8f8c, 0x8f028c01), new op.u64(0xb11dac64, 0xac7964b1),
  new op.u64(0x9cf16dd2, 0x6d23d29c), new op.u64(0x49723be0, 0x3b92e049),
  new op.u64(0xd81fc7b4, 0xc7abb4d8), new op.u64(0xacb915fa, 0x1543faac),
  new op.u64(0xf3fa0907, 0x09fd07f3), new op.u64(0xcfa06f25, 0x6f8525cf),
  new op.u64(0xca20eaaf, 0xea8fafca), new op.u64(0xf47d898e, 0x89f38ef4),
  new op.u64(0x476720e9, 0x208ee947), new op.u64(0x10382818, 0x28201810),
  new op.u64(0x6f0b64d5, 0x64ded56f), new op.u64(0xf0738388, 0x83fb88f0),
  new op.u64(0x4afbb16f, 0xb1946f4a), new op.u64(0x5cca9672, 0x96b8725c),
  new op.u64(0x38546c24, 0x6c702438), new op.u64(0x575f08f1, 0x08aef157),
  new op.u64(0x732152c7, 0x52e6c773), new op.u64(0x9764f351, 0xf3355197),
  new op.u64(0xcbae6523, 0x658d23cb), new op.u64(0xa125847c, 0x84597ca1),
  new op.u64(0xe857bf9c, 0xbfcb9ce8), new op.u64(0x3e5d6321, 0x637c213e),
  new op.u64(0x96ea7cdd, 0x7c37dd96), new op.u64(0x611e7fdc, 0x7fc2dc61),
  new op.u64(0x0d9c9186, 0x911a860d), new op.u64(0x0f9b9485, 0x941e850f),
  new op.u64(0xe04bab90, 0xabdb90e0), new op.u64(0x7cbac642, 0xc6f8427c),
  new op.u64(0x712657c4, 0x57e2c471), new op.u64(0xcc29e5aa, 0xe583aacc),
  new op.u64(0x90e373d8, 0x733bd890), new op.u64(0x06090f05, 0x0f0c0506),
  new op.u64(0xf7f40301, 0x03f501f7), new op.u64(0x1c2a3612, 0x3638121c),
  new op.u64(0xc23cfea3, 0xfe9fa3c2), new op.u64(0x6a8be15f, 0xe1d45f6a),
  new op.u64(0xaebe10f9, 0x1047f9ae), new op.u64(0x69026bd0, 0x6bd2d069),
  new op.u64(0x17bfa891, 0xa82e9117), new op.u64(0x9971e858, 0xe8295899),
  new op.u64(0x3a536927, 0x6974273a), new op.u64(0x27f7d0b9, 0xd04eb927),
  new op.u64(0xd9914838, 0x48a938d9), new op.u64(0xebde3513, 0x35cd13eb),
  new op.u64(0x2be5ceb3, 0xce56b32b), new op.u64(0x22775533, 0x55443322),
  new op.u64(0xd204d6bb, 0xd6bfbbd2), new op.u64(0xa9399070, 0x904970a9),
  new op.u64(0x07878089, 0x800e8907), new op.u64(0x33c1f2a7, 0xf266a733),
  new op.u64(0x2decc1b6, 0xc15ab62d), new op.u64(0x3c5a6622, 0x6678223c),
  new op.u64(0x15b8ad92, 0xad2a9215), new op.u64(0xc9a96020, 0x608920c9),
  new op.u64(0x875cdb49, 0xdb154987), new op.u64(0xaab01aff, 0x1a4fffaa),
  new op.u64(0x50d88878, 0x88a07850), new op.u64(0xa52b8e7a, 0x8e517aa5),
  new op.u64(0x03898a8f, 0x8a068f03), new op.u64(0x594a13f8, 0x13b2f859),
  new op.u64(0x09929b80, 0x9b128009), new op.u64(0x1a233917, 0x3934171a),
  new op.u64(0x651075da, 0x75cada65), new op.u64(0xd7845331, 0x53b531d7),
  new op.u64(0x84d551c6, 0x5113c684), new op.u64(0xd003d3b8, 0xd3bbb8d0),
  new op.u64(0x82dc5ec3, 0x5e1fc382), new op.u64(0x29e2cbb0, 0xcb52b029),
  new op.u64(0x5ac39977, 0x99b4775a), new op.u64(0x1e2d3311, 0x333c111e),
  new op.u64(0x7b3d46cb, 0x46f6cb7b), new op.u64(0xa8b71ffc, 0x1f4bfca8),
  new op.u64(0x6d0c61d6, 0x61dad66d), new op.u64(0x2c624e3a, 0x4e583a2c)
];

var T1 = [
  new op.u64(0xc6c632f4, 0xa5f497a5), new op.u64(0xf8f86f97, 0x8497eb84),
  new op.u64(0xeeee5eb0, 0x99b0c799), new op.u64(0xf6f67a8c, 0x8d8cf78d),
  new op.u64(0xffffe817, 0xd17e50d), new op.u64(0xd6d60adc, 0xbddcb7bd),
  new op.u64(0xdede16c8, 0xb1c8a7b1), new op.u64(0x91916dfc, 0x54fc3954),
  new op.u64(0x606090f0, 0x50f0c050), new op.u64(0x2020705, 0x3050403),
  new op.u64(0xcece2ee0, 0xa9e087a9), new op.u64(0x5656d187, 0x7d87ac7d),
  new op.u64(0xe7e7cc2b, 0x192bd519), new op.u64(0xb5b513a6, 0x62a67162),
  new op.u64(0x4d4d7c31, 0xe6319ae6), new op.u64(0xecec59b5, 0x9ab5c39a),
  new op.u64(0x8f8f40cf, 0x45cf0545), new op.u64(0x1f1fa3bc, 0x9dbc3e9d),
  new op.u64(0x898949c0, 0x40c00940), new op.u64(0xfafa6892, 0x8792ef87),
  new op.u64(0xefefd03f, 0x153fc515), new op.u64(0xb2b29426, 0xeb267feb),
  new op.u64(0x8e8ece40, 0xc94007c9), new op.u64(0xfbfbe61d, 0xb1ded0b),
  new op.u64(0x41416e2f, 0xec2f82ec), new op.u64(0xb3b31aa9, 0x67a97d67),
  new op.u64(0x5f5f431c, 0xfd1cbefd), new op.u64(0x45456025, 0xea258aea),
  new op.u64(0x2323f9da, 0xbfda46bf), new op.u64(0x53535102, 0xf702a6f7),
  new op.u64(0xe4e445a1, 0x96a1d396), new op.u64(0x9b9b76ed, 0x5bed2d5b),
  new op.u64(0x7575285d, 0xc25deac2), new op.u64(0xe1e1c524, 0x1c24d91c),
  new op.u64(0x3d3dd4e9, 0xaee97aae), new op.u64(0x4c4cf2be, 0x6abe986a),
  new op.u64(0x6c6c82ee, 0x5aeed85a), new op.u64(0x7e7ebdc3, 0x41c3fc41),
  new op.u64(0xf5f5f306, 0x206f102), new op.u64(0x838352d1, 0x4fd11d4f),
  new op.u64(0x68688ce4, 0x5ce4d05c), new op.u64(0x51515607, 0xf407a2f4),
  new op.u64(0xd1d18d5c, 0x345cb934), new op.u64(0xf9f9e118, 0x818e908),
  new op.u64(0xe2e24cae, 0x93aedf93), new op.u64(0xabab3e95, 0x73954d73),
  new op.u64(0x626297f5, 0x53f5c453), new op.u64(0x2a2a6b41, 0x3f41543f),
  new op.u64(0x8081c14, 0xc14100c), new op.u64(0x959563f6, 0x52f63152),
  new op.u64(0x4646e9af, 0x65af8c65), new op.u64(0x9d9d7fe2, 0x5ee2215e),
  new op.u64(0x30304878, 0x28786028), new op.u64(0x3737cff8, 0xa1f86ea1),
  new op.u64(0xa0a1b11, 0xf11140f), new op.u64(0x2f2febc4, 0xb5c45eb5),
  new op.u64(0xe0e151b, 0x91b1c09), new op.u64(0x24247e5a, 0x365a4836),
  new op.u64(0x1b1badb6, 0x9bb6369b), new op.u64(0xdfdf9847, 0x3d47a53d),
  new op.u64(0xcdcda76a, 0x266a8126), new op.u64(0x4e4ef5bb, 0x69bb9c69),
  new op.u64(0x7f7f334c, 0xcd4cfecd), new op.u64(0xeaea50ba, 0x9fbacf9f),
  new op.u64(0x12123f2d, 0x1b2d241b), new op.u64(0x1d1da4b9, 0x9eb93a9e),
  new op.u64(0x5858c49c, 0x749cb074), new op.u64(0x34344672, 0x2e72682e),
  new op.u64(0x36364177, 0x2d776c2d), new op.u64(0xdcdc11cd, 0xb2cda3b2),
  new op.u64(0xb4b49d29, 0xee2973ee), new op.u64(0x5b5b4d16, 0xfb16b6fb),
  new op.u64(0xa4a4a501, 0xf60153f6), new op.u64(0x7676a1d7, 0x4dd7ec4d),
  new op.u64(0xb7b714a3, 0x61a37561), new op.u64(0x7d7d3449, 0xce49face),
  new op.u64(0x5252df8d, 0x7b8da47b), new op.u64(0xdddd9f42, 0x3e42a13e),
  new op.u64(0x5e5ecd93, 0x7193bc71), new op.u64(0x1313b1a2, 0x97a22697),
  new op.u64(0xa6a6a204, 0xf50457f5), new op.u64(0xb9b901b8, 0x68b86968),
  new op.u64(0x0, 0x0), new op.u64(0xc1c1b574, 0x2c74992c),
  new op.u64(0x4040e0a0, 0x60a08060), new op.u64(0xe3e3c221, 0x1f21dd1f),
  new op.u64(0x79793a43, 0xc843f2c8), new op.u64(0xb6b69a2c, 0xed2c77ed),
  new op.u64(0xd4d40dd9, 0xbed9b3be), new op.u64(0x8d8d47ca, 0x46ca0146),
  new op.u64(0x67671770, 0xd970ced9), new op.u64(0x7272afdd, 0x4bdde44b),
  new op.u64(0x9494ed79, 0xde7933de), new op.u64(0x9898ff67, 0xd4672bd4),
  new op.u64(0xb0b09323, 0xe8237be8), new op.u64(0x85855bde, 0x4ade114a),
  new op.u64(0xbbbb06bd, 0x6bbd6d6b), new op.u64(0xc5c5bb7e, 0x2a7e912a),
  new op.u64(0x4f4f7b34, 0xe5349ee5), new op.u64(0xededd73a, 0x163ac116),
  new op.u64(0x8686d254, 0xc55417c5), new op.u64(0x9a9af862, 0xd7622fd7),
  new op.u64(0x666699ff, 0x55ffcc55), new op.u64(0x1111b6a7, 0x94a72294),
  new op.u64(0x8a8ac04a, 0xcf4a0fcf), new op.u64(0xe9e9d930, 0x1030c910),
  new op.u64(0x4040e0a, 0x60a0806), new op.u64(0xfefe6698, 0x8198e781),
  new op.u64(0xa0a0ab0b, 0xf00b5bf0), new op.u64(0x7878b4cc, 0x44ccf044),
  new op.u64(0x2525f0d5, 0xbad54aba), new op.u64(0x4b4b753e, 0xe33e96e3),
  new op.u64(0xa2a2ac0e, 0xf30e5ff3), new op.u64(0x5d5d4419, 0xfe19bafe),
  new op.u64(0x8080db5b, 0xc05b1bc0), new op.u64(0x5058085, 0x8a850a8a),
  new op.u64(0x3f3fd3ec, 0xadec7ead), new op.u64(0x2121fedf, 0xbcdf42bc),
  new op.u64(0x7070a8d8, 0x48d8e048), new op.u64(0xf1f1fd0c, 0x40cf904),
  new op.u64(0x6363197a, 0xdf7ac6df), new op.u64(0x77772f58, 0xc158eec1),
  new op.u64(0xafaf309f, 0x759f4575), new op.u64(0x4242e7a5, 0x63a58463),
  new op.u64(0x20207050, 0x30504030), new op.u64(0xe5e5cb2e, 0x1a2ed11a),
  new op.u64(0xfdfdef12, 0xe12e10e), new op.u64(0xbfbf08b7, 0x6db7656d),
  new op.u64(0x818155d4, 0x4cd4194c), new op.u64(0x1818243c, 0x143c3014),
  new op.u64(0x2626795f, 0x355f4c35), new op.u64(0xc3c3b271, 0x2f719d2f),
  new op.u64(0xbebe8638, 0xe13867e1), new op.u64(0x3535c8fd, 0xa2fd6aa2),
  new op.u64(0x8888c74f, 0xcc4f0bcc), new op.u64(0x2e2e654b, 0x394b5c39),
  new op.u64(0x93936af9, 0x57f93d57), new op.u64(0x5555580d, 0xf20daaf2),
  new op.u64(0xfcfc619d, 0x829de382), new op.u64(0x7a7ab3c9, 0x47c9f447),
  new op.u64(0xc8c827ef, 0xacef8bac), new op.u64(0xbaba8832, 0xe7326fe7),
  new op.u64(0x32324f7d, 0x2b7d642b), new op.u64(0xe6e642a4, 0x95a4d795),
  new op.u64(0xc0c03bfb, 0xa0fb9ba0), new op.u64(0x1919aab3, 0x98b33298),
  new op.u64(0x9e9ef668, 0xd16827d1), new op.u64(0xa3a32281, 0x7f815d7f),
  new op.u64(0x4444eeaa, 0x66aa8866), new op.u64(0x5454d682, 0x7e82a87e),
  new op.u64(0x3b3bdde6, 0xabe676ab), new op.u64(0xb0b959e, 0x839e1683),
  new op.u64(0x8c8cc945, 0xca4503ca), new op.u64(0xc7c7bc7b, 0x297b9529),
  new op.u64(0x6b6b056e, 0xd36ed6d3), new op.u64(0x28286c44, 0x3c44503c),
  new op.u64(0xa7a72c8b, 0x798b5579), new op.u64(0xbcbc813d, 0xe23d63e2),
  new op.u64(0x16163127, 0x1d272c1d), new op.u64(0xadad379a, 0x769a4176),
  new op.u64(0xdbdb964d, 0x3b4dad3b), new op.u64(0x64649efa, 0x56fac856),
  new op.u64(0x7474a6d2, 0x4ed2e84e), new op.u64(0x14143622, 0x1e22281e),
  new op.u64(0x9292e476, 0xdb763fdb), new op.u64(0xc0c121e, 0xa1e180a),
  new op.u64(0x4848fcb4, 0x6cb4906c), new op.u64(0xb8b88f37, 0xe4376be4),
  new op.u64(0x9f9f78e7, 0x5de7255d), new op.u64(0xbdbd0fb2, 0x6eb2616e),
  new op.u64(0x4343692a, 0xef2a86ef), new op.u64(0xc4c435f1, 0xa6f193a6),
  new op.u64(0x3939dae3, 0xa8e372a8), new op.u64(0x3131c6f7, 0xa4f762a4),
  new op.u64(0xd3d38a59, 0x3759bd37), new op.u64(0xf2f27486, 0x8b86ff8b),
  new op.u64(0xd5d58356, 0x3256b132), new op.u64(0x8b8b4ec5, 0x43c50d43),
  new op.u64(0x6e6e85eb, 0x59ebdc59), new op.u64(0xdada18c2, 0xb7c2afb7),
  new op.u64(0x1018e8f, 0x8c8f028c), new op.u64(0xb1b11dac, 0x64ac7964),
  new op.u64(0x9c9cf16d, 0xd26d23d2), new op.u64(0x4949723b, 0xe03b92e0),
  new op.u64(0xd8d81fc7, 0xb4c7abb4), new op.u64(0xacacb915, 0xfa1543fa),
  new op.u64(0xf3f3fa09, 0x709fd07), new op.u64(0xcfcfa06f, 0x256f8525),
  new op.u64(0xcaca20ea, 0xafea8faf), new op.u64(0xf4f47d89, 0x8e89f38e),
  new op.u64(0x47476720, 0xe9208ee9), new op.u64(0x10103828, 0x18282018),
  new op.u64(0x6f6f0b64, 0xd564ded5), new op.u64(0xf0f07383, 0x8883fb88),
  new op.u64(0x4a4afbb1, 0x6fb1946f), new op.u64(0x5c5cca96, 0x7296b872),
  new op.u64(0x3838546c, 0x246c7024), new op.u64(0x57575f08, 0xf108aef1),
  new op.u64(0x73732152, 0xc752e6c7), new op.u64(0x979764f3, 0x51f33551),
  new op.u64(0xcbcbae65, 0x23658d23), new op.u64(0xa1a12584, 0x7c84597c),
  new op.u64(0xe8e857bf, 0x9cbfcb9c), new op.u64(0x3e3e5d63, 0x21637c21),
  new op.u64(0x9696ea7c, 0xdd7c37dd), new op.u64(0x61611e7f, 0xdc7fc2dc),
  new op.u64(0xd0d9c91, 0x86911a86), new op.u64(0xf0f9b94, 0x85941e85),
  new op.u64(0xe0e04bab, 0x90abdb90), new op.u64(0x7c7cbac6, 0x42c6f842),
  new op.u64(0x71712657, 0xc457e2c4), new op.u64(0xcccc29e5, 0xaae583aa),
  new op.u64(0x9090e373, 0xd8733bd8), new op.u64(0x606090f, 0x50f0c05),
  new op.u64(0xf7f7f403, 0x103f501), new op.u64(0x1c1c2a36, 0x12363812),
  new op.u64(0xc2c23cfe, 0xa3fe9fa3), new op.u64(0x6a6a8be1, 0x5fe1d45f),
  new op.u64(0xaeaebe10, 0xf91047f9), new op.u64(0x6969026b, 0xd06bd2d0),
  new op.u64(0x1717bfa8, 0x91a82e91), new op.u64(0x999971e8, 0x58e82958),
  new op.u64(0x3a3a5369, 0x27697427), new op.u64(0x2727f7d0, 0xb9d04eb9),
  new op.u64(0xd9d99148, 0x3848a938), new op.u64(0xebebde35, 0x1335cd13),
  new op.u64(0x2b2be5ce, 0xb3ce56b3), new op.u64(0x22227755, 0x33554433),
  new op.u64(0xd2d204d6, 0xbbd6bfbb), new op.u64(0xa9a93990, 0x70904970),
  new op.u64(0x7078780, 0x89800e89), new op.u64(0x3333c1f2, 0xa7f266a7),
  new op.u64(0x2d2decc1, 0xb6c15ab6), new op.u64(0x3c3c5a66, 0x22667822),
  new op.u64(0x1515b8ad, 0x92ad2a92), new op.u64(0xc9c9a960, 0x20608920),
  new op.u64(0x87875cdb, 0x49db1549), new op.u64(0xaaaab01a, 0xff1a4fff),
  new op.u64(0x5050d888, 0x7888a078), new op.u64(0xa5a52b8e, 0x7a8e517a),
  new op.u64(0x303898a, 0x8f8a068f), new op.u64(0x59594a13, 0xf813b2f8),
  new op.u64(0x909929b, 0x809b1280), new op.u64(0x1a1a2339, 0x17393417),
  new op.u64(0x65651075, 0xda75cada), new op.u64(0xd7d78453, 0x3153b531),
  new op.u64(0x8484d551, 0xc65113c6), new op.u64(0xd0d003d3, 0xb8d3bbb8),
  new op.u64(0x8282dc5e, 0xc35e1fc3), new op.u64(0x2929e2cb, 0xb0cb52b0),
  new op.u64(0x5a5ac399, 0x7799b477), new op.u64(0x1e1e2d33, 0x11333c11),
  new op.u64(0x7b7b3d46, 0xcb46f6cb), new op.u64(0xa8a8b71f, 0xfc1f4bfc),
  new op.u64(0x6d6d0c61, 0xd661dad6), new op.u64(0x2c2c624e, 0x3a4e583a)
];

var T2 = [
  new op.u64(0xa5c6c632, 0xf4a5f497), new op.u64(0x84f8f86f, 0x978497eb),
  new op.u64(0x99eeee5e, 0xb099b0c7), new op.u64(0x8df6f67a, 0x8c8d8cf7),
  new op.u64(0xdffffe8, 0x170d17e5), new op.u64(0xbdd6d60a, 0xdcbddcb7),
  new op.u64(0xb1dede16, 0xc8b1c8a7), new op.u64(0x5491916d, 0xfc54fc39),
  new op.u64(0x50606090, 0xf050f0c0), new op.u64(0x3020207, 0x5030504),
  new op.u64(0xa9cece2e, 0xe0a9e087), new op.u64(0x7d5656d1, 0x877d87ac),
  new op.u64(0x19e7e7cc, 0x2b192bd5), new op.u64(0x62b5b513, 0xa662a671),
  new op.u64(0xe64d4d7c, 0x31e6319a), new op.u64(0x9aecec59, 0xb59ab5c3),
  new op.u64(0x458f8f40, 0xcf45cf05), new op.u64(0x9d1f1fa3, 0xbc9dbc3e),
  new op.u64(0x40898949, 0xc040c009), new op.u64(0x87fafa68, 0x928792ef),
  new op.u64(0x15efefd0, 0x3f153fc5), new op.u64(0xebb2b294, 0x26eb267f),
  new op.u64(0xc98e8ece, 0x40c94007), new op.u64(0xbfbfbe6, 0x1d0b1ded),
  new op.u64(0xec41416e, 0x2fec2f82), new op.u64(0x67b3b31a, 0xa967a97d),
  new op.u64(0xfd5f5f43, 0x1cfd1cbe), new op.u64(0xea454560, 0x25ea258a),
  new op.u64(0xbf2323f9, 0xdabfda46), new op.u64(0xf7535351, 0x2f702a6),
  new op.u64(0x96e4e445, 0xa196a1d3), new op.u64(0x5b9b9b76, 0xed5bed2d),
  new op.u64(0xc2757528, 0x5dc25dea), new op.u64(0x1ce1e1c5, 0x241c24d9),
  new op.u64(0xae3d3dd4, 0xe9aee97a), new op.u64(0x6a4c4cf2, 0xbe6abe98),
  new op.u64(0x5a6c6c82, 0xee5aeed8), new op.u64(0x417e7ebd, 0xc341c3fc),
  new op.u64(0x2f5f5f3, 0x60206f1), new op.u64(0x4f838352, 0xd14fd11d),
  new op.u64(0x5c68688c, 0xe45ce4d0), new op.u64(0xf4515156, 0x7f407a2),
  new op.u64(0x34d1d18d, 0x5c345cb9), new op.u64(0x8f9f9e1, 0x180818e9),
  new op.u64(0x93e2e24c, 0xae93aedf), new op.u64(0x73abab3e, 0x9573954d),
  new op.u64(0x53626297, 0xf553f5c4), new op.u64(0x3f2a2a6b, 0x413f4154),
  new op.u64(0xc08081c, 0x140c1410), new op.u64(0x52959563, 0xf652f631),
  new op.u64(0x654646e9, 0xaf65af8c), new op.u64(0x5e9d9d7f, 0xe25ee221),
  new op.u64(0x28303048, 0x78287860), new op.u64(0xa13737cf, 0xf8a1f86e),
  new op.u64(0xf0a0a1b, 0x110f1114), new op.u64(0xb52f2feb, 0xc4b5c45e),
  new op.u64(0x90e0e15, 0x1b091b1c), new op.u64(0x3624247e, 0x5a365a48),
  new op.u64(0x9b1b1bad, 0xb69bb636), new op.u64(0x3ddfdf98, 0x473d47a5),
  new op.u64(0x26cdcda7, 0x6a266a81), new op.u64(0x694e4ef5, 0xbb69bb9c),
  new op.u64(0xcd7f7f33, 0x4ccd4cfe), new op.u64(0x9feaea50, 0xba9fbacf),
  new op.u64(0x1b12123f, 0x2d1b2d24), new op.u64(0x9e1d1da4, 0xb99eb93a),
  new op.u64(0x745858c4, 0x9c749cb0), new op.u64(0x2e343446, 0x722e7268),
  new op.u64(0x2d363641, 0x772d776c), new op.u64(0xb2dcdc11, 0xcdb2cda3),
  new op.u64(0xeeb4b49d, 0x29ee2973), new op.u64(0xfb5b5b4d, 0x16fb16b6),
  new op.u64(0xf6a4a4a5, 0x1f60153), new op.u64(0x4d7676a1, 0xd74dd7ec),
  new op.u64(0x61b7b714, 0xa361a375), new op.u64(0xce7d7d34, 0x49ce49fa),
  new op.u64(0x7b5252df, 0x8d7b8da4), new op.u64(0x3edddd9f, 0x423e42a1),
  new op.u64(0x715e5ecd, 0x937193bc), new op.u64(0x971313b1, 0xa297a226),
  new op.u64(0xf5a6a6a2, 0x4f50457), new op.u64(0x68b9b901, 0xb868b869),
  new op.u64(0x0, 0x0), new op.u64(0x2cc1c1b5, 0x742c7499),
  new op.u64(0x604040e0, 0xa060a080), new op.u64(0x1fe3e3c2, 0x211f21dd),
  new op.u64(0xc879793a, 0x43c843f2), new op.u64(0xedb6b69a, 0x2ced2c77),
  new op.u64(0xbed4d40d, 0xd9bed9b3), new op.u64(0x468d8d47, 0xca46ca01),
  new op.u64(0xd9676717, 0x70d970ce), new op.u64(0x4b7272af, 0xdd4bdde4),
  new op.u64(0xde9494ed, 0x79de7933), new op.u64(0xd49898ff, 0x67d4672b),
  new op.u64(0xe8b0b093, 0x23e8237b), new op.u64(0x4a85855b, 0xde4ade11),
  new op.u64(0x6bbbbb06, 0xbd6bbd6d), new op.u64(0x2ac5c5bb, 0x7e2a7e91),
  new op.u64(0xe54f4f7b, 0x34e5349e), new op.u64(0x16ededd7, 0x3a163ac1),
  new op.u64(0xc58686d2, 0x54c55417), new op.u64(0xd79a9af8, 0x62d7622f),
  new op.u64(0x55666699, 0xff55ffcc), new op.u64(0x941111b6, 0xa794a722),
  new op.u64(0xcf8a8ac0, 0x4acf4a0f), new op.u64(0x10e9e9d9, 0x301030c9),
  new op.u64(0x604040e, 0xa060a08), new op.u64(0x81fefe66, 0x988198e7),
  new op.u64(0xf0a0a0ab, 0xbf00b5b), new op.u64(0x447878b4, 0xcc44ccf0),
  new op.u64(0xba2525f0, 0xd5bad54a), new op.u64(0xe34b4b75, 0x3ee33e96),
  new op.u64(0xf3a2a2ac, 0xef30e5f), new op.u64(0xfe5d5d44, 0x19fe19ba),
  new op.u64(0xc08080db, 0x5bc05b1b), new op.u64(0x8a050580, 0x858a850a),
  new op.u64(0xad3f3fd3, 0xecadec7e), new op.u64(0xbc2121fe, 0xdfbcdf42),
  new op.u64(0x487070a8, 0xd848d8e0), new op.u64(0x4f1f1fd, 0xc040cf9),
  new op.u64(0xdf636319, 0x7adf7ac6), new op.u64(0xc177772f, 0x58c158ee),
  new op.u64(0x75afaf30, 0x9f759f45), new op.u64(0x634242e7, 0xa563a584),
  new op.u64(0x30202070, 0x50305040), new op.u64(0x1ae5e5cb, 0x2e1a2ed1),
  new op.u64(0xefdfdef, 0x120e12e1), new op.u64(0x6dbfbf08, 0xb76db765),
  new op.u64(0x4c818155, 0xd44cd419), new op.u64(0x14181824, 0x3c143c30),
  new op.u64(0x35262679, 0x5f355f4c), new op.u64(0x2fc3c3b2, 0x712f719d),
  new op.u64(0xe1bebe86, 0x38e13867), new op.u64(0xa23535c8, 0xfda2fd6a),
  new op.u64(0xcc8888c7, 0x4fcc4f0b), new op.u64(0x392e2e65, 0x4b394b5c),
  new op.u64(0x5793936a, 0xf957f93d), new op.u64(0xf2555558, 0xdf20daa),
  new op.u64(0x82fcfc61, 0x9d829de3), new op.u64(0x477a7ab3, 0xc947c9f4),
  new op.u64(0xacc8c827, 0xefacef8b), new op.u64(0xe7baba88, 0x32e7326f),
  new op.u64(0x2b32324f, 0x7d2b7d64), new op.u64(0x95e6e642, 0xa495a4d7),
  new op.u64(0xa0c0c03b, 0xfba0fb9b), new op.u64(0x981919aa, 0xb398b332),
  new op.u64(0xd19e9ef6, 0x68d16827), new op.u64(0x7fa3a322, 0x817f815d),
  new op.u64(0x664444ee, 0xaa66aa88), new op.u64(0x7e5454d6, 0x827e82a8),
  new op.u64(0xab3b3bdd, 0xe6abe676), new op.u64(0x830b0b95, 0x9e839e16),
  new op.u64(0xca8c8cc9, 0x45ca4503), new op.u64(0x29c7c7bc, 0x7b297b95),
  new op.u64(0xd36b6b05, 0x6ed36ed6), new op.u64(0x3c28286c, 0x443c4450),
  new op.u64(0x79a7a72c, 0x8b798b55), new op.u64(0xe2bcbc81, 0x3de23d63),
  new op.u64(0x1d161631, 0x271d272c), new op.u64(0x76adad37, 0x9a769a41),
  new op.u64(0x3bdbdb96, 0x4d3b4dad), new op.u64(0x5664649e, 0xfa56fac8),
  new op.u64(0x4e7474a6, 0xd24ed2e8), new op.u64(0x1e141436, 0x221e2228),
  new op.u64(0xdb9292e4, 0x76db763f), new op.u64(0xa0c0c12, 0x1e0a1e18),
  new op.u64(0x6c4848fc, 0xb46cb490), new op.u64(0xe4b8b88f, 0x37e4376b),
  new op.u64(0x5d9f9f78, 0xe75de725), new op.u64(0x6ebdbd0f, 0xb26eb261),
  new op.u64(0xef434369, 0x2aef2a86), new op.u64(0xa6c4c435, 0xf1a6f193),
  new op.u64(0xa83939da, 0xe3a8e372), new op.u64(0xa43131c6, 0xf7a4f762),
  new op.u64(0x37d3d38a, 0x593759bd), new op.u64(0x8bf2f274, 0x868b86ff),
  new op.u64(0x32d5d583, 0x563256b1), new op.u64(0x438b8b4e, 0xc543c50d),
  new op.u64(0x596e6e85, 0xeb59ebdc), new op.u64(0xb7dada18, 0xc2b7c2af),
  new op.u64(0x8c01018e, 0x8f8c8f02), new op.u64(0x64b1b11d, 0xac64ac79),
  new op.u64(0xd29c9cf1, 0x6dd26d23), new op.u64(0xe0494972, 0x3be03b92),
  new op.u64(0xb4d8d81f, 0xc7b4c7ab), new op.u64(0xfaacacb9, 0x15fa1543),
  new op.u64(0x7f3f3fa, 0x90709fd), new op.u64(0x25cfcfa0, 0x6f256f85),
  new op.u64(0xafcaca20, 0xeaafea8f), new op.u64(0x8ef4f47d, 0x898e89f3),
  new op.u64(0xe9474767, 0x20e9208e), new op.u64(0x18101038, 0x28182820),
  new op.u64(0xd56f6f0b, 0x64d564de), new op.u64(0x88f0f073, 0x838883fb),
  new op.u64(0x6f4a4afb, 0xb16fb194), new op.u64(0x725c5cca, 0x967296b8),
  new op.u64(0x24383854, 0x6c246c70), new op.u64(0xf157575f, 0x8f108ae),
  new op.u64(0xc7737321, 0x52c752e6), new op.u64(0x51979764, 0xf351f335),
  new op.u64(0x23cbcbae, 0x6523658d), new op.u64(0x7ca1a125, 0x847c8459),
  new op.u64(0x9ce8e857, 0xbf9cbfcb), new op.u64(0x213e3e5d, 0x6321637c),
  new op.u64(0xdd9696ea, 0x7cdd7c37), new op.u64(0xdc61611e, 0x7fdc7fc2),
  new op.u64(0x860d0d9c, 0x9186911a), new op.u64(0x850f0f9b, 0x9485941e),
  new op.u64(0x90e0e04b, 0xab90abdb), new op.u64(0x427c7cba, 0xc642c6f8),
  new op.u64(0xc4717126, 0x57c457e2), new op.u64(0xaacccc29, 0xe5aae583),
  new op.u64(0xd89090e3, 0x73d8733b), new op.u64(0x5060609, 0xf050f0c),
  new op.u64(0x1f7f7f4, 0x30103f5), new op.u64(0x121c1c2a, 0x36123638),
  new op.u64(0xa3c2c23c, 0xfea3fe9f), new op.u64(0x5f6a6a8b, 0xe15fe1d4),
  new op.u64(0xf9aeaebe, 0x10f91047), new op.u64(0xd0696902, 0x6bd06bd2),
  new op.u64(0x911717bf, 0xa891a82e), new op.u64(0x58999971, 0xe858e829),
  new op.u64(0x273a3a53, 0x69276974), new op.u64(0xb92727f7, 0xd0b9d04e),
  new op.u64(0x38d9d991, 0x483848a9), new op.u64(0x13ebebde, 0x351335cd),
  new op.u64(0xb32b2be5, 0xceb3ce56), new op.u64(0x33222277, 0x55335544),
  new op.u64(0xbbd2d204, 0xd6bbd6bf), new op.u64(0x70a9a939, 0x90709049),
  new op.u64(0x89070787, 0x8089800e), new op.u64(0xa73333c1, 0xf2a7f266),
  new op.u64(0xb62d2dec, 0xc1b6c15a), new op.u64(0x223c3c5a, 0x66226678),
  new op.u64(0x921515b8, 0xad92ad2a), new op.u64(0x20c9c9a9, 0x60206089),
  new op.u64(0x4987875c, 0xdb49db15), new op.u64(0xffaaaab0, 0x1aff1a4f),
  new op.u64(0x785050d8, 0x887888a0), new op.u64(0x7aa5a52b, 0x8e7a8e51),
  new op.u64(0x8f030389, 0x8a8f8a06), new op.u64(0xf859594a, 0x13f813b2),
  new op.u64(0x80090992, 0x9b809b12), new op.u64(0x171a1a23, 0x39173934),
  new op.u64(0xda656510, 0x75da75ca), new op.u64(0x31d7d784, 0x533153b5),
  new op.u64(0xc68484d5, 0x51c65113), new op.u64(0xb8d0d003, 0xd3b8d3bb),
  new op.u64(0xc38282dc, 0x5ec35e1f), new op.u64(0xb02929e2, 0xcbb0cb52),
  new op.u64(0x775a5ac3, 0x997799b4), new op.u64(0x111e1e2d, 0x3311333c),
  new op.u64(0xcb7b7b3d, 0x46cb46f6), new op.u64(0xfca8a8b7, 0x1ffc1f4b),
  new op.u64(0xd66d6d0c, 0x61d661da), new op.u64(0x3a2c2c62, 0x4e3a4e58)
];

var T3 = [
  new op.u64(0x97a5c6c6, 0x32f4a5f4), new op.u64(0xeb84f8f8, 0x6f978497),
  new op.u64(0xc799eeee, 0x5eb099b0), new op.u64(0xf78df6f6, 0x7a8c8d8c),
  new op.u64(0xe50dffff, 0xe8170d17), new op.u64(0xb7bdd6d6, 0xadcbddc),
  new op.u64(0xa7b1dede, 0x16c8b1c8), new op.u64(0x39549191, 0x6dfc54fc),
  new op.u64(0xc0506060, 0x90f050f0), new op.u64(0x4030202, 0x7050305),
  new op.u64(0x87a9cece, 0x2ee0a9e0), new op.u64(0xac7d5656, 0xd1877d87),
  new op.u64(0xd519e7e7, 0xcc2b192b), new op.u64(0x7162b5b5, 0x13a662a6),
  new op.u64(0x9ae64d4d, 0x7c31e631), new op.u64(0xc39aecec, 0x59b59ab5),
  new op.u64(0x5458f8f, 0x40cf45cf), new op.u64(0x3e9d1f1f, 0xa3bc9dbc),
  new op.u64(0x9408989, 0x49c040c0), new op.u64(0xef87fafa, 0x68928792),
  new op.u64(0xc515efef, 0xd03f153f), new op.u64(0x7febb2b2, 0x9426eb26),
  new op.u64(0x7c98e8e, 0xce40c940), new op.u64(0xed0bfbfb, 0xe61d0b1d),
  new op.u64(0x82ec4141, 0x6e2fec2f), new op.u64(0x7d67b3b3, 0x1aa967a9),
  new op.u64(0xbefd5f5f, 0x431cfd1c), new op.u64(0x8aea4545, 0x6025ea25),
  new op.u64(0x46bf2323, 0xf9dabfda), new op.u64(0xa6f75353, 0x5102f702),
  new op.u64(0xd396e4e4, 0x45a196a1), new op.u64(0x2d5b9b9b, 0x76ed5bed),
  new op.u64(0xeac27575, 0x285dc25d), new op.u64(0xd91ce1e1, 0xc5241c24),
  new op.u64(0x7aae3d3d, 0xd4e9aee9), new op.u64(0x986a4c4c, 0xf2be6abe),
  new op.u64(0xd85a6c6c, 0x82ee5aee), new op.u64(0xfc417e7e, 0xbdc341c3),
  new op.u64(0xf102f5f5, 0xf3060206), new op.u64(0x1d4f8383, 0x52d14fd1),
  new op.u64(0xd05c6868, 0x8ce45ce4), new op.u64(0xa2f45151, 0x5607f407),
  new op.u64(0xb934d1d1, 0x8d5c345c), new op.u64(0xe908f9f9, 0xe1180818),
  new op.u64(0xdf93e2e2, 0x4cae93ae), new op.u64(0x4d73abab, 0x3e957395),
  new op.u64(0xc4536262, 0x97f553f5), new op.u64(0x543f2a2a, 0x6b413f41),
  new op.u64(0x100c0808, 0x1c140c14), new op.u64(0x31529595, 0x63f652f6),
  new op.u64(0x8c654646, 0xe9af65af), new op.u64(0x215e9d9d, 0x7fe25ee2),
  new op.u64(0x60283030, 0x48782878), new op.u64(0x6ea13737, 0xcff8a1f8),
  new op.u64(0x140f0a0a, 0x1b110f11), new op.u64(0x5eb52f2f, 0xebc4b5c4),
  new op.u64(0x1c090e0e, 0x151b091b), new op.u64(0x48362424, 0x7e5a365a),
  new op.u64(0x369b1b1b, 0xadb69bb6), new op.u64(0xa53ddfdf, 0x98473d47),
  new op.u64(0x8126cdcd, 0xa76a266a), new op.u64(0x9c694e4e, 0xf5bb69bb),
  new op.u64(0xfecd7f7f, 0x334ccd4c), new op.u64(0xcf9feaea, 0x50ba9fba),
  new op.u64(0x241b1212, 0x3f2d1b2d), new op.u64(0x3a9e1d1d, 0xa4b99eb9),
  new op.u64(0xb0745858, 0xc49c749c), new op.u64(0x682e3434, 0x46722e72),
  new op.u64(0x6c2d3636, 0x41772d77), new op.u64(0xa3b2dcdc, 0x11cdb2cd),
  new op.u64(0x73eeb4b4, 0x9d29ee29), new op.u64(0xb6fb5b5b, 0x4d16fb16),
  new op.u64(0x53f6a4a4, 0xa501f601), new op.u64(0xec4d7676, 0xa1d74dd7),
  new op.u64(0x7561b7b7, 0x14a361a3), new op.u64(0xface7d7d, 0x3449ce49),
  new op.u64(0xa47b5252, 0xdf8d7b8d), new op.u64(0xa13edddd, 0x9f423e42),
  new op.u64(0xbc715e5e, 0xcd937193), new op.u64(0x26971313, 0xb1a297a2),
  new op.u64(0x57f5a6a6, 0xa204f504), new op.u64(0x6968b9b9, 0x1b868b8),
  new op.u64(0x0, 0x0), new op.u64(0x992cc1c1, 0xb5742c74),
  new op.u64(0x80604040, 0xe0a060a0), new op.u64(0xdd1fe3e3, 0xc2211f21),
  new op.u64(0xf2c87979, 0x3a43c843), new op.u64(0x77edb6b6, 0x9a2ced2c),
  new op.u64(0xb3bed4d4, 0xdd9bed9), new op.u64(0x1468d8d, 0x47ca46ca),
  new op.u64(0xced96767, 0x1770d970), new op.u64(0xe44b7272, 0xafdd4bdd),
  new op.u64(0x33de9494, 0xed79de79), new op.u64(0x2bd49898, 0xff67d467),
  new op.u64(0x7be8b0b0, 0x9323e823), new op.u64(0x114a8585, 0x5bde4ade),
  new op.u64(0x6d6bbbbb, 0x6bd6bbd), new op.u64(0x912ac5c5, 0xbb7e2a7e),
  new op.u64(0x9ee54f4f, 0x7b34e534), new op.u64(0xc116eded, 0xd73a163a),
  new op.u64(0x17c58686, 0xd254c554), new op.u64(0x2fd79a9a, 0xf862d762),
  new op.u64(0xcc556666, 0x99ff55ff), new op.u64(0x22941111, 0xb6a794a7),
  new op.u64(0xfcf8a8a, 0xc04acf4a), new op.u64(0xc910e9e9, 0xd9301030),
  new op.u64(0x8060404, 0xe0a060a), new op.u64(0xe781fefe, 0x66988198),
  new op.u64(0x5bf0a0a0, 0xab0bf00b), new op.u64(0xf0447878, 0xb4cc44cc),
  new op.u64(0x4aba2525, 0xf0d5bad5), new op.u64(0x96e34b4b, 0x753ee33e),
  new op.u64(0x5ff3a2a2, 0xac0ef30e), new op.u64(0xbafe5d5d, 0x4419fe19),
  new op.u64(0x1bc08080, 0xdb5bc05b), new op.u64(0xa8a0505, 0x80858a85),
  new op.u64(0x7ead3f3f, 0xd3ecadec), new op.u64(0x42bc2121, 0xfedfbcdf),
  new op.u64(0xe0487070, 0xa8d848d8), new op.u64(0xf904f1f1, 0xfd0c040c),
  new op.u64(0xc6df6363, 0x197adf7a), new op.u64(0xeec17777, 0x2f58c158),
  new op.u64(0x4575afaf, 0x309f759f), new op.u64(0x84634242, 0xe7a563a5),
  new op.u64(0x40302020, 0x70503050), new op.u64(0xd11ae5e5, 0xcb2e1a2e),
  new op.u64(0xe10efdfd, 0xef120e12), new op.u64(0x656dbfbf, 0x8b76db7),
  new op.u64(0x194c8181, 0x55d44cd4), new op.u64(0x30141818, 0x243c143c),
  new op.u64(0x4c352626, 0x795f355f), new op.u64(0x9d2fc3c3, 0xb2712f71),
  new op.u64(0x67e1bebe, 0x8638e138), new op.u64(0x6aa23535, 0xc8fda2fd),
  new op.u64(0xbcc8888, 0xc74fcc4f), new op.u64(0x5c392e2e, 0x654b394b),
  new op.u64(0x3d579393, 0x6af957f9), new op.u64(0xaaf25555, 0x580df20d),
  new op.u64(0xe382fcfc, 0x619d829d), new op.u64(0xf4477a7a, 0xb3c947c9),
  new op.u64(0x8bacc8c8, 0x27efacef), new op.u64(0x6fe7baba, 0x8832e732),
  new op.u64(0x642b3232, 0x4f7d2b7d), new op.u64(0xd795e6e6, 0x42a495a4),
  new op.u64(0x9ba0c0c0, 0x3bfba0fb), new op.u64(0x32981919, 0xaab398b3),
  new op.u64(0x27d19e9e, 0xf668d168), new op.u64(0x5d7fa3a3, 0x22817f81),
  new op.u64(0x88664444, 0xeeaa66aa), new op.u64(0xa87e5454, 0xd6827e82),
  new op.u64(0x76ab3b3b, 0xdde6abe6), new op.u64(0x16830b0b, 0x959e839e),
  new op.u64(0x3ca8c8c, 0xc945ca45), new op.u64(0x9529c7c7, 0xbc7b297b),
  new op.u64(0xd6d36b6b, 0x56ed36e), new op.u64(0x503c2828, 0x6c443c44),
  new op.u64(0x5579a7a7, 0x2c8b798b), new op.u64(0x63e2bcbc, 0x813de23d),
  new op.u64(0x2c1d1616, 0x31271d27), new op.u64(0x4176adad, 0x379a769a),
  new op.u64(0xad3bdbdb, 0x964d3b4d), new op.u64(0xc8566464, 0x9efa56fa),
  new op.u64(0xe84e7474, 0xa6d24ed2), new op.u64(0x281e1414, 0x36221e22),
  new op.u64(0x3fdb9292, 0xe476db76), new op.u64(0x180a0c0c, 0x121e0a1e),
  new op.u64(0x906c4848, 0xfcb46cb4), new op.u64(0x6be4b8b8, 0x8f37e437),
  new op.u64(0x255d9f9f, 0x78e75de7), new op.u64(0x616ebdbd, 0xfb26eb2),
  new op.u64(0x86ef4343, 0x692aef2a), new op.u64(0x93a6c4c4, 0x35f1a6f1),
  new op.u64(0x72a83939, 0xdae3a8e3), new op.u64(0x62a43131, 0xc6f7a4f7),
  new op.u64(0xbd37d3d3, 0x8a593759), new op.u64(0xff8bf2f2, 0x74868b86),
  new op.u64(0xb132d5d5, 0x83563256), new op.u64(0xd438b8b, 0x4ec543c5),
  new op.u64(0xdc596e6e, 0x85eb59eb), new op.u64(0xafb7dada, 0x18c2b7c2),
  new op.u64(0x28c0101, 0x8e8f8c8f), new op.u64(0x7964b1b1, 0x1dac64ac),
  new op.u64(0x23d29c9c, 0xf16dd26d), new op.u64(0x92e04949, 0x723be03b),
  new op.u64(0xabb4d8d8, 0x1fc7b4c7), new op.u64(0x43faacac, 0xb915fa15),
  new op.u64(0xfd07f3f3, 0xfa090709), new op.u64(0x8525cfcf, 0xa06f256f),
  new op.u64(0x8fafcaca, 0x20eaafea), new op.u64(0xf38ef4f4, 0x7d898e89),
  new op.u64(0x8ee94747, 0x6720e920), new op.u64(0x20181010, 0x38281828),
  new op.u64(0xded56f6f, 0xb64d564), new op.u64(0xfb88f0f0, 0x73838883),
  new op.u64(0x946f4a4a, 0xfbb16fb1), new op.u64(0xb8725c5c, 0xca967296),
  new op.u64(0x70243838, 0x546c246c), new op.u64(0xaef15757, 0x5f08f108),
  new op.u64(0xe6c77373, 0x2152c752), new op.u64(0x35519797, 0x64f351f3),
  new op.u64(0x8d23cbcb, 0xae652365), new op.u64(0x597ca1a1, 0x25847c84),
  new op.u64(0xcb9ce8e8, 0x57bf9cbf), new op.u64(0x7c213e3e, 0x5d632163),
  new op.u64(0x37dd9696, 0xea7cdd7c), new op.u64(0xc2dc6161, 0x1e7fdc7f),
  new op.u64(0x1a860d0d, 0x9c918691), new op.u64(0x1e850f0f, 0x9b948594),
  new op.u64(0xdb90e0e0, 0x4bab90ab), new op.u64(0xf8427c7c, 0xbac642c6),
  new op.u64(0xe2c47171, 0x2657c457), new op.u64(0x83aacccc, 0x29e5aae5),
  new op.u64(0x3bd89090, 0xe373d873), new op.u64(0xc050606, 0x90f050f),
  new op.u64(0xf501f7f7, 0xf4030103), new op.u64(0x38121c1c, 0x2a361236),
  new op.u64(0x9fa3c2c2, 0x3cfea3fe), new op.u64(0xd45f6a6a, 0x8be15fe1),
  new op.u64(0x47f9aeae, 0xbe10f910), new op.u64(0xd2d06969, 0x26bd06b),
  new op.u64(0x2e911717, 0xbfa891a8), new op.u64(0x29589999, 0x71e858e8),
  new op.u64(0x74273a3a, 0x53692769), new op.u64(0x4eb92727, 0xf7d0b9d0),
  new op.u64(0xa938d9d9, 0x91483848), new op.u64(0xcd13ebeb, 0xde351335),
  new op.u64(0x56b32b2b, 0xe5ceb3ce), new op.u64(0x44332222, 0x77553355),
  new op.u64(0xbfbbd2d2, 0x4d6bbd6), new op.u64(0x4970a9a9, 0x39907090),
  new op.u64(0xe890707, 0x87808980), new op.u64(0x66a73333, 0xc1f2a7f2),
  new op.u64(0x5ab62d2d, 0xecc1b6c1), new op.u64(0x78223c3c, 0x5a662266),
  new op.u64(0x2a921515, 0xb8ad92ad), new op.u64(0x8920c9c9, 0xa9602060),
  new op.u64(0x15498787, 0x5cdb49db), new op.u64(0x4fffaaaa, 0xb01aff1a),
  new op.u64(0xa0785050, 0xd8887888), new op.u64(0x517aa5a5, 0x2b8e7a8e),
  new op.u64(0x68f0303, 0x898a8f8a), new op.u64(0xb2f85959, 0x4a13f813),
  new op.u64(0x12800909, 0x929b809b), new op.u64(0x34171a1a, 0x23391739),
  new op.u64(0xcada6565, 0x1075da75), new op.u64(0xb531d7d7, 0x84533153),
  new op.u64(0x13c68484, 0xd551c651), new op.u64(0xbbb8d0d0, 0x3d3b8d3),
  new op.u64(0x1fc38282, 0xdc5ec35e), new op.u64(0x52b02929, 0xe2cbb0cb),
  new op.u64(0xb4775a5a, 0xc3997799), new op.u64(0x3c111e1e, 0x2d331133),
  new op.u64(0xf6cb7b7b, 0x3d46cb46), new op.u64(0x4bfca8a8, 0xb71ffc1f),
  new op.u64(0xdad66d6d, 0xc61d661), new op.u64(0x583a2c2c, 0x624e3a4e)
]

var T4 = [
  new op.u64(0xf497a5c6, 0xc632f4a5), new op.u64(0x97eb84f8, 0xf86f9784),
  new op.u64(0xb0c799ee, 0xee5eb099), new op.u64(0x8cf78df6, 0xf67a8c8d),
  new op.u64(0x17e50dff, 0xffe8170d), new op.u64(0xdcb7bdd6, 0xd60adcbd),
  new op.u64(0xc8a7b1de, 0xde16c8b1), new op.u64(0xfc395491, 0x916dfc54),
  new op.u64(0xf0c05060, 0x6090f050), new op.u64(0x05040302, 0x02070503),
  new op.u64(0xe087a9ce, 0xce2ee0a9), new op.u64(0x87ac7d56, 0x56d1877d),
  new op.u64(0x2bd519e7, 0xe7cc2b19), new op.u64(0xa67162b5, 0xb513a662),
  new op.u64(0x319ae64d, 0x4d7c31e6), new op.u64(0xb5c39aec, 0xec59b59a),
  new op.u64(0xcf05458f, 0x8f40cf45), new op.u64(0xbc3e9d1f, 0x1fa3bc9d),
  new op.u64(0xc0094089, 0x8949c040), new op.u64(0x92ef87fa, 0xfa689287),
  new op.u64(0x3fc515ef, 0xefd03f15), new op.u64(0x267febb2, 0xb29426eb),
  new op.u64(0x4007c98e, 0x8ece40c9), new op.u64(0x1ded0bfb, 0xfbe61d0b),
  new op.u64(0x2f82ec41, 0x416e2fec), new op.u64(0xa97d67b3, 0xb31aa967),
  new op.u64(0x1cbefd5f, 0x5f431cfd), new op.u64(0x258aea45, 0x456025ea),
  new op.u64(0xda46bf23, 0x23f9dabf), new op.u64(0x02a6f753, 0x535102f7),
  new op.u64(0xa1d396e4, 0xe445a196), new op.u64(0xed2d5b9b, 0x9b76ed5b),
  new op.u64(0x5deac275, 0x75285dc2), new op.u64(0x24d91ce1, 0xe1c5241c),
  new op.u64(0xe97aae3d, 0x3dd4e9ae), new op.u64(0xbe986a4c, 0x4cf2be6a),
  new op.u64(0xeed85a6c, 0x6c82ee5a), new op.u64(0xc3fc417e, 0x7ebdc341),
  new op.u64(0x06f102f5, 0xf5f30602), new op.u64(0xd11d4f83, 0x8352d14f),
  new op.u64(0xe4d05c68, 0x688ce45c), new op.u64(0x07a2f451, 0x515607f4),
  new op.u64(0x5cb934d1, 0xd18d5c34), new op.u64(0x18e908f9, 0xf9e11808),
  new op.u64(0xaedf93e2, 0xe24cae93), new op.u64(0x954d73ab, 0xab3e9573),
  new op.u64(0xf5c45362, 0x6297f553), new op.u64(0x41543f2a, 0x2a6b413f),
  new op.u64(0x14100c08, 0x081c140c), new op.u64(0xf6315295, 0x9563f652),
  new op.u64(0xaf8c6546, 0x46e9af65), new op.u64(0xe2215e9d, 0x9d7fe25e),
  new op.u64(0x78602830, 0x30487828), new op.u64(0xf86ea137, 0x37cff8a1),
  new op.u64(0x11140f0a, 0x0a1b110f), new op.u64(0xc45eb52f, 0x2febc4b5),
  new op.u64(0x1b1c090e, 0x0e151b09), new op.u64(0x5a483624, 0x247e5a36),
  new op.u64(0xb6369b1b, 0x1badb69b), new op.u64(0x47a53ddf, 0xdf98473d),
  new op.u64(0x6a8126cd, 0xcda76a26), new op.u64(0xbb9c694e, 0x4ef5bb69),
  new op.u64(0x4cfecd7f, 0x7f334ccd), new op.u64(0xbacf9fea, 0xea50ba9f),
  new op.u64(0x2d241b12, 0x123f2d1b), new op.u64(0xb93a9e1d, 0x1da4b99e),
  new op.u64(0x9cb07458, 0x58c49c74), new op.u64(0x72682e34, 0x3446722e),
  new op.u64(0x776c2d36, 0x3641772d), new op.u64(0xcda3b2dc, 0xdc11cdb2),
  new op.u64(0x2973eeb4, 0xb49d29ee), new op.u64(0x16b6fb5b, 0x5b4d16fb),
  new op.u64(0x0153f6a4, 0xa4a501f6), new op.u64(0xd7ec4d76, 0x76a1d74d),
  new op.u64(0xa37561b7, 0xb714a361), new op.u64(0x49face7d, 0x7d3449ce),
  new op.u64(0x8da47b52, 0x52df8d7b), new op.u64(0x42a13edd, 0xdd9f423e),
  new op.u64(0x93bc715e, 0x5ecd9371), new op.u64(0xa2269713, 0x13b1a297),
  new op.u64(0x0457f5a6, 0xa6a204f5), new op.u64(0xb86968b9, 0xb901b868),
  new op.u64(0x00000000, 0x00000000), new op.u64(0x74992cc1, 0xc1b5742c),
  new op.u64(0xa0806040, 0x40e0a060), new op.u64(0x21dd1fe3, 0xe3c2211f),
  new op.u64(0x43f2c879, 0x793a43c8), new op.u64(0x2c77edb6, 0xb69a2ced),
  new op.u64(0xd9b3bed4, 0xd40dd9be), new op.u64(0xca01468d, 0x8d47ca46),
  new op.u64(0x70ced967, 0x671770d9), new op.u64(0xdde44b72, 0x72afdd4b),
  new op.u64(0x7933de94, 0x94ed79de), new op.u64(0x672bd498, 0x98ff67d4),
  new op.u64(0x237be8b0, 0xb09323e8), new op.u64(0xde114a85, 0x855bde4a),
  new op.u64(0xbd6d6bbb, 0xbb06bd6b), new op.u64(0x7e912ac5, 0xc5bb7e2a),
  new op.u64(0x349ee54f, 0x4f7b34e5), new op.u64(0x3ac116ed, 0xedd73a16),
  new op.u64(0x5417c586, 0x86d254c5), new op.u64(0x622fd79a, 0x9af862d7),
  new op.u64(0xffcc5566, 0x6699ff55), new op.u64(0xa7229411, 0x11b6a794),
  new op.u64(0x4a0fcf8a, 0x8ac04acf), new op.u64(0x30c910e9, 0xe9d93010),
  new op.u64(0x0a080604, 0x040e0a06), new op.u64(0x98e781fe, 0xfe669881),
  new op.u64(0x0b5bf0a0, 0xa0ab0bf0), new op.u64(0xccf04478, 0x78b4cc44),
  new op.u64(0xd54aba25, 0x25f0d5ba), new op.u64(0x3e96e34b, 0x4b753ee3),
  new op.u64(0x0e5ff3a2, 0xa2ac0ef3), new op.u64(0x19bafe5d, 0x5d4419fe),
  new op.u64(0x5b1bc080, 0x80db5bc0), new op.u64(0x850a8a05, 0x0580858a),
  new op.u64(0xec7ead3f, 0x3fd3ecad), new op.u64(0xdf42bc21, 0x21fedfbc),
  new op.u64(0xd8e04870, 0x70a8d848), new op.u64(0x0cf904f1, 0xf1fd0c04),
  new op.u64(0x7ac6df63, 0x63197adf), new op.u64(0x58eec177, 0x772f58c1),
  new op.u64(0x9f4575af, 0xaf309f75), new op.u64(0xa5846342, 0x42e7a563),
  new op.u64(0x50403020, 0x20705030), new op.u64(0x2ed11ae5, 0xe5cb2e1a),
  new op.u64(0x12e10efd, 0xfdef120e), new op.u64(0xb7656dbf, 0xbf08b76d),
  new op.u64(0xd4194c81, 0x8155d44c), new op.u64(0x3c301418, 0x18243c14),
  new op.u64(0x5f4c3526, 0x26795f35), new op.u64(0x719d2fc3, 0xc3b2712f),
  new op.u64(0x3867e1be, 0xbe8638e1), new op.u64(0xfd6aa235, 0x35c8fda2),
  new op.u64(0x4f0bcc88, 0x88c74fcc), new op.u64(0x4b5c392e, 0x2e654b39),
  new op.u64(0xf93d5793, 0x936af957), new op.u64(0x0daaf255, 0x55580df2),
  new op.u64(0x9de382fc, 0xfc619d82), new op.u64(0xc9f4477a, 0x7ab3c947),
  new op.u64(0xef8bacc8, 0xc827efac), new op.u64(0x326fe7ba, 0xba8832e7),
  new op.u64(0x7d642b32, 0x324f7d2b), new op.u64(0xa4d795e6, 0xe642a495),
  new op.u64(0xfb9ba0c0, 0xc03bfba0), new op.u64(0xb3329819, 0x19aab398),
  new op.u64(0x6827d19e, 0x9ef668d1), new op.u64(0x815d7fa3, 0xa322817f),
  new op.u64(0xaa886644, 0x44eeaa66), new op.u64(0x82a87e54, 0x54d6827e),
  new op.u64(0xe676ab3b, 0x3bdde6ab), new op.u64(0x9e16830b, 0x0b959e83),
  new op.u64(0x4503ca8c, 0x8cc945ca), new op.u64(0x7b9529c7, 0xc7bc7b29),
  new op.u64(0x6ed6d36b, 0x6b056ed3), new op.u64(0x44503c28, 0x286c443c),
  new op.u64(0x8b5579a7, 0xa72c8b79), new op.u64(0x3d63e2bc, 0xbc813de2),
  new op.u64(0x272c1d16, 0x1631271d), new op.u64(0x9a4176ad, 0xad379a76),
  new op.u64(0x4dad3bdb, 0xdb964d3b), new op.u64(0xfac85664, 0x649efa56),
  new op.u64(0xd2e84e74, 0x74a6d24e), new op.u64(0x22281e14, 0x1436221e),
  new op.u64(0x763fdb92, 0x92e476db), new op.u64(0x1e180a0c, 0x0c121e0a),
  new op.u64(0xb4906c48, 0x48fcb46c), new op.u64(0x376be4b8, 0xb88f37e4),
  new op.u64(0xe7255d9f, 0x9f78e75d), new op.u64(0xb2616ebd, 0xbd0fb26e),
  new op.u64(0x2a86ef43, 0x43692aef), new op.u64(0xf193a6c4, 0xc435f1a6),
  new op.u64(0xe372a839, 0x39dae3a8), new op.u64(0xf762a431, 0x31c6f7a4),
  new op.u64(0x59bd37d3, 0xd38a5937), new op.u64(0x86ff8bf2, 0xf274868b),
  new op.u64(0x56b132d5, 0xd5835632), new op.u64(0xc50d438b, 0x8b4ec543),
  new op.u64(0xebdc596e, 0x6e85eb59), new op.u64(0xc2afb7da, 0xda18c2b7),
  new op.u64(0x8f028c01, 0x018e8f8c), new op.u64(0xac7964b1, 0xb11dac64),
  new op.u64(0x6d23d29c, 0x9cf16dd2), new op.u64(0x3b92e049, 0x49723be0),
  new op.u64(0xc7abb4d8, 0xd81fc7b4), new op.u64(0x1543faac, 0xacb915fa),
  new op.u64(0x09fd07f3, 0xf3fa0907), new op.u64(0x6f8525cf, 0xcfa06f25),
  new op.u64(0xea8fafca, 0xca20eaaf), new op.u64(0x89f38ef4, 0xf47d898e),
  new op.u64(0x208ee947, 0x476720e9), new op.u64(0x28201810, 0x10382818),
  new op.u64(0x64ded56f, 0x6f0b64d5), new op.u64(0x83fb88f0, 0xf0738388),
  new op.u64(0xb1946f4a, 0x4afbb16f), new op.u64(0x96b8725c, 0x5cca9672),
  new op.u64(0x6c702438, 0x38546c24), new op.u64(0x08aef157, 0x575f08f1),
  new op.u64(0x52e6c773, 0x732152c7), new op.u64(0xf3355197, 0x9764f351),
  new op.u64(0x658d23cb, 0xcbae6523), new op.u64(0x84597ca1, 0xa125847c),
  new op.u64(0xbfcb9ce8, 0xe857bf9c), new op.u64(0x637c213e, 0x3e5d6321),
  new op.u64(0x7c37dd96, 0x96ea7cdd), new op.u64(0x7fc2dc61, 0x611e7fdc),
  new op.u64(0x911a860d, 0x0d9c9186), new op.u64(0x941e850f, 0x0f9b9485),
  new op.u64(0xabdb90e0, 0xe04bab90), new op.u64(0xc6f8427c, 0x7cbac642),
  new op.u64(0x57e2c471, 0x712657c4), new op.u64(0xe583aacc, 0xcc29e5aa),
  new op.u64(0x733bd890, 0x90e373d8), new op.u64(0x0f0c0506, 0x06090f05),
  new op.u64(0x03f501f7, 0xf7f40301), new op.u64(0x3638121c, 0x1c2a3612),
  new op.u64(0xfe9fa3c2, 0xc23cfea3), new op.u64(0xe1d45f6a, 0x6a8be15f),
  new op.u64(0x1047f9ae, 0xaebe10f9), new op.u64(0x6bd2d069, 0x69026bd0),
  new op.u64(0xa82e9117, 0x17bfa891), new op.u64(0xe8295899, 0x9971e858),
  new op.u64(0x6974273a, 0x3a536927), new op.u64(0xd04eb927, 0x27f7d0b9),
  new op.u64(0x48a938d9, 0xd9914838), new op.u64(0x35cd13eb, 0xebde3513),
  new op.u64(0xce56b32b, 0x2be5ceb3), new op.u64(0x55443322, 0x22775533),
  new op.u64(0xd6bfbbd2, 0xd204d6bb), new op.u64(0x904970a9, 0xa9399070),
  new op.u64(0x800e8907, 0x07878089), new op.u64(0xf266a733, 0x33c1f2a7),
  new op.u64(0xc15ab62d, 0x2decc1b6), new op.u64(0x6678223c, 0x3c5a6622),
  new op.u64(0xad2a9215, 0x15b8ad92), new op.u64(0x608920c9, 0xc9a96020),
  new op.u64(0xdb154987, 0x875cdb49), new op.u64(0x1a4fffaa, 0xaab01aff),
  new op.u64(0x88a07850, 0x50d88878), new op.u64(0x8e517aa5, 0xa52b8e7a),
  new op.u64(0x8a068f03, 0x03898a8f), new op.u64(0x13b2f859, 0x594a13f8),
  new op.u64(0x9b128009, 0x09929b80), new op.u64(0x3934171a, 0x1a233917),
  new op.u64(0x75cada65, 0x651075da), new op.u64(0x53b531d7, 0xd7845331),
  new op.u64(0x5113c684, 0x84d551c6), new op.u64(0xd3bbb8d0, 0xd003d3b8),
  new op.u64(0x5e1fc382, 0x82dc5ec3), new op.u64(0xcb52b029, 0x29e2cbb0),
  new op.u64(0x99b4775a, 0x5ac39977), new op.u64(0x333c111e, 0x1e2d3311),
  new op.u64(0x46f6cb7b, 0x7b3d46cb), new op.u64(0x1f4bfca8, 0xa8b71ffc),
  new op.u64(0x61dad66d, 0x6d0c61d6), new op.u64(0x4e583a2c, 0x2c624e3a)
];

var T5 = [
  new op.u64(0xa5f497a5, 0xc6c632f4), new op.u64(0x8497eb84, 0xf8f86f97),
  new op.u64(0x99b0c799, 0xeeee5eb0), new op.u64(0x8d8cf78d, 0xf6f67a8c),
  new op.u64(0xd17e50d, 0xffffe817), new op.u64(0xbddcb7bd, 0xd6d60adc),
  new op.u64(0xb1c8a7b1, 0xdede16c8), new op.u64(0x54fc3954, 0x91916dfc),
  new op.u64(0x50f0c050, 0x606090f0), new op.u64(0x3050403, 0x2020705),
  new op.u64(0xa9e087a9, 0xcece2ee0), new op.u64(0x7d87ac7d, 0x5656d187),
  new op.u64(0x192bd519, 0xe7e7cc2b), new op.u64(0x62a67162, 0xb5b513a6),
  new op.u64(0xe6319ae6, 0x4d4d7c31), new op.u64(0x9ab5c39a, 0xecec59b5),
  new op.u64(0x45cf0545, 0x8f8f40cf), new op.u64(0x9dbc3e9d, 0x1f1fa3bc),
  new op.u64(0x40c00940, 0x898949c0), new op.u64(0x8792ef87, 0xfafa6892),
  new op.u64(0x153fc515, 0xefefd03f), new op.u64(0xeb267feb, 0xb2b29426),
  new op.u64(0xc94007c9, 0x8e8ece40), new op.u64(0xb1ded0b, 0xfbfbe61d),
  new op.u64(0xec2f82ec, 0x41416e2f), new op.u64(0x67a97d67, 0xb3b31aa9),
  new op.u64(0xfd1cbefd, 0x5f5f431c), new op.u64(0xea258aea, 0x45456025),
  new op.u64(0xbfda46bf, 0x2323f9da), new op.u64(0xf702a6f7, 0x53535102),
  new op.u64(0x96a1d396, 0xe4e445a1), new op.u64(0x5bed2d5b, 0x9b9b76ed),
  new op.u64(0xc25deac2, 0x7575285d), new op.u64(0x1c24d91c, 0xe1e1c524),
  new op.u64(0xaee97aae, 0x3d3dd4e9), new op.u64(0x6abe986a, 0x4c4cf2be),
  new op.u64(0x5aeed85a, 0x6c6c82ee), new op.u64(0x41c3fc41, 0x7e7ebdc3),
  new op.u64(0x206f102, 0xf5f5f306), new op.u64(0x4fd11d4f, 0x838352d1),
  new op.u64(0x5ce4d05c, 0x68688ce4), new op.u64(0xf407a2f4, 0x51515607),
  new op.u64(0x345cb934, 0xd1d18d5c), new op.u64(0x818e908, 0xf9f9e118),
  new op.u64(0x93aedf93, 0xe2e24cae), new op.u64(0x73954d73, 0xabab3e95),
  new op.u64(0x53f5c453, 0x626297f5), new op.u64(0x3f41543f, 0x2a2a6b41),
  new op.u64(0xc14100c, 0x8081c14), new op.u64(0x52f63152, 0x959563f6),
  new op.u64(0x65af8c65, 0x4646e9af), new op.u64(0x5ee2215e, 0x9d9d7fe2),
  new op.u64(0x28786028, 0x30304878), new op.u64(0xa1f86ea1, 0x3737cff8),
  new op.u64(0xf11140f, 0xa0a1b11), new op.u64(0xb5c45eb5, 0x2f2febc4),
  new op.u64(0x91b1c09, 0xe0e151b), new op.u64(0x365a4836, 0x24247e5a),
  new op.u64(0x9bb6369b, 0x1b1badb6), new op.u64(0x3d47a53d, 0xdfdf9847),
  new op.u64(0x266a8126, 0xcdcda76a), new op.u64(0x69bb9c69, 0x4e4ef5bb),
  new op.u64(0xcd4cfecd, 0x7f7f334c), new op.u64(0x9fbacf9f, 0xeaea50ba),
  new op.u64(0x1b2d241b, 0x12123f2d), new op.u64(0x9eb93a9e, 0x1d1da4b9),
  new op.u64(0x749cb074, 0x5858c49c), new op.u64(0x2e72682e, 0x34344672),
  new op.u64(0x2d776c2d, 0x36364177), new op.u64(0xb2cda3b2, 0xdcdc11cd),
  new op.u64(0xee2973ee, 0xb4b49d29), new op.u64(0xfb16b6fb, 0x5b5b4d16),
  new op.u64(0xf60153f6, 0xa4a4a501), new op.u64(0x4dd7ec4d, 0x7676a1d7),
  new op.u64(0x61a37561, 0xb7b714a3), new op.u64(0xce49face, 0x7d7d3449),
  new op.u64(0x7b8da47b, 0x5252df8d), new op.u64(0x3e42a13e, 0xdddd9f42),
  new op.u64(0x7193bc71, 0x5e5ecd93), new op.u64(0x97a22697, 0x1313b1a2),
  new op.u64(0xf50457f5, 0xa6a6a204), new op.u64(0x68b86968, 0xb9b901b8),
  new op.u64(0x0, 0x0), new op.u64(0x2c74992c, 0xc1c1b574),
  new op.u64(0x60a08060, 0x4040e0a0), new op.u64(0x1f21dd1f, 0xe3e3c221),
  new op.u64(0xc843f2c8, 0x79793a43), new op.u64(0xed2c77ed, 0xb6b69a2c),
  new op.u64(0xbed9b3be, 0xd4d40dd9), new op.u64(0x46ca0146, 0x8d8d47ca),
  new op.u64(0xd970ced9, 0x67671770), new op.u64(0x4bdde44b, 0x7272afdd),
  new op.u64(0xde7933de, 0x9494ed79), new op.u64(0xd4672bd4, 0x9898ff67),
  new op.u64(0xe8237be8, 0xb0b09323), new op.u64(0x4ade114a, 0x85855bde),
  new op.u64(0x6bbd6d6b, 0xbbbb06bd), new op.u64(0x2a7e912a, 0xc5c5bb7e),
  new op.u64(0xe5349ee5, 0x4f4f7b34), new op.u64(0x163ac116, 0xededd73a),
  new op.u64(0xc55417c5, 0x8686d254), new op.u64(0xd7622fd7, 0x9a9af862),
  new op.u64(0x55ffcc55, 0x666699ff), new op.u64(0x94a72294, 0x1111b6a7),
  new op.u64(0xcf4a0fcf, 0x8a8ac04a), new op.u64(0x1030c910, 0xe9e9d930),
  new op.u64(0x60a0806, 0x4040e0a), new op.u64(0x8198e781, 0xfefe6698),
  new op.u64(0xf00b5bf0, 0xa0a0ab0b), new op.u64(0x44ccf044, 0x7878b4cc),
  new op.u64(0xbad54aba, 0x2525f0d5), new op.u64(0xe33e96e3, 0x4b4b753e),
  new op.u64(0xf30e5ff3, 0xa2a2ac0e), new op.u64(0xfe19bafe, 0x5d5d4419),
  new op.u64(0xc05b1bc0, 0x8080db5b), new op.u64(0x8a850a8a, 0x5058085),
  new op.u64(0xadec7ead, 0x3f3fd3ec), new op.u64(0xbcdf42bc, 0x2121fedf),
  new op.u64(0x48d8e048, 0x7070a8d8), new op.u64(0x40cf904, 0xf1f1fd0c),
  new op.u64(0xdf7ac6df, 0x6363197a), new op.u64(0xc158eec1, 0x77772f58),
  new op.u64(0x759f4575, 0xafaf309f), new op.u64(0x63a58463, 0x4242e7a5),
  new op.u64(0x30504030, 0x20207050), new op.u64(0x1a2ed11a, 0xe5e5cb2e),
  new op.u64(0xe12e10e, 0xfdfdef12), new op.u64(0x6db7656d, 0xbfbf08b7),
  new op.u64(0x4cd4194c, 0x818155d4), new op.u64(0x143c3014, 0x1818243c),
  new op.u64(0x355f4c35, 0x2626795f), new op.u64(0x2f719d2f, 0xc3c3b271),
  new op.u64(0xe13867e1, 0xbebe8638), new op.u64(0xa2fd6aa2, 0x3535c8fd),
  new op.u64(0xcc4f0bcc, 0x8888c74f), new op.u64(0x394b5c39, 0x2e2e654b),
  new op.u64(0x57f93d57, 0x93936af9), new op.u64(0xf20daaf2, 0x5555580d),
  new op.u64(0x829de382, 0xfcfc619d), new op.u64(0x47c9f447, 0x7a7ab3c9),
  new op.u64(0xacef8bac, 0xc8c827ef), new op.u64(0xe7326fe7, 0xbaba8832),
  new op.u64(0x2b7d642b, 0x32324f7d), new op.u64(0x95a4d795, 0xe6e642a4),
  new op.u64(0xa0fb9ba0, 0xc0c03bfb), new op.u64(0x98b33298, 0x1919aab3),
  new op.u64(0xd16827d1, 0x9e9ef668), new op.u64(0x7f815d7f, 0xa3a32281),
  new op.u64(0x66aa8866, 0x4444eeaa), new op.u64(0x7e82a87e, 0x5454d682),
  new op.u64(0xabe676ab, 0x3b3bdde6), new op.u64(0x839e1683, 0xb0b959e),
  new op.u64(0xca4503ca, 0x8c8cc945), new op.u64(0x297b9529, 0xc7c7bc7b),
  new op.u64(0xd36ed6d3, 0x6b6b056e), new op.u64(0x3c44503c, 0x28286c44),
  new op.u64(0x798b5579, 0xa7a72c8b), new op.u64(0xe23d63e2, 0xbcbc813d),
  new op.u64(0x1d272c1d, 0x16163127), new op.u64(0x769a4176, 0xadad379a),
  new op.u64(0x3b4dad3b, 0xdbdb964d), new op.u64(0x56fac856, 0x64649efa),
  new op.u64(0x4ed2e84e, 0x7474a6d2), new op.u64(0x1e22281e, 0x14143622),
  new op.u64(0xdb763fdb, 0x9292e476), new op.u64(0xa1e180a, 0xc0c121e),
  new op.u64(0x6cb4906c, 0x4848fcb4), new op.u64(0xe4376be4, 0xb8b88f37),
  new op.u64(0x5de7255d, 0x9f9f78e7), new op.u64(0x6eb2616e, 0xbdbd0fb2),
  new op.u64(0xef2a86ef, 0x4343692a), new op.u64(0xa6f193a6, 0xc4c435f1),
  new op.u64(0xa8e372a8, 0x3939dae3), new op.u64(0xa4f762a4, 0x3131c6f7),
  new op.u64(0x3759bd37, 0xd3d38a59), new op.u64(0x8b86ff8b, 0xf2f27486),
  new op.u64(0x3256b132, 0xd5d58356), new op.u64(0x43c50d43, 0x8b8b4ec5),
  new op.u64(0x59ebdc59, 0x6e6e85eb), new op.u64(0xb7c2afb7, 0xdada18c2),
  new op.u64(0x8c8f028c, 0x1018e8f), new op.u64(0x64ac7964, 0xb1b11dac),
  new op.u64(0xd26d23d2, 0x9c9cf16d), new op.u64(0xe03b92e0, 0x4949723b),
  new op.u64(0xb4c7abb4, 0xd8d81fc7), new op.u64(0xfa1543fa, 0xacacb915),
  new op.u64(0x709fd07, 0xf3f3fa09), new op.u64(0x256f8525, 0xcfcfa06f),
  new op.u64(0xafea8faf, 0xcaca20ea), new op.u64(0x8e89f38e, 0xf4f47d89),
  new op.u64(0xe9208ee9, 0x47476720), new op.u64(0x18282018, 0x10103828),
  new op.u64(0xd564ded5, 0x6f6f0b64), new op.u64(0x8883fb88, 0xf0f07383),
  new op.u64(0x6fb1946f, 0x4a4afbb1), new op.u64(0x7296b872, 0x5c5cca96),
  new op.u64(0x246c7024, 0x3838546c), new op.u64(0xf108aef1, 0x57575f08),
  new op.u64(0xc752e6c7, 0x73732152), new op.u64(0x51f33551, 0x979764f3),
  new op.u64(0x23658d23, 0xcbcbae65), new op.u64(0x7c84597c, 0xa1a12584),
  new op.u64(0x9cbfcb9c, 0xe8e857bf), new op.u64(0x21637c21, 0x3e3e5d63),
  new op.u64(0xdd7c37dd, 0x9696ea7c), new op.u64(0xdc7fc2dc, 0x61611e7f),
  new op.u64(0x86911a86, 0xd0d9c91), new op.u64(0x85941e85, 0xf0f9b94),
  new op.u64(0x90abdb90, 0xe0e04bab), new op.u64(0x42c6f842, 0x7c7cbac6),
  new op.u64(0xc457e2c4, 0x71712657), new op.u64(0xaae583aa, 0xcccc29e5),
  new op.u64(0xd8733bd8, 0x9090e373), new op.u64(0x50f0c05, 0x606090f),
  new op.u64(0x103f501, 0xf7f7f403), new op.u64(0x12363812, 0x1c1c2a36),
  new op.u64(0xa3fe9fa3, 0xc2c23cfe), new op.u64(0x5fe1d45f, 0x6a6a8be1),
  new op.u64(0xf91047f9, 0xaeaebe10), new op.u64(0xd06bd2d0, 0x6969026b),
  new op.u64(0x91a82e91, 0x1717bfa8), new op.u64(0x58e82958, 0x999971e8),
  new op.u64(0x27697427, 0x3a3a5369), new op.u64(0xb9d04eb9, 0x2727f7d0),
  new op.u64(0x3848a938, 0xd9d99148), new op.u64(0x1335cd13, 0xebebde35),
  new op.u64(0xb3ce56b3, 0x2b2be5ce), new op.u64(0x33554433, 0x22227755),
  new op.u64(0xbbd6bfbb, 0xd2d204d6), new op.u64(0x70904970, 0xa9a93990),
  new op.u64(0x89800e89, 0x7078780), new op.u64(0xa7f266a7, 0x3333c1f2),
  new op.u64(0xb6c15ab6, 0x2d2decc1), new op.u64(0x22667822, 0x3c3c5a66),
  new op.u64(0x92ad2a92, 0x1515b8ad), new op.u64(0x20608920, 0xc9c9a960),
  new op.u64(0x49db1549, 0x87875cdb), new op.u64(0xff1a4fff, 0xaaaab01a),
  new op.u64(0x7888a078, 0x5050d888), new op.u64(0x7a8e517a, 0xa5a52b8e),
  new op.u64(0x8f8a068f, 0x303898a), new op.u64(0xf813b2f8, 0x59594a13),
  new op.u64(0x809b1280, 0x909929b), new op.u64(0x17393417, 0x1a1a2339),
  new op.u64(0xda75cada, 0x65651075), new op.u64(0x3153b531, 0xd7d78453),
  new op.u64(0xc65113c6, 0x8484d551), new op.u64(0xb8d3bbb8, 0xd0d003d3),
  new op.u64(0xc35e1fc3, 0x8282dc5e), new op.u64(0xb0cb52b0, 0x2929e2cb),
  new op.u64(0x7799b477, 0x5a5ac399), new op.u64(0x11333c11, 0x1e1e2d33),
  new op.u64(0xcb46f6cb, 0x7b7b3d46), new op.u64(0xfc1f4bfc, 0xa8a8b71f),
  new op.u64(0xd661dad6, 0x6d6d0c61), new op.u64(0x3a4e583a, 0x2c2c624e)
];

var T6 = [
  new op.u64(0xf4a5f497, 0xa5c6c632), new op.u64(0x978497eb, 0x84f8f86f),
  new op.u64(0xb099b0c7, 0x99eeee5e), new op.u64(0x8c8d8cf7, 0x8df6f67a),
  new op.u64(0x170d17e5, 0xdffffe8), new op.u64(0xdcbddcb7, 0xbdd6d60a),
  new op.u64(0xc8b1c8a7, 0xb1dede16), new op.u64(0xfc54fc39, 0x5491916d),
  new op.u64(0xf050f0c0, 0x50606090), new op.u64(0x5030504, 0x3020207),
  new op.u64(0xe0a9e087, 0xa9cece2e), new op.u64(0x877d87ac, 0x7d5656d1),
  new op.u64(0x2b192bd5, 0x19e7e7cc), new op.u64(0xa662a671, 0x62b5b513),
  new op.u64(0x31e6319a, 0xe64d4d7c), new op.u64(0xb59ab5c3, 0x9aecec59),
  new op.u64(0xcf45cf05, 0x458f8f40), new op.u64(0xbc9dbc3e, 0x9d1f1fa3),
  new op.u64(0xc040c009, 0x40898949), new op.u64(0x928792ef, 0x87fafa68),
  new op.u64(0x3f153fc5, 0x15efefd0), new op.u64(0x26eb267f, 0xebb2b294),
  new op.u64(0x40c94007, 0xc98e8ece), new op.u64(0x1d0b1ded, 0xbfbfbe6),
  new op.u64(0x2fec2f82, 0xec41416e), new op.u64(0xa967a97d, 0x67b3b31a),
  new op.u64(0x1cfd1cbe, 0xfd5f5f43), new op.u64(0x25ea258a, 0xea454560),
  new op.u64(0xdabfda46, 0xbf2323f9), new op.u64(0x2f702a6, 0xf7535351),
  new op.u64(0xa196a1d3, 0x96e4e445), new op.u64(0xed5bed2d, 0x5b9b9b76),
  new op.u64(0x5dc25dea, 0xc2757528), new op.u64(0x241c24d9, 0x1ce1e1c5),
  new op.u64(0xe9aee97a, 0xae3d3dd4), new op.u64(0xbe6abe98, 0x6a4c4cf2),
  new op.u64(0xee5aeed8, 0x5a6c6c82), new op.u64(0xc341c3fc, 0x417e7ebd),
  new op.u64(0x60206f1, 0x2f5f5f3), new op.u64(0xd14fd11d, 0x4f838352),
  new op.u64(0xe45ce4d0, 0x5c68688c), new op.u64(0x7f407a2, 0xf4515156),
  new op.u64(0x5c345cb9, 0x34d1d18d), new op.u64(0x180818e9, 0x8f9f9e1),
  new op.u64(0xae93aedf, 0x93e2e24c), new op.u64(0x9573954d, 0x73abab3e),
  new op.u64(0xf553f5c4, 0x53626297), new op.u64(0x413f4154, 0x3f2a2a6b),
  new op.u64(0x140c1410, 0xc08081c), new op.u64(0xf652f631, 0x52959563),
  new op.u64(0xaf65af8c, 0x654646e9), new op.u64(0xe25ee221, 0x5e9d9d7f),
  new op.u64(0x78287860, 0x28303048), new op.u64(0xf8a1f86e, 0xa13737cf),
  new op.u64(0x110f1114, 0xf0a0a1b), new op.u64(0xc4b5c45e, 0xb52f2feb),
  new op.u64(0x1b091b1c, 0x90e0e15), new op.u64(0x5a365a48, 0x3624247e),
  new op.u64(0xb69bb636, 0x9b1b1bad), new op.u64(0x473d47a5, 0x3ddfdf98),
  new op.u64(0x6a266a81, 0x26cdcda7), new op.u64(0xbb69bb9c, 0x694e4ef5),
  new op.u64(0x4ccd4cfe, 0xcd7f7f33), new op.u64(0xba9fbacf, 0x9feaea50),
  new op.u64(0x2d1b2d24, 0x1b12123f), new op.u64(0xb99eb93a, 0x9e1d1da4),
  new op.u64(0x9c749cb0, 0x745858c4), new op.u64(0x722e7268, 0x2e343446),
  new op.u64(0x772d776c, 0x2d363641), new op.u64(0xcdb2cda3, 0xb2dcdc11),
  new op.u64(0x29ee2973, 0xeeb4b49d), new op.u64(0x16fb16b6, 0xfb5b5b4d),
  new op.u64(0x1f60153, 0xf6a4a4a5), new op.u64(0xd74dd7ec, 0x4d7676a1),
  new op.u64(0xa361a375, 0x61b7b714), new op.u64(0x49ce49fa, 0xce7d7d34),
  new op.u64(0x8d7b8da4, 0x7b5252df), new op.u64(0x423e42a1, 0x3edddd9f),
  new op.u64(0x937193bc, 0x715e5ecd), new op.u64(0xa297a226, 0x971313b1),
  new op.u64(0x4f50457, 0xf5a6a6a2), new op.u64(0xb868b869, 0x68b9b901),
  new op.u64(0x0, 0x0), new op.u64(0x742c7499, 0x2cc1c1b5),
  new op.u64(0xa060a080, 0x604040e0), new op.u64(0x211f21dd, 0x1fe3e3c2),
  new op.u64(0x43c843f2, 0xc879793a), new op.u64(0x2ced2c77, 0xedb6b69a),
  new op.u64(0xd9bed9b3, 0xbed4d40d), new op.u64(0xca46ca01, 0x468d8d47),
  new op.u64(0x70d970ce, 0xd9676717), new op.u64(0xdd4bdde4, 0x4b7272af),
  new op.u64(0x79de7933, 0xde9494ed), new op.u64(0x67d4672b, 0xd49898ff),
  new op.u64(0x23e8237b, 0xe8b0b093), new op.u64(0xde4ade11, 0x4a85855b),
  new op.u64(0xbd6bbd6d, 0x6bbbbb06), new op.u64(0x7e2a7e91, 0x2ac5c5bb),
  new op.u64(0x34e5349e, 0xe54f4f7b), new op.u64(0x3a163ac1, 0x16ededd7),
  new op.u64(0x54c55417, 0xc58686d2), new op.u64(0x62d7622f, 0xd79a9af8),
  new op.u64(0xff55ffcc, 0x55666699), new op.u64(0xa794a722, 0x941111b6),
  new op.u64(0x4acf4a0f, 0xcf8a8ac0), new op.u64(0x301030c9, 0x10e9e9d9),
  new op.u64(0xa060a08, 0x604040e), new op.u64(0x988198e7, 0x81fefe66),
  new op.u64(0xbf00b5b, 0xf0a0a0ab), new op.u64(0xcc44ccf0, 0x447878b4),
  new op.u64(0xd5bad54a, 0xba2525f0), new op.u64(0x3ee33e96, 0xe34b4b75),
  new op.u64(0xef30e5f, 0xf3a2a2ac), new op.u64(0x19fe19ba, 0xfe5d5d44),
  new op.u64(0x5bc05b1b, 0xc08080db), new op.u64(0x858a850a, 0x8a050580),
  new op.u64(0xecadec7e, 0xad3f3fd3), new op.u64(0xdfbcdf42, 0xbc2121fe),
  new op.u64(0xd848d8e0, 0x487070a8), new op.u64(0xc040cf9, 0x4f1f1fd),
  new op.u64(0x7adf7ac6, 0xdf636319), new op.u64(0x58c158ee, 0xc177772f),
  new op.u64(0x9f759f45, 0x75afaf30), new op.u64(0xa563a584, 0x634242e7),
  new op.u64(0x50305040, 0x30202070), new op.u64(0x2e1a2ed1, 0x1ae5e5cb),
  new op.u64(0x120e12e1, 0xefdfdef), new op.u64(0xb76db765, 0x6dbfbf08),
  new op.u64(0xd44cd419, 0x4c818155), new op.u64(0x3c143c30, 0x14181824),
  new op.u64(0x5f355f4c, 0x35262679), new op.u64(0x712f719d, 0x2fc3c3b2),
  new op.u64(0x38e13867, 0xe1bebe86), new op.u64(0xfda2fd6a, 0xa23535c8),
  new op.u64(0x4fcc4f0b, 0xcc8888c7), new op.u64(0x4b394b5c, 0x392e2e65),
  new op.u64(0xf957f93d, 0x5793936a), new op.u64(0xdf20daa, 0xf2555558),
  new op.u64(0x9d829de3, 0x82fcfc61), new op.u64(0xc947c9f4, 0x477a7ab3),
  new op.u64(0xefacef8b, 0xacc8c827), new op.u64(0x32e7326f, 0xe7baba88),
  new op.u64(0x7d2b7d64, 0x2b32324f), new op.u64(0xa495a4d7, 0x95e6e642),
  new op.u64(0xfba0fb9b, 0xa0c0c03b), new op.u64(0xb398b332, 0x981919aa),
  new op.u64(0x68d16827, 0xd19e9ef6), new op.u64(0x817f815d, 0x7fa3a322),
  new op.u64(0xaa66aa88, 0x664444ee), new op.u64(0x827e82a8, 0x7e5454d6),
  new op.u64(0xe6abe676, 0xab3b3bdd), new op.u64(0x9e839e16, 0x830b0b95),
  new op.u64(0x45ca4503, 0xca8c8cc9), new op.u64(0x7b297b95, 0x29c7c7bc),
  new op.u64(0x6ed36ed6, 0xd36b6b05), new op.u64(0x443c4450, 0x3c28286c),
  new op.u64(0x8b798b55, 0x79a7a72c), new op.u64(0x3de23d63, 0xe2bcbc81),
  new op.u64(0x271d272c, 0x1d161631), new op.u64(0x9a769a41, 0x76adad37),
  new op.u64(0x4d3b4dad, 0x3bdbdb96), new op.u64(0xfa56fac8, 0x5664649e),
  new op.u64(0xd24ed2e8, 0x4e7474a6), new op.u64(0x221e2228, 0x1e141436),
  new op.u64(0x76db763f, 0xdb9292e4), new op.u64(0x1e0a1e18, 0xa0c0c12),
  new op.u64(0xb46cb490, 0x6c4848fc), new op.u64(0x37e4376b, 0xe4b8b88f),
  new op.u64(0xe75de725, 0x5d9f9f78), new op.u64(0xb26eb261, 0x6ebdbd0f),
  new op.u64(0x2aef2a86, 0xef434369), new op.u64(0xf1a6f193, 0xa6c4c435),
  new op.u64(0xe3a8e372, 0xa83939da), new op.u64(0xf7a4f762, 0xa43131c6),
  new op.u64(0x593759bd, 0x37d3d38a), new op.u64(0x868b86ff, 0x8bf2f274),
  new op.u64(0x563256b1, 0x32d5d583), new op.u64(0xc543c50d, 0x438b8b4e),
  new op.u64(0xeb59ebdc, 0x596e6e85), new op.u64(0xc2b7c2af, 0xb7dada18),
  new op.u64(0x8f8c8f02, 0x8c01018e), new op.u64(0xac64ac79, 0x64b1b11d),
  new op.u64(0x6dd26d23, 0xd29c9cf1), new op.u64(0x3be03b92, 0xe0494972),
  new op.u64(0xc7b4c7ab, 0xb4d8d81f), new op.u64(0x15fa1543, 0xfaacacb9),
  new op.u64(0x90709fd, 0x7f3f3fa), new op.u64(0x6f256f85, 0x25cfcfa0),
  new op.u64(0xeaafea8f, 0xafcaca20), new op.u64(0x898e89f3, 0x8ef4f47d),
  new op.u64(0x20e9208e, 0xe9474767), new op.u64(0x28182820, 0x18101038),
  new op.u64(0x64d564de, 0xd56f6f0b), new op.u64(0x838883fb, 0x88f0f073),
  new op.u64(0xb16fb194, 0x6f4a4afb), new op.u64(0x967296b8, 0x725c5cca),
  new op.u64(0x6c246c70, 0x24383854), new op.u64(0x8f108ae, 0xf157575f),
  new op.u64(0x52c752e6, 0xc7737321), new op.u64(0xf351f335, 0x51979764),
  new op.u64(0x6523658d, 0x23cbcbae), new op.u64(0x847c8459, 0x7ca1a125),
  new op.u64(0xbf9cbfcb, 0x9ce8e857), new op.u64(0x6321637c, 0x213e3e5d),
  new op.u64(0x7cdd7c37, 0xdd9696ea), new op.u64(0x7fdc7fc2, 0xdc61611e),
  new op.u64(0x9186911a, 0x860d0d9c), new op.u64(0x9485941e, 0x850f0f9b),
  new op.u64(0xab90abdb, 0x90e0e04b), new op.u64(0xc642c6f8, 0x427c7cba),
  new op.u64(0x57c457e2, 0xc4717126), new op.u64(0xe5aae583, 0xaacccc29),
  new op.u64(0x73d8733b, 0xd89090e3), new op.u64(0xf050f0c, 0x5060609),
  new op.u64(0x30103f5, 0x1f7f7f4), new op.u64(0x36123638, 0x121c1c2a),
  new op.u64(0xfea3fe9f, 0xa3c2c23c), new op.u64(0xe15fe1d4, 0x5f6a6a8b),
  new op.u64(0x10f91047, 0xf9aeaebe), new op.u64(0x6bd06bd2, 0xd0696902),
  new op.u64(0xa891a82e, 0x911717bf), new op.u64(0xe858e829, 0x58999971),
  new op.u64(0x69276974, 0x273a3a53), new op.u64(0xd0b9d04e, 0xb92727f7),
  new op.u64(0x483848a9, 0x38d9d991), new op.u64(0x351335cd, 0x13ebebde),
  new op.u64(0xceb3ce56, 0xb32b2be5), new op.u64(0x55335544, 0x33222277),
  new op.u64(0xd6bbd6bf, 0xbbd2d204), new op.u64(0x90709049, 0x70a9a939),
  new op.u64(0x8089800e, 0x89070787), new op.u64(0xf2a7f266, 0xa73333c1),
  new op.u64(0xc1b6c15a, 0xb62d2dec), new op.u64(0x66226678, 0x223c3c5a),
  new op.u64(0xad92ad2a, 0x921515b8), new op.u64(0x60206089, 0x20c9c9a9),
  new op.u64(0xdb49db15, 0x4987875c), new op.u64(0x1aff1a4f, 0xffaaaab0),
  new op.u64(0x887888a0, 0x785050d8), new op.u64(0x8e7a8e51, 0x7aa5a52b),
  new op.u64(0x8a8f8a06, 0x8f030389), new op.u64(0x13f813b2, 0xf859594a),
  new op.u64(0x9b809b12, 0x80090992), new op.u64(0x39173934, 0x171a1a23),
  new op.u64(0x75da75ca, 0xda656510), new op.u64(0x533153b5, 0x31d7d784),
  new op.u64(0x51c65113, 0xc68484d5), new op.u64(0xd3b8d3bb, 0xb8d0d003),
  new op.u64(0x5ec35e1f, 0xc38282dc), new op.u64(0xcbb0cb52, 0xb02929e2),
  new op.u64(0x997799b4, 0x775a5ac3), new op.u64(0x3311333c, 0x111e1e2d),
  new op.u64(0x46cb46f6, 0xcb7b7b3d), new op.u64(0x1ffc1f4b, 0xfca8a8b7),
  new op.u64(0x61d661da, 0xd66d6d0c), new op.u64(0x4e3a4e58, 0x3a2c2c62)
];

var T7 = [
  new op.u64(0x32f4a5f4, 0x97a5c6c6), new op.u64(0x6f978497, 0xeb84f8f8),
  new op.u64(0x5eb099b0, 0xc799eeee), new op.u64(0x7a8c8d8c, 0xf78df6f6),
  new op.u64(0xe8170d17, 0xe50dffff), new op.u64(0xadcbddc, 0xb7bdd6d6),
  new op.u64(0x16c8b1c8, 0xa7b1dede), new op.u64(0x6dfc54fc, 0x39549191),
  new op.u64(0x90f050f0, 0xc0506060), new op.u64(0x7050305, 0x4030202),
  new op.u64(0x2ee0a9e0, 0x87a9cece), new op.u64(0xd1877d87, 0xac7d5656),
  new op.u64(0xcc2b192b, 0xd519e7e7), new op.u64(0x13a662a6, 0x7162b5b5),
  new op.u64(0x7c31e631, 0x9ae64d4d), new op.u64(0x59b59ab5, 0xc39aecec),
  new op.u64(0x40cf45cf, 0x5458f8f), new op.u64(0xa3bc9dbc, 0x3e9d1f1f),
  new op.u64(0x49c040c0, 0x9408989), new op.u64(0x68928792, 0xef87fafa),
  new op.u64(0xd03f153f, 0xc515efef), new op.u64(0x9426eb26, 0x7febb2b2),
  new op.u64(0xce40c940, 0x7c98e8e), new op.u64(0xe61d0b1d, 0xed0bfbfb),
  new op.u64(0x6e2fec2f, 0x82ec4141), new op.u64(0x1aa967a9, 0x7d67b3b3),
  new op.u64(0x431cfd1c, 0xbefd5f5f), new op.u64(0x6025ea25, 0x8aea4545),
  new op.u64(0xf9dabfda, 0x46bf2323), new op.u64(0x5102f702, 0xa6f75353),
  new op.u64(0x45a196a1, 0xd396e4e4), new op.u64(0x76ed5bed, 0x2d5b9b9b),
  new op.u64(0x285dc25d, 0xeac27575), new op.u64(0xc5241c24, 0xd91ce1e1),
  new op.u64(0xd4e9aee9, 0x7aae3d3d), new op.u64(0xf2be6abe, 0x986a4c4c),
  new op.u64(0x82ee5aee, 0xd85a6c6c), new op.u64(0xbdc341c3, 0xfc417e7e),
  new op.u64(0xf3060206, 0xf102f5f5), new op.u64(0x52d14fd1, 0x1d4f8383),
  new op.u64(0x8ce45ce4, 0xd05c6868), new op.u64(0x5607f407, 0xa2f45151),
  new op.u64(0x8d5c345c, 0xb934d1d1), new op.u64(0xe1180818, 0xe908f9f9),
  new op.u64(0x4cae93ae, 0xdf93e2e2), new op.u64(0x3e957395, 0x4d73abab),
  new op.u64(0x97f553f5, 0xc4536262), new op.u64(0x6b413f41, 0x543f2a2a),
  new op.u64(0x1c140c14, 0x100c0808), new op.u64(0x63f652f6, 0x31529595),
  new op.u64(0xe9af65af, 0x8c654646), new op.u64(0x7fe25ee2, 0x215e9d9d),
  new op.u64(0x48782878, 0x60283030), new op.u64(0xcff8a1f8, 0x6ea13737),
  new op.u64(0x1b110f11, 0x140f0a0a), new op.u64(0xebc4b5c4, 0x5eb52f2f),
  new op.u64(0x151b091b, 0x1c090e0e), new op.u64(0x7e5a365a, 0x48362424),
  new op.u64(0xadb69bb6, 0x369b1b1b), new op.u64(0x98473d47, 0xa53ddfdf),
  new op.u64(0xa76a266a, 0x8126cdcd), new op.u64(0xf5bb69bb, 0x9c694e4e),
  new op.u64(0x334ccd4c, 0xfecd7f7f), new op.u64(0x50ba9fba, 0xcf9feaea),
  new op.u64(0x3f2d1b2d, 0x241b1212), new op.u64(0xa4b99eb9, 0x3a9e1d1d),
  new op.u64(0xc49c749c, 0xb0745858), new op.u64(0x46722e72, 0x682e3434),
  new op.u64(0x41772d77, 0x6c2d3636), new op.u64(0x11cdb2cd, 0xa3b2dcdc),
  new op.u64(0x9d29ee29, 0x73eeb4b4), new op.u64(0x4d16fb16, 0xb6fb5b5b),
  new op.u64(0xa501f601, 0x53f6a4a4), new op.u64(0xa1d74dd7, 0xec4d7676),
  new op.u64(0x14a361a3, 0x7561b7b7), new op.u64(0x3449ce49, 0xface7d7d),
  new op.u64(0xdf8d7b8d, 0xa47b5252), new op.u64(0x9f423e42, 0xa13edddd),
  new op.u64(0xcd937193, 0xbc715e5e), new op.u64(0xb1a297a2, 0x26971313),
  new op.u64(0xa204f504, 0x57f5a6a6), new op.u64(0x1b868b8, 0x6968b9b9),
  new op.u64(0x0, 0x0), new op.u64(0xb5742c74, 0x992cc1c1),
  new op.u64(0xe0a060a0, 0x80604040), new op.u64(0xc2211f21, 0xdd1fe3e3),
  new op.u64(0x3a43c843, 0xf2c87979), new op.u64(0x9a2ced2c, 0x77edb6b6),
  new op.u64(0xdd9bed9, 0xb3bed4d4), new op.u64(0x47ca46ca, 0x1468d8d),
  new op.u64(0x1770d970, 0xced96767), new op.u64(0xafdd4bdd, 0xe44b7272),
  new op.u64(0xed79de79, 0x33de9494), new op.u64(0xff67d467, 0x2bd49898),
  new op.u64(0x9323e823, 0x7be8b0b0), new op.u64(0x5bde4ade, 0x114a8585),
  new op.u64(0x6bd6bbd, 0x6d6bbbbb), new op.u64(0xbb7e2a7e, 0x912ac5c5),
  new op.u64(0x7b34e534, 0x9ee54f4f), new op.u64(0xd73a163a, 0xc116eded),
  new op.u64(0xd254c554, 0x17c58686), new op.u64(0xf862d762, 0x2fd79a9a),
  new op.u64(0x99ff55ff, 0xcc556666), new op.u64(0xb6a794a7, 0x22941111),
  new op.u64(0xc04acf4a, 0xfcf8a8a), new op.u64(0xd9301030, 0xc910e9e9),
  new op.u64(0xe0a060a, 0x8060404), new op.u64(0x66988198, 0xe781fefe),
  new op.u64(0xab0bf00b, 0x5bf0a0a0), new op.u64(0xb4cc44cc, 0xf0447878),
  new op.u64(0xf0d5bad5, 0x4aba2525), new op.u64(0x753ee33e, 0x96e34b4b),
  new op.u64(0xac0ef30e, 0x5ff3a2a2), new op.u64(0x4419fe19, 0xbafe5d5d),
  new op.u64(0xdb5bc05b, 0x1bc08080), new op.u64(0x80858a85, 0xa8a0505),
  new op.u64(0xd3ecadec, 0x7ead3f3f), new op.u64(0xfedfbcdf, 0x42bc2121),
  new op.u64(0xa8d848d8, 0xe0487070), new op.u64(0xfd0c040c, 0xf904f1f1),
  new op.u64(0x197adf7a, 0xc6df6363), new op.u64(0x2f58c158, 0xeec17777),
  new op.u64(0x309f759f, 0x4575afaf), new op.u64(0xe7a563a5, 0x84634242),
  new op.u64(0x70503050, 0x40302020), new op.u64(0xcb2e1a2e, 0xd11ae5e5),
  new op.u64(0xef120e12, 0xe10efdfd), new op.u64(0x8b76db7, 0x656dbfbf),
  new op.u64(0x55d44cd4, 0x194c8181), new op.u64(0x243c143c, 0x30141818),
  new op.u64(0x795f355f, 0x4c352626), new op.u64(0xb2712f71, 0x9d2fc3c3),
  new op.u64(0x8638e138, 0x67e1bebe), new op.u64(0xc8fda2fd, 0x6aa23535),
  new op.u64(0xc74fcc4f, 0xbcc8888), new op.u64(0x654b394b, 0x5c392e2e),
  new op.u64(0x6af957f9, 0x3d579393), new op.u64(0x580df20d, 0xaaf25555),
  new op.u64(0x619d829d, 0xe382fcfc), new op.u64(0xb3c947c9, 0xf4477a7a),
  new op.u64(0x27efacef, 0x8bacc8c8), new op.u64(0x8832e732, 0x6fe7baba),
  new op.u64(0x4f7d2b7d, 0x642b3232), new op.u64(0x42a495a4, 0xd795e6e6),
  new op.u64(0x3bfba0fb, 0x9ba0c0c0), new op.u64(0xaab398b3, 0x32981919),
  new op.u64(0xf668d168, 0x27d19e9e), new op.u64(0x22817f81, 0x5d7fa3a3),
  new op.u64(0xeeaa66aa, 0x88664444), new op.u64(0xd6827e82, 0xa87e5454),
  new op.u64(0xdde6abe6, 0x76ab3b3b), new op.u64(0x959e839e, 0x16830b0b),
  new op.u64(0xc945ca45, 0x3ca8c8c), new op.u64(0xbc7b297b, 0x9529c7c7),
  new op.u64(0x56ed36e, 0xd6d36b6b), new op.u64(0x6c443c44, 0x503c2828),
  new op.u64(0x2c8b798b, 0x5579a7a7), new op.u64(0x813de23d, 0x63e2bcbc),
  new op.u64(0x31271d27, 0x2c1d1616), new op.u64(0x379a769a, 0x4176adad),
  new op.u64(0x964d3b4d, 0xad3bdbdb), new op.u64(0x9efa56fa, 0xc8566464),
  new op.u64(0xa6d24ed2, 0xe84e7474), new op.u64(0x36221e22, 0x281e1414),
  new op.u64(0xe476db76, 0x3fdb9292), new op.u64(0x121e0a1e, 0x180a0c0c),
  new op.u64(0xfcb46cb4, 0x906c4848), new op.u64(0x8f37e437, 0x6be4b8b8),
  new op.u64(0x78e75de7, 0x255d9f9f), new op.u64(0xfb26eb2, 0x616ebdbd),
  new op.u64(0x692aef2a, 0x86ef4343), new op.u64(0x35f1a6f1, 0x93a6c4c4),
  new op.u64(0xdae3a8e3, 0x72a83939), new op.u64(0xc6f7a4f7, 0x62a43131),
  new op.u64(0x8a593759, 0xbd37d3d3), new op.u64(0x74868b86, 0xff8bf2f2),
  new op.u64(0x83563256, 0xb132d5d5), new op.u64(0x4ec543c5, 0xd438b8b),
  new op.u64(0x85eb59eb, 0xdc596e6e), new op.u64(0x18c2b7c2, 0xafb7dada),
  new op.u64(0x8e8f8c8f, 0x28c0101), new op.u64(0x1dac64ac, 0x7964b1b1),
  new op.u64(0xf16dd26d, 0x23d29c9c), new op.u64(0x723be03b, 0x92e04949),
  new op.u64(0x1fc7b4c7, 0xabb4d8d8), new op.u64(0xb915fa15, 0x43faacac),
  new op.u64(0xfa090709, 0xfd07f3f3), new op.u64(0xa06f256f, 0x8525cfcf),
  new op.u64(0x20eaafea, 0x8fafcaca), new op.u64(0x7d898e89, 0xf38ef4f4),
  new op.u64(0x6720e920, 0x8ee94747), new op.u64(0x38281828, 0x20181010),
  new op.u64(0xb64d564, 0xded56f6f), new op.u64(0x73838883, 0xfb88f0f0),
  new op.u64(0xfbb16fb1, 0x946f4a4a), new op.u64(0xca967296, 0xb8725c5c),
  new op.u64(0x546c246c, 0x70243838), new op.u64(0x5f08f108, 0xaef15757),
  new op.u64(0x2152c752, 0xe6c77373), new op.u64(0x64f351f3, 0x35519797),
  new op.u64(0xae652365, 0x8d23cbcb), new op.u64(0x25847c84, 0x597ca1a1),
  new op.u64(0x57bf9cbf, 0xcb9ce8e8), new op.u64(0x5d632163, 0x7c213e3e),
  new op.u64(0xea7cdd7c, 0x37dd9696), new op.u64(0x1e7fdc7f, 0xc2dc6161),
  new op.u64(0x9c918691, 0x1a860d0d), new op.u64(0x9b948594, 0x1e850f0f),
  new op.u64(0x4bab90ab, 0xdb90e0e0), new op.u64(0xbac642c6, 0xf8427c7c),
  new op.u64(0x2657c457, 0xe2c47171), new op.u64(0x29e5aae5, 0x83aacccc),
  new op.u64(0xe373d873, 0x3bd89090), new op.u64(0x90f050f, 0xc050606),
  new op.u64(0xf4030103, 0xf501f7f7), new op.u64(0x2a361236, 0x38121c1c),
  new op.u64(0x3cfea3fe, 0x9fa3c2c2), new op.u64(0x8be15fe1, 0xd45f6a6a),
  new op.u64(0xbe10f910, 0x47f9aeae), new op.u64(0x26bd06b, 0xd2d06969),
  new op.u64(0xbfa891a8, 0x2e911717), new op.u64(0x71e858e8, 0x29589999),
  new op.u64(0x53692769, 0x74273a3a), new op.u64(0xf7d0b9d0, 0x4eb92727),
  new op.u64(0x91483848, 0xa938d9d9), new op.u64(0xde351335, 0xcd13ebeb),
  new op.u64(0xe5ceb3ce, 0x56b32b2b), new op.u64(0x77553355, 0x44332222),
  new op.u64(0x4d6bbd6, 0xbfbbd2d2), new op.u64(0x39907090, 0x4970a9a9),
  new op.u64(0x87808980, 0xe890707), new op.u64(0xc1f2a7f2, 0x66a73333),
  new op.u64(0xecc1b6c1, 0x5ab62d2d), new op.u64(0x5a662266, 0x78223c3c),
  new op.u64(0xb8ad92ad, 0x2a921515), new op.u64(0xa9602060, 0x8920c9c9),
  new op.u64(0x5cdb49db, 0x15498787), new op.u64(0xb01aff1a, 0x4fffaaaa),
  new op.u64(0xd8887888, 0xa0785050), new op.u64(0x2b8e7a8e, 0x517aa5a5),
  new op.u64(0x898a8f8a, 0x68f0303), new op.u64(0x4a13f813, 0xb2f85959),
  new op.u64(0x929b809b, 0x12800909), new op.u64(0x23391739, 0x34171a1a),
  new op.u64(0x1075da75, 0xcada6565), new op.u64(0x84533153, 0xb531d7d7),
  new op.u64(0xd551c651, 0x13c68484), new op.u64(0x3d3b8d3, 0xbbb8d0d0),
  new op.u64(0xdc5ec35e, 0x1fc38282), new op.u64(0xe2cbb0cb, 0x52b02929),
  new op.u64(0xc3997799, 0xb4775a5a), new op.u64(0x2d331133, 0x3c111e1e),
  new op.u64(0x3d46cb46, 0xf6cb7b7b), new op.u64(0xb71ffc1f, 0x4bfca8a8),
  new op.u64(0xc61d661, 0xdad66d6d), new op.u64(0x624e3a4e, 0x583a2c2c)
];

var B64 = function(n, x) {
  return x.shiftRight(((7 - n) * 8)).lo & 0xFF;
}

var j64 = [new op.u64(0, 0), new op.u64(0, 0x10), new op.u64(0, 0x20), new op.u64(0, 0x30), new op.u64(0, 0x40), new op.u64(0, 0x50), new op.u64(0, 0x60),
  new op.u64(0, 0x70), new op.u64(0, 0x80), new op.u64(0, 0x90), new op.u64(0, 0xA0), new op.u64(0, 0xB0), new op.u64(0, 0xC0),
  new op.u64(0, 0xD0), new op.u64(0, 0xE0), new op.u64(0, 0xF0)
];

var nj64 = [new op.u64(0xFFFFFFFF, 0xFFFFFFFF), new op.u64(0xFFFFFFFF, 0xFFFFFFEF), new op.u64(0xFFFFFFFF, 0xFFFFFFDF), new op.u64(0xFFFFFFFF, 0xFFFFFFCF), new op.u64(0xFFFFFFFF, 0xFFFFFFBF), new op.u64(0xFFFFFFFF, 0xFFFFFFAF), new op.u64(0xFFFFFFFF, 0xFFFFFF9F),
  new op.u64(0xFFFFFFFF, 0xFFFFFF8F), new op.u64(0xFFFFFFFF, 0xFFFFFF7F), new op.u64(0xFFFFFFFF, 0xFFFFFF6F), new op.u64(0xFFFFFFFF, 0xFFFFFF5F), new op.u64(0xFFFFFFFF, 0xFFFFFF4F), new op.u64(0xFFFFFFFF, 0xFFFFFF3F),
  new op.u64(0xFFFFFFFF, 0xFFFFFF2F), new op.u64(0xFFFFFFFF, 0xFFFFFF1F), new op.u64(0xFFFFFFFF, 0xFFFFFF0F)
];

var r64 = [new op.u64(0, 0), new op.u64(0, 1), new op.u64(0, 2), new op.u64(0, 3), new op.u64(0, 4), new op.u64(0, 5), new op.u64(0, 6), new op.u64(0, 7),
  new op.u64(0, 8), new op.u64(0, 9), new op.u64(0, 10), new op.u64(0, 11), new op.u64(0, 12), new op.u64(0, 13)
];

var PC64 = function(j, r) {
  return j64[j].plus(r64[r]).shiftLeft(56);
}
var QC64 = function(j, r) {
  return r64[r].xor(nj64[j]);
}

var RBTT = function(t, d, a, b0, b1, b2, b3, b4, b5, b6, b7) {
  t[d] = op.xor64(T0[B64(0, a[b0])], T1[B64(1, a[b1])], T2[B64(2, a[b2])], T3[B64(3, a[b3])], T4[B64(4, a[b4])], T5[B64(5, a[b5])], T6[B64(6, a[b6])], T7[B64(7, a[b7])]);
}

var ROUND_BIG_P = function(a, r) {
  var t = new Array(16);
  for (var i = 0; i < 16; i++) {
    a[i].setxor64(PC64(i, r));
  }
  for (var u = 0; u < 16; u += 4) {
    RBTT(t, u, a, u, (u + 1) & 0xF,
      (u + 2) & 0xF, (u + 3) & 0xF, (u + 4) & 0xF,
      (u + 5) & 0xF, (u + 6) & 0xF, (u + 11) & 0xF);
    RBTT(t, u + 1, a, u + 1, (u + 2) & 0xF,
      (u + 3) & 0xF, (u + 4) & 0xF, (u + 5) & 0xF,
      (u + 6) & 0xF, (u + 7) & 0xF, (u + 12) & 0xF);
    RBTT(t, u + 2, a, u + 2, (u + 3) & 0xF,
      (u + 4) & 0xF, (u + 5) & 0xF, (u + 6) & 0xF,
      (u + 7) & 0xF, (u + 8) & 0xF, (u + 13) & 0xF);
    RBTT(t, u + 3, a, u + 3, (u + 4) & 0xF,
      (u + 5) & 0xF, (u + 6) & 0xF, (u + 7) & 0xF,
      (u + 8) & 0xF, (u + 9) & 0xF, (u + 14) & 0xF);
  }
  op.bufferInsert(a, 0, t, 16);
}

var ROUND_BIG_Q = function(a, r) {
  var t = new Array(16);
  for (var i = 0; i < 16; i++) {
    a[i].setxor64(QC64(i, r));
  }
  for (var u = 0; u < 16; u += 4) {
    RBTT(t, u + 0, a, (u + 1) & 0xF, (u + 3) & 0xF,
      (u + 5) & 0xF, (u + 11) & 0xF, (u + 0) & 0xF,
      (u + 2) & 0xF, (u + 4) & 0xF, (u + 6) & 0xF);
    RBTT(t, u + 1, a, (u + 2) & 0xF, (u + 4) & 0xF,
      (u + 6) & 0xF, (u + 12) & 0xF, (u + 1) & 0xF,
      (u + 3) & 0xF, (u + 5) & 0xF, (u + 7) & 0xF);
    RBTT(t, u + 2, a, (u + 3) & 0xF, (u + 5) & 0xF,
      (u + 7) & 0xF, (u + 13) & 0xF, (u + 2) & 0xF,
      (u + 4) & 0xF, (u + 6) & 0xF, (u + 8) & 0xF);
    RBTT(t, u + 3, a, (u + 4) & 0xF, (u + 6) & 0xF,
      (u + 8) & 0xF, (u + 14) & 0xF, (u + 3) & 0xF,
      (u + 5) & 0xF, (u + 7) & 0xF, (u + 9) & 0xF);
  }
  op.bufferInsert(a, 0, t, 16);
}

var PERM_BIG_P = function(a) {
  for (var r = 0; r < 14; r ++) {
    ROUND_BIG_P(a, r);
  }
}

var PERM_BIG_Q = function(a) {
  for (var r = 0; r < 14; r ++) {
    ROUND_BIG_Q(a, r);
  }
}


var compress = function(int64buf, state) {
  var g = new Array(16);
  var m = new Array(16);
  for (var u = 0; u < 16; u++) {
    m[u] = int64buf[u];
    g[u] = m[u].xor(state[u]);
  }
  PERM_BIG_P(g);
  PERM_BIG_Q(m);
  for (var u = 0; u < 16; u++) {
    state[u].setxor64(g[u], m[u]);
  }
}

var final = function(state) {
  var x = new Array(16);
  op.bufferInsert64(x, 0, state, 16);
  PERM_BIG_P(x);
  for (var u = 0; u < 16; u++)
    state[u].setxor64(x[u]);
}

var groestl = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  var V = new Array(16);
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  op.bufferInsert(V, 0, ctx.state, 16);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int64Buf = h.bytes2Int64Buffer(buf);
      compress(int64Buf, V);
      ctx.count.addOne();
      ptr = 0;
    }
  }
  ctx.state = V;
  ctx.ptr = ptr;
}

var groestlClose = function(ctx) {
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var pad = new Array(136);
  var len = buf.length;
  var padLen;
  var count;
  pad[0] = 0x80;
  if (ptr < 120) {
    padLen = 128 - ptr;
    count = ctx.count.plus(new op.u64(0, 1));
  }
  else {
    padLen = 256 - ptr;
    count = ctx.count.plus(new op.u64(0, 2));
  }
  op.bufferSet(pad, 1, 0, padLen - 9);
  h.bufferEncode64(pad, padLen - 8, count);
  groestl(ctx, pad, padLen);
  final(ctx.state);
  var out = new Array(16);
  for (var u = 0, v = 8; u < 8; u++, v++) {
    out[2 * u] = ctx.state[v].hi;
    out[2 * u + 1] = ctx.state[v].lo;
  }
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = new Array(16);
  for (var i = 0; i < 15; i++) {
    ctx.state[i] = new op.u64(0, 0);
  }
  ctx.state[15] = new op.u64(0, 512);
  ctx.ptr = 0;
  ctx.count = op.u64.prototype.zero();
  ctx.buffer = new Array(128);
  groestl(ctx, msg, msg.length);
  var r = groestlClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],7:[function(require,module,exports){
'use strict';
// String functions

var op = require('./op.js');

module.exports.int8ArrayToHexString = function toString(array) {
	var string = '';
	for (var i in array) {
		if (array[i] < 16) {
			string += '0' + array[i].toString(16);
		}
		else {
			string += array[i].toString(16);
		}
	}
	return string;
}

module.exports.int32ArrayToHexString = function toString(array) {
	var string = '';
	for (var i in array) {
		var s = array[i];
		if (s < 0) {
			s = 0xFFFFFFFF + array[i] + 1;
		}
		var l = s.toString(16);
		var padding = 8;
		while (l.length < padding) {
			l = "0" + l;
		}
		string += l;
	}
	return string;
}

module.exports.hex2string = function toString(s) {
	for (var c = [], len = s.length, i = 0; i < len; i += 2)
		c.push(String.fromCharCode(parseInt(s.substring(i, i + 2), 16)));
	return c.join('');
}

module.exports.hex2bytes = function toString(s) {
	for (var c = [], len = s.length, i = 0; i < len; i += 2)
		c.push(parseInt(s.substring(i, i + 2), 16));
	return c;
}

module.exports.string2hex = function toString(s) {
	for (var p = [], len = s.length, i = 0; i < len; i++) {
		p.push((256 + s.charCodeAt(i)).toString(16).substring(1));
	}
	return p.join('');
}

module.exports.string2bytes = function (s) {
	for (var b = [], i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
	return b;
}

module.exports.bytes2Int16Buffer = function(b) {
	var len = b.length;
	var bufferLength = len?(((len - 1) >>> 1) + 1):0;
	var buffer = new Array(bufferLength);
	var i = 0;
	var j = 0;
	while (i<len) {
		buffer[j] = (buffer[j] << 8) | b[i];
		i++;
		if (!(i%2)) j++;
	}
	return buffer;
}

module.exports.bytes2Int32Buffer = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len?(((len - 1) >>> 2) + 1):0;
	var buffer = new Array(bufferLength);
	for (var j = 0;j<bufferLength;j++) {
		buffer[j] = (b[j*4] << 24) | (b[j*4 + 1] << 16) | (b[j*4 + 2] << 8) | b[j*4 + 3];
	}
	return buffer;
}

module.exports.bytes2Int32BufferLeAligned = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len?(((len - 1) >>> 2) + 1):0;
	var buffer = new Array(bufferLength);
	for (var j = 0;j<bufferLength;j++) {
		buffer[j] = (b[j*4 + 3] << 24) | (b[j*4 + 2] << 16) | (b[j*4 + 1] << 8) | b[j*4];
	}
	return buffer;
}

module.exports.bytes2Int64Buffer = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len?(((len - 1) >>> 3) + 1):0;
	var buffer = new Array(bufferLength);
	for (var j = 0;j<bufferLength;j++) {
		buffer[j] = new op.u64((b[j*8] << 24) | (b[j*8 + 1] << 16) | (b[j*8 + 2] << 8) | b[j*8 + 3],(b[j*8 + 4] << 24) | (b[j*8 + 5] << 16) | (b[j*8 + 6] << 8) | b[j*8 + 7]);
	}
	return buffer;
}

module.exports.bytes2Int64BufferLeAligned = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len?(((len - 1) >>> 3) + 1):0;
	var buffer = new Array(bufferLength);
	for (var j = 0;j<bufferLength;j++) {
		buffer[j] = new op.u64((b[j*8 + 7] << 24) | (b[j*8 + 6] << 16) | (b[j*8 + 5] << 8) | b[j*8 + 4],(b[j*8 + 3] << 24) | (b[j*8 + 2] << 16) | (b[j*8 + 1] << 8) | b[j*8]);
	}
	return buffer;
}

module.exports.bufferEncode64leAligned = function(buffer,offset,uint64) {
	buffer[offset + 7] = uint64.hi >>> 24;
	buffer[offset + 6] = uint64.hi >>> 16 & 0xFF;
	buffer[offset + 5] = uint64.hi >>> 8 & 0xFF;
	buffer[offset + 4] = uint64.hi & 0xFF;
	buffer[offset + 3] = uint64.lo >>> 24;
	buffer[offset + 2] = uint64.lo >>> 16 & 0xFF;
	buffer[offset + 1] = uint64.lo >>> 8 & 0xFF;
	buffer[offset + 0] = uint64.lo & 0xFF;
}

module.exports.bufferEncode64 = function(buffer,offset,uint64) {
	buffer[offset] = uint64.hi >>> 24;
	buffer[offset + 1] = uint64.hi >>> 16 & 0xFF;
	buffer[offset + 2] = uint64.hi >>> 8 & 0xFF;
	buffer[offset + 3] = uint64.hi & 0xFF;
	buffer[offset + 4] = uint64.lo >>> 24;
	buffer[offset + 5] = uint64.lo >>> 16 & 0xFF;
	buffer[offset + 6] = uint64.lo >>> 8 & 0xFF;
	buffer[offset + 7] = uint64.lo & 0xFF;
}

module.exports.int32Buffer2Bytes = function(b) {
	var len = b.length;
	var bufferLength = len*4;
	var buffer = new Array(bufferLength);
	var i = 0;
	while (i<len) {
		buffer[i*4] = (b[i] & 0xFF000000) >>> 24;
		buffer[i*4 + 1] = (b[i] & 0x00FF0000) >>> 16;
		buffer[i*4 + 2] = (b[i] & 0x0000FF00) >>> 8;
		buffer[i*4 + 3] = (b[i] & 0x000000FF);
		i++;
	}
	return buffer;
}


module.exports.string2Int32Buffer = function (s) {
	return this.bytes2Int32Buffer(this.string2bytes(s));
}

},{"./op.js":11}],8:[function(require,module,exports){
/////////////////////////////////////
///////////////  Jh /////////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var helper = require('./helper');

var Jh_BlockSize = 64;
var Jh_StateSize = 32;

var JH_HX = 8;
var JH_HY = 4;

var IV512 = [
  (0x6fd14b96), (0x3e00aa17), (0x636a2e05), (0x7a15d543),
  (0x8a225e8d), (0x0c97ef0b), (0xe9341259), (0xf2b3c361),
  (0x891da0c1), (0x536f801e), (0x2aa9056b), (0xea2b6d80),
  (0x588eccdb), (0x2075baa6), (0xa90f3a76), (0xbaf83bf7),
  (0x0169e605), (0x41e34a69), (0x46b58a8e), (0x2e6fe65a),
  (0x1047a7d0), (0xc1843c24), (0x3b6e71b1), (0x2d5ac199),
  (0xcf57f6ec), (0x9db1f856), (0xa706887c), (0x5716b156),
  (0xe3c2fcdf), (0xe68517fb), (0x545a4678), (0xcc8cdd4b)
];

var C = [
  (0x72d5dea2), (0xdf15f867), (0x7b84150a),
  (0xb7231557), (0x81abd690), (0x4d5a87f6),
  (0x4e9f4fc5), (0xc3d12b40), (0xea983ae0),
  (0x5c45fa9c), (0x03c5d299), (0x66b2999a),
  (0x660296b4), (0xf2bb538a), (0xb556141a),
  (0x88dba231), (0x03a35a5c), (0x9a190edb),
  (0x403fb20a), (0x87c14410), (0x1c051980),
  (0x849e951d), (0x6f33ebad), (0x5ee7cddc),
  (0x10ba1392), (0x02bf6b41), (0xdc786515),
  (0xf7bb27d0), (0x0a2c8139), (0x37aa7850),
  (0x3f1abfd2), (0x410091d3), (0x422d5a0d),
  (0xf6cc7e90), (0xdd629f9c), (0x92c097ce),
  (0x185ca70b), (0xc72b44ac), (0xd1df65d6),
  (0x63c6fc23), (0x976e6c03), (0x9ee0b81a),
  (0x2105457e), (0x446ceca8), (0xeef103bb),
  (0x5d8e61fa), (0xfd9697b2), (0x94838197),
  (0x4a8e8537), (0xdb03302f), (0x2a678d2d),
  (0xfb9f6a95), (0x8afe7381), (0xf8b8696c),
  (0x8ac77246), (0xc07f4214), (0xc5f4158f),
  (0xbdc75ec4), (0x75446fa7), (0x8f11bb80),
  (0x52de75b7), (0xaee488bc), (0x82b8001e),
  (0x98a6a3f4), (0x8ef48f33), (0xa9a36315),
  (0xaa5f5624), (0xd5b7f989), (0xb6f1ed20),
  (0x7c5ae0fd), (0x36cae95a), (0x06422c36),
  (0xce293543), (0x4efe983d), (0x533af974),
  (0x739a4ba7), (0xd0f51f59), (0x6f4e8186),
  (0x0e9dad81), (0xafd85a9f), (0xa7050667),
  (0xee34626a), (0x8b0b28be), (0x6eb91727),
  (0x47740726), (0xc680103f), (0xe0a07e6f),
  (0xc67e487b), (0x0d550aa5), (0x4af8a4c0),
  (0x91e3e79f), (0x978ef19e), (0x86767281),
  (0x50608dd4), (0x7e9e5a41), (0xf3e5b062),
  (0xfc9f1fec), (0x4054207a), (0xe3e41a00),
  (0xcef4c984), (0x4fd794f5), (0x9dfa95d8),
  (0x552e7e11), (0x24c354a5), (0x5bdf7228),
  (0xbdfe6e28), (0x78f57fe2), (0x0fa5c4b2),
  (0x05897cef), (0xee49d32e), (0x447e9385),
  (0xeb28597f), (0x705f6937), (0xb324314a),
  (0x5e8628f1), (0x1dd6e465), (0xc71b7704),
  (0x51b920e7), (0x74fe43e8), (0x23d4878a),
  (0x7d29e8a3), (0x927694f2), (0xddcb7a09),
  (0x9b30d9c1), (0x1d1b30fb), (0x5bdc1be0),
  (0xda24494f), (0xf29c82bf), (0xa4e7ba31),
  (0xb470bfff), (0x0d324405), (0xdef8bc48),
  (0x3baefc32), (0x53bbd339), (0x459fc3c1),
  (0xe0298ba0), (0xe5c905fd), (0xf7ae090f),
  (0x94703412), (0x4290f134), (0xa271b701),
  (0xe344ed95), (0xe93b8e36), (0x4f2f984a),
  (0x88401d63), (0xa06cf615), (0x47c1444b),
  (0x8752afff), (0x7ebb4af1), (0xe20ac630),
  (0x4670b6c5), (0xcc6e8ce6), (0xa4d5a456),
  (0xbd4fca00), (0xda9d844b), (0xc83e18ae),
  (0x7357ce45), (0x3064d1ad), (0xe8a6ce68),
  (0x145c2567), (0xa3da8cf2), (0xcb0ee116),
  (0x33e90658), (0x9a94999a), (0x1f60b220),
  (0xc26f847b), (0xd1ceac7f), (0xa0d18518),
  (0x32595ba1), (0x8ddd19d3), (0x509a1cc0),
  (0xaaa5b446), (0x9f3d6367), (0xe4046bba),
  (0xf6ca19ab), (0x0b56ee7e), (0x1fb179ea),
  (0xa9282174), (0xe9bdf735), (0x3b3651ee),
  (0x1d57ac5a), (0x7550d376), (0x3a46c2fe),
  (0xa37d7001), (0xf735c1af), (0x98a4d842),
  (0x78edec20), (0x9e6b6779), (0x41836315),
  (0xea3adba8), (0xfac33b4d), (0x32832c83),
  (0xa7403b1f), (0x1c2747f3), (0x5940f034),
  (0xb72d769a), (0xe73e4e6c), (0xd2214ffd),
  (0xb8fd8d39), (0xdc5759ef), (0x8d9b0c49),
  (0x2b49ebda), (0x5ba2d749), (0x68f3700d),
  (0x7d3baed0), (0x7a8d5584), (0xf5a5e9f0),
  (0xe4f88e65), (0xa0b8a2f4), (0x36103b53),
  (0x0ca8079e), (0x753eec5a), (0x91689492),
  (0x56e8884f), (0x5bb05c55), (0xf8babc4c),
  (0xe3bb3b99), (0xf387947b), (0x75daf4d6),
  (0x726b1c5d), (0x64aeac28), (0xdc34b36d),
  (0x6c34a550), (0xb828db71), (0xf861e2f2),
  (0x108d512a), (0xe3db6433), (0x59dd75fc),
  (0x1cacbcf1), (0x43ce3fa2), (0x67bbd13c),
  (0x02e843b0), (0x330a5bca), (0x8829a175),
  (0x7f34194d), (0xb416535c), (0x923b94c3),
  (0x0e794d1e), (0x797475d7), (0xb6eeaf3f),
  (0xeaa8d4f7), (0xbe1a3921), (0x5cf47e09),
  (0x4c232751), (0x26a32453), (0xba323cd2),
  (0x44a3174a), (0x6da6d5ad), (0xb51d3ea6),
  (0xaff2c908), (0x83593d98), (0x916b3c56),
  (0x4cf87ca1), (0x7286604d), (0x46e23ecc),
  (0x086ec7f6), (0x2f9833b3), (0xb1bc765e),
  (0x2bd666a5), (0xefc4e62a), (0x06f4b6e8),
  (0xbec1d436), (0x74ee8215), (0xbcef2163),
  (0xfdc14e0d), (0xf453c969), (0xa77d5ac4),
  (0x06585826), (0x7ec11416), (0x06e0fa16),
  (0x7e90af3d), (0x28639d3f), (0xd2c9f2e3),
  (0x009bd20c), (0x5faace30), (0xb7d40c30),
  (0x742a5116), (0xf2e03298), (0x0deb30d8),
  (0xe3cef89a), (0x4bc59e7b), (0xb5f17992),
  (0xff51e66e), (0x048668d3), (0x9b234d57),
  (0xe6966731), (0xcce6a6f3), (0x170a7505),
  (0xb17681d9), (0x13326cce), (0x3c175284),
  (0xf805a262), (0xf42bcbb3), (0x78471547),
  (0xff465482), (0x23936a48), (0x38df5807),
  (0x4e5e6565), (0xf2fc7c89), (0xfc86508e),
  (0x31702e44), (0xd00bca86), (0xf04009a2),
  (0x3078474e), (0x65a0ee39), (0xd1f73883),
  (0xf75ee937), (0xe42c3abd), (0x2197b226),
  (0x0113f86f), (0xa344edd1), (0xef9fdee7),
  (0x8ba0df15), (0x762592d9), (0x3c85f7f6),
  (0x12dc42be), (0xd8a7ec7c), (0xab27b07e),
  (0x538d7dda), (0xaa3ea8de), (0xaa25ce93),
  (0xbd0269d8), (0x5af643fd), (0x1a7308f9),
  (0xc05fefda), (0x174a19a5), (0x974d6633),
  (0x4cfd216a), (0x35b49831), (0xdb411570),
  (0xea1e0fbb), (0xedcd549b), (0x9ad063a1),
  (0x51974072), (0xf6759dbf), (0x91476fe2)
];

var Sb = function(x, c) {
  x[3] = ~x[3];
  x[0] ^= (c) & ~x[2];
  var tmp = (c) ^ (x[0] & x[1]);
  x[0] ^= x[2] & x[3];
  x[3] ^= ~x[1] & x[2];
  x[1] ^= x[0] & x[2];
  x[2] ^= x[0] & ~x[3];
  x[0] ^= x[1] | x[3];
  x[3] ^= x[1] & x[2];
  x[1] ^= tmp & x[0];
  x[2] ^= tmp;
  return x;
}

var Lb = function(x) {
  x[4] ^= x[1];
  x[5] ^= x[2];
  x[6] ^= x[3] ^ x[0];
  x[7] ^= x[0];
  x[0] ^= x[5];
  x[1] ^= x[6];
  x[2] ^= x[7] ^ x[4];
  x[3] ^= x[4];
  return x;
}

var Ceven = function(n, r) {
  return op.swap32(C[((r) << 3) + 3 - n]);
}

var Codd = function(n, r) {
  return op.swap32(C[((r) << 3) + 7 - n]);
}

var S = function(x0, x1, x2, x3, cb, r) {
  var x = Sb([x0[3], x1[3], x2[3], x3[3]], cb(3, r));
  x0[3] = x[0];
  x1[3] = x[1];
  x2[3] = x[2];
  x3[3] = x[3];
  x = Sb([x0[2], x1[2], x2[2], x3[2]], cb(2, r));
  x0[2] = x[0];
  x1[2] = x[1];
  x2[2] = x[2];
  x3[2] = x[3];
  x = Sb([x0[1], x1[1], x2[1], x3[1]], cb(1, r));
  x0[1] = x[0];
  x1[1] = x[1];
  x2[1] = x[2];
  x3[1] = x[3];
  x = Sb([x0[0], x1[0], x2[0], x3[0]], cb(0, r));
  x0[0] = x[0];
  x1[0] = x[1];
  x2[0] = x[2];
  x3[0] = x[3];
}

var L = function(x0, x1, x2, x3, x4, x5, x6, x7) {
  var x = Lb([x0[3], x1[3], x2[3], x3[3], x4[3], x5[3], x6[3], x7[3]]);
  x0[3] = x[0];
  x1[3] = x[1];
  x2[3] = x[2];
  x3[3] = x[3];
  x4[3] = x[4];
  x5[3] = x[5];
  x6[3] = x[6];
  x7[3] = x[7];
  x = Lb([x0[2], x1[2], x2[2], x3[2], x4[2], x5[2], x6[2], x7[2]]);
  x0[2] = x[0];
  x1[2] = x[1];
  x2[2] = x[2];
  x3[2] = x[3];
  x4[2] = x[4];
  x5[2] = x[5];
  x6[2] = x[6];
  x7[2] = x[7];
  x = Lb([x0[1], x1[1], x2[1], x3[1], x4[1], x5[1], x6[1], x7[1]]);
  x0[1] = x[0];
  x1[1] = x[1];
  x2[1] = x[2];
  x3[1] = x[3];
  x4[1] = x[4];
  x5[1] = x[5];
  x6[1] = x[6];
  x7[1] = x[7];
  x = Lb([x0[0], x1[0], x2[0], x3[0], x4[0], x5[0], x6[0], x7[0]]);
  x0[0] = x[0];
  x1[0] = x[1];
  x2[0] = x[2];
  x3[0] = x[3];
  x4[0] = x[4];
  x5[0] = x[5];
  x6[0] = x[6];
  x7[0] = x[7];
}

var Wz = function(x, c, n) {
  var t = (x[3] & (c)) << (n);
  x[3] = ((x[3] >> (n)) & (c)) | t;
  t = (x[2] & (c)) << (n);
  x[2] = ((x[2] >> (n)) & (c)) | t;
  t = (x[1] & (c)) << (n);
  x[1] = ((x[1] >> (n)) & (c)) | t;
  t = (x[0] & (c)) << (n);
  x[0] = ((x[0] >> (n)) & (c)) | t;
}

var W = function(ro, x) {
  switch (ro) {
    case 0:
      return Wz(x, (0x55555555), 1);
    case 1:
      return Wz(x, (0x33333333), 2);
    case 2:
      return Wz(x, (0x0F0F0F0F), 4);
    case 3:
      return Wz(x, (0x00FF00FF), 8);
    case 4:
      return Wz(x, (0x0000FFFF), 16);
    case 5:
      {
        var t = x[3];
        x[3] = x[2];
        x[2] = t;
        t = x[1];
        x[1] = x[0];
        x[0] = t;
        return;
      }
    case 6:
      {
        var t = x[3];
        x[3] = x[1];
        x[1] = t;
        t = x[2];
        x[2] = x[0];
        x[0] = t;
        return;
      }
  }
}

var SL = function(h, r, ro) {
  S(h[0], h[2], h[4], h[6], Ceven, r);
  S(h[1], h[3], h[5], h[7], Codd, r);
  L(h[0], h[2], h[4], h[6], h[1], h[3], h[5], h[7]);
  W(ro, h[1]);
  W(ro, h[3]);
  W(ro, h[5]);
  W(ro, h[7]);
}

var READ_STATE = function(h, state) {
  h[0][3] = state[0];
  h[0][2] = state[1];
  h[0][1] = state[2];
  h[0][0] = state[3];
  h[1][3] = state[4];
  h[1][2] = state[5];
  h[1][1] = state[6];
  h[1][0] = state[7];
  h[2][3] = state[8];
  h[2][2] = state[9];
  h[2][1] = state[10];
  h[2][0] = state[11];
  h[3][3] = state[12];
  h[3][2] = state[13];
  h[3][1] = state[14];
  h[3][0] = state[15];
  h[4][3] = state[16];
  h[4][2] = state[17];
  h[4][1] = state[18];
  h[4][0] = state[19];
  h[5][3] = state[20];
  h[5][2] = state[21];
  h[5][1] = state[22];
  h[5][0] = state[23];
  h[6][3] = state[24];
  h[6][2] = state[25];
  h[6][1] = state[26];
  h[6][0] = state[27];
  h[7][3] = state[28];
  h[7][2] = state[29];
  h[7][1] = state[30];
  h[7][0] = state[31];
}

var WRITE_STATE = function(h, state) {
  state[0] = h[0][3];
  state[1] = h[0][2];
  state[2] = h[0][1];
  state[3] = h[0][0];
  state[4] = h[1][3];
  state[5] = h[1][2];
  state[6] = h[1][1];
  state[7] = h[1][0];
  state[8] = h[2][3];
  state[9] = h[2][2];
  state[10] = h[2][1];
  state[11] = h[2][0];
  state[12] = h[3][3];
  state[13] = h[3][2];
  state[14] = h[3][1];
  state[15] = h[3][0];
  state[16] = h[4][3];
  state[17] = h[4][2];
  state[18] = h[4][1];
  state[19] = h[4][0];
  state[20] = h[5][3];
  state[21] = h[5][2];
  state[22] = h[5][1];
  state[23] = h[5][0];
  state[24] = h[6][3];
  state[25] = h[6][2];
  state[26] = h[6][1];
  state[27] = h[6][0];
  state[28] = h[7][3];
  state[29] = h[7][2];
  state[30] = h[7][1];
  state[31] = h[7][0];
}

var E8 = function(h) {
  for (var r = 0; r < 42; r += 7) {
    SL(h, r + 0, 0);
    SL(h, r + 1, 1);
    SL(h, r + 2, 2);
    SL(h, r + 3, 3);
    SL(h, r + 4, 4);
    SL(h, r + 5, 5);
    SL(h, r + 6, 6);
  }
}

var bufferXORInsertBackwards = function(buffer, data, x, y, bufferOffsetX, bufferOffsetY) {
  if (!bufferOffsetX) bufferOffsetX = 0;
  if (!bufferOffsetY) bufferOffsetY = 0;
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < x; j++) {
      var m = i + bufferOffsetX;
      var n = bufferOffsetY + y - 1 - j;
      var xOr = buffer[m][n] ^ data[i * 4 + j];
      buffer[m][n] = xOr;
    }
  }
}

var jh = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (!len) len = data.length;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  var V = new Array(JH_HX);
  for (var i = 0; i < JH_HX; i++) {
    V[i] = new Array(JH_HY);
  }
  READ_STATE(V, ctx.state);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int32Buf = op.swap32Array(helper.bytes2Int32Buffer(buf));

      bufferXORInsertBackwards(V, int32Buf, 4, 4);
      E8(V);
      bufferXORInsertBackwards(V, int32Buf, 4, 4, 4, 0);
      if ((ctx.blockCountLow = op.t32(ctx.blockCountLow + 1)) == 0)
        ctx.blockCountHigh++;
      ptr = 0;
    }
  }
  WRITE_STATE(V, ctx.state);
  ctx.ptr = ptr;
}

var jhClose = function(ctx) {
  var z;
  var buf = new Array(128);
  var numz, u;
  var l = new Array(4);
  buf[0] = 0x80;
  if (ctx.ptr == 0) {
    numz = 47;
  }
  else {
    numz = 111 - ctx.ptr;
  }
  op.bufferSet(buf, 1, 0, numz);
  l[0] = op.t32(ctx.blockCountLow << 9) + (ctx.ptr << 3);
  l[1] = op.t32(ctx.blockCountLow >> 23) + op.t32(ctx.blockCountHigh << 9);
  l[2] = op.t32(ctx.blockCountHigh >> 23);
  l[3] = 0;
  var lBytes = helper.int32Buffer2Bytes(op.swap32Array(l));
  op.bufferInsertBackwards(buf, 1 + numz, lBytes, 16);
  jh(ctx, buf, numz + 17);
  var out = new Array(16);
  for (u = 0; u < 16; u++)
    out[u] = op.swap32(ctx.state[u + 16]);
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = helper.int32Buffer2Bytes(input);
  }
  else {
    msg = helper.string2bytes(input);
  }
  var ctx = {};
  ctx.state = op.swap32Array(IV512);
  ctx.ptr = 0;
  ctx.buffer = new Array(Jh_BlockSize);
  ctx.blockCountHigh = 0;
  ctx.blockCountLow = 0;
  jh(ctx, msg);
  var r = jhClose(ctx);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = helper.int32Buffer2Bytes(r)
  }
  else {
    out = helper.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],9:[function(require,module,exports){
// Copyright 2015-2016 Chen, Yi-Cyuan

// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:

// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var HEX_CHARS = '0123456789abcdef'.split('');
var KECCAK_PADDING = [1, 256, 65536, 16777216];
var SHIFT = [0, 8, 16, 24];
var RC = [1, 0, 32898, 0, 32906, 2147483648, 2147516416, 2147483648, 32907, 0, 2147483649,
  0, 2147516545, 2147483648, 32777, 2147483648, 138, 0, 136, 0, 2147516425, 0,
  2147483658, 0, 2147516555, 0, 139, 2147483648, 32905, 2147483648, 32771,
  2147483648, 32770, 2147483648, 128, 2147483648, 32778, 0, 2147483658, 2147483648,
  2147516545, 2147483648, 32896, 2147483648, 2147483649, 0, 2147516424, 2147483648
];
var BITS = [512];
var OUTPUT_TYPES = ['hex', 'buffer', 'array'];

var h = require('./helper');

var createOutputMethod = function(bits, padding, outputType) {
  return function(message) {
    return new Keccak(bits, padding, bits).update(message)[outputType]();
  }
};

var createShakeOutputMethod = function(bits, padding, outputType) {
  return function(message, outputBits) {
    return new Keccak(bits, padding, outputBits).update(message)[outputType]();
  }
};

var createMethod = function(bits, padding) {
  var method = createOutputMethod(bits, padding, 'array');
  method.create = function() {
    return new Keccak(bits, padding, bits);
  };
  method.update = function(message) {
    return method.create().update(message);
  };
  for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
    var type = OUTPUT_TYPES[i];
    method[type] = createOutputMethod(bits, padding, type);
  }
  return method;
};

var algorithms = [{
  name: 'keccak',
  padding: KECCAK_PADDING,
  bits: BITS,
  createMethod: createMethod
}];

var methods = {};

for (var i = 0; i < algorithms.length; ++i) {
  var algorithm = algorithms[i];
  var bits = algorithm.bits;
  var createMethod = algorithm.createMethod;
  for (var j = 0; j < bits.length; ++j) {
    var method = algorithm.createMethod(bits[j], algorithm.padding);
    methods[algorithm.name + '_' + bits[j]] = method;
  }
}

function Keccak(bits, padding, outputBits) {
  this.blocks = [];
  this.s = [];
  this.padding = padding;
  this.outputBits = outputBits;
  this.reset = true;
  this.block = 0;
  this.start = 0;
  this.blockCount = (1600 - (bits << 1)) >> 5;
  this.byteCount = this.blockCount << 2;
  this.outputBlocks = outputBits >> 5;
  this.extraBytes = (outputBits & 31) >> 3;

  for (var i = 0; i < 50; ++i) {
    this.s[i] = 0;
  }
};

Keccak.prototype.update = function(message) {
  var notString = typeof(message) != 'string';
  if (notString && message.constructor == root.ArrayBuffer) {
    message = h.string2bytes(message);
  }
  var length = message.length,
    blocks = this.blocks,
    byteCount = this.byteCount,
    blockCount = this.blockCount,
    index = 0,
    s = this.s,
    i, code;

  while (index < length) {
    if (this.reset) {
      this.reset = false;
      blocks[0] = this.block;
      for (i = 1; i < blockCount + 1; ++i) {
        blocks[i] = 0;
      }
    }
    if (notString) {
      for (i = this.start; index < length && i < byteCount; ++index) {
        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
      }
    }
    else {
      for (i = this.start; index < length && i < byteCount; ++index) {
        code = message.charCodeAt(index);
        if (code < 0x80) {
          blocks[i >> 2] |= code << SHIFT[i++ & 3];
        }
        else if (code < 0x800) {
          blocks[i >> 2] |= (0xc0 | (code >> 6)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
        }
        else if (code < 0xd800 || code >= 0xe000) {
          blocks[i >> 2] |= (0xe0 | (code >> 12)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
        }
        else {
          code = 0x10000 + (((code & 0x3ff) << 10) | (message.charCodeAt(++index) & 0x3ff));
          blocks[i >> 2] |= (0xf0 | (code >> 18)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | ((code >> 12) & 0x3f)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | ((code >> 6) & 0x3f)) << SHIFT[i++ & 3];
          blocks[i >> 2] |= (0x80 | (code & 0x3f)) << SHIFT[i++ & 3];
        }
      }
    }
    this.lastByteIndex = i;
    if (i >= byteCount) {
      this.start = i - byteCount;
      this.block = blocks[blockCount];
      for (i = 0; i < blockCount; ++i) {
        s[i] ^= blocks[i];
      }
      f(s);
      this.reset = true;
    }
    else {
      this.start = i;
    }
  }
  return this;
};

Keccak.prototype.finalize = function() {
  var blocks = this.blocks,
    i = this.lastByteIndex,
    blockCount = this.blockCount,
    s = this.s;
  blocks[i >> 2] |= this.padding[i & 3];
  if (this.lastByteIndex == this.byteCount) {
    blocks[0] = blocks[blockCount];
    for (i = 1; i < blockCount + 1; ++i) {
      blocks[i] = 0;
    }
  }
  blocks[blockCount - 1] |= 0x80000000;
  for (i = 0; i < blockCount; ++i) {
    s[i] ^= blocks[i];
  }
  f(s);
};

Keccak.prototype.toString = Keccak.prototype.hex = function() {
  this.finalize();

  var blockCount = this.blockCount,
    s = this.s,
    outputBlocks = this.outputBlocks,
    extraBytes = this.extraBytes,
    i = 0,
    j = 0;
  var hex = '',
    block;
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      block = s[i];
      hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F] +
        HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F] +
        HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F] +
        HEX_CHARS[(block >> 28) & 0x0F] + HEX_CHARS[(block >> 24) & 0x0F];
    }
    if (j % blockCount == 0) {
      f(s);
      i = 0;
    }
  }
  if (extraBytes) {
    block = s[i];
    if (extraBytes > 0) {
      hex += HEX_CHARS[(block >> 4) & 0x0F] + HEX_CHARS[block & 0x0F];
    }
    if (extraBytes > 1) {
      hex += HEX_CHARS[(block >> 12) & 0x0F] + HEX_CHARS[(block >> 8) & 0x0F];
    }
    if (extraBytes > 2) {
      hex += HEX_CHARS[(block >> 20) & 0x0F] + HEX_CHARS[(block >> 16) & 0x0F];
    }
  }
  return hex;
};

Keccak.prototype.buffer = function() {
  this.finalize();

  var blockCount = this.blockCount,
    s = this.s,
    outputBlocks = this.outputBlocks,
    extraBytes = this.extraBytes,
    i = 0,
    j = 0;
  var bytes = this.outputBits >> 3;
  var buffer;
  if (extraBytes) {
    buffer = new ArrayBuffer((outputBlocks + 1) << 2);
  }
  else {
    buffer = new ArrayBuffer(bytes);
  }
  var array = new Uint32Array(buffer);
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      array[j] = s[i];
    }
    if (j % blockCount == 0) {
      f(s);
    }
  }
  if (extraBytes) {
    array[i] = s[i];
    buffer = buffer.slice(0, bytes);
  }
  return buffer;
};

Keccak.prototype.digest = Keccak.prototype.array = function() {
  this.finalize();

  var blockCount = this.blockCount,
    s = this.s,
    outputBlocks = this.outputBlocks,
    extraBytes = this.extraBytes,
    i = 0,
    j = 0;
  var array = [],
    offset, block;
  while (j < outputBlocks) {
    for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
      offset = j << 2;
      block = s[i];
      array[offset] = block & 0xFF;
      array[offset + 1] = (block >> 8) & 0xFF;
      array[offset + 2] = (block >> 16) & 0xFF;
      array[offset + 3] = (block >> 24) & 0xFF;
    }
    if (j % blockCount == 0) {
      f(s);
    }
  }
  if (extraBytes) {
    offset = j << 2;
    block = s[i];
    if (extraBytes > 0) {
      array[offset] = block & 0xFF;
    }
    if (extraBytes > 1) {
      array[offset + 1] = (block >> 8) & 0xFF;
    }
    if (extraBytes > 2) {
      array[offset + 2] = (block >> 16) & 0xFF;
    }
  }
  return array;
};

var f = function(s) {
  var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9,
    b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17,
    b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33,
    b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
  for (n = 0; n < 48; n += 2) {
    c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
    c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
    c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
    c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
    c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
    c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
    c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
    c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
    c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
    c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];

    h = c8 ^ ((c2 << 1) | (c3 >>> 31));
    l = c9 ^ ((c3 << 1) | (c2 >>> 31));
    s[0] ^= h;
    s[1] ^= l;
    s[10] ^= h;
    s[11] ^= l;
    s[20] ^= h;
    s[21] ^= l;
    s[30] ^= h;
    s[31] ^= l;
    s[40] ^= h;
    s[41] ^= l;
    h = c0 ^ ((c4 << 1) | (c5 >>> 31));
    l = c1 ^ ((c5 << 1) | (c4 >>> 31));
    s[2] ^= h;
    s[3] ^= l;
    s[12] ^= h;
    s[13] ^= l;
    s[22] ^= h;
    s[23] ^= l;
    s[32] ^= h;
    s[33] ^= l;
    s[42] ^= h;
    s[43] ^= l;
    h = c2 ^ ((c6 << 1) | (c7 >>> 31));
    l = c3 ^ ((c7 << 1) | (c6 >>> 31));
    s[4] ^= h;
    s[5] ^= l;
    s[14] ^= h;
    s[15] ^= l;
    s[24] ^= h;
    s[25] ^= l;
    s[34] ^= h;
    s[35] ^= l;
    s[44] ^= h;
    s[45] ^= l;
    h = c4 ^ ((c8 << 1) | (c9 >>> 31));
    l = c5 ^ ((c9 << 1) | (c8 >>> 31));
    s[6] ^= h;
    s[7] ^= l;
    s[16] ^= h;
    s[17] ^= l;
    s[26] ^= h;
    s[27] ^= l;
    s[36] ^= h;
    s[37] ^= l;
    s[46] ^= h;
    s[47] ^= l;
    h = c6 ^ ((c0 << 1) | (c1 >>> 31));
    l = c7 ^ ((c1 << 1) | (c0 >>> 31));
    s[8] ^= h;
    s[9] ^= l;
    s[18] ^= h;
    s[19] ^= l;
    s[28] ^= h;
    s[29] ^= l;
    s[38] ^= h;
    s[39] ^= l;
    s[48] ^= h;
    s[49] ^= l;

    b0 = s[0];
    b1 = s[1];
    b32 = (s[11] << 4) | (s[10] >>> 28);
    b33 = (s[10] << 4) | (s[11] >>> 28);
    b14 = (s[20] << 3) | (s[21] >>> 29);
    b15 = (s[21] << 3) | (s[20] >>> 29);
    b46 = (s[31] << 9) | (s[30] >>> 23);
    b47 = (s[30] << 9) | (s[31] >>> 23);
    b28 = (s[40] << 18) | (s[41] >>> 14);
    b29 = (s[41] << 18) | (s[40] >>> 14);
    b20 = (s[2] << 1) | (s[3] >>> 31);
    b21 = (s[3] << 1) | (s[2] >>> 31);
    b2 = (s[13] << 12) | (s[12] >>> 20);
    b3 = (s[12] << 12) | (s[13] >>> 20);
    b34 = (s[22] << 10) | (s[23] >>> 22);
    b35 = (s[23] << 10) | (s[22] >>> 22);
    b16 = (s[33] << 13) | (s[32] >>> 19);
    b17 = (s[32] << 13) | (s[33] >>> 19);
    b48 = (s[42] << 2) | (s[43] >>> 30);
    b49 = (s[43] << 2) | (s[42] >>> 30);
    b40 = (s[5] << 30) | (s[4] >>> 2);
    b41 = (s[4] << 30) | (s[5] >>> 2);
    b22 = (s[14] << 6) | (s[15] >>> 26);
    b23 = (s[15] << 6) | (s[14] >>> 26);
    b4 = (s[25] << 11) | (s[24] >>> 21);
    b5 = (s[24] << 11) | (s[25] >>> 21);
    b36 = (s[34] << 15) | (s[35] >>> 17);
    b37 = (s[35] << 15) | (s[34] >>> 17);
    b18 = (s[45] << 29) | (s[44] >>> 3);
    b19 = (s[44] << 29) | (s[45] >>> 3);
    b10 = (s[6] << 28) | (s[7] >>> 4);
    b11 = (s[7] << 28) | (s[6] >>> 4);
    b42 = (s[17] << 23) | (s[16] >>> 9);
    b43 = (s[16] << 23) | (s[17] >>> 9);
    b24 = (s[26] << 25) | (s[27] >>> 7);
    b25 = (s[27] << 25) | (s[26] >>> 7);
    b6 = (s[36] << 21) | (s[37] >>> 11);
    b7 = (s[37] << 21) | (s[36] >>> 11);
    b38 = (s[47] << 24) | (s[46] >>> 8);
    b39 = (s[46] << 24) | (s[47] >>> 8);
    b30 = (s[8] << 27) | (s[9] >>> 5);
    b31 = (s[9] << 27) | (s[8] >>> 5);
    b12 = (s[18] << 20) | (s[19] >>> 12);
    b13 = (s[19] << 20) | (s[18] >>> 12);
    b44 = (s[29] << 7) | (s[28] >>> 25);
    b45 = (s[28] << 7) | (s[29] >>> 25);
    b26 = (s[38] << 8) | (s[39] >>> 24);
    b27 = (s[39] << 8) | (s[38] >>> 24);
    b8 = (s[48] << 14) | (s[49] >>> 18);
    b9 = (s[49] << 14) | (s[48] >>> 18);

    s[0] = b0 ^ (~b2 & b4);
    s[1] = b1 ^ (~b3 & b5);
    s[10] = b10 ^ (~b12 & b14);
    s[11] = b11 ^ (~b13 & b15);
    s[20] = b20 ^ (~b22 & b24);
    s[21] = b21 ^ (~b23 & b25);
    s[30] = b30 ^ (~b32 & b34);
    s[31] = b31 ^ (~b33 & b35);
    s[40] = b40 ^ (~b42 & b44);
    s[41] = b41 ^ (~b43 & b45);
    s[2] = b2 ^ (~b4 & b6);
    s[3] = b3 ^ (~b5 & b7);
    s[12] = b12 ^ (~b14 & b16);
    s[13] = b13 ^ (~b15 & b17);
    s[22] = b22 ^ (~b24 & b26);
    s[23] = b23 ^ (~b25 & b27);
    s[32] = b32 ^ (~b34 & b36);
    s[33] = b33 ^ (~b35 & b37);
    s[42] = b42 ^ (~b44 & b46);
    s[43] = b43 ^ (~b45 & b47);
    s[4] = b4 ^ (~b6 & b8);
    s[5] = b5 ^ (~b7 & b9);
    s[14] = b14 ^ (~b16 & b18);
    s[15] = b15 ^ (~b17 & b19);
    s[24] = b24 ^ (~b26 & b28);
    s[25] = b25 ^ (~b27 & b29);
    s[34] = b34 ^ (~b36 & b38);
    s[35] = b35 ^ (~b37 & b39);
    s[44] = b44 ^ (~b46 & b48);
    s[45] = b45 ^ (~b47 & b49);
    s[6] = b6 ^ (~b8 & b0);
    s[7] = b7 ^ (~b9 & b1);
    s[16] = b16 ^ (~b18 & b10);
    s[17] = b17 ^ (~b19 & b11);
    s[26] = b26 ^ (~b28 & b20);
    s[27] = b27 ^ (~b29 & b21);
    s[36] = b36 ^ (~b38 & b30);
    s[37] = b37 ^ (~b39 & b31);
    s[46] = b46 ^ (~b48 & b40);
    s[47] = b47 ^ (~b49 & b41);
    s[8] = b8 ^ (~b0 & b2);
    s[9] = b9 ^ (~b1 & b3);
    s[18] = b18 ^ (~b10 & b12);
    s[19] = b19 ^ (~b11 & b13);
    s[28] = b28 ^ (~b20 & b22);
    s[29] = b29 ^ (~b21 & b23);
    s[38] = b38 ^ (~b30 & b32);
    s[39] = b39 ^ (~b31 & b33);
    s[48] = b48 ^ (~b40 & b42);
    s[49] = b49 ^ (~b41 & b43);

    s[0] ^= RC[n];
    s[1] ^= RC[n + 1];
  }
}
module.exports = methods;
//   if (!root.JS_SHA3_TEST && NODE_JS) {
//     module.exports = methods;
//   } else if (root) {
//     for (var key in methods) {
//       root[key] = methods[key];
//     }
//   }

// module.exports = function(input, format, output) {
//   var msg = input;
//   if (format === 1) {
//     msg = input;
//   }
//   else if (format === 2) {
//     msg = h.int32Buffer2Bytes(input);
//   }
//   else {
//     msg = h.string2bytes(input);
//   }
//   var ctx = {};
//   if (output === 1) {
//     return h.bytes2Int32Buffer(new Keccak().update(msg).array());
//   }
//   else if (output === 2) {
//     return new Keccak().update(msg).array();
//   }
//   else {
//     return new Keccak().update(msg).hex();
//   }
// }
},{"./helper":7}],10:[function(require,module,exports){
/////////////////////////////////////
//////////////  Luffa ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var Luffa_BlockSize = 32;
var Luffa_VX = 5;
var Luffa_VY = 8;

var V_INIT = [
  [
    0x6d251e69, 0x44b051e0,
    0x4eaa6fb4, 0xdbf78465,
    0x6e292011, 0x90152df4,
    0xee058139, 0xdef610bb
  ],
  [
    0xc3b44b95, 0xd9d2f256,
    0x70eee9a0, 0xde099fa3,
    0x5d9b0557, 0x8fc944b3,
    0xcf1ccf0e, 0x746cd581
  ],
  [
    0xf7efc89d, 0x5dba5781,
    0x04016ce5, 0xad659c05,
    0x0306194f, 0x666d1836,
    0x24aa230a, 0x8b264ae7
  ],
  [
    0x858075d5, 0x36d79cce,
    0xe571f7d7, 0x204b1f67,
    0x35870c6a, 0x57e9e923,
    0x14bcb808, 0x7cde72ce
  ],
  [
    0x6c68e9be, 0x5ec41e22,
    0xc825b7c7, 0xaffb4363,
    0xf5df3999, 0x0fc688f1,
    0xb07224cc, 0x03e86cea
  ]
];

var RC00 = [
  0x303994a6, 0xc0e65299,
  0x6cc33a12, 0xdc56983e,
  0x1e00108f, 0x7800423d,
  0x8f5b7882, 0x96e1db12
];

var RC04 = [
  0xe0337818, 0x441ba90d,
  0x7f34d442, 0x9389217f,
  0xe5a8bce6, 0x5274baf4,
  0x26889ba7, 0x9a226e9d
];

var RC10 = [
  0xb6de10ed, 0x70f47aae,
  0x0707a3d4, 0x1c1e8f51,
  0x707a3d45, 0xaeb28562,
  0xbaca1589, 0x40a46f3e
];

var RC14 = [
  0x01685f3d, 0x05a17cf4,
  0xbd09caca, 0xf4272b28,
  0x144ae5cc, 0xfaa7ae2b,
  0x2e48f1c1, 0xb923c704
];

var RC20 = [
  0xfc20d9d2, 0x34552e25,
  0x7ad8818f, 0x8438764a,
  0xbb6de032, 0xedb780c8,
  0xd9847356, 0xa2c78434
];

var RC24 = [
  0xe25e72c1, 0xe623bb72,
  0x5c58a4a4, 0x1e38e2e7,
  0x78e38b9d, 0x27586719,
  0x36eda57f, 0x703aace7
];

var RC30 = [
  0xb213afa5, 0xc84ebe95,
  0x4e608a22, 0x56d858fe,
  0x343b138f, 0xd0ec4e3d,
  0x2ceb4882, 0xb3ad2208
];

var RC34 = [
  0xe028c9bf, 0x44756f91,
  0x7e8fce32, 0x956548be,
  0xfe191be2, 0x3cb226e5,
  0x5944a28e, 0xa1c4c355
];

var RC40 = [
  0xf0d2e9e3, 0xac11d7fa,
  0x1bcb66f2, 0x6f2d9bc9,
  0x78602649, 0x8edae952,
  0x3b6ba548, 0xedae9520
];

var RC44 = [
  0x5090d577, 0x2d1925ab,
  0xb46496ac, 0xd1925ab0,
  0x29131ab6, 0x0fc053c3,
  0x3f014f0c, 0xfc053c31
];

var M2 = function(d, s) {
  var tmp = s[7];
  d[7] = s[6];
  d[6] = s[5];
  d[5] = s[4];
  d[4] = s[3] ^ tmp;
  d[3] = s[2] ^ tmp;
  d[2] = s[1];
  d[1] = s[0] ^ tmp;
  d[0] = tmp;
}

//V is a table of states
var MI5 = function(buf, V) {
  var M = Array(8);
  var a = Array(8);
  var b = Array(8);
  M[0] = buf[0];
  M[1] = buf[1];
  M[2] = buf[2];
  M[3] = buf[3];
  M[4] = buf[4];
  M[5] = buf[5];
  M[6] = buf[6];
  M[7] = buf[7];
  op.xORTable(a, V[0], V[1], 8);
  op.xORTable(b, V[2], V[3], 8);
  op.xORTable(a, a, b, 8);
  op.xORTable(a, a, V[4], 8);
  M2(a, a);
  op.xORTable(V[0], a, V[0], 8);
  op.xORTable(V[1], a, V[1], 8);
  op.xORTable(V[2], a, V[2], 8);
  op.xORTable(V[3], a, V[3], 8);
  op.xORTable(V[4], a, V[4], 8);
  M2(b, V[0]);
  op.xORTable(b, b, V[1], 8);
  M2(V[1], V[1]);
  op.xORTable(V[1], V[1], V[2], 8);
  M2(V[2], V[2]);
  op.xORTable(V[2], V[2], V[3], 8);
  M2(V[3], V[3]);
  op.xORTable(V[3], V[3], V[4], 8);
  M2(V[4], V[4]);
  op.xORTable(V[4], V[4], V[0], 8);
  M2(V[0], b);
  op.xORTable(V[0], V[0], V[4], 8);
  M2(V[4], V[4]);
  op.xORTable(V[4], V[4], V[3], 8);
  M2(V[3], V[3]);
  op.xORTable(V[3], V[3], V[2], 8);
  M2(V[2], V[2]);
  op.xORTable(V[2], V[2], V[1], 8);
  M2(V[1], V[1]);
  op.xORTable(V[1], V[1], b, 8);
  op.xORTable(V[0], V[0], M, 8);
  M2(M, M);
  op.xORTable(V[1], V[1], M, 8);
  M2(M, M);
  op.xORTable(V[2], V[2], M, 8);
  M2(M, M);
  op.xORTable(V[3], V[3], M, 8);
  M2(M, M);
  op.xORTable(V[4], V[4], M, 8);
}

var TWEAK5 = function(V) {
  V[1][4] = op.rotl32(V[1][4], 1);
  V[1][5] = op.rotl32(V[1][5], 1);
  V[1][6] = op.rotl32(V[1][6], 1);
  V[1][7] = op.rotl32(V[1][7], 1);
  V[2][4] = op.rotl32(V[2][4], 2);
  V[2][5] = op.rotl32(V[2][5], 2);
  V[2][6] = op.rotl32(V[2][6], 2);
  V[2][7] = op.rotl32(V[2][7], 2);
  V[3][4] = op.rotl32(V[3][4], 3);
  V[3][5] = op.rotl32(V[3][5], 3);
  V[3][6] = op.rotl32(V[3][6], 3);
  V[3][7] = op.rotl32(V[3][7], 3);
  V[4][4] = op.rotl32(V[4][4], 4);
  V[4][5] = op.rotl32(V[4][5], 4);
  V[4][6] = op.rotl32(V[4][6], 4);
  V[4][7] = op.rotl32(V[4][7], 4);
}

var SUB_CRUMB = function(a0, a1, a2, a3) {
  var tmp;
  tmp = (a0);
  (a0) |= (a1);
  (a2) ^= (a3);
  (a1) = op.t32(~(a1));
  (a0) ^= (a3);
  (a3) &= tmp;
  (a1) ^= (a3);
  (a3) ^= (a2);
  (a2) &= (a0);
  (a0) = op.t32(~(a0));
  (a2) ^= (a1);
  (a1) |= (a3);
  tmp ^= (a1);
  (a3) ^= (a2);
  (a2) &= (a1);
  (a1) ^= (a0);
  (a0) = tmp;
  return [a0, a1, a2, a3];
}

var MIX_WORD = function(u, v) {
  (v) ^= (u);
  (u) = op.rotl32((u), 2) ^ (v);
  (v) = op.rotl32((v), 14) ^ (u);
  (u) = op.rotl32((u), 10) ^ (v);
  (v) = op.rotl32((v), 1);
  return [u,v];
}

var P5 = function(V) {
  TWEAK5(V);
  var tmp;
  for (var r = 0; r < 8; r++) {
    tmp = SUB_CRUMB(V[0][0], V[0][1], V[0][2], V[0][3]);
    V[0][0] = tmp[0];
    V[0][1] = tmp[1];
    V[0][2] = tmp[2];
    V[0][3] = tmp[3];
    tmp = SUB_CRUMB(V[0][5], V[0][6], V[0][7], V[0][4]);
    V[0][5] = tmp[0];
    V[0][6] = tmp[1];
    V[0][7] = tmp[2];
    V[0][4] = tmp[3];
    tmp = MIX_WORD(V[0][0], V[0][4]);
    V[0][0] = tmp[0];
    V[0][4] = tmp[1];
    tmp = MIX_WORD(V[0][1], V[0][5]);
    V[0][1] = tmp[0];
    V[0][5] = tmp[1];
    tmp = MIX_WORD(V[0][2], V[0][6]);
    V[0][2] = tmp[0];
    V[0][6] = tmp[1];
    tmp = MIX_WORD(V[0][3], V[0][7]);
    V[0][3] = tmp[0];
    V[0][7] = tmp[1];
    V[0][0] ^= RC00[r];
    V[0][4] ^= RC04[r];
  }
  for (var r = 0; r < 8; r++) {
    tmp = SUB_CRUMB(V[1][0], V[1][1], V[1][2], V[1][3]);
    V[1][0] = tmp[0];
    V[1][1] = tmp[1];
    V[1][2] = tmp[2];
    V[1][3] = tmp[3];
    tmp = SUB_CRUMB(V[1][5], V[1][6], V[1][7], V[1][4]);
    V[1][5] = tmp[0];
    V[1][6] = tmp[1];
    V[1][7] = tmp[2];
    V[1][4] = tmp[3];
    tmp = MIX_WORD(V[1][0], V[1][4]);
    V[1][0] = tmp[0];
    V[1][4] = tmp[1];
    tmp = MIX_WORD(V[1][1], V[1][5]);
    V[1][1] = tmp[0];
    V[1][5] = tmp[1];
    tmp = MIX_WORD(V[1][2], V[1][6]);
    V[1][2] = tmp[0];
    V[1][6] = tmp[1];
    tmp = MIX_WORD(V[1][3], V[1][7]);
    V[1][3] = tmp[0];
    V[1][7] = tmp[1];
    V[1][0] ^= RC10[r];
    V[1][4] ^= RC14[r];
  }
  for (var r = 0; r < 8; r++) {
    tmp = SUB_CRUMB(V[2][0], V[2][1], V[2][2], V[2][3]);
    V[2][0] = tmp[0];
    V[2][1] = tmp[1];
    V[2][2] = tmp[2];
    V[2][3] = tmp[3];
    tmp = SUB_CRUMB(V[2][5], V[2][6], V[2][7], V[2][4]);
    V[2][5] = tmp[0];
    V[2][6] = tmp[1];
    V[2][7] = tmp[2];
    V[2][4] = tmp[3];
    tmp = MIX_WORD(V[2][0], V[2][4]);
    V[2][0] = tmp[0];
    V[2][4] = tmp[1];
    tmp = MIX_WORD(V[2][1], V[2][5]);
    V[2][1] = tmp[0];
    V[2][5] = tmp[1];
    tmp = MIX_WORD(V[2][2], V[2][6]);
    V[2][2] = tmp[0];
    V[2][6] = tmp[1];
    tmp = MIX_WORD(V[2][3], V[2][7]);
    V[2][3] = tmp[0];
    V[2][7] = tmp[1];
    V[2][0] ^= RC20[r];
    V[2][4] ^= RC24[r];
  }
  for (var r = 0; r < 8; r++) {
    tmp = SUB_CRUMB(V[3][0], V[3][1], V[3][2], V[3][3]);
    V[3][0] = tmp[0];
    V[3][1] = tmp[1];
    V[3][2] = tmp[2];
    V[3][3] = tmp[3];
    tmp = SUB_CRUMB(V[3][5], V[3][6], V[3][7], V[3][4]);
    V[3][5] = tmp[0];
    V[3][6] = tmp[1];
    V[3][7] = tmp[2];
    V[3][4] = tmp[3];
    tmp = MIX_WORD(V[3][0], V[3][4]);
    V[3][0] = tmp[0];
    V[3][4] = tmp[1];
    tmp = MIX_WORD(V[3][1], V[3][5]);
    V[3][1] = tmp[0];
    V[3][5] = tmp[1];
    tmp = MIX_WORD(V[3][2], V[3][6]);
    V[3][2] = tmp[0];
    V[3][6] = tmp[1];
    tmp = MIX_WORD(V[3][3], V[3][7]);
    V[3][3] = tmp[0];
    V[3][7] = tmp[1];
    V[3][0] ^= RC30[r];
    V[3][4] ^= RC34[r];
  }
  for (var r = 0; r < 8; r++) {
    tmp = SUB_CRUMB(V[4][0], V[4][1], V[4][2], V[4][3]);
    V[4][0] = tmp[0];
    V[4][1] = tmp[1];
    V[4][2] = tmp[2];
    V[4][3] = tmp[3];
    tmp = SUB_CRUMB(V[4][5], V[4][6], V[4][7], V[4][4]);
    V[4][5] = tmp[0];
    V[4][6] = tmp[1];
    V[4][7] = tmp[2];
    V[4][4] = tmp[3];
    tmp = MIX_WORD(V[4][0], V[4][4]);
    V[4][0] = tmp[0];
    V[4][4] = tmp[1];
    tmp = MIX_WORD(V[4][1], V[4][5]);
    V[4][1] = tmp[0];
    V[4][5] = tmp[1];
    tmp = MIX_WORD(V[4][2], V[4][6]);
    V[4][2] = tmp[0];
    V[4][6] = tmp[1];
    tmp = MIX_WORD(V[4][3], V[4][7]);
    V[4][3] = tmp[0];
    V[4][7] = tmp[1];
    V[4][0] ^= RC40[r];
    V[4][4] ^= RC44[r];
  }
}


var luffa5 = function(ctx, data) {
  var buf, ptr;
  //create a local copy of states
  var V = new Array(Luffa_VX);
  for (var i = 0; i < Luffa_VX; i++) {
    V[i] = new Array(Luffa_VY);
  }
  buf = ctx.buffer;
  ptr = ctx.ptr;
  var len = data.length;
  if (len < ctx.buffer.length - ptr) {
    op.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  for (var i = 0; i < Luffa_VX; i++) {
    for (var j = 0; j < Luffa_VY; j++) {
      V[i][j] = ctx.state[i][j];
    }
  }
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      var int32Buf = h.bytes2Int32Buffer(buf);
      MI5(int32Buf, V);
      P5(V);
      ptr = 0;
    }
  }
  ctx.state = V;
  ctx.ptr = ptr;
}

var luffa5Close = function(ctx, ub, n) {
  var buf, out, ptr, z, i;
  var V = new Array(Luffa_VX);
  for (var i = 0; i < Luffa_VX; i++) {
    V[i] = new Array(Luffa_VY);
  }
  buf = ctx.buffer;
  ptr = ctx.ptr;
  z = 0x80 >> n;
  buf[ptr++] = ((ub & -z) | z) & 0xFF;
  op.bufferSet(buf, ptr, 0, ctx.buffer.length - ptr);
  for (var i = 0; i < Luffa_VX; i++) {
    for (var j = 0; j < Luffa_VY; j++) {
      V[i][j] = ctx.state[i][j];
    }
  }
  var out = new Array(16);
  for (i = 0; i < 3; i++) {
    var int32Buf = h.bytes2Int32Buffer(buf);
    MI5(int32Buf, V);
    P5(V);
    switch (i) {
      case 0:
        op.bufferSet(buf, 0, 0, ctx.buffer.length);
        break;
      case 1:
        out[0] = V[0][0] ^ V[1][0] ^ V[2][0] ^ V[3][0] ^ V[4][0];
        out[1] = V[0][1] ^ V[1][1] ^ V[2][1] ^ V[3][1] ^ V[4][1];
        out[2] = V[0][2] ^ V[1][2] ^ V[2][2] ^ V[3][2] ^ V[4][2];
        out[3] = V[0][3] ^ V[1][3] ^ V[2][3] ^ V[3][3] ^ V[4][3];
        out[4] = V[0][4] ^ V[1][4] ^ V[2][4] ^ V[3][4] ^ V[4][4];
        out[5] = V[0][5] ^ V[1][5] ^ V[2][5] ^ V[3][5] ^ V[4][5];
        out[6] = V[0][6] ^ V[1][6] ^ V[2][6] ^ V[3][6] ^ V[4][6];
        out[7] = V[0][7] ^ V[1][7] ^ V[2][7] ^ V[3][7] ^ V[4][7];
        break;
      case 2:
        out[8] = V[0][0] ^ V[1][0] ^ V[2][0] ^ V[3][0] ^ V[4][0];
        out[9] = V[0][1] ^ V[1][1] ^ V[2][1] ^ V[3][1] ^ V[4][1];
        out[10] = V[0][2] ^ V[1][2] ^ V[2][2] ^ V[3][2] ^ V[4][2];
        out[11] = V[0][3] ^ V[1][3] ^ V[2][3] ^ V[3][3] ^ V[4][3];
        out[12] = V[0][4] ^ V[1][4] ^ V[2][4] ^ V[3][4] ^ V[4][4];
        out[13] = V[0][5] ^ V[1][5] ^ V[2][5] ^ V[3][5] ^ V[4][5];
        out[14] = V[0][6] ^ V[1][6] ^ V[2][6] ^ V[3][6] ^ V[4][6];
        out[15] = V[0][7] ^ V[1][7] ^ V[2][7] ^ V[3][7] ^ V[4][7];
        break;
    }
  }
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = V_INIT;
  ctx.ptr = 0;
  ctx.buffer = new Array(Luffa_BlockSize);
  luffa5(ctx, msg);
  var r = luffa5Close(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],11:[function(require,module,exports){
'use strict';
//the right shift is important, it has to do with 32 bit operations in javascript, it will make things faster
function u64(h, l) {
  this.hi = h >>> 0;
  this.lo = l >>> 0;
}

u64.prototype.set = function(oWord) {
  this.lo = oWord.lo;
  this.hi = oWord.hi;
}

u64.prototype.add = function(oWord) {
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (this.lo & 0XFFFF) + (oWord.lo & 0XFFFF);
  lowMid = (this.lo >>> 16) + (oWord.lo >>> 16) + (lowest >>> 16);
  highMid = (this.hi & 0XFFFF) + (oWord.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (this.hi >>> 16) + (oWord.hi >>> 16) + (highMid >>> 16);

  //now set the hgih and the low accordingly..
  this.lo = (lowMid << 16) | (lowest & 0XFFFF);
  this.hi = (highest << 16) | (highMid & 0XFFFF);

  return this; //for chaining..
};

u64.prototype.addOne = function() {
  if (this.lo === -1 || this.lo === 0xFFFFFFFF) {
    this.lo = 0;
    this.hi++;
  } else {
    this.lo++;
  }
}

u64.prototype.plus = function(oWord) {
  var c = new u64(0, 0);
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (this.lo & 0XFFFF) + (oWord.lo & 0XFFFF);
  lowMid = (this.lo >>> 16) + (oWord.lo >>> 16) + (lowest >>> 16);
  highMid = (this.hi & 0XFFFF) + (oWord.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (this.hi >>> 16) + (oWord.hi >>> 16) + (highMid >>> 16);

  //now set the hgih and the low accordingly..
  c.lo = (lowMid << 16) | (lowest & 0XFFFF);
  c.hi = (highest << 16) | (highMid & 0XFFFF);

  return c; //for chaining..
};

u64.prototype.not = function() {
  return new u64(~this.hi, ~this.lo);
}

u64.prototype.one = function() {
  return new u64(0x0, 0x1);
}

u64.prototype.zero = function() {
  return new u64(0x0, 0x0);
}

u64.prototype.neg = function() {
  return this.not().plus(this.one());
}

u64.prototype.minus = function(oWord) {
  return this.plus(oWord.neg());
};

u64.prototype.isZero = function() {
  return (this.lo === 0) && (this.hi === 0);
}

function isLong(obj) {
  return (obj && obj["__isLong__"]) === true;
}

function fromNumber(value) {
  if (isNaN(value) || !isFinite(value))
    return this.zero();
  var pow32 = (1 << 32);
  return new u64((value % pow32) | 0, (value / pow32) | 0);
}

u64.prototype.multiply = function(multiplier) {
  if (this.isZero())
    return this.zero();
  if (!isLong(multiplier))
    multiplier = fromNumber(multiplier);
  if (multiplier.isZero())
    return this.zero();

  // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
  // We can skip products that would overflow.

  var a48 = this.hi >>> 16;
  var a32 = this.hi & 0xFFFF;
  var a16 = this.lo >>> 16;
  var a00 = this.lo & 0xFFFF;

  var b48 = multiplier.hi >>> 16;
  var b32 = multiplier.hi & 0xFFFF;
  var b16 = multiplier.lo >>> 16;
  var b00 = multiplier.lo & 0xFFFF;

  var c48 = 0,
    c32 = 0,
    c16 = 0,
    c00 = 0;
  c00 += a00 * b00;
  c16 += c00 >>> 16;
  c00 &= 0xFFFF;
  c16 += a16 * b00;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c16 += a00 * b16;
  c32 += c16 >>> 16;
  c16 &= 0xFFFF;
  c32 += a32 * b00;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a16 * b16;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c32 += a00 * b32;
  c48 += c32 >>> 16;
  c32 &= 0xFFFF;
  c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
  c48 &= 0xFFFF;
  return new u64((c48 << 16) | c32, (c16 << 16) | c00);
};

u64.prototype.shiftLeft = function(bits) {
  bits = bits % 64;
  var c = new u64(0, 0);
  if (bits === 0) {
    return this.clone();
  } else if (bits >= 32) {
    c.lo = 0;
    c.hi = this.lo << (bits - 32);
  }
  else {
    var toMoveUp = this.lo >>> 32 - bits;
    c.lo = this.lo << bits;
    c.hi = (this.hi << bits) | toMoveUp;
  }
  return c; //for chaining..
};
//Shifts this word by the given number of bits to the right (max 32)..
u64.prototype.shiftRight = function(bits) {
  bits = bits % 64;
  var c = new u64(0, 0);
  if (bits === 0) {
    return this.clone();
  } else if (bits >= 32) {
    c.hi = 0;
    c.lo = this.hi >>> (bits - 32);
  }
  else {
    var bitsOff32 = 32 - bits,
      toMoveDown = this.hi << bitsOff32 >>> bitsOff32;
    c.hi = this.hi >>> bits;
    c.lo = this.lo >>> bits | (toMoveDown << bitsOff32);
  }
  return c; //for chaining..
};
//Rotates the bits of this word round to the left (max 32)..
u64.prototype.rotateLeft = function(bits) {
  if (bits > 32) {
    return this.rotateRight(64 - bits);
  }
  var c = new u64(0, 0);
  var newHigh;
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  } else if (bits === 32) { //just switch high and low over in this case..
    newHigh = this.lo;
    c.lo = this.hi;
    c.hi = newHigh;
  }
  else {
    newHigh = (this.hi << bits) | (this.lo >>> (32 - bits));
    c.lo = (this.lo << bits) | (this.hi >>> (32 - bits));
    c.hi = newHigh;
  }
  return c; //for chaining..
};
//Rotates the bits of this word round to the right (max 32)..
u64.prototype.rotateRight = function(bits) {
  if (bits > 32) {
    return this.rotateLeft(64 - bits);
  }
  var c = new u64(0, 0);
  var newHigh;
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  } else if (bits === 32) { //just switch high and low over in this case..
    newHigh = this.lo;
    c.lo = this.hi;
    c.hi = newHigh;
  }
  else {
    newHigh = (this.lo << (32 - bits)) | (this.hi >>> bits);
    c.lo = (this.hi << (32 - bits)) | (this.lo >>> bits);
    c.hi = newHigh;
  }
  return c; //for chaining..
};
//Xors this word with the given other..
u64.prototype.xor = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi ^ oWord.hi;
  c.lo = this.lo ^ oWord.lo;
  return c; //for chaining..
};
//Ands this word with the given other..
u64.prototype.and = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi & oWord.hi;
  c.lo = this.lo & oWord.lo;
  return c; //for chaining..
};
//Converts this word to a string representing it's encoding as 4 UTF2 16 bit
//characters..
u64.prototype.toString = function() {
  var str = "",
    high = this.hi,
    low = this.lo;
  str += String.fromCharCode(high >>> 16);
  str += String.fromCharCode(high << 16 >>> 16);
  str += String.fromCharCode(low >>> 16);
  str += String.fromCharCode(low << 16 >>> 16);
  return str;
};

u64.prototype.toBinaryString = function(sep) {
  var str = "",
    high = this.hi,
    low = this.lo;
  var a = new Array(4);
  a[0] = (high >>> 16).toString(2);
  a[1] = (high << 16 >>> 16).toString(2);
  a[2] = (low >>> 16).toString(2);
  a[3] = (low << 16 >>> 16).toString(2);
  for (var i = 0; i < 4; i++) {
    while (a[i].length < 16) {
      a[i] = '0' + a[i];
    }
  }
  if (!sep) sep = '';
  return a.join(sep);
};
//Creates a deep copy of this Word..
u64.prototype.clone = function() {
  return new u64(this.hi, this.lo);
};
//Given a string a a starting index, returns a new Word which encodes the
//four characters starting from index up to index + 3.
u64.fromChars = function(str, index) {
  var low, high;
  //pairs of UTF2 chars need to be stored as one 32 bit int..
  high = (str.charCodeAt(index) << 16) + str.charCodeAt(index + 1);
  low = (str.charCodeAt(index + 2) << 16) + str.charCodeAt(index + 3);
  return new u64(high, low);
};

u64.prototype.setxor64 = function() {
  var a = arguments;
  for (var i = 0, len = a.length; i < len; i++) {
    this.hi ^= a[i].hi;
    this.lo ^= a[i].lo;
  }
  return this;
}

module.exports.u64 = u64;

module.exports.add64 = function(a, b) {
  var lowest, lowMid, highMid, highest; //four parts of the whole 64 bit number..

  //need to add the respective parts from each number and the carry if on is present..
  lowest = (a.lo & 0XFFFF) + (b.lo & 0XFFFF);
  lowMid = (a.lo >>> 16) + (b.lo >>> 16) + (lowest >>> 16);
  highMid = (a.hi & 0XFFFF) + (b.hi & 0XFFFF) + (lowMid >>> 16);
  highest = (a.hi >>> 16) + (b.hi >>> 16) + (highMid >>> 16);

  var r = new this.u64((highest << 16) | (highMid & 0XFFFF), (lowMid << 16) | (lowest & 0XFFFF));

  return r;
};

module.exports.xor64 = function() {
  var a = arguments,
    h = a[0].hi,
    l = a[0].lo;
  for (var i = 1, len = a.length; i < len; i++) {
    h ^= a[i].hi;
    l ^= a[i].lo;
  }
  return new this.u64(h, l);
}

module.exports.clone64Array = function(array) {
  var a = [];
  for (var i in array) {
    a.push(array[i].clone());
  }
  return a;
}

//this shouldn't be a problem, but who knows in the future javascript might support 64bits
module.exports.t32 = function(x) {
  return (x & 0xFFFFFFFF)
}

module.exports.rotl32 = function(x, c) {
  return (((x) << (c)) | ((x) >>> (32 - (c)))) & (0xFFFFFFFF);
}

module.exports.rotr32 = function(x, c) {
  return this.rotl32(x, (32 - (c)));
}

module.exports.swap32 = function(val) {
  return ((val & 0xFF) << 24) |
    ((val & 0xFF00) << 8) |
    ((val >>> 8) & 0xFF00) |
    ((val >>> 24) & 0xFF);
}

module.exports.swap32Array = function(a) {
  //can't do this with map because of support for IE8 (Don't hate me plz).
  var r = Array(a.length);
  for (var i in a) {
    r[i] = (this.swap32(a[i]));
  }
  return r;
}
//for skein

module.exports.rotl64 = function(x, c) {
  var h0 = 0,
    l0 = 0,
    h1 = 0,
    l1 = 0,
    c1 = 64 - c;

  // shift left
  if (c < 32) {
    h0 = (x.hi << c) | ((x.lo & (((1 << c) - 1) | 0) << (32 - c)) >>> (32 - c));
    l0 = x.lo << c;
  }
  else {
    h0 = x.lo << (c - 32);
  }

  // shift right
  if (c1 < 32) {
    h1 = x.hi >>> c1;
    l1 = (x.lo >>> c1) | (x.hi & (((1 << c1) - 1) | 0)) << (32 - c1);
  }
  else {
    l1 = x.hi >>> (c1 - 32);
  }

  return new this.u64(h0 | h1, l0 | l1);
}

module.exports.xnd64 = function(x, y, z) {
  return new this.u64(x.hi ^ ((~y.hi) & z.hi), x.lo ^ ((~y.lo) & z.lo));
}

module.exports.load64 = function(x, i) {
  var l = x[i] | (x[i + 1] << 8) | (x[i + 2] << 16) | (x[i + 3] << 24);
  var h = x[i + 4] | (x[i + 5] << 8) | (x[i + 6] << 16) | (x[i + 7] << 24);
  return new this.u64(h, l);
}

module.exports.bufferInsert = function(buffer, bufferOffset, data, len) {
  for (var i = 0; i < len; i++) {
    buffer[i + bufferOffset] = data[i];
  }
}

module.exports.bufferInsert64 = function(buffer, bufferOffset, data, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = data[i].clone();
  }
}

module.exports.buffer2Insert = function(buffer, bufferOffset, bufferOffset2, data, len, len2) {
  for (var i = len - 1; i >= 0; i--) {
    for (var j = len2 - 1; j >= 0; j--) {
      buffer[i + bufferOffset][j + bufferOffset2] = data[i][j];
    }
  }
}


module.exports.bufferInsertBackwards = function(buffer, bufferOffset, data, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = data[len - 1 - i];
  }
}

module.exports.bufferSet = function(buffer, bufferOffset, value, len) {
  for (var i = len - 1; i >= 0; i--) {
    buffer[i + bufferOffset] = value;
  }
}

module.exports.bufferXORInsert = function(buffer, bufferOffset, data, dataOffset, len) {
  for (var i = 0; i < len; i++) {
    buffer[i + bufferOffset] ^= data[i + dataOffset];
  }
}

module.exports.xORTable = function(d, s1, s2, len) {
  for (var i = 0; i < len; i++) {
    d[i] = s1[i] ^ s2[i];
  }
}
},{}],12:[function(require,module,exports){
/////////////////////////////////////
////////////  Shavite ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');
var aes = require('./aes');

var Shavite_BlockSize = 128;
var Simd_HSize = 4;

var IV512 = [
  0x72FCCDD8, 0x79CA4727, 0x128A077B, 0x40D55AEC,
  0xD1901A06, 0x430AE307, 0xB29F5CD1, 0xDF07FBFC,
  0x8E45D73D, 0x681AB538, 0xBDE86578, 0xDD577E47,
  0xE275EADE, 0x502D9FCD, 0xB9357178, 0x022A4B9A,
];

var AES_ROUND_NOKEY = function(x) {
  var t = new Array(4);
  op.bufferInsert(t, 0, x, 4);
  aes.AES_ROUND_NOKEY_LE(t, x);
  return x;
}

var KEY_EXPAND_ELT = function(k, start, end) {
  var kt = k.slice(start, end);
  var l = AES_ROUND_NOKEY([kt[1], kt[2], kt[3], kt[0]]);
  op.bufferInsert(k, start, l, end - start);
}

var c512 = function(ctx, msg) {
  var m = h.bytes2Int32Buffer(msg);
  var p = Array(16);
  var x = Array(4);
  var rk = Array(32);
  var r;

  op.bufferInsert(p, 0, ctx.h, 16);
  /* round 0 */
  rk[0] = op.swap32(m[0]);
  x[0] = p[4] ^ rk[0];
  rk[1] = op.swap32(m[1]);
  x[1] = p[5] ^ rk[1];
  rk[2] = op.swap32(m[2]);
  x[2] = p[6] ^ rk[2];
  rk[3] = op.swap32(m[3]);
  x[3] = p[7] ^ rk[3];
  AES_ROUND_NOKEY(x);
  rk[4] = op.swap32(m[4]);
  x[0] ^= rk[4];
  rk[5] = op.swap32(m[5]);
  x[1] ^= rk[5];
  rk[6] = op.swap32(m[6]);
  x[2] ^= rk[6];
  rk[7] = op.swap32(m[7]);
  x[3] ^= rk[7];
  AES_ROUND_NOKEY(x);
  rk[8] = op.swap32(m[8]);
  x[0] ^= rk[8];
  rk[9] = op.swap32(m[9]);
  x[1] ^= rk[9];
  rk[10] = op.swap32(m[10]);
  x[2] ^= rk[10];
  rk[11] = op.swap32(m[11]);
  x[3] ^= rk[11];
  AES_ROUND_NOKEY(x);
  rk[12] = op.swap32(m[12]);
  x[0] ^= rk[12];
  rk[13] = op.swap32(m[13]);
  x[1] ^= rk[13];
  rk[14] = op.swap32(m[14]);
  x[2] ^= rk[14];
  rk[15] = op.swap32(m[15]);
  x[3] ^= rk[15];
  AES_ROUND_NOKEY(x);
  p[0] ^= x[0];
  p[1] ^= x[1];
  p[2] ^= x[2];
  p[3] ^= x[3];
  rk[16] = op.swap32(m[16]);
  x[0] = p[12] ^ rk[16];
  rk[17] = op.swap32(m[17]);
  x[1] = p[13] ^ rk[17];
  rk[18] = op.swap32(m[18]);
  x[2] = p[14] ^ rk[18];
  rk[19] = op.swap32(m[19]);
  x[3] = p[15] ^ rk[19];
  AES_ROUND_NOKEY(x);
  rk[20] = op.swap32(m[20]);
  x[0] ^= rk[20];
  rk[21] = op.swap32(m[21]);
  x[1] ^= rk[21];
  rk[22] = op.swap32(m[22]);
  x[2] ^= rk[22];
  rk[23] = op.swap32(m[23]);
  x[3] ^= rk[23];
  AES_ROUND_NOKEY(x);
  rk[24] = op.swap32(m[24]);
  x[0] ^= rk[24];
  rk[25] = op.swap32(m[25]);
  x[1] ^= rk[25];
  rk[26] = op.swap32(m[26]);
  x[2] ^= rk[26];
  rk[27] = op.swap32(m[27]);
  x[3] ^= rk[27];
  AES_ROUND_NOKEY(x);
  rk[28] = op.swap32(m[28]);
  x[0] ^= rk[28];
  rk[29] = op.swap32(m[29]);
  x[1] ^= rk[29];
  rk[30] = op.swap32(m[30]);
  x[2] ^= rk[30];
  rk[31] = op.swap32(m[31]);
  x[3] ^= rk[31];
  AES_ROUND_NOKEY(x);
  p[8] ^= x[0];
  p[9] ^= x[1];
  p[10] ^= x[2];
  p[11] ^= x[3];

  for (r = 0; r < 3; r++) {
    /* round 1, 5, 9 */
    KEY_EXPAND_ELT(rk, 0, 4);
    rk[0] ^= rk[28];
    rk[1] ^= rk[29];
    rk[2] ^= rk[30];
    rk[3] ^= rk[31];
    if (r == 0) {
      rk[0] ^= ctx.count[0];
      rk[1] ^= ctx.count[1];
      rk[2] ^= ctx.count[2];
      rk[3] ^= op.t32(~ctx.count[3]);
    }
    x[0] = p[0] ^ rk[0];
    x[1] = p[1] ^ rk[1];
    x[2] = p[2] ^ rk[2];
    x[3] = p[3] ^ rk[3];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 4, 8);
    rk[4] ^= rk[0];
    rk[5] ^= rk[1];
    rk[6] ^= rk[2];
    rk[7] ^= rk[3];
    if (r == 1) {
      rk[4] ^= ctx.count[3];
      rk[5] ^= ctx.count[2];
      rk[6] ^= ctx.count[1];
      rk[7] ^= op.t32(~ctx.count[0]);
    }
    x[0] ^= rk[4];
    x[1] ^= rk[5];
    x[2] ^= rk[6];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 8, 12);
    rk[8] ^= rk[4];
    rk[9] ^= rk[5];
    rk[10] ^= rk[6];
    rk[11] ^= rk[7];
    x[0] ^= rk[8];
    x[1] ^= rk[9];
    x[2] ^= rk[10];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 12, 16);
    rk[12] ^= rk[8];
    rk[13] ^= rk[9];
    rk[14] ^= rk[10];
    rk[15] ^= rk[11];
    x[0] ^= rk[12];
    x[1] ^= rk[13];
    x[2] ^= rk[14];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[12] ^= x[0];
    p[13] ^= x[1];
    p[14] ^= x[2];
    p[15] ^= x[3];
    KEY_EXPAND_ELT(rk, 16, 20);
    rk[16] ^= rk[12];
    rk[17] ^= rk[13];
    rk[18] ^= rk[14];
    rk[19] ^= rk[15];
    x[0] = p[8] ^ rk[16];
    x[1] = p[9] ^ rk[17];
    x[2] = p[10] ^ rk[18];
    x[3] = p[11] ^ rk[19];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 20, 24);
    rk[20] ^= rk[16];
    rk[21] ^= rk[17];
    rk[22] ^= rk[18];
    rk[23] ^= rk[19];
    x[0] ^= rk[20];
    x[1] ^= rk[21];
    x[2] ^= rk[22];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 24, 28);
    rk[24] ^= rk[20];
    rk[25] ^= rk[21];
    rk[26] ^= rk[22];
    rk[27] ^= rk[23];
    x[0] ^= rk[24];
    x[1] ^= rk[25];
    x[2] ^= rk[26];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 28, 32);
    rk[28] ^= rk[24];
    rk[29] ^= rk[25];
    rk[30] ^= rk[26];
    rk[31] ^= rk[27];
    if (r == 2) {
      rk[28] ^= ctx.count[2];
      rk[29] ^= ctx.count[3];
      rk[30] ^= ctx.count[0];
      rk[31] ^= op.t32(~ctx.count[1]);
    }
    x[0] ^= rk[28];
    x[1] ^= rk[29];
    x[2] ^= rk[30];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[4] ^= x[0];
    p[5] ^= x[1];
    p[6] ^= x[2];
    p[7] ^= x[3];
    /* round 2, 6, 10 */
    rk[0] ^= rk[25];
    x[0] = p[12] ^ rk[0];
    rk[1] ^= rk[26];
    x[1] = p[13] ^ rk[1];
    rk[2] ^= rk[27];
    x[2] = p[14] ^ rk[2];
    rk[3] ^= rk[28];
    x[3] = p[15] ^ rk[3];
    AES_ROUND_NOKEY(x);
    rk[4] ^= rk[29];
    x[0] ^= rk[4];
    rk[5] ^= rk[30];
    x[1] ^= rk[5];
    rk[6] ^= rk[31];
    x[2] ^= rk[6];
    rk[7] ^= rk[0];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    rk[8] ^= rk[1];
    x[0] ^= rk[8];
    rk[9] ^= rk[2];
    x[1] ^= rk[9];
    rk[10] ^= rk[3];
    x[2] ^= rk[10];
    rk[11] ^= rk[4];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    rk[12] ^= rk[5];
    x[0] ^= rk[12];
    rk[13] ^= rk[6];
    x[1] ^= rk[13];
    rk[14] ^= rk[7];
    x[2] ^= rk[14];
    rk[15] ^= rk[8];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[8] ^= x[0];
    p[9] ^= x[1];
    p[10] ^= x[2];
    p[11] ^= x[3];
    rk[16] ^= rk[9];
    x[0] = p[4] ^ rk[16];
    rk[17] ^= rk[10];
    x[1] = p[5] ^ rk[17];
    rk[18] ^= rk[11];
    x[2] = p[6] ^ rk[18];
    rk[19] ^= rk[12];
    x[3] = p[7] ^ rk[19];
    AES_ROUND_NOKEY(x);
    rk[20] ^= rk[13];
    x[0] ^= rk[20];
    rk[21] ^= rk[14];
    x[1] ^= rk[21];
    rk[22] ^= rk[15];
    x[2] ^= rk[22];
    rk[23] ^= rk[16];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    rk[24] ^= rk[17];
    x[0] ^= rk[24];
    rk[25] ^= rk[18];
    x[1] ^= rk[25];
    rk[26] ^= rk[19];
    x[2] ^= rk[26];
    rk[27] ^= rk[20];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    rk[28] ^= rk[21];
    x[0] ^= rk[28];
    rk[29] ^= rk[22];
    x[1] ^= rk[29];
    rk[30] ^= rk[23];
    x[2] ^= rk[30];
    rk[31] ^= rk[24];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[0] ^= x[0];
    p[1] ^= x[1];
    p[2] ^= x[2];
    p[3] ^= x[3];
    /* round 3, 7, 11 */
    KEY_EXPAND_ELT(rk, 0, 4);
    rk[0] ^= rk[28];
    rk[1] ^= rk[29];
    rk[2] ^= rk[30];
    rk[3] ^= rk[31];
    x[0] = p[8] ^ rk[0];
    x[1] = p[9] ^ rk[1];
    x[2] = p[10] ^ rk[2];
    x[3] = p[11] ^ rk[3];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 4, 8);
    rk[4] ^= rk[0];
    rk[5] ^= rk[1];
    rk[6] ^= rk[2];
    rk[7] ^= rk[3];
    x[0] ^= rk[4];
    x[1] ^= rk[5];
    x[2] ^= rk[6];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 8, 12);
    rk[8] ^= rk[4];
    rk[9] ^= rk[5];
    rk[10] ^= rk[6];
    rk[11] ^= rk[7];
    x[0] ^= rk[8];
    x[1] ^= rk[9];
    x[2] ^= rk[10];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 12, 16);
    rk[12] ^= rk[8];
    rk[13] ^= rk[9];
    rk[14] ^= rk[10];
    rk[15] ^= rk[11];
    x[0] ^= rk[12];
    x[1] ^= rk[13];
    x[2] ^= rk[14];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[4] ^= x[0];
    p[5] ^= x[1];
    p[6] ^= x[2];
    p[7] ^= x[3];
    KEY_EXPAND_ELT(rk, 16, 20);
    rk[16] ^= rk[12];
    rk[17] ^= rk[13];
    rk[18] ^= rk[14];
    rk[19] ^= rk[15];
    x[0] = p[0] ^ rk[16];
    x[1] = p[1] ^ rk[17];
    x[2] = p[2] ^ rk[18];
    x[3] = p[3] ^ rk[19];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 20, 24);
    rk[20] ^= rk[16];
    rk[21] ^= rk[17];
    rk[22] ^= rk[18];
    rk[23] ^= rk[19];
    x[0] ^= rk[20];
    x[1] ^= rk[21];
    x[2] ^= rk[22];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 24, 28);
    rk[24] ^= rk[20];
    rk[25] ^= rk[21];
    rk[26] ^= rk[22];
    rk[27] ^= rk[23];
    x[0] ^= rk[24];
    x[1] ^= rk[25];
    x[2] ^= rk[26];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    KEY_EXPAND_ELT(rk, 28, 32);
    rk[28] ^= rk[24];
    rk[29] ^= rk[25];
    rk[30] ^= rk[26];
    rk[31] ^= rk[27];
    x[0] ^= rk[28];
    x[1] ^= rk[29];
    x[2] ^= rk[30];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[12] ^= x[0];
    p[13] ^= x[1];
    p[14] ^= x[2];
    p[15] ^= x[3];
    /* round 4, 8, 12 */
    rk[0] ^= rk[25];
    x[0] = p[4] ^ rk[0];
    rk[1] ^= rk[26];
    x[1] = p[5] ^ rk[1];
    rk[2] ^= rk[27];
    x[2] = p[6] ^ rk[2];
    rk[3] ^= rk[28];
    x[3] = p[7] ^ rk[3];
    AES_ROUND_NOKEY(x);
    rk[4] ^= rk[29];
    x[0] ^= rk[4];
    rk[5] ^= rk[30];
    x[1] ^= rk[5];
    rk[6] ^= rk[31];
    x[2] ^= rk[6];
    rk[7] ^= rk[0];
    x[3] ^= rk[7];
    AES_ROUND_NOKEY(x);
    rk[8] ^= rk[1];
    x[0] ^= rk[8];
    rk[9] ^= rk[2];
    x[1] ^= rk[9];
    rk[10] ^= rk[3];
    x[2] ^= rk[10];
    rk[11] ^= rk[4];
    x[3] ^= rk[11];
    AES_ROUND_NOKEY(x);
    rk[12] ^= rk[5];
    x[0] ^= rk[12];
    rk[13] ^= rk[6];
    x[1] ^= rk[13];
    rk[14] ^= rk[7];
    x[2] ^= rk[14];
    rk[15] ^= rk[8];
    x[3] ^= rk[15];
    AES_ROUND_NOKEY(x);
    p[0] ^= x[0];
    p[1] ^= x[1];
    p[2] ^= x[2];
    p[3] ^= x[3];
    rk[16] ^= rk[9];
    x[0] = p[12] ^ rk[16];
    rk[17] ^= rk[10];
    x[1] = p[13] ^ rk[17];
    rk[18] ^= rk[11];
    x[2] = p[14] ^ rk[18];
    rk[19] ^= rk[12];
    x[3] = p[15] ^ rk[19];
    AES_ROUND_NOKEY(x);
    rk[20] ^= rk[13];
    x[0] ^= rk[20];
    rk[21] ^= rk[14];
    x[1] ^= rk[21];
    rk[22] ^= rk[15];
    x[2] ^= rk[22];
    rk[23] ^= rk[16];
    x[3] ^= rk[23];
    AES_ROUND_NOKEY(x);
    rk[24] ^= rk[17];
    x[0] ^= rk[24];
    rk[25] ^= rk[18];
    x[1] ^= rk[25];
    rk[26] ^= rk[19];
    x[2] ^= rk[26];
    rk[27] ^= rk[20];
    x[3] ^= rk[27];
    AES_ROUND_NOKEY(x);
    rk[28] ^= rk[21];
    x[0] ^= rk[28];
    rk[29] ^= rk[22];
    x[1] ^= rk[29];
    rk[30] ^= rk[23];
    x[2] ^= rk[30];
    rk[31] ^= rk[24];
    x[3] ^= rk[31];
    AES_ROUND_NOKEY(x);
    p[8] ^= x[0];
    p[9] ^= x[1];
    p[10] ^= x[2];
    p[11] ^= x[3];
  }
  /* round 13 */
  KEY_EXPAND_ELT(rk, 0, 4);
  rk[0] ^= rk[28];
  rk[1] ^= rk[29];
  rk[2] ^= rk[30];
  rk[3] ^= rk[31];
  x[0] = p[0] ^ rk[0];
  x[1] = p[1] ^ rk[1];
  x[2] = p[2] ^ rk[2];
  x[3] = p[3] ^ rk[3];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 4, 8);
  rk[4] ^= rk[0];
  rk[5] ^= rk[1];
  rk[6] ^= rk[2];
  rk[7] ^= rk[3];
  x[0] ^= rk[4];
  x[1] ^= rk[5];
  x[2] ^= rk[6];
  x[3] ^= rk[7];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 8, 12);
  rk[8] ^= rk[4];
  rk[9] ^= rk[5];
  rk[10] ^= rk[6];
  rk[11] ^= rk[7];
  x[0] ^= rk[8];
  x[1] ^= rk[9];
  x[2] ^= rk[10];
  x[3] ^= rk[11];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 12, 16);
  rk[12] ^= rk[8];
  rk[13] ^= rk[9];
  rk[14] ^= rk[10];
  rk[15] ^= rk[11];
  x[0] ^= rk[12];
  x[1] ^= rk[13];
  x[2] ^= rk[14];
  x[3] ^= rk[15];
  AES_ROUND_NOKEY(x);
  p[12] ^= x[0];
  p[13] ^= x[1];
  p[14] ^= x[2];
  p[15] ^= x[3];
  KEY_EXPAND_ELT(rk, 16, 20);
  rk[16] ^= rk[12];
  rk[17] ^= rk[13];
  rk[18] ^= rk[14];
  rk[19] ^= rk[15];
  x[0] = p[8] ^ rk[16];
  x[1] = p[9] ^ rk[17];
  x[2] = p[10] ^ rk[18];
  x[3] = p[11] ^ rk[19];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 20, 24);
  rk[20] ^= rk[16];
  rk[21] ^= rk[17];
  rk[22] ^= rk[18];
  rk[23] ^= rk[19];
  x[0] ^= rk[20];
  x[1] ^= rk[21];
  x[2] ^= rk[22];
  x[3] ^= rk[23];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 24, 28);
  rk[24] ^= rk[20] ^ ctx.count[1];
  rk[25] ^= rk[21] ^ ctx.count[0];
  rk[26] ^= rk[22] ^ ctx.count[3];
  rk[27] ^= rk[23] ^ op.t32(~ctx.count[2]);
  x[0] ^= rk[24];
  x[1] ^= rk[25];
  x[2] ^= rk[26];
  x[3] ^= rk[27];
  AES_ROUND_NOKEY(x);
  KEY_EXPAND_ELT(rk, 28, 32);
  rk[28] ^= rk[24];
  rk[29] ^= rk[25];
  rk[30] ^= rk[26];
  rk[31] ^= rk[27];
  x[0] ^= rk[28];
  x[1] ^= rk[29];
  x[2] ^= rk[30];
  x[3] ^= rk[31];
  AES_ROUND_NOKEY(x);
  p[4] ^= x[0];
  p[5] ^= x[1];
  p[6] ^= x[2];
  p[7] ^= x[3];
  ctx.h[0] ^= p[8];
  ctx.h[1] ^= p[9];
  ctx.h[2] ^= p[10];
  ctx.h[3] ^= p[11];
  ctx.h[4] ^= p[12];
  ctx.h[5] ^= p[13];
  ctx.h[6] ^= p[14];
  ctx.h[7] ^= p[15];
  ctx.h[8] ^= p[0];
  ctx.h[9] ^= p[1];
  ctx.h[10] ^= p[2];
  ctx.h[11] ^= p[3];
  ctx.h[12] ^= p[4];
  ctx.h[13] ^= p[5];
  ctx.h[14] ^= p[6];
  ctx.h[15] ^= p[7];
}

var shavite = function(ctx, data) {
  var len = data.length;
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  while (len > 0) {
    var clen = ctx.buffer.length - ctx.ptr;
    if (clen > len) clen = len;
    op.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      if ((ctx.count[0] = op.t32(ctx.count[0] + 1024)) == 0) {
        ctx.count[1] = op.t32(ctx.count[1] + 1);
        if (ctx.count[1] == 0) {
          ctx.count[2] = op.t32(ctx.count[2] + 1);
          if (ctx.count[2] == 0) {
            ctx.count[3] = op.t32(ctx.count[3] + 1);
          }
        }
      }
      c512(ctx, buf);
      ptr = 0;
    }
  }
  ctx.ptr = ptr;
}

var shaviteClose = function(ctx, ub, n) {
  var buf;
  var ptr, u;
  var z;
  var count = new Array(4);

  buf = ctx.buffer;
  ptr = ctx.ptr;
  count[0] = (ctx.count[0] += (ptr << 3) + n);
  count[1] = ctx.count[1];
  count[2] = ctx.count[2];
  count[3] = ctx.count[3];
  z = 0x80 >> n;
  z = ((ub & -z) | z) & 0xFF;
  if (ptr == 0 && n == 0) {
    buf[0] = 0x80;
    op.bufferSet(buf, 1, 0, 109);
    op.bufferSet(ctx.count, 0, 0, 4);
  }
  else if (ptr < 110) {
    buf[ptr++] = z;
    op.bufferSet(buf, ptr, 0, 110 - ptr);
  }
  else {
    buf[ptr++] = z;
    op.bufferSet(buf, ptr, 0, 128 - ptr);
    c512(ctx, buf);
    op.bufferSet(buf, 0, 0, 110);
    op.bufferSet(ctx.count, 0, 0, 4);
  }

  var countSwapped = op.swap32Array(count);
  var countBytes = h.int32Buffer2Bytes(countSwapped);
  op.bufferInsert(buf, 110, countBytes, 16);
  buf[126] = (16 << 5) & 0xFF; //just to copy the spec (doesn't make sense)
  buf[127] = 16 >>> 3;
  c512(ctx, buf);

  var out = new Array(16);
  for (u = 0; u < 16; u++)
    out[u] = op.swap32(ctx.h[u]);
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.ptr = 0;
  ctx.count = new Array(4);
  op.bufferSet(ctx.count, 0, 0, 4);
  ctx.h = IV512.slice();
  ctx.buffer = new Array(Shavite_BlockSize);
  shavite(ctx, msg);
  var r = shaviteClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./aes":1,"./helper":7,"./op":11}],13:[function(require,module,exports){
/////////////////////////////////////
//////////////  Simd ///////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var h = require('./helper');

var Simd_BlockSize = 128;
var Simd_StateSize = 32;

var IV512 = [
  0x0BA16B95, 0x72F999AD, 0x9FECC2AE, 0xBA3264FC,
  0x5E894929, 0x8E9F30E5, 0x2F1DAA37, 0xF0F2C558,
  0xAC506643, 0xA90635A5, 0xE25B878B, 0xAAB7878F,
  0x88817F7A, 0x0A02892B, 0x559A7550, 0x598F657E,
  0x7EEF60A1, 0x6B70E3E8, 0x9C1714D1, 0xB958E2A8,
  0xAB02675E, 0xED1C014F, 0xCD8D65BB, 0xFDB7A257,
  0x09254899, 0xD699C7BC, 0x9019B6DC, 0x2B9022E4,
  0x8FA14956, 0x21BF9BD3, 0xB94D0943, 0x6FFDDC22,
];

/*
 * The powers of 41 modulo 257. We use exponents from 0 to 255, inclusive.
 */
var alpha_tab = [
  1, 41, 139, 45, 46, 87, 226, 14, 60, 147, 116, 130,
  190, 80, 196, 69, 2, 82, 21, 90, 92, 174, 195, 28,
  120, 37, 232, 3, 123, 160, 135, 138, 4, 164, 42, 180,
  184, 91, 133, 56, 240, 74, 207, 6, 246, 63, 13, 19,
  8, 71, 84, 103, 111, 182, 9, 112, 223, 148, 157, 12,
  235, 126, 26, 38, 16, 142, 168, 206, 222, 107, 18, 224,
  189, 39, 57, 24, 213, 252, 52, 76, 32, 27, 79, 155,
  187, 214, 36, 191, 121, 78, 114, 48, 169, 247, 104, 152,
  64, 54, 158, 53, 117, 171, 72, 125, 242, 156, 228, 96,
  81, 237, 208, 47, 128, 108, 59, 106, 234, 85, 144, 250,
  227, 55, 199, 192, 162, 217, 159, 94, 256, 216, 118, 212,
  211, 170, 31, 243, 197, 110, 141, 127, 67, 177, 61, 188,
  255, 175, 236, 167, 165, 83, 62, 229, 137, 220, 25, 254,
  134, 97, 122, 119, 253, 93, 215, 77, 73, 166, 124, 201,
  17, 183, 50, 251, 11, 194, 244, 238, 249, 186, 173, 154,
  146, 75, 248, 145, 34, 109, 100, 245, 22, 131, 231, 219,
  241, 115, 89, 51, 35, 150, 239, 33, 68, 218, 200, 233,
  44, 5, 205, 181, 225, 230, 178, 102, 70, 43, 221, 66,
  136, 179, 143, 209, 88, 10, 153, 105, 193, 203, 99, 204,
  140, 86, 185, 132, 15, 101, 29, 161, 176, 20, 49, 210,
  129, 149, 198, 151, 23, 172, 113, 7, 30, 202, 58, 65,
  95, 40, 98, 163
];

/*
 * beta^(255*i) mod 257
 */
var yoff_b_n = [
  1, 163, 98, 40, 95, 65, 58, 202, 30, 7, 113, 172,
  23, 151, 198, 149, 129, 210, 49, 20, 176, 161, 29, 101,
  15, 132, 185, 86, 140, 204, 99, 203, 193, 105, 153, 10,
  88, 209, 143, 179, 136, 66, 221, 43, 70, 102, 178, 230,
  225, 181, 205, 5, 44, 233, 200, 218, 68, 33, 239, 150,
  35, 51, 89, 115, 241, 219, 231, 131, 22, 245, 100, 109,
  34, 145, 248, 75, 146, 154, 173, 186, 249, 238, 244, 194,
  11, 251, 50, 183, 17, 201, 124, 166, 73, 77, 215, 93,
  253, 119, 122, 97, 134, 254, 25, 220, 137, 229, 62, 83,
  165, 167, 236, 175, 255, 188, 61, 177, 67, 127, 141, 110,
  197, 243, 31, 170, 211, 212, 118, 216, 256, 94, 159, 217,
  162, 192, 199, 55, 227, 250, 144, 85, 234, 106, 59, 108,
  128, 47, 208, 237, 81, 96, 228, 156, 242, 125, 72, 171,
  117, 53, 158, 54, 64, 152, 104, 247, 169, 48, 114, 78,
  121, 191, 36, 214, 187, 155, 79, 27, 32, 76, 52, 252,
  213, 24, 57, 39, 189, 224, 18, 107, 222, 206, 168, 142,
  16, 38, 26, 126, 235, 12, 157, 148, 223, 112, 9, 182,
  111, 103, 84, 71, 8, 19, 13, 63, 246, 6, 207, 74,
  240, 56, 133, 91, 184, 180, 42, 164, 4, 138, 135, 160,
  123, 3, 232, 37, 120, 28, 195, 174, 92, 90, 21, 82,
  2, 69, 196, 80, 190, 130, 116, 147, 60, 14, 226, 87,
  46, 45, 139, 41
];

/*
 * beta^(255*i) + beta^(253*i) mod 257
 */
var yoff_b_f = [
  2, 203, 156, 47, 118, 214, 107, 106, 45, 93, 212, 20,
  111, 73, 162, 251, 97, 215, 249, 53, 211, 19, 3, 89,
  49, 207, 101, 67, 151, 130, 223, 23, 189, 202, 178, 239,
  253, 127, 204, 49, 76, 236, 82, 137, 232, 157, 65, 79,
  96, 161, 176, 130, 161, 30, 47, 9, 189, 247, 61, 226,
  248, 90, 107, 64, 0, 88, 131, 243, 133, 59, 113, 115,
  17, 236, 33, 213, 12, 191, 111, 19, 251, 61, 103, 208,
  57, 35, 148, 248, 47, 116, 65, 119, 249, 178, 143, 40,
  189, 129, 8, 163, 204, 227, 230, 196, 205, 122, 151, 45,
  187, 19, 227, 72, 247, 125, 111, 121, 140, 220, 6, 107,
  77, 69, 10, 101, 21, 65, 149, 171, 255, 54, 101, 210,
  139, 43, 150, 151, 212, 164, 45, 237, 146, 184, 95, 6,
  160, 42, 8, 204, 46, 238, 254, 168, 208, 50, 156, 190,
  106, 127, 34, 234, 68, 55, 79, 18, 4, 130, 53, 208,
  181, 21, 175, 120, 25, 100, 192, 178, 161, 96, 81, 127,
  96, 227, 210, 248, 68, 10, 196, 31, 9, 167, 150, 193,
  0, 169, 126, 14, 124, 198, 144, 142, 240, 21, 224, 44,
  245, 66, 146, 238, 6, 196, 154, 49, 200, 222, 109, 9,
  210, 141, 192, 138, 8, 79, 114, 217, 68, 128, 249, 94,
  53, 30, 27, 61, 52, 135, 106, 212, 70, 238, 30, 185,
  10, 132, 146, 136, 117, 37, 251, 150, 180, 188, 247, 156,
  236, 192, 108, 86
];

var WB_DATA = [
  [
    [4, 0, 1, 185],
    [6, 0, 1, 185],
    [0, 0, 1, 185],
    [2, 0, 1, 185],
    [7, 0, 1, 185],
    [5, 0, 1, 185],
    [3, 0, 1, 185],
    [1, 0, 1, 185]
  ],
  [
    [15, 0, 1, 185],
    [11, 0, 1, 185],
    [12, 0, 1, 185],
    [8, 0, 1, 185],
    [9, 0, 1, 185],
    [13, 0, 1, 185],
    [10, 0, 1, 185],
    [14, 0, 1, 185]
  ],
  [
    [17, -256, -128, 233],
    [18, -256, -128, 233],
    [23, -256, -128, 233],
    [20, -256, -128, 233],
    [22, -256, -128, 233],
    [21, -256, -128, 233],
    [16, -256, -128, 233],
    [19, -256, -128, 233]
  ],
  [
    [30, -383, -255, 233],
    [24, -383, -255, 233],
    [25, -383, -255, 233],
    [31, -383, -255, 233],
    [27, -383, -255, 233],
    [29, -383, -255, 233],
    [28, -383, -255, 233],
    [26, -383, -255, 233]
  ]
];

var REDS1 = function(x) {
  return (((x) & 0xFF) - ((x) >> 8));
}
var REDS2 = function(x) {
  return (((x) & 0xFFFF) + ((x) >> 16));
}

var IF = function(x, y, z) {
  return ((((y) ^ (z)) & (x)) ^ (z));
}
var MAJ = function(x, y, z) {
  return (((x) & (y)) | (((x) | (y)) & (z)));
}

var FFT_LOOP = function(q, qOffset, hk, as) {
  var u, v;
  var m = q[(qOffset)];
  var n = q[(qOffset) + (hk)];
  q[(qOffset)] = m + n;
  q[(qOffset) + (hk)] = m - n;
  u = v = 0;
  var firstTime = true;
  for (; u < (hk); u += 4, v += 4 * (as)) {
    if (!firstTime) {
      var t;
      m = q[(qOffset) + u + 0];
      n = q[(qOffset) + u + 0 + (hk)];
      t = REDS2(n * alpha_tab[v + 0 * (as)]);
      q[(qOffset) + u + 0] = m + t;
      q[(qOffset) + u + 0 + (hk)] = m - t;
    }
    else {
      firstTime = false;
    }
    m = q[(qOffset) + u + 1];
    n = q[(qOffset) + u + 1 + (hk)];
    t = REDS2(n * alpha_tab[v + 1 * (as)]);
    q[(qOffset) + u + 1] = m + t;
    q[(qOffset) + u + 1 + (hk)] = m - t;
    m = q[(qOffset) + u + 2];
    n = q[(qOffset) + u + 2 + (hk)];
    t = REDS2(n * alpha_tab[v + 2 * (as)]);
    q[(qOffset) + u + 2] = m + t;
    q[(qOffset) + u + 2 + (hk)] = m - t;
    m = q[(qOffset) + u + 3];
    n = q[(qOffset) + u + 3 + (hk)];
    t = REDS2(n * alpha_tab[v + 3 * (as)]);
    q[(qOffset) + u + 3] = m + t;
    q[(qOffset) + u + 3 + (hk)] = m - t;
  }
}

var FFT8 = function(x, xOffset, xs, d) {
  var x0 = x[(xOffset)];
  var x1 = x[(xOffset) + (xs)];
  var x2 = x[(xOffset) + 2 * (xs)];
  var x3 = x[(xOffset) + 3 * (xs)];
  var a0 = x0 + x2;
  var a1 = x0 + (x2 << 4);
  var a2 = x0 - x2;
  var a3 = x0 - (x2 << 4);
  var b0 = x1 + x3;
  var b1 = REDS1((x1 << 2) + (x3 << 6));
  var b2 = (x1 << 4) - (x3 << 4);
  var b3 = REDS1((x1 << 6) + (x3 << 2));
  d[0] = a0 + b0;
  d[1] = a1 + b1;
  d[2] = a2 + b2;
  d[3] = a3 + b3;
  d[4] = a0 - b0;
  d[5] = a1 - b1;
  d[6] = a2 - b2;
  d[7] = a3 - b3;
}

var FFT16 = function(x, xOffset, q, qOffset, xs) {
  var d1 = new Array(8);
  var d2 = new Array(8);
  FFT8(x, xOffset, (xs) << 1, d1);
  FFT8(x, (xOffset) + (xs), (xs) << 1, d2);
  q[(qOffset) + 0] = d1[0] + d2[0];
  q[(qOffset) + 1] = d1[1] + (d2[1] << 1);
  q[(qOffset) + 2] = d1[2] + (d2[2] << 2);
  q[(qOffset) + 3] = d1[3] + (d2[3] << 3);
  q[(qOffset) + 4] = d1[4] + (d2[4] << 4);
  q[(qOffset) + 5] = d1[5] + (d2[5] << 5);
  q[(qOffset) + 6] = d1[6] + (d2[6] << 6);
  q[(qOffset) + 7] = d1[7] + (d2[7] << 7);
  q[(qOffset) + 8] = d1[0] - d2[0];
  q[(qOffset) + 9] = d1[1] - (d2[1] << 1);
  q[(qOffset) + 10] = d1[2] - (d2[2] << 2);
  q[(qOffset) + 11] = d1[3] - (d2[3] << 3);
  q[(qOffset) + 12] = d1[4] - (d2[4] << 4);
  q[(qOffset) + 13] = d1[5] - (d2[5] << 5);
  q[(qOffset) + 14] = d1[6] - (d2[6] << 6);
  q[(qOffset) + 15] = d1[7] - (d2[7] << 7);
}

var FFT32 = function(x, xOffset, q, qOffset, xs) {
  var xd = xs << 1;
  FFT16(x, xOffset, q, qOffset, xd);
  FFT16(x, xOffset + xs, q, qOffset + 16, xd);
  FFT_LOOP(q, qOffset, 16, 8);
}

var FFT64 = function(x, xOffset, q, qOffset, xs) {
  var xd = xs << 1;
  FFT32(x, xOffset, q, qOffset, xd);
  FFT32(x, xOffset + xs, q, qOffset + 32, xd);
  FFT_LOOP(q, qOffset, 32, 4);
}

var FFT256 = function(x, xOffset, q, qOffset, xs) {
  FFT64(x, xOffset, q, qOffset, (xs) << 2);
  FFT64(x, (xOffset) + ((xs) * 2), q, qOffset + 64, (xs) << 2);
  FFT_LOOP(q, qOffset, 64, 2);
  FFT64(x, (xOffset) + ((xs) * 1), q, qOffset + 128, (xs) << 2);
  FFT64(x, (xOffset) + ((xs) * 3), q, qOffset + 192, (xs) << 2);
  FFT_LOOP(q, qOffset + 128, 64, 2);
  FFT_LOOP(q, qOffset, 128, 1);
}

var READ_STATES = function(A, B, C, D, states) {
  A[0] = states[0];
  A[1] = states[1];
  A[2] = states[2];
  A[3] = states[3];
  A[4] = states[4];
  A[5] = states[5];
  A[6] = states[6];
  A[7] = states[7];
  B[0] = states[8];
  B[1] = states[9];
  B[2] = states[10];
  B[3] = states[11];
  B[4] = states[12];
  B[5] = states[13];
  B[6] = states[14];
  B[7] = states[15];
  C[0] = states[16];
  C[1] = states[17];
  C[2] = states[18];
  C[3] = states[19];
  C[4] = states[20];
  C[5] = states[21];
  C[6] = states[22];
  C[7] = states[23];
  D[0] = states[24];
  D[1] = states[25];
  D[2] = states[26];
  D[3] = states[27];
  D[4] = states[28];
  D[5] = states[29];
  D[6] = states[30];
  D[7] = states[31];
}

var WRITE_STATES = function(A, B, C, D, states) {
  states[0] = A[0];
  states[1] = A[1];
  states[2] = A[2];
  states[3] = A[3];
  states[4] = A[4];
  states[5] = A[5];
  states[6] = A[6];
  states[7] = A[7];
  states[8] = B[0];
  states[9] = B[1];
  states[10] = B[2];
  states[11] = B[3];
  states[12] = B[4];
  states[13] = B[5];
  states[14] = B[6];
  states[15] = B[7];
  states[16] = C[0];
  states[17] = C[1];
  states[18] = C[2];
  states[19] = C[3];
  states[20] = C[4];
  states[21] = C[5];
  states[22] = C[6];
  states[23] = C[7];
  states[24] = D[0];
  states[25] = D[1];
  states[26] = D[2];
  states[27] = D[3];
  states[28] = D[4];
  states[29] = D[5];
  states[30] = D[6];
  states[31] = D[7];
}

var PP8 = [
  [1, 0, 3, 2, 5, 4, 7, 6],
  [6, 7, 4, 5, 2, 3, 0, 1],
  [2, 3, 0, 1, 6, 7, 4, 5],
  [3, 2, 1, 0, 7, 6, 5, 4],
  [5, 4, 7, 6, 1, 0, 3, 2],
  [7, 6, 5, 4, 3, 2, 1, 0],
  [4, 5, 6, 7, 0, 1, 2, 3]
];


var M7 = [
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [4, 5, 6, 0],
  [5, 6, 0, 1],
  [6, 0, 1, 2],
  [0, 1, 2, 3]
];

var INNER = function(l, h, mm) {
  return (((l * mm) & 0xFFFF) + ((h * mm) << 16));
}

var W_BIG = function(sb, o1, o2, mm, q) {
  var r = new Array(8);
  r[0] = INNER(q[16 * (sb) + 2 * 0 + o1], q[16 * (sb) + 2 * 0 + o2], mm);
  r[1] = INNER(q[16 * (sb) + 2 * 1 + o1], q[16 * (sb) + 2 * 1 + o2], mm);
  r[2] = INNER(q[16 * (sb) + 2 * 2 + o1], q[16 * (sb) + 2 * 2 + o2], mm);
  r[3] = INNER(q[16 * (sb) + 2 * 3 + o1], q[16 * (sb) + 2 * 3 + o2], mm);
  r[4] = INNER(q[16 * (sb) + 2 * 4 + o1], q[16 * (sb) + 2 * 4 + o2], mm);
  r[5] = INNER(q[16 * (sb) + 2 * 5 + o1], q[16 * (sb) + 2 * 5 + o2], mm);
  r[6] = INNER(q[16 * (sb) + 2 * 6 + o1], q[16 * (sb) + 2 * 6 + o2], mm);
  r[7] = INNER(q[16 * (sb) + 2 * 7 + o1], q[16 * (sb) + 2 * 7 + o2], mm);
  return r;
}

var WB = function(x, y, q) {
  var wb = WB_DATA[x][y];
  return W_BIG(wb[0], wb[1], wb[2], wb[3], q);
}

var STEP_ELT = function(n, w, fun, s, ppb, tA, A, B, C, D) {
  var tt = op.t32(D[n] + (w) + fun(A[n], B[n], C[n]));
  A[n] = op.t32(op.rotl32(tt, s) + tA[ppb[n]]);
  D[n] = C[n];
  C[n] = B[n];
  B[n] = tA[n];
};

var STEP_BIG = function(w, fun, r, s, pp8b, A, B, C, D) {
  var tA = new Array(8);
  tA[0] = op.rotl32(A[0], r);
  tA[1] = op.rotl32(A[1], r);
  tA[2] = op.rotl32(A[2], r);
  tA[3] = op.rotl32(A[3], r);
  tA[4] = op.rotl32(A[4], r);
  tA[5] = op.rotl32(A[5], r);
  tA[6] = op.rotl32(A[6], r);
  tA[7] = op.rotl32(A[7], r);
  STEP_ELT(0, w[0], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(1, w[1], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(2, w[2], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(3, w[3], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(4, w[4], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(5, w[5], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(6, w[6], fun, s, pp8b, tA, A, B, C, D);
  STEP_ELT(7, w[7], fun, s, pp8b, tA, A, B, C, D);
}

var ONE_ROUND_BIG = function(ri, isp, p0, p1, p2, p3, A, B, C, D, q) {
  STEP_BIG(WB(ri, 0, q), IF, p0, p1, PP8[M7[0][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 1, q), IF, p1, p2, PP8[M7[1][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 2, q), IF, p2, p3, PP8[M7[2][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 3, q), IF, p3, p0, PP8[M7[3][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 4, q), MAJ, p0, p1, PP8[M7[4][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 5, q), MAJ, p1, p2, PP8[M7[5][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 6, q), MAJ, p2, p3, PP8[M7[6][isp]], A, B, C, D);
  STEP_BIG(WB(ri, 7, q), MAJ, p3, p0, PP8[M7[7][isp]], A, B, C, D);
}

var compress = function(ctx, last) {
  var q = new Array(256);
  var i;
  var A = new Array(8);
  var B = new Array(8);
  var C = new Array(8);
  var D = new Array(8);
  FFT256(ctx.buffer, 0, q, 0, 1);
  if (last) {
    for (i = 0; i < 256; i++) {
      var tq;

      tq = q[i] + yoff_b_f[i];
      tq = REDS2(tq);
      tq = REDS1(tq);
      tq = REDS1(tq);
      q[i] = (tq <= 128 ? tq : tq - 257);
    }
  }
  else {
    for (i = 0; i < 256; i++) {
      var tq;

      tq = q[i] + yoff_b_n[i];
      tq = REDS2(tq);
      tq = REDS1(tq);
      tq = REDS1(tq);
      q[i] = (tq <= 128 ? tq : tq - 257);
    }
  }
  READ_STATES(A, B, C, D, ctx.state);
  var x = op.swap32Array(h.bytes2Int32Buffer(ctx.buffer));
  op.bufferXORInsert(A,0,x,0,8);
  op.bufferXORInsert(B,0,x,8,8);
  op.bufferXORInsert(C,0,x,16,8);
  op.bufferXORInsert(D,0,x,24,8);

  ONE_ROUND_BIG(0, 0, 3, 23, 17, 27, A, B, C, D, q);
  ONE_ROUND_BIG(1, 1, 28, 19, 22, 7, A, B, C, D, q);
  ONE_ROUND_BIG(2, 2, 29, 9, 15, 5, A, B, C, D, q);
  ONE_ROUND_BIG(3, 3, 4, 13, 10, 25, A, B, C, D, q);

  STEP_BIG(ctx.state.slice(0, 8),IF, 4, 13, PP8[4],A,B,C,D);
  STEP_BIG(ctx.state.slice(8, 16),IF, 13, 10, PP8[5],A,B,C,D);
  STEP_BIG(ctx.state.slice(16, 24),IF, 10, 25, PP8[6],A,B,C,D);
  STEP_BIG(ctx.state.slice(24, 32),IF, 25, 4, PP8[0],A,B,C,D);
  WRITE_STATES(A, B, C, D, ctx.state);
}

var simd = function(ctx, data) {
  var len = data.length;
  while (len > 0) {
    var clen = ctx.buffer.length - ctx.ptr;
    if (clen > len) clen = len;
    op.bufferInsert(ctx.buffer, ctx.ptr, data, clen);
    ctx.ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ctx.ptr === ctx.buffer.length) {
      compress(ctx, 0);
      ctx.ptr = 0;
      ctx.countLow = op.t32(ctx.countLow + 1);
      if (ctx.countLow == 0)
        ctx.countHigh++;
    }
  }
}

var encode_count = function(dst, offset, low, high, ptr, n) {
  low = op.t32(low << 10);
  high = op.t32(high << 10) + (low >> 22);
  low += (ptr << 3) + n;
  dst[offset] = low & 0xFF;
  dst[offset + 1] = (low & 0xFF00) >>> 8;
  dst[offset + 2] = (low & 0xFF0000) >>> 8;
  dst[offset + 3] = (low & 0xFF000000) >>> 8;
  dst[offset + 4] = high & 0xFF;
  dst[offset + 5] = (high & 0xFF00) >>> 8;
  dst[offset + 6] = (high & 0xFF0000) >>> 8;
  dst[offset + 7] = (high & 0xFF000000) >>> 8;
}

var simdClose = function(ctx, ub, n) {
  var buf = ctx.buffer;
  var ptr = ctx.ptr;
  var d;
  var u;

  if (ctx.ptr > 0 || n > 0) {
    op.bufferSet(buf, ptr, 0, buf.length - ptr);
    buf[ptr] = ub & (0xFF << (8 - n));
    compress(ctx, 0);
  }
  op.bufferSet(buf, 0, 0, buf.length);
  encode_count(buf, 0, ctx.countLow, ctx.countHigh, ctx.ptr, n);
  compress(ctx, 1);
  var out = new Array(16);
  for (u = 0; u < 16; u++)
    out[u] = op.swap32(ctx.state[u]);
  return out;
}

module.exports = function(input, format, output) {
  var msg;
  if (format === 1) {
    msg = input;
  }
  else if (format === 2) {
    msg = h.int32Buffer2Bytes(input);
  }
  else {
    msg = h.string2bytes(input);
  }
  var ctx = {};
  ctx.state = IV512.slice();
  ctx.ptr = 0;
  ctx.countLow = 0;
  ctx.countHigh = 0;
  ctx.buffer = new Array(Simd_BlockSize);
  simd(ctx, msg);
  var r = simdClose(ctx, 0, 0);
  var out;
  if (output === 2) {
    out = r;
  }
  else if (output === 1) {
    out = h.int32Buffer2Bytes(r)
  }
  else {
    out = h.int32ArrayToHexString(r)
  }
  return out;
}
},{"./helper":7,"./op":11}],14:[function(require,module,exports){
//from http://www.h2database.com/skein/
// Released under the public domain

var op = require('./op');
var h = require('./helper');

module.exports = function(input, format, output) {
	var msg;
	if (format === 1) {
		msg = input;
	}
	else if (format === 2) {
		msg = h.int32Buffer2Bytes(input);
	}
	else {
		msg = h.string2bytes(input);
	}
	// final: 0x80; first: 0x40; conf: 0x4; msg: 0x30; out: 0x3f
	var tweak = [
			[0, 32],
			[(0x80 + 0x40 + 0x4) << 24, 0]
		],
		c = [];
	var buff = h.string2bytes("SHA3\1\0\0\0\0\2");
	block(c, tweak, buff, 0);
	tweak = [
		[0, 0],
		[(0x40 + 0x30) << 24, 0]
	];
	var len = msg.length,
		pos = 0;
	for (; len > 64; len -= 64, pos += 64) {
		tweak[0][1] += 64;
		block(c, tweak, msg, pos);
		tweak[1][0] = 0x30 << 24;
	}
	tweak[0][1] += len;
	tweak[1][0] |= 0x80 << 24;
	block(c, tweak, msg, pos);
	tweak[0][1] = 8;
	tweak[1][0] = (0x80 + 0x40 + 0x3f) << 24;
	block(c, tweak, [], 0);
	for (var hash = [], i = 0; i < 64; i++) {
		var b = (shiftRight(c[i >> 3], (i & 7) * 8)[1] & 255);
		hash.push(b);
	}
	var out;
  if (output === 2) {
    out = h.bytes2Int32Buffer(hash);
  }
  else if (output === 1) {
    return out;
  }
  else {
    out = h.int8ArrayToHexString(hash);
  }
  return out;
}

function shiftLeft(x, n) {
	if (x == null) return [0, 0];
	if (n > 32) return [x[1] << (n - 32), 0];
	if (n == 32) return [x[1], 0];
	if (n == 0) return x;
	return [(x[0] << n) | (x[1] >>> (32 - n)), x[1] << n];
}

function shiftRight(x, n) {
	if (x == null) return [0, 0];
	if (n > 32) return [0, x[0] >>> (n - 32)];
	if (n == 32) return [0, x[0]];
	if (n == 0) return x;
	return [x[0] >>> n, (x[0] << (32 - n)) | (x[1] >>> n)];
}

function add(x, y) {
	if (y == null) return x;
	var lsw = (x[1] & 0xffff) + (y[1] & 0xffff);
	var msw = (x[1] >>> 16) + (y[1] >>> 16) + (lsw >>> 16);
	var lowOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);
	lsw = (x[0] & 0xffff) + (y[0] & 0xffff) + (msw >>> 16);
	msw = (x[0] >>> 16) + (y[0] >>> 16) + (lsw >>> 16);
	var highOrder = ((msw & 0xffff) << 16) | (lsw & 0xffff);
	return [highOrder, lowOrder];
}

function xor(a, b) {
	if (b == null) return a;
	return [a[0] ^ b[0], a[1] ^ b[1]];
}

function block(c, tweak, b, off) {
	var R = [46, 36, 19, 37, 33, 42, 14, 27, 17, 49, 36, 39, 44, 56, 54, 9,
		39, 30, 34, 24, 13, 17, 10, 50, 25, 29, 39, 43, 8, 22, 56, 35
	];
	var x = [],
		t = [];
	// c[8] = [0x55555555, 0x55555555];
	c[8] = [0x1BD11BDA, 0xA9FC1A22];
	for (var i = 0; i < 8; i++) {
		for (var j = 7, k = off + i * 8 + 7; j >= 0; j--, k--) {
			t[i] = shiftLeft(t[i], 8);
			t[i][1] |= b[k] & 255;
		}
		x[i] = add(t[i], c[i]);
		c[8] = xor(c[8], c[i]);
	}
	x[5] = add(x[5], tweak[0]);
	x[6] = add(x[6], tweak[1]);
	tweak[2] = xor(tweak[0], tweak[1]);
	for (var round = 1; round <= 18; round++) {
		var p = 16 - ((round & 1) << 4);
		for (var i = 0; i < 16; i++) {
			// m: 0, 2, 4, 6, 2, 0, 6, 4, 4, 6, 0, 2, 6, 4, 2, 0
			var m = 2 * ((i + (1 + i + i) * (i >> 2)) & 3);
			var n = (1 + i + i) & 7;
			var r = R[p + i];
			x[m] = add(x[m], x[n]);
			x[n] = xor(shiftLeft(x[n], r), shiftRight(x[n], 64 - r));
			x[n] = xor(x[n], x[m]);

		}
		for (var i = 0; i < 8; i++)
			x[i] = add(x[i], c[(round + i) % 9]);
		x[5] = add(x[5], tweak[round % 3]);
		x[6] = add(x[6], tweak[(round + 1) % 3]);
		x[7] = add(x[7], [0, round]);
	}
	for (var i = 0; i < 8; i++)
		c[i] = xor(t[i], x[i]);
}
},{"./helper":7,"./op":11}],"hash":[function(require,module,exports){
'use strict';

var blake = require('./lib/blake');
var keccak = require('./lib/keccak').keccak_512;
var skein = require('./lib/skein');
var luffa = require('./lib/luffa');
var simd = require('./lib/simd');
var shavite = require('./lib/shavite');
var cubehash = require('./lib/cubehash');
var jh = require('./lib/jh');
var echo = require('./lib/echo');
var groestl = require('./lib/groestl');
var bmw = require('./lib/bmw');
var h = require('./lib/helper');

//var fox = 'The quick brown fox jumps over the lazy dog';
// var empty = '';
// var dash = 'DASH';
// var longDream = 'Take this kiss upon the brow! And, in parting from you now, Thus much let me avow-- You are not wrong, who deem That my days have been a dream; Yet if hope has flown away In a night, or in a day, In a vision, or in none, Is it therefore the less gone? All that we see or seem Is but a dream within a dream. I stand amid the roar Of a surf-tormented shore, And I hold within my hand Grains of the golden sand-- How few! yet how they creep Through my fingers to the deep, While I weep--while I weep! O God! can I not grasp Them with a tighter clasp? O God! can I not save One from the pitiless wave? Is all that we see or seem But a dream within a dream?';
// var int32 = [-1245000620, -1578223460, 654805539, -1068884769, -968029107, -8582190, 491541657, 290156804, 1046922525, 1254877013, -1307320917, 1691597203, 55068107, 1715389297, 252729336, 127805489];

var hash = module.exports;

module.exports.blake = function(str,format, output) {
  return blake(str,format,output);
}

module.exports.bmw = function(str,format, output) {
  return bmw(str,format,output);
}

module.exports.cubehash = function(str,format, output) {
  return cubehash(str,format,output);
}

module.exports.echo = function(str,format, output) {
  return echo(str,format,output);
}

module.exports.groestl = function(str,format, output) {
  return groestl(str,format,output);
}

module.exports.jh = function(str,format, output) {
  return jh(str,format,output);
}

module.exports.keccak = function(str,format, output) {
  var msg = str;
  if (format === 2) {
    msg = h.int32Buffer2Bytes(str);
  }
  if (output === 1) {
    return keccak['array'](msg);
  } else if (output === 2) {
    return h.bytes2Int32Buffer(keccak['array'](msg));
  } else {
    return keccak['hex'](msg);
  }
}


module.exports.luffa = function(str,format, output) {
  return luffa(str,format,output);
}

module.exports.shavite = function(str,format, output) {
  return shavite(str,format,output);
}

module.exports.simd = function(str,format, output) {
  return simd(str,format,output);
}

module.exports.skein = function(str,format, output) {
  return skein(str,format,output);
}


module.exports.x11 = function(str,format, output) {
  var a = blake(str,format,2);
  a = bmw(a,2,2);
  a = groestl(a,2,2);
  a = skein(a,2,2);
  a = jh(a,2,2);
  a = this.keccak(a,2,1);
  a = luffa(a,1,2);
  a = cubehash(a,2,2);
  a = shavite(a,2,2);
  a = simd(a,2,2);
  a = echo(a,2,2);
  a = a.slice(0,8);
  if (output === 1) {
    return a;
  }
  else if (output === 2) {
    return h.int32Buffer2Bytes(a);
  }
  else {
    return h.int32ArrayToHexString(a);
  }
}


// console.log(this.groestl(longDream));
// console.log(this.cubehash(longDream));
// console.log(this.echo(longDream));
// console.log(cubehash(int32,2));
// console.log(this.x11(fox));
},{"./lib/blake":2,"./lib/bmw":3,"./lib/cubehash":4,"./lib/echo":5,"./lib/groestl":6,"./lib/helper":7,"./lib/jh":8,"./lib/keccak":9,"./lib/luffa":10,"./lib/shavite":12,"./lib/simd":13,"./lib/skein":14}]},{},[]);
