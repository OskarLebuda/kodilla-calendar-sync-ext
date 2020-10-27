(function () {
  setInterval(function () {
    const inputs = document.querySelectorAll('.bootcamp-users-table > table > tbody > tr > td.next-call-at input');

    Array.prototype.forEach.call(inputs, element => {
      if (element.parentNode.getElementsByClassName('ext-sync').length === 0) {
        const button = document.createElement('button');
        const i = document.createElement('i');

        i.classList.add('fa', 'fa-refresh');
        button.classList.add('btn', 'btn-primary', 'ext-sync');
        button.appendChild(i);
        button.addEventListener('click', syncButtonClick);

        element.parentNode.appendChild(button);
      }
    });
  }, 2000);

  function syncButtonClick(event) {
    event.preventDefault();

    const userDataElement = this.parentNode.parentNode.parentNode.querySelector('.user-data');
    const nextCall = this.parentNode.parentNode.querySelector('input').value;
    const name = userDataElement.querySelector('a').innerText;
    const email = userDataElement.querySelector('p').innerText;
    sendData(name, email, nextCall)

  }

  function sendData(name, email, time) {
    chrome.runtime.sendMessage({
      action: 'syncCall',
      source: {
        name: name,
        email: email,
        time: time
      }
    });
  }
})();
