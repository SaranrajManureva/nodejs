class user {
	constructor(){}
	getAllResult(req,res){
	let sql = "select ip.project_id, ip.project_title,iu.username,ic.categories_name,ic.cid from ilance_projects ip join ilance_users iu on iu.user_id = ip.user_id left join ilance_categories ic on ic.cid = ip.cid order by ip.date_added desc limit 2;"
console.log(sql)	
	 
	}
}

module.exports = user;