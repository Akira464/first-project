var order = "";
var productName = "";
var tableContent = "";
var tableHead = "";
var tableRow = "";
var row = "";
var jsonary = "";
var id = "";

//訂單詳細表的function
function createTable(data) {
	$("#tableContainer").empty(); // 清空表格內容，準備寫入新的內容
	$("#orderAddTable").empty();

	tableContent = "<table id='orderTable' class='table'><thead class='table-primary'><tr>";
	tableHead = "<th>訂單編號</th>" +
		"<th>顧客姓名</th>" +
		"<th>顧客電話</th>" +
		"<th>餐點名稱</th>" +
		"<th>種類</th>" +
		"<th>加點</th>" +
		"<th>數量</th>" +
		"<th>取餐方式</th>" +
		"<th>取餐日期</th>" +
		"<th>取餐時間</th>" +
		"<th>地址</th>" +
		"<th>金額</th>" +
		"<th>訂單狀態</th>" +
		"</tr></thead><tbody>";
	tableContent += tableHead;

	$.each(data, function(_, order) {
		tableRow = "<tr>";
		row = "<td>" + order.order_id + "</td>" +
			"<td>" + order.customer_name + "</td>" +
			"<td>" + order.customer_phone + "</td>" +
			"<td>" + order.product_name + "</td>" +
			"<td>" + order.order_item + "</td>" +
			"<td>" + order.order_add + "</td>" +
			"<td>" + order.order_quantity + "</td>" +
			"<td>" + order.order_way + "</td>" +
			"<td>" + order.order_date + "</td>" +
			"<td>" + order.order_time + "</td>" +
			"<td>" + order.customer_address + "</td>" +
			"<td>" + order.price + "</td>" +
			"<td>" + order.order_state + "</td>" +
			"</tr>";

		tableRow += row;
		tableContent += tableRow;
		id = order.order_id;
	});
	tableContent += "</tbody></table>";
	$("#tableContainer").html(tableContent);
}

//含有checkbox訂單詳細表的function
function createCheckboxTable(data) {
	$("#tableContainer").empty();
	tableContent = "<table id='orderTable' class='table'><thead class='table-primary'><tr><th>選擇</th>";
	tableContent += tableHead;

	$.each(data, function(_, order) {
		tableRow = "<tr><td><input type='checkbox' name='option' class='checkbox' data-name='" + order.product_name + "'></td>";
		row = "<td>" + order.order_id + "</td>" +
			"<td>" + order.customer_name + "</td>" +
			"<td>" + order.customer_phone + "</td>" +
			"<td>" + order.product_name + "</td>" +
			"<td>" + order.order_item + "</td>" +
			"<td>" + order.order_add + "</td>" +
			"<td>" + order.order_quantity + "</td>" +
			"<td>" + order.order_way + "</td>" +
			"<td>" + order.order_date + "</td>" +
			"<td>" + order.order_time + "</td>" +
			"<td>" + order.customer_address + "</td>" +
			"<td>" + order.price + "</td>" +
			"<td>" + order.order_state + "</td>" +
			"</tr>";

		tableRow += row;
		tableContent += tableRow;
	});
	tableContent += "</tbody></table>";

	$("#tableContainer").html(tableContent);
}

