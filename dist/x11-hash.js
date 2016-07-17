require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var op = require('./op');
var h = require('./helper');

var AES0 = h.bytes2Int32Buffer(h.b64Decode("pWNjxoR8fPiZd3fujXt79g3y8v+9a2vWsW9v3lTFxZFQMDBgAwEBAqlnZ859KytWGf7+52LX17Xmq6tNmnZ27EXKyo+dgoIfQMnJiYd9ffoV+vrv61lZsslHR44L8PD77K2tQWfU1LP9oqJf6q+vRb+cnCP3pKRTlnJy5FvAwJvCt7d1HP394a6Tkz1qJiZMWjY2bEE/P34C9/f1T8zMg1w0NGj0paVRNOXl0Qjx8fmTcXHic9jYq1MxMWI/FRUqDAQECFLHx5VlIyNGXsPDnSgYGDChlpY3DwUFCrWami8JBwcONhISJJuAgBs94uLfJuvrzWknJ07NsrJ/n3V16hsJCRKeg4MddCwsWC4aGjQtGxs2sm5u3O5aWrT7oKBb9lJSpE07O3Zh1ta3zrOzfXspKVI+4+PdcS8vXpeEhBP1U1OmaNHRuQAAAAAs7e3BYCAgQB/8/OPIsbF57Vtbtr5qatRGy8uN2b6+Z0s5OXLeSkqU1ExMmOhYWLBKz8+Fa9DQuyrv78XlqqpPFvv77cVDQ4bXTU2aVTMzZpSFhRHPRUWKEPn56QYCAgSBf3/+8FBQoEQ8PHi6n58l46ioS/NRUaL+o6NdwEBAgIqPjwWtkpI/vJ2dIUg4OHAE9fXx37y8Y8G2tnd12tqvYyEhQjAQECAa///lDvPz/W3S0r9Mzc2BFAwMGDUTEyYv7OzD4V9fvqKXlzXMRESIORcXLlfExJPyp6dVgn5+/Ec9PXqsZGTI511duisZGTKVc3PmoGBgwJiBgRnRT0+ef9zco2YiIkR+KipUq5CQO4OIiAvKRkaMKe7ux9O4uGs8FBQoed7ep+JeXrwdCwsWdtvbrTvg4NtWMjJkTjo6dB4KChTbSUmSCgYGDGwkJEjkXFy4XcLCn27T073vrKxDpmJixKiRkTmklZUxN+Tk04t5efIy5+fVQ8jIi1k3N263bW3ajI2NAWTV1bHSTk6c4KmpSbRsbNj6VlasB/T08yXq6s+vZWXKjnp69OmurkcYCAgQ1bq6b4h4ePBvJSVKci4uXCQcHDjxpqZXx7S0c1HGxpcj6OjLfN3doZx0dOghHx8+3UtLlty9vWGGi4sNhYqKD5BwcOBCPj58xLW1capmZszYSEiQBQMDBgH29vcSDg4co2Fhwl81NWr5V1eu0Lm5aZGGhhdYwcGZJx0dOrmenic44eHZE/j467OYmCszEREiu2lp0nDZ2amJjo4Hp5SUM7abmy0iHh48koeHFSDp6clJzs6H/1VVqngoKFB639+lj4yMA/ihoVmAiYkJFw0NGtq/v2Ux5ubXxkJChLhoaNDDQUGCsJmZKXctLVoRDw8ey7Cwe/xUVKjWu7ttOhYWLA=="));
var AES1 = h.bytes2Int32Buffer(h.b64Decode("Y2PGpXx8+IR3d+6Ze3v2jfLy/w1ra9a9b2/escXFkVQwMGBQAQECA2dnzqkrK1Z9/v7nGdfXtWKrq03mdnbsmsrKj0WCgh+dycmJQH19+of6+u8VWVmy60dHjsnw8PsLra1B7NTUs2eiol/9r69F6pycI7+kpFP3cnLklsDAm1u3t3XC/f3hHJOTPa4mJkxqNjZsWj8/fkH39/UCzMyDTzQ0aFylpVH05eXRNPHx+QhxceKT2NirczExYlMVFSo/BAQIDMfHlVIjI0Zlw8OdXhgYMCiWljehBQUKD5qaL7UHBw4JEhIkNoCAG5vi4t896+vNJicnTmmysn/NdXXqnwkJEhuDgx2eLCxYdBoaNC4bGzYtbm7cslpatO6goFv7UlKk9js7dk3W1rdhs7N9zikpUnvj490+Ly9ecYSEE5dTU6b10dG5aAAAAADt7cEsICBAYPz84x+xsXnIW1u27Wpq1L7Ly41Gvr5n2Tk5cktKSpTeTEyY1FhYsOjPz4VK0NC7a+/vxSqqqk/l+/vtFkNDhsVNTZrXMzNmVYWFEZRFRYrP+fnpEAICBAZ/f/6BUFCg8Dw8eESfnyW6qKhL41FRovOjo13+QECAwI+PBYqSkj+tnZ0hvDg4cEj19fEEvLxj37a2d8Ha2q91ISFCYxAQIDD//+Ua8/P9DtLSv23NzYFMDAwYFBMTJjXs7MMvX1++4ZeXNaJERIjMFxcuOcTEk1enp1Xyfn78gj09ekdkZMisXV265xkZMitzc+aVYGDAoIGBGZhPT57R3NyjfyIiRGYqKlR+kJA7q4iIC4NGRozK7u7HKbi4a9MUFCg83t6neV5evOILCxYd29utduDg2zsyMmRWOjp0TgoKFB5JSZLbBgYMCiQkSGxcXLjkwsKfXdPTvW6srEPvYmLEppGROaiVlTGk5OTTN3l58ovn59UyyMiLQzc3blltbdq3jY0BjNXVsWROTpzSqalJ4Gxs2LRWVqz69PTzB+rqzyVlZcqvenr0jq6uR+kICBAYurpv1Xh48IglJUpvLi5cchwcOCSmplfxtLRzx8bGl1Ho6Msj3d2hfHR06JwfHz4hS0uW3b29YdyLiw2GiooPhXBw4JA+PnxCtbVxxGZmzKpISJDYAwMGBfb29wEODhwSYWHCozU1al9XV675ublp0IaGF5HBwZlYHR06J56eJ7nh4dk4+PjrE5iYK7MRESIzaWnSu9nZqXCOjgeJlJQzp5ubLbYeHjwih4cVkunpySDOzodJVVWq/ygoUHjf36V6jIwDj6GhWfiJiQmADQ0aF7+/Zdrm5tcxQkKExmho0LhBQYLDmZkpsC0tWncPDx4RsLB7y1RUqPy7u23WFhYsOg=="));
var AES2 = h.bytes2Int32Buffer(h.b64Decode("Y8alY3z4hHx37pl3e/aNe/L/DfJr1r1rb96xb8WRVMUwYFAwAQIDAWfOqWcrVn0r/ucZ/te1YterTearduyadsqPRcqCH52CyYlAyX36h3367xX6WbLrWUeOyUfw+wvwrUHsrdSzZ9SiX/2ir0Xqr5wjv5ykU/ekcuSWcsCbW8C3dcK3/eEc/ZM9rpMmTGomNmxaNj9+QT/39QL3zINPzDRoXDSlUfSl5dE05fH5CPFx4pNx2Ktz2DFiUzEVKj8VBAgMBMeVUscjRmUjw51ewxgwKBiWN6GWBQoPBZovtZoHDgkHEiQ2EoAbm4Di3z3i680m6ydOaSeyf82ydeqfdQkSGwmDHZ6DLFh0LBo0LhobNi0bbtyyblq07lqgW/ugUqT2Ujt2TTvWt2HWs33OsylSeynj3T7jL15xL4QTl4RTpvVT0blo0QAAAADtwSztIEBgIPzjH/yxecixW7btW2rUvmrLjUbLvmfZvjlySzlKlN5KTJjUTFiw6FjPhUrP0Ltr0O/FKu+qT+Wq++0W+0OGxUNNmtdNM2ZVM4URlIVFis9F+ekQ+QIEBgJ//oF/UKDwUDx4RDyfJbqfqEvjqFGi81GjXf6jQIDAQI8Fio+SP62SnSG8nThwSDj18QT1vGPfvLZ3wbbar3XaIUJjIRAgMBD/5Rr/8/0O89K/bdLNgUzNDBgUDBMmNRPswy/sX77hX5c1opdEiMxEFy45F8STV8SnVfKnfvyCfj16Rz1kyKxkXbrnXRkyKxlz5pVzYMCgYIEZmIFPntFP3KN/3CJEZiIqVH4qkDurkIgLg4hGjMpG7scp7rhr07gUKDwU3qd53l684l4LFh0L26122+DbO+AyZFYyOnROOgoUHgpJkttJBgwKBiRIbCRcuORcwp9dwtO9btOsQ++sYsSmYpE5qJGVMaSV5NM35Hnyi3nn1TLnyItDyDduWTdt2rdtjQGMjdWxZNVOnNJOqUngqWzYtGxWrPpW9PMH9OrPJeplyq9levSOeq5H6a4IEBgIum/VunjwiHglSm8lLlxyLhw4JBymV/GmtHPHtMaXUcboyyPo3aF83XTonHQfPiEfS5bdS71h3L2LDYaLig+FinDgkHA+fEI+tXHEtWbMqmZIkNhIAwYFA/b3AfYOHBIOYcKjYTVqXzVXrvlXuWnQuYYXkYbBmVjBHTonHZ4nuZ7h2Tjh+OsT+Jgrs5gRIjMRadK7admpcNmOB4mOlDOnlJsttpsePCIehxWSh+nJIOnOh0nOVar/VShQeCjfpXrfjAOPjKFZ+KGJCYCJDRoXDb9l2r/m1zHmQoTGQmjQuGhBgsNBmSmwmS1ady0PHhEPsHvLsFSo/FS7bda7Fiw6Fg=="));
var AES3 = h.bytes2Int32Buffer(h.b64Decode("xqVjY/iEfHzumXd39o17e/8N8vLWvWtr3rFvb5FUxcVgUDAwAgMBAc6pZ2dWfSsr5xn+/rVi19dN5qur7Jp2do9FysofnYKCiUDJyfqHfX3vFfr6sutZWY7JR0f7C/DwQeytrbNn1NRf/aKiReqvryO/nJxT96Sk5JZycptbwMB1wre34Rz9/T2uk5NMaiYmbFo2Nn5BPz/1Avf3g0/MzGhcNDRR9KWl0TTl5fkI8fHik3Fxq3PY2GJTMTEqPxUVCAwEBJVSx8dGZSMjnV7DwzAoGBg3oZaWCg8FBS+1mpoOCQcHJDYSEhubgIDfPeLizSbr605pJyd/zbKy6p91dRIbCQkdnoODWHQsLDQuGho2LRsb3LJubrTuWlpb+6CgpPZSUnZNOzu3YdbWfc6zs1J7KSndPuPjXnEvLxOXhISm9VNTuWjR0QAAAADBLO3tQGAgIOMf/Px5yLGxtu1bW9S+amqNRsvLZ9m+vnJLOTmU3kpKmNRMTLDoWFiFSs/Pu2vQ0MUq7+9P5aqq7Rb7+4bFQ0Oa101NZlUzMxGUhYWKz0VF6RD5+QQGAgL+gX9/oPBQUHhEPDwlup+fS+OoqKLzUVFd/qOjgMBAQAWKj48/rZKSIbydnXBIODjxBPX1Y9+8vHfBtravddraQmMhISAwEBDlGv///Q7z879t0tKBTM3NGBQMDCY1ExPDL+zsvuFfXzWil5eIzERELjkXF5NXxMRV8qen/IJ+fnpHPT3IrGRkuuddXTIrGRnmlXNzwKBgYBmYgYGe0U9Po3/c3ERmIiJUfioqO6uQkAuDiIiMykZGxynu7mvTuLgoPBQUp3ne3rziXl4WHQsLrXbb29s74OBkVjIydE46OhQeCgqS20lJDAoGBkhsJCS45Fxcn13Cwr1u09ND76ysxKZiYjmokZExpJWV0zfk5PKLeXnVMufni0PIyG5ZNzfat21tAYyNjbFk1dWc0k5OSeCpqdi0bGys+lZW8wf09M8l6urKr2Vl9I56ekfprq4QGAgIb9W6uvCIeHhKbyUlXHIuLjgkHBxX8aamc8e0tJdRxsbLI+jooXzd3eicdHQ+IR8flt1LS2Hcvb0NhouLD4WKiuCQcHB8Qj4+ccS1tcyqZmaQ2EhIBgUDA/cB9vYcEg4OwqNhYWpfNTWu+VdXadC5uReRhoaZWMHBOicdHSe5np7ZOOHh6xP4+CuzmJgiMxER0rtpaalw2dkHiY6OM6eUlC22m5s8Ih4eFZKHh8kg6emHSc7Oqv9VVVB4KCilet/fA4+MjFn4oaEJgImJGhcNDWXav7/XMebmhMZCQtC4aGiCw0FBKbCZmVp3LS0eEQ8Pe8uwsKj8VFRt1ru7LDoWFg=="));
// var AES0 = [
//     0xA56363C6, 0x847C7CF8, 0x997777EE, 0x8D7B7BF6,
//     0x0DF2F2FF, 0xBD6B6BD6, 0xB16F6FDE, 0x54C5C591,
//     0x50303060, 0x03010102, 0xA96767CE, 0x7D2B2B56,
//     0x19FEFEE7, 0x62D7D7B5, 0xE6ABAB4D, 0x9A7676EC,
//     0x45CACA8F, 0x9D82821F, 0x40C9C989, 0x877D7DFA,
//     0x15FAFAEF, 0xEB5959B2, 0xC947478E, 0x0BF0F0FB,
//     0xECADAD41, 0x67D4D4B3, 0xFDA2A25F, 0xEAAFAF45,
//     0xBF9C9C23, 0xF7A4A453, 0x967272E4, 0x5BC0C09B,
//     0xC2B7B775, 0x1CFDFDE1, 0xAE93933D, 0x6A26264C,
//     0x5A36366C, 0x413F3F7E, 0x02F7F7F5, 0x4FCCCC83,
//     0x5C343468, 0xF4A5A551, 0x34E5E5D1, 0x08F1F1F9,
//     0x937171E2, 0x73D8D8AB, 0x53313162, 0x3F15152A,
//     0x0C040408, 0x52C7C795, 0x65232346, 0x5EC3C39D,
//     0x28181830, 0xA1969637, 0x0F05050A, 0xB59A9A2F,
//     0x0907070E, 0x36121224, 0x9B80801B, 0x3DE2E2DF,
//     0x26EBEBCD, 0x6927274E, 0xCDB2B27F, 0x9F7575EA,
//     0x1B090912, 0x9E83831D, 0x742C2C58, 0x2E1A1A34,
//     0x2D1B1B36, 0xB26E6EDC, 0xEE5A5AB4, 0xFBA0A05B,
//     0xF65252A4, 0x4D3B3B76, 0x61D6D6B7, 0xCEB3B37D,
//     0x7B292952, 0x3EE3E3DD, 0x712F2F5E, 0x97848413,
//     0xF55353A6, 0x68D1D1B9, 0x00000000, 0x2CEDEDC1,
//     0x60202040, 0x1FFCFCE3, 0xC8B1B179, 0xED5B5BB6,
//     0xBE6A6AD4, 0x46CBCB8D, 0xD9BEBE67, 0x4B393972,
//     0xDE4A4A94, 0xD44C4C98, 0xE85858B0, 0x4ACFCF85,
//     0x6BD0D0BB, 0x2AEFEFC5, 0xE5AAAA4F, 0x16FBFBED,
//     0xC5434386, 0xD74D4D9A, 0x55333366, 0x94858511,
//     0xCF45458A, 0x10F9F9E9, 0x06020204, 0x817F7FFE,
//     0xF05050A0, 0x443C3C78, 0xBA9F9F25, 0xE3A8A84B,
//     0xF35151A2, 0xFEA3A35D, 0xC0404080, 0x8A8F8F05,
//     0xAD92923F, 0xBC9D9D21, 0x48383870, 0x04F5F5F1,
//     0xDFBCBC63, 0xC1B6B677, 0x75DADAAF, 0x63212142,
//     0x30101020, 0x1AFFFFE5, 0x0EF3F3FD, 0x6DD2D2BF,
//     0x4CCDCD81, 0x140C0C18, 0x35131326, 0x2FECECC3,
//     0xE15F5FBE, 0xA2979735, 0xCC444488, 0x3917172E,
//     0x57C4C493, 0xF2A7A755, 0x827E7EFC, 0x473D3D7A,
//     0xAC6464C8, 0xE75D5DBA, 0x2B191932, 0x957373E6,
//     0xA06060C0, 0x98818119, 0xD14F4F9E, 0x7FDCDCA3,
//     0x66222244, 0x7E2A2A54, 0xAB90903B, 0x8388880B,
//     0xCA46468C, 0x29EEEEC7, 0xD3B8B86B, 0x3C141428,
//     0x79DEDEA7, 0xE25E5EBC, 0x1D0B0B16, 0x76DBDBAD,
//     0x3BE0E0DB, 0x56323264, 0x4E3A3A74, 0x1E0A0A14,
//     0xDB494992, 0x0A06060C, 0x6C242448, 0xE45C5CB8,
//     0x5DC2C29F, 0x6ED3D3BD, 0xEFACAC43, 0xA66262C4,
//     0xA8919139, 0xA4959531, 0x37E4E4D3, 0x8B7979F2,
//     0x32E7E7D5, 0x43C8C88B, 0x5937376E, 0xB76D6DDA,
//     0x8C8D8D01, 0x64D5D5B1, 0xD24E4E9C, 0xE0A9A949,
//     0xB46C6CD8, 0xFA5656AC, 0x07F4F4F3, 0x25EAEACF,
//     0xAF6565CA, 0x8E7A7AF4, 0xE9AEAE47, 0x18080810,
//     0xD5BABA6F, 0x887878F0, 0x6F25254A, 0x722E2E5C,
//     0x241C1C38, 0xF1A6A657, 0xC7B4B473, 0x51C6C697,
//     0x23E8E8CB, 0x7CDDDDA1, 0x9C7474E8, 0x211F1F3E,
//     0xDD4B4B96, 0xDCBDBD61, 0x868B8B0D, 0x858A8A0F,
//     0x907070E0, 0x423E3E7C, 0xC4B5B571, 0xAA6666CC,
//     0xD8484890, 0x05030306, 0x01F6F6F7, 0x120E0E1C,
//     0xA36161C2, 0x5F35356A, 0xF95757AE, 0xD0B9B969,
//     0x91868617, 0x58C1C199, 0x271D1D3A, 0xB99E9E27,
//     0x38E1E1D9, 0x13F8F8EB, 0xB398982B, 0x33111122,
//     0xBB6969D2, 0x70D9D9A9, 0x898E8E07, 0xA7949433,
//     0xB69B9B2D, 0x221E1E3C, 0x92878715, 0x20E9E9C9,
//     0x49CECE87, 0xFF5555AA, 0x78282850, 0x7ADFDFA5,
//     0x8F8C8C03, 0xF8A1A159, 0x80898909, 0x170D0D1A,
//     0xDABFBF65, 0x31E6E6D7, 0xC6424284, 0xB86868D0,
//     0xC3414182, 0xB0999929, 0x772D2D5A, 0x110F0F1E,
//     0xCBB0B07B, 0xFC5454A8, 0xD6BBBB6D, 0x3A16162C
// ];

// var AES1 = [
//     0x6363C6A5, 0x7C7CF884, 0x7777EE99, 0x7B7BF68D,
//     0xF2F2FF0D, 0x6B6BD6BD, 0x6F6FDEB1, 0xC5C59154,
//     0x30306050, 0x01010203, 0x6767CEA9, 0x2B2B567D,
//     0xFEFEE719, 0xD7D7B562, 0xABAB4DE6, 0x7676EC9A,
//     0xCACA8F45, 0x82821F9D, 0xC9C98940, 0x7D7DFA87,
//     0xFAFAEF15, 0x5959B2EB, 0x47478EC9, 0xF0F0FB0B,
//     0xADAD41EC, 0xD4D4B367, 0xA2A25FFD, 0xAFAF45EA,
//     0x9C9C23BF, 0xA4A453F7, 0x7272E496, 0xC0C09B5B,
//     0xB7B775C2, 0xFDFDE11C, 0x93933DAE, 0x26264C6A,
//     0x36366C5A, 0x3F3F7E41, 0xF7F7F502, 0xCCCC834F,
//     0x3434685C, 0xA5A551F4, 0xE5E5D134, 0xF1F1F908,
//     0x7171E293, 0xD8D8AB73, 0x31316253, 0x15152A3F,
//     0x0404080C, 0xC7C79552, 0x23234665, 0xC3C39D5E,
//     0x18183028, 0x969637A1, 0x05050A0F, 0x9A9A2FB5,
//     0x07070E09, 0x12122436, 0x80801B9B, 0xE2E2DF3D,
//     0xEBEBCD26, 0x27274E69, 0xB2B27FCD, 0x7575EA9F,
//     0x0909121B, 0x83831D9E, 0x2C2C5874, 0x1A1A342E,
//     0x1B1B362D, 0x6E6EDCB2, 0x5A5AB4EE, 0xA0A05BFB,
//     0x5252A4F6, 0x3B3B764D, 0xD6D6B761, 0xB3B37DCE,
//     0x2929527B, 0xE3E3DD3E, 0x2F2F5E71, 0x84841397,
//     0x5353A6F5, 0xD1D1B968, 0x00000000, 0xEDEDC12C,
//     0x20204060, 0xFCFCE31F, 0xB1B179C8, 0x5B5BB6ED,
//     0x6A6AD4BE, 0xCBCB8D46, 0xBEBE67D9, 0x3939724B,
//     0x4A4A94DE, 0x4C4C98D4, 0x5858B0E8, 0xCFCF854A,
//     0xD0D0BB6B, 0xEFEFC52A, 0xAAAA4FE5, 0xFBFBED16,
//     0x434386C5, 0x4D4D9AD7, 0x33336655, 0x85851194,
//     0x45458ACF, 0xF9F9E910, 0x02020406, 0x7F7FFE81,
//     0x5050A0F0, 0x3C3C7844, 0x9F9F25BA, 0xA8A84BE3,
//     0x5151A2F3, 0xA3A35DFE, 0x404080C0, 0x8F8F058A,
//     0x92923FAD, 0x9D9D21BC, 0x38387048, 0xF5F5F104,
//     0xBCBC63DF, 0xB6B677C1, 0xDADAAF75, 0x21214263,
//     0x10102030, 0xFFFFE51A, 0xF3F3FD0E, 0xD2D2BF6D,
//     0xCDCD814C, 0x0C0C1814, 0x13132635, 0xECECC32F,
//     0x5F5FBEE1, 0x979735A2, 0x444488CC, 0x17172E39,
//     0xC4C49357, 0xA7A755F2, 0x7E7EFC82, 0x3D3D7A47,
//     0x6464C8AC, 0x5D5DBAE7, 0x1919322B, 0x7373E695,
//     0x6060C0A0, 0x81811998, 0x4F4F9ED1, 0xDCDCA37F,
//     0x22224466, 0x2A2A547E, 0x90903BAB, 0x88880B83,
//     0x46468CCA, 0xEEEEC729, 0xB8B86BD3, 0x1414283C,
//     0xDEDEA779, 0x5E5EBCE2, 0x0B0B161D, 0xDBDBAD76,
//     0xE0E0DB3B, 0x32326456, 0x3A3A744E, 0x0A0A141E,
//     0x494992DB, 0x06060C0A, 0x2424486C, 0x5C5CB8E4,
//     0xC2C29F5D, 0xD3D3BD6E, 0xACAC43EF, 0x6262C4A6,
//     0x919139A8, 0x959531A4, 0xE4E4D337, 0x7979F28B,
//     0xE7E7D532, 0xC8C88B43, 0x37376E59, 0x6D6DDAB7,
//     0x8D8D018C, 0xD5D5B164, 0x4E4E9CD2, 0xA9A949E0,
//     0x6C6CD8B4, 0x5656ACFA, 0xF4F4F307, 0xEAEACF25,
//     0x6565CAAF, 0x7A7AF48E, 0xAEAE47E9, 0x08081018,
//     0xBABA6FD5, 0x7878F088, 0x25254A6F, 0x2E2E5C72,
//     0x1C1C3824, 0xA6A657F1, 0xB4B473C7, 0xC6C69751,
//     0xE8E8CB23, 0xDDDDA17C, 0x7474E89C, 0x1F1F3E21,
//     0x4B4B96DD, 0xBDBD61DC, 0x8B8B0D86, 0x8A8A0F85,
//     0x7070E090, 0x3E3E7C42, 0xB5B571C4, 0x6666CCAA,
//     0x484890D8, 0x03030605, 0xF6F6F701, 0x0E0E1C12,
//     0x6161C2A3, 0x35356A5F, 0x5757AEF9, 0xB9B969D0,
//     0x86861791, 0xC1C19958, 0x1D1D3A27, 0x9E9E27B9,
//     0xE1E1D938, 0xF8F8EB13, 0x98982BB3, 0x11112233,
//     0x6969D2BB, 0xD9D9A970, 0x8E8E0789, 0x949433A7,
//     0x9B9B2DB6, 0x1E1E3C22, 0x87871592, 0xE9E9C920,
//     0xCECE8749, 0x5555AAFF, 0x28285078, 0xDFDFA57A,
//     0x8C8C038F, 0xA1A159F8, 0x89890980, 0x0D0D1A17,
//     0xBFBF65DA, 0xE6E6D731, 0x424284C6, 0x6868D0B8,
//     0x414182C3, 0x999929B0, 0x2D2D5A77, 0x0F0F1E11,
//     0xB0B07BCB, 0x5454A8FC, 0xBBBB6DD6, 0x16162C3A
// ];

