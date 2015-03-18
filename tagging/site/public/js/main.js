// Beállítások
SETTINGS = {
    script_version: 'v1',
    post_post_URI: 'http://attitudelemzes.tmit.bme.hu/ap',
    post_comment_URI: 'http://attitudelemzes.tmit.bme.hu/an',
    verbose: 1
};

$(document).on('keypress', null, '1', function () {
    $('#button-sentiment-n2').trigger('click');
});
$(document).on('keypress', null, '2', function () {
    $('#button-sentiment-n1').trigger('click');
});
$(document).on('keypress', null, '3', function () {
    $('#button-sentiment-0').trigger('click');
});
$(document).on('keypress', null, '4', function () {
    $('#button-sentiment-p1').trigger('click');
});
$(document).on('keypress', null, '5', function () {
    $('#button-sentiment-p2').trigger('click');
});
$(document).on('keypress', null, '0', function () {
    $('#button-skip').trigger('click');
});

function publishPost(contentId, sentiment) {
    console.log("publishPost");
    _gaq.push(['_trackEvent', 'Annotate', 'PostAnnotated', contentId, sentiment]);
    post(SETTINGS.post_post_URI, {contentId: contentId, sentiment: sentiment, type: type});
    moveToComment();
}


function publishComment(commentId, sentiment) {
    console.log("publishComment");
    _gaq.push(['_trackEvent', 'Annotate', 'CommentAnnotated', commentId, sentiment]);
    post(SETTINGS.post_comment_URI, {commentId: commentId, sentiment: sentiment});
    location.reload();
}


function skip(commentId) {
    _gaq.push(['_trackEvent', 'Annotate', 'Skip', commentId]);
    location.reload();
}

$(document).bind("ready", function () {
    $('.comment').hide();
})



function moveToComment () {
    console.log("moveToComment");
    $('.select-sentiment-post').fadeOut(200);
    $('.comment').fadeIn(500);
    document.getElementById( 'button-skip-comment' ).scrollIntoView();
};

function post(url, obj) {
    var fp 	= new Fingerprint().get();
    obj.fp = fp;
    var JSON_str = JSON.stringify(obj);
    console.log(JSON_str);
    $.ajax({
            url: url,
            type: 'POST',
            contentType: 'application/json',
            data: JSON_str
        }
    )
}
