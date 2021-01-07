//const urls = require("./error.json")
const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');

const urls = [
  "https://www.herold.at/gelbe-seiten/zell-am-see/6sgb3/rotes-kreuz-%C3%B6sterr-bezirksstelle-zell-am-see-pinzgau/",
  "https://www.herold.at/gelbe-seiten/eisenstadt/FQTTb/rotes-kreuz-bezirksstelle-eisenstadt/",
  "https://www.herold.at/gelbe-seiten/eisenstadt/tMhww/rotes-kreuz-landesverband-burgenland/",
  "https://www.herold.at/gelbe-seiten/purkersdorf/v9c1X/rotes-kreuz-%C3%B6sterreich-bezirksstelle-purkersdorf-gablitz/",
  "https://www.herold.at/gelbe-seiten/hainburg-an-der-donau/JKv83/rotes-kreuz-n%C3%B6-bezirksstelle-hainburg/",
  "https://www.herold.at/gelbe-seiten/mattersburg/dLPrm/rotes-kreuz-bezirksstelle-mattersburg/",
  "https://www.herold.at/gelbe-seiten/g%C3%BCssing/DhqbZ/rotes-kreuz-bezirksstelle-g%C3%BCssing/",
  "https://www.herold.at/gelbe-seiten/jennersdorf/fnjfp/rotes-kreuz-bezirksstelle-jennersdorf/",
  "https://www.herold.at/gelbe-seiten/neusiedl-am-see/cclxl/rotes-kreuz-bezirksstelle-neusiedl-a-see/",
  "https://www.herold.at/gelbe-seiten/oberwart/WFrZd/rotes-kreuz-bezirksstelle-oberwart/",
  "https://www.herold.at/gelbe-seiten/oberpullendorf/ZQpGh/rotes-kreuz-bezirksstelle-oberpullendorf/",
  "https://www.herold.at/gelbe-seiten/innsbruck/nR6Jc/rotes-kreuz-innsbruck-hausnotruf-tirol/",
  "https://www.herold.at/gelbe-seiten/mattersburg/ppHCP/rotes-kreuz-mobile-pflege-und-betreuung-eisenstadt/",
  "https://www.herold.at/gelbe-seiten/retz/1mNln/rotes-kreuz-n%C3%B6-bezirksstelle-retz/",
  "https://www.herold.at/gelbe-seiten/amstetten/SL524/rotes-kreuz-%C3%B6sterreich-bezirksstelle-amstetten/",
  "https://www.herold.at/gelbe-seiten/stegersbach/9rgjM/rotes-kreuz-mobile-pflege-u-betreuung/",
  "https://www.herold.at/gelbe-seiten/illmitz/4m7Pw/rotes-kreuz-mobile-pflege-u-betreuung/",
  "https://www.herold.at/gelbe-seiten/jennersdorf/tRL8B/rotes-kreuz-mobile-pflege-und-betreuung-jennersdorf/",
  "https://www.herold.at/gelbe-seiten/kohfidisch/rGb1W/rotes-kreuz-mobile-pflege-und-betreuung-kohfidisch/",
  "https://www.herold.at/gelbe-seiten/rudersdorf/69N9X/rotes-kreuz-mobile-pflege-und-betreuung-rudersdorf/",
  "https://www.herold.at/gelbe-seiten/gattendorf/V1V1n/rotes-kreuz-mobile-pflege-und-betreuung/",
  "https://www.herold.at/gelbe-seiten/neutal/2b9jv/rotes-kreuz-mobile-pflege-u-betreuung/",
  "https://www.herold.at/gelbe-seiten/schwaz/l9Vmh/rotes-kreuz-%C3%B6sterr-bezirksstelle-schwaz/",
  "https://www.herold.at/gelbe-seiten/schwechat/bskvW/rotes-kreuz-%C3%B6sterreich-bezirksstelle-schwechat/",
  "https://www.herold.at/gelbe-seiten/herzogenburg/K4Z36/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-herzogenburg/",
  "https://www.herold.at/gelbe-seiten/hall-in-tirol/l93Pp/rotes-kreuz-%C3%B6sterr-bezirksstelle-hall-in-tirol/",
  "https://www.herold.at/gelbe-seiten/melk/1mt9S/%C3%B6sterr-rotes-kreuz-bezirksstelle-melk/",
  "https://www.herold.at/gelbe-seiten/abtenau/vt8Bg/rotes-kreuz-%C3%B6sterr-bezirksstelle-lammertal/",
  "https://www.herold.at/gelbe-seiten/wien/4fSD3/campus-rudolfinerhaus/",
  "https://www.herold.at/gelbe-seiten/imst/RcfbS/rotes-kreuz-%C3%B6sterr-bezirksstelle-imst/",
  "https://www.herold.at/gelbe-seiten/berndorf/WFTf3/%C3%B6sterreichisches-rotes-kreuz-landesverband-nieder%C3%B6sterreich-bezirksstelle-triestingtal/",
  "https://www.herold.at/gelbe-seiten/zams/MFlCL/rotes-kreuz-%C3%B6sterr-bezirksstelle-landeck-rettungsdienst-krankentransport/",
  "https://www.herold.at/gelbe-seiten/sankt-johann-im-pongau/Mz8mj/rotes-kreuz-%C3%B6sterr-bezirksstelle-stjohann-im-pongau/",
  "https://www.herold.at/gelbe-seiten/salzburg/Krmxl/%C3%B6sterreichisches-rotes-kreuz-haus-des-roten-kreuzes/",
  "https://www.herold.at/gelbe-seiten/innsbruck/3F3sC/%C3%B6sterreichisches-rotes-kreuz-freiwillige-rettung-innsbruck/",
  "https://www.herold.at/gelbe-seiten/wattens/MFMVQ/rotes-kreuz-%C3%B6sterr-ortsstelle-wattens/",
  "https://www.herold.at/gelbe-seiten/hollabrunn/LVrqD/rotes-kreuz-%C3%B6sterreich-bezirksstelle-hollabrunn/",
  "https://www.herold.at/gelbe-seiten/linz/Rcf9p/rotes-kreuz-%C3%B6sterreich-bezirksstelle-linz-land/",
  "https://www.herold.at/gelbe-seiten/marchtrenk/Nj3dB/rotes-kreuz-%C3%B6sterreich-ortsstelle-marchtrenk/",
  "https://www.herold.at/gelbe-seiten/perchtoldsdorf/gWbLG/rotes-kreuz-%C3%B6sterreich-rettungsstelle-perchtoldsdorf/",
  "https://www.herold.at/gelbe-seiten/linz/tQd3Q/rotes-kreuz-%C3%B6sterreichisches-landesverband-ober%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/krems-an-der-donau/NvK6S/arge-rotes-kreuz-swietelsky-schubrig/",
  "https://www.herold.at/gelbe-seiten/hirschegg/Nj7Ct/bayerisches-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/linz/BVw1R/geh%C3%B6rlosennotruf-rotes-kreuz-%C3%B6sterreichisches-landesverband-ober%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/melk/bsc7S/henryladen/",
  "https://www.herold.at/gelbe-seiten/innsbruck/3FwNK/kindertageszentrum-seifenblase-%C3%B6esterreichisches-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/lustenau/JLNkV/mobile-haushilfe-d-gemeinde-lustenau/",
  "https://www.herold.at/gelbe-seiten/graz/95VP6/%C3%B6sterr-jugendrotkreuz-landesleitung-stmk/",
  "https://www.herold.at/gelbe-seiten/dornbirn/gXcsB/%C3%B6sterr-rotes-kreuz-landesverband-vorarlberg-rettungsabteilung/",
  "https://www.herold.at/gelbe-seiten/bregenz/3Gwv7/%C3%B6sterr-rotes-kreuz-landesverband-vorarlberg-rettungsabteilung/",
  "https://www.herold.at/gelbe-seiten/tamsweg/BVw6f/%C3%B6sterr-rotes-kreuz-bezirksstelle-lungau/",
  "https://www.herold.at/gelbe-seiten/gamlitz/X1xTt/%C3%B6sterreichisches-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/steinach-am-brenner/hzjrT/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-innsbruck-land--ortsstelle-wipptal/",
  "https://www.herold.at/gelbe-seiten/graz/PQQJD/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-graz-stadt/",
  "https://www.herold.at/gelbe-seiten/sch%C3%B6nberg-im-stubaital/kR2fW/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-innsbruck-land/",
  "https://www.herold.at/gelbe-seiten/telfs/MzP6M/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-telfs/",
  "https://www.herold.at/gelbe-seiten/wien/tR83n/%C3%B6sterreichisches-rotes-kreuz-blutspendezentrale-f%C3%BCr-wien-n%C3%B6-und-bgld/",
  "https://www.herold.at/gelbe-seiten/wien/FPfR8/%C3%B6sterreichisches-rotes-kreuz-generalsekretariat/",
  "https://www.herold.at/gelbe-seiten/korneuburg/Mz9dL/%C3%B6sterreichisches-rotes-kreuz-landesverband-f-nieder%C3%B6sterreich-bezirksstelle-korneuburg/",
  "https://www.herold.at/gelbe-seiten/ernstbrunn/md8N1/%C3%B6sterreichisches-rotes-kreuz-landesverband-f-nieder%C3%B6sterreich-ortsstelle-ernstbrunn/",
  "https://www.herold.at/gelbe-seiten/klagenfurt-am-w%C3%B6rthersee/VTbbq/%C3%B6sterreichisches-rotes-kreuz-landesverband-k%C3%A4rnten/",
  "https://www.herold.at/gelbe-seiten/stockerau/GscM9/%C3%B6sterreichisches-rotes-kreuz-ortsstelle-stockerau/",
  "https://www.herold.at/gelbe-seiten/egg/qWmLZ/%C3%B6sterreichisches-rotes-kreuz-egg/",
  "https://www.herold.at/gelbe-seiten/feldkirchen-in-k%C3%A4rnten/b9TFP/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-feldkirchen/",
  "https://www.herold.at/gelbe-seiten/hermagor-pressegger-see/MwjMD/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-hermagor/",
  "https://www.herold.at/gelbe-seiten/klagenfurt-am-w%C3%B6rthersee/CFXrf/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-klagenfurt/",
  "https://www.herold.at/gelbe-seiten/sankt-veit-an-der-glan/hzhQF/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-st-veit-a-d-glan/",
  "https://www.herold.at/gelbe-seiten/spittal-an-der-drau/ltJ2K/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-spittal-drau/",
  "https://www.herold.at/gelbe-seiten/villach/JJRdH/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-villach/",
  "https://www.herold.at/gelbe-seiten/v%C3%B6lkermarkt/3wrK5/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-v%C3%B6lkermarkt/",
  "https://www.herold.at/gelbe-seiten/wolfsberg/kR1DM/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-bezirksstelle-wolfsberg/",
  "https://www.herold.at/gelbe-seiten/klagenfurt-am-w%C3%B6rthersee/7cJMS/%C3%B6sterreichisches-rotes-kreuz-k%C3%A4rnten-blutspendezentrale/",
  "https://www.herold.at/gelbe-seiten/tulln-an-der-donau/JLJc3/%C3%B6sterreichisches-rotes-kreuz-landesverband-nieder%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/sankt-gilgen/MLfd5/%C3%B6sterreichisches-rotes-kreuz-landesverband-salzburg/",
  "https://www.herold.at/gelbe-seiten/graz/GrD7c/%C3%B6sterreichisches-rotes-kreuz-landesverband-steiermark/",
  "https://www.herold.at/gelbe-seiten/liezen/Q7xLR/%C3%B6sterreichisches-rotes-kreuz-landesverband-steiermark-bezirksstelle-liezen/",
  "https://www.herold.at/gelbe-seiten/tulln-an-der-donau/KnCdg/%C3%B6sterreichisches-rotes-kreuz-lv-nieder%C3%B6sterreich-interhospitaltransfer/",
  "https://www.herold.at/gelbe-seiten/leutschach-an-der-weinstra%C3%9Fe/JL6zZ/%C3%B6sterreichisches-rotes-kreuz-rettungsstelle-leutschach/",
  "https://www.herold.at/gelbe-seiten/wilhering/WJLh2/%C3%B6sterreichisches-rotes-kreuz-wilhering/",
  "https://www.herold.at/gelbe-seiten/kufstein/cXzJD/%C3%B6sterreichisches-rotes-kreuz-bezirksstelle-kufstein/",
  "https://www.herold.at/gelbe-seiten/attnang-puchheim/Tth1C/%C3%B6sterreichisches-rotes-kreuz-landesverband-ober%C3%B6sterreich-puchheim/",
  "https://www.herold.at/gelbe-seiten/bruck-an-der-mur/HpWXJ/%C3%B6sterreichisches-rotes-kreuz-landesverband-steiermark-bezirksstelle-bruck-m%C3%BCrzzuschlag/",
  "https://www.herold.at/gelbe-seiten/rum/hwD2k/%C3%B6sterreichisches-rotes-kreuz-landesverband-tirol/",
  "https://www.herold.at/gelbe-seiten/buch/fHLPR/%C3%B6sterreichisches-rotes-kreuz-landesverband-vorarlberg-ortsstelle-buch/",
  "https://www.herold.at/gelbe-seiten/deutsch-brodersdorf/hHZnx/%C3%B6sterreichisches-rotes-kreuz-landesverband-n%C3%B6-bezirksst-landegg/",
  "https://www.herold.at/gelbe-seiten/stra%C3%9Fwalchen/QvQ5J/rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/oberndorf-bei-salzburg/7dqpz/rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/wolfurt/cfDtV/rotes-kreuz--ortsstelle-wolfurt--gemeindeamt-wolfurt/",
  "https://www.herold.at/gelbe-seiten/bad-waltersdorf/JMfcD/rotes-kreuz-hauskrankenpflege/",
  "https://www.herold.at/gelbe-seiten/andelsbuch/MHGCJ/rotes-kreuz-ortsstelle-andelsbuch/",
  "https://www.herold.at/gelbe-seiten/oberwart/hJ4DT/rotes-kreuz-schulungszentrum-s%C3%BCd/",
  "https://www.herold.at/gelbe-seiten/straden/Gx9lb/rotes-kreuz-au%C3%9Fenstelle-straden/",
  "https://www.herold.at/gelbe-seiten/rohrbach-berg/vtSwm/rotes-kreuz-bezirksstelle-und-ortsstelle-rohrbach/",
  "https://www.herold.at/gelbe-seiten/bludenz/VWQ9V/rotes-kreuz-bludenz/",
  "https://www.herold.at/gelbe-seiten/hard/9mNkB/rotes-kreuz-hard/",
  "https://www.herold.at/gelbe-seiten/stra%C3%9F-in-steiermark/PQt73/rotes-kreuz-hauskrankenpflege-%C3%B6rk/",
  "https://www.herold.at/gelbe-seiten/feldkirch/RZxVf/rotes-kreuz-landesverband-vorarlberg/",
  "https://www.herold.at/gelbe-seiten/rankweil/2XGk9/rotes-kreuz-landesverband-vorarlberg/",
  "https://www.herold.at/gelbe-seiten/lustenau/j111n/rotes-kreuz-lustenau/",
  "https://www.herold.at/gelbe-seiten/pischelsdorf-am-kulm/ZQqDw/rotes-kreuz-%C3%B6sterr-ortsstelle-pischelsdorf/",
  "https://www.herold.at/gelbe-seiten/imst/HcThv/rotes-kreuz-%C3%B6sterr-bezirks--u-ortsstelle-imst/",
  "https://www.herold.at/gelbe-seiten/bad-hofgastein/G9BZK/rotes-kreuz-%C3%B6sterr-bezirksstelle/",
  "https://www.herold.at/gelbe-seiten/bruck-an-der-mur/ltHnv/rotes-kreuz-%C3%B6sterr-bezirksstelle-bruck-a-d-mur-kapfenberg/",
  "https://www.herold.at/gelbe-seiten/feldbach/4hbqs/rotes-kreuz-%C3%B6sterr-bezirksstelle-feldbach/",
  "https://www.herold.at/gelbe-seiten/f%C3%BCrstenfeld/WzPzL/rotes-kreuz-%C3%B6sterr-bezirksstelle-f%C3%BCrstenfeld/",
  "https://www.herold.at/gelbe-seiten/judenburg/hzhF5/rotes-kreuz-%C3%B6sterr-bezirksstelle-judenburg/",
  "https://www.herold.at/gelbe-seiten/kapfenberg/Dhkgt/rotes-kreuz-%C3%B6sterr-bezirksstelle-kapfenberg/",
  "https://www.herold.at/gelbe-seiten/kitzb%C3%BChel/K4nTx/rotes-kreuz-%C3%B6sterr-bezirksstelle-kitzb%C3%BChel/",
  "https://www.herold.at/gelbe-seiten/leoben/pmHwf/rotes-kreuz-%C3%B6sterr-bezirksstelle-leoben/",
  "https://www.herold.at/gelbe-seiten/m%C3%BCrzzuschlag/Wzl9b/rotes-kreuz-%C3%B6sterr-bezirksstelle-m%C3%BCrzzuschlag/",
  "https://www.herold.at/gelbe-seiten/radstadt/K4n9Z/rotes-kreuz-%C3%B6sterr-bezirksstelle-radstadt/",
  "https://www.herold.at/gelbe-seiten/reutte/VWGBs/rotes-kreuz-%C3%B6sterr-bezirksstelle-reutte/",
  "https://www.herold.at/gelbe-seiten/hallein/LW5xM/rotes-kreuz-%C3%B6sterr-bezirksstelle-tennengau/",
  "https://www.herold.at/gelbe-seiten/lienz/2VL1Q/rotes-kreuz-%C3%B6sterr-bezirkstelle-osttirol/",
  "https://www.herold.at/gelbe-seiten/p%C3%B6llau/69DD4/rotes-kreuz-%C3%B6sterr-hauskrankenpflege-p%C3%B6llau/",
  "https://www.herold.at/gelbe-seiten/salzburg/4fwJc/rotes-kreuz-%C3%B6sterr-landesverband-salzburg/",
  "https://www.herold.at/gelbe-seiten/blindenmarkt/4hhNq/rotes-kreuz-%C3%B6sterr-ortsstelle-blindenmarkt/",
  "https://www.herold.at/gelbe-seiten/breitenau-am-hochlantsch/13thx/rotes-kreuz-%C3%B6sterr-ortsstelle-breitenau/",
  "https://www.herold.at/gelbe-seiten/burgau/b9T31/rotes-kreuz-%C3%B6sterr-ortsstelle-burgau/",
  "https://www.herold.at/gelbe-seiten/elbigenalp/WFv5t/rotes-kreuz-%C3%B6sterr-ortsstelle-elbigenalp/",
  "https://www.herold.at/gelbe-seiten/fehring/SLGqV/rotes-kreuz-%C3%B6sterr-ortsstelle-fehring/",
  "https://www.herold.at/gelbe-seiten/gnas/gWNQ7/rotes-kreuz-%C3%B6sterr-ortsstelle-gnas/",
  "https://www.herold.at/gelbe-seiten/golling-an-der-salzach/Nj3fX/rotes-kreuz-%C3%B6sterr-ortsstelle-golling/",
  "https://www.herold.at/gelbe-seiten/hof-bei-salzburg/f56vw/rotes-kreuz-%C3%B6sterr-ortsstelle-hof-bei-salzburg/",
  "https://www.herold.at/gelbe-seiten/ilz/K3X9X/rotes-kreuz-%C3%B6sterr-ortsstelle-ilz/",
  "https://www.herold.at/gelbe-seiten/kindberg/ltHv5/rotes-kreuz-%C3%B6sterr-ortsstelle-kindberg/",
  "https://www.herold.at/gelbe-seiten/kirchbach-zerlach/5PjvT/rotes-kreuz-%C3%B6sterr-ortsstelle-kirchbach/",
  "https://www.herold.at/gelbe-seiten/kirchberg-an-der-raab/f55d5/rotes-kreuz-%C3%B6sterr-ortsstelle-kirchberg-a-d-raab/",
  "https://www.herold.at/gelbe-seiten/krieglach/p5FcG/rotes-kreuz-%C3%B6sterr-ortsstelle-krieglach/",
  "https://www.herold.at/gelbe-seiten/matrei-in-osttirol/ppC9f/rotes-kreuz-%C3%B6sterr-ortsstelle-matrei/",
  "https://www.herold.at/gelbe-seiten/mattsee/VVvTX/rotes-kreuz-%C3%B6sterr-ortsstelle-mattsee/",
  "https://www.herold.at/gelbe-seiten/mauterndorf/9nHCb/rotes-kreuz-%C3%B6sterr-ortsstelle-mauterndorf/",
  "https://www.herold.at/gelbe-seiten/sankt-jakob-in-defereggen/vB6Xw/rotes-kreuz-%C3%B6sterr-ortsstelle-st-jakob/",
  "https://www.herold.at/gelbe-seiten/sankt-marein-im-m%C3%BCrztal/rzr7l/rotes-kreuz-%C3%B6sterr-ortsstelle-st-marein/",
  "https://www.herold.at/gelbe-seiten/sankt-michael-in-obersteiermark/f4bcs/rotes-kreuz-%C3%B6sterr-ortsstelle-st-michael/",
  "https://www.herold.at/gelbe-seiten/sankt-stefan-im-rosental/dLQk4/rotes-kreuz-%C3%B6sterr-ortsstelle-st-stefan-im-rosental/",
  "https://www.herold.at/gelbe-seiten/sillian/sjnlt/rotes-kreuz-%C3%B6sterr-ortsstelle-sillian/",
  "https://www.herold.at/gelbe-seiten/stra%C3%9Fwalchen/ccp7p/rotes-kreuz-%C3%B6sterr-ortsstelle-stra%C3%9Fwalchen/",
  "https://www.herold.at/gelbe-seiten/strobl/rFfKk/rotes-kreuz-%C3%B6sterr-ortsstelle-strobl/",
  "https://www.herold.at/gelbe-seiten/tannheim/SLJTp/rotes-kreuz-%C3%B6sterr-ortsstelle-tannheimertal/",
  "https://www.herold.at/gelbe-seiten/th%C3%B6rl/WFsRq/rotes-kreuz-%C3%B6sterr-ortsstelle-th%C3%B6rl/",
  "https://www.herold.at/gelbe-seiten/trofaiach/qVtn2/rotes-kreuz-%C3%B6sterr-ortsstelle-trofaiach/",
  "https://www.herold.at/gelbe-seiten/turnau/WzWLt/rotes-kreuz-%C3%B6sterr-ortsstelle-turnau/",
  "https://www.herold.at/gelbe-seiten/frauenkirchen/s1Dtb/rotes-kreuz-%C3%B6sterr-rettungsstelle-frauenkirchen/",
  "https://www.herold.at/gelbe-seiten/hollenstein-an-der-ybbs/jjKx3/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/lamprechtshausen/Kpxsh/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/seekirchen-am-wallersee/3zstH/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/stainz/XjBDd/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/p%C3%B6llau/slsRd/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/neudau/vDBFl/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/oberwaltersdorf/41b7N/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/feldkirch/QBRv9/rotes-kreuz-%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/ybbs-an-der-donau/Mz9fd/rotes-kreuz-%C3%B6sterreich-landesverband-f-n%C3%B6-bezirksstelle-ybbs-a-d-donau/",
  "https://www.herold.at/gelbe-seiten/wals-siezenheim/VVvgf/rotes-kreuz-%C3%B6sterreich-zuhause-essen/",
  "https://www.herold.at/gelbe-seiten/arbesbach/14CxK/rotes-kreuz-%C3%B6sterreich-arbesbach/",
  "https://www.herold.at/gelbe-seiten/allentsteig/LVqV9/rotes-kreuz-%C3%B6sterreich-bezirksstelle-allentsteig/",
  "https://www.herold.at/gelbe-seiten/aspang-markt/TnMpB/rotes-kreuz-%C3%B6sterreich-bezirksstelle-aspang/",
  "https://www.herold.at/gelbe-seiten/atzenbrugg/CxT4X/rotes-kreuz-%C3%B6sterreich-bezirksstelle-atzenbrugg/",
  "https://www.herold.at/gelbe-seiten/bad-radkersburg/hzhK1/rotes-kreuz-%C3%B6sterreich-bezirksstelle-bad-radkersburg/",
  "https://www.herold.at/gelbe-seiten/bad-v%C3%B6slau/8KjX6/rotes-kreuz-%C3%B6sterreich-bezirksstelle-bad-v%C3%B6slau/",
  "https://www.herold.at/gelbe-seiten/baden/XhzPQ/rotes-kreuz-%C3%B6sterreich-bezirksstelle-baden/",
  "https://www.herold.at/gelbe-seiten/braunau-am-inn/3FPzm/rotes-kreuz-%C3%B6sterreich-bezirksstelle-braunau/",
  "https://www.herold.at/gelbe-seiten/bruck-an-der-leitha/b9HCX/rotes-kreuz-%C3%B6sterreich-bezirksstelle-bruck-an-der-leitha/",
  "https://www.herold.at/gelbe-seiten/brunn-am-gebirge/dLDtk/rotes-kreuz-%C3%B6sterreich-bezirksstelle-brunn-am-gebirge/",
  "https://www.herold.at/gelbe-seiten/deutschlandsberg/13z3p/rotes-kreuz-%C3%B6sterreich-bezirksstelle-deutschlandsberg/",
  "https://www.herold.at/gelbe-seiten/ebenfurth/f4snn/rotes-kreuz-%C3%B6sterreich-bezirksstelle-ebenfurth/",
  "https://www.herold.at/gelbe-seiten/eisenerz/fnd8C/rotes-kreuz-%C3%B6sterreich-bezirksstelle-eisenerz/",
  "https://www.herold.at/gelbe-seiten/g%C3%A4nserndorf/fnWhr/rotes-kreuz-%C3%B6sterreich-bezirksstelle-g%C3%A4nserndorf/",
  "https://www.herold.at/gelbe-seiten/gloggnitz/jhcr6/rotes-kreuz-%C3%B6sterreich-bezirksstelle-gloggnitz/",
  "https://www.herold.at/gelbe-seiten/gm%C3%BCnd/7bt2p/rotes-kreuz-%C3%B6sterreich-bezirksstelle-gm%C3%BCnd/",
  "https://www.herold.at/gelbe-seiten/gmunden/vsrwc/rotes-kreuz-%C3%B6sterreich-bezirksstelle-gmunden/",
  "https://www.herold.at/gelbe-seiten/g%C3%B6tzendorf-an-der-leitha/gWBbv/rotes-kreuz-%C3%B6sterreich-bezirksstelle-g%C3%B6tzendorf/",
  "https://www.herold.at/gelbe-seiten/gro%C3%9Fweikersdorf/GscKv/rotes-kreuz-%C3%B6sterreich-bezirksstelle-gr-weikersdorf/",
  "https://www.herold.at/gelbe-seiten/seiersberg-pirka/LVR8n/rotes-kreuz-%C3%B6sterreich-bezirksstelle-graz-umgebung/",
  "https://www.herold.at/gelbe-seiten/grieskirchen/2V8jj/rotes-kreuz-%C3%B6sterreich-bezirksstelle-grieskirchen/",
  "https://www.herold.at/gelbe-seiten/gro%C3%9F-enzersdorf/Dhfdk/rotes-kreuz-%C3%B6sterreich-bezirksstelle-gro%C3%9F-enzersdorf/",
  "https://www.herold.at/gelbe-seiten/haag/HcGDz/rotes-kreuz-%C3%B6sterreich-bezirksstelle-haag/",
  "https://www.herold.at/gelbe-seiten/hainfeld/p4X8x/rotes-kreuz-%C3%B6sterreich-bezirksstelle-hainfeld/",
  "https://www.herold.at/gelbe-seiten/hartberg/CzCZT/rotes-kreuz-%C3%B6sterreich-bezirksstelle-hartberg/",
  "https://www.herold.at/gelbe-seiten/horn/gVpg4/rotes-kreuz-%C3%B6sterreich-bezirksstelle-horn/",
  "https://www.herold.at/gelbe-seiten/kirchdorf-an-der-krems/b8t5D/rotes-kreuz-%C3%B6sterreich-bezirksstelle-kirchdorf-an-der-krems/",
  "https://www.herold.at/gelbe-seiten/kirchschlag-in-der-buckligen-welt/fp7gx/rotes-kreuz-%C3%B6sterreich-bezirksstelle-kirchschlag/",
  "https://www.herold.at/gelbe-seiten/klosterneuburg/MFVkH/rotes-kreuz-%C3%B6sterreich-bezirksstelle-klosterneuburg/",
  "https://www.herold.at/gelbe-seiten/knittelfeld/gWNRR/rotes-kreuz-%C3%B6sterreich-bezirksstelle-knittelfeld/",
  "https://www.herold.at/gelbe-seiten/krems-an-der-donau/NhpWP/rotes-kreuz-%C3%B6sterreich-bezirksstelle-krems/",
  "https://www.herold.at/gelbe-seiten/laa-an-der-thaya/PQSQS/rotes-kreuz-%C3%B6sterreich-bezirksstelle-laa-a-d-thaya/",
  "https://www.herold.at/gelbe-seiten/landegg/Q97KW/rotes-kreuz-%C3%B6sterreich-bezirksstelle-landegg/",
  "https://www.herold.at/gelbe-seiten/langenlois/K4Ws2/rotes-kreuz-%C3%B6sterreich-bezirksstelle-langenlois/",
  "https://www.herold.at/gelbe-seiten/wagna/b9T4F/rotes-kreuz-%C3%B6sterreich-bezirksstelle-leibnitz/",
  "https://www.herold.at/gelbe-seiten/lilienfeld/rzD1s/rotes-kreuz-%C3%B6sterreich-bezirksstelle-lilienfeld/",
  "https://www.herold.at/gelbe-seiten/linz/vD4ZG/rotes-kreuz-%C3%B6sterreich-bezirksstelle-linz-stadt/",
  "https://www.herold.at/gelbe-seiten/litschau/RcQ7f/rotes-kreuz-%C3%B6sterreich-bezirksstelle-litschau/",
  "https://www.herold.at/gelbe-seiten/marchegg/14FGP/rotes-kreuz-%C3%B6sterreich-bezirksstelle-marchegg/",
  "https://www.herold.at/gelbe-seiten/mariazell/MFjdb/rotes-kreuz-%C3%B6sterreich-bezirksstelle-mariazell/",
  "https://www.herold.at/gelbe-seiten/mistelbach/lsZKq/rotes-kreuz-%C3%B6sterreich-bezirksstelle-mistelbach-a-d-zaya/",
  "https://www.herold.at/gelbe-seiten/m%C3%B6dling/DhP1q/rotes-kreuz-%C3%B6sterreich-bezirksstelle-m%C3%B6dling/",
  "https://www.herold.at/gelbe-seiten/murau/5QLXv/rotes-kreuz-%C3%B6sterreich-bezirksstelle-murau/",
  "https://www.herold.at/gelbe-seiten/neunkirchen/KmhSR/rotes-kreuz-%C3%B6sterreich-bezirksstelle-neunkirchen/",
  "https://www.herold.at/gelbe-seiten/p%C3%B6ggstall/sjJCQ/rotes-kreuz-%C3%B6sterreich-bezirksstelle-p%C3%B6ggstall/",
  "https://www.herold.at/gelbe-seiten/ried-im-innkreis/f4TgJ/rotes-kreuz-%C3%B6sterreich-bezirksstelle-ried/",
  "https://www.herold.at/gelbe-seiten/sankt-aegyd-am-neuwalde/T4jwQ/rotes-kreuz-%C3%B6sterreich-bezirksstelle-st-aegyd/",
  "https://www.herold.at/gelbe-seiten/sankt-peter-in-der-au/hz6ss/rotes-kreuz-%C3%B6sterreich-bezirksstelle-st-peter-i-d-au/",
  "https://www.herold.at/gelbe-seiten/sankt-p%C3%B6lten/f4QMz/rotes-kreuz-%C3%B6sterreich-bezirksstelle-st-p%C3%B6lten/",
  "https://www.herold.at/gelbe-seiten/sankt-valentin/ZQdKn/rotes-kreuz-%C3%B6sterreich-bezirksstelle-st-valentin/",
  "https://www.herold.at/gelbe-seiten/scheibbs/b9HDr/rotes-kreuz-%C3%B6sterreich-bezirksstelle-scheibbs/",
  "https://www.herold.at/gelbe-seiten/wieselburg/Kqzzj/rotes-kreuz-%C3%B6sterreich-bezirksstelle-scheibbs--dienststelle-wieselburg/",
  "https://www.herold.at/gelbe-seiten/gaming/BVtbK/rotes-kreuz-%C3%B6sterreich-bezirksstelle-scheibbs-dienststelle-gaming/",
  "https://www.herold.at/gelbe-seiten/steinakirchen-am-forst/18Qf6/rotes-kreuz-%C3%B6sterreich-bezirksstelle-scheibbs-dienststelle-steinakirchen/",
  "https://www.herold.at/gelbe-seiten/sollenau/BTxxc/rotes-kreuz-%C3%B6sterreich-bezirksstelle-sollenau-felixdorf/",
  "https://www.herold.at/gelbe-seiten/steyr/3FQ3N/rotes-kreuz-%C3%B6sterreich-bezirksstelle-steyr-land/",
  "https://www.herold.at/gelbe-seiten/steyr/MF7D4/rotes-kreuz-%C3%B6sterreich-bezirksstelle-steyr-stadt/",
  "https://www.herold.at/gelbe-seiten/tulln-an-der-donau/QsXNb/rotes-kreuz-%C3%B6sterreich-bezirksstelle-tulln/",
  "https://www.herold.at/gelbe-seiten/eferding/ZQV2G/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-eferding/",
  "https://www.herold.at/gelbe-seiten/freistadt/Q91Wz/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-freistadt/",
  "https://www.herold.at/gelbe-seiten/perg/SPcFv/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-perg/",
  "https://www.herold.at/gelbe-seiten/sch%C3%A4rding/1n1pH/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-sch%C3%A4rding/",
  "https://www.herold.at/gelbe-seiten/v%C3%B6cklabruck/NhkDd/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-v%C3%B6cklabruck/",
  "https://www.herold.at/gelbe-seiten/wels/DhVkR/rotes-kreuz-%C3%B6sterreich-bezirksstelle-und-ortsstelle-wels/",
  "https://www.herold.at/gelbe-seiten/linz/WKCr9/rotes-kreuz-%C3%B6sterreich-bezirksstelle-urfahr-umgebung/",
  "https://www.herold.at/gelbe-seiten/waidhofen-an-der-thaya/WFfZ9/rotes-kreuz-%C3%B6sterreich-bezirksstelle-waidhofen-a-d-thaya/",
  "https://www.herold.at/gelbe-seiten/waidhofen-an-der-ybbs/KnCxP/rotes-kreuz-%C3%B6sterreich-bezirksstelle-waidhofen-a-d-ybbs/",
  "https://www.herold.at/gelbe-seiten/weitra/JKv9M/rotes-kreuz-%C3%B6sterreich-bezirksstelle-weitra/",
  "https://www.herold.at/gelbe-seiten/weiz/l9f2B/rotes-kreuz-%C3%B6sterreich-bezirksstelle-weiz/",
  "https://www.herold.at/gelbe-seiten/wiener-neustadt/SKL3m/rotes-kreuz-%C3%B6sterreich-bezirksstelle-wr-neustadt/",
  "https://www.herold.at/gelbe-seiten/zistersdorf/NhMp6/rotes-kreuz-%C3%B6sterreich-bezirksstelle-zistersdorf/",
  "https://www.herold.at/gelbe-seiten/zwettl-nieder%C3%B6sterreich/3xpsB/rotes-kreuz-%C3%B6sterreich-bezirksstelle-zwettl/",
  "https://www.herold.at/gelbe-seiten/neulengbach/l8wjB/rotes-kreuz-%C3%B6sterreich-bezirkstelle-neulengbach/",
  "https://www.herold.at/gelbe-seiten/linz/rFkQ5/rotes-kreuz-%C3%B6sterreich-blutspendedienst-und-blutzentrale-f%C3%BCr-ober%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/mauthausen/kZPvn/rotes-kreuz-%C3%B6sterreich-dienststelle-mauthausen/",
  "https://www.herold.at/gelbe-seiten/gerasdorf-bei-wien/GsZkp/rotes-kreuz-%C3%B6sterreich-gerasdorf/",
  "https://www.herold.at/gelbe-seiten/wildon/lxhkv/rotes-kreuz-%C3%B6sterreich-hauskrankenpflege-wildon/",
  "https://www.herold.at/gelbe-seiten/maiersdorf/CDcrg/rotes-kreuz-%C3%B6sterreich-hohe-wand-stollhof-maiersdorf/",
  "https://www.herold.at/gelbe-seiten/seewalchen-am-attersee/dPm8V/rotes-kreuz-%C3%B6sterreich-jugendrotkreuz-litzlberg/",
  "https://www.herold.at/gelbe-seiten/wien/nLCXJ/rotes-kreuz-%C3%B6sterreich-landesverband-wien/",
  "https://www.herold.at/gelbe-seiten/wien/mcXfK/rotes-kreuz-%C3%B6sterreich-landesverband-wien-bezirksstelle-bertha-von-suttner/",
  "https://www.herold.at/gelbe-seiten/wien/ltN4P/rotes-kreuz-%C3%B6sterreich-landesverband-wien-bezirksstelle-ddr-lauda/",
  "https://www.herold.at/gelbe-seiten/wien/nPKT2/rotes-kreuz-%C3%B6sterreich-landesverband-wien-bezirksstelle-nord/",
  "https://www.herold.at/gelbe-seiten/wien/bskrv/rotes-kreuz-%C3%B6sterreich-landesverband-wien-bezirksstelle-van-swieten/",
  "https://www.herold.at/gelbe-seiten/wien/D1lD6/rotes-kreuz-%C3%B6sterreich-landesverband-wien-bezirksstelle-wien-west/",
  "https://www.herold.at/gelbe-seiten/wien/p5KlS/rotes-kreuz-%C3%B6sterreich-landesverband-wien-pflege-und-betreuung/",
  "https://www.herold.at/gelbe-seiten/martinsberg/s5GkP/rotes-kreuz-%C3%B6sterreich-martinsberg/",
  "https://www.herold.at/gelbe-seiten/m%C3%BCnichreith-laimbach/VWDMl/rotes-kreuz-%C3%B6sterreich-m%C3%BCnichreith-am-ostrong-m%C3%BCnichreith/",
  "https://www.herold.at/gelbe-seiten/obernberg-am-inn/rGDRV/rotes-kreuz-%C3%B6sterreich-obernberg-am-inn/",
  "https://www.herold.at/gelbe-seiten/fohnsdorf/l9dwG/rotes-kreuz-%C3%B6sterreich-ortsdienststelle-fohnsdorf/",
  "https://www.herold.at/gelbe-seiten/mautern-in-steiermark/sjV3x/rotes-kreuz-%C3%B6sterreich-ortsdienststelle-mautern/",
  "https://www.herold.at/gelbe-seiten/sankt-peter-im-sulmtal/qWXJL/rotes-kreuz-%C3%B6sterreich-ortsdienststelle-st-peter-im-sulmtal/",
  "https://www.herold.at/gelbe-seiten/aigen-schl%C3%A4gl/WFthD/rotes-kreuz-%C3%B6sterreich-ortsstelle-aigen-im-m%C3%BChlkreis/",
  "https://www.herold.at/gelbe-seiten/alland/hzgRN/rotes-kreuz-%C3%B6sterreich-ortsstelle-alland/",
  "https://www.herold.at/gelbe-seiten/altenmarkt-bei-sankt-gallen/Mxlkr/rotes-kreuz-%C3%B6sterreich-ortsstelle-altenmarkt/",
  "https://www.herold.at/gelbe-seiten/altheim/14SHj/rotes-kreuz-%C3%B6sterreich-ortsstelle-altheim/",
  "https://www.herold.at/gelbe-seiten/andorf/Dhsjf/rotes-kreuz-%C3%B6sterreich-ortsstelle-andorf/",
  "https://www.herold.at/gelbe-seiten/anger/v9nth/rotes-kreuz-%C3%B6sterreich-ortsstelle-anger/",
  "https://www.herold.at/gelbe-seiten/arnfels/HcS5V/rotes-kreuz-%C3%B6sterreich-ortsstelle-arnfels/",
  "https://www.herold.at/gelbe-seiten/redlham/p5Gmv/rotes-kreuz-%C3%B6sterreich-ortsstelle-attnang-puchheim/",
  "https://www.herold.at/gelbe-seiten/bad-aussee/MFjcH/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-aussee/",
  "https://www.herold.at/gelbe-seiten/bad-goisern-am-hallst%C3%A4ttersee/jjML2/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-goisern/",
  "https://www.herold.at/gelbe-seiten/bad-hall/14SLK/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-hall/",
  "https://www.herold.at/gelbe-seiten/bad-ischl/p5GkJ/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-ischl/",
  "https://www.herold.at/gelbe-seiten/bad-leonfelden/sjWH2/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-leonfelden/",
  "https://www.herold.at/gelbe-seiten/bad-mitterndorf/MzMVL/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-mitterndorf/",
  "https://www.herold.at/gelbe-seiten/bad-waltersdorf/9nFsQ/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-waltersdorf/",
  "https://www.herold.at/gelbe-seiten/bad-zell/vtSvS/rotes-kreuz-%C3%B6sterreich-ortsstelle-bad-zell/",
  "https://www.herold.at/gelbe-seiten/bernhardsthal/5QLHp/rotes-kreuz-%C3%B6sterreich-ortsstelle-bernhardsthal/",
  "https://www.herold.at/gelbe-seiten/birkfeld/pntVT/rotes-kreuz-%C3%B6sterreich-ortsstelle-birkfeld/",
  "https://www.herold.at/gelbe-seiten/b%C3%B6heimkirchen/3FNbn/rotes-kreuz-%C3%B6sterreich-ortsstelle-b%C3%B6heimkirchen/",
  "https://www.herold.at/gelbe-seiten/deutsch-wagram/GsxC6/rotes-kreuz-%C3%B6sterreich-ortsstelle-deutsch-wagram/",
  "https://www.herold.at/gelbe-seiten/drasenhofen/1n5nl/rotes-kreuz-%C3%B6sterreich-ortsstelle-drasenhofen/",
  "https://www.herold.at/gelbe-seiten/ebensee/vss3r/rotes-kreuz-%C3%B6sterreich-ortsstelle-ebensee/",
  "https://www.herold.at/gelbe-seiten/eggenburg/qWkxv/rotes-kreuz-%C3%B6sterreich-ortsstelle-eggenburg/",
  "https://www.herold.at/gelbe-seiten/eibiswald/vtRhS/rotes-kreuz-%C3%B6sterreich-ortsstelle-eibiswald/",
  "https://www.herold.at/gelbe-seiten/engelhartszell/KnR1x/rotes-kreuz-%C3%B6sterreich-ortsstelle-engelhartszell/",
  "https://www.herold.at/gelbe-seiten/enns/PQhSl/rotes-kreuz-%C3%B6sterreich-ortsstelle-enns/",
  "https://www.herold.at/gelbe-seiten/bad-erlach/9nFhG/rotes-kreuz-%C3%B6sterreich-ortsstelle-erlach/",
  "https://www.herold.at/gelbe-seiten/esternberg/K4n6w/rotes-kreuz-%C3%B6sterreich-ortsstelle-esternberg/",
  "https://www.herold.at/gelbe-seiten/frankenburg-am-hausruck/Gvdzv/rotes-kreuz-%C3%B6sterreich-ortsstelle-frankenburg/",
  "https://www.herold.at/gelbe-seiten/frankenmarkt/nLcst/rotes-kreuz-%C3%B6sterreich-ortsstelle-frankenmarkt/",
  "https://www.herold.at/gelbe-seiten/friedberg/6sfHL/rotes-kreuz-%C3%B6sterreich-ortsstelle-friedberg/",
  "https://www.herold.at/gelbe-seiten/frohnleiten/G99GD/rotes-kreuz-%C3%B6sterreich-ortsstelle-frohnleiten/",
  "https://www.herold.at/gelbe-seiten/gallneukirchen/l9gBg/rotes-kreuz-%C3%B6sterreich-ortsstelle-gallneukirchen/",
  "https://www.herold.at/gelbe-seiten/gf%C3%B6hl/ZRDJp/rotes-kreuz-%C3%B6sterreich-ortsstelle-gf%C3%B6hl/",
  "https://www.herold.at/gelbe-seiten/gleisdorf/rzrCg/rotes-kreuz-%C3%B6sterreich-ortsstelle-gleisdorf/",
  "https://www.herold.at/gelbe-seiten/gratkorn/G8Xft/rotes-kreuz-%C3%B6sterreich-ortsstelle-gratkorn/",
  "https://www.herold.at/gelbe-seiten/grein/1n1XG/rotes-kreuz-%C3%B6sterreich-ortsstelle-grein/",
  "https://www.herold.at/gelbe-seiten/gr%C3%B6bming/Nj2PP/rotes-kreuz-%C3%B6sterreich-ortsstelle-gr%C3%B6bming/",
  "https://www.herold.at/gelbe-seiten/gro%C3%9Fkrut/8KwtD/rotes-kreuz-%C3%B6sterreich-ortsstelle-gro%C3%9Fkrut/",
  "https://www.herold.at/gelbe-seiten/untergr%C3%BCnburg/b9VFq/rotes-kreuz-%C3%B6sterreich-ortsstelle-gr%C3%BCnburg-steinbach-steyr/",
  "https://www.herold.at/gelbe-seiten/haag-am-hausruck/D1dSQ/rotes-kreuz-%C3%B6sterreich-ortsstelle-haag-am-hausruck/",
  "https://www.herold.at/gelbe-seiten/hagenberg-im-m%C3%BChlkreis/nQk63/rotes-kreuz-%C3%B6sterreich-ortsstelle-hagenberg/",
  "https://www.herold.at/gelbe-seiten/hartkirchen/pnvd9/rotes-kreuz-%C3%B6sterreich-ortsstelle-hartkirchen/",
  "https://www.herold.at/gelbe-seiten/haugsdorf/6sf6B/rotes-kreuz-%C3%B6sterreich-ortsstelle-haugsdorf/",
  "https://www.herold.at/gelbe-seiten/heiligenkreuz-am-waasen/dLrhx/rotes-kreuz-%C3%B6sterreich-ortsstelle-heiligenkreuz/",
  "https://www.herold.at/gelbe-seiten/helfenberg/Nj3bs/rotes-kreuz-%C3%B6sterreich-ortsstelle-helfenberg/",
  "https://www.herold.at/gelbe-seiten/herzogsdorf/kR2Hf/rotes-kreuz-%C3%B6sterreich-ortsstelle-herzogsdorf/",
  "https://www.herold.at/gelbe-seiten/himberg/nLbR6/rotes-kreuz-%C3%B6sterreich-ortsstelle-himberg/",
  "https://www.herold.at/gelbe-seiten/hofkirchen-im-m%C3%BChlkreis/MFknq/rotes-kreuz-%C3%B6sterreich-ortsstelle-hofkirchen-im-m%C3%BChlkreis/",
  "https://www.herold.at/gelbe-seiten/hofstetten-gr%C3%BCnau/f5156/rotes-kreuz-%C3%B6sterreich-ortsstelle-hofstetten-gr%C3%BCnau/",
  "https://www.herold.at/gelbe-seiten/hohentauern/SKkxK/rotes-kreuz-%C3%B6sterreich-ortsstelle-hohentauern/",
  "https://www.herold.at/gelbe-seiten/kalsdorf-bei-graz/dKrQp/rotes-kreuz-%C3%B6sterreich-ortsstelle-kalsdorf/",
  "https://www.herold.at/gelbe-seiten/katsdorf/tZZpD/rotes-kreuz-%C3%B6sterreich-ortsstelle-katsdorf/",
  "https://www.herold.at/gelbe-seiten/kematen-an-der-ybbs/vtRWf/rotes-kreuz-%C3%B6sterreich-ortsstelle-kematen-ybbs/",
  "https://www.herold.at/gelbe-seiten/kilb/sjTqX/rotes-kreuz-%C3%B6sterreich-ortsstelle-kilb/",
  "https://www.herold.at/gelbe-seiten/kirchberg-an-der-pielach/rGC3V/rotes-kreuz-%C3%B6sterreich-ortsstelle-kirchberg-pielach/",
  "https://www.herold.at/gelbe-seiten/kirchschlag-bei-linz/hzjTc/rotes-kreuz-%C3%B6sterreich-ortsstelle-kirchschlag-bei-linz/",
  "https://www.herold.at/gelbe-seiten/kleinzell/jjl2x/rotes-kreuz-%C3%B6sterreich-ortsstelle-kleinzell/",
  "https://www.herold.at/gelbe-seiten/k%C3%B6nigswiesen/5RVr6/rotes-kreuz-%C3%B6sterreich-ortsstelle-k%C3%B6nigswiesen/",
  "https://www.herold.at/gelbe-seiten/kopfing-im-innkreis/6sgWT/rotes-kreuz-%C3%B6sterreich-ortsstelle-kopfing/",
  "https://www.herold.at/gelbe-seiten/kremsm%C3%BCnster/p6PqC/rotes-kreuz-%C3%B6sterreich-ortsstelle-kremsm%C3%BCnster/",
  "https://www.herold.at/gelbe-seiten/niederkreuzstetten/qWX8W/rotes-kreuz-%C3%B6sterreich-ortsstelle-kreuzstetten/",
  "https://www.herold.at/gelbe-seiten/lambach/Cxh2F/rotes-kreuz-%C3%B6sterreich-ortsstelle-lambach/",
  "https://www.herold.at/gelbe-seiten/langschlag/XjB4m/rotes-kreuz-%C3%B6sterreich-ortsstelle-langschlag/",
  "https://www.herold.at/gelbe-seiten/lembach-im-m%C3%BChlkreis/RcfC7/rotes-kreuz-%C3%B6sterreich-ortsstelle-lembach-im-m%C3%BChlkreis/",
  "https://www.herold.at/gelbe-seiten/leonding/vszvL/rotes-kreuz-%C3%B6sterreich-ortsstelle-leonding/",
  "https://www.herold.at/gelbe-seiten/leopoldsdorf-im-marchfelde/ZQpxq/rotes-kreuz-%C3%B6sterreich-ortsstelle-leopoldsdorf/",
  "https://www.herold.at/gelbe-seiten/liebenau/7dtJw/rotes-kreuz-%C3%B6sterreich-ortsstelle-liebenau/",
  "https://www.herold.at/gelbe-seiten/markt-hartmannsdorf/WzWQp/rotes-kreuz-%C3%B6sterreich-ortsstelle-markt-hartmannsdorf/",
  "https://www.herold.at/gelbe-seiten/mattighofen/5QMh1/rotes-kreuz-%C3%B6sterreich-ortsstelle-mattighofen/",
  "https://www.herold.at/gelbe-seiten/mettmach/N1vZv/rotes-kreuz-%C3%B6sterreich-ortsstelle-mettmach/",
  "https://www.herold.at/gelbe-seiten/molln/VWFlk/rotes-kreuz-%C3%B6sterreich-ortsstelle-molln/",
  "https://www.herold.at/gelbe-seiten/mondsee/dLS1V/rotes-kreuz-%C3%B6sterreich-ortsstelle-mondsee/",
  "https://www.herold.at/gelbe-seiten/mureck/kR177/rotes-kreuz-%C3%B6sterreich-ortsstelle-mureck/",
  "https://www.herold.at/gelbe-seiten/nestelbach-bei-graz/PQgFl/rotes-kreuz-%C3%B6sterreich-ortsstelle-nestelbach/",
  "https://www.herold.at/gelbe-seiten/neufelden/Q9LP5/rotes-kreuz-%C3%B6sterreich-ortsstelle-neufelden/",
  "https://www.herold.at/gelbe-seiten/neuhofen-an-der-krems/DhshL/rotes-kreuz-%C3%B6sterreich-ortsstelle-neuhofen-a-d-krems/",
  "https://www.herold.at/gelbe-seiten/neumarkt-in-der-steiermark/2Vkxq/rotes-kreuz-%C3%B6sterreich-ortsstelle-neumarkt/",
  "https://www.herold.at/gelbe-seiten/obdach/v9npm/rotes-kreuz-%C3%B6sterreich-ortsstelle-obdach/",
  "https://www.herold.at/gelbe-seiten/ober-grafendorf/v9NbW/rotes-kreuz-%C3%B6sterreich-ortsstelle-obergrafendorf/",
  "https://www.herold.at/gelbe-seiten/oberw%C3%B6lz/3FNrt/rotes-kreuz-%C3%B6sterreich-ortsstelle-oberw%C3%B6lz-stadt/",
  "https://www.herold.at/gelbe-seiten/passail/XjBKs/rotes-kreuz-%C3%B6sterreich-ortsstelle-passail/",
  "https://www.herold.at/gelbe-seiten/payerbach/vxB4T/rotes-kreuz-%C3%B6sterreich-ortsstelle-payerbach/",
  "https://www.herold.at/gelbe-seiten/peilstein-im-m%C3%BChlviertel/PQhV4/rotes-kreuz-%C3%B6sterreich-ortsstelle-peisltein-im-m%C3%BChlviertel/",
  "https://www.herold.at/gelbe-seiten/peuerbach/ccl77/rotes-kreuz-%C3%B6sterreich-ortsstelle-peuerbach/",
  "https://www.herold.at/gelbe-seiten/pyhra/Rccn1/rotes-kreuz-%C3%B6sterreich-ortsstelle-phyra/",
  "https://www.herold.at/gelbe-seiten/markt-piesting/hG39K/rotes-kreuz-%C3%B6sterreich-ortsstelle-piesting/",
  "https://www.herold.at/gelbe-seiten/poysdorf/ccmgB/rotes-kreuz-%C3%B6sterreich-ortsstelle-poysdorf/",
  "https://www.herold.at/gelbe-seiten/pregarten/v9q2R/rotes-kreuz-%C3%B6sterreich-ortsstelle-pregarten/",
  "https://www.herold.at/gelbe-seiten/prinzersdorf/JL6nS/rotes-kreuz-%C3%B6sterreich-ortsstelle-prinzersdorf/",
  "https://www.herold.at/gelbe-seiten/ratten/rzkh2/rotes-kreuz-%C3%B6sterreich-ortsstelle-ratten/",
  "https://www.herold.at/gelbe-seiten/riedau/9nH7k/rotes-kreuz-%C3%B6sterreich-ortsstelle-riedau/",
  "https://www.herold.at/gelbe-seiten/ostermiething/68Qvk/rotes-kreuz-%C3%B6sterreich-ortsstelle-riedersbach/",
  "https://www.herold.at/gelbe-seiten/rottenmann/3z3kT/rotes-kreuz-%C3%B6sterreich-ortsstelle-rottenmann/",
  "https://www.herold.at/gelbe-seiten/sankt-florian/K4n5d/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-florian/",
  "https://www.herold.at/gelbe-seiten/sankt-georgen-an-der-gusen/14SK2/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-georgen-a-d-gusen/",
  "https://www.herold.at/gelbe-seiten/sankt-georgen-am-walde/692cK/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-georgen-am-walde/",
  "https://www.herold.at/gelbe-seiten/sankt-georgen-im-attergau/ccp6T/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-georgen-im-attergau/",
  "https://www.herold.at/gelbe-seiten/sankt-leonhard-am-forst/691DB/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-leonhard-ruprechtshofen/",
  "https://www.herold.at/gelbe-seiten/sankt-martin-im-m%C3%BChlkreis/T8G8z/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-martin-im-m%C3%BChlkreis/",
  "https://www.herold.at/gelbe-seiten/sankt-oswald/14Qw1/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-oswald/",
  "https://www.herold.at/gelbe-seiten/sankt-stefan-ob-stainz/pntPK/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-stefan-ob-stainz/",
  "https://www.herold.at/gelbe-seiten/sankt-veit-im-m%C3%BChlkreis/G9BVh/rotes-kreuz-%C3%B6sterreich-ortsstelle-st-veit-im-m%C3%BChlkreis/",
  "https://www.herold.at/gelbe-seiten/sankt-wolfgang-im-salzkammergut/dKXh6/rotes-kreuz-%C3%B6sterreich-ortsstelle-sankt-wolfgang-im-salzkammergut/",
  "https://www.herold.at/gelbe-seiten/sattledt/hHJbM/rotes-kreuz-%C3%B6sterreich-ortsstelle-sattledt/",
  "https://www.herold.at/gelbe-seiten/scharnstein/mcxwG/rotes-kreuz-%C3%B6sterreich-ortsstelle-scharnstein/",
  "https://www.herold.at/gelbe-seiten/schladming/5QLWc/rotes-kreuz-%C3%B6sterreich-ortsstelle-schladming/",
  "https://www.herold.at/gelbe-seiten/schwarzau-im-gebirge/b9ggs/rotes-kreuz-%C3%B6sterreich-ortsstelle-schwarzau-gebirge/",
  "https://www.herold.at/gelbe-seiten/schwertberg/5QMjJ/rotes-kreuz-%C3%B6sterreich-ortsstelle-schwertberg/",
  "https://www.herold.at/gelbe-seiten/seewalchen-am-attersee/bt9CS/rotes-kreuz-%C3%B6sterreich-ortsstelle-seewalchen-attersee/",
  "https://www.herold.at/gelbe-seiten/sierning/692dd/rotes-kreuz-%C3%B6sterreich-ortsstelle-sierning/",
  "https://www.herold.at/gelbe-seiten/spitz/mcwZQ/rotes-kreuz-%C3%B6sterreich-ortsstelle-spitz/",
  "https://www.herold.at/gelbe-seiten/stainach-p%C3%BCrgg/691Qg/rotes-kreuz-%C3%B6sterreich-ortsstelle-stainach/",
  "https://www.herold.at/gelbe-seiten/stubenberg/mcwkD/rotes-kreuz-%C3%B6sterreich-ortsstelle-stubenberg/",
  "https://www.herold.at/gelbe-seiten/ternberg/5QMkc/rotes-kreuz-%C3%B6sterreich-ortsstelle-ternberg/",
  "https://www.herold.at/gelbe-seiten/texing/rGC4p/rotes-kreuz-%C3%B6sterreich-ortsstelle-texing/",
  "https://www.herold.at/gelbe-seiten/ottnang-am-hausruck/fnlnj/rotes-kreuz-%C3%B6sterreich-ortsstelle-thomasroith/",
  "https://www.herold.at/gelbe-seiten/tragwein/tRB7Q/rotes-kreuz-%C3%B6sterreich-ortsstelle-tragwein/",
  "https://www.herold.at/gelbe-seiten/traun/HcTHb/rotes-kreuz-%C3%B6sterreich-ortsstelle-traun/",
  "https://www.herold.at/gelbe-seiten/trieben/8Kx82/rotes-kreuz-%C3%B6sterreich-ortsstelle-trieben/",
  "https://www.herold.at/gelbe-seiten/%C3%BCbelbach/14R5r/rotes-kreuz-%C3%B6sterreich-ortsstelle-%C3%BCbelbach/",
  "https://www.herold.at/gelbe-seiten/ulrichsberg/5Rbbb/rotes-kreuz-%C3%B6sterreich-ortsstelle-ulrichsberg/",
  "https://www.herold.at/gelbe-seiten/unterach-am-attersee/VWFpL/rotes-kreuz-%C3%B6sterreich-ortsstelle-unterach-am-attersee/",
  "https://www.herold.at/gelbe-seiten/unterwei%C3%9Fenbach/sjWDP/rotes-kreuz-%C3%B6sterreich-ortsstelle-unterwei%C3%9Fenbach/",
  "https://www.herold.at/gelbe-seiten/voitsberg/LW2Mk/rotes-kreuz-%C3%B6sterreich-ortsstelle-voitsberg-k%C3%B6flach/",
  "https://www.herold.at/gelbe-seiten/vorau/p5FWL/rotes-kreuz-%C3%B6sterreich-ortsstelle-vorau/",
  "https://www.herold.at/gelbe-seiten/vorchdorf/dLRwt/rotes-kreuz-%C3%B6sterreich-ortsstelle-vorchdorf/",
  "https://www.herold.at/gelbe-seiten/waldhausen-im-strudengau/4hjpH/rotes-kreuz-%C3%B6sterreich-ortsstelle-waldhausen/",
  "https://www.herold.at/gelbe-seiten/walding/VVj1d/rotes-kreuz-%C3%B6sterreich-ortsstelle-walding/",
  "https://www.herold.at/gelbe-seiten/weyer/WG6mZ/rotes-kreuz-%C3%B6sterreich-ortsstelle-weyer/",
  "https://www.herold.at/gelbe-seiten/wiesmath/pntGm/rotes-kreuz-%C3%B6sterreich-ortsstelle-wiesmath/",
  "https://www.herold.at/gelbe-seiten/wildon/5Q42t/rotes-kreuz-%C3%B6sterreich-ortsstelle-wildon/",
  "https://www.herold.at/gelbe-seiten/windischgarsten/SLJ4g/rotes-kreuz-%C3%B6sterreich-ortsstelle-windischgarsten/",
  "https://www.herold.at/gelbe-seiten/wolkersdorf-im-weinviertel/qWX9q/rotes-kreuz-%C3%B6sterreich-ortsstelle-wolkersdorf/",
  "https://www.herold.at/gelbe-seiten/yspertal/WFsJ3/rotes-kreuz-%C3%B6sterreich-ortsstelle-yspertal/",
  "https://www.herold.at/gelbe-seiten/zeltweg/pntQZ/rotes-kreuz-%C3%B6sterreich-ortsstelle-zeltweg/",
  "https://www.herold.at/gelbe-seiten/ziersdorf/WzWC6/rotes-kreuz-%C3%B6sterreich-ortsstelle-ziersdorf/",
  "https://www.herold.at/gelbe-seiten/breitenfurt-bei-wien/VX59t/rotes-kreuz-%C3%B6sterreich-%C3%B6sterreichisches-rettungsstelle-breitenfurt/",
  "https://www.herold.at/gelbe-seiten/biedermannsdorf/hJcZV/rotes-kreuz-%C3%B6sterreich-rettungsstelle-biedermannsdorf/",
  "https://www.herold.at/gelbe-seiten/guntramsdorf/VZnn6/rotes-kreuz-%C3%B6sterreich-rettungsstelle-guntramsdorf/",
  "https://www.herold.at/gelbe-seiten/lieboch/QsSC3/rotes-kreuz-%C3%B6sterreich-rettungsstelle-lieboch/",
  "https://www.herold.at/gelbe-seiten/v%C3%B6sendorf/gWMhP/rotes-kreuz-%C3%B6sterreich-rettungsstelle-v%C3%B6sendorf/",
  "https://www.herold.at/gelbe-seiten/wiener-neudorf/ZT37x/rotes-kreuz-%C3%B6sterreich-wiener-neudorf/",
  "https://www.herold.at/gelbe-seiten/sonntag/Qw1Gj/rotes-kreuz-%C3%B6sterreichisches/",
  "https://www.herold.at/gelbe-seiten/kumberg/Rccwp/rotes-kreuz-%C3%B6sterreichisches-landesverband-stmk/",
  "https://www.herold.at/gelbe-seiten/lannach/snmrg/rotes-kreuz-%C3%B6sterreichisches-ortsstelle-lannach/",
  "https://www.herold.at/gelbe-seiten/pabneukirchen/mgCnk/rotes-kreuz-%C3%B6sterreichisches-sozialmedizinischer-st%C3%BCtzpunkt/",
  "https://www.herold.at/gelbe-seiten/grein/LZMxF/rotes-kreuz-%C3%B6sterreichisches-sozialmedizinischer-st%C3%BCtzpunkt/",
  "https://www.herold.at/gelbe-seiten/perg/MJ2rJ/rotes-kreuz-%C3%B6sterreichisches-sozialmedizinischer-st%C3%BCtzpunkt/",
  "https://www.herold.at/gelbe-seiten/baumgartenberg/p6pxM/rotes-kreuz-%C3%B6sterreichisches-sozialmedizinischer-st%C3%BCtzpunkt/",
  "https://www.herold.at/gelbe-seiten/linz/X3rlD/rotes-kreuz-%C3%B6sterreichisches-jugendrotkreuz-ober%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/jennersdorf/5QkGT/rotes-kreuz-seniorentageszentrum/",
  "https://www.herold.at/gelbe-seiten/illmitz/7npFC/rotes-kreuz-seniorentageszentrum/",
  "https://www.herold.at/gelbe-seiten/halbturn/9zlwN/rotes-kreuz-seniorentageszentrum/",
  "https://www.herold.at/gelbe-seiten/neutal/CR4kQ/rotes-kreuz-seniorentageszentrum/",
  "https://www.herold.at/gelbe-seiten/rum/SXRP2/rotes-kreuz-tirol-gemeinn%C3%BCtzige-rettungsdienst-gmbh/",
  "https://www.herold.at/gelbe-seiten/weissenbach-an-der-triesting/cdctn/rotes-kreuz-triestingtal/",
  "https://www.herold.at/gelbe-seiten/leobersdorf/41bJZ/rotes-kreuz-triestingtal/",
  "https://www.herold.at/gelbe-seiten/lochau/174TD/rotes-kreuz-vorarlberg/",
  "https://www.herold.at/gelbe-seiten/wiener-neustadt/mgcLH/rotes-kreuz-wiener-neustadt-gesundheits--u-soziale-dienste/",
  "https://www.herold.at/gelbe-seiten/wien/sBtQj/rudolfiner-verein-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/linz/s4N79/rufhilfe-seniorennotruf-rotes-kreuz-%C3%B6sterreichisches-landesverband-ober%C3%B6sterreich/",
  "https://www.herold.at/gelbe-seiten/elsbethen/PRqLB/seniorenwohnhaus-elisabeth/",
  "https://www.herold.at/gelbe-seiten/engerwitzdorf/lCL3l/sozialberatungsstelle-d-sozialhilfeverbandes/",
  "https://www.herold.at/gelbe-seiten/gramastetten/j2NLZ/sozialberatungsstelle-d-sozialhilfeverbandes-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/bad-leonfelden/X2DxT/sozialberatungsstelle-d-sozialhilfeverbandes-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/feldkirchen-an-der-donau/8MrDW/sozialberatungsstelle-des-sozialhilfeverbandes-%E2%80%93-rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/raab/T595N/sozialdienst-des-roten-kreuzes/",
  "https://www.herold.at/gelbe-seiten/wien/5RWjN/speisezusteller-wrk-handel-und-dienstleistungen-des-wiener-roten-kreuzes-gmbh/",
  "https://www.herold.at/gelbe-seiten/hall-in-tirol/ch6Jd/sprungbrett-sozialladen-rotes-kreuz-hall-i-t/",
  "https://www.herold.at/gelbe-seiten/wien/6rn7w/rettungsdienst-rotes-kreuz-%C3%B6sterreich-landesverband/"
]


