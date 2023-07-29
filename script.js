let dataArray = [{
        "Name": "Chinna",
        "Email": "chinna@gmail.com",
        "Role": "Software Engineer",
        "Experience": "0"
    },
    {
        "Name": "Gayathri",
        "Email": "gaya@yahoo.com",
        "Role": "IOS Developer",
        "Experience": "5"
    },
    {
        "Name": "Reuban",
        "Email": "reuban@outlook.com",
        "Role": "BackEnd Engineer",
        "Experience": "7"
    },
    {
        "Name": "Ramya",
        "Email": "ramya@gmail.com",
        "Role": "FrontEnd Engineer",
        "Experience": "4"
    },
    {
        "Name": "Vishal",
        "Email": "vishal@gmail.com",
        "Role": "FrontEnd Engineer",
        "Experience": "3"
    },
    {
        "Name": "Neha",
        "Email": "neha@yahoo.com",
        "Role": "Marketing",
        "Experience": "10"
    },
    {
        "Name": "Sam",
        "Email": "sam@outlook.com",
        "Role": "ContentWriter",
        "Experience": "0.5"
    },
    {
        "Name": "Vinayak",
        "Email": "vinayakam4567@zoho.com",
        "Role": "Designer",
        "Experience": "4"
    },
    {
        "Name": "Sivashankar",
        "Email": "shankar1995@rediffmail.com",
        "Role": "IOS Developer",
        "Experience": "14"
    },
    {
        "Name": "Suryakumar",
        "Email": "surya12kumar@gmail.com",
        "Role": "FrontEnd Engineer",
        "Experience": "1"
    },
    {
        "Name": "Lathish kumar",
        "Email": "itsmelathish@gmail.com",
        "Role": "Software Engineer",
        "Experience": "18"
    },
    {
        "Name": "Muthuvel",
        "Email": "velu85@zoho.com",
        "Role": "Backend Engineer",
        "Experience": "0"
    },
    {
        "Name": "Shivani",
        "Email": "shivaani97@yahoo.com",
        "Role": "Designer",
        "Experience": "7"
    }





];

var resultData = dataArray;
var searchQuery = " ";
var column = "Global";
var activeSortColumn = "Name";
var activeSortOrder = true; //true for ascending false for descending
// annoynmous function to call DraWTable Function by itself
(() => {

    drawTable(dataArray, " ");
})();



//Fuction to toggle popup modal

function popUp(id) {
    var filterPopup = document.getElementById(id);
    if (filterPopup.style.display === "none") {
        filterPopup.setAttribute("active", "true")
        filterPopup.style.display = "block";
    } else {

        filterPopup.setAttribute("active", "")
        console.log(filterPopup)
        filterPopup.style.display = "none";
    }
}



//DRAW TABLE FUNCTION

function drawTable(dataArray) {
    resultData = dataArray || []
    var span = document.getElementById("noData")
    if (typeof dataArray === undefined || Object.keys(dataArray).length == 0) {
        let tbody = document.getElementsByTagName("tbody")

        generateTableBody(dataArray);
        span.style.display = "block";
    } else {
        span.style.display = "none";
        generateTableBody(dataArray);
    }

}




//EventListener to handle popup close action on focus out.
document.addEventListener('click', function (event) {
    const namePop = document.getElementById("NameFilter");
    const emailPop = document.getElementById("EmailFilter");
    const rolePop = document.getElementById("RoleFilter");
    const expPop = document.getElementById("NumericFilter");
    const filterbtn = document.querySelectorAll(".btn");

    if (namePop.parentNode.contains(event.target)) {

        emailPop.style.display = "none";
        rolePop.style.display = "none";
        expPop.style.display = "none";
    } else if (emailPop.parentNode.contains(event.target)) {
        namePop.style.display = "none";
        rolePop.style.display = "none";
        expPop.style.display = "none";
    } else if (rolePop.parentNode.contains(event.target)) {
        namePop.style.display = "none";
        emailPop.style.display = "none";
        expPop.style.display = "none";
    } else if (expPop.parentNode.contains(event.target)) {
        namePop.style.display = "none";
        rolePop.style.display = "none";
        emailPop.style.display = "none";
    } else {
        emailPop.style.display = "none";
        rolePop.style.display = "none";
        expPop.style.display = "none";
        namePop.style.display = "none";
    }

})




