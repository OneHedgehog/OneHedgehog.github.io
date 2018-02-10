;$(function() {

	function RegistrationForm() {
	var button = $('.header .navbar-nav+.navbar-right li:nth-of-type(2) a');
	var Form = $('.login-form');
	var FormButtons = $('.login-form button');
	var Register = $('.registerWrap');
	var FormText = $('.form-group h2');
	var Stage = 1;


	//показываем форму
	button.click(function() {
		Form.fadeIn();
		return false;
	});


	//закрываем форму
	FormButtons[0].onclick = function(e) {
			Form.fadeOut();
		e.preventDefault();
	}

	$(document).click(function(e) {
		if($(e.target).closest(Form).length){
			return;
		}
		else{
			$(Form).fadeOut('slow');
		}
	})



	//показываем форму регистрации, 2 состояния ДОБАВ
	FormButtons[2].onclick = function(e) {
		e.preventDefault();
		Stage++;

		if( Stage%2 == 0){
			Register.slideDown('slow');
			FormText[0].innerHTML = 'REGISTRATION';
		}
		else if( Stage%2 != 0){
			Register.slideUp('slow');
			FormText[0].innerHTML = 'SIGNING IN';
		}
  }
	};

	function Cart() {

		function CartRemove() {
			var Button = $('.ItemCP .btn-danger');
			Button.click(function() {
			var RemovedItem = $(this).parent();
			RemovedItem.remove();
			CalculateTotalSum();
			CartItems();
			});
		};


		function CalculateTotalSum() {
			var sum = 0.00;
			var Price = $('.TotalPrice');
			var Total = $('.PriceValue');


			for (var i = Total.length - 1; i >= 0; i--) {
				sum = sum + parseFloat(Total[i].innerHTML);
			}

			Price[0].innerHTML = sum.toFixed(2);
		}

		function CartItems() {
			var Count = $('.header .navbar-nav+.navbar-right .cases');
			var Items = $('.ItemCP');
			Count[0].innerHTML = (Items.length);
		}
		 
		CartItems();
		CartRemove();
		CalculateTotalSum();
	}

	
		function AddToCart() {
		var Button = $('.toCart');
		var Href = $('.Content li a');
		var BestSelHref = $('.Best-Sellers a');
		var ItemPrice, ItemStyle, ItemName;

		Button.click(function() {
			var CartEl = $('.CartPreview');

			(Href).click(function() {
				return false;
			});

			BestSelHref.click(function() {
				return false;
			});

			//получаем элементы для отрисовки в превью корзины
			if(($(this).parent().parent()[0].className) == 'TopItem'){
				 ItemPrice = ($(this).parent().children()[1].innerText);
				 ItemStyle =	($(this).parent().children()[2].children[3].innerHTML);
				 ItemName = ($(this).parent().children()[2].children[0].innerHTML);
			}else if(($(this).parent().parent()[0].className) == 'ItemClass2'){
				 ItemPrice = ($(this).parent().children()[2].firstChild.innerText);
				 ItemStyle = 'default';
				 ItemName = ($(this).parent().children()[1].innerHTML);

			}else if(($(this).parent()[0].className) == 'BSlink'){
				ItemPrice = $(this).parent().children()[4].children[1].innerText;
				ItemStyle = ($(this).parent().children()[3].innerText);
				ItemName =($(this).parent().children()[2].innerText);
			}else {
				ItemPrice = ($(this).parent().children()[4].innerText);
				ItemStyle = ($(this).parent().children()[3].innerText);
				ItemName = ($(this).parent().children()[2].innerText);
			};
			var NewItem = $('	<div class="ItemCP">'+
										'<a class="cat">'+
											'<p>' +
												'<span class="Heads">Item:</span>' +
														'<span class="itText">' +
															ItemName 
															+ '</span>'
												+'</p>'

												+ '<p>'
													+'<span class="Heads">Style:</span><span class="itText StyleCP">'
														+ItemStyle
													+'</span>'
												+'</p>'

												+ '<p>'
													+'<span class="Heads">Price:</span><span class="itText PriceCP"><span class="glyphicon glyphicon-gbp"></span><span class="PriceValue">'
													+parseFloat(ItemPrice)
													+'</span></span>'
												+'</p>'
										+'</a>'
											+'<div class="btn btn-danger">remove</div>'
										+'</div>');


			CartEl.append(NewItem);
			Cart();//пересчет значения цены после отрисовки  

		});
	}

	RegistrationForm();
	Cart();
	AddToCart();
});
