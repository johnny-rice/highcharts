import*as e from"../../Core/Globals.js";var n={d:(e,i)=>{for(var s in i)n.o(i,s)&&!n.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:i[s]})},o:(e,n)=>Object.prototype.hasOwnProperty.call(e,n)};const i=JSON.parse('{"language":"zh-Hans","chartTitle":"图表标题","pieSliceName":"切片","seriesName":"系列 {add series.index 1}","yAxisTitle":"值","rangeSelector":{"monthText":"{count}个月","yearText":"{count}年","YTDText":"年初至今","allText":"查看全部","monthTitle":"查看 {count} {eq count 1}个月{else}个月{/eq}","yearTitle":"查看 {count} {eq count 1}年{else}年{/eq}","YTDTitle":"查看年初至今"},"viewFullscreen":"全屏查看","exitFullscreen":"退出全屏","printChart":"打印图表","downloadPNG":"下载 PNG 图片","downloadJPEG":"下载 JPEG 图片","downloadPDF":"下载 PDF 文档","downloadSVG":"下载 SVG 矢量图像","contextButtonTitle":"图表上下文菜单","loading":"加载中...","months":["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],"shortMonths":["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],"weekdays":["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],"decimalPoint":".","numericSymbols":["千","百万","十亿","兆","P","E"],"resetZoom":"重置缩放","resetZoomTitle":"重置缩放级别 1:1","thousandsSep":" ","rangeSelectorZoom":"缩放","rangeSelectorFrom":"从","rangeSelectorTo":"至","zoomIn":"放大","zoomOut":"缩小","downloadCSV":"下载 CSV","downloadXLS":"下载 XLS","exportData":{"annotationHeader":"注释","categoryHeader":"类别","categoryDatetimeHeader":"日期时间"},"viewData":"查看数据表","hideData":"隐藏数据表","exportInProgress":"正在导出...","accessibility":{"defaultChartTitle":"图表","chartContainerLabel":"{title}. Highcharts 交互式图表。","svgContainerLabel":"交互式图表","drillUpButton":"{buttonText}","credits":"图表致谢: {creditsStr}","thousandsSep":",","svgContainerTitle":"","graphicContainerLabel":"","screenReaderSection":{"beforeRegionLabel":"","afterRegionLabel":"","annotations":{"heading":"图表注释总结","descriptionSinglePoint":"{annotationText}. 关联至 {annotationPoint}","descriptionMultiplePoints":"{annotationText}. 关联至 {annotationPoint}{#each additionalAnnotationPoints}, 也关联至 {this}{/each}","descriptionNoPoints":"{annotationText}"},"endOfChartMarker":"交互式图表结束。"},"sonification":{"playAsSoundButtonText":"以声音播放, {chartTitle}","playAsSoundClickAnnouncement":"播放"},"legend":{"legendLabelNoTitle":"切换系列可见性, {chartTitle}","legendLabel":"图表图例: {legendTitle}","legendItem":"显示 {itemName}"},"zoom":{"mapZoomIn":"放大图表","mapZoomOut":"缩小图表","resetZoomButton":"重置缩放"},"rangeSelector":{"dropdownLabel":"{rangeTitle}","minInputLabel":"选择开始日期。","maxInputLabel":"选择结束日期。","clickButtonAnnouncement":"正在查看 {axisRangeDescription}"},"navigator":{"handleLabel":"{#eq handleIx 0}开始, 百分比{else}结束, 百分比{/eq}","groupLabel":"轴缩放","changeAnnouncement":"{axisRangeDescription}"},"table":{"viewAsDataTableButtonText":"以数据表形式查看, {chartTitle}","tableSummary":"图表的表格表示。"},"announceNewData":{"newDataAnnounce":"图表 {chartTitle} 的更新数据","newSeriesAnnounceSingle":"新数据系列: {seriesDesc}","newPointAnnounceSingle":"新数据点: {pointDesc}","newSeriesAnnounceMultiple":"图表 {chartTitle} 中的新数据系列: {seriesDesc}","newPointAnnounceMultiple":"图表 {chartTitle} 中的新数据点: {pointDesc}"},"seriesTypeDescriptions":{"boxplot":"箱形图通常用于显示一组统计数据。图表中的每个数据点最多可以有5个值：最小值、下四分位数、中位数、上四分位数和最大值。","arearange":"面积范围图是显示每个点的较低和较高值范围的线图。","areasplinerange":"这些图表是显示每个点的较低和较高值范围的线图。","bubble":"气泡图是每个数据点也具有大小值的散点图。","columnrange":"柱状范围图是显示每个点的较低和较高值范围的柱状图。","errorbar":"误差线系列用于显示数据的可变性。","funnel":"漏斗图用于分阶段显示数据的减少。","pyramid":"金字塔图由单个金字塔组成，其项目高度对应于每个点的值。","waterfall":"瀑布图是每个柱子都朝向总结束值贡献的柱状图。"},"chartTypes":{"emptyChart":"空图表","mapTypeDescription":"含有 {numSeries} 数据系列的 {mapTitle} 地图。","unknownMap":"含有 {numSeries} 数据系列的未指定区域地图。","combinationChart":"含有 {numSeries} 数据系列的组合图表。","defaultSingle":"含有 {numPoints} 数据 {#eq numPoints 1}点{else}点{/eq} 的图表。","defaultMultiple":"含有 {numSeries} 数据系列的图表。","splineSingle":"含有 {numPoints} 数据 {#eq numPoints 1}点{else}点{/eq} 的折线图。","splineMultiple":"含有 {numSeries} 线条的折线图。","lineSingle":"含有 {numPoints} 数据 {#eq numPoints 1}点{else}点{/eq} 的线图。","lineMultiple":"含有 {numSeries} 线条的线图。","columnSingle":"含有 {numPoints} {#eq numPoints 1}柱{else}柱{/eq} 的柱状图。","columnMultiple":"含有 {numSeries} 数据系列的柱状图。","barSingle":"含有 {numPoints} {#eq numPoints 1}柱{else}柱{/eq} 的条形图。","barMultiple":"含有 {numSeries} 数据系列的条形图。","pieSingle":"含有 {numPoints} {#eq numPoints 1}片{else}片{/eq} 的饼图。","pieMultiple":"含有 {numSeries} 个饼的饼图。","scatterSingle":"含有 {numPoints} {#eq numPoints 1}点{else}点{/eq} 的散点图。","scatterMultiple":"含有 {numSeries} 数据系列的散点图。","boxplotSingle":"含有 {numPoints} {#eq numPoints 1}箱{else}箱{/eq} 的箱形图。","boxplotMultiple":"含有 {numSeries} 数据系列的箱形图。","bubbleSingle":"含有 {numPoints} {#eq numPoints 1}个气泡{else}个气泡{/eq} 的气泡图。","bubbleMultiple":"含有 {numSeries} 数据系列的气泡图。"},"axis":{"xAxisDescriptionSingular":"图表有1个X轴显示 {names[0]}. {ranges[0]}","xAxisDescriptionPlural":"图表有 {numAxes} 个X轴显示 {#each names}{#unless @first},{/unless}{#if @last}和{/if} {this}{/each}。","yAxisDescriptionSingular":"图表有1个Y轴显示 {names[0]}. {ranges[0]}","yAxisDescriptionPlural":"图表有 {numAxes} 个Y轴显示 {#each names}{#unless @first},{/unless}{#if @last}和{/if} {this}{/each}。","timeRangeDays":"数据范围：{range} 天。","timeRangeHours":"数据范围：{range} 小时。","timeRangeMinutes":"数据范围：{range} 分钟。","timeRangeSeconds":"数据范围：{range} 秒。","rangeFromTo":"数据范围从 {rangeFrom} 到 {rangeTo}。","rangeCategories":"数据范围：{numCategories} 类别。"},"exporting":{"chartMenuLabel":"图表菜单","menuButtonLabel":"查看图表菜单, {chartTitle}"},"series":{"summary":{"default":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","defaultCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","line":"{series.name}, 线条 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","lineCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 线条带有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","spline":"{series.name}, 线条 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","splineCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 线条带有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","column":"{series.name}, 柱状系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}柱{else}柱{/eq}.","columnCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 柱状系列带有 {series.points.length} {#eq series.points.length 1}柱{else}柱{/eq}.","bar":"{series.name}, 柱状系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}柱{else}柱{/eq}.","barCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 柱状系列带有 {series.points.length} {#eq series.points.length 1}柱{else}柱{/eq}.","pie":"{series.name}, 饼图 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}片{else}片{/eq}.","pieCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 饼图带有 {series.points.length} {#eq series.points.length 1}片{else}片{/eq}.","scatter":"{series.name}, 散点图 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}点{else}点{/eq}.","scatterCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}, 散点图带有 {series.points.length} {#eq series.points.length 1}点{else}点{/eq}.","boxplot":"{series.name}, 箱线图 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}箱{else}箱{/eq}.","boxplotCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 箱线图带有 {series.points.length} {#eq series.points.length 1}箱{else}箱{/eq}.","bubble":"{series.name}, 气泡系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}气泡{else}气泡{/eq}.","bubbleCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 气泡系列带有 {series.points.length} {#eq series.points.length 1}气泡{else}气泡{/eq}.","map":"{series.name}, 地图 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}区域{else}区域{/eq}.","mapCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 地图带有 {series.points.length} {#eq series.points.length 1}区域{else}区域{/eq}.","mapline":"{series.name}, 线条 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","maplineCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 线条带有 {series.points.length} 数据 {#eq series.points.length 1}点{else}点{/eq}.","mapbubble":"{series.name}, 气泡系列 {seriesNumber} 共 {chart.series.length} 有 {series.points.length} {#eq series.points.length 1}气泡{else}气泡{/eq}.","mapbubbleCombination":"{series.name}, 系列 {seriesNumber} 共 {chart.series.length}. 气泡系列带有 {series.points.length} {#eq series.points.length 1}气泡{else}气泡{/eq}."},"description":"{description}","xAxisDescription":"X轴, {name}","yAxisDescription":"Y轴, {name}","nullPointValue":"无值","pointAnnotationsDescription":"{#each annotations}注释: {this}{/each}"}},"navigation":{"popup":{"simpleShapes":"简单形状","lines":"线条","circle":"圆形","ellipse":"椭圆形","rectangle":"矩形","label":"标签","shapeOptions":"形状选项","typeOptions":"详细","fill":"填充","format":"文本","strokeWidth":"线宽","stroke":"线条颜色","title":"标题","name":"名称","labelOptions":"标签选项","labels":"标签","backgroundColor":"背景颜色","backgroundColors":"背景颜色","borderColor":"边框颜色","borderRadius":"边框半径","borderWidth":"边框宽度","style":"风格","padding":"填充","fontSize":"字体大小","color":"颜色","height":"高度","shapes":"形状选项","segment":"段","arrowSegment":"箭头段","ray":"射线","arrowRay":"箭头射线","line":"线","arrowInfinityLine":"箭头线","horizontalLine":"水平线","verticalLine":"垂直线","crooked3":"弯曲3线","crooked5":"弯曲5线","elliott3":"艾略特3线","elliott5":"艾略特5线","verticalCounter":"垂直计数器","verticalLabel":"垂直标签","verticalArrow":"垂直箭头","fibonacci":"斐波那契","fibonacciTimeZones":"斐波那契时间区","pitchfork":"叉子","parallelChannel":"平行通道","infinityLine":"无限线","measure":"测量","measureXY":"测量 XY","measureX":"测量 X","measureY":"测量 Y","timeCycles":"时间周期","flags":"标志","addButton":"添加","saveButton":"保存","editButton":"编辑","removeButton":"移除","series":"系列","volume":"音量","connector":"连接器","innerBackground":"内部背景","outerBackground":"外部背景","crosshairX":"十字线 X","crosshairY":"十字线 Y","tunnel":"隧道","background":"背景","noFilterMatch":"无匹配项","searchIndicators":"搜索指标","clearFilter":"✕ 清除筛选","index":"索引","period":"周期","periods":"周期","standardDeviation":"标准偏差","periodTenkan":"天干周期","periodSenkouSpanB":"云图跨度B周期","periodATR":"平均真实范围周期","multiplierATR":"ATR倍数","shortPeriod":"短周期","longPeriod":"长周期","signalPeriod":"信号周期","decimals":"小数","algorithm":"算法","topBand":"上带","bottomBand":"下带","initialAccelerationFactor":"初始加速因子","maxAccelerationFactor":"最大加速因子","increment":"增量","multiplier":"乘数","ranges":"范围","highIndex":"高指数","lowIndex":"低指数","deviation":"偏差","xAxisUnit":"x轴单位","factor":"因子","fastAvgPeriod":"快速平均周期","slowAvgPeriod":"慢速平均周期","average":"平均","indicatorAliases":{"abands":["加速带"],"bb":["布林带"],"dema":["双指数移动平均"],"ema":["指数移动平均"],"ikh":["一目均衡表"],"keltnerchannels":["肯特纳通道"],"linearRegression":["线性回归"],"pivotpoints":["支点"],"pc":["价格通道"],"priceenvelopes":["价格信封"],"psar":["抛物线指标"],"sma":["简单移动平均"],"supertrend":["超级趋势"],"tema":["三重指数移动平均"],"vbp":["按价量"],"vwap":["成交量加权平均价"],"wma":["加权移动平均"],"zigzag":["之字形"],"apo":["绝对价格振荡器"],"ad":["累积/分布"],"aroon":["阿隆"],"aroonoscillator":["阿隆振荡器"],"atr":["平均真实范围"],"ao":["超棒振荡器"],"cci":["商品通道指数"],"chaikin":["蔡金"],"cmf":["蔡金资金流"],"cmo":["钱德动量振荡器"],"disparityindex":["差异指数"],"dmi":["趋向指标"],"dpo":["去趋势价格振荡器"],"klinger":["克林格振荡器"],"linearRegressionAngle":["线性回归角度"],"linearRegressionIntercept":["线性回归截距"],"linearRegressionSlope":["线性回归斜率"],"macd":["移动平均收敛/发散"],"mfi":["资金流量指数"],"momentum":["动量"],"natr":["归一化平均真实范围"],"obv":["能量潮"],"ppo":["价格振荡百分比"],"roc":["变化率"],"rsi":["相对强弱指数"],"slowstochastic":["慢速随机"],"stochastic":["随机振荡器"],"trix":["TRIX"],"williamsr":["威廉%R"]}}},"mainBreadcrumb":"主页","downloadMIDI":"下载 MIDI","playAsSound":"作为声音播放","stockTools":{"gui":{"simpleShapes":"简单形状","lines":"线条","crookedLines":"弯曲线条","measure":"测量","advanced":"高级","toggleAnnotations":"切换注释","verticalLabels":"垂直标签","flags":"标记","zoomChange":"缩放更改","typeChange":"类型更改","saveChart":"保存图表","indicators":"指标","currentPriceIndicator":"当前价格指标","zoomX":"缩放 X","zoomY":"缩放 Y","zoomXY":"缩放 XY","fullScreen":"全屏","typeOHLC":"OHLC","typeLine":"线型","typeCandlestick":"蜡烛图","typeHLC":"HLC","typeHollowCandlestick":"空心蜡烛图","typeHeikinAshi":"平均K线图","circle":"圆形","ellipse":"椭圆","label":"标签","rectangle":"矩形","flagCirclepin":"圆形标记","flagDiamondpin":"菱形标记","flagSquarepin":"方形标记","flagSimplepin":"简单标记","measureXY":"测量 XY","measureX":"测量 X","measureY":"测量 Y","segment":"段","arrowSegment":"箭头段","ray":"射线","arrowRay":"箭头射线","line":"线条","arrowInfinityLine":"无限线","horizontalLine":"水平线","verticalLine":"垂直线","infinityLine":"无限线","crooked3":"弯曲3线","crooked5":"弯曲5线","elliott3":"艾略特3线","elliott5":"艾略特5线","verticalCounter":"垂直计数器","verticalLabel":"垂直标签","verticalArrow":"垂直箭头","fibonacci":"斐波那契","fibonacciTimeZones":"斐波那契时间区","pitchfork":"叉子","parallelChannel":"平行通道","timeCycles":"时间周期"}},"noData":"没有数据显示"}');var s,t;(s={default:()=>e.default},t={},n.d(t,s),t).default.setOptions({lang:i,title:{text:i.chartTitle},yAxis:{title:{text:i.yAxisTitle}}});