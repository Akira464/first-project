var c_phone = "";
var del = "";
var jsonary = "";

$(document).ready(function() {

	//顯示訂單的按鈕功能
	$("#showOrder").click(function() {
		showTable();

		//上鎖新增、刪除、結帳按鈕
		$("#modifyOrder, #deleteOrder, #checkOut").prop("disabled", true);
	});

	//查詢訂單的按鈕功能
	$("#searchOrder").click(function() {
		c_phone = $("input[name=customer_phone]").val(); // 獲取顧客手機號碼
		var regx = /^[0-9]{10}$/;
		if (c_phone.length == 0) {
			alert("請輸入顧客電話");
		}
		else if (!regx.test(c_phone)) {
			alert("電話輸入錯誤");
		}
		else {
			searchTable();
			del = "";
		}
	});

	//新增&修改的按鈕功能
	$("#modifyOrder").click(function() {
		del = "";
		searchTable();
		$.ajax({
			url: "/Project/doModify",
			type: "GET",
			dataType: "JSON",
			success: function(data) {
				jsonary = data;
				createOrderAddTable(data);			//呼叫新增單筆訂單資料表格的function
			},
			error: function(_, status, error) {
				console.error("AJAX error: " + status + " - " + error);
				// 在出錯時提供適當的錯誤處理
			},
		});
		$("#checkOut").prop("disabled", true);
	});
	//刪除的按鈕功能
	$("#deleteOrder").click(function() {

		del = "delete";
		searchTable();
		$("#orderAddTable").empty();
		//產生刪除的按鈕
		$("#orderAddTable").html("<button type='button' class='btn btn-danger' id='delBtn' onclick='deleteOrder()'>刪除</button>");
		$("#checkOut").prop("disabled", true);

	});
	//結帳的按鈕功能
	$("#checkOut").click(function() {

		$("#subHead, #subBody, #subFoot").empty();
		$("#subHead").html("<h5>訂單明細</h5><button type='button' class='btn-close' data-bs-dismiss='modal'></button>");
		var totalPrice = 0;
		var checkOutContent = "<p>訂單編號：" + id + "</p>";
		$.each(jsonary, function(_, order) {
			var price = order.price;
			var quantity = order.order_quantity;
			totalPrice += price;
			checkOutContent += "<p><span>餐點名稱：" + order.product_name + "</span>" +
				"<span>&nbsp&nbspX" + quantity + "</span>&nbsp&nbsp" +
				"<span>金額：$" + price + "</span></p>";
		});
		checkOutContent += "<p>總金額：$" + totalPrice + "</p>";
		$("#subBody").html(checkOutContent);
		$("#subFoot").html("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' id='subCheck'>確定送出</button>");

		$(document).on("click", "#subCheck", function() {
			$.ajax({
				url: "/Project/doSearch",
				type: "POST",
				data: { order_id: id, customer_phone: c_phone },
				dataType: "JSON",
				success: function(data) {

					createTable(data);

				},
				error: function(_, status, error) {
					console.error("AJAX error: " + status + " - " + error);
				},
			});
		});
	});
});

//點選checkbox時，取得該筆訂單資訊
$(document).on("click", ".checkbox", function() {
	productName = $(this).data("name");
	if ($(this).is(":checked")) {
		$('input[type="checkbox"]').not(this).prop('checked', false);
		$("#delBtn").attr("data-bs-toggle", "modal");
		$("#delBtn").attr("data-bs-target", "#sub");
	}
	else {
		productName = "";
		$("#delBtn").removeAttr("data-bs-toggle");
		$("#delBtn").removeAttr("data-bs-target");
	}
});

//刪除按鈕的功能
function deleteOrder() {
	if (productName == "") {
		alert("請先選取刪除的餐點");
		console.log(productName);
	}
	else {
		// 彈出確認視窗的內容
		$("#subHead, #subBody, #subFoot").empty();
		$("#subHead").html("<h5 style='color: red'>刪除餐點</h5><button type='button' class='btn-close' data-bs-dismiss='modal'></button>");
		$("#subBody").html("<p>確定進行</p>" +
			"<p style=font-weight: bold'>訂單：" + id + " </p>" +
			"<p style=font-weight: bold'>餐點：" + productName + "</p>" +
			"<p>的刪除？</p>");
		$("#subFoot").html("<button type='button' class='btn btn-primary' data-bs-dismiss='modal' id='subDel'>確定送出</button>");
		$(document).on("click", "#subDel", function() {
			$.ajax({
				url: "/Project/doSearch",
				type: "POST",
				data: {
					order_id: id,
					product_name: productName,
					customer_phone: c_phone
				},
				dataType: "JSON",
				success: function(data) {
					createCheckboxTable(data);
				},
				error: function(_, status, error) {
					console.error("AJAX error: " + status + " - " + error);
				},
			});
		});
	}
}