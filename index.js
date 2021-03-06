var _ = require('underscore'),
    fs = require('fs');

var config = {};
try {
    config = require('./config');
} catch(error) {
    try {
        config = require('./defaultConfig');
    } catch(error) {
        console.log('配置文件读取失败，请确定 ./config.json 或者 ./defaultConfig.json 是否存在');
        return;
    }
}
var provinceList = config.merge ? require('./src/allArea_marge') : require('./src/allArea_separate');

var result = [];
var key = config.key ? config.key : 'des';

_.each(config.provinceList, function(item) {
    var temp = _.find(provinceList, function(province) {
        return item == province[key];
    });
    if (temp) {
        result.push(temp);
    } else {
        console.log(item + '不在数据列表中，请确定name 或者 code 是否错误');
    }
});

fs.writeFile('output/' + config.outputFileName + '.json', JSON.stringify(result), function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('save success');
    }
});
