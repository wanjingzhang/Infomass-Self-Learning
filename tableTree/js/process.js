var virtualTable = document.getElementById("virtualTable");

var vTree = new vTable(vTableData);
virtualTable.append(vTree.displayTable());