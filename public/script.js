document.addEventListener('DOMContentLoaded', function () {
    const futuristaButton = document.querySelector('input[name="theme"][value="futuristic"]');
    const modernoButton = document.querySelector('input[name="theme"][value="modern"]');
    const minimalistaButton = document.querySelector('input[name="theme"][value="minimal"]');
    const commandInput = document.getElementById('command-input');

    if (futuristaButton) futuristaButton.checked = false;
    if (modernoButton) modernoButton.checked = false;
    if (minimalistaButton) minimalistaButton.checked = false;

    if (futuristaButton) {
        futuristaButton.addEventListener('change', function () {
            if (this.checked) {
                const currentText = commandInput.value.trim();
                const newText = 'estilo de site futurista';
                if (!currentText.includes(newText)) {
                    commandInput.value = currentText ? `${currentText} ${newText}` : newText;
                }
            }
        });
    }

    if (modernoButton) {
        modernoButton.addEventListener('change', function () {
            if (this.checked) {
                const currentText = commandInput.value.trim();
                const newText = 'estilo de site moderno';
                if (!currentText.includes(newText)) {
                    commandInput.value = currentText ? `${currentText} ${newText}` : newText;
                }
            }
        });
    }

    if (minimalistaButton) {
        minimalistaButton.addEventListener('change', function () {
            if (this.checked) {
                const currentText = commandInput.value.trim();
                const newText = 'estilo de site minimalista';
                if (!currentText.includes(newText)) {
                    commandInput.value = currentText ? `${currentText} ${newText}` : newText;
                }
            }
        });
    }
});

document.getElementById('generate-btn').addEventListener('click', gerarSite);

function gerarSite() {
    fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputs: 'side para um mercado de médio porte' })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Erro na requisição:', error));
}

function makeElementsEditable(container) {
    const textElements = container.querySelectorAll('h1, h2, h3, p, span, div');
    const imageElements = container.querySelectorAll('img');

    textElements.forEach(element => {
        element.setAttribute('contenteditable', 'true');
        element.classList.add('editable'); 
        element.addEventListener('input', function () {
            console.log('Texto alterado:', this.innerHTML);
        });
    });

    imageElements.forEach(image => {
        image.classList.add('editable-image'); 

        image.addEventListener('click', function () {
            const newSrc = prompt('Insira a URL da nova imagem:', image.src);
            if (newSrc) {
                image.src = newSrc;
                console.log('Imagem alterada para:', newSrc);
            }
        });
    });
}

function removeEditableState(container) {
    const textElements = container.querySelectorAll('.editable');
    textElements.forEach(element => {
        element.removeAttribute('contenteditable');
        element.classList.remove('editable');
    });

    const imageElements = container.querySelectorAll('.editable-image');
    imageElements.forEach(image => {
        image.classList.remove('editable-image');
        image.removeEventListener('click', null); 
    });
}


document.addEventListener('DOMContentLoaded', function () {
    const generatedContent = document.getElementById('generated-content');
    const editLayoutBtn = document.getElementById('edit-layout-btn');

    let isEditMode = false;

    editLayoutBtn.addEventListener('click', function () {
        isEditMode = !isEditMode;

        if (isEditMode) {
            makeElementsEditable(generatedContent);
            editLayoutBtn.textContent = 'Sair do Modo Edição';
        } else {
            removeEditableState(generatedContent);
            editLayoutBtn.textContent = 'Editar Layout';
        }
    });
});