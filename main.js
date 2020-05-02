
const issueForm = document.getElementById('issue-Form');
issueForm.addEventListener('submit', saveIssue);



function saveIssue(e){
var issueDesc = document.getElementById('issueDescInput').value;
var issueSeverity = document.getElementById('issueSeverityInput').value;
var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
var issueId = chance.guid();
var issueStatus = 'Open';

var issue = {
	id : issueId,
	description : issueDesc,
	severity : issueSeverity,
	assignedTo : issueAssignedTo,
	status : issueStatus
		}

if(localStorage.getItem('issues') == null)
	{
	 var issues = [];
	 issues.push(issue);
	 localStorage.setItem('issues',JSON.stringify(issues));
	}
else 	{
	 var issues = JSON.parse(localStorage.getItem('issues'));
	issues.push(issue);
	localStorage.setItem('issues',JSON.stringify(issues));
	}
var issuesList = document.getElementById('issuesList');
issuesList.innerHTML = '<h6>WOrked </h6>'
document.getElementById('issue-Form').reset();
fetchIssues();
e.preventDefault();
}
function fetchIssues(){
		var issues = JSON.parse(localStorage.getItem('issues'));
		var issuesList = document.getElementById('issuesList');
		
		issuesList.innerHTML = '';
		issues.forEach( (element) =>
		{
		  var id = element.id;
		  var desc = element.description;
		  var severity = element.severity;
		  var assignedTo = element.assignedTo;
		  var status = element.status;
		  var badgecolor = 'primary';	
				 if(element.status == 'Closed' )
					 badgecolor = 'success';
		  issuesList.innerHTML += '<div class="rounded p-3 border bg-light mb-2">'+
					  '<h6>Issue ID: '+ id + '</h6>'+
					  '<p><span class="badge badge-'+ badgecolor +'"> '+ status + '</span></p>'+
					  '<h3>' + desc +'</h3>'+
					  '<p><span class="glyphicon glyphicon-time"></span> '+ severity + '</p>'+
					  '<p><span class="glyphicon glyphicon-user"></span> '+ assignedTo + '</p>'+
					  '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
					  '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
					  '</div>';
		});
	}
function setStatusClosed(id)
{
	var issues = JSON.parse(localStorage.getItem('issues'));
	issues.forEach( (element) =>
		{
		if(element.id == id)
		element.status = 'Closed';
		});
	localStorage.setItem('issues',JSON.stringify(issues));
	fetchIssues();
}

function deleteIssue(id)
{
	var issues = JSON.parse(localStorage.getItem('issues'));
	issues.forEach( (element,i,issues) =>
		{
		if(element.id == id)
		issues.splice(i,1);
		});
	localStorage.setItem('issues',JSON.stringify(issues));
	fetchIssues();
}