/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.9395833333333333, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Achivements-0"], "isController": false}, {"data": [1.0, 500, 1500, "Achivements-1"], "isController": false}, {"data": [0.9, 500, 1500, "About Us-1"], "isController": false}, {"data": [1.0, 500, 1500, "About Us-0"], "isController": false}, {"data": [1.0, 500, 1500, "Academics-0"], "isController": false}, {"data": [1.0, 500, 1500, "Infrastructure-0"], "isController": false}, {"data": [1.0, 500, 1500, "Gallery-1"], "isController": false}, {"data": [1.0, 500, 1500, "Infrastructure-1"], "isController": false}, {"data": [1.0, 500, 1500, "Achivements"], "isController": false}, {"data": [1.0, 500, 1500, "Gallery-0"], "isController": false}, {"data": [1.0, 500, 1500, "Home-0"], "isController": false}, {"data": [0.5, 500, 1500, "Home-1"], "isController": false}, {"data": [0.85, 500, 1500, "About Us"], "isController": false}, {"data": [1.0, 500, 1500, "Contact Us-0"], "isController": false}, {"data": [1.0, 500, 1500, "Events-0"], "isController": false}, {"data": [1.0, 500, 1500, "Events-1"], "isController": false}, {"data": [1.0, 500, 1500, "Contact Us-1"], "isController": false}, {"data": [0.9, 500, 1500, "Academics"], "isController": false}, {"data": [1.0, 500, 1500, "Events"], "isController": false}, {"data": [0.9, 500, 1500, "Academics-1"], "isController": false}, {"data": [1.0, 500, 1500, "Gallery"], "isController": false}, {"data": [1.0, 500, 1500, "Infrastructure"], "isController": false}, {"data": [1.0, 500, 1500, "Contact Us"], "isController": false}, {"data": [0.5, 500, 1500, "Home"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 240, 0, 0.0, 243.20416666666668, 79, 1569, 137.5, 665.8000000000004, 976.8499999999999, 1466.65, 55.504162812210915, 625.0, 9.86499768732655], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Achivements-0", 10, 0, 0.0, 95.6, 86, 134, 88.5, 130.70000000000002, 134.0, 134.0, 6.138735420503377, 6.792175030693677, 0.8332853744628607], "isController": false}, {"data": ["Achivements-1", 10, 0, 0.0, 98.10000000000001, 79, 136, 96.0, 132.60000000000002, 136.0, 136.0, 6.119951040391677, 73.70237913096696, 0.8307355416156671], "isController": false}, {"data": ["About Us-1", 10, 0, 0.0, 367.9, 92, 1481, 107.5, 1468.5, 1481.0, 1481.0, 5.955926146515783, 103.76340083382966, 0.7852051072066706], "isController": false}, {"data": ["About Us-0", 10, 0, 0.0, 125.39999999999999, 88, 178, 128.0, 173.20000000000002, 178.0, 178.0, 13.927576601671309, 15.355697249303622, 1.8361551183844012], "isController": false}, {"data": ["Academics-0", 10, 0, 0.0, 131.70000000000002, 89, 254, 98.0, 247.00000000000003, 254.0, 254.0, 5.841121495327102, 6.451473057827103, 0.7814781688084113], "isController": false}, {"data": ["Infrastructure-0", 10, 0, 0.0, 98.5, 79, 134, 89.0, 133.9, 134.0, 134.0, 5.995203836930456, 6.650929256594725, 0.8313661570743406], "isController": false}, {"data": ["Gallery-1", 10, 0, 0.0, 99.19999999999999, 81, 144, 92.0, 142.0, 144.0, 144.0, 5.807200929152149, 96.5163599738676, 0.7655977787456446], "isController": false}, {"data": ["Infrastructure-1", 10, 0, 0.0, 94.0, 80, 103, 94.0, 102.7, 103.0, 103.0, 5.959475566150179, 100.28679976162098, 0.8264116507747319], "isController": false}, {"data": ["Achivements", 10, 0, 0.0, 193.8, 179, 270, 187.5, 261.90000000000003, 270.0, 270.0, 5.807200929152149, 76.36128956155633, 1.5765643147502904], "isController": false}, {"data": ["Gallery-0", 10, 0, 0.0, 107.1, 81, 150, 92.5, 149.8, 150.0, 150.0, 5.797101449275362, 6.391530797101449, 0.764266304347826], "isController": false}, {"data": ["Home-0", 10, 0, 0.0, 210.2, 144, 455, 163.5, 435.6000000000001, 455.0, 455.0, 8.264462809917356, 9.095751549586778, 1.0734116735537191], "isController": false}, {"data": ["Home-1", 10, 0, 0.0, 777.7999999999998, 538, 977, 782.5, 976.7, 977.0, 977.0, 6.570302233902759, 142.74366581800263, 0.8533693331143233], "isController": false}, {"data": ["About Us", 10, 0, 0.0, 493.90000000000003, 229, 1569, 240.5, 1556.7, 1569.0, 1569.0, 5.530973451327434, 102.45804238108407, 1.4583621404867255], "isController": false}, {"data": ["Contact Us-0", 10, 0, 0.0, 101.39999999999999, 82, 137, 92.0, 136.8, 137.0, 137.0, 5.797101449275362, 6.4028532608695645, 0.775588768115942], "isController": false}, {"data": ["Events-0", 10, 0, 0.0, 125.39999999999999, 87, 180, 114.0, 178.6, 180.0, 180.0, 5.753739930955121, 6.3381041426927505, 0.7529308112773303], "isController": false}, {"data": ["Events-1", 10, 0, 0.0, 109.80000000000001, 88, 180, 98.0, 174.40000000000003, 180.0, 180.0, 5.803830528148578, 81.76372968659315, 0.7594856355194428], "isController": false}, {"data": ["Contact Us-1", 10, 0, 0.0, 99.2, 82, 137, 93.0, 136.5, 137.0, 137.0, 5.757052389176741, 75.93237262521589, 0.7702306419113414], "isController": false}, {"data": ["Academics", 10, 0, 0.0, 406.8, 186, 1299, 283.0, 1236.3000000000002, 1299.0, 1299.0, 5.405405405405405, 83.68348817567568, 1.4463682432432432], "isController": false}, {"data": ["Events", 10, 0, 0.0, 235.8, 181, 289, 239.0, 288.8, 289.0, 289.0, 5.458515283842795, 82.91186203602619, 1.4285957969432315], "isController": false}, {"data": ["Academics-1", 10, 0, 0.0, 274.9, 87, 1210, 124.0, 1147.2000000000003, 1210.0, 1210.0, 5.704506560182544, 82.01342341699943, 0.7632005847119224], "isController": false}, {"data": ["Gallery", 10, 0, 0.0, 206.6, 177, 268, 187.5, 265.1, 268.0, 268.0, 5.512679162072767, 97.6993178059537, 1.4535384509371554], "isController": false}, {"data": ["Infrastructure", 10, 0, 0.0, 192.89999999999998, 167, 232, 189.0, 231.8, 232.0, 232.0, 5.662514156285391, 101.5713476783692, 1.5704629105322763], "isController": false}, {"data": ["Contact Us", 10, 0, 0.0, 201.1, 170, 275, 185.0, 273.1, 275.0, 275.0, 5.488474204171241, 78.45195012349066, 1.4685956366630077], "isController": false}, {"data": ["Home", 10, 0, 0.0, 989.8, 755, 1212, 980.5, 1211.7, 1212.0, 1212.0, 5.691519635742743, 129.91560543540126, 1.478461155378486], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 240, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
