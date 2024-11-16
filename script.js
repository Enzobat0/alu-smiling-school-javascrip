$(document).ready(function () {
    // URL for the quotes API
    const quotesAPI = "https://smileschool-api.alx-tools.com/quotes";

    // Fetch quotes dynamically
    $.ajax({
        url: quotesAPI,
        method: "GET",
        beforeSend: function () {
            // Show the loader
            $("#quotes-loader").show();
        },
        success: function (data) {
            // Hide the loader
            $("#quotes-loader").hide();

            // Populate the carousel
            const carouselInner = $(".carousel-inner");
            data.forEach((quote, index) => {
                const isActive = index === 0 ? "active" : "";

                const quoteHTML = `
                    <div class="carousel-item ${isActive}">
                        <div class="row justify-content-around">
                            <div class="col-sm-1">
                                <img class="rounded-circle mx-auto my-3 d-block" src="${quote.pic_url}" width="150" height="150" alt="${quote.name}">
                            </div>
                            <div class="col-sm-6 mx-3">
                                <p>« ${quote.text}</p>
                                <p><span class="font-weight-bold">${quote.name}</span><br>
                                    <span class="font-italic">${quote.title}</span></p>
                            </div>
                        </div>
                    </div>`;
                carouselInner.append(quoteHTML);
            });
        },
        error: function () {
            $("#quotes-loader").html("<p>Failed to load quotes. Please try again later.</p>");
        }
    });
});

//videos
$(document).ready(function () {
    const API_URL = "https://smileschool-api.alx-tools.com/popular-tutorials";
    const loader = $(".loader");
    const carouselInner = $("#carouselInner");
    const carousel = $("#carouselVideos");

    // Function to create a card
    function createCard(video) {
        return `
            <div class="card video-card mx-auto my-3">
                <img class="card-img-top" src="${video.thumb_url}" alt="${video.title}" width="255" height="154">
                <img class="play-img" src="images/play.png" alt="Play" width="64" height="64">
                <div class="card-body">
                    <p class="font-weight-bold">${video.title}<br>
                        <span class="text-secondary font-14 font-weight-normal">${video["sub-title"]}</span>
                    </p>
                    <div class="row justify-content-start font-14 purple-text">
                        <div class="col-2">
                            <img class="rounded-circle" src="${video.author_pic_url}" width="30" height="30" alt="${video.author}" loading="lazy">
                        </div>
                        <div class="col mt-1">
                            ${video.author}
                        </div>
                    </div>
                    <div class="row justify-content-between mt-2">
                        <div class="col">
                            ${Array(5)
                                .fill(0)
                                .map((_, index) =>
                                    index < video.star
                                        ? `<img src="images/star_on.png" width="15" height="15" alt="Star on" loading="lazy">`
                                        : `<img src="images/star_off.png" width="15" height="15" alt="Star off" loading="lazy">`
                                )
                                .join("")}
                        </div>
                        <div class="col-4 text-right purple-text">
                            ${video.duration}
                        </div>
                    </div>
                </div>
            </div>`;
    }

    // Fetch popular videos
    $.ajax({
        url: API_URL,
        method: "GET",
        success: function (videos) {
            // Hide the loader and show the carousel
            loader.addClass("d-none");
            carousel.removeClass("d-none");

            let active = true;
            videos.forEach((video, index) => {
                // Create a new carousel item every 4 videos
                if (index % 4 === 0) {
                    carouselInner.append(`
                        <div class="carousel-item ${active ? "active" : ""}">
                            <div class="row justify-content-center"></div>
                        </div>
                    `);
                    active = false;
                }

                // Append video card to the latest row
                const row = carouselInner.find(".carousel-item:last-child .row");
                row.append(`<div class="mx-1">${createCard(video)}</div>`);
            });
        },
        error: function () {
            // Display error message in case of failure
            loader.html('<p class="text-danger">Failed to load videos. Please try again later.</p>');
        },
    });
});