function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

// returns username
const getData = (user, url) => {
  const obj = {}
  obj.url = url
  try {
    const $ = cheerio.load(user);
    obj.address = $("div.address a[data-category='show map']").first().text() ? $("div.address a[data-category='show map']").first().text() : 'N/A';
    obj.name = $("h1[itemprop^='name']").text() ? $("h1[itemprop^='name']").text() : 'N/A';
    obj.phone = $(".btn-hbd.btn-phone.callPhone").attr('href') ? $(".btn-hbd.btn-phone.callPhone").attr('href').replace("tel:", "") : 'N/A';
    obj.email = $("a.ellipsis").attr('href') ? $("a.ellipsis").attr('href').replace("mailto:", "") : 'N/A';
    obj.web = $('a[data-yxt="web"]').attr('href') ? $('a[data-yxt="web"]').attr('href') : 'N/A';
    // const el = $('.eventbox__address').text()
    // obj.address = el.trim().split("\n").map(e => e.replace(/\s+/g, " ").trim()).filter(e => e != "").join(",")
    // obj.tel = $("div[title=\"Telefon\"]").text().split("\n").map(e => e.replace(/\s+/g, " ").trim()).filter(e => e != "")
    // obj.email = $(".link.link--mail").attr("href").replace("mailto:", "")
    // obj.web = $(".link.link--external").attr("href")
  }
  catch (error) {
    obj.error = true
  }




  //   let obj = {
  //     name: user.name,
  //     company: user.company.name,
  //   };
  return obj;
};

