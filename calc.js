
// document.addEventListener('DOMContentLoaded', function() {
//     document.getElementById('submit').addEventListener('click', function() {
//         // calcGPA();
//         // storeGrades();
//         // var x = chrome.storage.sync.get("value", function() {});
//         // localStorage["value"] = "A";
//         var x = localStorage["value"];
//         document.getElementById("result").textContent = x;

//     });
//     var link = document.getElementById('addRow');
//     link.addEventListener('click', function() {
//     	// var id = link.id;
//         addRow();
//     });
// });

$(document).ready( function() {

    fillTableVals();

    // chrome.storeGrades.sync.clear();

    // chrome.storage.sync.set({"key": "value"}, function() {
    //     console.log("Saved", key, value);
    // });
    // localStorage["key"] = "value";

    // var value;
    // chrome.storage.sync.get("key", function (obj) {
    //     console.log("key", obj);
    //     value = obj;
    // });
    // var value = localStorage["key"];

    // $("#id1").val(value);

    $("#submit").click( function() {
        calcGPA();
        storeGrades();
    });

    $("#addRow").click( function() {
        
    })
});

function storeGrades() {

    var $inputArray = new Array();
    $("input").each(function() {
        $inputArray.push($(this).val())
    });

    // console.log(inputs);

    // chrome.storage.sync.set({"tableValues": JSON.stringify($inputArray)}, function() {
    //     console.log("Saved", key, value);
    // });
    localStorage["tableValues"] = JSON.stringify($inputArray);
    console.log($inputArray);
    console.log(JSON.stringify($inputArray));
    
}

function fillTableVals() {

    var numCols = 4;
    var valString = localStorage["tableValues"];
    if (valString === null) {
        valString = Array(16).fill("");
    }

    var dataArray = JSON.parse(valString);
    console.log(dataArray);

    var $html = "";
    var count = 0;
    for (var i = 0; i < dataArray.length / numCols; i++) {
        $html += "<tr>";
        for (var j = 0; j < numCols; j++) {
            var className = "";
            if (j == 2) className = "grade";
            else if (j == 3) className = "units";

            $html += "<td><input type='text' class='" + className + "' value='"+ dataArray[count] + "'></td>";
            count++;
        }
        $html += "</tr>";
    }

    $("table").append($html);
}

// document.getElementById("submit").onClick = "calcGPA()"

function calcGPA() {
    console.log("in calcGPA")
    // var form = document.getElementById("gradesForm")
 //    var val = form.elements["id1"].value;
    // var stuff = "";

    // var val = document.getElementById("id1").value;
    // stuff += val;
    // var gradeList = document.getElementsByClassName("grade")
    // var creditList = document.getElementsByClassName("units")
    var gradeList = $(".grade");
    var creditList = $(".units");

    // if(gradeList.length != creditList.length) {
    //  alert("Please fill in all the grades and units.")
    // }
    
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
        // console.log ("creditlist[i].value: " + creditList[i].value);
        var gp = (creditList[i].value == "") ? 0 : parseInt(creditList[i].value);
        gradePoint += (x * gp);
        credits += gp;
    };
    console.log("total credits: " + credits + "   total grade point: " + gradePoint);
    // document.getElementById("result").textContent = (gradePoint/credits).toFixed(3);
    var gpa = (gradePoint/credits).toFixed(3)
    $("#result").html(gpa);
}

function addRow() {
	var table = document.getElementById("table");
	var row = table.insertRow(table.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var element1 = document.createElement('input');
    element1.type="text";
    var element2 = document.createElement('input');
    element2.type="text";
    var element3 = document.createElement('input');
    element3.type="text";
    element3.className="grade"
    var element4 = document.createElement('input');
    element4.type="text";
    element4.className="units"
    cell1.appendChild(element1);
    cell2.appendChild(element2);
    cell3.appendChild(element3);
    cell4.appendChild(element4);
}
