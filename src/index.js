import './index.css';
import './dist/css/bootstrap-material-design.min.css';
import './dist/css/ripples.min.css';

import './dist/js/material.min.js';
import './dist/js/ripples.min.js';

import {getMeditations} from './api/meditateApi';

// Populate table of users via API call.
getMeditations().then(result => {
  let pageBody = "";

result.forEach(meditation => {
  pageBody+= `
  <a href="/meditations" class="btn btn-default btn-lg btn-block btn-raised app">
  <div class="list-group-item">
    <div class="row-action-primary">
      <i class="material-icons md-36">volume_up</i>
    </div>
    <div class="row-content">
      <div class="least-content">10m</div>
      <h4 class="list-group-item-heading">${meditation.title}</h4>

      <p class="list-group-item-text">${meditation.description}</p>

    </div>
  </div>
</a>
</div>
`

});
  global.document.getElementById('meditations').innerHTML = pageBody;

  // const deleteLinks = global.document.getElementsByClassName('deleteuser');


});

$.material.init()