//新增單筆訂單資料表格的function
function createOrderAddTable(data) {	

	var orderAdd = "<table id='addTable' class='table'><thead class='table-secondary'><tr>" +
		"<th>訂單編號</th>" +
		"<th>餐點名稱</th>" +
		"<th>種類</th>" +
		"<th>加點</th>" +
		"<th>數量</th>" +
		"<th> </th></tr></thead>";

	var orderAddRow = "<tbody><tr>" +
		"<td>" + id + "</td>" +
		"<td><select class='form-select' id='product_name'>" +
		"<option value='0'>請選擇餐點</option>";

	//透過AJAX取得menu的JSON陣列，並逐筆讀進下拉式選單
	$.each(data, function(_, menu) {
		orderAddRow += "<option value='" + menu.product_id + "'>" + menu.product_name + "</option>";
	});
	orderAddRow += "</select></td>";

	//新增選擇種類的下拉式選單
	orderAddRow += "<td><select class='form-select' id='product_item'>" +
		"<option value='細麵'>細麵</option>" +
		"<option value='筆管麵'>筆管麵</option>" +
		"<option value='飯'>飯</option>";

	//新增選擇加點的下拉式選單
	orderAddRow += "<td><select class='form-select' id='product_add'>" +
		"<option value='無'>無</option>" +
		"<option value='焗烤'>焗烤</option>";
	//新增選擇數量的text欄
	orderAddRow += "<td><input type='text' class='form-control' id='quantity' value='1'></td>";
	//新增送出按鈕
	orderAddRow += "<td><button type='button' class='btn btn-success' data-bs-toggle='modal' data-bs-target='#sub' onclick='getValue()'>送出</button></td>";

	orderAddRow += "</tr></tbody>";

	orderAdd += orderAddRow;
	$("#orderAddTable").html(orderAdd);
}

//新增&修改訂單的單筆資料時，獲取表格內資訊
function getValue() {
	var name = $("#product_name").val();
	var item = $("#product_item").val();
	var add = $("#product_add").val();
	var quantity = $("#quantity").val();
	var price = jsonary.find(jsonary => jsonary.product_id == name).product_price;
	//彈出式視窗的標題
	$("#subHead").html("<h5 class='modal-title'>新增&修改餐點</h5><button type='button' class='btn-close' data-bs-dismiss='modal'></button>");

	if (add == "焗烤") {
		price += 40;
	}
	price *= quantity;

	//把資訊加到彈出式視窗上
	var sub = "<p>訂單編號：" + id + "</p>" +
		"<p>餐點名稱：" + jsonary.find(jsonary => jsonary.product_id == name).product_name + "</p>" +
		"<p>種類：" + item + "</p>" +
		"<p>加點：" + add + "</p>" +
		"<p>數量：" + quantity + "</p>" +
		"<p>價錢：" + price + "</p>";
	$("#subBody").html(sub)
	//將取得的資料變成JSON的儲存格式
	order = { id: id, name: name, item: item, add: add, quantity: quantity, price: price};
}

//新增訂單單筆資料時，彈出視窗確定送出按鈕的功能
function subAdd() {
	var jsonData = JSON.stringify(order);		//將order的物件轉成JSON字串
	$.ajax({
		url: "/Project/doModify",
		type: "POST",
		contentType: "application/json",
		data: jsonData,
		success: function() {
			alert("新增&修改成功");
			searchTable();
		},
		error: function(_, status, error) {
			console.error("AJAX error: " + status + " - " + error);
		}
	});
}

//顯示訂單AJAX的function
function showTable() {
	$.ajax({
		url: "/Project/doSearch",
		type: "GET", 						// 使用GET方法發送請求
		dataType: "JSON", 					//設定從Servlet傳回的數據是JSON格式
		success: function(data) {

			createTable(data);				//呼叫訂單詳細表的function

			//清空查詢訂單的顧客電話欄位
			$("input[name=customer_phone]").val("");
		},
		error: function(_, status, error) {
			console.error("AJAX error: " + status + " - " + error);
			// 在出錯時提供適當的錯誤處理
		},
	});
}

//訂單查詢AJAX的function
function searchTable() {
	$.ajax({
		url: "/Project/doSearch",
		type: "POST",
		data: { customer_phone: c_phone },		//傳送的參數跟參數值
		dataType: "JSON",
		success: function(data) {
			if (del != "delete") {
				createTable(data);				//呼叫訂單詳細表的function
				jsonary = data;
			}
			else {
				createCheckboxTable(data);
			}

		},
		error: function(_, status, error) {
			console.error("AJAX error: " + status + " - " + error);
			// 在出錯時提供適當的錯誤處理
		},
	});
	//解鎖新增、刪除、結帳按鈕
	$("#modifyOrder, #deleteOrder, #checkOut").prop("disabled", false);
}