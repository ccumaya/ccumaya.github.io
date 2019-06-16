
//Global site tag (gtag.js) - Google Analytics
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-5007622-2');


//ready
  $(function () {
    console.log("ready!");

    reloadHsltRoom();
    reloadHsltOmen();

    $(document).delegate('input[name=verSelect]', "change", function () {
        reloadHsltRoom();
        reloadHsltOmen();
    });

    $(document).delegate('#btnHaunt', "click", function () {
        //findHaunt();
        setUrlPara();
    });

    //載入額外說明表
    $('#aBaseTable').attr('href', aUrl_meta(1));
    $('#aWidowTable').attr('href', aUrl_meta(2));
    $('#aBaseBalence').attr('href', aUrl_meta(3));


    //以下是有參數的狀況才會觸發
    var v = getUrlParameter('v'); //version
    var r = getUrlParameter('r'); //room
    var o = getUrlParameter('o'); //omen

    if ((v != undefined)
        && (r != undefined)
        && (o != undefined)) {
        if (v == 'base')
            $('#radBase').prop('checked', true);
        else if (v == 'widow')
            $('#radWidowExt').prop('checked', true);

        reloadHsltRoom();
        reloadHsltOmen();

        $('#hsltRoom').val(r);
        $('#hsltOmen').val(o);

        findHaunt();
    }
});


//作祟劇本對照表
        var baseTable = [
            [18, 7, 12, 38, 1, 9, 45, 42, 49, 28, 34, 43, 48],// 1st onem
            [24, 7, 32, 5, 16, 6, 11, 25, 49, 20, 47, 39, 2],//2nd onem
            [4, 7, 23, 46, 1, 13, 10, 25, 49, 41, 37, 43, 48],
            [24, 33, 23, 38, 30, 13, 31, 48, 44, 20, 47, 15, 8],
            [24, 3, 27, 5, 16, 6, 45, 42, 21, 20, 37, 39, 40],
            [4, 33, 32, 38, 30, 13, 10, 42, 36, 28, 34, 15, 2],
            [18, 3, 19, 19, 19, 22, 10, 25, 36, 41, 37, 15, 8],
            [35, 29, 12, 46, 1, 22, 11, 22, 21, 41, 47, 43, 48],
            [4, 33, 27, 46, 1, 9, 11, 25, 44, 17, 17, 17, 40],
            [18, 3, 23, 46, 16, 22, 31, 32, 36, 41, 37, 39, 2],
            [35, 29, 27, 5, 16, 6, 10, 35, 44, 20, 47, 43, 2],
            [26, 50, 32, 50, 26, 26, 45, 14, 14, 26, 14, 50, 40],
            [35, 29, 12, 5, 30, 9, 31, 42, 21, 28, 34, 15, 8]
        ];

        var widowTable = [
            [18, 96, 7, 63, 88, 12, 38, 1, 9, 96, 100, 45, 42, 49, 96, 28, 86, 34, 43, 48, 96],
            [24, 67, 7, 63, 88, 32, 5, 16, 6, 90, 87, 11, 25, 49, 89, 20, 71, 47, 39, 2, 70],
            [4, 59, 7, 61, 88, 23, 46, 1, 13, 53, 83, 10, 25, 49, 94, 41, 69, 37, 43, 48, 91],
            [24, 79, 33, 63, 101, 23, 38, 30, 13, 101, 83, 31, 48, 44, 101, 20, 69, 47, 15, 8, 101],
            [24, 67, 3, 99, 60, 27, 5, 16, 6, 90, 54, 45, 42, 21, 89, 20, 82, 37, 39, 40, 91],
            [97, 55, 55, 61, 55, 84, 72, 55, 66, 53, 101, 56, 55, 77, 89, 85, 69, 73, 65, 64, 80],
            [4, 59, 33, 61, 75, 32, 38, 30, 13, 75, 83, 10, 42, 36, 75, 28, 75, 34, 15, 2, 91],
            [18, 79, 3, 52, 88, 19, 19, 19, 22, 53, 54, 10, 25, 36, 76, 41, 71, 37, 15, 8, 70],
            [35, 79, 29, 52, 92, 12, 46, 1, 22, 92, 100, 11, 22, 21, 92, 41, 86, 47, 43, 48, 92],
            [4, 79, 33, 52, 88, 27, 46, 1, 9, 68, 100, 11, 25, 44, 76, 17, 71, 17, 17, 40, 91],
            [18, 67, 3, 99, 60, 23, 46, 61, 22, 53, 87, 31, 32, 36, 89, 41, 82, 37, 39, 2, 80],
            [35, 98, 29, 98, 98, 27, 5, 16, 6, 90, 54, 10, 35, 44, 76, 20, 82, 47, 43, 2, 98],
            [74, 67, 95, 99, 74, 84, 72, 58, 66, 68, 87, 74, 74, 95, 95, 85, 86, 73, 65, 95, 80],
            [26, 59, 50, 61, 81, 32, 50, 26, 26, 81, 83, 45, 14, 14, 94, 26, 81, 14, 50, 40, 81],
            [97, 93, 93, 57, 57, 93, 57, 58, 66, 93, 87, 56, 57, 77, 94, 85, 86, 73, 65, 64, 70],
            [35, 59, 29, 52, 60, 12, 5, 30, 9, 68, 54, 31, 42, 21, 94, 28, 71, 34, 15, 8, 80],
            [97, 59, 78, 99, 78, 84, 72, 58, 78, 90, 78, 56, 78, 77, 76, 85, 82, 73, 65, 64, 70],
            [97, 62, 51, 63, 60, 84, 72, 58, 66, 68, 51, 56, 62, 77, 51, 51, 69, 62, 62, 64, 62]
        ];
    


