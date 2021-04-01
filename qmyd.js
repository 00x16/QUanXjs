/* ziye 
github地址 https://github.com/6Svip120apk69
TG频道地址  https://t.me/ziyescript
TG交流群   https://t.me/joinchat/AAAAAE7XHm-q1-7Np-tF3g
boxjs链接  https://raw.githubusercontent.com/6Svip120apk69/gitee_q8qsTAUA_cThxc1RBVUE/main/Task/ziye.boxjs.json

转载请备注个名字，谢谢

⚠️全民悦动
点击  http://qmyd.yichengw.cn/?id=115796 下载APP 谢谢支持

3.3 制作
3.4 优化提现，优化刮刮卡，优化抽手机
3.5 增加了点延迟，优化提现
3.8 替换为循环获取ck

⚠️ 时间设置    0,30 0-23 * * *    每天 25次以上就行 


一  默认20点睡7点醒，时间务必包括这两个点 
(已内置随机udid，添加重写无视多设备检测，如非必要，勿频繁登录)

⚠️一共1个位置 1个ck  👉 2条 Secrets 

多账号换行
第一步 添加  hostname=qmyd.yichengw.cn,

第二步 ⚠️添加全民悦动获取TOKEN重写  

登录全民悦动  获取token

qmydtokenVal 👉QMYD_qmydTOKEN
CASH  👉  QMYD_CASH     可设置0 0.3 1 5 50 100 200 888  默认0关闭提现，设置888由上至下循环提现

⚠️主机名以及重写👇
hostname=qmyd.yichengw.cn,

############## 圈x
#全民悦动获取TOKEN
https:\/\/qmyd\.yichengw\.cn\/* url script-request-header https://raw.githubusercontent.com/6Svip120apk69/gitee_q8qsTAUA_cThxc1RBVUE/main/Task/qmyd.js

############## loon
#全民悦动获取TOKEN
http-response https:\/\/qmyd\.yichengw\.cn\/* script-path=https://raw.githubusercontent.com/6Svip120apk69/gitee_q8qsTAUA_cThxc1RBVUE/main/Task/qmyd.js, requires-body=1,max-size=0, tag=全民悦动获取TOKEN

############## surge
#全民悦动获取TOKEN
全民悦动获取TOKEN = type=http-response,pattern=https:\/\/qmyd\.yichengw\.cn\/*,script-path=https://raw.githubusercontent.com/6Svip120apk69/gitee_q8qsTAUA_cThxc1RBVUE/main/Task/qmyd.js

*/
const $ = Env("全民悦动");
$.idx = ($.idx = ($.getval('qmydSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : ``;
const COOKIE = $.isNode() ? require("./qmydCOOKIE") : ``;
const logs = 0; // 0为关闭日志，1为开启
const notifyttt = 1 // 0为关闭外部推送，1为12 23 点外部推送
const notifyInterval = 2; // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知 
$.message = '', COOKIES_SPLIT = '', CASH = '', ddtime = '',QMYD_CASH=100;
CZ = 10
const qmydtokenArr = [];
let qmydtokenVal = ``;
let middleqmydTOKEN = [];
if ($.isNode()) {
    // 没有设置 QMYD_CASH 则默认为 0 不兑换
    CASH = process.env.QMYD_CASH || 0;
}
if ($.isNode() && process.env.QMYD_qmydTOKEN) {
    COOKIES_SPLIT = process.env.COOKIES_SPLIT || "\n";
    console.log(
        `============ cookies分隔符为：${JSON.stringify(
      COOKIES_SPLIT
    )} =============\n`
    );
    if (
        process.env.QMYD_qmydTOKEN &&
        process.env.QMYD_qmydTOKEN.indexOf(COOKIES_SPLIT) > -1
    ) {
        middleqmydTOKEN = process.env.QMYD_qmydTOKEN.split(COOKIES_SPLIT);
    } else {
        middleqmydTOKEN = process.env.QMYD_qmydTOKEN.split();
    }
}
if (COOKIE.qmydtokenVal) {
    QMYD_COOKIES = {
        "qmydtokenVal": COOKIE.qmydtokenVal.split('\n'),
    }
    Length = QMYD_COOKIES.qmydtokenVal.length;
}
if (!COOKIE.qmydtokenVal) {
    if ($.isNode()) {
        Object.keys(middleqmydTOKEN).forEach((item) => {
            if (middleqmydTOKEN[item]) {
                qmydtokenArr.push(middleqmydTOKEN[item]);
            }
        });
    } else {
        qmydtokenArr.push($.getdata("qmydtoken"));
        // 根据boxjs中设置的额外账号数，添加存在的账号数据进行任务处理
        if ("qmydCASH") {
            CASH = $.getval("qmydCASH") || '0';
        }
        let qmydCount = ($.getval('qmydCount') || '1') - 0;
        for (let i = 2; i <= qmydCount; i++) {
            if ($.getdata(`qmydtoken${i}`)) {
                qmydtokenArr.push($.getdata(`qmydtoken${i}`));
            }
        }
    }
    if (qmydtokenArr == '') {
        Length = 0
    } else Length = qmydtokenArr.length
}

function GetCookie() {
    if ($request && $request.url.indexOf("login") >= 0) {
        modifiedHeaders = $request.headers;
        modifiedHeaders['imei'] = udid()
        console.log(JSON.stringify(modifiedHeaders));
        $done({
            headers: modifiedHeaders
        });
    }
    if ($request && $request.url.indexOf("profile") >= 0) {

        const qmydtokenVal = $request.headers.Authorization;
        if (qmydtokenVal) {
            cookie()

            function cookie() {
                bodys = $.getdata('qmydtoken' + $.idx);
                 if (bodys) {
                    if (bodys.indexOf(qmydtokenVal) >= 0) {
                        $.log(
                            `[${$.name + $.idx}] qmydtokenVal已存在✅: qmydtokenVal: ${qmydtokenVal}`
                        );
                        $.msg($.name + $.idx, `qmydtokenVal已存在: 🎉`, ``);
                        $.done();
                    } else if ($.idx == '') {
                        $.idx = 2
                        cookie()
                    } else {
                        $.idx = $.idx + 1
                        cookie()
                    }
                } else {
                    {
                        $.setdata(qmydtokenVal, "qmydtoken" + $.idx);
                        $.log(
                            `[${$.name + $.idx}] 获取qmydtokenVal✅: 成功,qmydtokenVal: ${qmydtokenVal}`
                        );
                        $.msg($.name + $.idx, `获取qmydtokenVal: 成功🎉`, ``);

                        $.done();
                    }
                };
            }
        }
    }
}
console.log(
    `================== 脚本执行 - 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
  ).toLocaleString()} =====================\n`
);
console.log(
    `============ 共 ${Length} 个${$.name}账号=============\n`
);
//时间
nowTimes = new Date(
    new Date().getTime() +
    new Date().getTimezoneOffset() * 60 * 1000 +
    8 * 60 * 60 * 1000
);
//今天
Y = nowTimes.getFullYear() + '-';
M = (nowTimes.getMonth() + 1 < 10 ? '0' + (nowTimes.getMonth() + 1) : nowTimes.getMonth() + 1) + '-';
D = (nowTimes.getDate() < 10 ? '0' + (nowTimes.getDate()) : nowTimes.getDate());
ddtime = Y + M + D;
console.log(ddtime)
//当前时间戳
function tts(inputTime) {
    if ($.isNode()) {
        TTS = Math.round(new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000).toString();
    } else TTS = Math.round(new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString();
    return TTS;
};
//当前10位时间戳
function ts(inputTime) {
    if ($.isNode()) {
        TS = Math.round((new Date().getTime() +
            new Date().getTimezoneOffset() * 60 * 1000) / 1000).toString();
    } else TS = Math.round((new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000) / 1000).toString();
    return TS;
};
//今天0点时间戳时间戳
function daytime(inputTime) {
    if ($.isNode()) {
        DAYTIME =
            new Date(new Date().toLocaleDateString()).getTime() - 8 * 60 * 60 * 1000;
    } else DAYTIME = new Date(new Date().toLocaleDateString()).getTime();
    return DAYTIME;
};
//时间戳格式化日期
function time(inputTime) {
    if ($.isNode()) {
        var date = new Date(inputTime + 8 * 60 * 60 * 1000);
    } else var date = new Date(inputTime);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D + h + m + s;
};
//日期格式化时间戳
function timecs() {
    if ($.isNode()) {
        var date = new Date(newtime).getTime() - 8 * 60 * 60 * 1000
    } else var date = new Date(newtime).getTime()

    return date;
};
//随机udid 大写
function udid() {
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
}
//随机udid 小写
function udid2() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
//编码
function encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
}
//解码
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
    GetCookie()
    $.done();
} else {
    !(async () => {
        await all();
        await msgShow();
    })()
    .catch((e) => {
            $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done();
        })
}
async function all() {
    if (!Length) {
        $.msg(
            $.name,
            '提示：⚠️请点击前往获取 http://qmyd.yichengw.cn/?id=115796\n',
            ' http://qmyd.yichengw.cn/?id=115796', {
                "open-url": " http://qmyd.yichengw.cn/?id=115796"
            }
        );
        return;
    }
    for (let i = 0; i < Length; i++) {
        if (COOKIE.qmydtokenVal) {
            qmydtokenVal = QMYD_COOKIES.qmydtokenVal[i];
        }
        if (!COOKIE.qmydtokenVal) {
            qmydtokenVal = qmydtokenArr[i];
        }
        header = {
            'store': `appstore`,
            'Authorization': `${qmydtokenVal}`,
            'Connection': `keep-alive`,
            'Accept-Encoding': `gzip, deflate, br`,
            'version': `7`,
            'idfa': ``,
            'Content-Type': `application/x-www-form-urlencoded`,
            'User-Agent': `QMYD/43 CFNetwork/1206 Darwin/20.1.0`,
            'platform': `2`,
            'imei': ``,
            'Host': `qmyd.yichengw.cn`,
            'Accept-Language': `zh-cn`,
            'Accept': `*/*`
        };
        O = (`${$.name + (i + 1)}🔔`);
        await console.log(`-------------------------\n\n🔔开始运行【${$.name+(i+1)}】`)
        let cookie_is_live = await user(); //用户名
        if (!cookie_is_live) {
            continue;
        }
        await $.wait(1000)
        //await jinbi_record() //收益记录
        if (CZ >= 10) {
            await help_index() //助力活动
            await $.wait(1000)
            await home() //首页信息
            await zhuan_index() //任务列表
            await $.wait(1000)
            await pophongbaoyu() //红包雨
            await $.wait(1000)
            await dk_info() //打卡
            await $.wait(1000)
            await water_info() //喝水
            await $.wait(1000)
            await sleep_info() //睡觉
            await ggk() //刮刮卡
            await $.wait(8000)
            await lucky() //转盘抽奖
            await $.wait(1000)
            await lucky() //转盘抽奖
            await $.wait(1000)
            await news() //资讯赚
            await $.wait(1000)
            await lotteryindex() //抽手机
            await $.wait(1000)
            await cy_info() //答题
            await $.wait(1000)
            await tixian_html() //提现
        }


    }
}
//通知
function msgShow() {
    return new Promise(async resolve => {
        if (notifyInterval != 1) {
            console.log($.name + '\n' + $.message);
        }
        if (notifyInterval == 1) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 2 && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyInterval == 3 && (nowTimes.getHours() === 6 || nowTimes.getHours() === 12 || nowTimes.getHours() === 18 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10)) {
            $.msg($.name, ``, $.message);
        }
        if (notifyttt == 1 && $.isNode() && (nowTimes.getHours() === 12 || nowTimes.getHours() === 23) && (nowTimes.getMinutes() >= 0 && nowTimes.getMinutes() <= 10))
            await notify.sendNotify($.name, $.message);
        resolve()
    })
}
//用户名
function user(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/user/profile?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 用户名🚩: ${data}`);
                    $.user = JSON.parse(data);
                    if ($.user.uid) {
                        console.log(`\n${O}\n========== ${$.user.username} ==========\n微信绑定：${$.user.wx_username},今日收益：${$.user.day_jinbi/10000}元\n现金余额：${$.user.money}元,累计收益：${$.user.leiji_jinbi/10000}元\n`)
                        $.message += `\n${O}\n========== 【${$.user.username}】 ==========\n【微信绑定】：${$.user.wx_username},今日收益：${$.user.day_jinbi/10000}元\n【现金余额】：${$.user.money}元,累计收益：${$.user.leiji_jinbi/10000}元\n`;
                        resolve(true);
                    }
                    if (!$.user.uid) {
                        $.msg(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        if ($.isNode()) {
                            notify.sendNotify(O, time(Number(tts())) + "❌❌❌COOKIE失效");
                        }
                        resolve(false);
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


//收益记录
function jinbi_record(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://qmyd.yichengw.cn/apps/user/jinbi_record?`,
                    headers: header,
                    body: `page=1&page_limit=25&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 收益记录🚩: ${data}`);
                        $.jinbi_record = JSON.parse(data);
                        if ($.jinbi_record.code == 200) {
                            if ($.jinbi_record.data && $.jinbi_record.data[0] && $.jinbi_record.data[0].add_date) {
                                newtime = $.jinbi_record.data[0].add_date + 'T' + $.jinbi_record.data[0].add_time
                                CZ = ((tts() - timecs(newtime)) / 60000).toFixed(0)

                                console.log(`收益记录：距离上次收益${CZ}分钟，已限速10分钟\n`);
                                $.message += `【收益记录】：距离上次收益${CZ}分钟，已限速10分钟\n`;

                            }

                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}


//首页信息
function home(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/home?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页信息🚩: ${data}`);
                    $.home = JSON.parse(data);
                    if ($.home.lucky_jinbi) {
                        console.log(`首页信息：金币：${$.home.lucky_jinbi}金币,金币：${$.home.lucky_jinbi2}金币\n`);
                        $.message += `【首页信息】：金币：${$.home.lucky_jinbi}金币,金币：${$.home.lucky_jinbi2}金币\n`;
                        if ($.home.xuanfu_time) {
                            console.log(`红包等待：${$.home.xuanfu_time}秒\n`);
                            $.message += `【红包等待】：${$.home.xuanfu_time}秒\n`;
                        }
                        if ((!$.home.xuanfu_time || $.home.xuanfu_time <= 0) && $.home.xuanfu_st != 2) {
                            await xuanfu() //首页红包
                        }
                        if ($.home.lucky_jinbi != 0) {
                            lucky_pos = 1
                            await luckycoins() //首页金币1
                        }
                        if ($.home.lucky_jinbi2 != 0) {
                            lucky_pos = 2
                            await luckycoins() //首页金币2
                        }
                        if ($.home.xuanfu_st == 2) {
                            console.log(`首页红包：已完成\n`);
                            $.message += `【首页红包】：已完成\n`;
                        }
                        if ($.home.steps_btn_st == 1) {
                            await donejin() //步数奖励
                        }
                        if ($.home.jinbi > 0) {
                            collsteps() //步数金币
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//步数奖励
function donejin(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/donejin?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 步数奖励🚩: ${data}`);
                    $.donejin = JSON.parse(data);
                    if ($.donejin.code == 200) {
                        console.log(`步数奖励：${$.donejin.tip},${$.donejin.msg}\n`);
                        $.message += `【步数奖励】：${$.donejin.tip},${$.donejin.msg}\n`;
                        nonce_str = $.donejin.nonce_str
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//步数金币
function collsteps(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/collsteps?`,
                headers: header,
                body: `duihuan_dialog=0&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 步数金币🚩: ${data}`);
                    $.collsteps = JSON.parse(data);
                    if ($.collsteps.code == 200) {
                        console.log(`步数金币：${$.collsteps.jinbi}金币,${$.collsteps.msg}\n`);
                        $.message += `【步数金币】：${$.collsteps.jinbi}金币,${$.collsteps.msg}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//首页红包
function xuanfu(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/xuanfu?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页红包🚩: ${data}`);
                    $.xuanfu = JSON.parse(data);
                    if ($.xuanfu.code == 200) {
                        console.log(`首页红包：领取${$.xuanfu.jinbi}金币\n`);
                        $.message += `【首页红包】：领取${$.xuanfu.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//附加处理
function index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/index?`,
                headers: header,
                body: `nonce_str=${nonce_str}&tid=${tid}&pos=${pos}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 附加处理🚩:${data}`);
                    $.index = JSON.parse(data);
                    if ($.index.code == 200) {
                        console.log(`附加处理：成功\n`);
                        //$.message += `【附加处理】：成功\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//前置处理
function chuansj(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/chuansj?`,
                headers: header,
                body: `mini_pos=${mini_pos}&c_type=${c_type}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 前置处理🚩: ${data}`);
                    $.chuansj = JSON.parse(data);
                    if ($.chuansj.code == 200) {
                        console.log(`前置处理：成功\n`);
                        //$.message += `【前置处理】：成功\n`;
                        nonce_str = $.chuansj.nonce_str
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//首页金币
function luckycoins(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/luckycoins?`,
                headers: header,
                body: `lucky_pos=${lucky_pos}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 首页金币🚩: ${data}`);
                    $.luckycoins = JSON.parse(data);
                    if ($.luckycoins.code == 200) {
                        console.log(`首页金币：成功领取${$.luckycoins.jinbi}金币\n`);
                        $.message += `【首页金币】：成功领取${$.luckycoins.jinbi}金币\n`;
                    }
                    tid = 16
                    pos = 1
                    nonce_str = $.luckycoins.nonce_str
                    await index()
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//红包雨页
function pophongbaoyu(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/pophongbaoyu?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 红包雨页🚩: ${data}`);
                    $.pophongbaoyu = JSON.parse(data);
                    if ($.pophongbaoyu.code == 200) {
                        console.log(`红包雨：剩余${$.pophongbaoyu.hongbaoyu_count}次\n`);
                        $.message += `【红包雨】：剩余${$.pophongbaoyu.hongbaoyu_count}次\n`;
                        if ($.pophongbaoyu.hongbaoyu_count != 0) {
                            await hongbaoyu() //红包雨
                        }
                    }
                    if ($.pophongbaoyu.hongbaoyu_time) {
                        console.log(`红包雨：剩余${$.pophongbaoyu.hongbaoyu_time }秒\n`);
                        $.message += `【红包雨】：剩余${$.pophongbaoyu.hongbaoyu_time }秒\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//红包雨
function hongbaoyu(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://qmyd.yichengw.cn/apps/hongbaoyu?`,
                    headers: header,
                    body: `close=(null)&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 红包雨🚩: ${data}`);
                        $.hongbaoyu = JSON.parse(data);
                        if ($.hongbaoyu.code == 200) {
                            console.log(`红包雨：${$.hongbaoyu.jinbi}金币,${$.hongbaoyu.message}\n`);
                            $.message += `【红包雨】：${$.hongbaoyu.jinbi}金币,${$.hongbaoyu.message}\n`;
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//助力活动
function help_index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/help_index?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 助力活动🚩: ${data}`);
                    $.help_index = JSON.parse(data);
                    if ($.help_index.code == 200) {
                        console.log(`助力活动：现金${$.help_index.jinbi}元,差${$.help_index.diff_jinbi}元,时间剩余${($.help_index.time/3600).toFixed(0)}小时\n`);
                        $.message += `【助力活动】：现金${$.help_index.jinbi}元,差${$.help_index.diff_jinbi}元,时间剩余${($.help_index.time/3600).toFixed(0)}小时\n`;
                        nonce_str = $.help_index.nonce_str
                        if ($.help_index.diff_jinbi > 0 && $.help_index.btn_st == 0) {
                            await help_click()
                        } else {
                            console.log(`视频助力：今日已达到上限\n`);
                            $.message += `【视频助力】：今日已达到上限\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//视频助力
function help_click(timeout = 0) {
    return new Promise(async (resolve) => {
        mini_pos = 5
        c_type = 0
        await chuansj()
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/help_click?`,
                headers: header,
                body: `nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 视频助力🚩: ${data}`);
                    $.help_click = JSON.parse(data);
                    if ($.help_click.code == 200) {
                        console.log(`视频助力：${$.help_click.jinbi/10000}元,领取成功\n`);
                        $.message += `【视频助力】：${$.help_click.jinbi/10000}元,领取成功\n`;
                        tid = 15
                        pos = 1
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//每日签到
function signget(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/sign?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 每日签到🚩: ${data}`);
                    $.signget = JSON.parse(data);
                    if ($.signget.code == 200) {

                        console.log(`每日签到：领取${$.signget.jinbi}金币\n`);
                        $.message += `【每日签到】：领取${$.signget.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//任务列表
function zhuan_index(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/zhuan_index?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务列表🚩: ${data}`);
                    $.zhuan_index = JSON.parse(data);
                    if ($.zhuan_index.code == 200) {
                        sps = $.zhuan_index.renwu.find(item => item.type === 5);
                        dggs = $.zhuan_index.renwu.find(item => item.type === 14);
                        dks = $.zhuan_index.renwu.find(item => item.type === 6);
                        hss = $.zhuan_index.renwu.find(item => item.type === 7);
                        cjs = $.zhuan_index.renwu.find(item => item.type === 8);
                        csjs = $.zhuan_index.renwu.find(item => item.type === 10);
                        ggks = $.zhuan_index.renwu.find(item => item.type === 11);
                        ccys = $.zhuan_index.renwu.find(item => item.type === 12);
                        bss = $.zhuan_index.renwu.find(item => item.type === 13);
                        rwrw = $.zhuan_index.renwu.find(item => item.st === 1);
                        await $.wait(1000)

                        console.log(`看视频赚金币：${sps.text}${sps.jinbi}金币\n点广告赚金币：${dggs.text}${dggs.jinbi}金币\n${dks.title}：${dks.text}${dks.jinbi}金币\n${hss.title}：${hss.text}${hss.jinbi}金币\n${cjs.title}：${cjs.text}${cjs.jinbi}金币\n${csjs.title}：${csjs.text}${csjs.jinbi}金币\n${ggks.title}：${ggks.text}${ggks.jinbi}金币\n${ccys.title}：${ccys.text}${ccys.jinbi}金币\n${bss.title}：${bss.text}${bss.jinbi}金币\n`)
                        $.message += `【看视频赚金币】：${sps.text}${sps.jinbi}金币\n【点广告赚金币】：${dggs.text}${dggs.jinbi}金币\n【${dks.title}】：${dks.text}${dks.jinbi}金币\n【${hss.title}】：${hss.text}${hss.jinbi}金币\n【${cjs.title}】：${cjs.text}${cjs.jinbi}金币\n【${csjs.title}】：${csjs.text}${csjs.jinbi}金币\n【${ggks.title}】：${ggks.text}${ggks.jinbi}金币\n【${ccys.title}】：${ccys.text}${ccys.jinbi}金币\n【${bss.title}】：${bss.text}${bss.jinbi}金币\n`

                        if (sps.st == 0) {
                            await ssp() //视频任务
                        }
                        if (dggs.st == 0) {
                            await admobile_show() //广告任务
                        }
                        if ($.zhuan_index.is_sign_day == 1) {
                            console.log(`每日签到：已完成\n`)
                            $.message += `【每日签到】：已完成\n`;
                        } else {
                            await signget() //签到
                        }

                        if ($.zhuan_index.jindan_time) {
                            console.log(`金蛋时间：${$.zhuan_index.jindan_time}秒\n`);
                            $.message += `【金蛋时间】：${$.zhuan_index.jindan_time}秒\n`;
                        }
                        if ($.zhuan_index.box_time) {
                            console.log(`宝箱时间：${$.zhuan_index.box_time}秒\n`);
                            $.message += `【宝箱时间】：${$.zhuan_index.box_time}秒\n`;
                        }
                        if ($.zhuan_index.jindan_st == 0) {
                            await jindan_click() //金蛋
                        }
                        if ($.zhuan_index.box_st == 0) {
                            await box_click() //宝箱
                        }
                        if ($.zhuan_index.jindan_st == 2) {
                            console.log(`金蛋福利：已完成\n`);
                            $.message += `【金蛋福利】：已完成\n`;
                        }
                        if ($.zhuan_index.box_st == 2) {
                            console.log(`宝箱福利：已完成\n`);
                            $.message += `【宝箱福利】：已完成\n`;
                        }

                        if (rwrw && rwrw.jinbi && dggs.st == 2) {
                            taskid = rwrw.type
                            taskjinbi = rwrw.jinbi
                            await zhuan_done()
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//视频任务
async function ssp() {
    console.log(`视频任务：开始执行\n`);
    $.message += `【视频任务】：开始执行\n`;
    c_type = 0
    mini_pos = 0
    tid = 14
    pos = 1
    await chuansj()
    await index()
}
//激活广告
function admobile_show(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/admobile_show?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 激活广告🚩: ${data}`);
                    $.admobile_show = JSON.parse(data);
                    if ($.admobile_show.code == 200) {

                        await admobile_click() //点击广告
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//点击广告
function admobile_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/admobile_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 点击广告🚩: ${data}`);
                    $.admobile_click = JSON.parse(data);
                    if ($.admobile_click.code == 200) {
                        ad_id = $.admobile_click.ad_id
                        nonce_str = $.admobile_click.nonce_str
                        await admobile_done() //广告奖励
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//广告奖励
function admobile_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/admobile_done?`,
                headers: header,
                body: `nonce_str=${nonce_str}&ad_id=${ad_id}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 广告奖励🚩: ${data}`);
                    $.admobile_done = JSON.parse(data);
                    if ($.admobile_done.code == 200) {
                        console.log(`广告奖励：获得${$.admobile_done.jinbi}金币\n`);
                        $.message += `【广告奖励】：获得${$.admobile_done.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//早晚打卡页
function dk_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/dk_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 早晚打卡页🚩: ${data}`);
                    $.dk_info = JSON.parse(data);
                    if ($.dk_info.code == 200) {
                        now_time = $.dk_info.now_time
                        console.log(`早晚打卡页：${$.dk_info.day},${$.dk_info.title1}\n`);
                        $.message += `【早晚打卡页】：${$.dk_info.day},${$.dk_info.title1}\n`;
                        if ($.dk_info.is_dk == 0) {
                            await dk_click() //早晚打卡
                        }
                        if ($.dk_info.is_dk == 1) {
                            console.log(`早晚打卡：已完成\n`);
                            $.message += `【早晚打卡】：已完成\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//早晚打卡
function dk_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/dk_click?`,
                headers: header,
                body: `now_time=${now_time}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 早晚打卡🚩: ${data}`);
                    $.dk_click = JSON.parse(data);
                    if ($.dk_click.code == 200) {
                        console.log(`早晚打卡：获得${$.dk_click.jinbi}金币\n`);
                        $.message += `【早晚打卡】：获得${$.dk_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.dk_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//任务达成
function zhuan_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/zhuan_done?`,
                headers: header,
                body: `taskid=${taskid}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 任务达成🚩: ${data}`);
                    $.zhuan_done = JSON.parse(data);
                    if ($.zhuan_done.code == 200) {
                        console.log(`任务达成：获得${taskjinbi}金币\n`);
                        $.message += `【任务达成】：获得${taskjinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.zhuan_done.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//每天喝水
function water_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/water_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 每天喝水🚩: ${data}`);
                    $.water_info = JSON.parse(data);
                    if ($.water_info.code == 200) {
                        day_num = $.water_info.day_num
                        if ($.water_info.day_num <= 7 && $.water_info.next_time == 0) {
                            await water_click() //开始喝水
                        }
                        if ($.water_info.next_time) {
                            console.log(`每天喝水：已喝${$.water_info.day_num}杯\n`);
                            $.message += `【每天喝水】：已喝${$.water_info.day_num}杯\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//开始喝水
function water_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/water_click?`,
                headers: header,
                body: `day_num=${day_num}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 开始喝水🚩: ${data}`);
                    $.water_click = JSON.parse(data);
                    if ($.water_click.code == 200) {
                        console.log(`${$.water_click.msg}：获得${$.water_click.jinbi}金币\n`);
                        $.message += `【${$.water_click.msg}】：获得${$.water_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.water_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//睡觉状态
function sleep_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/sleep_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 睡觉状态🚩: ${data}`);
                    $.sleep_info = JSON.parse(data);
                    if ($.sleep_info.is_sleep == 1) {
                        console.log(`睡觉状态：做梦中\n`);
                        $.message += `【睡觉状态】：做梦中\n`;
                        if (nowTimes.getHours() === 7) {
                            await sleep_end()
                        }
                    }
                    if ($.sleep_info.is_sleep == 0) {
                        console.log(`睡觉状态：清醒中\n`);
                        $.message += `【睡觉状态】：清醒中\n`;
                        if (nowTimes.getHours() === 20) {
                            await sleep_start()
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//开始睡觉
function sleep_start(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/sleep_start?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 开始睡觉🚩: ${data}`);
                    $.sleep_start = JSON.parse(data);
                    if ($.sleep_start.code == 200) {
                        console.log(`开始睡觉：开始睡觉\n`);
                        $.message += `【开始睡觉】：开始睡觉\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//结束睡觉
function sleep_end(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/sleep_end?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 结束睡觉🚩: ${data}`);
                    $.sleep_end = JSON.parse(data);
                    if ($.sleep_end.code == 200) {
                        console.log(`结束睡觉：结束睡觉，产生${$.sleep_end.jinbi}金币\n`);
                        $.message += `【结束睡觉】：结束睡觉，产生${$.sleep_end.jinbi}金币\n`;
                        taskid = $.sleep_end.taskid
                        nonce_str = $.sleep_end.nonce_str
                        await sleep_done() //睡觉奖励
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//睡觉奖励
function sleep_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/sleep_done?`,
                headers: header,
                body: `taskid=${taskid}&nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 睡觉奖励🚩: ${data}`);
                    $.sleep_done = JSON.parse(data);
                    if ($.sleep_done.code == 200) {
                        console.log(`睡觉奖励：睡觉奖励领取${$.sleep_done.jinbi}金币\n`);
                        $.message += `【睡觉奖励】：睡觉奖励领取${$.sleep_done.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}


//刮刮卡
async function ggk() {
    for (let i = 0; i < 5; i++) {
        setTimeout(async () => {
            await gualist()
        }, i * 2000);
    }
}

//刮刮卡列表
function gualist(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/gua/index?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡列表🚩: ${data}`);
                    $.gualist = JSON.parse(data);
                    if ($.gualist.data.ka && $.gualist.data.ka >= 1) {
                        idlist = $.gualist.data.list.find(item => item.is_ad === 0);
                        id = idlist.id
                        console.log(`刮刮卡列表：剩余${$.gualist.data.ka}张，下一张${idlist.jine}元\n`);
                        $.message += `【刮刮卡列表】：剩余${$.gualist.data.ka}张，下一张${idlist.jine}元\n`;
                        await guadet() //刮卡
                    }
                    if ($.gualist.data.ka && $.gualist.data.ka == 0) {
                        console.log(`刮刮卡列表：剩余${$.gualist.data.ka}张，已完成\n`);
                        $.message += `【刮刮卡列表】：剩余${$.gualist.data.ka}张，已完成\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刮刮卡
function guadet(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {

            let url = {
                url: `https://qmyd.yichengw.cn/apps/gua/det?gid=${id}&`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡🚩: ${data}`);
                    $.guadet = JSON.parse(data);

                    if ($.guadet.jine) {
                        guacs = data.match(/x(\d+).png/g).length + 1

                        if (!guacs) {
                            console.log(`【刮刮卡查询】：开启${$.guadet.jine}元,抽中1等奖\n`)
                            $.message += `【刮刮卡查询】：开启${$.guadet.jine}元,抽中1等奖\n`;
                            console.log(`【刮刮卡领取】：成功领奖\n`)
                            $.message += `【刮刮卡领取】：成功领奖\n`;
                            sign = $.guadet.sign
                            glid = $.guadet.glid
                            await guapost() //刮卡奖励
                        }
                        if (guacs) {
                            console.log(`【刮刮卡查询】：开启${$.guadet.jine}元,抽中${guacs}等奖\n`)
                            $.message += `【刮刮卡查询】：开启${$.guadet.jine}元,抽中${guacs}等奖\n`;

                            if (guacs <= 3 && nowTimes.getHours() >= 0 && nowTimes.getHours() <= 17) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else if (guacs <= 4 && nowTimes.getHours() >= 18 && nowTimes.getHours() <= 22) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else if (guacs <= 5 && nowTimes.getHours() == 23) {
                                console.log(`【刮刮卡领取】：成功领奖\n`)
                                $.message += `【刮刮卡领取】：成功领奖\n`;
                                sign = $.guadet.sign
                                glid = $.guadet.glid
                                await guapost() //刮卡奖励
                            } else {
                                console.log(`【刮刮卡领取】：再来一次\n`)
                                $.message += `【刮刮卡领取】：再来一次\n`;
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//刮刮卡奖励
function guapost(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/gua/det_post?`,
                headers: header,
                body: `sign=${sign}&gid=${id}&glid=${glid}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 刮刮卡奖励🚩: ${data}`);
                    $.guapost = JSON.parse(data);
                    if ($.guapost.jf) {
                        console.log(`刮刮卡奖励：获得${$.guapost.jf}金币\n`);
                        $.message += `【刮刮卡奖励】：获得${$.guapost.jf}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.guapost.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//抽手机列表
function lotteryindex(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/lottery/index?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽手机列表🚩: ${data}`);
                    $.lotteryindex = JSON.parse(data);
                    if ($.lotteryindex.data.lottery_count) {

                        console.log(`抽手机列表：剩余${$.lotteryindex.data.lottery_count}次，手机碎片${$.lotteryindex.data.phone_part}个，红包碎片${$.lotteryindex.data.hongbao_part}个\n`);
                        $.message += `【抽手机列表】：剩余${$.lotteryindex.data.lottery_count}次，手机碎片${$.lotteryindex.data.phone_part}个，红包碎片${$.lotteryindex.data.hongbao_part}个\n`;
                        if ($.lotteryindex.data.lottery_count >= 1) {
                            await lotteryadd() //抽手机抽奖
                        }
                    }

                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//抽手机
function lotteryadd(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/lottery/add?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽手机🚩: ${data}`);
                    $.lotteryadd = JSON.parse(data);
                    if ($.lotteryadd.code == 200) {

                        add = $.lotteryindex.data.options.find(item => item.id === $.lotteryadd.data.id);

                        console.log(`抽手机：抽中 ${add.name}\n`);
                        $.message += `【抽手机】：抽中 ${add.name}\n`;

                        if ($.lotteryadd.data.id == 6) {
                            tid = 16
                            pos = 1
                            nonce_str = $.lotteryadd.data.nonce_str
                            await index()
                        }

                        await part()


                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//手机碎片任务
function part(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/part?part_pos=1&`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 手机碎片任务🚩: ${data}`);
                    $.part = JSON.parse(data);
                    if ($.part.code == 200) {
                        console.log(`手机碎片任务：达标${$.part.data.phone_keep_day}天，视频进度${$.part.data.video_jindu}\n`);
                        $.message += `【手机碎片任务】：达标${$.part.data.phone_keep_day}天，视频进度${$.part.data.video_jindu}\n`;

                        if ($.part.data.is_dabiao == 0 && $.lotteryindex.data.lottery_count == 0) {
                            await no_callback() //看视频
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//手机碎片任务视频
function no_callback(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/no_callback?`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O},手机碎片任务视频🚩: ${data}`);
                    $.no_callback = JSON.parse(data);
                    if ($.no_callback.code == 200) {
                        console.log(`手机碎片任务视频：成功\n`);
                        $.message += `【手机碎片任务视频】：成功\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//答题活动页
function cy_info(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/cy_info?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 答题活动页🚩: ${data}`);
                    $.cy_info = JSON.parse(data);
                    if ($.cy_info.code == 200) {
                        console.log(`答题活动页：剩余${$.cy_info.day_num}次\n`);
                        $.message += `【答题活动页】：剩余${$.cy_info.day_num}次\n`;
                        cy_id = $.cy_info.cy_id
                        site = $.cy_info.site
                        day_num = $.cy_info.day_num
                        if ($.cy_info.day_num >= 1) {
                            await cy_click() //答题       
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//答题活动
function cy_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/cy_click?`,
                headers: header,
                body: `cy_id=${cy_id}&site=${site}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 答题活动🚩: ${data}`);
                    $.cy_click = JSON.parse(data);
                    if ($.cy_click.code == 200) {
                        console.log(`答题成功：获得${$.cy_click.jinbi}金币\n`);
                        $.message += `【答题成功】：获得${$.cy_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.cy_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//转盘列表
function lucky(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/lucky?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘列表🚩: ${data}`);
                    $.lucky = JSON.parse(data);
                    if ($.lucky.lucky_num) {
                        console.log(`转盘列表：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`);
                        $.message += `【转盘列表】：剩余${$.lucky.lucky_num}次，已运行${$.lucky.lucky_count}次\n`;
                        if ($.lucky.lucky_num >= 1) {
                            await lucky_click() //转盘抽奖
                        }
                    }
                    if ($.lucky && $.lucky.lucky_box.indexOf('1') >= 0) {
                        box = $.lucky.lucky_box.indexOf('1') + 1
                        await lucky_box() //抽奖宝箱
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//转盘抽奖
function lucky_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/lucky_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 转盘抽奖🚩: ${data}`);
                    $.lucky_click = JSON.parse(data);
                    if ($.lucky_click.jinbi) {
                        console.log(`转盘抽奖：获得${$.lucky_click.jinbi}金币\n`);
                        $.message += `【转盘抽奖】：获得${$.lucky_click.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_click.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//抽奖宝箱
function lucky_box(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/lucky_box?`,
                headers: header,
                body: `box=${box}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 抽奖宝箱🚩: ${data}`);
                    $.lucky_box = JSON.parse(data);
                    if ($.lucky_box.jinbi) {
                        console.log(`抽奖宝箱：获得${$.lucky_box.jinbi}金币\n`);
                        $.message += `【抽奖宝箱】：获得${$.lucky_box.jinbi}金币\n`;
                        tid = 16
                        pos = 1
                        nonce_str = $.lucky_box.nonce_str
                        await index()
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}

//金蛋前置
function jindan_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/jindan_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 金蛋前置🚩: ${data}`);
                    $.jindan_click = JSON.parse(data);
                    if ($.jindan_click.code == 200) {
                        taskid = $.jindan_click.taskid
                        nonce_str = $.jindan_click.nonce_str
                        await jindan_done() //福利金蛋
                    }

                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//福利金蛋
function jindan_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://qmyd.yichengw.cn/apps/jindan_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利金蛋🚩: ${data}`);
                        $.jindan_done = JSON.parse(data);
                        if ($.jindan_done.code == 200) {
                            console.log(`福利金蛋：${$.jindan_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利金蛋】：${$.jindan_done.jinbi}金币,领取成功\n`;
                            nonce_str = $.jindan_done.nonce_str
                            tid = 16
                            pos = 1
                            await callback()
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}
//宝箱前置
function box_click(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/box_click?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 宝箱前置🚩: ${data}`);
                    $.box_click = JSON.parse(data);
                    if ($.box_click.code == 200) {
                        taskid = $.box_click.taskid
                        nonce_str = $.box_click.nonce_str
                        await box_done() //福利宝箱
                    }

                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//福利宝箱
function box_done(timeout = 0) {
    return new Promise(async (resolve) => {
        setTimeout(() => {
                let url = {
                    url: `https://qmyd.yichengw.cn/apps/box_done?`,
                    headers: header,
                    body: `taskid=${taskid}&clicktime=${ts()}&donetime=${ts()}&nonce_str=${nonce_str}&`,
                }
                $.post(url, async (err, resp, data) => {
                    try {
                        if (logs) $.log(`${O}, 福利宝箱🚩: ${data}`);
                        $.box_done = JSON.parse(data);
                        if ($.box_done.code == 200) {
                            console.log(`福利宝箱：${$.box_done.jinbi}金币,领取成功\n`);
                            $.message += `【福利宝箱】：${$.box_done.jinbi}金币,领取成功\n`;
                        }
                    } catch (e) {
                        $.logErr(e, resp);
                    } finally {
                        resolve()
                    }
                })
            },
            timeout)
    })
}

//资讯赚页
function news(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/news?type_class=1`,
                headers: header,
            }
            $.get(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚页🚩: ${data}`);
                    $.news = JSON.parse(data);
                    if ($.news.code == 200) {
                        console.log(`资讯赚页：今日获得${$.news.jinbi}金币\n`);
                        $.message += `【资讯赚页】：今日获得${$.news.jinbi}金币\n`;
                        if ($.news.is_max == 0) {
                            nonce_str = $.news.nonce_str
                            await news_done() //资讯赚
                        } else {
                            console.log(`资讯赚：完成\n`);
                            $.message += `【资讯赚】：完成\n`;
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//资讯赚
function news_done(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/news_done?`,
                headers: header,
                body: `nonce_str=${nonce_str}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 资讯赚🚩: ${data}`);
                    $.news_done = JSON.parse(data);
                    if ($.news_done.jinbi) {
                        console.log(`资讯赚：获得${$.news_done.jinbi}金币\n`);
                        $.message += `【资讯赚】：获得${$.news_done.jinbi}金币\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//提现页
function tixian_html(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/user/tixian_html?`,
                headers: header,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 提现页🚩: ${data}`);
                    $.tixian_html = JSON.parse(data);
                    if ($.tixian_html.tixian_html) {

                        jine5 = $.tixian_html.tixian_html.find(item => item.jine === '30');
                        jine6 = $.tixian_html.tixian_html.find(item => item.jine === '100');
                        jine7 = $.tixian_html.tixian_html.find(item => item.jine === '200');
                        jine8 = $.tixian_html.tixian_html.find(item => item.jine === '300');

                        day_tixian_tip = $.tixian_html.tixian_html.find(item => item.day_tixian_tip);
                        await $.wait(1000)
                        if (day_tixian_tip) {
                            console.log(`提现查询：今日已提现\n`);
                            $.message += `【提现查询】：今日已提现\n`;
                        }
                        if (jine5) {
                            console.log(`提现券：剩余${$.tixian_html.tixian_coupon}张券\n${jine5.jine}元：需要${jine5.cond}张券\n`);
                            $.message += `【提现券】：剩余${$.tixian_html.tixian_coupon}张券\n【${jine5.jine}元】：需要${jine5.cond}张券\n`;
                        }
                        if (jine6.fenshu_tixian_tip) {

                            fenshu6 = jine6.fenshu_tixian_tip.split('今日剩余')[1].split('份')[0]
                            fenshu7 = jine7.fenshu_tixian_tip.split('今日剩余')[1].split('份')[0]
                            fenshu8 = jine8.fenshu_tixian_tip.split('今日剩余')[1].split('份')[0]

                            console.log(`${jine6.jine}元：${jine6.fenshu_tixian_tip}\n${jine6.jine}元：${jine6.fenshu_tixian_tip}\n${jine6.jine}元：${jine6.fenshu_tixian_tip}\n`);
                            $.message += `【${jine6.jine}元】：${jine6.fenshu_tixian_tip}\n【${jine7.jine}元】：${jine7.fenshu_tixian_tip}\n【${jine8.jine}元】：${jine8.fenshu_tixian_tip}\n`;

                        }



                        if (!day_tixian_tip && ($.user.wx_username != "" || $.user.is_weixin == 1)) {


                            if (CASH == 30 && $.tixian_html.tixian_coupon >= 25 && $.user.money >= CASH) {
                                await tixian() //提现
                            }
                            if (CASH == 888) {
                                if ($.user.money >= 300 && fenshu8 >= 1) {
                                    CASH = 300
                                } else if ($.user.money >= 200 && fenshu7 >= 1) {
                                    CASH = 200
                                } else if ($.user.money >= 100 && fenshu6 >= 1) {
                                    CASH = 100
                                } else if ($.user.money > 30 && jine5 && $.tixian_html.tixian_coupon >= 25) {
                                    CASH = 30
                                }
                                if (CASH != 888) {
                                    await tixian() //提现
                                }
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
//现金提现
function tixian(timeout = 0) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let url = {
                url: `https://qmyd.yichengw.cn/apps/user/tixian?`,
                headers: header,
                body: `tx=${CASH}&`,
            }
            $.post(url, async (err, resp, data) => {
                try {
                    if (logs) $.log(`${O}, 现金提现🚩: ${data}`);
                    $.tixian = JSON.parse(data);
                    if ($.tixian.code == 200) {
                        console.log(`现金提现${CASH}：${$.tixian.tip}\n`);
                        $.message += `【现金提现${CASH}】：${$.tixian.tip}\n`;
                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            })
        }, timeout)
    })
}
// prettier-ignore
function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? {
                url: t
            } : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }
    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {}
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get({
                    url: t
                }, (t, s, i) => e(i))
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, ``).trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), a = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {
                        script_text: t,
                        mock_type: "cron",
                        timeout: r
                    },
                    headers: {
                        "X-Key": o,
                        Accept: "*/*"
                    }
                };
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}; {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {}; {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i)
                if (r = Object(r)[t], void 0 === r) return s;
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ``;
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, ``) : e
                } catch (t) {
                    e = ``
                }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = (() => {})) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => {
                const {
                    message: s,
                    response: i
                } = t;
                e(s, i, i && i.body)
            }))
        }
        post(t, e = (() => {})) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
                "X-Surge-Skip-Scripting": !1
            })), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            });
            else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                hints: !1
            })), $task.fetch(t).then(t => {
                const {
                    statusCode: s,
                    statusCode: i,
                    headers: r,
                    body: o
                } = t;
                e(null, {
                    status: s,
                    statusCode: i,
                    headers: r,
                    body: o
                }, o)
            }, t => e(t));
            else if (this.isNode()) {
                this.initGotEnv(t);
                const {
                    url: s,
                    ...i
                } = t;
                this.got.post(s, i).then(t => {
                    const {
                        statusCode: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    } = t;
                    e(null, {
                        status: s,
                        statusCode: i,
                        headers: r,
                        body: o
                    }, o)
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "H+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + ``).substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr((`` + e[s]).length)));
            return t
        }
        msg(e = t, s = ``, i = ``, r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
                    "open-url": t
                } : this.isSurge() ? {
                    url: t
                } : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = [``, "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h)
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}
