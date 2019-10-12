let routineFunc;
const emails = new Map();

function onAddEmailToSearch(event) {
  const email_to_add = document.getElementById('email_to_add');
  const emailList = document.getElementById('emailList');

  const newLI = document.createElement('li');
  newLI.innerHTML = email_to_add.value;

  const oldEmailSize = emails.size;

  emails.set(email_to_add.value);
  if (oldEmailSize < emails.size) {
    emailList.append(newLI);
  }

  email_to_add.value = '';
  event.preventDefault();
}

function onStopRoutine() {
  clearInterval(routineFunc);
  document.getElementById('emailSearchResult').innerHTML = '';

  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}

function onStartRoutine() {
  const refreshRateInput = document.getElementById('refresh_rate');
  executeRoutine(refreshRateInput.value);
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
  event.preventDefault();
}

function executeRoutine(refreshRate) {
  routineFunc = setInterval(() => {
    if (emails.size) {
      fetch(`./api/emails?q=${encodeURIComponent(Array.from(emails.keys()).join(','))}&sort=true`)
        .then((response) => {
          response.json().then((body) => {
            arrayStringResult = body.map((email) => `${email.email}: ${email.found}`, '');

            document.getElementById('emailSearchResult').innerHTML = `<span>${new Date().toString()}</span>: ${arrayStringResult.join(', ')}`;
          });
        });
    }
  }, refreshRate * 1000, refreshRate);
}
