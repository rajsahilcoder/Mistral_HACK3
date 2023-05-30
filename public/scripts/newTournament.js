"use strict";
/*
* This function validates all fields on the Add Tournament Details Form.
*/
function validateTeamDetailsForm(objs)
{
    $("#invalidData").empty();

    

    let displayErrorMessage = [];

    let errorFound = false;

    // Team Name Validation
    if ($("#tournamentname").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Name";
        errorFound = true;
    }


    // Team Manager Name Validation
    if ($("#place").val().trim() == "")
    {
        displayErrorMessage[displayErrorMessage.length] = "Missing Place";
        errorFound = true;
    }

   
    // Call Display Errors Function (errors.js)
    displayErrors($("#invalidData"), displayErrorMessage, errorFound);

    return errorFound;
}
//Connect Events to HTML Elements
$(function ()
{
    sessionStorage.setItem("page", "newtournament");


    $("#buttonsDiv").append($("<a>", {
        href: "#",
        id: "saveTournamentBtn",
        text: "Save",
        class: "col-md-2 btn btn-success btn-sm mb-1 mr-1",
        role: "button"
    }));

    $("#buttonsDiv").append($("<a>", {
        href: "filtertournaments.html",
        id: "cancelBtn",
        text: "Cancel",
        class: "col-md-2 btn btn-danger btn-sm mb-1",
        role: "button"
    }));

    // Save Team Details Button click
    $("#saveTournamentBtn").on("click", function ()
    {
        let errorFound = validateTeamDetailsForm();

        if (errorFound)
        {
            return;
        }

        // Call Hide Error Function (errors.js)
        hideError($("#invalidData"));

        let postData;

        // Post Add Team Form to API Teams
        $.post("/api/tournaments", $("#tournamentDetailsForm").serialize(),
            function (data)
            {
                postData = JSON.parse(data);
            })

            .done(function ()
            {
                $("#savedModalText").html("Tournament has been successfully added.")
                    .addClass("text-primary");
                $("#modalBody")
                    .append("<br />")
                    .append("<b>Tournament Name: </b>" + $("#tournamentname").val());
                $("#savedModal").modal("show");

                // Ok Button click
                $("#okBtn").on("click", function ()
                {
                    location.href = "detailstournament.html?id=" + postData.TeamId;
                })
            })

            .fail(function ()
            {
                $("#savedModalText").html("Update has failed, please try again.")
                    .addClass("text-danger");
                $("#savedModal").modal("show");
            })

        return false;
    })
})