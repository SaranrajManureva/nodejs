class tableData {
	constructor(){}
	getAllResult(req,res){
	var sql = "select ip.project_id, ip.project_title,iu.username,ic.categories_name,ic.cid from ilance_projects ip join ilance_users iu on iu.user_id = ip.user_id left join ilance_categories ic on ic.cid = ip.cid order by ip.date_added desc limit 2;"
	 console.log(d)
		dbCon.query(sql, function (err, result) { 
              if (err) {
                    return next(err);
                } 
				console.log(result)
               return res.status(500).json({ error: 'message' });
			   //return res.send({"status":"OK","data":result})
     	});
	}
}

module.exports = tableData;