
var numTables = 0;

$(document).ready( function() {

    fillTableVals();
    // localStorage.clear();

    $("#submit").click( function() {
        calcGPA();
        storeGrades();
    });

    $("#addRow").click( function() {
        addRows(Array(4).fill(""));
    })

    $("#addTable").click( function() {
        var dataArray = [];
        dataArray[0] = Array(16).fill("");
        addTables(dataArray);
    })
});

function storeGrades() {

    var inputArray = [];
    $("input").each(function() {
        var id = $(this).attr("id");
        console.log(id);
        console.log(this);
        if(inputArray.length <= id) {
            inputArray[id] = [];
        }
        console.log(inputArray.length)
        inputArray[id].push($(this).val())
    });

    localStorage["tableValues"] = JSON.stringify(inputArray);
    console.log(inputArray);
    console.log(JSON.stringify(inputArray));
    
}

function fillTableVals() {

    var valString = localStorage["tableValues"];
    var dataArray = [];
    if (valString == null) {
        dataArray[0] = Array(16).fill("");
        // dataArray[1] = Array(16).fill("");

    } else {
        console.log("valString: " + valString);
        dataArray = JSON.parse(valString);
    }
    console.log(dataArray);

    addTables(dataArray)
}

//dataArray is 2d array
function addTables(dataArray) {

    console.log(dataArray.length);

    for (var i = 0; i < dataArray.length; i++) {
        var table = $("<table style='width:100%'></table>").attr("id", numTables + i);
        console.log("setting id: " + table.attr("id"));
        table.append("<caption><b> Semester " + (numTables+i+1) + "</b></caption>");
        var headingStyle = {"background-color": "#d9d9d9"};
        var headingRow = $("<tr></tr>");
        headingRow.append("<th>Couse</th>").css(headingStyle);
        headingRow.append("<th>Description</th>").css(headingStyle);
        headingRow.append("<th>Grade</th>").css(headingStyle);
        headingRow.append("<th>Units</th>").css(headingStyle);
        table.append(headingRow).addClass("semesterTable");

        var tableStyle = { "border": "2px solid black", "border-collapse": "collapse", "padding": "15px" };
        var rowStyle = { "border-collapse": "collapse", "padding": "5px", "text-align": "left"};

        table.css(tableStyle);

        addRows(dataArray[i], table, rowStyle, table.attr("id"))

        $("#enterGrades").append(table);
        // $("#enterGrades").append("<button id='" + table.attr("id") + "' class='addRow'>Add another row!</button>");
    };
    numTables += dataArray.length;
}

function addRows(dataArray, table, style, id) {

    var numCols = 4;
    var $html = "";
    var count = 0;

    for (var i = 0; i < dataArray.length / numCols; i++) {

        var row = $("<tr></tr>");
        for (var j = 0; j < numCols; j++) {

            var className = "";
            if (j == 2) className = "grade";
            else if (j == 3) className = "units";

            var elem = $("<input type='text'>").attr("id",id).addClass(className).val(dataArray[count]);
            var col = $("<td></td>").append(elem);
            row.append(col);
            col.css(style);

            count++;
        }
        table.append(row);
    }
    table.append($html);
}

function calcGPA() {
    console.log("in calcGPA")

    var gradeList = $(".grade");
    var creditList = $(".units");
    var gradePoint = 0;
    var credits = 0;
    for (var i = 0; i < gradeList.length; i++) {
        // stuff += gradeList[i].value + "\n";

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
            default:
                x = 0;
        }
        var gp = (creditList[i].value == "") ? 0 : parseInt(creditList[i].value);
        gradePoint += (x * gp);
        credits += gp;
    };
    console.log("total credits: " + credits + "   total grade point: " + gradePoint);
    var gpa = (gradePoint/credits).toFixed(3)
    $("#result").html(gpa);
}

/*
Next step: Add new tables for diff semesters
- separate gpa for each sem, and cumulative at the end
- each table should have add new row (and remove row)
- label each table (by semester)
- data should be stored as array of arrays (big one for diff semesters, small arr for actual grades)
*/