// var AES2 = [
//     0x63C6A563, 0x7CF8847C, 0x77EE9977, 0x7BF68D7B,
//     0xF2FF0DF2, 0x6BD6BD6B, 0x6FDEB16F, 0xC59154C5,
//     0x30605030, 0x01020301, 0x67CEA967, 0x2B567D2B,
//     0xFEE719FE, 0xD7B562D7, 0xAB4DE6AB, 0x76EC9A76,
//     0xCA8F45CA, 0x821F9D82, 0xC98940C9, 0x7DFA877D,
//     0xFAEF15FA, 0x59B2EB59, 0x478EC947, 0xF0FB0BF0,
//     0xAD41ECAD, 0xD4B367D4, 0xA25FFDA2, 0xAF45EAAF,
//     0x9C23BF9C, 0xA453F7A4, 0x72E49672, 0xC09B5BC0,
//     0xB775C2B7, 0xFDE11CFD, 0x933DAE93, 0x264C6A26,
//     0x366C5A36, 0x3F7E413F, 0xF7F502F7, 0xCC834FCC,
//     0x34685C34, 0xA551F4A5, 0xE5D134E5, 0xF1F908F1,
//     0x71E29371, 0xD8AB73D8, 0x31625331, 0x152A3F15,
//     0x04080C04, 0xC79552C7, 0x23466523, 0xC39D5EC3,
//     0x18302818, 0x9637A196, 0x050A0F05, 0x9A2FB59A,
//     0x070E0907, 0x12243612, 0x801B9B80, 0xE2DF3DE2,
//     0xEBCD26EB, 0x274E6927, 0xB27FCDB2, 0x75EA9F75,
//     0x09121B09, 0x831D9E83, 0x2C58742C, 0x1A342E1A,
//     0x1B362D1B, 0x6EDCB26E, 0x5AB4EE5A, 0xA05BFBA0,
//     0x52A4F652, 0x3B764D3B, 0xD6B761D6, 0xB37DCEB3,
//     0x29527B29, 0xE3DD3EE3, 0x2F5E712F, 0x84139784,
//     0x53A6F553, 0xD1B968D1, 0x00000000, 0xEDC12CED,
//     0x20406020, 0xFCE31FFC, 0xB179C8B1, 0x5BB6ED5B,
//     0x6AD4BE6A, 0xCB8D46CB, 0xBE67D9BE, 0x39724B39,
//     0x4A94DE4A, 0x4C98D44C, 0x58B0E858, 0xCF854ACF,
//     0xD0BB6BD0, 0xEFC52AEF, 0xAA4FE5AA, 0xFBED16FB,
//     0x4386C543, 0x4D9AD74D, 0x33665533, 0x85119485,
//     0x458ACF45, 0xF9E910F9, 0x02040602, 0x7FFE817F,
//     0x50A0F050, 0x3C78443C, 0x9F25BA9F, 0xA84BE3A8,
//     0x51A2F351, 0xA35DFEA3, 0x4080C040, 0x8F058A8F,
//     0x923FAD92, 0x9D21BC9D, 0x38704838, 0xF5F104F5,
//     0xBC63DFBC, 0xB677C1B6, 0xDAAF75DA, 0x21426321,
//     0x10203010, 0xFFE51AFF, 0xF3FD0EF3, 0xD2BF6DD2,
//     0xCD814CCD, 0x0C18140C, 0x13263513, 0xECC32FEC,
//     0x5FBEE15F, 0x9735A297, 0x4488CC44, 0x172E3917,
//     0xC49357C4, 0xA755F2A7, 0x7EFC827E, 0x3D7A473D,
//     0x64C8AC64, 0x5DBAE75D, 0x19322B19, 0x73E69573,
//     0x60C0A060, 0x81199881, 0x4F9ED14F, 0xDCA37FDC,
//     0x22446622, 0x2A547E2A, 0x903BAB90, 0x880B8388,
//     0x468CCA46, 0xEEC729EE, 0xB86BD3B8, 0x14283C14,
//     0xDEA779DE, 0x5EBCE25E, 0x0B161D0B, 0xDBAD76DB,
//     0xE0DB3BE0, 0x32645632, 0x3A744E3A, 0x0A141E0A,
//     0x4992DB49, 0x060C0A06, 0x24486C24, 0x5CB8E45C,
//     0xC29F5DC2, 0xD3BD6ED3, 0xAC43EFAC, 0x62C4A662,
//     0x9139A891, 0x9531A495, 0xE4D337E4, 0x79F28B79,
//     0xE7D532E7, 0xC88B43C8, 0x376E5937, 0x6DDAB76D,
//     0x8D018C8D, 0xD5B164D5, 0x4E9CD24E, 0xA949E0A9,
//     0x6CD8B46C, 0x56ACFA56, 0xF4F307F4, 0xEACF25EA,
//     0x65CAAF65, 0x7AF48E7A, 0xAE47E9AE, 0x08101808,
//     0xBA6FD5BA, 0x78F08878, 0x254A6F25, 0x2E5C722E,
//     0x1C38241C, 0xA657F1A6, 0xB473C7B4, 0xC69751C6,
//     0xE8CB23E8, 0xDDA17CDD, 0x74E89C74, 0x1F3E211F,
//     0x4B96DD4B, 0xBD61DCBD, 0x8B0D868B, 0x8A0F858A,
//     0x70E09070, 0x3E7C423E, 0xB571C4B5, 0x66CCAA66,
//     0x4890D848, 0x03060503, 0xF6F701F6, 0x0E1C120E,
//     0x61C2A361, 0x356A5F35, 0x57AEF957, 0xB969D0B9,
//     0x86179186, 0xC19958C1, 0x1D3A271D, 0x9E27B99E,
//     0xE1D938E1, 0xF8EB13F8, 0x982BB398, 0x11223311,
//     0x69D2BB69, 0xD9A970D9, 0x8E07898E, 0x9433A794,
//     0x9B2DB69B, 0x1E3C221E, 0x87159287, 0xE9C920E9,
//     0xCE8749CE, 0x55AAFF55, 0x28507828, 0xDFA57ADF,
//     0x8C038F8C, 0xA159F8A1, 0x89098089, 0x0D1A170D,
//     0xBF65DABF, 0xE6D731E6, 0x4284C642, 0x68D0B868,
//     0x4182C341, 0x9929B099, 0x2D5A772D, 0x0F1E110F,
//     0xB07BCBB0, 0x54A8FC54, 0xBB6DD6BB, 0x162C3A16
// ];

