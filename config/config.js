class config {
	 
	constructor(){
		this.apiPort = 3000; 
		// Environment SetUp  
		db_config = {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'chad',
                port: '3306',
                debug: false
            };
			
		dbCon = mysql.createConnection(db_config);
        dbCon.connect((err)=> {
            if (err) console.log(err);
            else {
                console.log('db connected');
            }
        });
		
		app.listen(this.apiPort, () => {
			console.log('Server listening on port'+this.apiPort);
		}); 
	}	
}

module.exports = config;