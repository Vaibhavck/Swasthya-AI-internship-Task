<h1>Swasthya AI Internship Task</h1>


## Steps To Run The Project

<ol>
  <li>Download project zip file and extract the code (or create empty git repository and pull the code from github).</li>
  
  <li>Type <code>npm i</code> to install required packages.</li>
  
  <li>Create new <strong>.env</strong> file and add required variables for mongodb database connection and port (default : 3000). Check <strong>.sample_env</strong> file for reference.</li>
  
  <li>Create new mongodb database and add database uri to .env file (for local database add <code>mongodb://localhost:27017/db-name</code>)</li>
  <li>In terminal, navigate to <strong>db</strong> folder in project.</li>
  <li>Run following commands to import json files in database:
        <br>
        $ <code>mongoimport --db db-name --collection collection-name --file blogs.json --jsonArray</code>
        <br>
        $ <code>mongoimport --db k_level_friends --collection users --file users.json --jsonArray</code>
  </li>
  <li>After importing run <code>npm run dev</code> to start project</li>
</ol>

## Steps to test the API

<ol>
  <li>Open API testing software (web browser will do)</li>
  <li>URL <code>http://localhost:PORT</code> (default port is 3000)</li>
  <li>ENDPOINT : <code>/users/</code> <br>
    <ul>For getting all the users from database</ul>
  </li>
  <li>ENDPOINT : <code>/blogs/</code> <br>
    <ul><li>For getting all the blogs from database</li></ul>
  </li>
  <li>ENDPOINT : <code>/users/userId/level/levelNo</code> <br>
    <ul>For getting all the users from database</ul>
  </li>
  <li>NOTE : User ObjectId from database for userId</li>
  
</ol>



## Approach taken

<ul>
  <li>For users in database, each document has a <strong>comments</strong> property which is an array of object ids of all the blogs that that user has commented on</li>
  <li>For blogs in database, each document has a <strong>comments</strong> property which is an array of obejcts with object ids of all the users and comment  that those users have commented.</li>
  <li>For <strong>K</strong> level we are finding firstLevel friends at each level for getting friends on next level.</li>
  <li> If those friends are one of the first level friends of the previous level friends then all of those are excluded.</li>
</ul>

