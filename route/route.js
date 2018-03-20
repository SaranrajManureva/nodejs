router = express.Router(); 
userModel = require('../models/user');
tableModel = require('../models/tableData');

userModelObj = new userModel();
tableModelObj = new tableModel();

router.get('/', (req, res)=>{
	res.render('index')
	
	 
});


router.post('/getdata', (req, res)=>{
		var sql = "select ip.project_id, ip.project_title,iu.username,ic.categories_name,ic.cid from ilance_projects ip join ilance_users iu on iu.user_id = ip.user_id left join ilance_categories ic on ic.cid = ip.cid order by ip.date_added desc limit 2;" 
 		dbCon.query(sql, function (err, result) { 
              if (err) {
                    return next(err);
                } 
				var newarary = [];
				var oldarray = [];
			   result.forEach((ress)=>{ 
			   console.log(ress.project_title)
				   oldarray.push(ress.project_title);
				   oldarray.push(ress.username);
					oldarray.push(ress.categories_name);
					newarary.push(oldarray);
					oldarray = [];
				   })
			    res.send(JSON.stringify({"draw" :"1","recordsTotal" :"52","recordsFiltered":"52",  "data": newarary }));
			  
			  //res.send(JSON.stringify({"draw":3,"recordsTotal":57,"recordsFiltered":57,"data":[["Quinn Flynn","342000","22"],["Rhona Davidson","327900","55"],["Sakura Yamamoto","139575","37"],["Serge Baldwin","138575","64"],["Shad Decker","183000","51"],["Shou Itou","163000","20"],["Sonya Frost","103600","23"],["Suki Burks","114500","53"],["Tatyana Fitzpatrick","385750","19"],["Thor Walton","98540","61"]]}));
     	});	
	 
});

	

module.exports = router;
