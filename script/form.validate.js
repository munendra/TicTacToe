var custForm = {
    validate: function (control) {
        var isValid = true;
        $('.required').each(function () {
            if (!$(this).val()) {
                $(this).addClass('error');
                isValid = false;
            }
        });
        return isValid;
    }
}