//叛徒對照表
var traitorArray = ['作祟揭露者', '作祟揭露者', '最低知識（除了作祟揭露者以外）', '最高力量（除了作祟揭露者以外）', '作祟揭露者', '最低神志', '萊茵哈特神父（園藝專家）或最高神志', '作祟揭露者', '無（一開始沒有）', '作祟揭露者', '作祟揭露者', '無', '最低神志（除了作祟揭露者以外）', '作祟揭露者', '最低速度（除了作祟揭露者以外）', '作祟揭露者左邊的玩家', '作祟揭露者左邊的玩家', '作祟揭露者', '作祟揭露者左邊的玩家', '微微安 羅培茲（老電影）或作祟揭露者左邊的玩家', '最年老的探險者（除了作祟揭露者以外）', '作祟揭露者左邊的玩家', '作祟揭露者左邊的玩家', '布蘭登 賈斯柏（露營）或最低速度', '佐伊 恩斯特容（玩偶）或最高知識', '作祟揭露者左邊的玩家', '最高知識（除了作祟揭露者以外）', '最高知識（除了作祟揭露者以外）', '作祟揭露者', '作祟揭露者', '沒有叛徒（請參照生存指南）', '最高神志', '作祟揭露者', '隱藏叛徒（請參照生存指南）', '最高知識', '達柏爾德小姐（游泳）或最高速度', '最低力量', '最低知識（除了作祟揭露者以外）', '最高速度（除了作祟揭露者以外）', '作祟揭露者左邊的玩家', '作祟揭露者', '最高力量', '隱藏叛徒（請參照生存指南）', '最年輕的探險者（除了作祟揭露者以外）', '最高知識（除了作祟揭露者以外）', '扎斯托 夫人（烹飪）或最低速度', '作祟揭露者', '作祟揭露者左邊的玩家', '海瑟 格蘭維爾或最高知識', '沒有叛徒（請參照生存指南）', '除了作祟揭露者之外的每位玩家', '作祟揭露者', '作祟揭露者', '知識最高者＊', '最靠近作祟揭露者右邊的女性探險者（若無=>作祟揭露者）', '持有物品卡和預兆卡總數最多的探險者', '無（見生存指南）', '作祟揭露者', '作祟揭露者', '作祟揭露者', '作祟揭露者', '達林 威廉斯 閃電俠（莎士比亞文學）或知識最高者＊', '作祟揭露者', '除了知識最高者＊之外的每位玩家', '作祟揭露者', '最老的男性探險者（最老探險者）', '彼得 秋元（籃球）或速度最高者＊', '珍妮 勒克萊爾（閱讀）或知識最高者＊', '作祟揭露者', '最老的探險者', '作祟揭露者左邊的玩家', '作祟揭露者', '奧克斯 貝洛斯（發光的東西）或力量最高者＊', '作祟揭露者', '作祟揭露者左邊的玩家', '最老探險者', '朗費羅教授（愛爾蘭音樂）或速度最高者＊', '神智最低者＊（除了作祟揭露者）', '作祟揭露者左邊和右邊的玩家', '知識最高者＊', '作祟揭露者', '作祟揭露者', '無（見生存指南）', '作祟揭露者左邊的玩家', '作祟揭露者左邊的玩家', '作祟揭露者', '最年輕的探險者', '作祟揭露者', '神智最低者＊', '作祟揭露者', '神智最低者＊', '無（見生存指南）', '知識最高者＊', '持有可被偷竊或交易的物品卡總數最多的探險者', '年齡最高的玩家（該玩家不需要是最老探險者）', '作祟揭露者左邊的玩家', '隱藏叛徒（見生存指南）', '作祟揭露者', '無（見生存指南）', '無（見生存指南）', '所有探險者已玩過57,75,86,93劇本 ? 觸發，無叛徒 : 忽略此次作祟'];
//var equalJudge = '＊平手 => (有作祟揭露者 ? 作祟揭露者 : 靠近作祟揭露者左邊的人)';
var equalJudge = '若平手，優先權：1.作祟揭露者,2.靠近作祟揭露者左邊的人';


