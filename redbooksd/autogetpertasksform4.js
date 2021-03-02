/**
 * 自动刷单小红书--领取任务for小米4
 * auth:ys
 * QQ：861443216
 */

auto.waitFor();
// console.show();
let appName = "小红书达人";
launchApp(appName);
sleep(random(5000, 8000));

main();
// 主程序
function main() {
    goTask();

    for (i=1; i<134; i++)  {
        getTask(i);
    };
    sleep(5000);
    toastLog("领取任务完成，去执行任务");

    gomyTask();
    
    // 请求截图权限
    if(!requestScreenCapture()){
        toastLog("请求截图失败");
        sendMes("请求截图失败");
        exit();
    }

    for (i=1; i<134; i++)  {
        perTask(i);
    };

}

// 去任务页面
function goTask(){
    toastLog("去任务页面");
    let taskui = className("android.view.View").desc("任务").findOne(3000);
    if (taskui != null) {
        taskui.click();
        sleep(3000);
    } else {
        toastLog("没找到");
        sendMes("没找到,请看日志");
        exit();
    }
}

// 领取任务
function getTask(i) {
    try {
        toastLog("开始领取第"+i+"个任务");
        let gettask = desc("领取").findOne(3000);
        if (gettask != null) {
             gettask.click();
             sleep(3000);
            }
        else {
                toastLog("没找到");
                sendMes("没找到,请看日志");
                exit();
            }
    } catch (e) {
        return false;
    }
}

// 去我的任务
function gomyTask() {
    try {
        toastLog("去我的任务");
        let gomytask = className("android.view.View").desc("我的任务").findOne(3000);
        if (gomytask != null) {
            gomytask.click();
            sleep(3000);
        }else {
            toastLog("没找到");
            sendMes("没找到,请看日志");
            exit();
        } 
    } catch (e) {
        return false;
    } 
}

// 执行任务
function perTask(i) {
    try {
            //去完成
            toastLog("开始执行第"+i+"个任务");
            let gowc = className("android.view.View").desc("去完成").findOne(5000);
            if (gowc !=null ) {
                gowc.click();
                sleep(3000);
            }else {
                toastLog("没找到");
                sendMes("没找到,请看日志");
                exit();
            }
            
            // 去小红书
            toastLog("去小红书");
            let gorb =  className("android.view.View").desc("去完成").findOne(5000);
            if (gorb !=null ) {
                gorb.click();
                sleep(5000);
            } else {
                toastLog("没找到");
                sendMes("没找到,请看日志");
                exit();
            }
          

            // 小红书评论
            toastLog("开始评论");
            let betalk = id("bn9").findOne(5000);
            if (betalk !=null) {
                betalk.click();
                sleep(3000);
            }else {
                toastLog("没找到");
                sendMes("没找到,请看日志");
                exit();
                return false;
            }
            // 输入内容
            // toastLog("输入评论内容");
            let sett = id("c80").findOne(6000);
            if (sett !=null) {
             sett.setText("我好喜欢噢"+ random(0, 1000));
             sleep(3000);
             let sent = id("cgi").findOne(5000);
                if (sent !=null) {
                    sent.click();
                    sleep(1000);
                    log("评论完成");
                }else {
                    toastLog("没找到");
                    sendMes("没找到,请看日志");
                    exit();
                    return false;
                }
            }else {
                toastLog("没找到，任务异常，开始截图");
                sleep(3000);
            }
            
            //请求截图
            catScreen();
            

            toastLog("返回小红书达人");
            sleep(3000);
            launchApp(appName);
            sleep(3000);

            // 提交任务
            toastLog("提交任务");
            sleep(random(1000, 3000));
            let pushtask = className("android.view.View").desc("提交").findOne(5000);
            if (pushtask !=null) {
                pushtask.click();
                sleep(3000);
            } else {
                toastLog("没找到");
                sendMes("没找到,请看日志");
                exit();
                return false;
            }
            
            var ra = new RootAutomator();
            ra.press(188, 1350, 100);
            sleep(random(3000, 5000));

            ra.press(676, 1530, 100);
            sleep(random(3000, 5000));

            ra.press(130, 611, 100);
            sleep(random(5000, 10000));


            let pu1 = className("android.view.View").desc("提交").clickable(true).depth(8).findOne(5000);
            let pu2 = className("android.view.View").desc("提交").clickable(true).depth(15).findOne(5000);
            if (pu1 !=null) {
                pu1.click();
                sleep(3000);
                toastLog("提交成功");
            } else {
                if (pu2 !=null) {
                    pu2.click();
                    toastLog("提交成功");
                    sleep(3000);    
                } else {
                    toastLog("没找到");
                    sendMes("没找到,请看日志");
                    exit();
                    return false;
                }
            }
            
            ra.press(63, 142, 100);
            ra.exit();
            sleep(random(3000, 5000));

    } catch (e) {
        return false;
    }
}

// 截屏
function catScreen() {
    let img = captureScreen();
    images.saveImage(img, "/sdcard/DCIM/Camera/1.png");
    toastLog("截图完成");
    sleep(3000);
}

// 推送通知
function sendMes(d) {

    let key = "SCT13210TOaMHT7LKlfbv0Tiao1jaoM3Z";
    let url = "https://sctapi.ftqq.com/" + key + ".send";
    let title = "小红书刷单";
    let desp = d;

    r = http.post(url, {
        title: title,
        desp: desp
    })
    toastLog(r.body.string());
}