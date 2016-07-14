
var numTables = 0;
var tableStyle = { "border": "2px solid black", "border-collapse": "collapse", "padding": "100px" };
var rowStyle = { "border": "1px solid black", "border-collapse": "collapse", "padding": "5px", "text-align": "left"};

var dataArray = null;

function actOnResponse(response) {

    if(response && response.source) {
        
        dataArray = sourceToDataArr(JSON.parse(response.source))
        $("#result").html(dataArray);
        console.log(dataArray);
        localStorage["tableValues"] = JSON.stringify(dataArray);
        fillTableVals();
    } else {
        
        setTimeout(
            chrome.runtime.sendMessage({action: "getDataArray"}, actOnResponse), 250);
    }
}

$(document).ready( function() {

    console.log("calcjs ready");

    // chrome.runtime.onMessage.addListener(function(request, sender) {
    //   console.log("got a msg, action: " + request.action);
    //   if (request.action === "getDataArray") {
        
    //     // localStorage["tableValues"] = request.source;
    //     console.log("from popup.js:  " + (request.source));
    //     $("#result").html(JSON.parse(request.source));
    //     // addTables(JSON.parse(request.source));
    //   }
    // });

    // chrome.runtime.sendMessage({
    //     action: "getStuff",
    //     source: "stuff"
    // });

    chrome.runtime.sendMessage({action: "getDataArray"}, actOnResponse);

    // fillTableVals();
    // localStorage.clear();

    $("#submit").click( function() {
        calcGPA();
        storeGrades();
    });

    $(".addRow").click( function() {
        var id = $(this).attr("id");
        addRows(Array(4).fill(""), $("table#"+id), rowStyle, id);
        storeGrades();
    });

    $(".removeRow").click( function() {
        $(this).closest("tr").remove();
        storeGrades();
    });

    $("#addTable").click( function() {
        addTables([Array(16).fill("")]);
        if(!$("#removeTable").is(":visible")) {
            $("#removeTable").show();
            $("#submit").show();
        }

        storeGrades();
    });

    $("#removeTable").click( function() {
        $("table#" + (numTables-1)).remove();
        $("button#" + (numTables-1)).remove();
        numTables--;
        if(numTables == 0) {
            $(this).hide();
            $("#submit").hide();
        }

        storeGrades();
    });
});

function sourceToDataArr(source) {

    var terms = [];
    for (var i = 2; i < source.length; i+=5) {
     if(terms.indexOf(source[i]) === -1)
         terms.push(source[i]);
    }
    terms.sort(compareTerms);
    console.log("terms: " + terms);

    var dataArr = new Array(terms.length);
    for (var i = 0; i < terms.length; i++) {
        dataArr[i] = [];
    }

    for (var i = 0; i < source.length; i+=5) {
        var index = terms.indexOf(source[i + 2]);
        
        for (var j = 0; j < 5; j++) {
            if(j === 2)
                continue;
            // console.log((i+j) + "  push " + source[i+j] + " at index " + index);

            dataArr[index].push(source[i+j]);
            // if(j == 4)
                // console.log(dataArr[index]);
        }
        console.log("push " + source[i+2] + " at index " + index + "   [" + dataArr[0] + "]  [" + dataArr[1] + "]   [" + dataArr[2] + "]");
    }

    console.log("dataArr:  " + dataArr);

    return dataArr;
}

function compareTerms(first, second) {

    if(first === second)
        return 0;

    var firstYear = parseInt(first.substring(first.length-3));
    var secondYear = parseInt(second.substring(second.length-3));

    if (firstYear < secondYear)
        return -1;
    
    return 1;

}

function storeGrades() {

    var inputArray = [];
    $("input").each(function() {
        var id = $(this).attr("id");
        // console.log(id);
        // console.log(this);
        if(inputArray.length <= id) {
            inputArray[id] = [];
        }
        // console.log(inputArray.length)
        inputArray[id].push($(this).val())
    });

    localStorage["tableValues"] = JSON.stringify(inputArray);
    console.log(inputArray);
    
}

