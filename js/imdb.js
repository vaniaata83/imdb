
var token = "bea2d4a5-a6b6-41d4-8ad2-c10ad9aa0dc2";
var listOrder = true;
$("body").ready(function ()
{

});
function search()
{

    if (validateSearch())
    {
        var movieName = $("#movie-name").val();
        var url = "http://www.myapifilms.com/imdb/idIMDB?title=" + movieName + "&token=" + token + "&format=json&language=en-us&aka=0&business=0&seasons=0&seasonYear=0&technical=0&filter=2&exactFilter=0&limit=1&forceYear=0&trailers=0&movieTrivia=0&awards=0&moviePhotos=0&movieVideos=0&actors=0&biography=0&uniqueName=0&filmography=0&bornAndDead=0&starSign=0&actorActress=0&actorTrivia=0&similarMovies=0&adultSearch=0&goofs=0&keyword=0&quotes=0&fullSize=0&companyCredits=0&filmingLocations=0";
        $.ajax({
            url: url,
            dataType: "jsonp"

        }).done(function (response)
        {
            console.log(response.error);
            if (response.error === undefined)
            {
                $(".alert-no-results").hide();
                $(".order-by").show();
                renderResponse(response.data.movies[0]);

            }
            else
            {
                $(".alert-no-results").show();
            }

        }).fail(function (response)
        {
            $(".alert-no-results").show();
        });
        $("#alert-checkboxes").hide();
    }
    else
    {
        $("#alert-checkboxes").show();
    }

    // var title = movieTitle.val();
    // alert("searchMovie: " + title);
    var movieName = $("#movie-name");

}
function renderResponse(response)
{
    var checkedBoxes = $("#options-container input:checked");
    var resultSet = $(".result-set").last().clone();
    resultSet.find("h2").html(response.title);
    for (var i = 0; i < checkedBoxes.length; i++)
    {
        if (response[$(checkedBoxes[i]).val()].constructor !== Array)
        {
            var row = resultSet.find(".checkbox-key-information").last().clone();

            row.find(".key").html($(checkedBoxes[i]).attr("name") + ": ");
            row.find(".value").html(response[$(checkedBoxes[i]).val()]);
            row.appendTo(resultSet.find(".information")).show();
        }
        else
        {
            console.log(response[$(checkedBoxes[i]).val()]);
            var row = resultSet.find(".checkbox-key-information").last().clone();
            row.find(".key").html($(checkedBoxes[i]).attr("name") + ": ");

            var value = " ";
            for (var key in response[$(checkedBoxes[i]).val()])
            {
                value += response[$(checkedBoxes[i]).val()][key] + " ";
            }
            row.find(".value").html(value);
            row.appendTo(resultSet.find(".information")).show();
        }
    }
    resultSet.appendTo($("#results")).show();
}

function validateSearch()
{
    var markedCheckboxesCount = $("#options-container input:checked").length;
    if (markedCheckboxesCount < 3)
    {
        return false;
    }
    return true;
}
function order()
{
    listOrder = !listOrder;
    if (listOrder)
    {
        $("#order").html("Grid");
        $(".result-set").each(function ()
        {
            $(this).css("margin-right", "0px");
        });
    }
    else
    {
        $("#order").html("List");
        $(".result-set").each(function ()
        {
            $(this).css("margin-right", "10px");
        });
    }
    $(".result-set").each(function ()
    {
        $(this).toggleClass("col-xs-5");
    });

}