//Function For Filtering Entire Column and Row 

function filterTable(FilterColumn) {
    let selectedOption;
    var searchValue = document.getElementById("searchText");
    columnFilter = FilterColumn.parentNode.id
   
    
    if (columnFilter == "Global") {
        column="Global"
       let value = searchValue.value.toUpperCase();
       searchQuery = searchValue.value.toUpperCase();
        resultData = dataArray.filter(function (data) {
            for (key in data) {
                if (data[key].toUpperCase().indexOf(value) != -1) {
                    return data
                }
            }
        })
       
    } else if (columnFilter == "NameFilter")

    {

        selectedOption = document.getElementById("nameSortOption").value;
        searchQuery = FilterColumn.value.toUpperCase();
        resultData = FilterBasedOnColumn("Name", selectedOption, searchQuery);

    } else if (columnFilter == "EmailFilter") {

        selectedOption = document.getElementById("emailSortOption").value;
        searchQuery = FilterColumn.value.toUpperCase();
        resultData = FilterBasedOnColumn("Email", selectedOption, searchQuery)

    } else if (columnFilter == "RoleFilter") {
        selectedOption = document.getElementById("roleSortOption").value;
        searchQuery = FilterColumn.value.toUpperCase();
        resultData =FilterBasedOnColumn("Role", selectedOption, searchQuery)
    } else if (columnFilter == "NumericFilter") {
        let selectedOption = document.getElementById("numericTag");
        searchQuery = " ";
        let inRangeField1 = document.getElementById("inRange1").value;
        let num1 = parseFloat(inRangeField1);
        if (isNaN(num1)) {
            drawTable(dataArray, " ")
        } else {
            if (selectedOption.value == "range") {
                let inRangeField2 = document.getElementById("inRange2").value
                let num2 = parseFloat(inRangeField2)
                resultData = dataArray.filter(function (data) {
                    if (parseFloat(data["Experience"]) >= num1 && num2 >= parseFloat(data["Experience"])) {
                        return data;
                    }
                })
            } else if (selectedOption.value == "lessThan") {
                resultData = dataArray.filter(function (data) {
                    if (parseFloat(data["Experience"]) <= num1) {
                        return data;
                    }
                })


            } else if (selectedOption.value == "greaterThan") {
                resultData = dataArray.filter(function (data) {
                    if (parseFloat(data["Experience"]) >= num1) {
                        return data;
                    }
                })


            } else {
                resultData = dataArray.filter(function (data) {
                    if (parseFloat(data["Experience"]) == num1) {
                        return data;
                    }
                })

            }
        }
    }
    sortFunction(activeSortColumn,activeSortOrder);



}



//TO insert additional input tag for IN-RANGE filter

function showExtraFieldForRange(element) {
    let inRangeField2 = document.getElementById("inRange2");
    let inRangeField1 = document.getElementById("inRange1");
    if (element.value == "range") {
        inRangeField2.style.display = "block";

        inRangeField1.placeholder = "From";
        return;
    }
    inRangeField1.placeholder = "Search";
    inRangeField2.style.display = "none";

}


//Filter based on column wise

function FilterBasedOnColumn(columnName, searchType, searchQuery) {
    column =columnName; //updating global column value
    let newDataArray;
    if (searchType == "contains") {
        newDataArray = dataArray.filter(function (data) {
            if (data[columnName].toUpperCase().indexOf(searchQuery) != -1) {
                return data;
            }
        })
    } else {
        newDataArray = dataArray.filter(function (data) {
            if (data[columnName].toUpperCase().startsWith(searchQuery, 0)) {
                return data;
            }
        })

    }

   return newDataArray 
   
    // drawTable(newDataArray, searchQuery)
}