var survivalHauntUrlArray = [
    'ncg6pPr_1', 'i5jRnJk_2', 'er3ZPRm_3', 'rW5uHiC_4', 'SgBsSxZ_5', 
    'lbkm4d1_6', 'AxH1woZ_7', 'f1ngDrp_8', 'KTMbpaQ_9', 'FMA8Jjl_10', 
    'RuyvjDQ_11', 'YQRGUN6_12', '7aNH0pD_13', 'wHHfwCF_14', 'HdJwc35_15', 
    'Y4iOdUm_16', 'e2lVhh1_17', 'V9h9Cih_18', 'RYugTYL_19', 'e2lVhh1_20', 
    'QtCun8w_21', '5BKPlii_22', 'YgezT6r_23', 'eRAAaVB_24', 'zqL5HPz_25', 
    'EJy7lLT_26', 'EPPFf1a_27', 'e2lVhh1_28', 'a2HL0C1_29', 'bkKTtf3_30', 
    'YVM9LtZ_31', 'EjSSkSe_32', 'Lwn4ywh_33', '3RKZY3H_34', 'daU9URd_35', 
    'ZRkpn0Y_36', '3x6vI0I_37', 'zhsqM6Z_38', 'C11hdTq_39', 'zXYXH5q_40', 
    'ezPOc5W_41', '0SzxSuS_42', 'JmTJJeJ_43', 'ZpMLEa1_44', 'G2HZBUv_45', 
    'ORisOYf_46', 'iOrHLob_47', 'La3t4QN_48', 'QSv0N7R_49', 'liXo275_50', 
    'MSdAAtq_51', 'g21DHt3_52', 'R6loHpk_53', 'ozIKYu5_54', 'o3Cdwxt_55', 
    'zJ0ENrR_56', 'geE9f4l_57', 'jbhlrMK_58', 'IIEKmh4_59', 'CdozkyY_60', 
    'P7mEnvR_61', 'JxFOljV_62', 'it77pwC_63', 'KXBDDDf_64', '5hlcMhl_65', 
    'mRenNd8_66', 'Kae1bWj_67', 'kRNjdfW_68', 'vd6teyC_69', 'WJfI0wP_70', 
    'LfF2diX_71', 'KP8JpOh_72', 'rjH7LyJ_73', 'f2f1tD8_74', 'EkGj6br_75', 
    'u0Ye2h5_76', '6ELSc9u_77', 'tdDVhhY_78', 'oniHIku_79', 'JgjQslD_80', 
    'ND0FvZB_81', 'd26YGJS_82', 'wuokgQJ_83', 'iwWKi4d_84', 'cpP6bRC_85', 
    'zOPlR1o_86', 'IxW7KIk_87', 'a0HnRSh_88', 'uq8XqKu_89', 'xHhk28Z_90', 
    'm4TpxHt_91', 'O8nrfGK_92', 'DdeXWkY_93', '0tifMg8_94', '9u5A3y5_95', 
    'D1VHE5a_96', 'Ie1kER3_97', 'QzU0plo_98', 'nHRyjeT_99', 'yG3wbTL_100', 
    'B0EJdGw_101'];
