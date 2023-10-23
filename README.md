## This app requires npm, xampp mysql server, and node for the serverside

## xampp setup

open xampp gui with sudo /opt/lampp/manager-linux-x64.run
start all servers using the gui
ensure you have two databases setup, 'db' and 'Order'
database setup should be done in the online localhost url, rather than the xampp gui

## node setup

cd into 'server' directory and run $node server.js

## react.js app setup

after running the MySql server and the node server, you can now view the react app
in the root of the application, run $npm start

## view urls

react app : http://localhost:3000
node server : http://localhost:7000
mysql server : http://localhost/phpmyadmin
