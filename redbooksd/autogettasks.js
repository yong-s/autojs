/**
 * 自动刷单小红书--领取任务for小米4
 * auth:ys
 * QQ：861443216
 */

auto.waitFor();
// console.show();
let appName = "小红书达人";
launchApp(appName);
sleep(5000);

main();
// 主程序
function main() {
    goTask();

    for (i=1; i<134; i++)  {
        getTask(i);
    };
    
    sleep(5000);
    toastLog("领取任务完成，去执行任务");
    goautoperTask();

    
    
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

// 去执行任务
function goautoperTask() {
    
    let scriptsPath = "/sdcard/脚本/";
    if(!files.exists(scriptsPath)){
        scriptsPath = "/sdcard/Scripts/";
    }
    let scriptFiles = "autoperTask.js";
    
    let path = files.join(scriptsPath, scriptFiles);
    engines.execScriptFile(path);

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