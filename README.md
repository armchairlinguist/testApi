Simple Node API app 

<h3>Running project</h3>

You need to have Node.js and MongoDB installed

<h3>Install dependencies</h3>

To install dependencies run following command in project folder :

npm install

<h3>Run server</h3>

To run server execute:

node server.js

<h3>Requests</h3>
<ul>
<li><b><i>register user</i></b> </br>
http POST http://localhost:3000/api/register name='someuser' email='exampleemail@example.com' password='somepassword' phone='+380677777777'
</li>
<li><b><i>login </i></b></br>
http POST http://localhost:3000/api/login email='exampleemail@example.com' password='somepassword'
</li>
<li><b><i>get user by id</i></b></br>
http http://localhost:3000/api/user/USER_ID_HERE Authorization:'Bearer YOUR_TOKEN_HERE'
</li>
<li><b><i>get your user info </i></b></br>
http http://localhost:3000/api/me Authorization:'Bearer YOUR_TOKEN_HERE'
</li>
<li><b><i>update your user info </i></b></br>
http PUT http://localhost:3000/api/me name='updateduser' email='updatedemail@example.com' current_password='somepassword' new_password='newpassword' phone='+380677777777' Authorization:'Bearer YOUR_TOKEN_HERE'
</li>
</ul>

For example requests <a href="https://github.com/jkbrzt/httpie">httpie</a> was used (command line HTTP client)