var traitorHauntUrlArray = [
    'aWGenQU_1', 'AJUJefs_2', 'EwbvQe0_3', 'j7M7v2u_4', 'Klo9eye_5', 
    'hInXtwE_6', '4nzy6EM_7', 'VKa4plx_8', '8xbVO3V_9', 'a4WBRwE_10', 
    '8xbVO3V_11', '8xbVO3V_12', 'A9bfOQw_13', 'DGoWZwB_14', '328tTTv_15', 
    't3Pd3sm_16', 'XNfbP8F_17', 'QYZoZlC_18', 'nrjiABZ_19', 'WjxiKY5_20', 
    'Dg8tV9x_21', 'zMUXVGD_22', 'nqhmfWf_23', '4KnPu9x_24', 'fuEomjI_25', 
    'RjMiKW8_26', 'bAQHuwS_27', 'ZjTZ7sa_28', 'zxhQdFg_29', 'mBd7er6_30', 
    '55Yx07Z_31', 'BLdXbfI_32', 'zPZoCSn_33', 'ujcpA11_34', 'cPK8jho_35', 
    'AIRvvDN_36', 'hAvoDIH_37', '12hwbYB_38', 'Qq36hfz_39', 'eYt2P8N_40', 
    '3TWRhXV_41', 'fNQxbW7_42', 'yhLGUg4_43', 'zARwQwU_44', 'y3JRWgd_45', 
    'E1NHNh5_46', '9iF4rXn_47', '1enNJLy_48', '3ARl1OW_49', 'DkBOMjV_50', 
    'VSBri7c_51', 'SixyXbR_52', 'bLzOjqn_53', 'RQWeXDm_54', 'kgPseGF_55', 
    'nFI4i3F_56', 'DF8pM8p_57', 'pAL2nwE_58', 'puYTR7d_59', 'n1Mxiyk_60', 
    'EyXn1vw_61', 'Ybkx4pw_62', 'e3MChCy_63', 'HDy4Fhe_64', 'rox6FVL_65', 
    'GPe4HLy_66', '3hg5y0u_67', 'UhmPOJ1_68', 'IReLvbp_69', 'kXL0JBO_70', 
    'ZoyewBi_71', 'c9x5tR9_72', 'E5TFy1l_73', '24Ennaq_74', 'Ci494nK_75', 
    'zn50HuZ_76', 'IO0fYSx_77', 'WkHuYiD_78', 'rNMBJZJ_79', 'VLr2ASj_80', 
    'wWAa08h_81', 'DTmTv2h_82', 'CHjybei_83', '2mTnGzs_84', 'SlHE0NR_85', 
    'QjXKapt_86', 'K49uuD1_87', 'FTn1qkW_88', 'OpwLFYI_89', 'wCo6pv2_90', 
    'pv8Unfh_91', 'NhiOOoq_92', 'jc93YLJ_93', 'ZOqiTqe_94', 'CtXNiHx_95', 
    '602JqXQ_96', 'bKuj5PO_97', 'Pe3dPv4_98', 'Jvjzpho_99', 'rhVFci4_100', 
    '93MuBDZ_101'];
var baseTableUrl = 'Yy2Agoa'; //驗算用的base作祟表
var widowTableUrl = '6n3Zk7x'; //驗算用的widow作祟表
var balenceUrl = 'ZwoM6hQ_balance(1-50)'; //base平衡調整
var metaUrlArray = [baseTableUrl, widowTableUrl, balenceUrl];

function imgUrl(hauntNum, isTraitor) {
    //var idxType = (isTraitor) ? 't' : 's';
    //var urlArray = (isTraitor) ? traitorHauntUrlArray : survivalHauntUrlArray;
    //var url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http%3A%2F%2Fimgur.com%2F' + urlArray[hauntNum - 1];
    //var survivalUrl = 'https://ccumaya.github.io/showHauntImg.html?t=t&i=wergfs_14';
    //var survivalUrl = 'https://ccumaya.github.io/showHauntImg.html?t=t&i='+ urlArray[hauntNum - 1];
    var data = encodeURIComponent(aUrl(hauntNum, isTraitor, true));
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+ data;
    return url;
}
function aUrl(hauntNum, isTraitor, isFullUrl) {
    //var urlArray = (isTraitor) ? traitorHauntUrlArray : survivalHauntUrlArray;
    //var url = 'http://imgur.com/' + urlArray[hauntNum - 1];
    var idxType = (isTraitor) ? 't' : 's';
    var urlArray = (isTraitor) ? traitorHauntUrlArray : survivalHauntUrlArray;
    var fullUrl = 'https://ccumaya.github.io/showHauntImg.html?t='+idxType+'&i='+ urlArray[hauntNum - 1];
    var partialUrl = 'showHauntImg.html?t='+idxType+'&i='+ urlArray[hauntNum - 1];
    return isFullUrl ? fullUrl : partialUrl;
}
//1.base作祟表/2.widow作祟表/3.平衡調整 URL
function aUrl_meta(typeNum) {
    var url = 'http://imgur.com/' + metaUrlArray[typeNum - 1];
    return url;
}


