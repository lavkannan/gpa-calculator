
var numTables = 0;
var tableStyle = { "border": "2px solid black", "border-collapse": "collapse", "padding": "100px" };
var rowStyle = { "border": "1px solid black", "border-collapse": "collapse", "padding": "5px", "text-align": "left"};

$(document).ready( function() {

    fillTableVals();
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
            console.log("button is not visible");
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

    addTables(dataArray)
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
bugs
- cannot add/remove row to newly created table (must reload to add row)
*/