// Gets url and runs getData on json
let getUser = async (url) => {
  const finaldata = await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      return getData(data, url)
    })
    .catch((e) => console.log('-------->', e));
  return finaldata;
};

// Takes an array of urls and maps them agains getUser methode and awaits them
let scrape = async (urls) => {
  const data = await Promise.all(urls.map((e) => getUser(e)));
  return data;
};

let savingToFile = (fileName, data) => {
  fs.writeFile(fileName, JSON.stringify(data), (err, saved) => {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
};

// breaks url arry into chuncks and runs scrape for each chunk and awaits befor appending to return arr
const batchScrape = async (list, num) => {
  const batch = chunkArray(list, num);
  let arr = [];

  // for (const [key, value] of batch.entries()) {
  //   d = await scrape(value);
  //   savingToFile('testDataSave.json', [...arr, ...d]);
  //   arr = [...arr, ...d];
  // }

  for (let b of batch) {
    d = await scrape(b);
    console.log([...arr, ...d])
    savingToFile('202101_rk.json', [...arr, ...d]);
    arr = [...arr, ...d];
  }

  // for (let i = 0; i < batch.length; i++) {
  //   d = await scrape(batch[i]);
  //   arr = [...arr, ...d];
  // }

  return arr;
};

class CreateCSV {
  constructor(headings, data) {
    this.headings = headings
    this.headStr = headings.join()
    this.data = data
  }

  getHeadings() {
    return this.headings
  }

  getStrHeadings() {
    return this.headStr
  }

  getCSV() {
    let csvStr = ""
    csvStr += this.headStr
    this.data.forEach(d => {
      let str = "\n"
      this.headings.forEach(h => {
        str += d[h] + ","
      })
      csvStr += str.replace(/,\s*$/, "") // Removes the trailing comma and whitespace
    })
    return csvStr
  }

}


batchScrape(urls, 25).then(async (d) => {
  //console.log(await new ObjectsToCsv(d).toString())
  //console.log(new CreateCSV(["name","company"],d).getCSV())
  console.log("Done")
});