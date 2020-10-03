
(function() {
const fixedOptions = {
    appId: 'pl5JW99P01Q8',
    apiKey: '691a0ca8e7dc6c33ce434be84b000710',
    container: document.querySelector('#zipcode'),
  };
  
  const reconfigurableOptions = {
    language: 'en', // Receives results in German
    countries: ['us'], // Search in the United States of America and in the Russian Federation
    type: 'address', // Search only for cities names
    // disable the extra search/boost around the source IP
  };
  const placesInstance = places(fixedOptions).configure(reconfigurableOptions);

  var $address = document.querySelector('#address-value')
  placesInstance.on('change', function(e) {
    $address.textContent = e.suggestion.value
    
  });


})();