//To generate tablebody 

function generateTableBody(tableData) {
    let tbody = document.getElementsByTagName("tbody");

    if (tbody.length == 0) {
        let table = document.getElementById("employee");
        tbody = document.createElement('tbody');
        tbody.setAttribute("id", "tableBody");
        table.appendChild(tbody);
    }
    tbody.innerHTML = "";
    let tableContent = "";
    let tableRow;
    tableData.forEach(element => {
        tableRow = "";
        tableRow += "<tr>";
        for (key in element) {
                
                stringResult = highlightText(element[key], key, searchQuery);
                tableRow += stringResult
          
        }
        tableRow += "</tr>";

        tableContent += tableRow;

    })
    let tablebody = document.getElementById("tableBody");


    tablebody.innerHTML = tableContent;

}


//Function to Sort column on asc and desc order


function onsortClick(iconTag, column) {
    activeSortColumn =column;
    console.log("active"+activeSortColumn+"clicked column "+column)
    if (iconTag.getAttribute("ascending") == "true") {
        
        
        activeSortOrder = false;
        iconTag.style.transform = "rotate(180deg)";
        iconTag.setAttribute("ascending", "false");
    } else {
        
        activeSortOrder = true;
        iconTag.style.transform = "rotate(0deg)";
        iconTag.setAttribute("ascending", "true");
    }
    sortFunction(activeSortColumn, activeSortOrder)

    let previousSelectedSortIcon = document.querySelector("[icon-selected=true");
    if (previousSelectedSortIcon) {
        previousSelectedSortIcon.setAttribute("icon-selected", "false");
    }
    iconTag.setAttribute("icon-selected", "true");
}

//sortFunction
function sortFunction(column, ascending) {

    if (column == "Experience") {
        if (ascending == true) {
            resultData.sort(function (a, b) {
                if (parseFloat(a[column]) < parseFloat(b[column])) return -1;
                else return 1;
            })
        } else {
            resultData.sort(function (a, b) {
                if (parseFloat(a[column]) > parseFloat(b[column])) return -1;
                else return 1;
            })
        }

    } else {
        if (ascending == true) {
            resultData.sort(function (a, b) {
                if (a[column].toUpperCase() < b[column].toUpperCase()) return -1;
                else return 1;
            })
        } else {
            resultData.sort(function (a, b) {
                if (a[column].toUpperCase() > b[column].toUpperCase()) return -1;
                else return 1
            })
        }
    }

    drawTable(resultData, " ");
}

//Highlight function for searched text

function highlightText(element, key, searchQuery) {
    let resultString;
    let index = element.toUpperCase().indexOf(searchQuery)
    let str = element;
    if (column == "Global") {

        if (searchQuery.length >= 2 && element.toUpperCase().indexOf(searchQuery) != -1) {
            stringResult = str.substring(0, index) + "<mark>" + str.substring(index, index + searchQuery.length) + "</mark>" + str.substring(index + searchQuery.length, str.length)
            console.log(stringResult)
            resultString = `<td >${stringResult}</td>`


            resultString = `<td >${stringResult}</td>`;
        } else {
            resultString = `<td>${element}</td>`;
        }
    }
    else if (column=="Experience"){  //for Experience filter no highlight feature
       
            resultString = `<td>${element}</td>`;
        
    }

    else{
          if (key == column) {
            stringResult = str.substring(0, index) + "<mark>" + str.substring(index, index + searchQuery.length) + "</mark>" + str.substring(index + searchQuery.length, str.length)
            console.log(stringResult)
            resultString = `<td >${stringResult}</td>`
        } else {
            resultString = `<td>${element}</td>`;
        }
    }

    return resultString;
}