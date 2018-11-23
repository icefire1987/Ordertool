docker run --name mysql-local
--mount type=bind,src=./src/backend/database/my.cnf,dst=/etc/my.cnf
--mount type=bind,src=./src/backend/database/datadir/,dst=/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=mysqlpw -p 3306:3306 -d mysql:5