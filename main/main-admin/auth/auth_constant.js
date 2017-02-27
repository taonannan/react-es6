
var operation ={
	auth_user_info :{
	  list:"/operation/user_info/list",
	  detail:"/operation/user_info/edit",
	  delete:"/operation/user_info/delete",
	  all:"/operation/user_info"
	},
	auth_atlas :{
	  list:"/operation/atlas/list",
	  upload:"/operation/atlas/upload",
	  delete:"/operation/atlas/delete",
	  all:"/operation/atlas"
	},
	auth_article :{
	  list:"/operation/article/list",
	  create:"/operation/article/create",
	  edit:"/operation/article/edit",
	  delete:"/operation/article/delete",
	  all:"/operation/article"
	},
	auth_banner :{
	  list:"/operation/banner/list",
	  create:"/operation/banner/create",
	  edit:"/operation/banner/edit",
	   delete:"/operation/banner/delete",
	  all:"/operation/banner"
	},
	auth_activity :{
	  list:"/operation/activity/list",
	  create:"/operation/activity/create",
	  edit:"/operation/activity/edit",
	   delete:"/operation/activity/delete",
	  all:"/operation/activity"
	}

}

var authority ={
	auth_role:{
		list:"/authority/role/list",
		create:"/authority/role/create",
		edit:"/authority/role/edit",
		all:"/authority/role"
	},
	auth_admin:{
		list:"/authority/admin/list",
		create:"/authority/admin/create",
		edit:"/authority/admin/edit",
		all:"/authority/admin"
	}
}

//场馆
var venuesManage ={
	auth_venues:{
		list:"/venuesManage/venues/list",
		create:"/venuesManage/venues/create",
		edit:"/venuesManage/venues/edit",
		all:"/venuesManage/venues",
		close:"/venuesManage/venues/close"
	}
}

//订单
var trade ={
	auth_trade:{
		refund:"/trade/orders/refund",//退款
		validate:"/trade/orders/validate",//验证消费
		validate_msg:"/trade/orders/validate_msg",//验发消息/
		all:"/trade/orders"
	}
}
export default {operation,authority,venuesManage,trade};