router = express.Router(); 
var md5 = require('md5');

router.get('/',logUser, (req, res)=>{
	res.render('index');
}); 
router.get('/logout', (req, res) => {
	
    if (req.session.user) {
		req.session.destroy();
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});
function logUser(req, res, next){
	console.log(req.session)
		console.log(req.cookies)

	if(req.session.user){
		return next();
	} else { 
		 res.redirect('/login');
	}
}
router.get('/login',(req,res)=>{
	res.render('login')
})

router.post('/login',(req,res)=>{
	console.log(req.body)
	console.log(md5(md5("password")+'*YW%Z'))
	var sql = "select * from ilance_users where username='"+req.body.username+"'";
	dbCon.query(sql, function (err, result) { 
              if (err) {  
			  res.send({"status":"ERROR","message":err})
                }
            else{  
				if(result.length>0){
					console.log(result)
					if(result[0].password==(md5(md5(req.body.password)+result[0].salt))){
					req.session.user = result[0];						
					res.send({"status":"OK","message":"Logged In successfully"});
					}
					else{
					res.send({"status":"ERROR","message":"Invalid Password"});
					}
				}
				else{
					res.send({"status":"ERROR","message":"Unknown User"});
				} 
			}		 
		});
	
})
router.post('/getdata', (req, res)=>{ 
	    var sortArray = ['ip.project_title','iu.username','ic.categories_name']; 
		var queryResult1='';
		var queryResult2='';
		var newarary = [];
		var oldarray = [];
		var arrayFinal =''
		var count="";
		var sqlMain = "select ip.project_id, ip.project_title,iu.username,ic.categories_name,ic.cid ";
		var sqlCount = "select count(*) count ";
		var sqltail = " from ilance_projects ip join ilance_users iu on iu.user_id = ip.user_id left join ilance_categories ic on ic.cid = ip.cid "  
 		var sqltail2='';
		if(req.body.order!=undefined){
			sqltail2 = sqltail+" order by "+sortArray[req.body.order[0].column]+" "+req.body.order[0].dir+" limit 2 offset "+req.body.start+" ;"
		}   
		else{
			sqltail2 = sqltail+" order by ip.date_added desc limit 2 offset "+req.body.start+" ;"
		}
			
			
		var execQuery1 = new Promise((resolve,reject)=>{
			var sql=sqlMain+sqltail2;
			dbCon.query(sql, function (err, result) { 
              if (err) { 	 
                    return err;
					reject();
                } 
				var newarary = [];
				var oldarray = [];
				console.log(result)
			   result.forEach((ress)=>{ 
			   console.log(ress.project_title)
				   oldarray.push(ress.project_title);
				   oldarray.push(ress.username);
					oldarray.push(ress.categories_name);
					newarary.push(oldarray);
					oldarray = [];
				   }) 
				   console.log(newarary);
					arrayFinal = newarary;
					resolve();
			});
			
		})
		
		var execQuery2 = new Promise((resolve,reject)=>{
			var sql=sqlCount+sqltail; 
			dbCon.query(sql, function (err, result) { 
              if (err) {
                    return err; 
					reject();
                }
				count = result[0].count;				
			    resolve();
     	});
		})
		
		Promise.all([execQuery1,execQuery2]).then((requ,ress)=>{ 
		console.log(newarary)
		   res.send(JSON.stringify({"draw" :req.body.draw,"recordsTotal":count,"recordsFiltered":count,"data":arrayFinal}));

		})  
});

	

module.exports = router;