function fillTableVals() {

    var valString = localStorage["tableValues"];
    var dataArray = [];
    if (valString == null) {
        dataArray[0] = Array(16).fill("");
        // dataArray[1] = Array(16).fill("");

    } else {
        // console.log("valString: " + valString);
        dataArray = JSON.parse(valString);
    }

    addTables(dataArray);
}

//dataArray is 2d array
function addTables(dataArray) {

    console.log(dataArray.length);

    for (var i = 0; i < dataArray.length; i++) {

        var id = numTables + i;

        var table = $("<table></table>").attr("id", id);
        console.log("setting id: " + id);
        table.append("<caption><h3> Semester " + (id+1) + "</h3></caption>");
        // table.append("<col width='130'>");
        // table.append("<col width='130'>");
        var headingStyle = {"background-color": "#d9d9d9", "width" : "30px"};
        var headingRow = $("<tr></tr>").width(10);
        headingRow.append("<th>Course</th>").css(headingStyle);
        headingRow.append("<th>Description</th>").css(headingStyle);
        headingRow.append("<th>Grade</th>").css(headingStyle);
        headingRow.append("<th>Units</th>").css(headingStyle);
        headingRow.append("<th></th>").css(headingStyle);
        // var button = $("<button>X</button>").attr("id", id).addClass("removeTable");
        // var elem = $("<th></th>").append(button);
        // headingRow.append(elem).css(headingStyle);
        table.append(headingRow);
        table.css(tableStyle);

        console.log(dataArray); 

        addRows(dataArray[i], table, rowStyle, id)

        var div = $("#enterGrades");
        div.append(table);
        div.append($("<button>Add row</button>").addClass("addRow").attr("id", id));
        div.append("<br></br>");

    };
    numTables += dataArray.length;

}

function addRows(dataArray, table, style, id) {

    var numCols = 4;
    var count = 0;
    var widths = [100,200,50,50];
    var classNames = ["","","grade","units"];

    console.log(dataArray);

    for (var i = 0; i < dataArray.length / numCols; i++) {

        var row = $("<tr></tr>");
        for (var j = 0; j < numCols; j++) {

            var elem = $("<input type='text'>").attr("id",id)
                .addClass(classNames[j])
                .width(widths[j])
                .val(dataArray[count]);
            var col = $("<td></td>").append(elem);
            row.append(col);
            col.css(style);

            count++;
        }
        var elem = $("<button>X</button>").attr("id",id).addClass("removeRow")
        var col = $("<td></td>").append(elem);
        row.append(col);
        col.css(style);

        table.append(row);
    }
}

function calcGPA() {
    console.log("in calcGPA")

    var gradeList = $(".grade");
    var creditList = $(".units");
    var gradePoint = 0;
    var credits = 0;
    for (var i = 0; i < gradeList.length; i++) {

        var x = 0;
        switch(gradeList[i].value.toUpperCase()) {
            case "A+":
                x = 4.3;
                break;
            case "A":
                x = 4;
                break;
            case "A-":
                x = 3.7;
                break;
            case "B+":
                x = 3.3;
                break;
            case "B":
                x = 3;
                break;
            case "B-":
                x = 2.7;
                break;
            case "C+":
                x = 2.3;
                break;
            case "C":
                x = 2;
                break;
            case "C-":
                x = 1.7;
                break;
            case "D+":
                x = 1.3;
                break;
            case "D":
                x = 1;
                break;
            case "D-":
                x = 0.7;
                break;
            case "F":
                x = 0;
                break;
            default:
                x = -1;
        }
        var gp = (creditList[i].value == "") ? 0 : parseInt(creditList[i].value);
        if(x >= 0) {
            gradePoint += (x * gp);
            credits += gp;
        }
    };
    console.log("total credits: " + credits + "   total grade point: " + gradePoint);
    var gpa = (gradePoint/credits).toFixed(3)
    $("#result").html(gpa);
}

/*
Next step: Add new tables for diff semesters
- separate gpa for each sem, and cumulative at the end
- Web scraping

Bugs:
- cannot add/remove row to newly created table (must reload to add row)
*/




