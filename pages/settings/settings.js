function perfilSection(elemento) {
    ativarLink(elemento);
    document.querySelector('#perfil').scrollIntoView();
}

function accountSection(elemento) {
    ativarLink(elemento);
    document.querySelector('#account').scrollIntoView();
}

function notificationSection(elemento) {
    ativarLink(elemento);
    document.querySelector('#notifications').scrollIntoView();
}

function preferencesSection(elemento) {
    ativarLink(elemento);
    document.querySelector('#preferences').scrollIntoView();
}

function ativarLink(elemento) {
    document.querySelectorAll('.left-corner a').forEach(link => {
        link.classList.remove('active');
    });

    elemento.classList.add('active');
}
