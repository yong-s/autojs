/**
 * 自动刷单小红书
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
        exit();
    }

    for (i=1; i<134; i++)  {
        perTask(i);
    };

}

// 去任务页面
function goTask(){
    toastLog("去任务页面");
    // 关闭弹窗
    setScreenMetrics(1080, 1920);
    click(545, 1482);
    sleep(random(3000, 5000));
    let taskui = className("android.view.View").text("任务").findOne(3000);
    if (taskui != null) {
        taskui.click();
        sleep(3000);
    } else {
        toastLog("没找到");
        exit();
    }
}

// 领取任务
function getTask(i) {
    try {
        toastLog("开始领取第"+i+"个任务");
        let gettask = text("领取").findOne(3000);
        if (gettask != null) {
             gettask.click();
             sleep(3000);
            }
        else {
                toastLog("没找到");
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
        let gomytask = className("android.view.View").text("我的任务").findOne(3000);
        if (gomytask != null) {
            gomytask.click();
            sleep(3000);
        }else {
            toastLog("没找到");
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
            sleep(1000);
            let gowc = className("android.view.View").text("去完成").findOne(5000);
            if (gowc !=null ) {
                gowc.click();
                sleep(3000);
            }else {
                toastLog("没找到");
                exit();
            }
            
            // 去小红书
            toastLog("去小红书");
            sleep(1000);
            let gorb =  className("android.view.View").text("去完成").findOne(5000);
            if (gorb !=null ) {
                gorb.click();
                sleep(5000);
            } else {
                toastLog("没找到");
                exit();
            }
           
            // 小红书评论
            toastLog("开始评论");
            let betalk = id("com.xingin.xhs:id/bn1").findOne(5000);
            if (betalk !=null) {
                betalk.click();
                sleep(3000);
            }else {
                toastLog("没找到");
                exit();
                return false;
            }
            // 输入内容
            // toastLog("输入评论内容");
            let sett = id("com.xingin.xhs:id/c7j").findOne(5000);
            if (sett !=null) {
                sett.setText("我好喜欢噢"+ random(0, 1000));
                sleep(3000);
                let sent = id("com.xingin.xhs:id/cg2").findOne(5000);
                    if (sent !=null) {
                        sent.click();
                        sleep(1000);
                        log("评论完成");
                    }else {
                        toastLog("没找到");
                        // sendMes("没找到,请看日志");
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
            sleep(random(3000, 5000));

            // 提交任务
            toastLog("提交任务");
            sleep(random(1000, 3000));
            let pushtask = className("android.view.View").text("提交").findOne(5000);
            if (pushtask !=null) {
                pushtask.click();
                sleep(3000);
            } else {
                toastLog("没找到");
                // sendMes("没找到,请看日志");
                exit();
                return false;
            }
            
            setScreenMetrics(1080, 1920);
            click(185, 1350);

            let file = text("图库").findOne(5000);
            click(file.bounds().centerX(), file.bounds().centerY());
            sleep(random(3000, 5000));

            click(410, 502);
            sleep(random(3000, 5000));

            let okey = text("确定").findOne(5000);
            click(okey.bounds().centerX(), okey.bounds().centerY());
            sleep(random(3000, 8000));


            let pu1 = className("android.view.View").text("提交").clickable(true).depth(8).findOne(5000);
            let pu2 = className("android.view.View").text("提交").clickable(true).depth(15).findOne(5000);
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
                    // sendMes("没找到,请看日志");
                    exit();
                    return false;
                }
            }
            
            click(55, 133);

    } catch (e) {
        return false;
    }
}

// 截屏
function catScreen() {
    let img = captureScreen();
    let path = "/sdcard/redbook.jpg";
    images.save(img, path, "jpg", 50);
    media.scanFile(path);
    toastLog("截图完成");
    sleep(3000);
}

// 推送通知
// function sendMes(d) {

//     let key = "SCT13210TOaMHT7LKlfbv0Tiao1jaoM3Z";
//     let url = "https://sctapi.ftqq.com/" + key + ".send";
//     let title = "小红书刷单";
//     let desp = d;

//     r = http.post(url, {
//         title: title,
//         desp: desp
//     })
//     toastLog(r.body.string());
// }