var cardData = {
    "roomArray": [
    {
    "name": "被棄置的房間",
    "ver": "base",
    "eng": "Abandoned Room",
    "baseRowNum": 1,
    "widowRowNum": 1
    },
    {
    "name": "陽台",
    "ver": "base",
    "eng": "Balcony",
    "baseRowNum": 2,
    "widowRowNum": 2
    },
    {
    "name": "地下墓室",
    "ver": "base",
    "eng": "Catacombs",
    "baseRowNum": 3,
    "widowRowNum": 3
    },
    {
    "name": "燒焦的房間",
    "ver": "base",
    "eng": "Charred Room",
    "baseRowNum": 4,
    "widowRowNum": 4
    },
    {
    "name": "餐廳",
    "ver": "base",
    "eng": "Dining Room",
    "baseRowNum": 5,
    "widowRowNum": 5
    },
    {
    "name": "地牢",
    "ver": "widow",
    "eng": "Dungeon",
    "baseRowNum": 0,
    "widowRowNum": 6
    },
    {
    "name": "暖氣爐房間",
    "ver": "base",
    "eng": "Furnace Room",
    "baseRowNum": 6,
    "widowRowNum": 7
    },
    {
    "name": "看台",
    "ver": "base",
    "eng": "Gallery",
    "baseRowNum": 7,
    "widowRowNum": 8
    },
    {
    "name": "健身房",
    "ver": "base",
    "eng": "Gymnasium",
    "baseRowNum": 8,
    "widowRowNum": 9
    },
    {
    "name": "廢棄物房間",
    "ver": "base",
    "eng": "Junk Room",
    "baseRowNum": 9,
    "widowRowNum": 10
    },
    {
    "name": "廚房",
    "ver": "base",
    "eng": "Kitchen",
    "baseRowNum": 10,
    "widowRowNum": 11
    },
    {
    "name": "主臥房",
    "ver": "base",
    "eng": "Master Bedroom",
    "baseRowNum": 11,
    "widowRowNum": 12
    },
    {
    "name": "育兒室",
    "ver": "widow",
    "eng": "Nursery",
    "baseRowNum": 0,
    "widowRowNum": 13
    },
    {
    "name": "五芒星房間",
    "ver": "base",
    "eng": "Pentagram Chamber",
    "baseRowNum": 12,
    "widowRowNum": 14
    },
    {
    "name": "鳥園",
    "ver": "widow",
    "eng": "Rookery",
    "baseRowNum": 0,
    "widowRowNum": 15
    },
    {
    "name": "僕役房",
    "ver": "base",
    "eng": "Servants Quarters",
    "baseRowNum": 13,
    "widowRowNum": 16
    },
    {
    "name": "書房",
    "ver": "widow",
    "eng": "Study",
    "baseRowNum": 0,
    "widowRowNum": 17
    },
    {
    "name": "劇院",
    "ver": "widow",
    "eng": "Theater",
    "baseRowNum": 0,
    "widowRowNum": 18
    }
    ],
        "omenArray": [
    {
    "name": "噬咬",
    "ver": "base",
    "eng": "Bite",
    "baseRowNum": 1,
    "widowRowNum": 1
    },
    {
    "name": "血石",
    "ver": "widow",
    "eng": "Bloodstone",
    "baseRowNum": 0,
    "widowRowNum": 2
    },
    {
    "name": "書",
    "ver": "base",
    "eng": "Book",
    "baseRowNum": 2,
    "widowRowNum": 3
    },
    {
    "name": "盒子",
    "ver": "widow",
    "eng": "Box",
    "baseRowNum": 0,
    "widowRowNum": 4
    },
    {
    "name": "貓",
    "ver": "widow",
    "eng": "Cat",
    "baseRowNum": 0,
    "widowRowNum": 5
    },
    {
    "name": "水晶球",
    "ver": "base",
    "eng": "Crystal Ball",
    "baseRowNum": 3,
    "widowRowNum": 6
    },
    {
    "name": "狗",
    "ver": "base",
    "eng": "Dog",
    "baseRowNum": 4,
    "widowRowNum": 7
    },
    {
    "name": "女孩",
    "ver": "base",
    "eng": "Girl",
    "baseRowNum": 5,
    "widowRowNum": 8
    },
    {
    "name": "聖符",
    "ver": "base",
    "eng": "Holy Symbol",
    "baseRowNum": 6,
    "widowRowNum": 9
    },
    {
    "name": "鑰匙",
    "ver": "widow",
    "eng": "Key",
    "baseRowNum": 0,
    "widowRowNum": 10
    },
    {
    "name": "信件",
    "ver": "widow",
    "eng": "Letter",
    "baseRowNum": 0,
    "widowRowNum": 11
    },
    {
    "name": "瘋漢",
    "ver": "base",
    "eng": "Madman",
    "baseRowNum": 7,
    "widowRowNum": 12
    },
    {
    "name": "面具",
    "ver": "base",
    "eng": "Mask",
    "baseRowNum": 8,
    "widowRowNum": 13
    },
    {
    "name": "徽章",
    "ver": "base",
    "eng": "Medallion",
    "baseRowNum": 9,
    "widowRowNum": 14
    },
    {
    "name": "相片",
    "ver": "widow",
    "eng": "Photograph",
    "baseRowNum": 0,
    "widowRowNum": 15
    },
    {
    "name": "戒指",
    "ver": "base",
    "eng": "Ring",
    "baseRowNum": 10,
    "widowRowNum": 16
    },
    {
    "name": "繩索",
    "ver": "widow",
    "eng": "Rope",
    "baseRowNum": 0,
    "widowRowNum": 17
    },
    {
    "name": "顱骨",
    "ver": "base",
    "eng": "Skull",
    "baseRowNum": 11,
    "widowRowNum": 18
    },
    {
    "name": "長矛",
    "ver": "base",
    "eng": "Spear",
    "baseRowNum": 12,
    "widowRowNum": 19
    },
    {
    "name": "靈魂板",
    "ver": "base",
    "eng": "Spirit Board",
    "baseRowNum": 13,
    "widowRowNum": 20
    },
    {
    "name": "藥瓶",
    "ver": "widow",
    "eng": "Vial",
    "baseRowNum": 0,
    "widowRowNum": 21
    }
]
};


