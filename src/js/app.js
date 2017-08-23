'use strict';

var model = {
    inputval:ko.observable(),
    items: ko.observableArray(),
    infoWindow: undefined
};



function init(){
    // 创建地图对象
    var map = new AMap.Map('container', {
        center: [116.397428, 39.90923],
        zoom: 11
    });

    map.plugin(["AMap.ToolBar"], function() {
        // 添加 工具条
        map.addControl(new AMap.ToolBar());
    });

    // 创建标记集合
    var markers = [
        {title: '天安门', position: [116.39756, 39.908808]},
        {title: '前门', position: [116.397994,39.900085]},
        {title: '天坛公园', position: [116.410886,39.881998]},
        {title: '颐和园', position: [116.272852,39.992273]},
        {title: '鸟巢', position: [116.396203,39.993575]}
    ];

    // 创建 默认信息窗体
    var infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
    // 构建标记
    markers.forEach(function(marker) {
        var newMarker = new AMap.Marker({
            map: map,
            position: [marker.position[0], marker.position[1]],
            title: marker.title,
            offset: new AMap.Pixel(-12,-36)
        });
        newMarker.content = '我是' + marker.title;
        // 为标记绑定 点击事件
        newMarker.on('click', markerClick);
    });

    // 点击事件方法主体
    function markerClick(e) {
        infoWindow.setContent(e.target.content);
        infoWindow.open(map, e.target.getPosition());
    }
    // 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别
    map.setFitView();
}
