function create_form()
{
    document.getElementById('age').addEventListener('input', validate_age);
    document.getElementById('id').addEventListener('input', validate_id);
    document.getElementById('password').addEventListener('input', validate_pwd);
    document.getElementById('passwordRe').addEventListener('input', validate_pwdRe);
    document.getElementById('cgu').addEventListener('change', validate_cgu);
}

window.addEventListener("load", create_form);


var global_age, global_id, global_pwd, global_pwdRe, global_cgu;

function validate_age()
{
    var age = document.getElementById('age').value;

    if(age === "")
    {
        document.getElementById('age_errors').textContent = "Age requis";
        global_age = false;
    }
    else
    {
        if(age < 18)
        {
            document.getElementById('age_errors').textContent = "Trop jeune";
            global_age = false;
        }
        else
        {
            document.getElementById('age_errors').textContent = "";
            global_age = true;
        }
    }
    validate_form()
}

function validate_id()
{
    var id = document.getElementById('id').value;
    var len = false, regex = false;

    var errors = "";
    if (id === "")
    {
        errors += "Id requis";
        global_id = false;
    }
    else
    {
        if(id.length > 12)
        {
            errors += "Trop long";
            global_id = false;
        }
        if(!/^[a-zA-Z]+$/.test(id))
        {
            errors += "Char spé interdit";
            global_id = false;
        }
        else
        {
            errors = "";
            global_id = true;
        }
    }
    document.getElementById('id_errors').textContent = errors;
    validate_form()
}

function validate_pwd()
{
    var pwd = document.getElementById('password').value;

    var min = false, max = false, len = false, digit = false, spe = false;
    var errors = "";

    if(pwd.length > 8) //Mot de passe de plus de 8 chars
    {
        len = true;
    }

    if(/^(?=.*[a-z]).+$/.test(pwd)) //Contiens au moins une minuscule
    {
        min = true;
    }

    if(/^(?=.*[A-Z]).+$/.test(pwd)) //Contiens au moins une majuscule
    {
        max = true;
    }

    if(/^(?=.*\d).+$/.test(pwd)) //contien au moins un chiffre
    {
        digit = true;
    }

    if(/^(?=.*[_\W]).+$/.test(pwd)) //contien au moins un char spé
    {
        spe = true;
    }

    if(min && max && len && digit && spe)
    {
        document.getElementById('passwordRe').disabled = false;
        global_pwd = true;
    }
    else
    {
        global_pwd = false;
        document.getElementById('passwordRe').disabled = true;

        if(!len)
        {
            errors += "Trop cours \n";
        }
        if(!min)
        {
            errors += "Pas de minuscule \n";
        }
        if(!max)
        {
            errors += "Pas de majuscule \n";
        }
        if(!digit)
        {
            errors += "Pas de chiffre \n";
        }
        if(!spe)
        {
            errors += "Pas de char spé \n";
        }
    }
    document.getElementById('pwd_errors').textContent = errors;
    validate_form()
}

function validate_pwdRe()
{
    var pwd = document.getElementById('password').value;
    var pwd_re = document.getElementById('passwordRe').value;

    if(pwd === pwd_re)
    {
        document.getElementById('pwdRe_errors').textContent = "";
        global_pwdRe = true;
    }
    else
    {
        document.getElementById('pwdRe_errors').textContent = "Mot de passe non identique";
        global_pwdRe = false;
    }
    validate_form()
}

function validate_cgu()
{
    var cgu = document.getElementById('cgu').checked;

    if(cgu)
    {
        document.getElementById('cgu_errors').textContent = "";
        global_cgu = true
    }
    else
    {
        document.getElementById('cgu_errors').textContent = "CGU obligatoire";
        global_cgu = false;
    }
    validate_form()
}

function validate_form()
{
    if(global_age && global_id && global_pwd && global_pwdRe && global_cgu)
    {
        document.getElementById('submit').disabled = false;
    }
    else
    {
        document.getElementById('submit').disabled = true;
    }
}