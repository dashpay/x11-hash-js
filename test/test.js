'use strict';

var x11 = require('../');
var expect    = require("chai").expect;

var fox = 'The quick brown fox jumps over the lazy dog';
var empty = '';
var dash = 'DASH';
var longDream = 'Take this kiss upon the brow! And, in parting from you now, Thus much let me avow-- You are not wrong, who deem That my days have been a dream; Yet if hope has flown away In a night, or in a day, In a vision, or in none, Is it therefore the less gone? All that we see or seem Is but a dream within a dream. I stand amid the roar Of a surf-tormented shore, And I hold within my hand Grains of the golden sand-- How few! yet how they creep Through my fingers to the deep, While I weep--while I weep! O God! can I not grasp Them with a tighter clasp? O God! can I not save One from the pitiless wave? Is all that we see or seem But a dream within a dream?';
var int32 = [-1245000620, -1578223460, 654805539, -1068884769, -968029107, -8582190, 491541657, 290156804, 1046922525, 1254877013, -1307320917, 1691597203, 55068107, 1715389297, 252729336, 127805489];

describe("X11 Hash Functions", function() {
  describe("blake", function() {
    it("empty string", function() {
      expect(x11.blake(empty)).to.equal("a8cfbbd73726062df0c6864dda65defe58ef0cc52a5625090fa17601e1eecd1b628e94f396ae402a00acc9eab77b4d4c2e852aaaa25a636d80af3fc7913ef5b8");
    });
    it("fox string", function() {
      expect(x11.blake(fox)).to.equal("1f7e26f63b6ad25a0896fd978fd050a1766391d2fd0471a77afb975e5034b7ad2d9ccf8dfb47abbbe656e1b82fbc634ba42ce186e8dc5e1ce09a885d41f43451");
    });
    it("dash string", function() {
      expect(x11.blake(dash)).to.equal("d187e862889f3d3eb106e825b3ea4385f88a750cb6614d18219f9809ccd25874d46e856e741e334daf160270031280f61cca5c807ced7f4a7bf8beba1fd9a053");
    });
    it("dream string", function() {
      expect(x11.blake(longDream)).to.equal("f1323b1e875cf2b02058cf4ac11e97dff4cfb48c86253961458dc7bcd1e61c4df47a7b441d5083b2275209dc0d28a2bc802a5fdbf10537454026e369e949428e");
    });
    it("int32", function() {
      expect(x11.blake(int32,2)).to.equal("8305e9ea49cc8f30906844ae07555b8085f8ce44f7fddbc9c5ff6c50295dfc35f7d4fbb20ed4c3aa9d9601d48580b1d896689d490708103baab29ebf8ae4c5db");
    });
  });
  
  
  describe("BMW", function() {
    it("empty string", function() {
      expect(x11.bmw(empty)).to.equal("6a725655c42bc8a2a20549dd5a233a6a2beb01616975851fd122504e604b46af7d96697d0b6333db1d1709d6df328d2a6c786551b0cce2255e8c7332b4819c0e");
    });
    it("fox string", function() {
      expect(x11.bmw(fox)).to.equal("2998d4cb31323e1169b458ab03a54d0b68e411a3c7cc7612adbf05bf901b8197dfd852c1c0099c09717d2fad3537207e737c6159c31d377d1ab8f5ed1ceeea06");
    });
    it("dash string", function() {
      expect(x11.bmw(dash)).to.equal("4146f08952d34cb498486dc0a063939d7f7be69ede232f379f93c08091ea6d13d6ebdb4e06fe24030f7ca9ac07b8f59e5cfadbb05bded3b9bb3a9abecea031cb");
    });
    it("dream string", function() {
      expect(x11.bmw(longDream)).to.equal("a2fd4436b4c481a4e31847f3c3af8d64810102c776bdaadd5558520edd6f90f30e1dd9450a0aa75c4b34410e0a61a3c26c7991a8f19967a1f452582337a68cb5");
    });
    it("int32", function() {
      expect(x11.bmw(int32,2)).to.equal("da21a7228a373f438523725cdac884bcc864f35d2228242dd054fced566b136b27103b41ded31488be3da69c86ed37fe3290f156ecdb57e7c47adfe909aa48a2");
    });
  });
  
  describe("cubehash", function() {
    it("empty string", function() {
      expect(x11.cubehash(empty)).to.equal("4a1d00bbcfcb5a9562fb981e7f7db3350fe2658639d948b9d57452c22328bb32f468b072208450bad5ee178271408be0b16e5633ac8a1e3cf9864cfbfc8e043a");
    });
    it("fox string", function() {
      expect(x11.cubehash(fox)).to.equal("bdba44a28cd16b774bdf3c9511def1a2baf39d4ef98b92c27cf5e37beb8990b7cdb6575dae1a548330780810618b8a5c351c1368904db7ebdf8857d596083a86");
    });
    it("dash string", function() {
      expect(x11.cubehash(dash)).to.equal("3258d531a2c1fd2006d67d739b7a15a249d9c8cdbeabe51561a38d02ebdd0f15f41b9515001d3993d8f462925b015d53494c5b4dc6e046647c6e8b6b620b4d15");
    });
    it("dream string", function() {
      expect(x11.cubehash(longDream)).to.equal("d628c68d46d0aa676e3899d2136c8349f4217b3206a1d9101de8bb40e45e772ad2d8ce820cebb59357db5516367f4e8990e0c324eaa2d31b574235cc3ba888ca");
    });
    it("int32", function() {
      expect(x11.cubehash(int32,2)).to.equal("3ce006e60529195db33e8490a085930b004e30a9c9ce7754c1e554a956bab65b19fb03586fa3ff50b7001686bc8fea41c2af6a4472345f2b8ebebcaf9cdad600");
    });
  });
  
  describe("echo", function() {
    it("empty string", function() {
      expect(x11.echo(empty)).to.equal("158f58cc79d300a9aa292515049275d051a28ab931726d0ec44bdd9faef4a702c36db9e7922fff077402236465833c5cc76af4efc352b4b44c7fa15aa0ef234e");
    });
    it("fox string", function() {
      expect(x11.echo(fox)).to.equal("fe61eba97bdfcaa027ded44a5f883fcb900b97449596d7b4a7187c76e71ad750e6117b529bd69992bec015bef862d16d62c384b600cb300d486e565f94202abf");
    });
    it("dash string", function() {
      expect(x11.echo(dash)).to.equal("42a2ee2bb582f59d1be01e4a24ed31041aa1898a3c6c2efe6956e5c6b9eb33d4a9f390f6eccdb7c757d4cb6ad3d3aed302d97740fdf78f569f599ab8cd71ff49");
    });
    it("dream string", function() {
      expect(x11.echo(longDream)).to.equal("1b357deeac6e3dc2458fa71023c61b06e3756fb7a1ec81ebb6e5ef0124d1609e240921efa1599098000433c01cc2c766b5c4562949be8e3a5020d1c249c05e6d");
    });
    it("int32", function() {
      expect(x11.echo(int32,2)).to.equal("cb8ff728a325fbed34454df9b862816deb0fcaf818ec029513277f1ed2d2f82440f380832f5ef984f56fd6c48a39616811d5af0e411d8ebe2862816b2e0c6c01");
    });
  });
  
  describe("groestl", function() {
    it("empty string", function() {
      expect(x11.groestl(empty)).to.equal("6d3ad29d279110eef3adbd66de2a0345a77baede1557f5d099fce0c03d6dc2ba8e6d4a6633dfbd66053c20faa87d1a11f39a7fbe4a6c2f009801370308fc4ad8");
    });
    it("fox string", function() {
      expect(x11.groestl(fox)).to.equal("badc1f70ccd69e0cf3760c3f93884289da84ec13c70b3d12a53a7a8a4a513f99715d46288f55e1dbf926e6d084a0538e4eebfc91cf2b21452921ccde9131718d");
    });
    it("dash string", function() {
      expect(x11.groestl(dash)).to.equal("f4c9ce627e2ed9d79c6942e5ff22939048afa1e59ce2f1adeec3f22ea6e7d7f39b8b15c543a4eae74bf9df7a2e9a987dbb4d17537cbb26e994499cd5c22907df");
    });
    it("dream string", function() {
      expect(x11.groestl(longDream)).to.equal("c678ea36128ff654d371609b3d68e509e99a0920c076b0214600a5184e6bdadfc4cd37b02a33dbdd2374b1151f2f07a7fcde61d56333dbc85d1791f6dc1d0b61");
    });
    it("int32", function() {
      expect(x11.groestl(int32,2)).to.equal("b62c929b4db0a8a15fa862b1cf6b5043b939fef6be0659d2efb5c0089f53620e40d113c8e441c5009fbba6dd098992da0d357fb27b2bf29ec21887d780ae2ec2");
    });
  });
  
  describe("jh", function() {
    it("empty string", function() {
      expect(x11.jh(empty)).to.equal("90ecf2f76f9d2c8017d979ad5ab96b87d58fc8fc4b83060f3f900774faa2c8fabe69c5f4ff1ec2b61d6b316941cedee117fb04b1f4c5bc1b919ae841c50eec4f");
    });
    it("fox string", function() {
      expect(x11.jh(fox)).to.equal("043f14e7c0775e7b1ef5ad657b1e858250b21e2e61fd699783f8634cb86f3ff938451cabd0c8cdae91d4f659d3f9f6f654f1bfedca117ffba735c15fedda47a3");
    });
    it("dash string", function() {
      expect(x11.jh(dash)).to.equal("9999b3770256821e3a74c780ada66013df52378103addef0bceaac4be4f889d5ff93dc99d654310cc0063f15baa4ab168a2d8b6301104905619c334a92f521a1");
    });
    it("dream string", function() {
      expect(x11.jh(longDream)).to.equal("007693ed766b8427eb1b07f5624146f2613c3ba0e69a1ea481428ecf8053970cd9e22608a0fd21aa78e5390a71f48fabf310bcc4de24a8c6fd1c51a81fd448a8");
    });
    it("int32", function() {
      expect(x11.jh(int32,2)).to.equal("a76659570f4f3e8d31000141a2ad2e2ed86d33780a71913e02eb6e8898cb55b09c939fb2052b54a205772e1ecc1a2c70f837d5648f287376d7b72e4e0c749c49");
    });
  });
  
  describe("keccak", function() {
    it("empty string", function() {
      expect(x11.keccak(empty)).to.equal("0eab42de4c3ceb9235fc91acffe746b29c29a8c366b7c60e4e67c466f36a4304c00fa9caf9d87976ba469bcbe06713b435f091ef2769fb160cdab33d3670680e");
    });
    it("fox string", function() {
      expect(x11.keccak(fox)).to.equal("d135bb84d0439dbac432247ee573a23ea7d3c9deb2a968eb31d47c4fb45f1ef4422d6c531b5b9bd6f449ebcc449ea94d0a8f05f62130fda612da53c79659f609");
    });
    it("dash string", function() {
      expect(x11.keccak(dash)).to.equal("b166196bc60ee0a6d355d3b2e9418fd7b89d49308bdec6e78e3a47e126421966aacb875bd881b4c2987ae37b3cc31774aa2e2847c967f82338ce4046cb593eb6");
    });
    it("dream string", function() {
      expect(x11.keccak(longDream)).to.equal("fea769af10da95a6ba64542cc2c575080a22af3c468d70056cd141bb6c04da19676eb469c4e37492510d321190aae0c3196a3db87f9941c7d5eceed9b5e00f7a");
    });
    it("int32", function() {
      expect(x11.keccak(int32,2)).to.equal("6c0fedd5fb03e8e7075d4bfc8f4e26262a47aa373bf1ff0a25cd3f168b5ed1ef59a40231098a57a3fee96a3f19250ffe49d0728507c82bf0c40fe10242d30f1c");
    });
  });
  
  describe("luffa", function() {
    it("empty string", function() {
      expect(x11.luffa(empty)).to.equal("6e7de4501189b3ca58f3ac114916654bbcd4922024b4cc1cd764acfe8ab4b7805df133eab345ffdb1c414564c924f48e0a301824e2ac4c34bd4efde2e43da90e");
    });
    it("fox string", function() {
      expect(x11.luffa(fox)).to.equal("459e2280a7cdb0c721d8d9dbeb9ed339659dc9e7b158e9dd2d328d946cb21474dc9177edfc93602f1aadb31944c795c9b5df859a3dc6132d4f0a4c476aaf797f");
    });
    it("dash string", function() {
      expect(x11.luffa(dash)).to.equal("7181d2550acde547eff499c1d533293f6bf4a0464dd9f2264ff5f35e17bb3238a6f7eb036645119a7575627f65fd74288c9581f6cf8a8df034547900aa86d634");
    });
    it("dream string", function() {
      expect(x11.luffa(longDream)).to.equal("570d89629d59804454c8f3ab205e3dadd2dd7d27dccf1bc6ae99d854360b817d3ef6c75d9a2753779e5e893f06572c3e51b7d220747c405380bab02f47cc949c");
    });
    it("int32", function() {
      expect(x11.luffa(int32,2)).to.equal("6023f30947ec516eb21810b7a85b5beb3477e62831c666d21346c830ab09e1c686d7a81847fcb1d52d0feaf33bca9e44b31773733705f396e739f74a3f935c8b");
    });
  });  

  describe("shavite", function() {
    it("empty string", function() {
      expect(x11.shavite(empty)).to.equal("a485c1b2578459d1efc5dddd840bb0b4a650ac82fe68f58c4442ccda747da006b2d1dc6b4a4eb7d84ff91e1f466fef429d259acd995dddcad16fa545c7a6e5ba");
    });
    it("fox string", function() {
      expect(x11.shavite(fox)).to.equal("4dbd97835c4e5cfa14799884a7adc96688dd808ff53d5c4cfe7db89a55ee98d0260791ec0c9b5466482ab3f6f236da7e65e1cb6d1ee624f61a5b2b79f63c4120");
    });
    it("dash string", function() {
      expect(x11.shavite(dash)).to.equal("45f24351ef4f5b7477214efe97f8cef4d69007e94e1e5f397011c4fecd4517fe69c509ea6aa758a9055dd6d0864b885498f4fdab5cc0458dbf98e7069b2c52dd");
    });
    it("dream string", function() {
      expect(x11.shavite(longDream)).to.equal("62f5a238a53ca81d49ef1282fcd94256895899a8536481493803604f91ad82630682eb35579a384430954e2b4d863f8b7dda50b9346df23db58b874031e4b65d");
    });
    it("int32", function() {
      expect(x11.shavite(int32,2)).to.equal("ba96b7af4ee87106b7cc2c0ba6b7c2682e0c32e4035a0dcb4cbd16e61c619d875154c18e473ac19180061791b4a0c1fdbc755d5b0d8d349c0dd4a8cc9632b314");
    });
  });
  
  describe("simd", function() {
    it("empty string", function() {
      expect(x11.simd(empty)).to.equal("51a5af7e243cd9a5989f7792c880c4c3168c3d60c4518725fe5757d1f7a69c6366977eaba7905ce2da5d7cfd07773725f0935b55f3efb954996689a49b6d29e0");
    });
    it("fox string", function() {
      expect(x11.simd(fox)).to.equal("ca493ce78cc2a63b5a48393e61d113d59a930b3e76d062ab58177345c48b59890a08661d04dd6160a1b42d215f1e303d97ab0abb54e65f758f79aee2b182b34b");
    });
    it("dash string", function() {
      expect(x11.simd(dash)).to.equal("e736a132375bd8aa02d00ea3ff3f0ef4cb8fbdd0b3cf3d619cf3e270896d2911105dc9bf46c395db98f17601529d24b8fa89a28e75f73da110d91a19c44f8975");
    });
    it("dream string", function() {
      expect(x11.simd(longDream)).to.equal("0b73b8ba451b53acc9c489ed5b5233429525abcacc63378e31883323b5630546337b2ece37688fd91507c60f7f3ac5494bc104451b776103e7dd308a3fb4d1c8");
    });
    it("int32", function() {
      expect(x11.simd(int32,2)).to.equal("e4e176b21fa5453267af41fac25aea3519ddf9a6e734c240508216f159ce01188a6024955c689030a1558fa9d4f94835046d4d77c27c607ee4582e554e81dfe4");
    });
  });  
  
  describe("skein", function() {
    it("empty string", function() {
      expect(x11.skein(empty)).to.equal("bc5b4c50925519c290cc634277ae3d6257212395cba733bbad37a4af0fa06af41fca7903d06564fea7a2d3730dbdb80c1f85562dfcc070334ea4d1d9e72cba7a");
    });
    it("fox string", function() {
      expect(x11.skein(fox)).to.equal("94c2ae036dba8783d0b3f7d6cc111ff810702f5c77707999be7e1c9486ff238a7044de734293147359b4ac7e1d09cd247c351d69826b78dcddd951f0ef912713");
    });
    it("dash string", function() {
      expect(x11.skein(dash)).to.equal("1db131ba5bc4b3ec9e381a752b3f0d53e8dd25e3d22aa8b9f17b570c3b5938833b91a54939ba873d28483e8b936f9584f06e80b1232a716a074377abd5c2b3f0");
    });
    it("dream string", function() {
      expect(x11.skein(longDream)).to.equal("56eda4c36c514c2088ca4fc80f53aa083041ccc070b933f450e748cb432fa664821fd0f1d07e9ef2db3e2d6864d1a6239009b55767d9d7de7789734b351e7c00");
    });
    it("int32", function() {
      expect(x11.skein(int32,2)).to.equal("a66d180741a60737bdfc6a94f92bed9726bf03f162de2dc0829d1b285b1d2fbcd132ca42e97b178a97268a8d3e0f0f6548ea305e5c3ac2b5a9a2d1c9bd9f7fac");
    });
  });  
  
  describe("x11", function() {
    it("empty string", function() {
      expect(x11.digest(empty)).to.equal("51b572209083576ea221c27e62b4e22063257571ccb6cc3dc3cd17eb67584eba");
    });
    it("fox string", function() {
      expect(x11.digest(fox)).to.equal("534536a4e4f16b32447f02f77200449dc2f23b532e3d9878fe111c9de666bc5c");
    });
    it("dash string", function() {
      expect(x11.digest(dash)).to.equal("fe809ebca8753d907f6ad32cdcf8e5c4e090d7bece5df35b2147e10b88c12d26");
    });
    it("dream string", function() {
      expect(x11.digest(longDream)).to.equal("5c0996b9d49dbe84e29f1b818c1fa9e73549f894a71b8a258964b8f0ecf3c866");
    });
    // TODO:
    //it("int32", function() {
    //  expect(x11.digest(int32,2)).to.equal("?");
    //});
  });
});