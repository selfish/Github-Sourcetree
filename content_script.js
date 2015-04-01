function genCloneButton(protocol, cloneUrl) {
    var branch = $('.file-navigation').find('.js-menu-target').attr('data-ref');
    var cloneURL = getCloneURL(branch, cloneUrl);

    var button = $('<a>').attr({
        "href": cloneURL,
        "data-url": cloneURL,
        "class": $($('.only-with-full-nav').find('a:contains("lone")')[0]).attr('class')
    });
    button.append($('<img />').css({"margin-right": "10px"}).attr("src", chrome.extension.getURL('icon/' + protocol + '.png')));
    button.append($('<span />').text('Clone in ST (' + protocol.toUpperCase() + ')'));
    button.appendTo('.only-with-full-nav');
}

function getCloneURL(branch, cloneUrl) {
    branch = branch || "master";
    return "sourcetree://checkoutRef?ref=" + branch + "&cloneUrl=" + cloneUrl + "&type=github";
}

// Create a new section for Sourcetree buttons:
$('.only-with-full-nav').append(
    $('<hr><h3><strong>Clone in SourceTree</strong></h3>')
);

// Generate clone buttons:
$('.clone-url').each(function (i, urlDOM) {
    var protocol = $(urlDOM).attr('data-protocol-type');

    if (protocol.match(/(ssh|http)/)) {
        var cloneUrl = $(urlDOM).find('input.js-url-field').val();
        if (cloneUrl) genCloneButton(protocol, cloneUrl);
    }
});