// var AES3 = [
//     0xC6A56363, 0xF8847C7C, 0xEE997777, 0xF68D7B7B,
//     0xFF0DF2F2, 0xD6BD6B6B, 0xDEB16F6F, 0x9154C5C5,
//     0x60503030, 0x02030101, 0xCEA96767, 0x567D2B2B,
//     0xE719FEFE, 0xB562D7D7, 0x4DE6ABAB, 0xEC9A7676,
//     0x8F45CACA, 0x1F9D8282, 0x8940C9C9, 0xFA877D7D,
//     0xEF15FAFA, 0xB2EB5959, 0x8EC94747, 0xFB0BF0F0,
//     0x41ECADAD, 0xB367D4D4, 0x5FFDA2A2, 0x45EAAFAF,
//     0x23BF9C9C, 0x53F7A4A4, 0xE4967272, 0x9B5BC0C0,
//     0x75C2B7B7, 0xE11CFDFD, 0x3DAE9393, 0x4C6A2626,
//     0x6C5A3636, 0x7E413F3F, 0xF502F7F7, 0x834FCCCC,
//     0x685C3434, 0x51F4A5A5, 0xD134E5E5, 0xF908F1F1,
//     0xE2937171, 0xAB73D8D8, 0x62533131, 0x2A3F1515,
//     0x080C0404, 0x9552C7C7, 0x46652323, 0x9D5EC3C3,
//     0x30281818, 0x37A19696, 0x0A0F0505, 0x2FB59A9A,
//     0x0E090707, 0x24361212, 0x1B9B8080, 0xDF3DE2E2,
//     0xCD26EBEB, 0x4E692727, 0x7FCDB2B2, 0xEA9F7575,
//     0x121B0909, 0x1D9E8383, 0x58742C2C, 0x342E1A1A,
//     0x362D1B1B, 0xDCB26E6E, 0xB4EE5A5A, 0x5BFBA0A0,
//     0xA4F65252, 0x764D3B3B, 0xB761D6D6, 0x7DCEB3B3,
//     0x527B2929, 0xDD3EE3E3, 0x5E712F2F, 0x13978484,
//     0xA6F55353, 0xB968D1D1, 0x00000000, 0xC12CEDED,
//     0x40602020, 0xE31FFCFC, 0x79C8B1B1, 0xB6ED5B5B,
//     0xD4BE6A6A, 0x8D46CBCB, 0x67D9BEBE, 0x724B3939,
//     0x94DE4A4A, 0x98D44C4C, 0xB0E85858, 0x854ACFCF,
//     0xBB6BD0D0, 0xC52AEFEF, 0x4FE5AAAA, 0xED16FBFB,
//     0x86C54343, 0x9AD74D4D, 0x66553333, 0x11948585,
//     0x8ACF4545, 0xE910F9F9, 0x04060202, 0xFE817F7F,
//     0xA0F05050, 0x78443C3C, 0x25BA9F9F, 0x4BE3A8A8,
//     0xA2F35151, 0x5DFEA3A3, 0x80C04040, 0x058A8F8F,
//     0x3FAD9292, 0x21BC9D9D, 0x70483838, 0xF104F5F5,
//     0x63DFBCBC, 0x77C1B6B6, 0xAF75DADA, 0x42632121,
//     0x20301010, 0xE51AFFFF, 0xFD0EF3F3, 0xBF6DD2D2,
//     0x814CCDCD, 0x18140C0C, 0x26351313, 0xC32FECEC,
//     0xBEE15F5F, 0x35A29797, 0x88CC4444, 0x2E391717,
//     0x9357C4C4, 0x55F2A7A7, 0xFC827E7E, 0x7A473D3D,
//     0xC8AC6464, 0xBAE75D5D, 0x322B1919, 0xE6957373,
//     0xC0A06060, 0x19988181, 0x9ED14F4F, 0xA37FDCDC,
//     0x44662222, 0x547E2A2A, 0x3BAB9090, 0x0B838888,
//     0x8CCA4646, 0xC729EEEE, 0x6BD3B8B8, 0x283C1414,
//     0xA779DEDE, 0xBCE25E5E, 0x161D0B0B, 0xAD76DBDB,
//     0xDB3BE0E0, 0x64563232, 0x744E3A3A, 0x141E0A0A,
//     0x92DB4949, 0x0C0A0606, 0x486C2424, 0xB8E45C5C,
//     0x9F5DC2C2, 0xBD6ED3D3, 0x43EFACAC, 0xC4A66262,
//     0x39A89191, 0x31A49595, 0xD337E4E4, 0xF28B7979,
//     0xD532E7E7, 0x8B43C8C8, 0x6E593737, 0xDAB76D6D,
//     0x018C8D8D, 0xB164D5D5, 0x9CD24E4E, 0x49E0A9A9,
//     0xD8B46C6C, 0xACFA5656, 0xF307F4F4, 0xCF25EAEA,
//     0xCAAF6565, 0xF48E7A7A, 0x47E9AEAE, 0x10180808,
//     0x6FD5BABA, 0xF0887878, 0x4A6F2525, 0x5C722E2E,
//     0x38241C1C, 0x57F1A6A6, 0x73C7B4B4, 0x9751C6C6,
//     0xCB23E8E8, 0xA17CDDDD, 0xE89C7474, 0x3E211F1F,
//     0x96DD4B4B, 0x61DCBDBD, 0x0D868B8B, 0x0F858A8A,
//     0xE0907070, 0x7C423E3E, 0x71C4B5B5, 0xCCAA6666,
//     0x90D84848, 0x06050303, 0xF701F6F6, 0x1C120E0E,
//     0xC2A36161, 0x6A5F3535, 0xAEF95757, 0x69D0B9B9,
//     0x17918686, 0x9958C1C1, 0x3A271D1D, 0x27B99E9E,
//     0xD938E1E1, 0xEB13F8F8, 0x2BB39898, 0x22331111,
//     0xD2BB6969, 0xA970D9D9, 0x07898E8E, 0x33A79494,
//     0x2DB69B9B, 0x3C221E1E, 0x15928787, 0xC920E9E9,
//     0x8749CECE, 0xAAFF5555, 0x50782828, 0xA57ADFDF,
//     0x038F8C8C, 0x59F8A1A1, 0x09808989, 0x1A170D0D,
//     0x65DABFBF, 0xD731E6E6, 0x84C64242, 0xD0B86868,
//     0x82C34141, 0x29B09999, 0x5A772D2D, 0x1E110F0F,
//     0x7BCBB0B0, 0xA8FC5454, 0x6DD6BBBB, 0x2C3A1616
// ];


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
},{"./helper":7,"./op":11}],2:[function(require,module,exports){
/////////////////////////////////////
///////////////  Blake //////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var o = require('./op');
var h = require('./helper');

var CB = h.bytes2Int64Buffer(h.b64Decode("JD9qiIWjCNMTGYouA3BzRKQJOCIpnzHQCC76mOxObIlFKCHmONATd75UZs806QxswKwpt8l8UN0/hNW1tUcJF5IW1dmJefsb0TELppjftawv/XLb0Brft7jhr+1qJn6WunyQRfEsf5kkoZlHs5Fs9wgB8uKFjvwWY2kg2HFXTmk="));

// var CB = [
//   o.u(0x243f6a88, 0x85a308d3),
//   o.u(0x13198a2e, 0x03707344),
//   o.u(0xa4093822, 0x299f31d0),
//   o.u(0x082efa98, 0xec4e6c89),
//   o.u(0x452821e6, 0x38d01377),
//   o.u(0xbe5466cf, 0x34e90c6c),
//   o.u(0xc0ac29b7, 0xc97c50dd),
//   o.u(0x3f84d5b5, 0xb5470917),
//   o.u(0x9216d5d9, 0x8979fb1b),
//   o.u(0xd1310ba6, 0x98dfb5ac),
//   o.u(0x2ffd72db, 0xd01adfb7),
//   o.u(0xb8e1afed, 0x6a267e96),
//   o.u(0xba7c9045, 0xf12c7f99),
//   o.u(0x24a19947, 0xb3916cf7),
//   o.u(0x0801f2e2, 0x858efc16),
//   o.u(0x636920d8, 0x71574e69)
// ];

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

var initialValues = [
  o.u(0x6a09e667, 0xf3bcc908),
  o.u(0xbb67ae85, 0x84caa73b),
  o.u(0x3c6ef372, 0xfe94f82b),
  o.u(0xa54ff53a, 0x5f1d36f1),
  o.u(0x510e527f, 0xade682d1),
  o.u(0x9b05688c, 0x2b3e6c1f),
  o.u(0x1f83d9ab, 0xfb41bd6b),
  o.u(0x5be0cd19, 0x137e2179)
];

var GB = function(m0, m1, c0, c1, a, b, c, d) {
  a.add(m0.xor(c1).add(b));
  d.setxorOne(a).setFlip();
  c.add(d);
  b.setxorOne(c).setRotateRight(25);
  a.add(m1.xor(c0).add(b));
  d.setxorOne(a).setRotateRight(16);
  c.add(d);
  b.setxorOne(c).setRotateRight(11);
}

var round = function(r, V, M) {
  GB(M[Z[r][0]], M[Z[r][1]], CB[Z[r][0]], CB[Z[r][1]], V[0], V[4], V[8], V[0xC]);
  GB(M[Z[r][2]], M[Z[r][3]], CB[Z[r][2]], CB[Z[r][3]], V[1], V[5], V[9], V[0xD]);
  GB(M[Z[r][4]], M[Z[r][5]], CB[Z[r][4]], CB[Z[r][5]], V[2], V[6], V[0xA], V[0xE]);
  GB(M[Z[r][6]], M[Z[r][7]], CB[Z[r][6]], CB[Z[r][7]], V[3], V[7], V[0xB], V[0xF]);
  GB(M[Z[r][8]], M[Z[r][9]], CB[Z[r][8]], CB[Z[r][9]], V[0], V[5], V[0xA], V[0xF]);
  GB(M[Z[r][10]], M[Z[r][11]], CB[Z[r][10]], CB[Z[r][11]], V[1], V[6], V[0xB], V[0xC]);
  GB(M[Z[r][12]], M[Z[r][13]], CB[Z[r][12]], CB[Z[r][13]], V[2], V[7], V[8], V[0xD]);
  GB(M[Z[r][14]], M[Z[r][15]], CB[Z[r][14]], CB[Z[r][15]], V[3], V[4], V[9], V[0xE]);
}

var compress = function(M, H, S, T0, T1) {
  var V = new Array(16);
  o.bufferInsert64(V, 0, H, 8);
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
    H[i] = o.xor64(H[i], S[i % 4], V[i], V[8 + i]);
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
    o.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  o.bufferInsert(H, 0, ctx.state, 8);
  o.bufferInsert(S, 0, ctx.salt, 4);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    o.bufferInsert(buf, ptr, data, clen);
    ptr += clen;
    data = data.slice(clen);
    len -= clen;
    if (ptr === ctx.buffer.length) {
      T0.add(o.u(0, 1024));
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
  var bitLen = (o.u(0, ptr)).shiftLeft(3);
  var len = buf.length;
  var padLen;
  var count;
  var tl = ctx.T0.plus(bitLen);
  var th = ctx.T1.clone();
  buf[ptr] = 0x80;
  if (ptr === 0) {
    ctx.T0 = o.u(0xFFFFFFFF, 0xFFFFFC00);
    ctx.T1 = o.u(0xFFFFFFFF, 0xFFFFFFFF);
  }
  else if (ctx.T0.isZero()) {
    ctx.T0 = o.u(0xFFFFFFFF, 0xFFFFFC00).plus(bitLen);
    ctx.T1 = ctx.T1.minus(o.u(0, 1));
  }
  else {
    ctx.T0 = ctx.T0.minus(o.u(0, 1024).minus(bitLen));
  }
  if (bitLen.lo <= 894) {
    o.bufferSet(buf, ptr + 1, 0, 111 - ptr);
    buf[111] |= 1;
    h.bufferEncode64(buf, 112, th);
    h.bufferEncode64(buf, 120, tl);
    blake(ctx, buf.slice(ptr), 128 - ptr);
  }
  else {
    o.bufferSet(u.buf, ptr + 1, 0, 127 - ptr);
    blake(ctx, buf.slice(ptr), 128 - ptr);
    ctx.T0 = o.u(0xFFFFFFFF,0xFFFFFC00);
    ctx.T1 = o.u(0xFFFFFFFF,0xFFFFFFFF);
    o.bufferSet(buf, 0, 0, 112);
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
  ctx.state = o.clone64Array(initialValues);
  var zero = o.u(0,0);
  ctx.salt = [zero, zero, zero, zero];
  ctx.T0 = zero.clone();
  ctx.T1 = zero.clone();
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

var o = require('./op');
var h = require('./helper');

// var V_INIT = [
//   o.u(0x80818283, 0x84858687), o.u(0x88898A8B, 0x8C8D8E8F),
//   o.u(0x90919293, 0x94959697), o.u(0x98999A9B, 0x9C9D9E9F),
//   o.u(0xA0A1A2A3, 0xA4A5A6A7), o.u(0xA8A9AAAB, 0xACADAEAF),
//   o.u(0xB0B1B2B3, 0xB4B5B6B7), o.u(0xB8B9BABB, 0xBCBDBEBF),
//   o.u(0xC0C1C2C3, 0xC4C5C6C7), o.u(0xC8C9CACB, 0xCCCDCECF),
//   o.u(0xD0D1D2D3, 0xD4D5D6D7), o.u(0xD8D9DADB, 0xDCDDDEDF),
//   o.u(0xE0E1E2E3, 0xE4E5E6E7), o.u(0xE8E9EAEB, 0xECEDEEEF),
//   o.u(0xF0F1F2F3, 0xF4F5F6F7), o.u(0xF8F9FAFB, 0xFCFDFEFF)
// ];

var V_INIT = h.bytes2Int64Buffer(h.b64Decode("gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2tvc3d7f4OHi4+Tl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/v8="));

// var final = [
//   o.u(0xaaaaaaaa, 0xaaaaaaa0), o.u(0xaaaaaaaa, 0xaaaaaaa1),
//   o.u(0xaaaaaaaa, 0xaaaaaaa2), o.u(0xaaaaaaaa, 0xaaaaaaa3),
//   o.u(0xaaaaaaaa, 0xaaaaaaa4), o.u(0xaaaaaaaa, 0xaaaaaaa5),
//   o.u(0xaaaaaaaa, 0xaaaaaaa6), o.u(0xaaaaaaaa, 0xaaaaaaa7),
//   o.u(0xaaaaaaaa, 0xaaaaaaa8), o.u(0xaaaaaaaa, 0xaaaaaaa9),
//   o.u(0xaaaaaaaa, 0xaaaaaaaa), o.u(0xaaaaaaaa, 0xaaaaaaab),
//   o.u(0xaaaaaaaa, 0xaaaaaaac), o.u(0xaaaaaaaa, 0xaaaaaaad),
//   o.u(0xaaaaaaaa, 0xaaaaaaae), o.u(0xaaaaaaaa, 0xaaaaaaaf)
// ];

var final = h.bytes2Int64Buffer(h.b64Decode("qqqqqqqqqqCqqqqqqqqqoaqqqqqqqqqiqqqqqqqqqqOqqqqqqqqqpKqqqqqqqqqlqqqqqqqqqqaqqqqqqqqqp6qqqqqqqqqoqqqqqqqqqqmqqqqqqqqqqqqqqqqqqqqrqqqqqqqqqqyqqqqqqqqqraqqqqqqqqquqqqqqqqqqq8="));

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
    return o.xor64(x.shiftRight(sb_a[n]), x.shiftLeft(sb_b[n]), x.rotateLeft(sb_c[n]), x.rotateLeft(sb_d[n]));
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
  var fives = o.u(0x05555555, 0x55555555);
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
  var xl = o.xor64(qt[16], qt[17], qt[18], qt[19], qt[20], qt[21], qt[22], qt[23]);
  var xh = o.xor64(xl, qt[24], qt[25], qt[26], qt[27], qt[28], qt[29], qt[30], qt[31]);
  out[0] = o.xor64(xh.shiftLeft(5), qt[16].shiftRight(5), int64Buffer[0]).add(o.xor64(xl, qt[24], qt[0]));
  out[1] = o.xor64(xh.shiftRight(7), qt[17].shiftLeft(8), int64Buffer[1]).add(o.xor64(xl, qt[25], qt[1]));
  out[2] = o.xor64(xh.shiftRight(5), qt[18].shiftLeft(5), int64Buffer[2]).add(o.xor64(xl, qt[26], qt[2]));
  out[3] = o.xor64(xh.shiftRight(1), qt[19].shiftLeft(5), int64Buffer[3]).add(o.xor64(xl, qt[27], qt[3]));
  out[4] = o.xor64(xh.shiftRight(3), qt[20], int64Buffer[4]).add(o.xor64(xl, qt[28], qt[4]));
  out[5] = o.xor64(xh.shiftLeft(6), qt[21].shiftRight(6), int64Buffer[5]).add(o.xor64(xl, qt[29], qt[5]));
  out[6] = o.xor64(xh.shiftRight(4), qt[22].shiftLeft(6), int64Buffer[6]).add(o.xor64(xl, qt[30], qt[6]));
  out[7] = o.xor64(xh.shiftRight(11), qt[23].shiftLeft(2), int64Buffer[7]).add(o.xor64(xl, qt[31], qt[7]));
  out[8] = out[4].rotateLeft(9).add(o.xor64(xh, qt[24], int64Buffer[8])).add(o.xor64(xl.shiftLeft(8), qt[23], qt[8]));
  out[9] = out[5].rotateLeft(10).add(o.xor64(xh, qt[25], int64Buffer[9])).add(o.xor64(xl.shiftRight(6), qt[16], qt[9]));
  out[10] = out[6].rotateLeft(11).add(o.xor64(xh, qt[26], int64Buffer[10])).add(o.xor64(xl.shiftLeft(6), qt[17], qt[10]));
  out[11] = out[7].rotateLeft(12).add(o.xor64(xh, qt[27], int64Buffer[11])).add(o.xor64(xl.shiftLeft(4), qt[18], qt[11]));
  out[12] = out[0].rotateLeft(13).add(o.xor64(xh, qt[28], int64Buffer[12])).add(o.xor64(xl.shiftRight(3), qt[19], qt[12]));
  out[13] = out[1].rotateLeft(14).add(o.xor64(xh, qt[29], int64Buffer[13])).add(o.xor64(xl.shiftRight(4), qt[20], qt[13]));
  out[14] = out[2].rotateLeft(15).add(o.xor64(xh, qt[30], int64Buffer[14])).add(o.xor64(xl.shiftRight(7), qt[21], qt[14]));
  out[15] = out[3].rotateLeft(16).add(o.xor64(xh, qt[31], int64Buffer[15])).add(o.xor64(xl.shiftRight(2), qt[22], qt[15]));
  return out;
}

var compress = function(buf, state) {
  var int64Buf = h.bytes2Int64BufferLeAligned(buf);
  return fold(int64Buf, state);
}

var bmw = function(ctx, data) {
  var htmp = new Array(16);
  var len = data.length;
  var lenL3 = o.u(0, len);
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
    o.bufferInsert(buf, ptr, data, clen);
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
    o.bufferInsert(ctx.state, 0, h1, ctx.state.length);
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
    o.bufferSet(buf, ptr, 0, len - ptr);
    hState = compress(buf, hState);
    ptr = 0;
  }
  o.bufferSet(buf, ptr, 0, len - 8 - ptr);
  h.bufferEncode64leAligned(buf, len - 8, ctx.bitCount);
  h2 = compress(buf, hState);
  for (u = 0; u < 16; u++)
    h.bufferEncode64leAligned(buf, 8 * u, h2[u]);
  h1 = compress(buf, final);
  var out = new Array(16);
  for (var u = 0, v = 8; u < 8; u++, v++) {
    out[2 * u] = o.swap32(h1[v].lo);
    out[2 * u + 1] = o.swap32(h1[v].hi);
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
  ctx.state = o.clone64Array(V_INIT);
  ctx.ptr = 0;
  ctx.bitCount = o.u(0,0);
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

var o = require('./op');
var h = require('./helper');

var T0 = h.bytes2Int64Buffer(h.b64Decode("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"));
var T1 = h.bytes2Int64Buffer(h.b64Decode("xsYy9KX0l6X4+G+XhJfrhO7uXrCZsMeZ9vZ6jI2M943//+gXDRflDdbWCty93Le93t4WyLHIp7GRkW38VPw5VGBgkPBQ8MBQAgIHBQMFBAPOzi7gqeCHqVZW0Yd9h6x95+fMKxkr1Rm1tROmYqZxYk1NfDHmMZrm7OxZtZq1w5qPj0DPRc8FRR8fo7ydvD6diYlJwEDACUD6+miSh5Lvh+/v0D8VP8UVsrKUJusmf+uOjs5AyUAHyfv75h0LHe0LQUFuL+wvguyzsxqpZ6l9Z19fQxz9HL79RUVgJeoliuojI/nav9pGv1NTUQL3Aqb35ORFoZah05abm3btW+0tW3V1KF3CXerC4eHFJBwk2Rw9PdTprul6rkxM8r5qvphqbGyC7lru2Fp+fr3DQcP8QfX18wYCBvECg4NS0U/RHU9oaIzkXOTQXFFRVgf0B6L00dGNXDRcuTT5+eEYCBjpCOLiTK6Trt+Tq6s+lXOVTXNiYpf1U/XEUyoqa0E/QVQ/CAgcFAwUEAyVlWP2UvYxUkZG6a9lr4xlnZ1/4l7iIV4wMEh4KHhgKDc3z/ih+G6hCgobEQ8RFA8vL+vEtcRetQ4OFRsJGxwJJCR+WjZaSDYbG622m7Y2m9/fmEc9R6U9zc2naiZqgSZOTvW7abucaX9/M0zNTP7N6upQup+6z58SEj8tGy0kGx0dpLmeuTqeWFjEnHScsHQ0NEZyLnJoLjY2QXctd2wt3NwRzbLNo7K0tJ0p7ilz7ltbTRb7Frb7pKSlAfYBU/Z2dqHXTdfsTbe3FKNho3VhfX00Sc5J+s5SUt+Ne42ke93dn0I+QqE+Xl7Nk3GTvHETE7Gil6Iml6amogT1BFf1ubkBuGi4aWgAAAAAAAAAAMHBtXQsdJksQEDgoGCggGDj48IhHyHdH3l5OkPIQ/LItraaLO0sd+3U1A3Zvtmzvo2NR8pGygFGZ2cXcNlwztlycq/dS93kS5SU7XneeTPemJj/Z9RnK9SwsJMj6CN76IWFW95K3hFKu7sGvWu9bWvFxbt+Kn6RKk9PezTlNJ7l7e3XOhY6wRaGhtJUxVQXxZqa+GLXYi/XZmaZ/1X/zFUREbanlKcilIqKwErPSg/P6enZMBAwyRAEBA4KBgoIBv7+ZpiBmOeBoKCrC/ALW/B4eLTMRMzwRCUl8NW61Uq6S0t1PuM+luOioqwO8w5f811dRBn+Gbr+gIDbW8BbG8AFBYCFioUKij8/0+yt7H6tISH+37zfQrxwcKjYSNjgSPHx/QwEDPkEY2MZet96xt93dy9YwVjuwa+vMJ91n0V1QkLnpWOlhGMgIHBQMFBAMOXlyy4aLtEa/f3vEg4S4Q6/vwi3bbdlbYGBVdRM1BlMGBgkPBQ8MBQmJnlfNV9MNcPDsnEvcZ0vvr6GOOE4Z+E1Ncj9ov1qooiIx0/MTwvMLi5lSzlLXDmTk2r5V/k9V1VVWA3yDary/PxhnYKd44J6erPJR8n0R8jIJ++s74usurqIMucyb+cyMk99K31kK+bmQqSVpNeVwMA7+6D7m6AZGaqzmLMymJ6e9mjRaCfRo6MigX+BXX9ERO6qZqqIZlRU1oJ+gqh+Ozvd5qvmdqsLC5Weg54Wg4yMyUXKRQPKx8e8eyl7lSlrawVu027W0ygobEQ8RFA8p6csi3mLVXm8vIE94j1j4hYWMScdJywdra03mnaaQXbb25ZNO02tO2RknvpW+shWdHSm0k7S6E4UFDYiHiIoHpKS5Hbbdj/bDAwSHgoeGApISPy0bLSQbLi4jzfkN2vkn594513nJV29vQ+ybrJhbkNDaSrvKobvxMQ18abxk6Y5OdrjqONyqDExxvek92Kk09OKWTdZvTfy8nSGi4b/i9XVg1YyVrEyi4tOxUPFDUNuboXrWevcWdraGMK3wq+3AQGOj4yPAoyxsR2sZKx5ZJyc8W3SbSPSSUlyO+A7kuDY2B/HtMertKysuRX6FUP68/P6CQcJ/QfPz6BvJW+FJcrKIOqv6o+v9PR9iY6J845HR2cg6SCO6RAQOCgYKCAYb28LZNVk3tXw8HODiIP7iEpK+7FvsZRvXFzKlnKWuHI4OFRsJGxwJFdXXwjxCK7xc3MhUsdS5seXl2TzUfM1UcvLrmUjZY0joaElhHyEWXzo6Fe/nL/LnD4+XWMhY3whlpbqfN18N91hYR5/3H/C3A0NnJGGkRqGDw+blIWUHoXg4EurkKvbkHx8usZCxvhCcXEmV8RX4sTMzCnlquWDqpCQ43PYczvYBgYJDwUPDAX39/QDAQP1ARwcKjYSNjgSwsI8/qP+n6NqaovhX+HUX66uvhD5EEf5aWkCa9Br0tAXF7+okagukZmZcehY6ClYOjpTaSdpdCcnJ/fQudBOudnZkUg4SKk46+veNRM1zRMrK+XOs85WsyIid1UzVUQz0tIE1rvWv7upqTmQcJBJcAcHh4CJgA6JMzPB8qfyZqctLezBtsFatjw8WmYiZngiFRW4rZKtKpLJyalgIGCJIIeHXNtJ2xVJqqqwGv8aT/9QUNiIeIigeKWlK456jlF6AwOJio+KBo9ZWUoT+BOy+AkJkpuAmxKAGhojORc5NBdlZRB12nXK2tfXhFMxU7UxhITVUcZRE8bQ0APTuNO7uIKC3F7DXh/DKSniy7DLUrBaWsOZd5m0dx4eLTMRMzwRe3s9RstG9suoqLcf/B9L/G1tDGHWYdrWLCxiTjpOWDo="));
var T2 = h.bytes2Int64Buffer(h.b64Decode("pcbGMvSl9JeE+Phvl4SX65nu7l6wmbDHjfb2eoyNjPcN///oFw0X5b3W1grcvdy3sd7eFsixyKdUkZFt/FT8OVBgYJDwUPDAAwICBwUDBQSpzs4u4Kngh31WVtGHfYesGefnzCsZK9VitbUTpmKmceZNTXwx5jGamuzsWbWatcNFj49Az0XPBZ0fH6O8nbw+QImJScBAwAmH+vpokoeS7xXv79A/FT/F67KylCbrJn/Jjo7OQMlABwv7++YdCx3t7EFBbi/sL4Jns7MaqWepff1fX0Mc/Ry+6kVFYCXqJYq/IyP52r/aRvdTU1EC9wKmluTkRaGWodNbm5t27VvtLcJ1dShdwl3qHOHhxSQcJNmuPT3U6a7pempMTPK+ar6YWmxsgu5a7thBfn69w0HD/AL19fMGAgbxT4ODUtFP0R1caGiM5Fzk0PRRUVYH9AeiNNHRjVw0XLkI+fnhGAgY6ZPi4kyuk67fc6urPpVzlU1TYmKX9VP1xD8qKmtBP0FUDAgIHBQMFBBSlZVj9lL2MWVGRumvZa+MXp2df+Je4iEoMDBIeCh4YKE3N8/4ofhuDwoKGxEPERS1Ly/rxLXEXgkODhUbCRscNiQkflo2WkibGxuttpu2Nj3f35hHPUelJs3Np2omaoFpTk71u2m7nM1/fzNMzUz+n+rqULqfus8bEhI/LRstJJ4dHaS5nrk6dFhYxJx0nLAuNDRGci5yaC02NkF3LXdsstzcEc2yzaPutLSdKe4pc/tbW00W+xa29qSkpQH2AVNNdnah103X7GG3txSjYaN1zn19NEnOSfp7UlLfjXuNpD7d3Z9CPkKhcV5ezZNxk7yXExOxopeiJvWmpqIE9QRXaLm5AbhouGkAAAAAAAAAACzBwbV0LHSZYEBA4KBgoIAf4+PCIR8h3ch5eTpDyEPy7ba2miztLHe+1NQN2b7Zs0aNjUfKRsoB2WdnF3DZcM5LcnKv3Uvd5N6UlO153nkz1JiY/2fUZyvosLCTI+gje0qFhVveSt4Ra7u7Br1rvW0qxcW7fip+keVPT3s05TSeFu3t1zoWOsHFhobSVMVUF9eamvhi12IvVWZmmf9V/8yUERG2p5SnIs+KisBKz0oPEOnp2TAQMMkGBAQOCgYKCIH+/maYgZjn8KCgqwvwC1tEeHi0zETM8LolJfDVutVK40tLdT7jPpbzoqKsDvMOX/5dXUQZ/hm6wICA21vAWxuKBQWAhYqFCq0/P9Psrex+vCEh/t+830JIcHCo2EjY4ATx8f0MBAz532NjGXrfesbBd3cvWMFY7nWvrzCfdZ9FY0JC56VjpYQwICBwUDBQQBrl5csuGi7RDv397xIOEuFtv78It223ZUyBgVXUTNQZFBgYJDwUPDA1JiZ5XzVfTC/Dw7JxL3Gd4b6+hjjhOGeiNTXI/aL9asyIiMdPzE8LOS4uZUs5S1xXk5Nq+Vf5PfJVVVgN8g2qgvz8YZ2CneNHenqzyUfJ9KzIyCfvrO+L57q6iDLnMm8rMjJPfSt9ZJXm5kKklaTXoMDAO/ug+5uYGRmqs5izMtGenvZo0Wgnf6OjIoF/gV1mRETuqmaqiH5UVNaCfoKoqzs73ear5naDCwuVnoOeFsqMjMlFykUDKcfHvHspe5XTa2sFbtNu1jwoKGxEPERQeaenLIt5i1XivLyBPeI9Yx0WFjEnHScsdq2tN5p2mkE729uWTTtNrVZkZJ76VvrITnR0ptJO0ugeFBQ2Ih4iKNuSkuR223Y/CgwMEh4KHhhsSEj8tGy0kOS4uI835DdrXZ+feOdd5yVuvb0Psm6yYe9DQ2kq7yqGpsTENfGm8ZOoOTna46jjcqQxMcb3pPdiN9PTilk3Wb2L8vJ0houG/zLV1YNWMlaxQ4uLTsVDxQ1Zbm6F61nr3Lfa2hjCt8KvjAEBjo+MjwJksbEdrGSsedKcnPFt0m0j4ElJcjvgO5K02Ngfx7THq/qsrLkV+hVDB/Pz+gkHCf0lz8+gbyVvha/KyiDqr+qPjvT0fYmOifPpR0dnIOkgjhgQEDgoGCgg1W9vC2TVZN6I8PBzg4iD+29KSvuxb7GUclxcypZylrgkODhUbCRscPFXV18I8Qiux3NzIVLHUuZRl5dk81HzNSPLy65lI2WNfKGhJYR8hFmc6OhXv5y/yyE+Pl1jIWN83ZaW6nzdfDfcYWEef9x/woYNDZyRhpEahQ8Pm5SFlB6Q4OBLq5Cr20J8fLrGQsb4xHFxJlfEV+KqzMwp5arlg9iQkONz2HM7BQYGCQ8FDwwB9/f0AwED9RIcHCo2EjY4o8LCPP6j/p9famqL4V/h1Pmurr4Q+RBH0GlpAmvQa9KRFxe/qJGoLliZmXHoWOgpJzo6U2knaXS5Jyf30LnQTjjZ2ZFIOEipE+vr3jUTNc2zKyvlzrPOVjMiIndVM1VEu9LSBNa71r9wqak5kHCQSYkHB4eAiYAOpzMzwfKn8ma2LS3swbbBWiI8PFpmImZ4khUVuK2SrSogycmpYCBgiUmHh1zbSdsV/6qqsBr/Gk94UFDYiHiIoHqlpSuOeo5RjwMDiYqPigb4WVlKE/gTsoAJCZKbgJsSFxoaIzkXOTTaZWUQddp1yjHX14RTMVO1xoSE1VHGURO40NAD07jTu8OCgtxew14fsCkp4suwy1J3WlrDmXeZtBEeHi0zETM8y3t7PUbLRvb8qKi3H/wfS9ZtbQxh1mHaOiwsYk46Tlg="));
var T3 = h.bytes2Int64Buffer(h.b64Decode("l6XGxjL0pfTrhPj4b5eEl8eZ7u5esJmw94329nqMjYzlDf//6BcNF7e91tYK3L3cp7He3hbIscg5VJGRbfxU/MBQYGCQ8FDwBAMCAgcFAwWHqc7OLuCp4Kx9VlbRh32H1Rnn58wrGStxYrW1E6ZipprmTU18MeYxw5rs7Fm1mrUFRY+PQM9Fzz6dHx+jvJ28CUCJiUnAQMDvh/r6aJKHksUV7+/QPxU/f+uyspQm6yYHyY6OzkDJQO0L+/vmHQsdguxBQW4v7C99Z7OzGqlnqb79X19DHP0ciupFRWAl6iVGvyMj+dq/2qb3U1NRAvcC05bk5EWhlqEtW5ubdu1b7erCdXUoXcJd2Rzh4cUkHCR6rj091Omu6ZhqTEzyvmq+2FpsbILuWu78QX5+vcNBw/EC9fXzBgIGHU+Dg1LRT9HQXGhojORc5KL0UVFWB/QHuTTR0Y1cNFzpCPn54RgIGN+T4uJMrpOuTXOrqz6Vc5XEU2Jil/VT9VQ/KiprQT9BEAwICBwUDBQxUpWVY/ZS9oxlRkbpr2WvIV6dnX/iXuJgKDAwSHgoeG6hNzfP+KH4FA8KChsRDxFetS8v68S1xBwJDg4VGwkbSDYkJH5aNlo2mxsbrbabtqU939+YRz1HgSbNzadqJmqcaU5O9btpu/7Nf38zTM1Mz5/q6lC6n7okGxISPy0bLTqeHR2kuZ65sHRYWMScdJxoLjQ0RnIucmwtNjZBdy13o7Lc3BHNss1z7rS0nSnuKbb7W1tNFvsWU/akpKUB9gHsTXZ2oddN13Vht7cUo2Gj+s59fTRJzkmke1JS3417jaE+3d2fQj5CvHFeXs2TcZMmlxMTsaKXolf1pqaiBPUEaWi5uQG4aLgAAAAAAAAAAJkswcG1dCx0gGBAQOCgYKDdH+PjwiEfIfLIeXk6Q8hDd+22tpos7SyzvtTUDdm+2QFGjY1HykbKztlnZxdw2XDkS3Jyr91L3TPelJTted55K9SYmP9n1Gd76LCwkyPoIxFKhYVb3krebWu7uwa9a72RKsXFu34qfp7lT097NOU0wRbt7dc6FjoXxYaG0lTFVC/Xmpr4YtdizFVmZpn/Vf8ilBERtqeUpw/PiorASs9KyRDp6dkwEDAIBgQEDgoGCueB/v5mmIGYW/CgoKsL8AvwRHh4tMxEzEq6JSXw1brVluNLS3U+4z5f86KirA7zDrr+XV1EGf4ZG8CAgNtbwFsKigUFgIWKhX6tPz/T7K3sQrwhIf7fvN/gSHBwqNhI2PkE8fH9DAQMxt9jYxl633ruwXd3L1jBWEV1r68wn3WfhGNCQuelY6VAMCAgcFAwUNEa5eXLLhou4Q79/e8SDhJlbb+/CLdttxlMgYFV1EzUMBQYGCQ8FDxMNSYmeV81X50vw8OycS9xZ+G+voY44ThqojU1yP2i/QvMiIjHT8xPXDkuLmVLOUs9V5OTavlX+aryVVVYDfIN44L8/GGdgp30R3p6s8lHyYusyMgn76zvb+e6uogy5zJkKzIyT30rfdeV5uZCpJWkm6DAwDv7oPsymBkZqrOYsyfRnp72aNFoXX+joyKBf4GIZkRE7qpmqqh+VFTWgn6Cdqs7O93mq+YWgwsLlZ6DngPKjIzJRcpFlSnHx7x7KXvW02trBW7TblA8KChsRDxEVXmnpyyLeYtj4ry8gT3iPSwdFhYxJx0nQXatrTeadpqtO9vblk07TchWZGSe+lb66E50dKbSTtIoHhQUNiIeIj/bkpLkdtt2GAoMDBIeCh6QbEhI/LRstGvkuLiPN+Q3JV2fn3jnXedhbr29D7JusobvQ0NpKu8qk6bExDXxpvFyqDk52uOo42KkMTHG96T3vTfT04pZN1n/i/LydIaLhrEy1dWDVjJWDUOLi07FQ8XcWW5uhetZ66+32toYwrfCAowBAY6PjI95ZLGxHaxkrCPSnJzxbdJtkuBJSXI74DurtNjYH8e0x0P6rKy5FfoV/Qfz8/oJBwmFJc/PoG8lb4+vysog6q/q84709H2JjomO6UdHZyDpICAYEBA4KBgo3tVvbwtk1WT7iPDwc4OIg5RvSkr7sW+xuHJcXMqWcpZwJDg4VGwkbK7xV1dfCPEI5sdzcyFSx1I1UZeXZPNR840jy8uuZSNlWXyhoSWEfITLnOjoV7+cv3whPj5dYyFjN92Wlup83XzC3GFhHn/cfxqGDQ2ckYaRHoUPD5uUhZTbkODgS6uQq/hCfHy6xkLG4sRxcSZXxFeDqszMKeWq5TvYkJDjc9hzDAUGBgkPBQ/1Aff39AMBAzgSHBwqNhI2n6PCwjz+o/7UX2pqi+Ff4Uf5rq6+EPkQ0tBpaQJr0GsukRcXv6iRqClYmZlx6FjodCc6OlNpJ2lOuScn99C50Kk42dmRSDhIzRPr6941EzVWsysr5c6zzkQzIiJ3VTNVv7vS0gTWu9ZJcKmpOZBwkA6JBweHgImAZqczM8Hyp/Jati0t7MG2wXgiPDxaZiJmKpIVFbitkq2JIMnJqWAgYBVJh4dc20nbT/+qqrAa/xqgeFBQ2Ih4iFF6paUrjnqOBo8DA4mKj4qy+FlZShP4ExKACQmSm4CbNBcaGiM5FznK2mVlEHXadbUx19eEUzFTE8aEhNVRxlG7uNDQA9O40x/DgoLcXsNeUrApKeLLsMu0d1paw5l3mTwRHh4tMxEz9st7ez1Gy0ZL/Kiotx/8H9rWbW0MYdZhWDosLGJOOk4="));
var T4 = h.bytes2Int64Buffer(h.b64Decode("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"));
var T5 = h.bytes2Int64Buffer(h.b64Decode("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"));
var T6 = h.bytes2Int64Buffer(h.b64Decode("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"));
var T7 = h.bytes2Int64Buffer(h.b64Decode("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"));

// var T0 = [
//   o.u(0xc632f4a5, 0xf497a5c6), o.u(0xf86f9784, 0x97eb84f8),
//   o.u(0xee5eb099, 0xb0c799ee), o.u(0xf67a8c8d, 0x8cf78df6),
//   o.u(0xffe8170d, 0x17e50dff), o.u(0xd60adcbd, 0xdcb7bdd6),
//   o.u(0xde16c8b1, 0xc8a7b1de), o.u(0x916dfc54, 0xfc395491),
//   o.u(0x6090f050, 0xf0c05060), o.u(0x02070503, 0x05040302),
//   o.u(0xce2ee0a9, 0xe087a9ce), o.u(0x56d1877d, 0x87ac7d56),
//   o.u(0xe7cc2b19, 0x2bd519e7), o.u(0xb513a662, 0xa67162b5),
//   o.u(0x4d7c31e6, 0x319ae64d), o.u(0xec59b59a, 0xb5c39aec),
//   o.u(0x8f40cf45, 0xcf05458f), o.u(0x1fa3bc9d, 0xbc3e9d1f),
//   o.u(0x8949c040, 0xc0094089), o.u(0xfa689287, 0x92ef87fa),
//   o.u(0xefd03f15, 0x3fc515ef), o.u(0xb29426eb, 0x267febb2),
//   o.u(0x8ece40c9, 0x4007c98e), o.u(0xfbe61d0b, 0x1ded0bfb),
//   o.u(0x416e2fec, 0x2f82ec41), o.u(0xb31aa967, 0xa97d67b3),
//   o.u(0x5f431cfd, 0x1cbefd5f), o.u(0x456025ea, 0x258aea45),
//   o.u(0x23f9dabf, 0xda46bf23), o.u(0x535102f7, 0x02a6f753),
//   o.u(0xe445a196, 0xa1d396e4), o.u(0x9b76ed5b, 0xed2d5b9b),
//   o.u(0x75285dc2, 0x5deac275), o.u(0xe1c5241c, 0x24d91ce1),
//   o.u(0x3dd4e9ae, 0xe97aae3d), o.u(0x4cf2be6a, 0xbe986a4c),
//   o.u(0x6c82ee5a, 0xeed85a6c), o.u(0x7ebdc341, 0xc3fc417e),
//   o.u(0xf5f30602, 0x06f102f5), o.u(0x8352d14f, 0xd11d4f83),
//   o.u(0x688ce45c, 0xe4d05c68), o.u(0x515607f4, 0x07a2f451),
//   o.u(0xd18d5c34, 0x5cb934d1), o.u(0xf9e11808, 0x18e908f9),
//   o.u(0xe24cae93, 0xaedf93e2), o.u(0xab3e9573, 0x954d73ab),
//   o.u(0x6297f553, 0xf5c45362), o.u(0x2a6b413f, 0x41543f2a),
//   o.u(0x081c140c, 0x14100c08), o.u(0x9563f652, 0xf6315295),
//   o.u(0x46e9af65, 0xaf8c6546), o.u(0x9d7fe25e, 0xe2215e9d),
//   o.u(0x30487828, 0x78602830), o.u(0x37cff8a1, 0xf86ea137),
//   o.u(0x0a1b110f, 0x11140f0a), o.u(0x2febc4b5, 0xc45eb52f),
//   o.u(0x0e151b09, 0x1b1c090e), o.u(0x247e5a36, 0x5a483624),
//   o.u(0x1badb69b, 0xb6369b1b), o.u(0xdf98473d, 0x47a53ddf),
//   o.u(0xcda76a26, 0x6a8126cd), o.u(0x4ef5bb69, 0xbb9c694e),
//   o.u(0x7f334ccd, 0x4cfecd7f), o.u(0xea50ba9f, 0xbacf9fea),
//   o.u(0x123f2d1b, 0x2d241b12), o.u(0x1da4b99e, 0xb93a9e1d),
//   o.u(0x58c49c74, 0x9cb07458), o.u(0x3446722e, 0x72682e34),
//   o.u(0x3641772d, 0x776c2d36), o.u(0xdc11cdb2, 0xcda3b2dc),
//   o.u(0xb49d29ee, 0x2973eeb4), o.u(0x5b4d16fb, 0x16b6fb5b),
//   o.u(0xa4a501f6, 0x0153f6a4), o.u(0x76a1d74d, 0xd7ec4d76),
//   o.u(0xb714a361, 0xa37561b7), o.u(0x7d3449ce, 0x49face7d),
//   o.u(0x52df8d7b, 0x8da47b52), o.u(0xdd9f423e, 0x42a13edd),
//   o.u(0x5ecd9371, 0x93bc715e), o.u(0x13b1a297, 0xa2269713),
//   o.u(0xa6a204f5, 0x0457f5a6), o.u(0xb901b868, 0xb86968b9),
//   o.u(0x00000000, 0x00000000), o.u(0xc1b5742c, 0x74992cc1),
//   o.u(0x40e0a060, 0xa0806040), o.u(0xe3c2211f, 0x21dd1fe3),
//   o.u(0x793a43c8, 0x43f2c879), o.u(0xb69a2ced, 0x2c77edb6),
//   o.u(0xd40dd9be, 0xd9b3bed4), o.u(0x8d47ca46, 0xca01468d),
//   o.u(0x671770d9, 0x70ced967), o.u(0x72afdd4b, 0xdde44b72),
//   o.u(0x94ed79de, 0x7933de94), o.u(0x98ff67d4, 0x672bd498),
//   o.u(0xb09323e8, 0x237be8b0), o.u(0x855bde4a, 0xde114a85),
//   o.u(0xbb06bd6b, 0xbd6d6bbb), o.u(0xc5bb7e2a, 0x7e912ac5),
//   o.u(0x4f7b34e5, 0x349ee54f), o.u(0xedd73a16, 0x3ac116ed),
//   o.u(0x86d254c5, 0x5417c586), o.u(0x9af862d7, 0x622fd79a),
//   o.u(0x6699ff55, 0xffcc5566), o.u(0x11b6a794, 0xa7229411),
//   o.u(0x8ac04acf, 0x4a0fcf8a), o.u(0xe9d93010, 0x30c910e9),
//   o.u(0x040e0a06, 0x0a080604), o.u(0xfe669881, 0x98e781fe),
//   o.u(0xa0ab0bf0, 0x0b5bf0a0), o.u(0x78b4cc44, 0xccf04478),
//   o.u(0x25f0d5ba, 0xd54aba25), o.u(0x4b753ee3, 0x3e96e34b),
//   o.u(0xa2ac0ef3, 0x0e5ff3a2), o.u(0x5d4419fe, 0x19bafe5d),
//   o.u(0x80db5bc0, 0x5b1bc080), o.u(0x0580858a, 0x850a8a05),
//   o.u(0x3fd3ecad, 0xec7ead3f), o.u(0x21fedfbc, 0xdf42bc21),
//   o.u(0x70a8d848, 0xd8e04870), o.u(0xf1fd0c04, 0x0cf904f1),
//   o.u(0x63197adf, 0x7ac6df63), o.u(0x772f58c1, 0x58eec177),
//   o.u(0xaf309f75, 0x9f4575af), o.u(0x42e7a563, 0xa5846342),
//   o.u(0x20705030, 0x50403020), o.u(0xe5cb2e1a, 0x2ed11ae5),
//   o.u(0xfdef120e, 0x12e10efd), o.u(0xbf08b76d, 0xb7656dbf),
//   o.u(0x8155d44c, 0xd4194c81), o.u(0x18243c14, 0x3c301418),
//   o.u(0x26795f35, 0x5f4c3526), o.u(0xc3b2712f, 0x719d2fc3),
//   o.u(0xbe8638e1, 0x3867e1be), o.u(0x35c8fda2, 0xfd6aa235),
//   o.u(0x88c74fcc, 0x4f0bcc88), o.u(0x2e654b39, 0x4b5c392e),
//   o.u(0x936af957, 0xf93d5793), o.u(0x55580df2, 0x0daaf255),
//   o.u(0xfc619d82, 0x9de382fc), o.u(0x7ab3c947, 0xc9f4477a),
//   o.u(0xc827efac, 0xef8bacc8), o.u(0xba8832e7, 0x326fe7ba),
//   o.u(0x324f7d2b, 0x7d642b32), o.u(0xe642a495, 0xa4d795e6),
//   o.u(0xc03bfba0, 0xfb9ba0c0), o.u(0x19aab398, 0xb3329819),
//   o.u(0x9ef668d1, 0x6827d19e), o.u(0xa322817f, 0x815d7fa3),
//   o.u(0x44eeaa66, 0xaa886644), o.u(0x54d6827e, 0x82a87e54),
//   o.u(0x3bdde6ab, 0xe676ab3b), o.u(0x0b959e83, 0x9e16830b),
//   o.u(0x8cc945ca, 0x4503ca8c), o.u(0xc7bc7b29, 0x7b9529c7),
//   o.u(0x6b056ed3, 0x6ed6d36b), o.u(0x286c443c, 0x44503c28),
//   o.u(0xa72c8b79, 0x8b5579a7), o.u(0xbc813de2, 0x3d63e2bc),
//   o.u(0x1631271d, 0x272c1d16), o.u(0xad379a76, 0x9a4176ad),
//   o.u(0xdb964d3b, 0x4dad3bdb), o.u(0x649efa56, 0xfac85664),
//   o.u(0x74a6d24e, 0xd2e84e74), o.u(0x1436221e, 0x22281e14),
//   o.u(0x92e476db, 0x763fdb92), o.u(0x0c121e0a, 0x1e180a0c),
//   o.u(0x48fcb46c, 0xb4906c48), o.u(0xb88f37e4, 0x376be4b8),
//   o.u(0x9f78e75d, 0xe7255d9f), o.u(0xbd0fb26e, 0xb2616ebd),
//   o.u(0x43692aef, 0x2a86ef43), o.u(0xc435f1a6, 0xf193a6c4),
//   o.u(0x39dae3a8, 0xe372a839), o.u(0x31c6f7a4, 0xf762a431),
//   o.u(0xd38a5937, 0x59bd37d3), o.u(0xf274868b, 0x86ff8bf2),
//   o.u(0xd5835632, 0x56b132d5), o.u(0x8b4ec543, 0xc50d438b),
//   o.u(0x6e85eb59, 0xebdc596e), o.u(0xda18c2b7, 0xc2afb7da),
//   o.u(0x018e8f8c, 0x8f028c01), o.u(0xb11dac64, 0xac7964b1),
//   o.u(0x9cf16dd2, 0x6d23d29c), o.u(0x49723be0, 0x3b92e049),
//   o.u(0xd81fc7b4, 0xc7abb4d8), o.u(0xacb915fa, 0x1543faac),
//   o.u(0xf3fa0907, 0x09fd07f3), o.u(0xcfa06f25, 0x6f8525cf),
//   o.u(0xca20eaaf, 0xea8fafca), o.u(0xf47d898e, 0x89f38ef4),
//   o.u(0x476720e9, 0x208ee947), o.u(0x10382818, 0x28201810),
//   o.u(0x6f0b64d5, 0x64ded56f), o.u(0xf0738388, 0x83fb88f0),
//   o.u(0x4afbb16f, 0xb1946f4a), o.u(0x5cca9672, 0x96b8725c),
//   o.u(0x38546c24, 0x6c702438), o.u(0x575f08f1, 0x08aef157),
//   o.u(0x732152c7, 0x52e6c773), o.u(0x9764f351, 0xf3355197),
//   o.u(0xcbae6523, 0x658d23cb), o.u(0xa125847c, 0x84597ca1),
//   o.u(0xe857bf9c, 0xbfcb9ce8), o.u(0x3e5d6321, 0x637c213e),
//   o.u(0x96ea7cdd, 0x7c37dd96), o.u(0x611e7fdc, 0x7fc2dc61),
//   o.u(0x0d9c9186, 0x911a860d), o.u(0x0f9b9485, 0x941e850f),
//   o.u(0xe04bab90, 0xabdb90e0), o.u(0x7cbac642, 0xc6f8427c),
//   o.u(0x712657c4, 0x57e2c471), o.u(0xcc29e5aa, 0xe583aacc),
//   o.u(0x90e373d8, 0x733bd890), o.u(0x06090f05, 0x0f0c0506),
//   o.u(0xf7f40301, 0x03f501f7), o.u(0x1c2a3612, 0x3638121c),
//   o.u(0xc23cfea3, 0xfe9fa3c2), o.u(0x6a8be15f, 0xe1d45f6a),
//   o.u(0xaebe10f9, 0x1047f9ae), o.u(0x69026bd0, 0x6bd2d069),
//   o.u(0x17bfa891, 0xa82e9117), o.u(0x9971e858, 0xe8295899),
//   o.u(0x3a536927, 0x6974273a), o.u(0x27f7d0b9, 0xd04eb927),
//   o.u(0xd9914838, 0x48a938d9), o.u(0xebde3513, 0x35cd13eb),
//   o.u(0x2be5ceb3, 0xce56b32b), o.u(0x22775533, 0x55443322),
//   o.u(0xd204d6bb, 0xd6bfbbd2), o.u(0xa9399070, 0x904970a9),
//   o.u(0x07878089, 0x800e8907), o.u(0x33c1f2a7, 0xf266a733),
//   o.u(0x2decc1b6, 0xc15ab62d), o.u(0x3c5a6622, 0x6678223c),
//   o.u(0x15b8ad92, 0xad2a9215), o.u(0xc9a96020, 0x608920c9),
//   o.u(0x875cdb49, 0xdb154987), o.u(0xaab01aff, 0x1a4fffaa),
//   o.u(0x50d88878, 0x88a07850), o.u(0xa52b8e7a, 0x8e517aa5),
//   o.u(0x03898a8f, 0x8a068f03), o.u(0x594a13f8, 0x13b2f859),
//   o.u(0x09929b80, 0x9b128009), o.u(0x1a233917, 0x3934171a),
//   o.u(0x651075da, 0x75cada65), o.u(0xd7845331, 0x53b531d7),
//   o.u(0x84d551c6, 0x5113c684), o.u(0xd003d3b8, 0xd3bbb8d0),
//   o.u(0x82dc5ec3, 0x5e1fc382), o.u(0x29e2cbb0, 0xcb52b029),
//   o.u(0x5ac39977, 0x99b4775a), o.u(0x1e2d3311, 0x333c111e),
//   o.u(0x7b3d46cb, 0x46f6cb7b), o.u(0xa8b71ffc, 0x1f4bfca8),
//   o.u(0x6d0c61d6, 0x61dad66d), o.u(0x2c624e3a, 0x4e583a2c)
// ];

// var T1 = [
//   o.u(0xc6c632f4, 0xa5f497a5), o.u(0xf8f86f97, 0x8497eb84),
//   o.u(0xeeee5eb0, 0x99b0c799), o.u(0xf6f67a8c, 0x8d8cf78d),
//   o.u(0xffffe817, 0xd17e50d), o.u(0xd6d60adc, 0xbddcb7bd),
//   o.u(0xdede16c8, 0xb1c8a7b1), o.u(0x91916dfc, 0x54fc3954),
//   o.u(0x606090f0, 0x50f0c050), o.u(0x2020705, 0x3050403),
//   o.u(0xcece2ee0, 0xa9e087a9), o.u(0x5656d187, 0x7d87ac7d),
//   o.u(0xe7e7cc2b, 0x192bd519), o.u(0xb5b513a6, 0x62a67162),
//   o.u(0x4d4d7c31, 0xe6319ae6), o.u(0xecec59b5, 0x9ab5c39a),
//   o.u(0x8f8f40cf, 0x45cf0545), o.u(0x1f1fa3bc, 0x9dbc3e9d),
//   o.u(0x898949c0, 0x40c00940), o.u(0xfafa6892, 0x8792ef87),
//   o.u(0xefefd03f, 0x153fc515), o.u(0xb2b29426, 0xeb267feb),
//   o.u(0x8e8ece40, 0xc94007c9), o.u(0xfbfbe61d, 0xb1ded0b),
//   o.u(0x41416e2f, 0xec2f82ec), o.u(0xb3b31aa9, 0x67a97d67),
//   o.u(0x5f5f431c, 0xfd1cbefd), o.u(0x45456025, 0xea258aea),
//   o.u(0x2323f9da, 0xbfda46bf), o.u(0x53535102, 0xf702a6f7),
//   o.u(0xe4e445a1, 0x96a1d396), o.u(0x9b9b76ed, 0x5bed2d5b),
//   o.u(0x7575285d, 0xc25deac2), o.u(0xe1e1c524, 0x1c24d91c),
//   o.u(0x3d3dd4e9, 0xaee97aae), o.u(0x4c4cf2be, 0x6abe986a),
//   o.u(0x6c6c82ee, 0x5aeed85a), o.u(0x7e7ebdc3, 0x41c3fc41),
//   o.u(0xf5f5f306, 0x206f102), o.u(0x838352d1, 0x4fd11d4f),
//   o.u(0x68688ce4, 0x5ce4d05c), o.u(0x51515607, 0xf407a2f4),
//   o.u(0xd1d18d5c, 0x345cb934), o.u(0xf9f9e118, 0x818e908),
//   o.u(0xe2e24cae, 0x93aedf93), o.u(0xabab3e95, 0x73954d73),
//   o.u(0x626297f5, 0x53f5c453), o.u(0x2a2a6b41, 0x3f41543f),
//   o.u(0x8081c14, 0xc14100c), o.u(0x959563f6, 0x52f63152),
//   o.u(0x4646e9af, 0x65af8c65), o.u(0x9d9d7fe2, 0x5ee2215e),
//   o.u(0x30304878, 0x28786028), o.u(0x3737cff8, 0xa1f86ea1),
//   o.u(0xa0a1b11, 0xf11140f), o.u(0x2f2febc4, 0xb5c45eb5),
//   o.u(0xe0e151b, 0x91b1c09), o.u(0x24247e5a, 0x365a4836),
//   o.u(0x1b1badb6, 0x9bb6369b), o.u(0xdfdf9847, 0x3d47a53d),
//   o.u(0xcdcda76a, 0x266a8126), o.u(0x4e4ef5bb, 0x69bb9c69),
//   o.u(0x7f7f334c, 0xcd4cfecd), o.u(0xeaea50ba, 0x9fbacf9f),
//   o.u(0x12123f2d, 0x1b2d241b), o.u(0x1d1da4b9, 0x9eb93a9e),
//   o.u(0x5858c49c, 0x749cb074), o.u(0x34344672, 0x2e72682e),
//   o.u(0x36364177, 0x2d776c2d), o.u(0xdcdc11cd, 0xb2cda3b2),
//   o.u(0xb4b49d29, 0xee2973ee), o.u(0x5b5b4d16, 0xfb16b6fb),
//   o.u(0xa4a4a501, 0xf60153f6), o.u(0x7676a1d7, 0x4dd7ec4d),
//   o.u(0xb7b714a3, 0x61a37561), o.u(0x7d7d3449, 0xce49face),
//   o.u(0x5252df8d, 0x7b8da47b), o.u(0xdddd9f42, 0x3e42a13e),
//   o.u(0x5e5ecd93, 0x7193bc71), o.u(0x1313b1a2, 0x97a22697),
//   o.u(0xa6a6a204, 0xf50457f5), o.u(0xb9b901b8, 0x68b86968),
//   o.u(0x0, 0x0), o.u(0xc1c1b574, 0x2c74992c),
//   o.u(0x4040e0a0, 0x60a08060), o.u(0xe3e3c221, 0x1f21dd1f),
//   o.u(0x79793a43, 0xc843f2c8), o.u(0xb6b69a2c, 0xed2c77ed),
//   o.u(0xd4d40dd9, 0xbed9b3be), o.u(0x8d8d47ca, 0x46ca0146),
//   o.u(0x67671770, 0xd970ced9), o.u(0x7272afdd, 0x4bdde44b),
//   o.u(0x9494ed79, 0xde7933de), o.u(0x9898ff67, 0xd4672bd4),
//   o.u(0xb0b09323, 0xe8237be8), o.u(0x85855bde, 0x4ade114a),
//   o.u(0xbbbb06bd, 0x6bbd6d6b), o.u(0xc5c5bb7e, 0x2a7e912a),
//   o.u(0x4f4f7b34, 0xe5349ee5), o.u(0xededd73a, 0x163ac116),
//   o.u(0x8686d254, 0xc55417c5), o.u(0x9a9af862, 0xd7622fd7),
//   o.u(0x666699ff, 0x55ffcc55), o.u(0x1111b6a7, 0x94a72294),
//   o.u(0x8a8ac04a, 0xcf4a0fcf), o.u(0xe9e9d930, 0x1030c910),
//   o.u(0x4040e0a, 0x60a0806), o.u(0xfefe6698, 0x8198e781),
//   o.u(0xa0a0ab0b, 0xf00b5bf0), o.u(0x7878b4cc, 0x44ccf044),
//   o.u(0x2525f0d5, 0xbad54aba), o.u(0x4b4b753e, 0xe33e96e3),
//   o.u(0xa2a2ac0e, 0xf30e5ff3), o.u(0x5d5d4419, 0xfe19bafe),
//   o.u(0x8080db5b, 0xc05b1bc0), o.u(0x5058085, 0x8a850a8a),
//   o.u(0x3f3fd3ec, 0xadec7ead), o.u(0x2121fedf, 0xbcdf42bc),
//   o.u(0x7070a8d8, 0x48d8e048), o.u(0xf1f1fd0c, 0x40cf904),
//   o.u(0x6363197a, 0xdf7ac6df), o.u(0x77772f58, 0xc158eec1),
//   o.u(0xafaf309f, 0x759f4575), o.u(0x4242e7a5, 0x63a58463),
//   o.u(0x20207050, 0x30504030), o.u(0xe5e5cb2e, 0x1a2ed11a),
//   o.u(0xfdfdef12, 0xe12e10e), o.u(0xbfbf08b7, 0x6db7656d),
//   o.u(0x818155d4, 0x4cd4194c), o.u(0x1818243c, 0x143c3014),
//   o.u(0x2626795f, 0x355f4c35), o.u(0xc3c3b271, 0x2f719d2f),
//   o.u(0xbebe8638, 0xe13867e1), o.u(0x3535c8fd, 0xa2fd6aa2),
//   o.u(0x8888c74f, 0xcc4f0bcc), o.u(0x2e2e654b, 0x394b5c39),
//   o.u(0x93936af9, 0x57f93d57), o.u(0x5555580d, 0xf20daaf2),
//   o.u(0xfcfc619d, 0x829de382), o.u(0x7a7ab3c9, 0x47c9f447),
//   o.u(0xc8c827ef, 0xacef8bac), o.u(0xbaba8832, 0xe7326fe7),
//   o.u(0x32324f7d, 0x2b7d642b), o.u(0xe6e642a4, 0x95a4d795),
//   o.u(0xc0c03bfb, 0xa0fb9ba0), o.u(0x1919aab3, 0x98b33298),
//   o.u(0x9e9ef668, 0xd16827d1), o.u(0xa3a32281, 0x7f815d7f),
//   o.u(0x4444eeaa, 0x66aa8866), o.u(0x5454d682, 0x7e82a87e),
//   o.u(0x3b3bdde6, 0xabe676ab), o.u(0xb0b959e, 0x839e1683),
//   o.u(0x8c8cc945, 0xca4503ca), o.u(0xc7c7bc7b, 0x297b9529),
//   o.u(0x6b6b056e, 0xd36ed6d3), o.u(0x28286c44, 0x3c44503c),
//   o.u(0xa7a72c8b, 0x798b5579), o.u(0xbcbc813d, 0xe23d63e2),
//   o.u(0x16163127, 0x1d272c1d), o.u(0xadad379a, 0x769a4176),
//   o.u(0xdbdb964d, 0x3b4dad3b), o.u(0x64649efa, 0x56fac856),
//   o.u(0x7474a6d2, 0x4ed2e84e), o.u(0x14143622, 0x1e22281e),
//   o.u(0x9292e476, 0xdb763fdb), o.u(0xc0c121e, 0xa1e180a),
//   o.u(0x4848fcb4, 0x6cb4906c), o.u(0xb8b88f37, 0xe4376be4),
//   o.u(0x9f9f78e7, 0x5de7255d), o.u(0xbdbd0fb2, 0x6eb2616e),
//   o.u(0x4343692a, 0xef2a86ef), o.u(0xc4c435f1, 0xa6f193a6),
//   o.u(0x3939dae3, 0xa8e372a8), o.u(0x3131c6f7, 0xa4f762a4),
//   o.u(0xd3d38a59, 0x3759bd37), o.u(0xf2f27486, 0x8b86ff8b),
//   o.u(0xd5d58356, 0x3256b132), o.u(0x8b8b4ec5, 0x43c50d43),
//   o.u(0x6e6e85eb, 0x59ebdc59), o.u(0xdada18c2, 0xb7c2afb7),
//   o.u(0x1018e8f, 0x8c8f028c), o.u(0xb1b11dac, 0x64ac7964),
//   o.u(0x9c9cf16d, 0xd26d23d2), o.u(0x4949723b, 0xe03b92e0),
//   o.u(0xd8d81fc7, 0xb4c7abb4), o.u(0xacacb915, 0xfa1543fa),
//   o.u(0xf3f3fa09, 0x709fd07), o.u(0xcfcfa06f, 0x256f8525),
//   o.u(0xcaca20ea, 0xafea8faf), o.u(0xf4f47d89, 0x8e89f38e),
//   o.u(0x47476720, 0xe9208ee9), o.u(0x10103828, 0x18282018),
//   o.u(0x6f6f0b64, 0xd564ded5), o.u(0xf0f07383, 0x8883fb88),
//   o.u(0x4a4afbb1, 0x6fb1946f), o.u(0x5c5cca96, 0x7296b872),
//   o.u(0x3838546c, 0x246c7024), o.u(0x57575f08, 0xf108aef1),
//   o.u(0x73732152, 0xc752e6c7), o.u(0x979764f3, 0x51f33551),
//   o.u(0xcbcbae65, 0x23658d23), o.u(0xa1a12584, 0x7c84597c),
//   o.u(0xe8e857bf, 0x9cbfcb9c), o.u(0x3e3e5d63, 0x21637c21),
//   o.u(0x9696ea7c, 0xdd7c37dd), o.u(0x61611e7f, 0xdc7fc2dc),
//   o.u(0xd0d9c91, 0x86911a86), o.u(0xf0f9b94, 0x85941e85),
//   o.u(0xe0e04bab, 0x90abdb90), o.u(0x7c7cbac6, 0x42c6f842),
//   o.u(0x71712657, 0xc457e2c4), o.u(0xcccc29e5, 0xaae583aa),
//   o.u(0x9090e373, 0xd8733bd8), o.u(0x606090f, 0x50f0c05),
//   o.u(0xf7f7f403, 0x103f501), o.u(0x1c1c2a36, 0x12363812),
//   o.u(0xc2c23cfe, 0xa3fe9fa3), o.u(0x6a6a8be1, 0x5fe1d45f),
//   o.u(0xaeaebe10, 0xf91047f9), o.u(0x6969026b, 0xd06bd2d0),
//   o.u(0x1717bfa8, 0x91a82e91), o.u(0x999971e8, 0x58e82958),
//   o.u(0x3a3a5369, 0x27697427), o.u(0x2727f7d0, 0xb9d04eb9),
//   o.u(0xd9d99148, 0x3848a938), o.u(0xebebde35, 0x1335cd13),
//   o.u(0x2b2be5ce, 0xb3ce56b3), o.u(0x22227755, 0x33554433),
//   o.u(0xd2d204d6, 0xbbd6bfbb), o.u(0xa9a93990, 0x70904970),
//   o.u(0x7078780, 0x89800e89), o.u(0x3333c1f2, 0xa7f266a7),
//   o.u(0x2d2decc1, 0xb6c15ab6), o.u(0x3c3c5a66, 0x22667822),
//   o.u(0x1515b8ad, 0x92ad2a92), o.u(0xc9c9a960, 0x20608920),
//   o.u(0x87875cdb, 0x49db1549), o.u(0xaaaab01a, 0xff1a4fff),
//   o.u(0x5050d888, 0x7888a078), o.u(0xa5a52b8e, 0x7a8e517a),
//   o.u(0x303898a, 0x8f8a068f), o.u(0x59594a13, 0xf813b2f8),
//   o.u(0x909929b, 0x809b1280), o.u(0x1a1a2339, 0x17393417),
//   o.u(0x65651075, 0xda75cada), o.u(0xd7d78453, 0x3153b531),
//   o.u(0x8484d551, 0xc65113c6), o.u(0xd0d003d3, 0xb8d3bbb8),
//   o.u(0x8282dc5e, 0xc35e1fc3), o.u(0x2929e2cb, 0xb0cb52b0),
//   o.u(0x5a5ac399, 0x7799b477), o.u(0x1e1e2d33, 0x11333c11),
//   o.u(0x7b7b3d46, 0xcb46f6cb), o.u(0xa8a8b71f, 0xfc1f4bfc),
//   o.u(0x6d6d0c61, 0xd661dad6), o.u(0x2c2c624e, 0x3a4e583a)
// ];

// var T2 = [
//   o.u(0xa5c6c632, 0xf4a5f497), o.u(0x84f8f86f, 0x978497eb),
//   o.u(0x99eeee5e, 0xb099b0c7), o.u(0x8df6f67a, 0x8c8d8cf7),
//   o.u(0xdffffe8, 0x170d17e5), o.u(0xbdd6d60a, 0xdcbddcb7),
//   o.u(0xb1dede16, 0xc8b1c8a7), o.u(0x5491916d, 0xfc54fc39),
//   o.u(0x50606090, 0xf050f0c0), o.u(0x3020207, 0x5030504),
//   o.u(0xa9cece2e, 0xe0a9e087), o.u(0x7d5656d1, 0x877d87ac),
//   o.u(0x19e7e7cc, 0x2b192bd5), o.u(0x62b5b513, 0xa662a671),
//   o.u(0xe64d4d7c, 0x31e6319a), o.u(0x9aecec59, 0xb59ab5c3),
//   o.u(0x458f8f40, 0xcf45cf05), o.u(0x9d1f1fa3, 0xbc9dbc3e),
//   o.u(0x40898949, 0xc040c009), o.u(0x87fafa68, 0x928792ef),
//   o.u(0x15efefd0, 0x3f153fc5), o.u(0xebb2b294, 0x26eb267f),
//   o.u(0xc98e8ece, 0x40c94007), o.u(0xbfbfbe6, 0x1d0b1ded),
//   o.u(0xec41416e, 0x2fec2f82), o.u(0x67b3b31a, 0xa967a97d),
//   o.u(0xfd5f5f43, 0x1cfd1cbe), o.u(0xea454560, 0x25ea258a),
//   o.u(0xbf2323f9, 0xdabfda46), o.u(0xf7535351, 0x2f702a6),
//   o.u(0x96e4e445, 0xa196a1d3), o.u(0x5b9b9b76, 0xed5bed2d),
//   o.u(0xc2757528, 0x5dc25dea), o.u(0x1ce1e1c5, 0x241c24d9),
//   o.u(0xae3d3dd4, 0xe9aee97a), o.u(0x6a4c4cf2, 0xbe6abe98),
//   o.u(0x5a6c6c82, 0xee5aeed8), o.u(0x417e7ebd, 0xc341c3fc),
//   o.u(0x2f5f5f3, 0x60206f1), o.u(0x4f838352, 0xd14fd11d),
//   o.u(0x5c68688c, 0xe45ce4d0), o.u(0xf4515156, 0x7f407a2),
//   o.u(0x34d1d18d, 0x5c345cb9), o.u(0x8f9f9e1, 0x180818e9),
//   o.u(0x93e2e24c, 0xae93aedf), o.u(0x73abab3e, 0x9573954d),
//   o.u(0x53626297, 0xf553f5c4), o.u(0x3f2a2a6b, 0x413f4154),
//   o.u(0xc08081c, 0x140c1410), o.u(0x52959563, 0xf652f631),
//   o.u(0x654646e9, 0xaf65af8c), o.u(0x5e9d9d7f, 0xe25ee221),
//   o.u(0x28303048, 0x78287860), o.u(0xa13737cf, 0xf8a1f86e),
//   o.u(0xf0a0a1b, 0x110f1114), o.u(0xb52f2feb, 0xc4b5c45e),
//   o.u(0x90e0e15, 0x1b091b1c), o.u(0x3624247e, 0x5a365a48),
//   o.u(0x9b1b1bad, 0xb69bb636), o.u(0x3ddfdf98, 0x473d47a5),
//   o.u(0x26cdcda7, 0x6a266a81), o.u(0x694e4ef5, 0xbb69bb9c),
//   o.u(0xcd7f7f33, 0x4ccd4cfe), o.u(0x9feaea50, 0xba9fbacf),
//   o.u(0x1b12123f, 0x2d1b2d24), o.u(0x9e1d1da4, 0xb99eb93a),
//   o.u(0x745858c4, 0x9c749cb0), o.u(0x2e343446, 0x722e7268),
//   o.u(0x2d363641, 0x772d776c), o.u(0xb2dcdc11, 0xcdb2cda3),
//   o.u(0xeeb4b49d, 0x29ee2973), o.u(0xfb5b5b4d, 0x16fb16b6),
//   o.u(0xf6a4a4a5, 0x1f60153), o.u(0x4d7676a1, 0xd74dd7ec),
//   o.u(0x61b7b714, 0xa361a375), o.u(0xce7d7d34, 0x49ce49fa),
//   o.u(0x7b5252df, 0x8d7b8da4), o.u(0x3edddd9f, 0x423e42a1),
//   o.u(0x715e5ecd, 0x937193bc), o.u(0x971313b1, 0xa297a226),
//   o.u(0xf5a6a6a2, 0x4f50457), o.u(0x68b9b901, 0xb868b869),
//   o.u(0x0, 0x0), o.u(0x2cc1c1b5, 0x742c7499),
//   o.u(0x604040e0, 0xa060a080), o.u(0x1fe3e3c2, 0x211f21dd),
//   o.u(0xc879793a, 0x43c843f2), o.u(0xedb6b69a, 0x2ced2c77),
//   o.u(0xbed4d40d, 0xd9bed9b3), o.u(0x468d8d47, 0xca46ca01),
//   o.u(0xd9676717, 0x70d970ce), o.u(0x4b7272af, 0xdd4bdde4),
//   o.u(0xde9494ed, 0x79de7933), o.u(0xd49898ff, 0x67d4672b),
//   o.u(0xe8b0b093, 0x23e8237b), o.u(0x4a85855b, 0xde4ade11),
//   o.u(0x6bbbbb06, 0xbd6bbd6d), o.u(0x2ac5c5bb, 0x7e2a7e91),
//   o.u(0xe54f4f7b, 0x34e5349e), o.u(0x16ededd7, 0x3a163ac1),
//   o.u(0xc58686d2, 0x54c55417), o.u(0xd79a9af8, 0x62d7622f),
//   o.u(0x55666699, 0xff55ffcc), o.u(0x941111b6, 0xa794a722),
//   o.u(0xcf8a8ac0, 0x4acf4a0f), o.u(0x10e9e9d9, 0x301030c9),
//   o.u(0x604040e, 0xa060a08), o.u(0x81fefe66, 0x988198e7),
//   o.u(0xf0a0a0ab, 0xbf00b5b), o.u(0x447878b4, 0xcc44ccf0),
//   o.u(0xba2525f0, 0xd5bad54a), o.u(0xe34b4b75, 0x3ee33e96),
//   o.u(0xf3a2a2ac, 0xef30e5f), o.u(0xfe5d5d44, 0x19fe19ba),
//   o.u(0xc08080db, 0x5bc05b1b), o.u(0x8a050580, 0x858a850a),
//   o.u(0xad3f3fd3, 0xecadec7e), o.u(0xbc2121fe, 0xdfbcdf42),
//   o.u(0x487070a8, 0xd848d8e0), o.u(0x4f1f1fd, 0xc040cf9),
//   o.u(0xdf636319, 0x7adf7ac6), o.u(0xc177772f, 0x58c158ee),
//   o.u(0x75afaf30, 0x9f759f45), o.u(0x634242e7, 0xa563a584),
//   o.u(0x30202070, 0x50305040), o.u(0x1ae5e5cb, 0x2e1a2ed1),
//   o.u(0xefdfdef, 0x120e12e1), o.u(0x6dbfbf08, 0xb76db765),
//   o.u(0x4c818155, 0xd44cd419), o.u(0x14181824, 0x3c143c30),
//   o.u(0x35262679, 0x5f355f4c), o.u(0x2fc3c3b2, 0x712f719d),
//   o.u(0xe1bebe86, 0x38e13867), o.u(0xa23535c8, 0xfda2fd6a),
//   o.u(0xcc8888c7, 0x4fcc4f0b), o.u(0x392e2e65, 0x4b394b5c),
//   o.u(0x5793936a, 0xf957f93d), o.u(0xf2555558, 0xdf20daa),
//   o.u(0x82fcfc61, 0x9d829de3), o.u(0x477a7ab3, 0xc947c9f4),
//   o.u(0xacc8c827, 0xefacef8b), o.u(0xe7baba88, 0x32e7326f),
//   o.u(0x2b32324f, 0x7d2b7d64), o.u(0x95e6e642, 0xa495a4d7),
//   o.u(0xa0c0c03b, 0xfba0fb9b), o.u(0x981919aa, 0xb398b332),
//   o.u(0xd19e9ef6, 0x68d16827), o.u(0x7fa3a322, 0x817f815d),
//   o.u(0x664444ee, 0xaa66aa88), o.u(0x7e5454d6, 0x827e82a8),
//   o.u(0xab3b3bdd, 0xe6abe676), o.u(0x830b0b95, 0x9e839e16),
//   o.u(0xca8c8cc9, 0x45ca4503), o.u(0x29c7c7bc, 0x7b297b95),
//   o.u(0xd36b6b05, 0x6ed36ed6), o.u(0x3c28286c, 0x443c4450),
//   o.u(0x79a7a72c, 0x8b798b55), o.u(0xe2bcbc81, 0x3de23d63),
//   o.u(0x1d161631, 0x271d272c), o.u(0x76adad37, 0x9a769a41),
//   o.u(0x3bdbdb96, 0x4d3b4dad), o.u(0x5664649e, 0xfa56fac8),
//   o.u(0x4e7474a6, 0xd24ed2e8), o.u(0x1e141436, 0x221e2228),
//   o.u(0xdb9292e4, 0x76db763f), o.u(0xa0c0c12, 0x1e0a1e18),
//   o.u(0x6c4848fc, 0xb46cb490), o.u(0xe4b8b88f, 0x37e4376b),
//   o.u(0x5d9f9f78, 0xe75de725), o.u(0x6ebdbd0f, 0xb26eb261),
//   o.u(0xef434369, 0x2aef2a86), o.u(0xa6c4c435, 0xf1a6f193),
//   o.u(0xa83939da, 0xe3a8e372), o.u(0xa43131c6, 0xf7a4f762),
//   o.u(0x37d3d38a, 0x593759bd), o.u(0x8bf2f274, 0x868b86ff),
//   o.u(0x32d5d583, 0x563256b1), o.u(0x438b8b4e, 0xc543c50d),
//   o.u(0x596e6e85, 0xeb59ebdc), o.u(0xb7dada18, 0xc2b7c2af),
//   o.u(0x8c01018e, 0x8f8c8f02), o.u(0x64b1b11d, 0xac64ac79),
//   o.u(0xd29c9cf1, 0x6dd26d23), o.u(0xe0494972, 0x3be03b92),
//   o.u(0xb4d8d81f, 0xc7b4c7ab), o.u(0xfaacacb9, 0x15fa1543),
//   o.u(0x7f3f3fa, 0x90709fd), o.u(0x25cfcfa0, 0x6f256f85),
//   o.u(0xafcaca20, 0xeaafea8f), o.u(0x8ef4f47d, 0x898e89f3),
//   o.u(0xe9474767, 0x20e9208e), o.u(0x18101038, 0x28182820),
//   o.u(0xd56f6f0b, 0x64d564de), o.u(0x88f0f073, 0x838883fb),
//   o.u(0x6f4a4afb, 0xb16fb194), o.u(0x725c5cca, 0x967296b8),
//   o.u(0x24383854, 0x6c246c70), o.u(0xf157575f, 0x8f108ae),
//   o.u(0xc7737321, 0x52c752e6), o.u(0x51979764, 0xf351f335),
//   o.u(0x23cbcbae, 0x6523658d), o.u(0x7ca1a125, 0x847c8459),
//   o.u(0x9ce8e857, 0xbf9cbfcb), o.u(0x213e3e5d, 0x6321637c),
//   o.u(0xdd9696ea, 0x7cdd7c37), o.u(0xdc61611e, 0x7fdc7fc2),
//   o.u(0x860d0d9c, 0x9186911a), o.u(0x850f0f9b, 0x9485941e),
//   o.u(0x90e0e04b, 0xab90abdb), o.u(0x427c7cba, 0xc642c6f8),
//   o.u(0xc4717126, 0x57c457e2), o.u(0xaacccc29, 0xe5aae583),
//   o.u(0xd89090e3, 0x73d8733b), o.u(0x5060609, 0xf050f0c),
//   o.u(0x1f7f7f4, 0x30103f5), o.u(0x121c1c2a, 0x36123638),
//   o.u(0xa3c2c23c, 0xfea3fe9f), o.u(0x5f6a6a8b, 0xe15fe1d4),
//   o.u(0xf9aeaebe, 0x10f91047), o.u(0xd0696902, 0x6bd06bd2),
//   o.u(0x911717bf, 0xa891a82e), o.u(0x58999971, 0xe858e829),
//   o.u(0x273a3a53, 0x69276974), o.u(0xb92727f7, 0xd0b9d04e),
//   o.u(0x38d9d991, 0x483848a9), o.u(0x13ebebde, 0x351335cd),
//   o.u(0xb32b2be5, 0xceb3ce56), o.u(0x33222277, 0x55335544),
//   o.u(0xbbd2d204, 0xd6bbd6bf), o.u(0x70a9a939, 0x90709049),
//   o.u(0x89070787, 0x8089800e), o.u(0xa73333c1, 0xf2a7f266),
//   o.u(0xb62d2dec, 0xc1b6c15a), o.u(0x223c3c5a, 0x66226678),
//   o.u(0x921515b8, 0xad92ad2a), o.u(0x20c9c9a9, 0x60206089),
//   o.u(0x4987875c, 0xdb49db15), o.u(0xffaaaab0, 0x1aff1a4f),
//   o.u(0x785050d8, 0x887888a0), o.u(0x7aa5a52b, 0x8e7a8e51),
//   o.u(0x8f030389, 0x8a8f8a06), o.u(0xf859594a, 0x13f813b2),
//   o.u(0x80090992, 0x9b809b12), o.u(0x171a1a23, 0x39173934),
//   o.u(0xda656510, 0x75da75ca), o.u(0x31d7d784, 0x533153b5),
//   o.u(0xc68484d5, 0x51c65113), o.u(0xb8d0d003, 0xd3b8d3bb),
//   o.u(0xc38282dc, 0x5ec35e1f), o.u(0xb02929e2, 0xcbb0cb52),
//   o.u(0x775a5ac3, 0x997799b4), o.u(0x111e1e2d, 0x3311333c),
//   o.u(0xcb7b7b3d, 0x46cb46f6), o.u(0xfca8a8b7, 0x1ffc1f4b),
//   o.u(0xd66d6d0c, 0x61d661da), o.u(0x3a2c2c62, 0x4e3a4e58)
// ];

// var T3 = [
//   o.u(0x97a5c6c6, 0x32f4a5f4), o.u(0xeb84f8f8, 0x6f978497),
//   o.u(0xc799eeee, 0x5eb099b0), o.u(0xf78df6f6, 0x7a8c8d8c),
//   o.u(0xe50dffff, 0xe8170d17), o.u(0xb7bdd6d6, 0xadcbddc),
//   o.u(0xa7b1dede, 0x16c8b1c8), o.u(0x39549191, 0x6dfc54fc),
//   o.u(0xc0506060, 0x90f050f0), o.u(0x4030202, 0x7050305),
//   o.u(0x87a9cece, 0x2ee0a9e0), o.u(0xac7d5656, 0xd1877d87),
//   o.u(0xd519e7e7, 0xcc2b192b), o.u(0x7162b5b5, 0x13a662a6),
//   o.u(0x9ae64d4d, 0x7c31e631), o.u(0xc39aecec, 0x59b59ab5),
//   o.u(0x5458f8f, 0x40cf45cf), o.u(0x3e9d1f1f, 0xa3bc9dbc),
//   o.u(0x9408989, 0x49c040c0), o.u(0xef87fafa, 0x68928792),
//   o.u(0xc515efef, 0xd03f153f), o.u(0x7febb2b2, 0x9426eb26),
//   o.u(0x7c98e8e, 0xce40c940), o.u(0xed0bfbfb, 0xe61d0b1d),
//   o.u(0x82ec4141, 0x6e2fec2f), o.u(0x7d67b3b3, 0x1aa967a9),
//   o.u(0xbefd5f5f, 0x431cfd1c), o.u(0x8aea4545, 0x6025ea25),
//   o.u(0x46bf2323, 0xf9dabfda), o.u(0xa6f75353, 0x5102f702),
//   o.u(0xd396e4e4, 0x45a196a1), o.u(0x2d5b9b9b, 0x76ed5bed),
//   o.u(0xeac27575, 0x285dc25d), o.u(0xd91ce1e1, 0xc5241c24),
//   o.u(0x7aae3d3d, 0xd4e9aee9), o.u(0x986a4c4c, 0xf2be6abe),
//   o.u(0xd85a6c6c, 0x82ee5aee), o.u(0xfc417e7e, 0xbdc341c3),
//   o.u(0xf102f5f5, 0xf3060206), o.u(0x1d4f8383, 0x52d14fd1),
//   o.u(0xd05c6868, 0x8ce45ce4), o.u(0xa2f45151, 0x5607f407),
//   o.u(0xb934d1d1, 0x8d5c345c), o.u(0xe908f9f9, 0xe1180818),
//   o.u(0xdf93e2e2, 0x4cae93ae), o.u(0x4d73abab, 0x3e957395),
//   o.u(0xc4536262, 0x97f553f5), o.u(0x543f2a2a, 0x6b413f41),
//   o.u(0x100c0808, 0x1c140c14), o.u(0x31529595, 0x63f652f6),
//   o.u(0x8c654646, 0xe9af65af), o.u(0x215e9d9d, 0x7fe25ee2),
//   o.u(0x60283030, 0x48782878), o.u(0x6ea13737, 0xcff8a1f8),
//   o.u(0x140f0a0a, 0x1b110f11), o.u(0x5eb52f2f, 0xebc4b5c4),
//   o.u(0x1c090e0e, 0x151b091b), o.u(0x48362424, 0x7e5a365a),
//   o.u(0x369b1b1b, 0xadb69bb6), o.u(0xa53ddfdf, 0x98473d47),
//   o.u(0x8126cdcd, 0xa76a266a), o.u(0x9c694e4e, 0xf5bb69bb),
//   o.u(0xfecd7f7f, 0x334ccd4c), o.u(0xcf9feaea, 0x50ba9fba),
//   o.u(0x241b1212, 0x3f2d1b2d), o.u(0x3a9e1d1d, 0xa4b99eb9),
//   o.u(0xb0745858, 0xc49c749c), o.u(0x682e3434, 0x46722e72),
//   o.u(0x6c2d3636, 0x41772d77), o.u(0xa3b2dcdc, 0x11cdb2cd),
//   o.u(0x73eeb4b4, 0x9d29ee29), o.u(0xb6fb5b5b, 0x4d16fb16),
//   o.u(0x53f6a4a4, 0xa501f601), o.u(0xec4d7676, 0xa1d74dd7),
//   o.u(0x7561b7b7, 0x14a361a3), o.u(0xface7d7d, 0x3449ce49),
//   o.u(0xa47b5252, 0xdf8d7b8d), o.u(0xa13edddd, 0x9f423e42),
//   o.u(0xbc715e5e, 0xcd937193), o.u(0x26971313, 0xb1a297a2),
//   o.u(0x57f5a6a6, 0xa204f504), o.u(0x6968b9b9, 0x1b868b8),
//   o.u(0x0, 0x0), o.u(0x992cc1c1, 0xb5742c74),
//   o.u(0x80604040, 0xe0a060a0), o.u(0xdd1fe3e3, 0xc2211f21),
//   o.u(0xf2c87979, 0x3a43c843), o.u(0x77edb6b6, 0x9a2ced2c),
//   o.u(0xb3bed4d4, 0xdd9bed9), o.u(0x1468d8d, 0x47ca46ca),
//   o.u(0xced96767, 0x1770d970), o.u(0xe44b7272, 0xafdd4bdd),
//   o.u(0x33de9494, 0xed79de79), o.u(0x2bd49898, 0xff67d467),
//   o.u(0x7be8b0b0, 0x9323e823), o.u(0x114a8585, 0x5bde4ade),
//   o.u(0x6d6bbbbb, 0x6bd6bbd), o.u(0x912ac5c5, 0xbb7e2a7e),
//   o.u(0x9ee54f4f, 0x7b34e534), o.u(0xc116eded, 0xd73a163a),
//   o.u(0x17c58686, 0xd254c554), o.u(0x2fd79a9a, 0xf862d762),
//   o.u(0xcc556666, 0x99ff55ff), o.u(0x22941111, 0xb6a794a7),
//   o.u(0xfcf8a8a, 0xc04acf4a), o.u(0xc910e9e9, 0xd9301030),
//   o.u(0x8060404, 0xe0a060a), o.u(0xe781fefe, 0x66988198),
//   o.u(0x5bf0a0a0, 0xab0bf00b), o.u(0xf0447878, 0xb4cc44cc),
//   o.u(0x4aba2525, 0xf0d5bad5), o.u(0x96e34b4b, 0x753ee33e),
//   o.u(0x5ff3a2a2, 0xac0ef30e), o.u(0xbafe5d5d, 0x4419fe19),
//   o.u(0x1bc08080, 0xdb5bc05b), o.u(0xa8a0505, 0x80858a85),
//   o.u(0x7ead3f3f, 0xd3ecadec), o.u(0x42bc2121, 0xfedfbcdf),
//   o.u(0xe0487070, 0xa8d848d8), o.u(0xf904f1f1, 0xfd0c040c),
//   o.u(0xc6df6363, 0x197adf7a), o.u(0xeec17777, 0x2f58c158),
//   o.u(0x4575afaf, 0x309f759f), o.u(0x84634242, 0xe7a563a5),
//   o.u(0x40302020, 0x70503050), o.u(0xd11ae5e5, 0xcb2e1a2e),
//   o.u(0xe10efdfd, 0xef120e12), o.u(0x656dbfbf, 0x8b76db7),
//   o.u(0x194c8181, 0x55d44cd4), o.u(0x30141818, 0x243c143c),
//   o.u(0x4c352626, 0x795f355f), o.u(0x9d2fc3c3, 0xb2712f71),
//   o.u(0x67e1bebe, 0x8638e138), o.u(0x6aa23535, 0xc8fda2fd),
//   o.u(0xbcc8888, 0xc74fcc4f), o.u(0x5c392e2e, 0x654b394b),
//   o.u(0x3d579393, 0x6af957f9), o.u(0xaaf25555, 0x580df20d),
//   o.u(0xe382fcfc, 0x619d829d), o.u(0xf4477a7a, 0xb3c947c9),
//   o.u(0x8bacc8c8, 0x27efacef), o.u(0x6fe7baba, 0x8832e732),
//   o.u(0x642b3232, 0x4f7d2b7d), o.u(0xd795e6e6, 0x42a495a4),
//   o.u(0x9ba0c0c0, 0x3bfba0fb), o.u(0x32981919, 0xaab398b3),
//   o.u(0x27d19e9e, 0xf668d168), o.u(0x5d7fa3a3, 0x22817f81),
//   o.u(0x88664444, 0xeeaa66aa), o.u(0xa87e5454, 0xd6827e82),
//   o.u(0x76ab3b3b, 0xdde6abe6), o.u(0x16830b0b, 0x959e839e),
//   o.u(0x3ca8c8c, 0xc945ca45), o.u(0x9529c7c7, 0xbc7b297b),
//   o.u(0xd6d36b6b, 0x56ed36e), o.u(0x503c2828, 0x6c443c44),
//   o.u(0x5579a7a7, 0x2c8b798b), o.u(0x63e2bcbc, 0x813de23d),
//   o.u(0x2c1d1616, 0x31271d27), o.u(0x4176adad, 0x379a769a),
//   o.u(0xad3bdbdb, 0x964d3b4d), o.u(0xc8566464, 0x9efa56fa),
//   o.u(0xe84e7474, 0xa6d24ed2), o.u(0x281e1414, 0x36221e22),
//   o.u(0x3fdb9292, 0xe476db76), o.u(0x180a0c0c, 0x121e0a1e),
//   o.u(0x906c4848, 0xfcb46cb4), o.u(0x6be4b8b8, 0x8f37e437),
//   o.u(0x255d9f9f, 0x78e75de7), o.u(0x616ebdbd, 0xfb26eb2),
//   o.u(0x86ef4343, 0x692aef2a), o.u(0x93a6c4c4, 0x35f1a6f1),
//   o.u(0x72a83939, 0xdae3a8e3), o.u(0x62a43131, 0xc6f7a4f7),
//   o.u(0xbd37d3d3, 0x8a593759), o.u(0xff8bf2f2, 0x74868b86),
//   o.u(0xb132d5d5, 0x83563256), o.u(0xd438b8b, 0x4ec543c5),
//   o.u(0xdc596e6e, 0x85eb59eb), o.u(0xafb7dada, 0x18c2b7c2),
//   o.u(0x28c0101, 0x8e8f8c8f), o.u(0x7964b1b1, 0x1dac64ac),
//   o.u(0x23d29c9c, 0xf16dd26d), o.u(0x92e04949, 0x723be03b),
//   o.u(0xabb4d8d8, 0x1fc7b4c7), o.u(0x43faacac, 0xb915fa15),
//   o.u(0xfd07f3f3, 0xfa090709), o.u(0x8525cfcf, 0xa06f256f),
//   o.u(0x8fafcaca, 0x20eaafea), o.u(0xf38ef4f4, 0x7d898e89),
//   o.u(0x8ee94747, 0x6720e920), o.u(0x20181010, 0x38281828),
//   o.u(0xded56f6f, 0xb64d564), o.u(0xfb88f0f0, 0x73838883),
//   o.u(0x946f4a4a, 0xfbb16fb1), o.u(0xb8725c5c, 0xca967296),
//   o.u(0x70243838, 0x546c246c), o.u(0xaef15757, 0x5f08f108),
//   o.u(0xe6c77373, 0x2152c752), o.u(0x35519797, 0x64f351f3),
//   o.u(0x8d23cbcb, 0xae652365), o.u(0x597ca1a1, 0x25847c84),
//   o.u(0xcb9ce8e8, 0x57bf9cbf), o.u(0x7c213e3e, 0x5d632163),
//   o.u(0x37dd9696, 0xea7cdd7c), o.u(0xc2dc6161, 0x1e7fdc7f),
//   o.u(0x1a860d0d, 0x9c918691), o.u(0x1e850f0f, 0x9b948594),
//   o.u(0xdb90e0e0, 0x4bab90ab), o.u(0xf8427c7c, 0xbac642c6),
//   o.u(0xe2c47171, 0x2657c457), o.u(0x83aacccc, 0x29e5aae5),
//   o.u(0x3bd89090, 0xe373d873), o.u(0xc050606, 0x90f050f),
//   o.u(0xf501f7f7, 0xf4030103), o.u(0x38121c1c, 0x2a361236),
//   o.u(0x9fa3c2c2, 0x3cfea3fe), o.u(0xd45f6a6a, 0x8be15fe1),
//   o.u(0x47f9aeae, 0xbe10f910), o.u(0xd2d06969, 0x26bd06b),
//   o.u(0x2e911717, 0xbfa891a8), o.u(0x29589999, 0x71e858e8),
//   o.u(0x74273a3a, 0x53692769), o.u(0x4eb92727, 0xf7d0b9d0),
//   o.u(0xa938d9d9, 0x91483848), o.u(0xcd13ebeb, 0xde351335),
//   o.u(0x56b32b2b, 0xe5ceb3ce), o.u(0x44332222, 0x77553355),
//   o.u(0xbfbbd2d2, 0x4d6bbd6), o.u(0x4970a9a9, 0x39907090),
//   o.u(0xe890707, 0x87808980), o.u(0x66a73333, 0xc1f2a7f2),
//   o.u(0x5ab62d2d, 0xecc1b6c1), o.u(0x78223c3c, 0x5a662266),
//   o.u(0x2a921515, 0xb8ad92ad), o.u(0x8920c9c9, 0xa9602060),
//   o.u(0x15498787, 0x5cdb49db), o.u(0x4fffaaaa, 0xb01aff1a),
//   o.u(0xa0785050, 0xd8887888), o.u(0x517aa5a5, 0x2b8e7a8e),
//   o.u(0x68f0303, 0x898a8f8a), o.u(0xb2f85959, 0x4a13f813),
//   o.u(0x12800909, 0x929b809b), o.u(0x34171a1a, 0x23391739),
//   o.u(0xcada6565, 0x1075da75), o.u(0xb531d7d7, 0x84533153),
//   o.u(0x13c68484, 0xd551c651), o.u(0xbbb8d0d0, 0x3d3b8d3),
//   o.u(0x1fc38282, 0xdc5ec35e), o.u(0x52b02929, 0xe2cbb0cb),
//   o.u(0xb4775a5a, 0xc3997799), o.u(0x3c111e1e, 0x2d331133),
//   o.u(0xf6cb7b7b, 0x3d46cb46), o.u(0x4bfca8a8, 0xb71ffc1f),
//   o.u(0xdad66d6d, 0xc61d661), o.u(0x583a2c2c, 0x624e3a4e)
// ]

// var T4 = [
//   o.u(0xf497a5c6, 0xc632f4a5), o.u(0x97eb84f8, 0xf86f9784),
//   o.u(0xb0c799ee, 0xee5eb099), o.u(0x8cf78df6, 0xf67a8c8d),
//   o.u(0x17e50dff, 0xffe8170d), o.u(0xdcb7bdd6, 0xd60adcbd),
//   o.u(0xc8a7b1de, 0xde16c8b1), o.u(0xfc395491, 0x916dfc54),
//   o.u(0xf0c05060, 0x6090f050), o.u(0x05040302, 0x02070503),
//   o.u(0xe087a9ce, 0xce2ee0a9), o.u(0x87ac7d56, 0x56d1877d),
//   o.u(0x2bd519e7, 0xe7cc2b19), o.u(0xa67162b5, 0xb513a662),
//   o.u(0x319ae64d, 0x4d7c31e6), o.u(0xb5c39aec, 0xec59b59a),
//   o.u(0xcf05458f, 0x8f40cf45), o.u(0xbc3e9d1f, 0x1fa3bc9d),
//   o.u(0xc0094089, 0x8949c040), o.u(0x92ef87fa, 0xfa689287),
//   o.u(0x3fc515ef, 0xefd03f15), o.u(0x267febb2, 0xb29426eb),
//   o.u(0x4007c98e, 0x8ece40c9), o.u(0x1ded0bfb, 0xfbe61d0b),
//   o.u(0x2f82ec41, 0x416e2fec), o.u(0xa97d67b3, 0xb31aa967),
//   o.u(0x1cbefd5f, 0x5f431cfd), o.u(0x258aea45, 0x456025ea),
//   o.u(0xda46bf23, 0x23f9dabf), o.u(0x02a6f753, 0x535102f7),
//   o.u(0xa1d396e4, 0xe445a196), o.u(0xed2d5b9b, 0x9b76ed5b),
//   o.u(0x5deac275, 0x75285dc2), o.u(0x24d91ce1, 0xe1c5241c),
//   o.u(0xe97aae3d, 0x3dd4e9ae), o.u(0xbe986a4c, 0x4cf2be6a),
//   o.u(0xeed85a6c, 0x6c82ee5a), o.u(0xc3fc417e, 0x7ebdc341),
//   o.u(0x06f102f5, 0xf5f30602), o.u(0xd11d4f83, 0x8352d14f),
//   o.u(0xe4d05c68, 0x688ce45c), o.u(0x07a2f451, 0x515607f4),
//   o.u(0x5cb934d1, 0xd18d5c34), o.u(0x18e908f9, 0xf9e11808),
//   o.u(0xaedf93e2, 0xe24cae93), o.u(0x954d73ab, 0xab3e9573),
//   o.u(0xf5c45362, 0x6297f553), o.u(0x41543f2a, 0x2a6b413f),
//   o.u(0x14100c08, 0x081c140c), o.u(0xf6315295, 0x9563f652),
//   o.u(0xaf8c6546, 0x46e9af65), o.u(0xe2215e9d, 0x9d7fe25e),
//   o.u(0x78602830, 0x30487828), o.u(0xf86ea137, 0x37cff8a1),
//   o.u(0x11140f0a, 0x0a1b110f), o.u(0xc45eb52f, 0x2febc4b5),
//   o.u(0x1b1c090e, 0x0e151b09), o.u(0x5a483624, 0x247e5a36),
//   o.u(0xb6369b1b, 0x1badb69b), o.u(0x47a53ddf, 0xdf98473d),
//   o.u(0x6a8126cd, 0xcda76a26), o.u(0xbb9c694e, 0x4ef5bb69),
//   o.u(0x4cfecd7f, 0x7f334ccd), o.u(0xbacf9fea, 0xea50ba9f),
//   o.u(0x2d241b12, 0x123f2d1b), o.u(0xb93a9e1d, 0x1da4b99e),
//   o.u(0x9cb07458, 0x58c49c74), o.u(0x72682e34, 0x3446722e),
//   o.u(0x776c2d36, 0x3641772d), o.u(0xcda3b2dc, 0xdc11cdb2),
//   o.u(0x2973eeb4, 0xb49d29ee), o.u(0x16b6fb5b, 0x5b4d16fb),
//   o.u(0x0153f6a4, 0xa4a501f6), o.u(0xd7ec4d76, 0x76a1d74d),
//   o.u(0xa37561b7, 0xb714a361), o.u(0x49face7d, 0x7d3449ce),
//   o.u(0x8da47b52, 0x52df8d7b), o.u(0x42a13edd, 0xdd9f423e),
//   o.u(0x93bc715e, 0x5ecd9371), o.u(0xa2269713, 0x13b1a297),
//   o.u(0x0457f5a6, 0xa6a204f5), o.u(0xb86968b9, 0xb901b868),
//   o.u(0x00000000, 0x00000000), o.u(0x74992cc1, 0xc1b5742c),
//   o.u(0xa0806040, 0x40e0a060), o.u(0x21dd1fe3, 0xe3c2211f),
//   o.u(0x43f2c879, 0x793a43c8), o.u(0x2c77edb6, 0xb69a2ced),
//   o.u(0xd9b3bed4, 0xd40dd9be), o.u(0xca01468d, 0x8d47ca46),
//   o.u(0x70ced967, 0x671770d9), o.u(0xdde44b72, 0x72afdd4b),
//   o.u(0x7933de94, 0x94ed79de), o.u(0x672bd498, 0x98ff67d4),
//   o.u(0x237be8b0, 0xb09323e8), o.u(0xde114a85, 0x855bde4a),
//   o.u(0xbd6d6bbb, 0xbb06bd6b), o.u(0x7e912ac5, 0xc5bb7e2a),
//   o.u(0x349ee54f, 0x4f7b34e5), o.u(0x3ac116ed, 0xedd73a16),
//   o.u(0x5417c586, 0x86d254c5), o.u(0x622fd79a, 0x9af862d7),
//   o.u(0xffcc5566, 0x6699ff55), o.u(0xa7229411, 0x11b6a794),
//   o.u(0x4a0fcf8a, 0x8ac04acf), o.u(0x30c910e9, 0xe9d93010),
//   o.u(0x0a080604, 0x040e0a06), o.u(0x98e781fe, 0xfe669881),
//   o.u(0x0b5bf0a0, 0xa0ab0bf0), o.u(0xccf04478, 0x78b4cc44),
//   o.u(0xd54aba25, 0x25f0d5ba), o.u(0x3e96e34b, 0x4b753ee3),
//   o.u(0x0e5ff3a2, 0xa2ac0ef3), o.u(0x19bafe5d, 0x5d4419fe),
//   o.u(0x5b1bc080, 0x80db5bc0), o.u(0x850a8a05, 0x0580858a),
//   o.u(0xec7ead3f, 0x3fd3ecad), o.u(0xdf42bc21, 0x21fedfbc),
//   o.u(0xd8e04870, 0x70a8d848), o.u(0x0cf904f1, 0xf1fd0c04),
//   o.u(0x7ac6df63, 0x63197adf), o.u(0x58eec177, 0x772f58c1),
//   o.u(0x9f4575af, 0xaf309f75), o.u(0xa5846342, 0x42e7a563),
//   o.u(0x50403020, 0x20705030), o.u(0x2ed11ae5, 0xe5cb2e1a),
//   o.u(0x12e10efd, 0xfdef120e), o.u(0xb7656dbf, 0xbf08b76d),
//   o.u(0xd4194c81, 0x8155d44c), o.u(0x3c301418, 0x18243c14),
//   o.u(0x5f4c3526, 0x26795f35), o.u(0x719d2fc3, 0xc3b2712f),
//   o.u(0x3867e1be, 0xbe8638e1), o.u(0xfd6aa235, 0x35c8fda2),
//   o.u(0x4f0bcc88, 0x88c74fcc), o.u(0x4b5c392e, 0x2e654b39),
//   o.u(0xf93d5793, 0x936af957), o.u(0x0daaf255, 0x55580df2),
//   o.u(0x9de382fc, 0xfc619d82), o.u(0xc9f4477a, 0x7ab3c947),
//   o.u(0xef8bacc8, 0xc827efac), o.u(0x326fe7ba, 0xba8832e7),
//   o.u(0x7d642b32, 0x324f7d2b), o.u(0xa4d795e6, 0xe642a495),
//   o.u(0xfb9ba0c0, 0xc03bfba0), o.u(0xb3329819, 0x19aab398),
//   o.u(0x6827d19e, 0x9ef668d1), o.u(0x815d7fa3, 0xa322817f),
//   o.u(0xaa886644, 0x44eeaa66), o.u(0x82a87e54, 0x54d6827e),
//   o.u(0xe676ab3b, 0x3bdde6ab), o.u(0x9e16830b, 0x0b959e83),
//   o.u(0x4503ca8c, 0x8cc945ca), o.u(0x7b9529c7, 0xc7bc7b29),
//   o.u(0x6ed6d36b, 0x6b056ed3), o.u(0x44503c28, 0x286c443c),
//   o.u(0x8b5579a7, 0xa72c8b79), o.u(0x3d63e2bc, 0xbc813de2),
//   o.u(0x272c1d16, 0x1631271d), o.u(0x9a4176ad, 0xad379a76),
//   o.u(0x4dad3bdb, 0xdb964d3b), o.u(0xfac85664, 0x649efa56),
//   o.u(0xd2e84e74, 0x74a6d24e), o.u(0x22281e14, 0x1436221e),
//   o.u(0x763fdb92, 0x92e476db), o.u(0x1e180a0c, 0x0c121e0a),
//   o.u(0xb4906c48, 0x48fcb46c), o.u(0x376be4b8, 0xb88f37e4),
//   o.u(0xe7255d9f, 0x9f78e75d), o.u(0xb2616ebd, 0xbd0fb26e),
//   o.u(0x2a86ef43, 0x43692aef), o.u(0xf193a6c4, 0xc435f1a6),
//   o.u(0xe372a839, 0x39dae3a8), o.u(0xf762a431, 0x31c6f7a4),
//   o.u(0x59bd37d3, 0xd38a5937), o.u(0x86ff8bf2, 0xf274868b),
//   o.u(0x56b132d5, 0xd5835632), o.u(0xc50d438b, 0x8b4ec543),
//   o.u(0xebdc596e, 0x6e85eb59), o.u(0xc2afb7da, 0xda18c2b7),
//   o.u(0x8f028c01, 0x018e8f8c), o.u(0xac7964b1, 0xb11dac64),
//   o.u(0x6d23d29c, 0x9cf16dd2), o.u(0x3b92e049, 0x49723be0),
//   o.u(0xc7abb4d8, 0xd81fc7b4), o.u(0x1543faac, 0xacb915fa),
//   o.u(0x09fd07f3, 0xf3fa0907), o.u(0x6f8525cf, 0xcfa06f25),
//   o.u(0xea8fafca, 0xca20eaaf), o.u(0x89f38ef4, 0xf47d898e),
//   o.u(0x208ee947, 0x476720e9), o.u(0x28201810, 0x10382818),
//   o.u(0x64ded56f, 0x6f0b64d5), o.u(0x83fb88f0, 0xf0738388),
//   o.u(0xb1946f4a, 0x4afbb16f), o.u(0x96b8725c, 0x5cca9672),
//   o.u(0x6c702438, 0x38546c24), o.u(0x08aef157, 0x575f08f1),
//   o.u(0x52e6c773, 0x732152c7), o.u(0xf3355197, 0x9764f351),
//   o.u(0x658d23cb, 0xcbae6523), o.u(0x84597ca1, 0xa125847c),
//   o.u(0xbfcb9ce8, 0xe857bf9c), o.u(0x637c213e, 0x3e5d6321),
//   o.u(0x7c37dd96, 0x96ea7cdd), o.u(0x7fc2dc61, 0x611e7fdc),
//   o.u(0x911a860d, 0x0d9c9186), o.u(0x941e850f, 0x0f9b9485),
//   o.u(0xabdb90e0, 0xe04bab90), o.u(0xc6f8427c, 0x7cbac642),
//   o.u(0x57e2c471, 0x712657c4), o.u(0xe583aacc, 0xcc29e5aa),
//   o.u(0x733bd890, 0x90e373d8), o.u(0x0f0c0506, 0x06090f05),
//   o.u(0x03f501f7, 0xf7f40301), o.u(0x3638121c, 0x1c2a3612),
//   o.u(0xfe9fa3c2, 0xc23cfea3), o.u(0xe1d45f6a, 0x6a8be15f),
//   o.u(0x1047f9ae, 0xaebe10f9), o.u(0x6bd2d069, 0x69026bd0),
//   o.u(0xa82e9117, 0x17bfa891), o.u(0xe8295899, 0x9971e858),
//   o.u(0x6974273a, 0x3a536927), o.u(0xd04eb927, 0x27f7d0b9),
//   o.u(0x48a938d9, 0xd9914838), o.u(0x35cd13eb, 0xebde3513),
//   o.u(0xce56b32b, 0x2be5ceb3), o.u(0x55443322, 0x22775533),
//   o.u(0xd6bfbbd2, 0xd204d6bb), o.u(0x904970a9, 0xa9399070),
//   o.u(0x800e8907, 0x07878089), o.u(0xf266a733, 0x33c1f2a7),
//   o.u(0xc15ab62d, 0x2decc1b6), o.u(0x6678223c, 0x3c5a6622),
//   o.u(0xad2a9215, 0x15b8ad92), o.u(0x608920c9, 0xc9a96020),
//   o.u(0xdb154987, 0x875cdb49), o.u(0x1a4fffaa, 0xaab01aff),
//   o.u(0x88a07850, 0x50d88878), o.u(0x8e517aa5, 0xa52b8e7a),
//   o.u(0x8a068f03, 0x03898a8f), o.u(0x13b2f859, 0x594a13f8),
//   o.u(0x9b128009, 0x09929b80), o.u(0x3934171a, 0x1a233917),
//   o.u(0x75cada65, 0x651075da), o.u(0x53b531d7, 0xd7845331),
//   o.u(0x5113c684, 0x84d551c6), o.u(0xd3bbb8d0, 0xd003d3b8),
//   o.u(0x5e1fc382, 0x82dc5ec3), o.u(0xcb52b029, 0x29e2cbb0),
//   o.u(0x99b4775a, 0x5ac39977), o.u(0x333c111e, 0x1e2d3311),
//   o.u(0x46f6cb7b, 0x7b3d46cb), o.u(0x1f4bfca8, 0xa8b71ffc),
//   o.u(0x61dad66d, 0x6d0c61d6), o.u(0x4e583a2c, 0x2c624e3a)
// ];

// var T5 = [
//   o.u(0xa5f497a5, 0xc6c632f4), o.u(0x8497eb84, 0xf8f86f97),
//   o.u(0x99b0c799, 0xeeee5eb0), o.u(0x8d8cf78d, 0xf6f67a8c),
//   o.u(0xd17e50d, 0xffffe817), o.u(0xbddcb7bd, 0xd6d60adc),
//   o.u(0xb1c8a7b1, 0xdede16c8), o.u(0x54fc3954, 0x91916dfc),
//   o.u(0x50f0c050, 0x606090f0), o.u(0x3050403, 0x2020705),
//   o.u(0xa9e087a9, 0xcece2ee0), o.u(0x7d87ac7d, 0x5656d187),
//   o.u(0x192bd519, 0xe7e7cc2b), o.u(0x62a67162, 0xb5b513a6),
//   o.u(0xe6319ae6, 0x4d4d7c31), o.u(0x9ab5c39a, 0xecec59b5),
//   o.u(0x45cf0545, 0x8f8f40cf), o.u(0x9dbc3e9d, 0x1f1fa3bc),
//   o.u(0x40c00940, 0x898949c0), o.u(0x8792ef87, 0xfafa6892),
//   o.u(0x153fc515, 0xefefd03f), o.u(0xeb267feb, 0xb2b29426),
//   o.u(0xc94007c9, 0x8e8ece40), o.u(0xb1ded0b, 0xfbfbe61d),
//   o.u(0xec2f82ec, 0x41416e2f), o.u(0x67a97d67, 0xb3b31aa9),
//   o.u(0xfd1cbefd, 0x5f5f431c), o.u(0xea258aea, 0x45456025),
//   o.u(0xbfda46bf, 0x2323f9da), o.u(0xf702a6f7, 0x53535102),
//   o.u(0x96a1d396, 0xe4e445a1), o.u(0x5bed2d5b, 0x9b9b76ed),
//   o.u(0xc25deac2, 0x7575285d), o.u(0x1c24d91c, 0xe1e1c524),
//   o.u(0xaee97aae, 0x3d3dd4e9), o.u(0x6abe986a, 0x4c4cf2be),
//   o.u(0x5aeed85a, 0x6c6c82ee), o.u(0x41c3fc41, 0x7e7ebdc3),
//   o.u(0x206f102, 0xf5f5f306), o.u(0x4fd11d4f, 0x838352d1),
//   o.u(0x5ce4d05c, 0x68688ce4), o.u(0xf407a2f4, 0x51515607),
//   o.u(0x345cb934, 0xd1d18d5c), o.u(0x818e908, 0xf9f9e118),
//   o.u(0x93aedf93, 0xe2e24cae), o.u(0x73954d73, 0xabab3e95),
//   o.u(0x53f5c453, 0x626297f5), o.u(0x3f41543f, 0x2a2a6b41),
//   o.u(0xc14100c, 0x8081c14), o.u(0x52f63152, 0x959563f6),
//   o.u(0x65af8c65, 0x4646e9af), o.u(0x5ee2215e, 0x9d9d7fe2),
//   o.u(0x28786028, 0x30304878), o.u(0xa1f86ea1, 0x3737cff8),
//   o.u(0xf11140f, 0xa0a1b11), o.u(0xb5c45eb5, 0x2f2febc4),
//   o.u(0x91b1c09, 0xe0e151b), o.u(0x365a4836, 0x24247e5a),
//   o.u(0x9bb6369b, 0x1b1badb6), o.u(0x3d47a53d, 0xdfdf9847),
//   o.u(0x266a8126, 0xcdcda76a), o.u(0x69bb9c69, 0x4e4ef5bb),
//   o.u(0xcd4cfecd, 0x7f7f334c), o.u(0x9fbacf9f, 0xeaea50ba),
//   o.u(0x1b2d241b, 0x12123f2d), o.u(0x9eb93a9e, 0x1d1da4b9),
//   o.u(0x749cb074, 0x5858c49c), o.u(0x2e72682e, 0x34344672),
//   o.u(0x2d776c2d, 0x36364177), o.u(0xb2cda3b2, 0xdcdc11cd),
//   o.u(0xee2973ee, 0xb4b49d29), o.u(0xfb16b6fb, 0x5b5b4d16),
//   o.u(0xf60153f6, 0xa4a4a501), o.u(0x4dd7ec4d, 0x7676a1d7),
//   o.u(0x61a37561, 0xb7b714a3), o.u(0xce49face, 0x7d7d3449),
//   o.u(0x7b8da47b, 0x5252df8d), o.u(0x3e42a13e, 0xdddd9f42),
//   o.u(0x7193bc71, 0x5e5ecd93), o.u(0x97a22697, 0x1313b1a2),
//   o.u(0xf50457f5, 0xa6a6a204), o.u(0x68b86968, 0xb9b901b8),
//   o.u(0x0, 0x0), o.u(0x2c74992c, 0xc1c1b574),
//   o.u(0x60a08060, 0x4040e0a0), o.u(0x1f21dd1f, 0xe3e3c221),
//   o.u(0xc843f2c8, 0x79793a43), o.u(0xed2c77ed, 0xb6b69a2c),
//   o.u(0xbed9b3be, 0xd4d40dd9), o.u(0x46ca0146, 0x8d8d47ca),
//   o.u(0xd970ced9, 0x67671770), o.u(0x4bdde44b, 0x7272afdd),
//   o.u(0xde7933de, 0x9494ed79), o.u(0xd4672bd4, 0x9898ff67),
//   o.u(0xe8237be8, 0xb0b09323), o.u(0x4ade114a, 0x85855bde),
//   o.u(0x6bbd6d6b, 0xbbbb06bd), o.u(0x2a7e912a, 0xc5c5bb7e),
//   o.u(0xe5349ee5, 0x4f4f7b34), o.u(0x163ac116, 0xededd73a),
//   o.u(0xc55417c5, 0x8686d254), o.u(0xd7622fd7, 0x9a9af862),
//   o.u(0x55ffcc55, 0x666699ff), o.u(0x94a72294, 0x1111b6a7),
//   o.u(0xcf4a0fcf, 0x8a8ac04a), o.u(0x1030c910, 0xe9e9d930),
//   o.u(0x60a0806, 0x4040e0a), o.u(0x8198e781, 0xfefe6698),
//   o.u(0xf00b5bf0, 0xa0a0ab0b), o.u(0x44ccf044, 0x7878b4cc),
//   o.u(0xbad54aba, 0x2525f0d5), o.u(0xe33e96e3, 0x4b4b753e),
//   o.u(0xf30e5ff3, 0xa2a2ac0e), o.u(0xfe19bafe, 0x5d5d4419),
//   o.u(0xc05b1bc0, 0x8080db5b), o.u(0x8a850a8a, 0x5058085),
//   o.u(0xadec7ead, 0x3f3fd3ec), o.u(0xbcdf42bc, 0x2121fedf),
//   o.u(0x48d8e048, 0x7070a8d8), o.u(0x40cf904, 0xf1f1fd0c),
//   o.u(0xdf7ac6df, 0x6363197a), o.u(0xc158eec1, 0x77772f58),
//   o.u(0x759f4575, 0xafaf309f), o.u(0x63a58463, 0x4242e7a5),
//   o.u(0x30504030, 0x20207050), o.u(0x1a2ed11a, 0xe5e5cb2e),
//   o.u(0xe12e10e, 0xfdfdef12), o.u(0x6db7656d, 0xbfbf08b7),
//   o.u(0x4cd4194c, 0x818155d4), o.u(0x143c3014, 0x1818243c),
//   o.u(0x355f4c35, 0x2626795f), o.u(0x2f719d2f, 0xc3c3b271),
//   o.u(0xe13867e1, 0xbebe8638), o.u(0xa2fd6aa2, 0x3535c8fd),
//   o.u(0xcc4f0bcc, 0x8888c74f), o.u(0x394b5c39, 0x2e2e654b),
//   o.u(0x57f93d57, 0x93936af9), o.u(0xf20daaf2, 0x5555580d),
//   o.u(0x829de382, 0xfcfc619d), o.u(0x47c9f447, 0x7a7ab3c9),
//   o.u(0xacef8bac, 0xc8c827ef), o.u(0xe7326fe7, 0xbaba8832),
//   o.u(0x2b7d642b, 0x32324f7d), o.u(0x95a4d795, 0xe6e642a4),
//   o.u(0xa0fb9ba0, 0xc0c03bfb), o.u(0x98b33298, 0x1919aab3),
//   o.u(0xd16827d1, 0x9e9ef668), o.u(0x7f815d7f, 0xa3a32281),
//   o.u(0x66aa8866, 0x4444eeaa), o.u(0x7e82a87e, 0x5454d682),
//   o.u(0xabe676ab, 0x3b3bdde6), o.u(0x839e1683, 0xb0b959e),
//   o.u(0xca4503ca, 0x8c8cc945), o.u(0x297b9529, 0xc7c7bc7b),
//   o.u(0xd36ed6d3, 0x6b6b056e), o.u(0x3c44503c, 0x28286c44),
//   o.u(0x798b5579, 0xa7a72c8b), o.u(0xe23d63e2, 0xbcbc813d),
//   o.u(0x1d272c1d, 0x16163127), o.u(0x769a4176, 0xadad379a),
//   o.u(0x3b4dad3b, 0xdbdb964d), o.u(0x56fac856, 0x64649efa),
//   o.u(0x4ed2e84e, 0x7474a6d2), o.u(0x1e22281e, 0x14143622),
//   o.u(0xdb763fdb, 0x9292e476), o.u(0xa1e180a, 0xc0c121e),
//   o.u(0x6cb4906c, 0x4848fcb4), o.u(0xe4376be4, 0xb8b88f37),
//   o.u(0x5de7255d, 0x9f9f78e7), o.u(0x6eb2616e, 0xbdbd0fb2),
//   o.u(0xef2a86ef, 0x4343692a), o.u(0xa6f193a6, 0xc4c435f1),
//   o.u(0xa8e372a8, 0x3939dae3), o.u(0xa4f762a4, 0x3131c6f7),
//   o.u(0x3759bd37, 0xd3d38a59), o.u(0x8b86ff8b, 0xf2f27486),
//   o.u(0x3256b132, 0xd5d58356), o.u(0x43c50d43, 0x8b8b4ec5),
//   o.u(0x59ebdc59, 0x6e6e85eb), o.u(0xb7c2afb7, 0xdada18c2),
//   o.u(0x8c8f028c, 0x1018e8f), o.u(0x64ac7964, 0xb1b11dac),
//   o.u(0xd26d23d2, 0x9c9cf16d), o.u(0xe03b92e0, 0x4949723b),
//   o.u(0xb4c7abb4, 0xd8d81fc7), o.u(0xfa1543fa, 0xacacb915),
//   o.u(0x709fd07, 0xf3f3fa09), o.u(0x256f8525, 0xcfcfa06f),
//   o.u(0xafea8faf, 0xcaca20ea), o.u(0x8e89f38e, 0xf4f47d89),
//   o.u(0xe9208ee9, 0x47476720), o.u(0x18282018, 0x10103828),
//   o.u(0xd564ded5, 0x6f6f0b64), o.u(0x8883fb88, 0xf0f07383),
//   o.u(0x6fb1946f, 0x4a4afbb1), o.u(0x7296b872, 0x5c5cca96),
//   o.u(0x246c7024, 0x3838546c), o.u(0xf108aef1, 0x57575f08),
//   o.u(0xc752e6c7, 0x73732152), o.u(0x51f33551, 0x979764f3),
//   o.u(0x23658d23, 0xcbcbae65), o.u(0x7c84597c, 0xa1a12584),
//   o.u(0x9cbfcb9c, 0xe8e857bf), o.u(0x21637c21, 0x3e3e5d63),
//   o.u(0xdd7c37dd, 0x9696ea7c), o.u(0xdc7fc2dc, 0x61611e7f),
//   o.u(0x86911a86, 0xd0d9c91), o.u(0x85941e85, 0xf0f9b94),
//   o.u(0x90abdb90, 0xe0e04bab), o.u(0x42c6f842, 0x7c7cbac6),
//   o.u(0xc457e2c4, 0x71712657), o.u(0xaae583aa, 0xcccc29e5),
//   o.u(0xd8733bd8, 0x9090e373), o.u(0x50f0c05, 0x606090f),
//   o.u(0x103f501, 0xf7f7f403), o.u(0x12363812, 0x1c1c2a36),
//   o.u(0xa3fe9fa3, 0xc2c23cfe), o.u(0x5fe1d45f, 0x6a6a8be1),
//   o.u(0xf91047f9, 0xaeaebe10), o.u(0xd06bd2d0, 0x6969026b),
//   o.u(0x91a82e91, 0x1717bfa8), o.u(0x58e82958, 0x999971e8),
//   o.u(0x27697427, 0x3a3a5369), o.u(0xb9d04eb9, 0x2727f7d0),
//   o.u(0x3848a938, 0xd9d99148), o.u(0x1335cd13, 0xebebde35),
//   o.u(0xb3ce56b3, 0x2b2be5ce), o.u(0x33554433, 0x22227755),
//   o.u(0xbbd6bfbb, 0xd2d204d6), o.u(0x70904970, 0xa9a93990),
//   o.u(0x89800e89, 0x7078780), o.u(0xa7f266a7, 0x3333c1f2),
//   o.u(0xb6c15ab6, 0x2d2decc1), o.u(0x22667822, 0x3c3c5a66),
//   o.u(0x92ad2a92, 0x1515b8ad), o.u(0x20608920, 0xc9c9a960),
//   o.u(0x49db1549, 0x87875cdb), o.u(0xff1a4fff, 0xaaaab01a),
//   o.u(0x7888a078, 0x5050d888), o.u(0x7a8e517a, 0xa5a52b8e),
//   o.u(0x8f8a068f, 0x303898a), o.u(0xf813b2f8, 0x59594a13),
//   o.u(0x809b1280, 0x909929b), o.u(0x17393417, 0x1a1a2339),
//   o.u(0xda75cada, 0x65651075), o.u(0x3153b531, 0xd7d78453),
//   o.u(0xc65113c6, 0x8484d551), o.u(0xb8d3bbb8, 0xd0d003d3),
//   o.u(0xc35e1fc3, 0x8282dc5e), o.u(0xb0cb52b0, 0x2929e2cb),
//   o.u(0x7799b477, 0x5a5ac399), o.u(0x11333c11, 0x1e1e2d33),
//   o.u(0xcb46f6cb, 0x7b7b3d46), o.u(0xfc1f4bfc, 0xa8a8b71f),
//   o.u(0xd661dad6, 0x6d6d0c61), o.u(0x3a4e583a, 0x2c2c624e)
// ];

// var T6 = [
//   o.u(0xf4a5f497, 0xa5c6c632), o.u(0x978497eb, 0x84f8f86f),
//   o.u(0xb099b0c7, 0x99eeee5e), o.u(0x8c8d8cf7, 0x8df6f67a),
//   o.u(0x170d17e5, 0xdffffe8), o.u(0xdcbddcb7, 0xbdd6d60a),
//   o.u(0xc8b1c8a7, 0xb1dede16), o.u(0xfc54fc39, 0x5491916d),
//   o.u(0xf050f0c0, 0x50606090), o.u(0x5030504, 0x3020207),
//   o.u(0xe0a9e087, 0xa9cece2e), o.u(0x877d87ac, 0x7d5656d1),
//   o.u(0x2b192bd5, 0x19e7e7cc), o.u(0xa662a671, 0x62b5b513),
//   o.u(0x31e6319a, 0xe64d4d7c), o.u(0xb59ab5c3, 0x9aecec59),
//   o.u(0xcf45cf05, 0x458f8f40), o.u(0xbc9dbc3e, 0x9d1f1fa3),
//   o.u(0xc040c009, 0x40898949), o.u(0x928792ef, 0x87fafa68),
//   o.u(0x3f153fc5, 0x15efefd0), o.u(0x26eb267f, 0xebb2b294),
//   o.u(0x40c94007, 0xc98e8ece), o.u(0x1d0b1ded, 0xbfbfbe6),
//   o.u(0x2fec2f82, 0xec41416e), o.u(0xa967a97d, 0x67b3b31a),
//   o.u(0x1cfd1cbe, 0xfd5f5f43), o.u(0x25ea258a, 0xea454560),
//   o.u(0xdabfda46, 0xbf2323f9), o.u(0x2f702a6, 0xf7535351),
//   o.u(0xa196a1d3, 0x96e4e445), o.u(0xed5bed2d, 0x5b9b9b76),
//   o.u(0x5dc25dea, 0xc2757528), o.u(0x241c24d9, 0x1ce1e1c5),
//   o.u(0xe9aee97a, 0xae3d3dd4), o.u(0xbe6abe98, 0x6a4c4cf2),
//   o.u(0xee5aeed8, 0x5a6c6c82), o.u(0xc341c3fc, 0x417e7ebd),
//   o.u(0x60206f1, 0x2f5f5f3), o.u(0xd14fd11d, 0x4f838352),
//   o.u(0xe45ce4d0, 0x5c68688c), o.u(0x7f407a2, 0xf4515156),
//   o.u(0x5c345cb9, 0x34d1d18d), o.u(0x180818e9, 0x8f9f9e1),
//   o.u(0xae93aedf, 0x93e2e24c), o.u(0x9573954d, 0x73abab3e),
//   o.u(0xf553f5c4, 0x53626297), o.u(0x413f4154, 0x3f2a2a6b),
//   o.u(0x140c1410, 0xc08081c), o.u(0xf652f631, 0x52959563),
//   o.u(0xaf65af8c, 0x654646e9), o.u(0xe25ee221, 0x5e9d9d7f),
//   o.u(0x78287860, 0x28303048), o.u(0xf8a1f86e, 0xa13737cf),
//   o.u(0x110f1114, 0xf0a0a1b), o.u(0xc4b5c45e, 0xb52f2feb),
//   o.u(0x1b091b1c, 0x90e0e15), o.u(0x5a365a48, 0x3624247e),
//   o.u(0xb69bb636, 0x9b1b1bad), o.u(0x473d47a5, 0x3ddfdf98),
//   o.u(0x6a266a81, 0x26cdcda7), o.u(0xbb69bb9c, 0x694e4ef5),
//   o.u(0x4ccd4cfe, 0xcd7f7f33), o.u(0xba9fbacf, 0x9feaea50),
//   o.u(0x2d1b2d24, 0x1b12123f), o.u(0xb99eb93a, 0x9e1d1da4),
//   o.u(0x9c749cb0, 0x745858c4), o.u(0x722e7268, 0x2e343446),
//   o.u(0x772d776c, 0x2d363641), o.u(0xcdb2cda3, 0xb2dcdc11),
//   o.u(0x29ee2973, 0xeeb4b49d), o.u(0x16fb16b6, 0xfb5b5b4d),
//   o.u(0x1f60153, 0xf6a4a4a5), o.u(0xd74dd7ec, 0x4d7676a1),
//   o.u(0xa361a375, 0x61b7b714), o.u(0x49ce49fa, 0xce7d7d34),
//   o.u(0x8d7b8da4, 0x7b5252df), o.u(0x423e42a1, 0x3edddd9f),
//   o.u(0x937193bc, 0x715e5ecd), o.u(0xa297a226, 0x971313b1),
//   o.u(0x4f50457, 0xf5a6a6a2), o.u(0xb868b869, 0x68b9b901),
//   o.u(0x0, 0x0), o.u(0x742c7499, 0x2cc1c1b5),
//   o.u(0xa060a080, 0x604040e0), o.u(0x211f21dd, 0x1fe3e3c2),
//   o.u(0x43c843f2, 0xc879793a), o.u(0x2ced2c77, 0xedb6b69a),
//   o.u(0xd9bed9b3, 0xbed4d40d), o.u(0xca46ca01, 0x468d8d47),
//   o.u(0x70d970ce, 0xd9676717), o.u(0xdd4bdde4, 0x4b7272af),
//   o.u(0x79de7933, 0xde9494ed), o.u(0x67d4672b, 0xd49898ff),
//   o.u(0x23e8237b, 0xe8b0b093), o.u(0xde4ade11, 0x4a85855b),
//   o.u(0xbd6bbd6d, 0x6bbbbb06), o.u(0x7e2a7e91, 0x2ac5c5bb),
//   o.u(0x34e5349e, 0xe54f4f7b), o.u(0x3a163ac1, 0x16ededd7),
//   o.u(0x54c55417, 0xc58686d2), o.u(0x62d7622f, 0xd79a9af8),
//   o.u(0xff55ffcc, 0x55666699), o.u(0xa794a722, 0x941111b6),
//   o.u(0x4acf4a0f, 0xcf8a8ac0), o.u(0x301030c9, 0x10e9e9d9),
//   o.u(0xa060a08, 0x604040e), o.u(0x988198e7, 0x81fefe66),
//   o.u(0xbf00b5b, 0xf0a0a0ab), o.u(0xcc44ccf0, 0x447878b4),
//   o.u(0xd5bad54a, 0xba2525f0), o.u(0x3ee33e96, 0xe34b4b75),
//   o.u(0xef30e5f, 0xf3a2a2ac), o.u(0x19fe19ba, 0xfe5d5d44),
//   o.u(0x5bc05b1b, 0xc08080db), o.u(0x858a850a, 0x8a050580),
//   o.u(0xecadec7e, 0xad3f3fd3), o.u(0xdfbcdf42, 0xbc2121fe),
//   o.u(0xd848d8e0, 0x487070a8), o.u(0xc040cf9, 0x4f1f1fd),
//   o.u(0x7adf7ac6, 0xdf636319), o.u(0x58c158ee, 0xc177772f),
//   o.u(0x9f759f45, 0x75afaf30), o.u(0xa563a584, 0x634242e7),
//   o.u(0x50305040, 0x30202070), o.u(0x2e1a2ed1, 0x1ae5e5cb),
//   o.u(0x120e12e1, 0xefdfdef), o.u(0xb76db765, 0x6dbfbf08),
//   o.u(0xd44cd419, 0x4c818155), o.u(0x3c143c30, 0x14181824),
//   o.u(0x5f355f4c, 0x35262679), o.u(0x712f719d, 0x2fc3c3b2),
//   o.u(0x38e13867, 0xe1bebe86), o.u(0xfda2fd6a, 0xa23535c8),
//   o.u(0x4fcc4f0b, 0xcc8888c7), o.u(0x4b394b5c, 0x392e2e65),
//   o.u(0xf957f93d, 0x5793936a), o.u(0xdf20daa, 0xf2555558),
//   o.u(0x9d829de3, 0x82fcfc61), o.u(0xc947c9f4, 0x477a7ab3),
//   o.u(0xefacef8b, 0xacc8c827), o.u(0x32e7326f, 0xe7baba88),
//   o.u(0x7d2b7d64, 0x2b32324f), o.u(0xa495a4d7, 0x95e6e642),
//   o.u(0xfba0fb9b, 0xa0c0c03b), o.u(0xb398b332, 0x981919aa),
//   o.u(0x68d16827, 0xd19e9ef6), o.u(0x817f815d, 0x7fa3a322),
//   o.u(0xaa66aa88, 0x664444ee), o.u(0x827e82a8, 0x7e5454d6),
//   o.u(0xe6abe676, 0xab3b3bdd), o.u(0x9e839e16, 0x830b0b95),
//   o.u(0x45ca4503, 0xca8c8cc9), o.u(0x7b297b95, 0x29c7c7bc),
//   o.u(0x6ed36ed6, 0xd36b6b05), o.u(0x443c4450, 0x3c28286c),
//   o.u(0x8b798b55, 0x79a7a72c), o.u(0x3de23d63, 0xe2bcbc81),
//   o.u(0x271d272c, 0x1d161631), o.u(0x9a769a41, 0x76adad37),
//   o.u(0x4d3b4dad, 0x3bdbdb96), o.u(0xfa56fac8, 0x5664649e),
//   o.u(0xd24ed2e8, 0x4e7474a6), o.u(0x221e2228, 0x1e141436),
//   o.u(0x76db763f, 0xdb9292e4), o.u(0x1e0a1e18, 0xa0c0c12),
//   o.u(0xb46cb490, 0x6c4848fc), o.u(0x37e4376b, 0xe4b8b88f),
//   o.u(0xe75de725, 0x5d9f9f78), o.u(0xb26eb261, 0x6ebdbd0f),
//   o.u(0x2aef2a86, 0xef434369), o.u(0xf1a6f193, 0xa6c4c435),
//   o.u(0xe3a8e372, 0xa83939da), o.u(0xf7a4f762, 0xa43131c6),
//   o.u(0x593759bd, 0x37d3d38a), o.u(0x868b86ff, 0x8bf2f274),
//   o.u(0x563256b1, 0x32d5d583), o.u(0xc543c50d, 0x438b8b4e),
//   o.u(0xeb59ebdc, 0x596e6e85), o.u(0xc2b7c2af, 0xb7dada18),
//   o.u(0x8f8c8f02, 0x8c01018e), o.u(0xac64ac79, 0x64b1b11d),
//   o.u(0x6dd26d23, 0xd29c9cf1), o.u(0x3be03b92, 0xe0494972),
//   o.u(0xc7b4c7ab, 0xb4d8d81f), o.u(0x15fa1543, 0xfaacacb9),
//   o.u(0x90709fd, 0x7f3f3fa), o.u(0x6f256f85, 0x25cfcfa0),
//   o.u(0xeaafea8f, 0xafcaca20), o.u(0x898e89f3, 0x8ef4f47d),
//   o.u(0x20e9208e, 0xe9474767), o.u(0x28182820, 0x18101038),
//   o.u(0x64d564de, 0xd56f6f0b), o.u(0x838883fb, 0x88f0f073),
//   o.u(0xb16fb194, 0x6f4a4afb), o.u(0x967296b8, 0x725c5cca),
//   o.u(0x6c246c70, 0x24383854), o.u(0x8f108ae, 0xf157575f),
//   o.u(0x52c752e6, 0xc7737321), o.u(0xf351f335, 0x51979764),
//   o.u(0x6523658d, 0x23cbcbae), o.u(0x847c8459, 0x7ca1a125),
//   o.u(0xbf9cbfcb, 0x9ce8e857), o.u(0x6321637c, 0x213e3e5d),
//   o.u(0x7cdd7c37, 0xdd9696ea), o.u(0x7fdc7fc2, 0xdc61611e),
//   o.u(0x9186911a, 0x860d0d9c), o.u(0x9485941e, 0x850f0f9b),
//   o.u(0xab90abdb, 0x90e0e04b), o.u(0xc642c6f8, 0x427c7cba),
//   o.u(0x57c457e2, 0xc4717126), o.u(0xe5aae583, 0xaacccc29),
//   o.u(0x73d8733b, 0xd89090e3), o.u(0xf050f0c, 0x5060609),
//   o.u(0x30103f5, 0x1f7f7f4), o.u(0x36123638, 0x121c1c2a),
//   o.u(0xfea3fe9f, 0xa3c2c23c), o.u(0xe15fe1d4, 0x5f6a6a8b),
//   o.u(0x10f91047, 0xf9aeaebe), o.u(0x6bd06bd2, 0xd0696902),
//   o.u(0xa891a82e, 0x911717bf), o.u(0xe858e829, 0x58999971),
//   o.u(0x69276974, 0x273a3a53), o.u(0xd0b9d04e, 0xb92727f7),
//   o.u(0x483848a9, 0x38d9d991), o.u(0x351335cd, 0x13ebebde),
//   o.u(0xceb3ce56, 0xb32b2be5), o.u(0x55335544, 0x33222277),
//   o.u(0xd6bbd6bf, 0xbbd2d204), o.u(0x90709049, 0x70a9a939),
//   o.u(0x8089800e, 0x89070787), o.u(0xf2a7f266, 0xa73333c1),
//   o.u(0xc1b6c15a, 0xb62d2dec), o.u(0x66226678, 0x223c3c5a),
//   o.u(0xad92ad2a, 0x921515b8), o.u(0x60206089, 0x20c9c9a9),
//   o.u(0xdb49db15, 0x4987875c), o.u(0x1aff1a4f, 0xffaaaab0),
//   o.u(0x887888a0, 0x785050d8), o.u(0x8e7a8e51, 0x7aa5a52b),
//   o.u(0x8a8f8a06, 0x8f030389), o.u(0x13f813b2, 0xf859594a),
//   o.u(0x9b809b12, 0x80090992), o.u(0x39173934, 0x171a1a23),
//   o.u(0x75da75ca, 0xda656510), o.u(0x533153b5, 0x31d7d784),
//   o.u(0x51c65113, 0xc68484d5), o.u(0xd3b8d3bb, 0xb8d0d003),
//   o.u(0x5ec35e1f, 0xc38282dc), o.u(0xcbb0cb52, 0xb02929e2),
//   o.u(0x997799b4, 0x775a5ac3), o.u(0x3311333c, 0x111e1e2d),
//   o.u(0x46cb46f6, 0xcb7b7b3d), o.u(0x1ffc1f4b, 0xfca8a8b7),
//   o.u(0x61d661da, 0xd66d6d0c), o.u(0x4e3a4e58, 0x3a2c2c62)
// ];

// var T7 = [
//   o.u(0x32f4a5f4, 0x97a5c6c6), o.u(0x6f978497, 0xeb84f8f8),
//   o.u(0x5eb099b0, 0xc799eeee), o.u(0x7a8c8d8c, 0xf78df6f6),
//   o.u(0xe8170d17, 0xe50dffff), o.u(0xadcbddc, 0xb7bdd6d6),
//   o.u(0x16c8b1c8, 0xa7b1dede), o.u(0x6dfc54fc, 0x39549191),
//   o.u(0x90f050f0, 0xc0506060), o.u(0x7050305, 0x4030202),
//   o.u(0x2ee0a9e0, 0x87a9cece), o.u(0xd1877d87, 0xac7d5656),
//   o.u(0xcc2b192b, 0xd519e7e7), o.u(0x13a662a6, 0x7162b5b5),
//   o.u(0x7c31e631, 0x9ae64d4d), o.u(0x59b59ab5, 0xc39aecec),
//   o.u(0x40cf45cf, 0x5458f8f), o.u(0xa3bc9dbc, 0x3e9d1f1f),
//   o.u(0x49c040c0, 0x9408989), o.u(0x68928792, 0xef87fafa),
//   o.u(0xd03f153f, 0xc515efef), o.u(0x9426eb26, 0x7febb2b2),
//   o.u(0xce40c940, 0x7c98e8e), o.u(0xe61d0b1d, 0xed0bfbfb),
//   o.u(0x6e2fec2f, 0x82ec4141), o.u(0x1aa967a9, 0x7d67b3b3),
//   o.u(0x431cfd1c, 0xbefd5f5f), o.u(0x6025ea25, 0x8aea4545),
//   o.u(0xf9dabfda, 0x46bf2323), o.u(0x5102f702, 0xa6f75353),
//   o.u(0x45a196a1, 0xd396e4e4), o.u(0x76ed5bed, 0x2d5b9b9b),
//   o.u(0x285dc25d, 0xeac27575), o.u(0xc5241c24, 0xd91ce1e1),
//   o.u(0xd4e9aee9, 0x7aae3d3d), o.u(0xf2be6abe, 0x986a4c4c),
//   o.u(0x82ee5aee, 0xd85a6c6c), o.u(0xbdc341c3, 0xfc417e7e),
//   o.u(0xf3060206, 0xf102f5f5), o.u(0x52d14fd1, 0x1d4f8383),
//   o.u(0x8ce45ce4, 0xd05c6868), o.u(0x5607f407, 0xa2f45151),
//   o.u(0x8d5c345c, 0xb934d1d1), o.u(0xe1180818, 0xe908f9f9),
//   o.u(0x4cae93ae, 0xdf93e2e2), o.u(0x3e957395, 0x4d73abab),
//   o.u(0x97f553f5, 0xc4536262), o.u(0x6b413f41, 0x543f2a2a),
//   o.u(0x1c140c14, 0x100c0808), o.u(0x63f652f6, 0x31529595),
//   o.u(0xe9af65af, 0x8c654646), o.u(0x7fe25ee2, 0x215e9d9d),
//   o.u(0x48782878, 0x60283030), o.u(0xcff8a1f8, 0x6ea13737),
//   o.u(0x1b110f11, 0x140f0a0a), o.u(0xebc4b5c4, 0x5eb52f2f),
//   o.u(0x151b091b, 0x1c090e0e), o.u(0x7e5a365a, 0x48362424),
//   o.u(0xadb69bb6, 0x369b1b1b), o.u(0x98473d47, 0xa53ddfdf),
//   o.u(0xa76a266a, 0x8126cdcd), o.u(0xf5bb69bb, 0x9c694e4e),
//   o.u(0x334ccd4c, 0xfecd7f7f), o.u(0x50ba9fba, 0xcf9feaea),
//   o.u(0x3f2d1b2d, 0x241b1212), o.u(0xa4b99eb9, 0x3a9e1d1d),
//   o.u(0xc49c749c, 0xb0745858), o.u(0x46722e72, 0x682e3434),
//   o.u(0x41772d77, 0x6c2d3636), o.u(0x11cdb2cd, 0xa3b2dcdc),
//   o.u(0x9d29ee29, 0x73eeb4b4), o.u(0x4d16fb16, 0xb6fb5b5b),
//   o.u(0xa501f601, 0x53f6a4a4), o.u(0xa1d74dd7, 0xec4d7676),
//   o.u(0x14a361a3, 0x7561b7b7), o.u(0x3449ce49, 0xface7d7d),
//   o.u(0xdf8d7b8d, 0xa47b5252), o.u(0x9f423e42, 0xa13edddd),
//   o.u(0xcd937193, 0xbc715e5e), o.u(0xb1a297a2, 0x26971313),
//   o.u(0xa204f504, 0x57f5a6a6), o.u(0x1b868b8, 0x6968b9b9),
//   o.u(0x0, 0x0), o.u(0xb5742c74, 0x992cc1c1),
//   o.u(0xe0a060a0, 0x80604040), o.u(0xc2211f21, 0xdd1fe3e3),
//   o.u(0x3a43c843, 0xf2c87979), o.u(0x9a2ced2c, 0x77edb6b6),
//   o.u(0xdd9bed9, 0xb3bed4d4), o.u(0x47ca46ca, 0x1468d8d),
//   o.u(0x1770d970, 0xced96767), o.u(0xafdd4bdd, 0xe44b7272),
//   o.u(0xed79de79, 0x33de9494), o.u(0xff67d467, 0x2bd49898),
//   o.u(0x9323e823, 0x7be8b0b0), o.u(0x5bde4ade, 0x114a8585),
//   o.u(0x6bd6bbd, 0x6d6bbbbb), o.u(0xbb7e2a7e, 0x912ac5c5),
//   o.u(0x7b34e534, 0x9ee54f4f), o.u(0xd73a163a, 0xc116eded),
//   o.u(0xd254c554, 0x17c58686), o.u(0xf862d762, 0x2fd79a9a),
//   o.u(0x99ff55ff, 0xcc556666), o.u(0xb6a794a7, 0x22941111),
//   o.u(0xc04acf4a, 0xfcf8a8a), o.u(0xd9301030, 0xc910e9e9),
//   o.u(0xe0a060a, 0x8060404), o.u(0x66988198, 0xe781fefe),
//   o.u(0xab0bf00b, 0x5bf0a0a0), o.u(0xb4cc44cc, 0xf0447878),
//   o.u(0xf0d5bad5, 0x4aba2525), o.u(0x753ee33e, 0x96e34b4b),
//   o.u(0xac0ef30e, 0x5ff3a2a2), o.u(0x4419fe19, 0xbafe5d5d),
//   o.u(0xdb5bc05b, 0x1bc08080), o.u(0x80858a85, 0xa8a0505),
//   o.u(0xd3ecadec, 0x7ead3f3f), o.u(0xfedfbcdf, 0x42bc2121),
//   o.u(0xa8d848d8, 0xe0487070), o.u(0xfd0c040c, 0xf904f1f1),
//   o.u(0x197adf7a, 0xc6df6363), o.u(0x2f58c158, 0xeec17777),
//   o.u(0x309f759f, 0x4575afaf), o.u(0xe7a563a5, 0x84634242),
//   o.u(0x70503050, 0x40302020), o.u(0xcb2e1a2e, 0xd11ae5e5),
//   o.u(0xef120e12, 0xe10efdfd), o.u(0x8b76db7, 0x656dbfbf),
//   o.u(0x55d44cd4, 0x194c8181), o.u(0x243c143c, 0x30141818),
//   o.u(0x795f355f, 0x4c352626), o.u(0xb2712f71, 0x9d2fc3c3),
//   o.u(0x8638e138, 0x67e1bebe), o.u(0xc8fda2fd, 0x6aa23535),
//   o.u(0xc74fcc4f, 0xbcc8888), o.u(0x654b394b, 0x5c392e2e),
//   o.u(0x6af957f9, 0x3d579393), o.u(0x580df20d, 0xaaf25555),
//   o.u(0x619d829d, 0xe382fcfc), o.u(0xb3c947c9, 0xf4477a7a),
//   o.u(0x27efacef, 0x8bacc8c8), o.u(0x8832e732, 0x6fe7baba),
//   o.u(0x4f7d2b7d, 0x642b3232), o.u(0x42a495a4, 0xd795e6e6),
//   o.u(0x3bfba0fb, 0x9ba0c0c0), o.u(0xaab398b3, 0x32981919),
//   o.u(0xf668d168, 0x27d19e9e), o.u(0x22817f81, 0x5d7fa3a3),
//   o.u(0xeeaa66aa, 0x88664444), o.u(0xd6827e82, 0xa87e5454),
//   o.u(0xdde6abe6, 0x76ab3b3b), o.u(0x959e839e, 0x16830b0b),
//   o.u(0xc945ca45, 0x3ca8c8c), o.u(0xbc7b297b, 0x9529c7c7),
//   o.u(0x56ed36e, 0xd6d36b6b), o.u(0x6c443c44, 0x503c2828),
//   o.u(0x2c8b798b, 0x5579a7a7), o.u(0x813de23d, 0x63e2bcbc),
//   o.u(0x31271d27, 0x2c1d1616), o.u(0x379a769a, 0x4176adad),
//   o.u(0x964d3b4d, 0xad3bdbdb), o.u(0x9efa56fa, 0xc8566464),
//   o.u(0xa6d24ed2, 0xe84e7474), o.u(0x36221e22, 0x281e1414),
//   o.u(0xe476db76, 0x3fdb9292), o.u(0x121e0a1e, 0x180a0c0c),
//   o.u(0xfcb46cb4, 0x906c4848), o.u(0x8f37e437, 0x6be4b8b8),
//   o.u(0x78e75de7, 0x255d9f9f), o.u(0xfb26eb2, 0x616ebdbd),
//   o.u(0x692aef2a, 0x86ef4343), o.u(0x35f1a6f1, 0x93a6c4c4),
//   o.u(0xdae3a8e3, 0x72a83939), o.u(0xc6f7a4f7, 0x62a43131),
//   o.u(0x8a593759, 0xbd37d3d3), o.u(0x74868b86, 0xff8bf2f2),
//   o.u(0x83563256, 0xb132d5d5), o.u(0x4ec543c5, 0xd438b8b),
//   o.u(0x85eb59eb, 0xdc596e6e), o.u(0x18c2b7c2, 0xafb7dada),
//   o.u(0x8e8f8c8f, 0x28c0101), o.u(0x1dac64ac, 0x7964b1b1),
//   o.u(0xf16dd26d, 0x23d29c9c), o.u(0x723be03b, 0x92e04949),
//   o.u(0x1fc7b4c7, 0xabb4d8d8), o.u(0xb915fa15, 0x43faacac),
//   o.u(0xfa090709, 0xfd07f3f3), o.u(0xa06f256f, 0x8525cfcf),
//   o.u(0x20eaafea, 0x8fafcaca), o.u(0x7d898e89, 0xf38ef4f4),
//   o.u(0x6720e920, 0x8ee94747), o.u(0x38281828, 0x20181010),
//   o.u(0xb64d564, 0xded56f6f), o.u(0x73838883, 0xfb88f0f0),
//   o.u(0xfbb16fb1, 0x946f4a4a), o.u(0xca967296, 0xb8725c5c),
//   o.u(0x546c246c, 0x70243838), o.u(0x5f08f108, 0xaef15757),
//   o.u(0x2152c752, 0xe6c77373), o.u(0x64f351f3, 0x35519797),
//   o.u(0xae652365, 0x8d23cbcb), o.u(0x25847c84, 0x597ca1a1),
//   o.u(0x57bf9cbf, 0xcb9ce8e8), o.u(0x5d632163, 0x7c213e3e),
//   o.u(0xea7cdd7c, 0x37dd9696), o.u(0x1e7fdc7f, 0xc2dc6161),
//   o.u(0x9c918691, 0x1a860d0d), o.u(0x9b948594, 0x1e850f0f),
//   o.u(0x4bab90ab, 0xdb90e0e0), o.u(0xbac642c6, 0xf8427c7c),
//   o.u(0x2657c457, 0xe2c47171), o.u(0x29e5aae5, 0x83aacccc),
//   o.u(0xe373d873, 0x3bd89090), o.u(0x90f050f, 0xc050606),
//   o.u(0xf4030103, 0xf501f7f7), o.u(0x2a361236, 0x38121c1c),
//   o.u(0x3cfea3fe, 0x9fa3c2c2), o.u(0x8be15fe1, 0xd45f6a6a),
//   o.u(0xbe10f910, 0x47f9aeae), o.u(0x26bd06b, 0xd2d06969),
//   o.u(0xbfa891a8, 0x2e911717), o.u(0x71e858e8, 0x29589999),
//   o.u(0x53692769, 0x74273a3a), o.u(0xf7d0b9d0, 0x4eb92727),
//   o.u(0x91483848, 0xa938d9d9), o.u(0xde351335, 0xcd13ebeb),
//   o.u(0xe5ceb3ce, 0x56b32b2b), o.u(0x77553355, 0x44332222),
//   o.u(0x4d6bbd6, 0xbfbbd2d2), o.u(0x39907090, 0x4970a9a9),
//   o.u(0x87808980, 0xe890707), o.u(0xc1f2a7f2, 0x66a73333),
//   o.u(0xecc1b6c1, 0x5ab62d2d), o.u(0x5a662266, 0x78223c3c),
//   o.u(0xb8ad92ad, 0x2a921515), o.u(0xa9602060, 0x8920c9c9),
//   o.u(0x5cdb49db, 0x15498787), o.u(0xb01aff1a, 0x4fffaaaa),
//   o.u(0xd8887888, 0xa0785050), o.u(0x2b8e7a8e, 0x517aa5a5),
//   o.u(0x898a8f8a, 0x68f0303), o.u(0x4a13f813, 0xb2f85959),
//   o.u(0x929b809b, 0x12800909), o.u(0x23391739, 0x34171a1a),
//   o.u(0x1075da75, 0xcada6565), o.u(0x84533153, 0xb531d7d7),
//   o.u(0xd551c651, 0x13c68484), o.u(0x3d3b8d3, 0xbbb8d0d0),
//   o.u(0xdc5ec35e, 0x1fc38282), o.u(0xe2cbb0cb, 0x52b02929),
//   o.u(0xc3997799, 0xb4775a5a), o.u(0x2d331133, 0x3c111e1e),
//   o.u(0x3d46cb46, 0xf6cb7b7b), o.u(0xb71ffc1f, 0x4bfca8a8),
//   o.u(0xc61d661, 0xdad66d6d), o.u(0x624e3a4e, 0x583a2c2c)
// ];

var B64 = function(n, x) {
  if (n === 7) {
    return x.lo & 0xFF;
  }
  var bits = (7 - n) * 8;
  if (bits >= 32) { //faster than >= 32
    return (x.hi >>> (bits - 32)) & 0xFF;
  }
  else {
    var bitsOff32 = 32 - bits,
      toMoveDown = this.hi << bitsOff32 >>> bitsOff32;
    return (x.lo >>> bits | (toMoveDown << bitsOff32)) & 0xFF;
  }
}

var j64 = [o.u(0, 0), o.u(0, 0x10), o.u(0, 0x20), o.u(0, 0x30), o.u(0, 0x40), o.u(0, 0x50), o.u(0, 0x60),
  o.u(0, 0x70), o.u(0, 0x80), o.u(0, 0x90), o.u(0, 0xA0), o.u(0, 0xB0), o.u(0, 0xC0),
  o.u(0, 0xD0), o.u(0, 0xE0), o.u(0, 0xF0)
];

var nj64 = [o.u(0xFFFFFFFF, 0xFFFFFFFF), o.u(0xFFFFFFFF, 0xFFFFFFEF), o.u(0xFFFFFFFF, 0xFFFFFFDF), o.u(0xFFFFFFFF, 0xFFFFFFCF), o.u(0xFFFFFFFF, 0xFFFFFFBF), o.u(0xFFFFFFFF, 0xFFFFFFAF), o.u(0xFFFFFFFF, 0xFFFFFF9F),
  o.u(0xFFFFFFFF, 0xFFFFFF8F), o.u(0xFFFFFFFF, 0xFFFFFF7F), o.u(0xFFFFFFFF, 0xFFFFFF6F), o.u(0xFFFFFFFF, 0xFFFFFF5F), o.u(0xFFFFFFFF, 0xFFFFFF4F), o.u(0xFFFFFFFF, 0xFFFFFF3F),
  o.u(0xFFFFFFFF, 0xFFFFFF2F), o.u(0xFFFFFFFF, 0xFFFFFF1F), o.u(0xFFFFFFFF, 0xFFFFFF0F)
];

var r64 = [o.u(0, 0), o.u(0, 1), o.u(0, 2), o.u(0, 3), o.u(0, 4), o.u(0, 5), o.u(0, 6), o.u(0, 7),
  o.u(0, 8), o.u(0, 9), o.u(0, 10), o.u(0, 11), o.u(0, 12), o.u(0, 13)
];

var compress = function(int64buf, state) {
  var g = new Array(16);
  var m = new Array(16);
  for (var u = 0; u < 16; u++) {
    m[u] = int64buf[u];
    g[u] = m[u].xor(state[u]);
  }
  var t = new Array(16);
  for (var r = 0; r < 14; r++) {
    for (var i = 0; i < 16; i++) {
      g[i].setxor64(j64[i].plus(r64[r]).setShiftLeft(56));
    }

    for (var u = 0; u < 16; u++) {
      t[u] = o.xor64(T0[B64(0, g[u])], T1[B64(1, g[(u + 1) & 0xF])], T2[B64(2, g[(u + 2) & 0xF])], T3[B64(3, g[(u + 3) & 0xF])], T4[B64(4, g[(u + 4) & 0xF])], T5[B64(5, g[(u + 5) & 0xF])], T6[B64(6, g[(u + 6) & 0xF])], T7[B64(7, g[(u + 11) & 0xF])]);
    }
    var temp = g;
    g = t;
    t = temp;
  }
  for (var r = 0; r < 14; r++) {
    for (var i = 0; i < 16; i++) {
      m[i].setxor64(r64[r], nj64[i]);
    }
    for (var u = 0; u < 16; u++) {
      t[u] = o.xor64(T0[B64(0, m[(u + 1) & 0xF])], T1[B64(1, m[(u + 3) & 0xF])], T2[B64(2, m[(u + 5) & 0xF])], T3[B64(3, m[(u + 11) & 0xF])], T4[B64(4, m[(u + 0) & 0xF])], T5[B64(5, m[(u + 2) & 0xF])], T6[B64(6, m[(u + 4) & 0xF])], T7[B64(7, m[(u + 6) & 0xF])]);
    }
    var temp = m;
    m = t;
    t = temp;
  }
  for (var u = 0; u < 16; u++) {
    state[u].setxor64(g[u], m[u]);
  }
}

var final = function(state) {
  var g = new Array(16);
  o.bufferInsert64(g, 0, state, 16);
  var t = new Array(16);
  for (var r = 0; r < 14; r++) {
    
    for (var i = 0; i < 16; i++) {
      g[i].setxor64(j64[i].plus(r64[r]).setShiftLeft(56));
    }

    for (var u = 0; u < 16; u++) {
      t[u] = o.xor64(T0[B64(0, g[u])], T1[B64(1, g[(u + 1) & 0xF])], T2[B64(2, g[(u + 2) & 0xF])], T3[B64(3, g[(u + 3) & 0xF])], T4[B64(4, g[(u + 4) & 0xF])], T5[B64(5, g[(u + 5) & 0xF])], T6[B64(6, g[(u + 6) & 0xF])], T7[B64(7, g[(u + 11) & 0xF])]);
    }
    var temp = g;
    g = t;
    t = temp;
  }
  for (var u = 0; u < 16; u++)
    state[u].setxor64(g[u]);
}

var groestl = function(ctx, data, len) {
  var buf, ptr;
  //create a local copy of states
  var V = new Array(16);
  buf = ctx.buffer;
  ptr = ctx.ptr;
  if (len < ctx.buffer.length - ptr) {
    o.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  o.bufferInsert(V, 0, ctx.state, 16);
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    o.bufferInsert(buf, ptr, data, clen);
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
    count = ctx.count.plus(o.u(0, 1));
  }
  else {
    padLen = 256 - ptr;
    count = ctx.count.plus(o.u(0, 2));
  }
  o.bufferSet(pad, 1, 0, padLen - 9);
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
    ctx.state[i] = new o.u64(0, 0);
  }
  ctx.state[15] = new o.u64(0, 512);
  ctx.ptr = 0;
  ctx.count = new o.u64(0,0);
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

module.exports.string2bytes = function(s) {
	for (var b = [], i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
	return b;
}

module.exports.bytes2Int16Buffer = function(b) {
	var len = b.length;
	var bufferLength = len ? (((len - 1) >>> 1) + 1) : 0;
	var buffer = new Array(bufferLength);
	var i = 0;
	var j = 0;
	while (i < len) {
		buffer[j] = (buffer[j] << 8) | b[i];
		i++;
		if (!(i % 2)) j++;
	}
	return buffer;
}

module.exports.bytes2Int32Buffer = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len ? (((len - 1) >>> 2) + 1) : 0;
	var buffer = new Array(bufferLength);
	for (var j = 0; j < bufferLength; j++) {
		buffer[j] = (b[j * 4] << 24) | (b[j * 4 + 1] << 16) | (b[j * 4 + 2] << 8) | b[j * 4 + 3];
	}
	return buffer;
}

module.exports.bytes2Int32BufferLeAligned = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len ? (((len - 1) >>> 2) + 1) : 0;
	var buffer = new Array(bufferLength);
	for (var j = 0; j < bufferLength; j++) {
		buffer[j] = (b[j * 4 + 3] << 24) | (b[j * 4 + 2] << 16) | (b[j * 4 + 1] << 8) | b[j * 4];
	}
	return buffer;
}

module.exports.bytes2Int64Buffer = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len ? (((len - 1) >>> 3) + 1) : 0;
	var buffer = new Array(bufferLength);
	for (var j = 0; j < bufferLength; j++) {
		buffer[j] = new op.u64((b[j * 8] << 24) | (b[j * 8 + 1] << 16) | (b[j * 8 + 2] << 8) | b[j * 8 + 3], (b[j * 8 + 4] << 24) | (b[j * 8 + 5] << 16) | (b[j * 8 + 6] << 8) | b[j * 8 + 7]);
	}
	return buffer;
}

module.exports.bytes2Int64BufferLeAligned = function(b) {
	var len = b.length;
	if (!len) return [];
	var bufferLength = len ? (((len - 1) >>> 3) + 1) : 0;
	var buffer = new Array(bufferLength);
	for (var j = 0; j < bufferLength; j++) {
		buffer[j] = new op.u64((b[j * 8 + 7] << 24) | (b[j * 8 + 6] << 16) | (b[j * 8 + 5] << 8) | b[j * 8 + 4], (b[j * 8 + 3] << 24) | (b[j * 8 + 2] << 16) | (b[j * 8 + 1] << 8) | b[j * 8]);
	}
	return buffer;
}

module.exports.bufferEncode64leAligned = function(buffer, offset, uint64) {
	buffer[offset + 7] = uint64.hi >>> 24;
	buffer[offset + 6] = uint64.hi >>> 16 & 0xFF;
	buffer[offset + 5] = uint64.hi >>> 8 & 0xFF;
	buffer[offset + 4] = uint64.hi & 0xFF;
	buffer[offset + 3] = uint64.lo >>> 24;
	buffer[offset + 2] = uint64.lo >>> 16 & 0xFF;
	buffer[offset + 1] = uint64.lo >>> 8 & 0xFF;
	buffer[offset + 0] = uint64.lo & 0xFF;
}

module.exports.bufferEncode64 = function(buffer, offset, uint64) {
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
	var bufferLength = len * 4;
	var buffer = new Array(bufferLength);
	var i = 0;
	while (i < len) {
		buffer[i * 4] = (b[i] & 0xFF000000) >>> 24;
		buffer[i * 4 + 1] = (b[i] & 0x00FF0000) >>> 16;
		buffer[i * 4 + 2] = (b[i] & 0x0000FF00) >>> 8;
		buffer[i * 4 + 3] = (b[i] & 0x000000FF);
		i++;
	}
	return buffer;
}

module.exports.int64Buffer2Bytes = function(b) {
	var len = b.length;
	var bufferLength = len * 8;
	var buffer = new Array(bufferLength);
	var i = 0;
	while (i < len) {
		buffer[i * 8] = (b[i].hi & 0xFF000000) >>> 24;
		buffer[i * 8 + 1] = (b[i].hi & 0x00FF0000) >>> 16;
		buffer[i * 8 + 2] = (b[i].hi & 0x0000FF00) >>> 8;
		buffer[i * 8 + 3] = (b[i].hi & 0x000000FF);
		buffer[i * 8 + 4] = (b[i].lo & 0xFF000000) >>> 24;
		buffer[i * 8 + 5] = (b[i].lo & 0x00FF0000) >>> 16;
		buffer[i * 8 + 6] = (b[i].lo & 0x0000FF00) >>> 8;
		buffer[i * 8 + 7] = (b[i].lo & 0x000000FF);
		i++;
	}
	return buffer;
}


module.exports.string2Int32Buffer = function(s) {
	return this.bytes2Int32Buffer(this.string2bytes(s));
}

var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

module.exports.b64Encode = function(input) {
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;

	while (i < input.length) {

		chr1 = input[i++];
		chr2 = input[i++];
		chr3 = input[i++];

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;

		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		}
		else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
			keyStr.charAt(enc1) + keyStr.charAt(enc2) +
			keyStr.charAt(enc3) + keyStr.charAt(enc4);

	}

	return output;
};

module.exports.b64Decode = function(input) {
	var output = [];
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;

	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length) {

		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));

		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output.push(chr1);

		if (enc3 != 64) {
			output.push(chr2);
		}
		if (enc4 != 64) {
			output.push(chr3);
		}

	}

	return output;

};
},{"./op.js":11}],8:[function(require,module,exports){
/////////////////////////////////////
///////////////  Jh /////////////////

//// Written by Quantum Explorer ////
////////// Dash Foundation //////////
/// Released under the MIT License //
/////////////////////////////////////

var op = require('./op');
var he = require('./helper');

var Jh_BlockSize = 64;
var Jh_StateSize = 32;

var JH_HX = 8;
var JH_HY = 4;

var IV512 = he.bytes2Int32Buffer(he.b64Decode("b9FLlj4Aqhdjai4FehXVQ4oiXo0Ml+8L6TQSWfKzw2GJHaDBU2+AHiqpBWvqK22AWI7M2yB1uqapDzp2uvg79wFp5gVB40ppRrWKji5v5loQR6fQwYQ8JDtucbEtWsGZz1f27J2x+FanBoh8VxaxVuPC/N/mhRf7VFpGeMyM3Us="));

var C = he.bytes2Int32Buffer(he.b64Decode("ot7Vcmf4Fd8KFYR7VxUjt5DWq4H2h1pNxU+fTkAr0cPgOpjqnPpFXJnSxQOambJmtJYCZopTu/IaFFa1MaLbiFxaowPbDhmaCrI/QBBEwYeAGQUcHZWehK3rM2/czedekhO6EEFrvwIVZXjc0Ce79zmBLApQeKo30r8aP9ORAEENWi1CkH7M9pyfYt3Ol8CSC6dcGKxEK8fWZd/RI/zGYwNsbpcauOCefkUFIajsbES7A/Hu+mGOXbKXlv2XgYOUN4WOSi8wA9stjWcqlWqf+4Fz/opsabj4RnLHihRCf8CPFfTFxF7HvadvRHWAuxGPt3XeUryI5K4eALiC9KOmmDOP9I4VY6OpJFZfqon5t9Ug7fG2/eBafFrpyjY2LEIGQzUpzj2Y/k50+TpTp0uac1kf9dCGgU5vga2dDp9a2K9nBgWnamI07r4oC4snF7luJgd0Rz8QgMZvfqDge0h+xqUKVQ3ApPhKn+fjkZ7xjpeBcnaG1I1gUEFann5isOXz7B+f/HogVEAAGuTjhMn0zvWU10/YlfqdEX4uVaVUwyQoct9bKG7+veJ/9XiyxKUP73yJBS7TSe6Fk35Ef1ko6zdpX3BKMSSz8SiGXmXk1h0EdxvH5yC5UehD/nSKh9Qjo+gpffKUdpIJesvdwdkwm/swGx3gG9xbT0kk2r+CnPIxuuek/79wtAVEMg1IvPjeMvyuOznTu1PBw59FoIsp4P0FyeUPCa73EjRwlDTxkEIBt3Gile1E4zaOO+lKmC9PYx1AiBX2bKBLRMFH/69Sh/FKu34wxgrixbZwRuaMbsxWpNWkAMpPvUuEndquGD7IRc5Xc63RZDBozqboZyVcFPKM2qMW4Q7LWAbpM5qZlJogsmAfe4Rvwn+sztEYhdGgoVtZMtMZ3Y3AHJpQRrSlqmdjPZ+6awTkqxnK9n7uVgvqebEfdCEoqTX3venuUTY7WqxXHXbTUHX+wkY6AXB9o6/BNfdC2KSYIOzteHlna54VY4NBqNs66k07w/qDLIMyHztAp/NHJxw08EBZmnYtt2xOPuf9TyHSOY39uO9ZV9xJDJuN2utJK0nXolsNcPNo0K47fYRVjXrw6aX1ZY745PSiuKBTOxA2ngeoDFrsPnWSlGiRT4joVlVcsFtMvLr4mTu743uUh/PW9Np1XRxrciisrmRtszTcUKU0bHHbKLjy4mH4KlGNEDNk2+P8dd1Z8bysHKI/zkM80btnsEPoAspbCjN1oSmITRk0f1xTFrTDlDuSHk15Dtd1dHk/r+6299So6iE5Gr4JfvRcUScjTFMkoybSPDK6ShejRK3Vpm2mPh21CMnyr5g9WYNWPGuRoXz4TE1ghnLMPuJG9sduCLMzmC9edryxpWbWKyrmxO/otvQGNtTBvhWC7nRjIe+8DU7B/WnJU/TEWn2nJlhYBhYUwX4W+uAGPa+Qfj+dYyjj8snSDNKbADDOql8wDNS3FlEqdJgy4PLYMOsNmvjO43uexUuSefG1buZR/9NohgRXTSObMWeW5vOm5swFdQoX2YF2sc5sMhOEUhc8YqIF+LPLK/RHFUd4glRG/0hqkyMHWN84ZWVeTol8/PKOUIb8RC5wMYbKC9CiCUDwTkd4MDnuoGWDOPfRN+le9706LOQmspchb/gTAdHtRKPn3p/vFd+gi9mSJXb294U8vkLcEnzsp9h+sCer2n2NU96oPqqTziWq2GkCvf1D9lr5CHMa2u9fwKUZShczZk2XaiH9TDGYtDVwFUHbuw8e6ptUze2hY9CackCXUb+ddfbib0eR"));

// var IV512 = [
//   (0x6fd14b96), (0x3e00aa17), (0x636a2e05), (0x7a15d543),
//   (0x8a225e8d), (0x0c97ef0b), (0xe9341259), (0xf2b3c361),
//   (0x891da0c1), (0x536f801e), (0x2aa9056b), (0xea2b6d80),
//   (0x588eccdb), (0x2075baa6), (0xa90f3a76), (0xbaf83bf7),
//   (0x0169e605), (0x41e34a69), (0x46b58a8e), (0x2e6fe65a),
//   (0x1047a7d0), (0xc1843c24), (0x3b6e71b1), (0x2d5ac199),
//   (0xcf57f6ec), (0x9db1f856), (0xa706887c), (0x5716b156),
//   (0xe3c2fcdf), (0xe68517fb), (0x545a4678), (0xcc8cdd4b)
// ];

//C would need to be 32 bit swapped if using these values
// var C = [
//   (0x72d5dea2), (0xdf15f867), (0x7b84150a),
//   (0xb7231557), (0x81abd690), (0x4d5a87f6),
//   (0x4e9f4fc5), (0xc3d12b40), (0xea983ae0),
//   (0x5c45fa9c), (0x03c5d299), (0x66b2999a),
//   (0x660296b4), (0xf2bb538a), (0xb556141a),
//   (0x88dba231), (0x03a35a5c), (0x9a190edb),
//   (0x403fb20a), (0x87c14410), (0x1c051980),
//   (0x849e951d), (0x6f33ebad), (0x5ee7cddc),
//   (0x10ba1392), (0x02bf6b41), (0xdc786515),
//   (0xf7bb27d0), (0x0a2c8139), (0x37aa7850),
//   (0x3f1abfd2), (0x410091d3), (0x422d5a0d),
//   (0xf6cc7e90), (0xdd629f9c), (0x92c097ce),
//   (0x185ca70b), (0xc72b44ac), (0xd1df65d6),
//   (0x63c6fc23), (0x976e6c03), (0x9ee0b81a),
//   (0x2105457e), (0x446ceca8), (0xeef103bb),
//   (0x5d8e61fa), (0xfd9697b2), (0x94838197),
//   (0x4a8e8537), (0xdb03302f), (0x2a678d2d),
//   (0xfb9f6a95), (0x8afe7381), (0xf8b8696c),
//   (0x8ac77246), (0xc07f4214), (0xc5f4158f),
//   (0xbdc75ec4), (0x75446fa7), (0x8f11bb80),
//   (0x52de75b7), (0xaee488bc), (0x82b8001e),
//   (0x98a6a3f4), (0x8ef48f33), (0xa9a36315),
//   (0xaa5f5624), (0xd5b7f989), (0xb6f1ed20),
//   (0x7c5ae0fd), (0x36cae95a), (0x06422c36),
//   (0xce293543), (0x4efe983d), (0x533af974),
//   (0x739a4ba7), (0xd0f51f59), (0x6f4e8186),
//   (0x0e9dad81), (0xafd85a9f), (0xa7050667),
//   (0xee34626a), (0x8b0b28be), (0x6eb91727),
//   (0x47740726), (0xc680103f), (0xe0a07e6f),
//   (0xc67e487b), (0x0d550aa5), (0x4af8a4c0),
//   (0x91e3e79f), (0x978ef19e), (0x86767281),
//   (0x50608dd4), (0x7e9e5a41), (0xf3e5b062),
//   (0xfc9f1fec), (0x4054207a), (0xe3e41a00),
//   (0xcef4c984), (0x4fd794f5), (0x9dfa95d8),
//   (0x552e7e11), (0x24c354a5), (0x5bdf7228),
//   (0xbdfe6e28), (0x78f57fe2), (0x0fa5c4b2),
//   (0x05897cef), (0xee49d32e), (0x447e9385),
//   (0xeb28597f), (0x705f6937), (0xb324314a),
//   (0x5e8628f1), (0x1dd6e465), (0xc71b7704),
//   (0x51b920e7), (0x74fe43e8), (0x23d4878a),
//   (0x7d29e8a3), (0x927694f2), (0xddcb7a09),
//   (0x9b30d9c1), (0x1d1b30fb), (0x5bdc1be0),
//   (0xda24494f), (0xf29c82bf), (0xa4e7ba31),
//   (0xb470bfff), (0x0d324405), (0xdef8bc48),
//   (0x3baefc32), (0x53bbd339), (0x459fc3c1),
//   (0xe0298ba0), (0xe5c905fd), (0xf7ae090f),
//   (0x94703412), (0x4290f134), (0xa271b701),
//   (0xe344ed95), (0xe93b8e36), (0x4f2f984a),
//   (0x88401d63), (0xa06cf615), (0x47c1444b),
//   (0x8752afff), (0x7ebb4af1), (0xe20ac630),
//   (0x4670b6c5), (0xcc6e8ce6), (0xa4d5a456),
//   (0xbd4fca00), (0xda9d844b), (0xc83e18ae),
//   (0x7357ce45), (0x3064d1ad), (0xe8a6ce68),
//   (0x145c2567), (0xa3da8cf2), (0xcb0ee116),
//   (0x33e90658), (0x9a94999a), (0x1f60b220),
//   (0xc26f847b), (0xd1ceac7f), (0xa0d18518),
//   (0x32595ba1), (0x8ddd19d3), (0x509a1cc0),
//   (0xaaa5b446), (0x9f3d6367), (0xe4046bba),
//   (0xf6ca19ab), (0x0b56ee7e), (0x1fb179ea),
//   (0xa9282174), (0xe9bdf735), (0x3b3651ee),
//   (0x1d57ac5a), (0x7550d376), (0x3a46c2fe),
//   (0xa37d7001), (0xf735c1af), (0x98a4d842),
//   (0x78edec20), (0x9e6b6779), (0x41836315),
//   (0xea3adba8), (0xfac33b4d), (0x32832c83),
//   (0xa7403b1f), (0x1c2747f3), (0x5940f034),
//   (0xb72d769a), (0xe73e4e6c), (0xd2214ffd),
//   (0xb8fd8d39), (0xdc5759ef), (0x8d9b0c49),
//   (0x2b49ebda), (0x5ba2d749), (0x68f3700d),
//   (0x7d3baed0), (0x7a8d5584), (0xf5a5e9f0),
//   (0xe4f88e65), (0xa0b8a2f4), (0x36103b53),
//   (0x0ca8079e), (0x753eec5a), (0x91689492),
//   (0x56e8884f), (0x5bb05c55), (0xf8babc4c),
//   (0xe3bb3b99), (0xf387947b), (0x75daf4d6),
//   (0x726b1c5d), (0x64aeac28), (0xdc34b36d),
//   (0x6c34a550), (0xb828db71), (0xf861e2f2),
//   (0x108d512a), (0xe3db6433), (0x59dd75fc),
//   (0x1cacbcf1), (0x43ce3fa2), (0x67bbd13c),
//   (0x02e843b0), (0x330a5bca), (0x8829a175),
//   (0x7f34194d), (0xb416535c), (0x923b94c3),
//   (0x0e794d1e), (0x797475d7), (0xb6eeaf3f),
//   (0xeaa8d4f7), (0xbe1a3921), (0x5cf47e09),
//   (0x4c232751), (0x26a32453), (0xba323cd2),
//   (0x44a3174a), (0x6da6d5ad), (0xb51d3ea6),
//   (0xaff2c908), (0x83593d98), (0x916b3c56),
//   (0x4cf87ca1), (0x7286604d), (0x46e23ecc),
//   (0x086ec7f6), (0x2f9833b3), (0xb1bc765e),
//   (0x2bd666a5), (0xefc4e62a), (0x06f4b6e8),
//   (0xbec1d436), (0x74ee8215), (0xbcef2163),
//   (0xfdc14e0d), (0xf453c969), (0xa77d5ac4),
//   (0x06585826), (0x7ec11416), (0x06e0fa16),
//   (0x7e90af3d), (0x28639d3f), (0xd2c9f2e3),
//   (0x009bd20c), (0x5faace30), (0xb7d40c30),
//   (0x742a5116), (0xf2e03298), (0x0deb30d8),
//   (0xe3cef89a), (0x4bc59e7b), (0xb5f17992),
//   (0xff51e66e), (0x048668d3), (0x9b234d57),
//   (0xe6966731), (0xcce6a6f3), (0x170a7505),
//   (0xb17681d9), (0x13326cce), (0x3c175284),
//   (0xf805a262), (0xf42bcbb3), (0x78471547),
//   (0xff465482), (0x23936a48), (0x38df5807),
//   (0x4e5e6565), (0xf2fc7c89), (0xfc86508e),
//   (0x31702e44), (0xd00bca86), (0xf04009a2),
//   (0x3078474e), (0x65a0ee39), (0xd1f73883),
//   (0xf75ee937), (0xe42c3abd), (0x2197b226),
//   (0x0113f86f), (0xa344edd1), (0xef9fdee7),
//   (0x8ba0df15), (0x762592d9), (0x3c85f7f6),
//   (0x12dc42be), (0xd8a7ec7c), (0xab27b07e),
//   (0x538d7dda), (0xaa3ea8de), (0xaa25ce93),
//   (0xbd0269d8), (0x5af643fd), (0x1a7308f9),
//   (0xc05fefda), (0x174a19a5), (0x974d6633),
//   (0x4cfd216a), (0x35b49831), (0xdb411570),
//   (0xea1e0fbb), (0xedcd549b), (0x9ad063a1),
//   (0x51974072), (0xf6759dbf), (0x91476fe2)
// ];

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
  return C[((r) << 3) + 3 - n];
}

var Codd = function(n, r) {
  return C[((r) << 3) + 7 - n];
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
      var int32Buf = op.swap32Array(he.bytes2Int32Buffer(buf));

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
  var lBytes = he.int32Buffer2Bytes(op.swap32Array(l));
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
    msg = he.int32Buffer2Bytes(input);
  }
  else {
    msg = he.string2bytes(input);
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
    out = he.int32Buffer2Bytes(r)
  }
  else {
    out = he.int32ArrayToHexString(r)
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
  if (notString && Object.prototype.toString.call(message.constructor) === "[object ArrayBuffer]") {
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

var o = require('./op');
var h = require('./helper');

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
  o.xORTable(a, V[0], V[1], 8);
  o.xORTable(b, V[2], V[3], 8);
  o.xORTable(a, a, b, 8);
  o.xORTable(a, a, V[4], 8);
  M2(a, a);
  o.xORTable(V[0], a, V[0], 8);
  o.xORTable(V[1], a, V[1], 8);
  o.xORTable(V[2], a, V[2], 8);
  o.xORTable(V[3], a, V[3], 8);
  o.xORTable(V[4], a, V[4], 8);
  M2(b, V[0]);
  o.xORTable(b, b, V[1], 8);
  M2(V[1], V[1]);
  o.xORTable(V[1], V[1], V[2], 8);
  M2(V[2], V[2]);
  o.xORTable(V[2], V[2], V[3], 8);
  M2(V[3], V[3]);
  o.xORTable(V[3], V[3], V[4], 8);
  M2(V[4], V[4]);
  o.xORTable(V[4], V[4], V[0], 8);
  M2(V[0], b);
  o.xORTable(V[0], V[0], V[4], 8);
  M2(V[4], V[4]);
  o.xORTable(V[4], V[4], V[3], 8);
  M2(V[3], V[3]);
  o.xORTable(V[3], V[3], V[2], 8);
  M2(V[2], V[2]);
  o.xORTable(V[2], V[2], V[1], 8);
  M2(V[1], V[1]);
  o.xORTable(V[1], V[1], b, 8);
  o.xORTable(V[0], V[0], M, 8);
  M2(M, M);
  o.xORTable(V[1], V[1], M, 8);
  M2(M, M);
  o.xORTable(V[2], V[2], M, 8);
  M2(M, M);
  o.xORTable(V[3], V[3], M, 8);
  M2(M, M);
  o.xORTable(V[4], V[4], M, 8);
}

var TWEAK5 = function(V) {
  V[1][4] = o.rotl32(V[1][4], 1);
  V[1][5] = o.rotl32(V[1][5], 1);
  V[1][6] = o.rotl32(V[1][6], 1);
  V[1][7] = o.rotl32(V[1][7], 1);
  V[2][4] = o.rotl32(V[2][4], 2);
  V[2][5] = o.rotl32(V[2][5], 2);
  V[2][6] = o.rotl32(V[2][6], 2);
  V[2][7] = o.rotl32(V[2][7], 2);
  V[3][4] = o.rotl32(V[3][4], 3);
  V[3][5] = o.rotl32(V[3][5], 3);
  V[3][6] = o.rotl32(V[3][6], 3);
  V[3][7] = o.rotl32(V[3][7], 3);
  V[4][4] = o.rotl32(V[4][4], 4);
  V[4][5] = o.rotl32(V[4][5], 4);
  V[4][6] = o.rotl32(V[4][6], 4);
  V[4][7] = o.rotl32(V[4][7], 4);
}

var SUB_CRUMB = function(a0, a1, a2, a3) {
  var tmp;
  tmp = (a0);
  (a0) |= (a1);
  (a2) ^= (a3);
  (a1) = o.t32(~(a1));
  (a0) ^= (a3);
  (a3) &= tmp;
  (a1) ^= (a3);
  (a3) ^= (a2);
  (a2) &= (a0);
  (a0) = o.t32(~(a0));
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
  (u) = o.rotl32((u), 2) ^ (v);
  (v) = o.rotl32((v), 14) ^ (u);
  (u) = o.rotl32((u), 10) ^ (v);
  (v) = o.rotl32((v), 1);
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
  var V = new Array(5);
  for (var i = 0; i < 5; i++) {
    V[i] = new Array(8);
  }
  buf = ctx.buffer;
  ptr = ctx.ptr;
  var len = data.length;
  if (len < ctx.buffer.length - ptr) {
    o.bufferInsert(buf, ptr, data, data.length);
    ptr += data.length;
    ctx.ptr = ptr;
    return;
  }
  //perform a deep copy of current state
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 8; j++) {
      V[i][j] = ctx.state[i][j];
    }
  }
  while (len > 0) {
    var clen = ctx.buffer.length - ptr;
    if (clen > len) clen = len;
    o.bufferInsert(buf, ptr, data, clen);
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
  var V = new Array(5);
  for (var i = 0; i < 5; i++) {
    V[i] = new Array(8);
  }
  buf = ctx.buffer;
  ptr = ctx.ptr;
  z = 0x80 >> n;
  buf[ptr++] = ((ub & -z) | z) & 0xFF;
  o.bufferSet(buf, ptr, 0, ctx.buffer.length - ptr);
  for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 8; j++) {
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
        o.bufferSet(buf, 0, 0, ctx.buffer.length);
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
  ctx.buffer = new Array(32);
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
  }
  else {
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
  }
  else if (bits > 31) {
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

u64.prototype.setShiftLeft = function(bits) {
  if (bits === 0) {
    return this;
  }
  if (bits > 63) {
    bits = bits % 64;
  }
  
  if (bits > 31) {
    this.hi = this.lo << (bits - 32);
    this.lo = 0;
  }
  else {
    var toMoveUp = this.lo >>> 32 - bits;
    this.lo <<= bits;
    this.hi = (this.hi << bits) | toMoveUp;
  }
  return this; //for chaining..
};
//Shifts this word by the given number of bits to the right (max 32)..
u64.prototype.shiftRight = function(bits) {
  bits = bits % 64;
  var c = new u64(0, 0);
  if (bits === 0) {
    return this.clone();
  }
  else if (bits >= 32) {
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
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  }
  else if (bits === 32) { //just switch high and low over in this case..
    c.lo = this.hi;
    c.hi = this.lo;
  }
  else {
    c.lo = (this.lo << bits) | (this.hi >>> (32 - bits));
    c.hi = (this.hi << bits) | (this.lo >>> (32 - bits));
  }
  return c; //for chaining..
};

u64.prototype.setRotateLeft = function(bits) {
  if (bits > 32) {
    return this.setRotateRight(64 - bits);
  }
  var newHigh;
  if (bits === 0) {
    return this;
  }
  else if (bits === 32) { //just switch high and low over in this case..
    newHigh = this.lo;
    this.lo = this.hi;
    this.hi = newHigh;
  }
  else {
    newHigh = (this.hi << bits) | (this.lo >>> (32 - bits));
    this.lo = (this.lo << bits) | (this.hi >>> (32 - bits));
    this.hi = newHigh;
  }
  return this; //for chaining..
};
//Rotates the bits of this word round to the right (max 32)..
u64.prototype.rotateRight = function(bits) {
  if (bits > 32) {
    return this.rotateLeft(64 - bits);
  }
  var c = new u64(0, 0);
  if (bits === 0) {
    c.lo = this.lo >>> 0;
    c.hi = this.hi >>> 0;
  }
  else if (bits === 32) { //just switch high and low over in this case..
    c.lo = this.hi;
    c.hi = this.lo;
  }
  else {
    c.lo = (this.hi << (32 - bits)) | (this.lo >>> bits);
    c.hi = (this.lo << (32 - bits)) | (this.hi >>> bits);
  }
  return c; //for chaining..
};
u64.prototype.setFlip = function() {
  var newHigh;
  newHigh = this.lo;
  this.lo = this.hi;
  this.hi = newHigh;
  return this;
};
//Rotates the bits of this word round to the right (max 32)..
u64.prototype.setRotateRight = function(bits) {
  if (bits > 32) {
    return this.setRotateLeft(64 - bits);
  }

  if (bits === 0) {
    return this;
  }
  else if (bits === 32) { //just switch high and low over in this case..
    var newHigh;
    newHigh = this.lo;
    this.lo = this.hi;
    this.hi = newHigh;
  }
  else {
    newHigh = (this.lo << (32 - bits)) | (this.hi >>> bits);
    this.lo = (this.hi << (32 - bits)) | (this.lo >>> bits);
    this.hi = newHigh;
  }
  return this; //for chaining..
};
//Xors this word with the given other..
u64.prototype.xor = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi ^ oWord.hi;
  c.lo = this.lo ^ oWord.lo;
  return c; //for chaining..
};
//Xors this word with the given other..
u64.prototype.setxorOne = function(oWord) {
  this.hi ^= oWord.hi;
  this.lo ^= oWord.lo;
  return this; //for chaining..
};
//Ands this word with the given other..
u64.prototype.and = function(oWord) {
  var c = new u64(0, 0);
  c.hi = this.hi & oWord.hi;
  c.lo = this.lo & oWord.lo;
  return c; //for chaining..
};

//Creates a deep copy of this Word..
u64.prototype.clone = function() {
  return new u64(this.hi, this.lo);
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

module.exports.u = function(h, l) {
  return new u64(h, l);
}

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

module.exports.xnd64 = function(x, y, z) {
  return new this.u64(x.hi ^ ((~y.hi) & z.hi), x.lo ^ ((~y.lo) & z.lo));
}

module.exports.load64 = function(x, i) {
  var l = x[i] | (x[i + 1] << 8) | (x[i + 2] << 16) | (x[i + 3] << 24);
  var h = x[i + 4] | (x[i + 5] << 8) | (x[i + 6] << 16) | (x[i + 7] << 24);
  return new this.u64(h, l);
}

module.exports.bufferInsert = function(buffer, bufferOffset, data, len, dataOffset) {
  if (!dataOffset) dataOffset = 0;
  for (var i = 0; i < len; i++) {
    buffer[i + bufferOffset] = data[i + dataOffset];
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
  ctx.buffer = new Array(128);
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

var IV512 = h.bytes2Int32Buffer(h.b64Decode("C6FrlXL5ma2f7MKuujJk/F6JSSmOnzDlLx2qN/DyxVisUGZDqQY1peJbh4uqt4ePiIF/egoCiStVmnVQWY9lfn7vYKFrcOPonBcU0blY4qirAmde7RwBT82NZbv9t6JXCSVImdaZx7yQGbbcK5Ai5I+hSVYhv5vTuU0JQ2/93CI="));

// var IV512 = [
//   0x0BA16B95, 0x72F999AD, 0x9FECC2AE, 0xBA3264FC,
//   0x5E894929, 0x8E9F30E5, 0x2F1DAA37, 0xF0F2C558,
//   0xAC506643, 0xA90635A5, 0xE25B878B, 0xAAB7878F,
//   0x88817F7A, 0x0A02892B, 0x559A7550, 0x598F657E,
//   0x7EEF60A1, 0x6B70E3E8, 0x9C1714D1, 0xB958E2A8,
//   0xAB02675E, 0xED1C014F, 0xCD8D65BB, 0xFDB7A257,
//   0x09254899, 0xD699C7BC, 0x9019B6DC, 0x2B9022E4,
//   0x8FA14956, 0x21BF9BD3, 0xB94D0943, 0x6FFDDC22,
// ];

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

// console.log(alpha_tab);

//console.log(h.b64Encode(alpha_tab));



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
  return ((x & 0xFF) - (x >> 8));
}
var REDS2 = function(x) {
  return ((x & 0xFFFF) + (x >> 16));
}

var IF = function(x, y, z) {
  return ((y ^ z) & x) ^ (z);
}
var MAJ = function(x, y, z) {
  return (x & y) | ((x | y) & (z));
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
  for (var i = 0;i<8;i++) {
    q[(qOffset) + i] = d1[i] + (d2[i] << i);
  }
  for (var i = 0;i<8;i++) {
    q[(qOffset) + 8 + i] = d1[i] - (d2[i] << i);
  }
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
  for (var i = 0;i<8;i++) {
    r[i] = INNER(q[16 * (sb) + 2 * i + o1], q[16 * (sb) + 2 * i + o2], mm);
  }
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
  for (var i = 0;i<8;i++) {
    tA[i] = op.rotl32(A[i], r);
  }
  for (var i = 0;i<8;i++) {
    STEP_ELT(i, w[i], fun, s, pp8b, tA, A, B, C, D);
  }
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
  op.bufferInsert(A,0,ctx.state,8);
  op.bufferInsert(B,0,ctx.state,8,8);
  op.bufferInsert(C,0,ctx.state,8,16);
  op.bufferInsert(D,0,ctx.state,8,24);
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
  op.bufferInsert(ctx.state,0,A,8);
  op.bufferInsert(ctx.state,8,B,8);
  op.bufferInsert(ctx.state,16,C,8);
  op.bufferInsert(ctx.state,24,D,8);
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
  ctx.buffer = new Array(128);
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
},{"./helper":7,"./op":11}],"x11hash":[function(require,module,exports){
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

var x11hash = module.exports;

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


module.exports.digest = function(str,format, output) {
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
  if (output === 2) {
    return a;
  }
  else if (output === 1) {
    return h.int32Buffer2Bytes(a);
  }
  else {
    return h.int32ArrayToHexString(a);
  }
}

},{"./lib/blake":2,"./lib/bmw":3,"./lib/cubehash":4,"./lib/echo":5,"./lib/groestl":6,"./lib/helper":7,"./lib/jh":8,"./lib/keccak":9,"./lib/luffa":10,"./lib/shavite":12,"./lib/simd":13,"./lib/skein":14}]},{},[]);
