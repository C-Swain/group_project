// Client facing scripts here
$(() => {
  const $api_key = 'N7gUjYrwZdtcyknRlQUgu3CJQpVmUhDZ05tG7ajgY6I';
  let $query 
  // $('#query').on('submit', (event) => {
  //   event.preventDefault();
  //   $getImages($('#search-input').val())
  // })
  
  const $showImages = function(images) {
    images.forEach((image) => {
      const $imgHtml = `
        <div class="img-box">
          <div class="pic-box">
            <img src="${image.urls.small}" alt="${image.alt_description}"
          </div>
          <p class="img-name">${image.alt_description}</p>
        </div>
      `;

      $('.results').append($imgHtml);
    });
  }

  const $getImages = () => {
    $.get({
      url: `https://api.unsplash.com/search/photos?query=vintage&client_id=${$api_key}`
    })
    .done((data) => {
      console.log(data)
      $('.results').empty();
      $showImages(data.results)
    })
  }
  $getImages();

  const setActive = ()=> {
    console.log($('.carousel-item')[0]);
  }
  setActive();
  

})