var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1));
    var sURLVariables = sPageURL.split('&');
    var sParameterName;
    var i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

        //根據選取版本，載入對應房間
        function reloadHsltRoom() {
            var checkdVer = $('input[name=verSelect]:checked').val();

            $('#hsltRoom option').remove();
            $("#hsltRoom").append('<option value=0>選取房間</option>'); //0是未選取
            var roomArrayLen = cardData.roomArray.length;

            if (checkdVer === 'base') {
                for (var i = 0; i < roomArrayLen; i++) {
                    if ((cardData.roomArray[i].ver === 'base')) {
                        var selectText = cardData.roomArray[i].name + '_' + cardData.roomArray[i].eng;
                        var selectValue = cardData.roomArray[i].baseRowNum; //從1開始
                        $("#hsltRoom").append('<option value=' + selectValue + '>' + selectText + '</option>');
                    }
                }
            } else if (checkdVer === 'widow') {
                for (var i = 0; i < roomArrayLen; i++) {
                    if ((cardData.roomArray[i].ver === 'base')
                        || (cardData.roomArray[i].ver === 'widow')) {
                        var selectText = cardData.roomArray[i].name + '_' + cardData.roomArray[i].eng;
                        var selectValue = cardData.roomArray[i].widowRowNum;//從1開始
                        $("#hsltRoom").append('<option value=' + selectValue + '>' + selectText + '</option>');
                    }
                }
            }
        }

        //根據選取版本，載入對應物品
        function reloadHsltOmen() {
            var checkdVer = $('input[name=verSelect]:checked').val();

            $('#hsltOmen option').remove();
            $("#hsltOmen").append('<option value=0>選取預兆</option>'); //0是未選取
            var omenArrayLen = cardData.omenArray.length;

            if (checkdVer === 'base') {
                for (var i = 0; i < omenArrayLen; i++) {
                    if ((cardData.omenArray[i].ver === 'base')) {
                        var selectText = cardData.omenArray[i].name + '_' + cardData.omenArray[i].eng;
                        var selectValue = cardData.omenArray[i].baseRowNum; //從1開始
                        $("#hsltOmen").append('<option value=' + selectValue + '>' + selectText + '</option>');
                    }
                }
            } else if (checkdVer === 'widow') {
                for (var i = 0; i < omenArrayLen; i++) {
                    if ((cardData.omenArray[i].ver === 'base')
                        || (cardData.omenArray[i].ver === 'widow')) {
                        var selectText = cardData.omenArray[i].name + '_' + cardData.omenArray[i].eng;
                        var selectValue = cardData.omenArray[i].widowRowNum; //從1開始
                        $("#hsltOmen").append('<option value=' + selectValue + '>' + selectText + '</option>');
                    }
                }
            }
        }
  
                //放參數進網址，重新執行(點完QRCode還能回來)
                function setUrlPara() {
                    var checkdVer = $('input[name=verSelect]:checked').val();
                    var roomRowNum = $('#hsltRoom').val();
                    var omenRowNum = $('#hsltOmen').val();
        
                    var pathname = window.location.pathname; // Returns path only
                    var url = window.location.href;     // Returns full URL
        
                    window.location = pathname + '?v=' + checkdVer + '&r=' + roomRowNum + '&o=' + omenRowNum;
                }
        
                //尋找作祟劇本
                function findHaunt() {
                    var roomRowNum = $('#hsltRoom').val();
                    var omenRowNum = $('#hsltOmen').val();
        
                    if (roomRowNum - 0 == 0) {
                        $('#hauntNum').text('【房間】未選');
                        return;
                    }
                    if (omenRowNum - 0 == 0) {
                        $('#hauntNum').text('【預兆】未選');
                        return;
                    }
        
                    var checkdVer = $('input[name=verSelect]:checked').val();
                    var tableArray = (checkdVer === 'base') ? baseTable : widowTable;
        
                    var hauntNum = tableArray[roomRowNum - 1][omenRowNum - 1];
                    $('#hauntNum').text(hauntNum);
        
                    var simgurl = imgUrl(hauntNum, false);
                    var timgurl = imgUrl(hauntNum, true);
                    $('#imgSurvival').attr('src', simgurl);
                    $('#imgTraitor').attr('src', timgurl);
                    //
                    var saurl = aUrl(hauntNum, false, false);
                    var taurl = aUrl(hauntNum, true, false);
                    $('#aSurvival').attr('href', saurl);
                    $('#aTraitor').attr('href', taurl);
        
                    //顯示叛徒者
                    $('#spTraitor').text(traitorArray[hauntNum - 1]);
                    $('#spNote').text(equalJudge);
        
                    //ga事件
                    gtag('event', '作祟劇本', {
                          'send_to': 'UA-5007622-2',
                          'event_category': 'Outbound Link',
                          //eventAction: 'click',
                          'event_label': hauntNum
                        });
        
                }
          


       $(function () {
            console.log("ready!");

            reloadHsltRoom();
            reloadHsltOmen();

            $(document).delegate('input[name=verSelect]', "change", function () {
                reloadHsltRoom();
                reloadHsltOmen();
            });

            $(document).delegate('#btnHaunt', "click", function () {
                //findHaunt();
                setUrlPara();
            });

            //載入額外說明表
            $('#aBaseTable').attr('href', aUrl_meta(1));
            $('#aWidowTable').attr('href', aUrl_meta(2));
            $('#aBaseBalence').attr('href', aUrl_meta(3));


            //以下是有參數的狀況才會觸發
            var v = getUrlParameter('v'); //version
            var r = getUrlParameter('r'); //room
            var o = getUrlParameter('o'); //omen

            if ((v != undefined)
                && (r != undefined)
                && (o != undefined)) {
                if (v == 'base')
                    $('#radBase').prop('checked', true);
                else if (v == 'widow')
                    $('#radWidowExt').prop('checked', true);

                reloadHsltRoom();
                reloadHsltOmen();

                $('#hsltRoom').val(r);
                $('#hsltOmen').val(o);

                findHaunt();
            }
        });