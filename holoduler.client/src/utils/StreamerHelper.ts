import { Member } from "../types/member";

export class StreamerHelper {
    // アイコンURL
    static getImageUrl(name: string): string {
        return `/img/${StreamerHelper.members[name].img}`;
    }

    // チャンネルURL
    static getChannelUrl(name: string): string {
        return `https://www.youtube.com/${StreamerHelper.members[name].ch}`;
    }

    // サムネイルURL（HD画質固定）
    static getThumbnailUrl(video_id: string): string {
        return `http://img.youtube.com/vi/${video_id}/hqdefault.jpg`;
    }

    // 配信者定義
    static members: { [key: string]: Member } = {
        "HL0000": { name: "ホロライブ", img: "hololive.jpg", ch: "@hololive" },

        "HL0001": { name: "ときのそら", img: "tokino_sora.jpg", ch: "@TokinoSora"},
        "HL0002": { name: "ロボ子さん", img: "robokosan.jpg", ch: "@Robocosan" },
        "HL0003": { name: "さくらみこ", img: "sakura_miko.jpg", ch: "@SakuraMiko" },
        "HL0004": { name: "星街すいせい", img: "hoshimachi_suisei.jpg", ch: "@HoshimachiSuisei" },
        "HL0005": { name: "AZKi", img: "azki.jpg", ch: "@AZKi" },

        "HL0101": { name: "夜空メル", img: "yozora_mel.jpg", ch: "@YozoraMel" },
        "HL0102": { name: "アキ・ローゼンタール", img: "aki_rosenthal.jpg", ch: "@AkiRosenthal" },
        "HL0103": { name: "赤井はあと", img: "haachama.jpg", ch: "@AkaiHaato" },
        "HL0104": { name: "白上フブキ", img: "shirakami_fubuki.jpg", ch: "@ShirakamiFubuki" },
        "HL0105": { name: "夏色まつり", img: "natsuiro_matsuri.jpg", ch: "@NatsuiroMatsuri" },

        "HL0201": { name: "湊あくあ", img: "minato_aqua.jpg", ch: "@MinatoAqua" },
        "HL0202": { name: "紫咲シオン", img: "murasaki_shion.jpg", ch: "@MurasakiShion" },
        "HL0203": { name: "百鬼あやめ", img: "nakiri_ayame.jpg", ch: "@NakiriAyame" },
        "HL0204": { name: "癒月ちょこ", img: "yuzuki_choco.jpg", ch: "@YuzukiChoco" },
        "HL0205": { name: "大空スバル", img: "oozora_subaru.jpg", ch: "@OozoraSubaru" },

        "HL0G02": { name: "大神ミオ", img: "ookami_mio.jpg", ch: "@OokamiMio" },
        "HL0G03": { name: "猫又おかゆ", img: "nekomata_okayu.jpg", ch: "@NekomataOkayu" },
        "HL0G04": { name: "戌神ころね", img: "inugami_korone.jpg", ch: "@InugamiKorone" },

        "HL0301": { name: "兎田ぺこら", img: "usada_pekora.jpg", ch: "@usadapekora" },
        "HL0302": { name: "潤羽るしあ", img: "uruha_rushia.jpg", ch: "@hololive" },
        "HL0303": { name: "不知火フレア", img: "shiranui_flare.jpg", ch: "@ShiranuiFlare" },
        "HL0304": { name: "白銀ノエル", img: "shirogane_noel.jpg", ch: "@ShiroganeNoel" },
        "HL0305": { name: "宝鐘マリン", img: "housyou_marine.jpg", ch: "@HoushouMarine" },

        "HL0401": { name: "天音かなた", img: "amane_kanata.jpg", ch: "@AmaneKanata" },
        "HL0402": { name: "桐生ココ", img: "kiryu_coco.jpg", ch: "@KiryuCoco" },
        "HL0403": { name: "角巻わため", img: "tsunomaki_watame.jpg", ch: "@TsunomakiWatame" },
        "HL0404": { name: "常闇トワ", img: "tokoyami_towa.jpg", ch: "@TokoyamiTowa" },
        "HL0405": { name: "姫森ルーナ", img: "himemori_luna.jpg", ch: "@HimemoriLuna" },

        "HL0501": { name: "獅白ぼたん", img: "shishiro_botan.jpg", ch: "@ShishiroBotan" },
        "HL0502": { name: "雪花ラミィ", img: "yukihana_lamy.jpg", ch: "@YukihanaLamy" },
        "HL0503": { name: "尾丸ポルカ", img: "omaru_polka.jpg", ch: "@OmaruPolka" },
        "HL0504": { name: "桃鈴ねね", img: "momosuzu_nene.jpg", ch: "@MomosuzuNene" },
        "HL0505": { name: "魔乃アロエ", img: "mano_aloe.jpg", ch: "@hololive" },

        "HL0601": { name: "ラプラス・ダークネス", img: "laplus_darknesss.jpg", ch: "@LaplusDarknesss" },
        "HL0602": { name: "鷹嶺ルイ", img: "takane_lui.jpg", ch: "@TakaneLui" },
        "HL0603": { name: "博衣こより", img: "hakui_koyori.jpg", ch: "@HakuiKoyori" },
        "HL0604": { name: "沙花叉クロヱ", img: "sakamata_chloe.jpg", ch: "@SakamataChloe" },
        "HL0605": { name: "風真いろは", img: "kazama_iroha.jpg", ch: "@kazamairoha" },

        "HLDI00": { name: "hololive DEV_IS", img: "hololive_dev_is.jpg", ch: "@hololiveDEV_IS" },

        "HLDI01": { name: "火威青", img: "hiodoshi_ao.jpg", ch: "@HiodoshiAo" },
        "HLDI02": { name: "儒烏風亭らでん", img: "juufuutei_raden.jpg", ch: "@JuufuuteiRaden" },
        "HLDI03": { name: "音乃瀬奏", img: "otonose_kanade.jpg", ch: "@OtonoseKanade" },
        "HLDI04": { name: "一条莉々華", img: "ichijou_ririka.jpg", ch: "@IchijouRirika" },
        "HLDI05": { name: "轟はじめ", img: "todoroki_hajime.jpg", ch: "@TodorokiHajime" },

        "HLID00": { name: "hololive Indonesia", img: "hololive_id.jpg", ch: "@hololiveIndonesia" },

        "HLID01": { name: "Ayunda Risu", img: "ayunda_risu.jpg", ch: "@AyundaRisu" },
        "HLID02": { name: "Moona Hoshinova", img: "moona_hoshinova.jpg", ch: "@MoonaHoshinova" },
        "HLID03": { name: "Airani Iofifteen", img: "airani_iofifteen.jpg", ch: "@AiraniIofifteen" },

        "HLID04": { name: "Kureiji Ollie", img: "kureiji_ollie.jpg", ch: "@KureijiOllie" },
        "HLID05": { name: "Anya Melfissa", img: "anya_melfissa.jpg", ch: "@AnyaMelfissa" },
        "HLID06": { name: "Pavolia Reine", img: "pavolia_reine.jpg", ch: "@PavoliaReine" },

        "HLID07": { name: "Vestia Zeta", img: "vestia_zeta.jpg", ch: "@VestiaZeta" },
        "HLID08": { name: "Kaela Kovalskia", img: "kaela_kovalskia.jpg", ch: "@KaelaKovalskia" },
        "HLID09": { name: "Kobo Kanaeru", img: "kobo_kanaeru.jpg", ch: "@KoboKanaeru" },

        "HLEN00": { name: "hololive English", img: "hololive_en.jpg", ch: "@hololiveEnglish" },

        "HLEN01": { name: "Mori Calliope", img: "mori_calliope.jpg", ch: "@MoriCalliope" },
        "HLEN02": { name: "Takanashi Kiara", img: "takanashi_kiara.jpg", ch: "@TakanashiKiara" },
        "HLEN03": { name: "Ninomae Ina'nis", img: "ninomae_ina'nis.jpg", ch: "@NinomaeInanis" },
        "HLEN04": { name: "Gawr Gura", img: "gawr_gura.jpg", ch: "@GawrGura" },
        "HLEN05": { name: "Watson Amelia", img: "watson_amelia.jpg", ch: "@WatsonAmelia" },

        "HLEN06": { name: "IRyS", img: "irys.jpg", ch: "@IRyS" },

        "HLEN07": { name: "Ceres Fauna", img: "ceres_fauna.jpg", ch: "@CeresFauna" },
        "HLEN08": { name: "Ouro Kronii", img: "ouro_kronii.jpg", ch: "@OuroKronii" },
        "HLEN09": { name: "Nanashi Mumei", img: "nanashi_mumei.jpg", ch: "@NanashiMumei" },
        "HLEN10": { name: "Hakos Baelz", img: "hakos_baelz.jpg", ch: "@HakosBaelz" },
        "HLEN11": { name: "Tsukumo Sana", img: "tsukumo_sana.jpg", ch: "@TsukumoSana" },

        "HLEN12": { name: "Shiori Novella", img: "shiori_novella.jpg", ch: "@ShioriNovella" },
        "HLEN13": { name: "Koseki Bijou", img: "koseki_bijou.jpg", ch: "@KosekiBijou" },
        "HLEN14": { name: "Nerissa Ravencroft", img: "nerissa_ravencroft.jpg", ch: "@NerissaRavencroft" },
        "HLEN15": { name: "FUWAMOCO", img: "fuwamoco.jpg", ch: "@FUWAMOCOch" },

        "HLEN16": { name: "Elizabeth Rose Bloodflame", img: "elizabeth_rose_bloodflame.jpg", ch: "@holoen_erbloodflame" },
        "HLEN17": { name: "Gigi Murin", img: "gigi_murin.jpg", ch: "@holoen_gigimurin" },
        "HLEN18": { name: "Cecilia Immergreen", img: "cecilia_immergreen.jpg", ch: "@holoen_ceciliaimmergreen" },
        "HLEN19": { name: "Raora Panthera", img: "raora_panthera.jpg", ch: "@holoen_raorapanthera" },
    };
}
